import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import PicLayout from '@/Layouts/PicLayout';
import { Card, CardContent } from "@/Components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";
import { Input } from "@/Components/ui/input";
import { toast } from "sonner";

export default function PicDashboard({ auth, visits }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredVisits, setFilteredVisits] = useState(visits);

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        const filtered = visits.filter(visit =>
            visit.visitor_name.toLowerCase().includes(query.toLowerCase()) ||
            visit.phone_number.includes(query) ||
            visit.agenda.toLowerCase().includes(query.toLowerCase())
        );

        setFilteredVisits(filtered);
    };

    const handleApprove = async (visitId) => {
        try {
            const response = await axios.post(`/api/visits/${visitId}/approve`);
            if (response.data.success) {
                toast.success('Kunjungan berhasil disetujui');
                window.location.reload();
            }
        } catch (error) {
            toast.error('Gagal menyetujui kunjungan');
        }
    };

    const handleReject = async (visitId) => {
        try {
            const response = await axios.post(`/api/visits/${visitId}/reject`);
            if (response.data.success) {
                toast.success('Kunjungan berhasil ditolak');
                window.location.reload();
            }
        } catch (error) {
            toast.error('Gagal menolak kunjungan');
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'pending':
                return <Badge variant="warning">Menunggu</Badge>;
            case 'approved':
                return <Badge variant="success">Disetujui</Badge>;
            case 'rejected':
                return <Badge variant="destructive">Ditolak</Badge>;
            default:
                return <Badge variant="secondary">{status}</Badge>;
        }
    };

    return (
        <PicLayout user={auth.user}>
            <Head title="Dashboard PIC" />

            <div className="py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                                <h2 className="text-2xl font-semibold text-gray-800">Daftar Kunjungan</h2>
                                <Input
                                    type="text"
                                    placeholder="Cari nama, nomor, atau agenda..."
                                    value={searchQuery}
                                    onChange={handleSearch}
                                    className="md:w-1/3"
                                />
                            </div>

                            <div className="rounded-md border overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="min-w-[120px]">Tanggal</TableHead>
                                            <TableHead className="min-w-[120px]">Waktu Mulai</TableHead>
                                            <TableHead className="min-w-[120px]">Waktu Selesai</TableHead>
                                            <TableHead className="min-w-[120px]">Jenis Gedung</TableHead>
                                            <TableHead className="min-w-[120px]">Kategori</TableHead>
                                            <TableHead className="min-w-[200px]">Agenda</TableHead>
                                            <TableHead className="min-w-[200px]">Catatan</TableHead>
                                            <TableHead className="min-w-[120px]">Telepon</TableHead>
                                            <TableHead className="min-w-[160px]">Email</TableHead>
                                            <TableHead className="min-w-[120px]">Status</TableHead>
                                            <TableHead className="min-w-[150px]">Aksi</TableHead>
                                        </TableRow>
                                    </TableHeader>

                                    <TableBody>
                                        {filteredVisits.length > 0 ? (
                                            filteredVisits.map((visit) => (
                                                <TableRow key={visit.id}>
                                                    <TableCell>
                                                        {new Date(visit.visit_date).toLocaleDateString('id-ID')}
                                                    </TableCell>
                                                    <TableCell>{visit.visit_time_start}</TableCell>
                                                    <TableCell>{visit.visit_time_end}</TableCell>
                                                    <TableCell>{visit.building_type}</TableCell>
                                                    <TableCell>{visit.building_category}</TableCell>
                                                    <TableCell>{visit.agenda}</TableCell>
                                                    <TableCell>{visit.notes || '-'}</TableCell>
                                                    <TableCell>{visit.phone}</TableCell>
                                                    <TableCell>{visit.email}</TableCell>
                                                    <TableCell>{getStatusBadge(visit.status)}</TableCell>
                                                    <TableCell>
                                                        {visit.status === 'pending' ? (
                                                            <div className="flex gap-2">
                                                                <Button
                                                                    variant="success"
                                                                    size="sm"
                                                                    onClick={() => handleApprove(visit.id)}
                                                                >
                                                                    Setujui
                                                                </Button>
                                                                <Button
                                                                    variant="destructive"
                                                                    size="sm"
                                                                    onClick={() => handleReject(visit.id)}
                                                                >
                                                                    Tolak
                                                                </Button>
                                                            </div>
                                                        ) : (
                                                            <span className="text-sm text-gray-400">-</span>
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan="11" className="text-center py-6 text-gray-500">
                                                    Tidak ada kunjungan yang ditemukan.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </PicLayout>
    );
}
