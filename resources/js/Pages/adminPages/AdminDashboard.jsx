import React, { useState, useMemo } from 'react';
import { Link } from '@inertiajs/react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import * as XLSX from 'xlsx';

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const AdminDashboard = ({ auth, visits }) => {
    const [searchTerm, setSearchTerm] = useState('');

    // Menyaring data kunjungan berdasarkan status
    const pendingVisits = visits.filter(visit => visit.status === "pending");
    const acceptedVisits = visits.filter(visit => visit.status === "accepted");
    const rejectedVisits = visits.filter(visit => visit.status === "rejected");

    // Filter data berdasarkan search term
    const filteredVisits = useMemo(() => {
        return visits.filter(visit => {
            const searchLower = searchTerm.toLowerCase();
            return (
                visit.meet_with.toLowerCase().includes(searchLower) ||
                visit.phone.toLowerCase().includes(searchLower) ||
                visit.email.toLowerCase().includes(searchLower) ||
                visit.agenda.toLowerCase().includes(searchLower) ||
                visit.building_type.toLowerCase().includes(searchLower) ||
                visit.building_category.toLowerCase().includes(searchLower) ||
                visit.notes?.toLowerCase().includes(searchLower) ||
                visit.status.toLowerCase().includes(searchLower)
            );
        });
    }, [visits, searchTerm]);

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

    return (
        <AdminLayout user={auth.user}>
            <Head title="Admin Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h1 className="text-2xl font-bold mb-6">Welcome to Admin Dashboard, {auth.user.name}!</h1>

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
                        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                            <h3 className="text-2xl font-bold text-gray-700 mb-4">Kelola Kunjungan</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full table-auto border-collapse text-sm">
                        <thead>
                                        <tr className="bg-gray-50">
                                            <th className="px-3 py-2 border text-left">Tanggal</th>
                                            <th className="px-3 py-2 border text-left">Waktu</th>
                                            <th className="px-3 py-2 border text-left">Jenis Gedung</th>
                                            <th className="px-3 py-2 border text-left">Kategori</th>
                                            <th className="px-3 py-2 border text-left">Agenda</th>
                                            <th className="px-3 py-2 border text-left">Bertemu Dengan</th>
                                            <th className="px-3 py-2 border text-left">Catatan</th>
                                            <th className="px-3 py-2 border text-left">Kontak</th>
                                            <th className="px-3 py-2 border text-left">Status</th>
                                            <th className="px-3 py-2 border text-left">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                                        {filteredVisits.map(visit => (
                                            <tr key={visit.id} className="hover:bg-gray-50">
                                                <td className="px-3 py-2 border">{formatDate(visit.visit_date)}</td>
                                                <td className="px-3 py-2 border">
                                                    {formatTime(visit.visit_time_start)} - {formatTime(visit.visit_time_end)}
                                                </td>
                                                <td className="px-3 py-2 border">{visit.building_type}</td>
                                                <td className="px-3 py-2 border">{visit.building_category}</td>
                                                <td className="px-3 py-2 border">{visit.agenda}</td>
                                                <td className="px-3 py-2 border">{visit.meet_with}</td>
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
                                                        visit.status === 'accepted' ? 'bg-green-100 text-green-800' :
                                                        'bg-red-100 text-red-800'
                                                    }`}>
                                                        {visit.status}
                                                    </span>
                                                </td>
                                                <td className="px-3 py-2 border">
                                        {visit.status === "pending" && (
                                                        <div className="flex space-x-2">
                                                <button
                                                                className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600 text-xs"
                                                >
                                                                Terima
                                                </button>
                                                <button
                                                                className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 text-xs"
                                                >
                                                                Tolak
                                                </button>
                                                        </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                        </div>
                    </div>
                </div>
        </div>
        </AdminLayout>
    );
};

export default AdminDashboard;
