import { useState } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';

export default function AddVisit() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        purpose: '',
        meet_person: '',
        visit_date: '',
        notes: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log('Form submitted:', formData);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Tambah Kunjungan - Buku Tamu Digital" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="mb-6">
                                <h1 className="text-3xl font-bold text-gray-900">
                                    Tambah Kunjungan Baru
                                </h1>
                                <p className="text-gray-600 mt-2">
                                    Isi formulir di bawah ini untuk menambahkan kunjungan baru
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Informasi Tamu */}
                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <h2 className="text-xl font-semibold mb-4">Informasi Tamu</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <InputLabel htmlFor="name" value="Nama Lengkap" />
                                            <TextInput
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="mt-1 block w-full"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="email" value="Email" />
                                            <TextInput
                                                id="email"
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="mt-1 block w-full"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="phone" value="Nomor Telepon" />
                                            <TextInput
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="mt-1 block w-full"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="company" value="Perusahaan/Instansi" />
                                            <TextInput
                                                id="company"
                                                name="company"
                                                value={formData.company}
                                                onChange={handleChange}
                                                className="mt-1 block w-full"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Informasi Kunjungan */}
                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <h2 className="text-xl font-semibold mb-4">Informasi Kunjungan</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <InputLabel htmlFor="purpose" value="Tujuan Kunjungan" />
                                            <textarea
                                                id="purpose"
                                                name="purpose"
                                                value={formData.purpose}
                                                onChange={handleChange}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                rows="3"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="meet_person" value="Ingin Bertemu Dengan" />
                                            <TextInput
                                                id="meet_person"
                                                name="meet_person"
                                                value={formData.meet_person}
                                                onChange={handleChange}
                                                className="mt-1 block w-full"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="visit_date" value="Tanggal Kunjungan" />
                                            <TextInput
                                                id="visit_date"
                                                type="datetime-local"
                                                name="visit_date"
                                                value={formData.visit_date}
                                                onChange={handleChange}
                                                className="mt-1 block w-full"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="notes" value="Catatan Tambahan" />
                                            <textarea
                                                id="notes"
                                                name="notes"
                                                value={formData.notes}
                                                onChange={handleChange}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                rows="3"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-end gap-4">
                                    <button
                                        type="button"
                                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                        onClick={() => window.history.back()}
                                    >
                                        Batal
                                    </button>
                                    <PrimaryButton type="submit">
                                        Simpan Kunjungan
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
