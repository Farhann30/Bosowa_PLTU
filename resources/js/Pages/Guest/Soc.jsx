import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Soc({ auth }) {
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
    ];

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dokumen SOC" />
            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="mb-8">
                                <h1 className="text-2xl font-bold text-gray-900 mb-2">Dokumen SOC (Security Operations Center)</h1>
                                <p className="text-gray-600">
                                    Berikut adalah dokumen-dokumen penting terkait keamanan siber di lingkungan PLTU Bosowa.
                                </p>
                            </div>

                            <div className="space-y-6">
                                {documents.map((doc, idx) => (
                                    <div
                                        key={idx}
                                        className="border border-gray-200 rounded-lg p-5 bg-gray-50 hover:bg-white transition shadow-sm"
                                    >
                                        <h2 className="text-lg font-semibold text-gray-800 mb-2">{doc.title}</h2>
                                        <p className="text-gray-700 mb-3">{doc.description}</p>
                                        <a
                                            href={doc.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-block px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition"
                                        >
                                            Lihat / Download
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
