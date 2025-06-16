import { Head, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm } from '@inertiajs/react';

export default function OutgoingGoods({ auth, goods = [] }) {
    const [showModal, setShowModal] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        quantity: '',
        receiver: '',
        date: '',
        keterangan: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('guest.outgoing-goods.store'), {
            onSuccess: () => {
                setShowModal(false);
                reset();
            },
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Barang Keluar" />
            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-2xl font-bold text-gray-900">Barang Keluar</h1>
                                <button
                                    onClick={() => setShowModal(true)}
                                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition font-semibold"
                                >
                                    + Tambah Barang Keluar
                                </button>
                            </div>
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
                                        {goods.length === 0 ? (
                                            <tr>
                                                <td className="px-6 py-4 text-sm text-gray-500" colSpan={5}>
                                                    Belum ada data barang keluar.
                                                </td>
                                            </tr>
                                        ) : (
                                            goods.map((item) => (
                                                <tr key={item.id}>
                                                    <td className="px-6 py-4 text-sm text-gray-900">{item.name}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-900">{item.quantity}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-900">{item.receiver}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-900">{item.date}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-900">{item.keterangan}</td>
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

            {/* Modal Tambah Barang Keluar */}
            {showModal && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-8 max-w-md w-full">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-gray-900">Tambah Barang Keluar</h2>
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
                                    <InputLabel htmlFor="name" value="Nama Barang" />
                                    <TextInput
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="mt-1 block w-full"
                                        required
                                    />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="quantity" value="Jumlah" />
                                    <TextInput
                                        id="quantity"
                                        type="number"
                                        value={data.quantity}
                                        onChange={(e) => setData('quantity', e.target.value)}
                                        className="mt-1 block w-full"
                                        required
                                    />
                                    <InputError message={errors.quantity} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="receiver" value="Penerima" />
                                    <TextInput
                                        id="receiver"
                                        type="text"
                                        value={data.receiver}
                                        onChange={(e) => setData('receiver', e.target.value)}
                                        className="mt-1 block w-full"
                                        required
                                    />
                                    <InputError message={errors.receiver} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="date" value="Tanggal Keluar" />
                                    <TextInput
                                        id="date"
                                        type="date"
                                        value={data.date}
                                        onChange={(e) => setData('date', e.target.value)}
                                        className="mt-1 block w-full"
                                        required
                                    />
                                    <InputError message={errors.date} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="keterangan" value="Keterangan" />
                                    <select
                                        id="keterangan"
                                        value={data.keterangan}
                                        onChange={(e) => setData('keterangan', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:ring-red-500"
                                        required
                                    >
                                        <option value="">Pilih Keterangan</option>
                                        <option value="Sementara">Sementara</option>
                                        <option value="Permanen">Permanen</option>
                                    </select>
                                    <InputError message={errors.keterangan} className="mt-2" />
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
