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
            users.name.toLowerCase().includes(query.toLowerCase()) ||
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
                // Refresh halaman untuk update data
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
                // Refresh halaman untuk update data
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

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-semibold">Daftar Kunjungan</h2>
                                <div className="w-1/3">
                                    <Input
                                        type="text"
                                        placeholder="Cari kunjungan..."
                                        value={searchQuery}
                                        onChange={handleSearch}
                                    />
                                </div>
                            </div>

                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Tanggal</TableHead>
                                            <TableHead>Nama Pengunjung</TableHead>
                                            <TableHead>Agenda</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Aksi</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredVisits.map((visit) => (
                                            <TableRow key={visit.id}>
                                                <TableCell>
                                                    {new Date(visit.visit_date).toLocaleDateString('id-ID')}
                                                </TableCell>
                                                <TableCell>{visit.name}</TableCell>
                                                <TableCell>{visit.agenda}</TableCell>
                                                <TableCell>{getStatusBadge(visit.status)}</TableCell>
                                                <TableCell>
                                                    {visit.status === 'pending' && (
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
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ))}
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