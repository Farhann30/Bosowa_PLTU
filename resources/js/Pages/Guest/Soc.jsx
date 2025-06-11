import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Card, CardContent } from '@/Components/ui/card';

export default function Soc({ auth }) {
    // Contoh daftar dokumen SOC
    const documents = [
        {
            title: 'SOP Penanganan Insiden Keamanan',
            description: 'Prosedur standar penanganan insiden keamanan siber di lingkungan PLTU Bosowa.',
            link: '/docs/soc/sop-penanganan-insiden.pdf',
        },
        {
            title: 'Kebijakan Keamanan Informasi',
            description: 'Dokumen kebijakan dan aturan terkait keamanan informasi perusahaan.',
            link: '/docs/soc/kebijakan-keamanan-informasi.pdf',
        },
        {
            title: 'Panduan Penggunaan Email Aman',
            description: 'Tips dan panduan untuk mencegah phishing dan serangan email.',
            link: '/docs/soc/panduan-email-aman.pdf',
        },
        // Tambahkan dokumen lain sesuai kebutuhan
    ];

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="SOC - Security Operations Center" />
            <div className="py-12 min-h-screen flex justify-center bg-gray-50">
                <div className="max-w-3xl w-full mx-auto space-y-8">
                    <h1 className="text-3xl font-bold mb-4 text-center">Dokumen SOC (Security Operations Center)</h1>
                    <p className="text-center text-gray-600 mb-8">Berikut adalah dokumen-dokumen penting terkait keamanan siber di lingkungan PLTU Bosowa.</p>

                    {documents.map((doc, idx) => (
                        <Card key={idx}>
                            <CardContent className="p-6">
                                <h2 className="text-xl font-semibold mb-2">{doc.title}</h2>
                                <p className="mb-4 text-gray-700">{doc.description}</p>
                                <a href={doc.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Lihat / Download</a>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
} 