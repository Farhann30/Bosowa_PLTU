import { Head, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm } from '@inertiajs/react';

export default function Asset({ auth, assets }) {
    const [showModal, setShowModal] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        category: '',
        code: '',
        location: '',
        description: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('assets.store'), {
            onSuccess: () => {
                setShowModal(false);
                reset();
            },
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Aset Saya" />
            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-2xl font-bold text-gray-900">Aset Saya</h1>
                                <button 
                                    onClick={() => setShowModal(true)}
                                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition font-semibold"
                                >
                                    + Tambah Aset
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead>
                                        <tr>
                                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Aset</th>
                                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
                                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kode</th>
                                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lokasi</th>
                                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deskripsi</th>
                                            <th className="px-6 py-3 bg-gray-50"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {assets && assets.length === 0 ? (
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500" colSpan={6}>
                                                    Belum ada data aset.
                                                </td>
                                            </tr>
                                        ) : (
                                            assets && assets.map((asset) => (
                                                <tr key={asset.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{asset.name}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {asset.category === 'laptop' ? 'Laptop' :
                                                         asset.category === 'hp' ? 'Handphone' :
                                                         asset.category === 'tablet' ? 'Tablet' : asset.category}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{asset.code}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{asset.location}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-900">{asset.description}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        {/* Tombol hapus atau aksi lain */}
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Tambah Aset */}
            {showModal && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-8 max-w-md w-full">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-gray-900">Tambah Aset Baru</h2>
                            <button 
                                onClick={() => setShowModal(false)}
                                className="text-gray-400 hover:text-gray-500"
                            >
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <InputLabel htmlFor="name" value="Nama Aset" />
                                    <TextInput
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="category" value="Kategori" />
                                    <select
                                        id="category"
                                        name="category"
                                        value={data.category}
                                        onChange={(e) => setData('category', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:ring-red-500"
                                        required
                                    >
                                        <option value="">Pilih Kategori</option>
                                        <option value="laptop">Laptop</option>
                                        <option value="hp">Handphone</option>
                                        <option value="tablet">Tablet</option>
                                    </select>
                                    <InputError message={errors.category} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="code" value="Kode/ID Aset" />
                                    <TextInput
                                        id="code"
                                        type="text"
                                        name="code"
                                        value={data.code}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('code', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.code} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="location" value="Lokasi Aset" />
                                    <TextInput
                                        id="location"
                                        type="text"
                                        name="location"
                                        value={data.location}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('location', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.location} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="description" value="Deskripsi" />
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:ring-red-500"
                                        rows={3}
                                    />
                                    <InputError message={errors.description} className="mt-2" />
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                >
                                    Batal
                                </button>
                                <PrimaryButton disabled={processing}>
                                    Simpan
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
} 