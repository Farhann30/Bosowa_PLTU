import React, { useState, useMemo, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';
import * as XLSX from 'xlsx';
import { Inertia } from '@inertiajs/inertia';

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const AdminDashboard = ({ auth, visits, assets, goods, users, selectedUser: initialSelectedUser }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedIds, setSelectedIds] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: 'visit_date', direction: 'desc' });
    const [searchUser, setSearchUser] = useState('');
    const [selectedUser, setSelectedUser] = useState(initialSelectedUser);
    const [page, setPage] = useState(initialSelectedUser ? 'user' : 'kunjungan');
    const [showPhotoModal, setShowPhotoModal] = useState(false);

    useEffect(() => {
        setSelectedUser(initialSelectedUser);
        if (initialSelectedUser) {
            const userIdentifier = `${initialSelectedUser.name} (${initialSelectedUser.email})`;
            setSearchUser(userIdentifier);
            setPage('user');
        }
    }, [initialSelectedUser]);

    // Menyaring data kunjungan berdasarkan status
    const pendingVisits = visits.filter(visit => visit.status === "pending");
    const acceptedVisits = visits.filter(visit => visit.status === "accepted");
    const rejectedVisits = visits.filter(visit => visit.status === "rejected");

    // Fungsi untuk handle select all
    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedIds(filteredVisits.map(v => v.id));
        } else {
            setSelectedIds([]);
        }
    };

    // Fungsi untuk handle select per baris
    const handleSelect = (id) => {
        setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };

    // Fungsi hapus banyak
    const handleDeleteSelected = () => {
        if (selectedIds.length === 0) return alert('Pilih data yang ingin dihapus!');
        if (confirm('Yakin ingin menghapus kunjungan terpilih?')) {
            selectedIds.forEach(id => Inertia.delete(`/visits/${id}`));
            setSelectedIds([]);
        }
    };

    // Fungsi sorting
    const handleSort = (key) => {
        setSortConfig(prev => {
            if (prev.key === key) {
                return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
            }
            return { key, direction: 'asc' };
        });
    };

    // Format tanggal ke format Indonesia
    const formatDate = (dateString) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    // Format waktu ke format 24 jam
    const formatTime = (timeString) => {
        return timeString;
    };

    // Export ke Excel
    const exportToExcel = () => {
        const dataToExport = filteredVisits.map(visit => ({
            'Tanggal': formatDate(visit.visit_date),
            'Waktu': `${formatTime(visit.visit_time_start)} - ${formatTime(visit.visit_time_end)}`,
            'Jenis Gedung': visit.building_type,
            'Kategori': visit.building_category,
            'Agenda': visit.agenda,
            'Bertemu Dengan': visit.meet_with,
            'Catatan': visit.notes || '-',
            'Telepon': visit.phone,
            'Email': visit.email,
            'Status': visit.status
        }));

        const ws = XLSX.utils.json_to_sheet(dataToExport);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Data Kunjungan");
        
        // Generate nama file dengan timestamp
        const fileName = `Data_Kunjungan_${new Date().toISOString().split('T')[0]}.xlsx`;
        XLSX.writeFile(wb, fileName);
    };

    // Sorting dan filter
    const filteredVisits = useMemo(() => {
        let data = visits.filter(visit => {
            const searchLower = searchTerm.toLowerCase();
            const visitUser = users.find(u => u.id === visit.user_id);
            return (
                (visitUser?.name.toLowerCase() || '').includes(searchLower) ||
                (visit.meet_with || '').toLowerCase().includes(searchLower) ||
                (visit.phone || '').toLowerCase().includes(searchLower) ||
                (visit.email || '').toLowerCase().includes(searchLower) ||
                (visit.agenda || '').toLowerCase().includes(searchLower) ||
                (visit.building_type || '').toLowerCase().includes(searchLower) ||
                (visit.building_category || '').toLowerCase().includes(searchLower) ||
                (visit.notes || '').toLowerCase().includes(searchLower) ||
                (visit.status || '').toLowerCase().includes(searchLower) ||
                (visit.company_name || '').toLowerCase().includes(searchLower) ||
                (visit.company_id_card || '').toLowerCase().includes(searchLower) ||
                (visit.pic?.nama || '').toLowerCase().includes(searchLower) ||
                (visit.visit_date ? formatDate(visit.visit_date).toLowerCase().includes(searchLower) : false)
            );
        });
        // Sorting
        if (sortConfig.key) {
            data = [...data].sort((a, b) => {
                let aVal = a[sortConfig.key] ?? '';
                let bVal = b[sortConfig.key] ?? '';
                // Untuk tanggal
                if (sortConfig.key === 'visit_date') {
                    aVal = new Date(aVal);
                    bVal = new Date(bVal);
                }
                if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
                if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }
        return data;
    }, [visits, searchTerm, sortConfig, users]);

    // Filter aset & barang keluar berdasarkan user yang dipilih
    const filteredAssets = selectedUser ? (assets || []).filter(a => a.user_id === selectedUser.id) : [];
    const filteredGoods = selectedUser ? (goods || []).filter(g => g.user_id === selectedUser.id) : [];

    // Data chart berdasarkan status kunjungan
    const chartData = {
        labels: ['Pending', 'Accepted', 'Rejected'],
        datasets: [
            {
                label: 'Jumlah Kunjungan',
                data: [pendingVisits.length, acceptedVisits.length, rejectedVisits.length],
                backgroundColor: [
                    'rgba(255, 193, 7, 0.2)',   // Pending - Kuning
                    'rgba(40, 167, 69, 0.2)',   // Accepted - Hijau
                    'rgba(220, 53, 69, 0.2)',   // Rejected - Merah
                ],
                borderColor: [
                    'rgba(255, 193, 7, 1)',
                    'rgba(40, 167, 69, 1)',
                    'rgba(220, 53, 69, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    // Modal untuk menampilkan 3 foto user
    const renderPhotoModal = () => {
        if (!selectedUser) return null;
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white rounded-lg p-6 max-w-3xl w-full relative">
                    <button type="button" className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-2xl font-bold" onClick={() => setShowPhotoModal(false)}>&times;</button>
                    <h2 className="text-xl font-bold mb-4">Foto User: {selectedUser.name}</h2>
                    <div className="flex flex-row gap-6 items-start justify-center">
                        <div className="flex flex-col items-center">
                            <div className="font-semibold mb-1">Foto Wajah</div>
                            {selectedUser.face_photo_blob ? (
                                <img
                                    src={selectedUser.face_photo_blob}
                                    alt="Foto Wajah"
                                    className="w-40 h-40 object-contain rounded border"
                                />
                            ) : <div className="w-40 h-40 flex items-center justify-center bg-gray-100 rounded border text-gray-400">Tidak Ada Foto</div>}
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="font-semibold mb-1">Foto KTP</div>
                            {selectedUser.id_card_photo_blob ? (
                                <img
                                    src={selectedUser.id_card_photo_blob}
                                    alt="Foto KTP"
                                    className="w-40 h-40 object-contain rounded border"
                                />
                            ) : <div className="w-40 h-40 flex items-center justify-center bg-gray-100 rounded border text-gray-400">Tidak Ada Foto</div>}
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="font-semibold mb-1">Foto Kartu Perusahaan</div>
                            {selectedUser.company_id_card_photo_blob ? (
                                <img
                                    src={selectedUser.company_id_card_photo_blob}
                                    alt="Foto Kartu Perusahaan"
                                    className="w-40 h-40 object-contain rounded border"
                                />
                            ) : <div className="w-40 h-40 flex items-center justify-center bg-gray-100 rounded border text-gray-400">Tidak Ada Foto</div>}
                        </div>
                    </div>
                    <div className="mt-6">
                        <h3 className="font-bold mb-2">Informasi User</h3>
                        <div>Nama: {selectedUser.name}</div>
                        <div>Email: {selectedUser.email}</div>
                        <div>Kontak: {selectedUser.phone || '-'}</div>
                        <div>Nama Perusahaan: {selectedUser.company_name || '-'}</div>
                        <div>No. Kartu Identitas Perusahaan: {selectedUser.company_id_card || '-'}</div>
                    </div>
                </div>
                <div className="fixed inset-0" onClick={() => setShowPhotoModal(false)} style={{zIndex: 40}} />
            </div>
        );
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title="Admin Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-bold">Welcome to Admin Dashboard, {auth.user.name}!</h1>
                            <div className="flex gap-2">
                                <button
                                    className={`px-4 py-2 rounded font-semibold transition ${page === 'kunjungan' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                                    onClick={() => setPage('kunjungan')}
                                >
                                    Kunjungan
                                </button>
                                <button
                                    className={`px-4 py-2 rounded font-semibold transition ${page === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                                    onClick={() => setPage('user')}
                                >
                                    Pilih User
                                </button>
                            </div>
                        </div>

                        {/* Page: Kunjungan */}
                        {page === 'kunjungan' && (
                            <>
                {/* Dashboard Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                            <div className="bg-white p-5 rounded-lg shadow-md flex justify-between items-center border border-gray-200">
                                <h3 className="text-xl font-bold text-gray-700">Total Kunjungan</h3>
                        <p className="text-3xl text-blue-600">{visits.length}</p>
                    </div>
                            <div className="bg-white p-5 rounded-lg shadow-md flex justify-between items-center border border-gray-200">
                                <h3 className="text-xl font-bold text-gray-700">Kunjungan Pending</h3>
                        <p className="text-3xl text-yellow-600">{pendingVisits.length}</p>
                    </div>
                            <div className="bg-white p-5 rounded-lg shadow-md flex justify-between items-center border border-gray-200">
                                <h3 className="text-xl font-bold text-gray-700">Kunjungan Diterima</h3>
                        <p className="text-3xl text-green-600">{acceptedVisits.length}</p>
                    </div>
                </div>

                        {/* Statistik Chart */}
                        <div className="bg-white p-6 rounded-lg shadow-md mb-10 border border-gray-200">
                            <h3 className="text-2xl font-bold text-gray-700 mb-4">Statistik Kunjungan</h3>
                            <div className="h-80">
                                <Line 
                                    data={chartData}
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        plugins: {
                                            legend: {
                                                position: 'top',
                                            },
                                            title: {
                                                display: true,
                                                text: 'Grafik Status Kunjungan'
                                            }
                                        }
                                    }}
                                />
                            </div>
                        </div>

                        {/* Search dan Export */}
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex-1 max-w-md">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Cari berdasarkan nama, telepon, agenda, dll..."
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={exportToExcel}
                                className="ml-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Export Excel
                            </button>
                </div>

                        {/* Tabel Kunjungan */}
                        <div className="flex items-center mb-4">
                            <button
                                onClick={handleDeleteSelected}
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 mr-4"
                                disabled={selectedIds.length === 0}
                            >
                                Hapus Terpilih
                            </button>
                            <span className="text-sm text-gray-600">{selectedIds.length} dipilih</span>
                        </div>
                                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-10">
                            <h3 className="text-2xl font-bold text-gray-700 mb-4">Kelola Kunjungan</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full table-auto border-collapse text-sm">
                        <thead>
                                        <tr className="bg-gray-50">
                                            <th className="px-3 py-2 border text-left">
                                                <input type="checkbox" onChange={handleSelectAll} checked={selectedIds.length === filteredVisits.length && filteredVisits.length > 0} />
                                            </th>
                                                    <th className="px-3 py-2 border text-left">Nama</th>
                                                    <th className="px-3 py-2 border text-left cursor-pointer" onClick={() => handleSort('visit_date')}>
                                                        Tanggal {sortConfig.key === 'visit_date' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                                                    </th>
                                                    <th className="px-3 py-2 border text-left cursor-pointer" onClick={() => handleSort('visit_time_start')}>
                                                        Waktu {sortConfig.key === 'visit_time_start' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                                                    </th>
                                                    <th className="px-3 py-2 border text-left cursor-pointer" onClick={() => handleSort('building_type')}>
                                                        Jenis Gedung {sortConfig.key === 'building_type' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                                                    </th>
                                                    <th className="px-3 py-2 border text-left cursor-pointer" onClick={() => handleSort('building_category')}>
                                                        Kategori {sortConfig.key === 'building_category' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                                                    </th>
                                                    <th className="px-3 py-2 border text-left cursor-pointer" onClick={() => handleSort('agenda')}>
                                                        Agenda {sortConfig.key === 'agenda' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                                                    </th>
                                                    <th className="px-3 py-2 border text-left cursor-pointer" onClick={() => handleSort('meet_with')}>
                                                        Bertemu Dengan {sortConfig.key === 'meet_with' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                                                    </th>
                                                    <th className="px-3 py-2 border text-left cursor-pointer" onClick={() => handleSort('notes')}>
                                                        Catatan {sortConfig.key === 'notes' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                                                    </th>
                                                    <th className="px-3 py-2 border text-left cursor-pointer" onClick={() => handleSort('phone')}>
                                                        Kontak {sortConfig.key === 'phone' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                                                    </th>
                                                    <th className="px-3 py-2 border text-left cursor-pointer" onClick={() => handleSort('status')}>
                                                        Status {sortConfig.key === 'status' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                                                    </th>
                                            <th className="px-3 py-2 border text-left">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                                        {filteredVisits.map(visit => {
                                            const user = users.find(u => u.id === visit.user_id);
                                            return (
                                                <tr key={visit.id} className="hover:bg-gray-50">
                                                    <td className="px-3 py-2 border">
                                                        <input type="checkbox" checked={selectedIds.includes(visit.id)} onChange={() => handleSelect(visit.id)} />
                                                    </td>
                                                    <td className="px-3 py-2 border">{user ? user.name : '-'}</td>
                                                    <td className="px-3 py-2 border">{formatDate(visit.visit_date)}</td>
                                                    <td className="px-3 py-2 border">
                                                        {formatTime(visit.visit_time_start)} - {formatTime(visit.visit_time_end)}
                                                    </td>
                                                    <td className="px-3 py-2 border">{visit.building_type}</td>
                                                    <td className="px-3 py-2 border">{visit.building_category}</td>
                                                    <td className="px-3 py-2 border">{visit.agenda}</td>
                                                    <td className="px-3 py-2 border">
                                                        {visit.pic?.nama || visit.meet_with || '-'}
                                                    </td>
                                                    <td className="px-3 py-2 border">
                                                        <div className="max-w-xs truncate" title={visit.notes}>
                                                            {visit.notes || '-'}
                                                        </div>
                                                    </td>
                                                    <td className="px-3 py-2 border">
                                                        <div className="flex flex-col">
                                                            <span>{visit.phone}</span>
                                                            <span className="text-xs text-gray-500">{visit.email}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-3 py-2 border">
                                                        <span className={`px-2 py-1 rounded-full text-xs ${
                                                            visit.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                            visit.status === 'approved' ? 'bg-green-100 text-green-800' :
                                                            'bg-red-100 text-red-800'
                                                        }`}>
                                                            {visit.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-3 py-2 border">
                                                        <button
                                                            className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 text-xs"
                                                            onClick={() => handleDeleteSelected(visit.id)}
                                                        >
                                                            Hapus
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                        </tbody>
                    </table>
                </div>
                        </div>
                            </>
                        )}

                        {/* Page: Pilih User */}
                        {page === 'user' && (
                            <>
                                {/* Pilih User */}
                                <div className="mb-8">
                                    <label className="block mb-2 font-semibold">Pilih User</label>
                                    <input
                                        type="text"
                                        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Cari nama atau email user..."
                                        value={searchUser}
                                        onChange={e => setSearchUser(e.target.value)}
                                        list="user-list"
                                    />
                                    <datalist id="user-list">
                                        {(users || []).filter(u =>
                                            u.name.toLowerCase().includes(searchUser.toLowerCase()) ||
                                            u.email.toLowerCase().includes(searchUser.toLowerCase())
                                        ).map(u => (
                                            <option key={u.id} value={u.name + ' (' + u.email + ')'} />
                                        ))}
                                    </datalist>
                                    <button
                                        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold"
                                        onClick={() => {
                                            const found = (users || []).find(u =>
                                                (u.name + ' (' + u.email + ')') === searchUser
                                            );
                                            if (found) {
                                                router.get(route('admin.dashboard', { user_id: found.id }), {}, {
                                                    preserveState: true,
                                                    preserveScroll: true,
                                                });
                                            } else {
                                                alert('User tidak ditemukan. Silakan pilih dari daftar.');
                                            }
                                        }}
                                    >
                                        Lihat Detail User
                                    </button>
                                </div>

                                {/* Setelah user dipilih, tampilkan info dan tabel */}
                                {selectedUser && (
                                    <>
                                        {/* Info User */}
                                        <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
                                            <h2 className="text-xl font-bold mb-2">Informasi User</h2>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <div><span className="font-semibold">Nama:</span> {selectedUser.name}</div>
                                                    <div><span className="font-semibold">Email:</span> {selectedUser.email}</div>
                                                    <div><span className="font-semibold">Kontak:</span> {selectedUser.phone || '-'}</div>
                                                    <div><span className="font-semibold">Nama Perusahaan:</span> {selectedUser.company_name || '-'}</div>
                                                    <div><span className="font-semibold">No. Kartu Identitas Perusahaan:</span> {selectedUser.company_id_card || '-'}</div>
                                                    <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold" onClick={() => setShowPhotoModal(true)}>
                                                        Lihat Foto
                                                    </button>
                                                </div>
                                                <div className="flex gap-4 items-center justify-start">
                                                    {/* Foto Wajah */}
                                                    <div className="flex flex-col items-center">
                                                        <span className="text-sm font-semibold">Wajah</span>
                                                        {selectedUser.face_photo_blob ? (
                                                            <img
                                                                src={selectedUser.face_photo_blob}
                                                                alt="Foto Wajah"
                                                                className="w-20 h-20 object-contain rounded border"
                                                            />
                                                        ) : <div className="w-20 h-20 bg-gray-100 rounded border" />}
                                                    </div>
                                                    {/* Foto KTP */}
                                                     <div className="flex flex-col items-center">
                                                        <span className="text-sm font-semibold">KTP</span>
                                                        {selectedUser.id_card_photo_blob ? (
                                                            <img
                                                                src={selectedUser.id_card_photo_blob}
                                                                alt="Foto KTP"
                                                                className="w-20 h-20 object-contain rounded border"
                                                            />
                                                        ) : <div className="w-20 h-20 bg-gray-100 rounded border" />}
                                                    </div>
                                                    {/* Foto Kartu Perusahaan */}
                                                    <div className="flex flex-col items-center">
                                                        <span className="text-sm font-semibold">ID Card</span>
                                                        {selectedUser.company_id_card_photo_blob ? (
                                                            <img
                                                                src={selectedUser.company_id_card_photo_blob}
                                                                alt="Foto Kartu Perusahaan"
                                                                className="w-20 h-20 object-contain rounded border"
                                                            />
                                                         ) : <div className="w-20 h-20 bg-gray-100 rounded border" />}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {showPhotoModal && renderPhotoModal()}

                                        {/* Tabel Aset */}
                                        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-10">
                                            <h3 className="text-2xl font-bold text-gray-700 mb-4">Aset User</h3>
                                            <div className="overflow-x-auto">
                                                <table className="min-w-full divide-y divide-gray-200">
                                                    <thead>
                                                        <tr>
                                                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Aset</th>
                                                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
                                                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kode</th>
                                                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lokasi</th>
                                                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deskripsi</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="bg-white divide-y divide-gray-200">
                                                        {filteredAssets.length > 0 ? (
                                                            filteredAssets.map((asset) => (
                                                                <tr key={asset.id}>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{asset.name}</td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{asset.category}</td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{asset.code}</td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{asset.location}</td>
                                                                    <td className="px-6 py-4 text-sm text-gray-900">{asset.description}</td>
                                                                </tr>
                                                            ))
                                                        ) : (
                                                            <tr>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500" colSpan={5}>
                                                                    Tidak ada data aset untuk user ini.
                                                                </td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                        {/* Tabel Barang Keluar */}
                                        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-10">
                                            <h3 className="text-2xl font-bold text-gray-700 mb-4">Barang Keluar User</h3>
                                            <div className="overflow-x-auto">
                                                <table className="min-w-full divide-y divide-gray-200">
                                                    <thead>
                                                        <tr>
                                                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Barang</th>
                                                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jumlah</th>
                                                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Penerima</th>
                                                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                                                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Keterangan</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="bg-white divide-y divide-gray-200">
                                                        {filteredGoods.length > 0 ? (
                                                            filteredGoods.map((item) => (
                                                                <tr key={item.id}>
                                                                    <td className="px-6 py-4 text-sm text-gray-900">{item.name}</td>
                                                                    <td className="px-6 py-4 text-sm text-gray-900">{item.quantity}</td>
                                                                    <td className="px-6 py-4 text-sm text-gray-900">{item.receiver}</td>
                                                                    <td className="px-6 py-4 text-sm text-gray-900">{item.date}</td>
                                                                    <td className="px-6 py-4 text-sm text-gray-900">{item.keterangan}</td>
                                                                </tr>
                                                            ))
                                                        ) : (
                                                            <tr>
                                                                <td className="px-6 py-4 text-sm text-gray-500" colSpan={5}>
                                                                    Tidak ada data barang keluar untuk user ini.
                                                                </td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                        {/* Tabel Kelola Kunjungan User */}
                                        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-10">
                                            <h3 className="text-2xl font-bold text-gray-700 mb-4">Kelola Kunjungan User</h3>
                                            <div className="overflow-x-auto">
                                                <table className="w-full table-auto border-collapse text-sm">
                                                    <thead>
                                                        <tr className="bg-gray-50">
                                                            <th className="px-3 py-2 border text-left cursor-pointer" onClick={() => handleSort('visit_date')}>
                                                                Tanggal {sortConfig.key === 'visit_date' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                                                            </th>
                                                            <th className="px-3 py-2 border text-left cursor-pointer" onClick={() => handleSort('visit_time_start')}>
                                                                Waktu {sortConfig.key === 'visit_time_start' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                                                            </th>
                                                            <th className="px-3 py-2 border text-left cursor-pointer" onClick={() => handleSort('building_type')}>
                                                                Jenis Gedung {sortConfig.key === 'building_type' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                                                            </th>
                                                            <th className="px-3 py-2 border text-left cursor-pointer" onClick={() => handleSort('building_category')}>
                                                                Kategori {sortConfig.key === 'building_category' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                                                            </th>
                                                            <th className="px-3 py-2 border text-left cursor-pointer" onClick={() => handleSort('agenda')}>
                                                                Agenda {sortConfig.key === 'agenda' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                                                            </th>
                                                            <th className="px-3 py-2 border text-left cursor-pointer" onClick={() => handleSort('meet_with')}>
                                                                Bertemu Dengan {sortConfig.key === 'meet_with' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                                                            </th>
                                                            <th className="px-3 py-2 border text-left cursor-pointer" onClick={() => handleSort('notes')}>
                                                                Catatan {sortConfig.key === 'notes' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                                                            </th>
                                                            <th className="px-3 py-2 border text-left cursor-pointer" onClick={() => handleSort('phone')}>
                                                                Kontak {sortConfig.key === 'phone' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                                                            </th>
                                                            <th className="px-3 py-2 border text-left cursor-pointer" onClick={() => handleSort('status')}>
                                                                Status {sortConfig.key === 'status' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {(visits || []).filter(v => v.user_id === selectedUser.id).length > 0 ? (
                                                            (visits || []).filter(v => v.user_id === selectedUser.id).map(visit => (
                                                                <tr key={visit.id} className="hover:bg-gray-50">
                                                                    <td className="px-3 py-2 border">{formatDate(visit.visit_date)}</td>
                                                                    <td className="px-3 py-2 border">{visit.visit_time_start} - {visit.visit_time_end}</td>
                                                                    <td className="px-3 py-2 border">{visit.building_type}</td>
                                                                    <td className="px-3 py-2 border">{visit.building_category}</td>
                                                                    <td className="px-3 py-2 border">{visit.agenda}</td>
                                                                    <td className="px-3 py-2 border">{visit.pic?.nama || visit.meet_with || '-'}</td>
                                                                    <td className="px-3 py-2 border"><div className="max-w-xs truncate" title={visit.notes}>{visit.notes || '-'}</div></td>
                                                                    <td className="px-3 py-2 border">
                                                                        <div className="flex flex-col">
                                                                            <span>{visit.phone}</span>
                                                                            <span className="text-xs text-gray-500">{visit.email}</span>
                                                                        </div>
                                                                    </td>
                                                                    <td className="px-3 py-2 border">
                                                                        <span className={`px-2 py-1 rounded-full text-xs ${
                                                                            visit.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                                            visit.status === 'approved' ? 'bg-green-100 text-green-800' :
                                                                            'bg-red-100 text-red-800'
                                                                        }`}>
                                                                            {visit.status}
                                                                        </span>
                                                                    </td>
                                                                </tr>
                                                            ))
                                                        ) : (
                                                            <tr>
                                                                <td className="px-3 py-2 border text-center text-gray-500" colSpan={15}>
                                                                    Tidak ada data kunjungan untuk user ini.
                                                                </td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </>
                        )}
                    </div>
                </div>
        </div>
        </AdminLayout>
    );
};

export default AdminDashboard;
