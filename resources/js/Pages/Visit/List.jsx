import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react';
import { useState } from 'react';

export default function List({ auth, visits }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');

    const getStatusColor = (status) => {
        switch (status) {
            case 'approved':
                return 'bg-green-100 text-green-800';
            case 'rejected':
                return 'bg-red-100 text-red-800';
            case 'expired':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-yellow-100 text-yellow-800';
        }
    };

    const filteredVisits = visits.filter(visit => {
        const matchesSearch = visit.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (visit.pic && visit.pic.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesStatus = !selectedStatus || visit.status === selectedStatus;
        return matchesSearch && matchesStatus;
    });

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Daftar Kunjungan Saya" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-semibold">Daftar Kunjungan</h2>
                                <Link
                                    href={route('visits.create')}
                                    className="inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-700"
                                >
                                    Buat Kunjungan Baru
                                </Link>
                            </div>

                            <div className="mb-6 flex justify-between">
                                <div className="flex-1 mr-4">
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:ring-red-500"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                                <select
                                    className="border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:ring-red-500"
                                    value={selectedStatus}
                                    onChange={(e) => setSelectedStatus(e.target.value)}
                                >
                                    <option value="">Semua Status</option>
                                    <option value="pending">Pending</option>
                                    <option value="approved">Approved</option>
                                    <option value="rejected">Rejected</option>
                                    <option value="expired">Expired</option>
                                </select>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                ID Tiket
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                PIC
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Tanggal
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Waktu
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredVisits.map((visit) => (
                                            <tr key={visit.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {visit.id}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {visit.pic}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {new Date(visit.visit_date).toLocaleDateString('id-ID')}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {visit.visit_time_start} - {visit.visit_time_end}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(visit.status)}`}>
                                                        {visit.status.charAt(0).toUpperCase() + visit.status.slice(1)}
                                                    </span>
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
        </AuthenticatedLayout>
    );
}
