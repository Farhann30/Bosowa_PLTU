import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <>
            <Head title="Daftar - Buku Tamu" />

            <div className="min-h-screen flex items-center justify-center px-4 bg-white">
                <div className="w-full max-w-md bg-white rounded-lg p-8">
                    <div className="text-left mb-8">
                        <img src="/images/logo BSW.png" alt="BSW Logo" className="w-24 mb-4" />
                        <h1 className="text-2xl font-bold text-gray-900">Daftar Akun</h1>
                        <p className="text-gray-600 mt-2">Buat akun baru untuk mengakses buku tamu</p>
                    </div>

                    <form onSubmit={submit}>
                        <div>
                            <InputLabel htmlFor="name" value="Nama Lengkap" />

                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                placeholder="Nama Lengkap"
                                className="mt-1 block w-full rounded-3xl"
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />

                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="email" value="Alamat Email" />

                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full rounded-3xl"
                                autoComplete="username"
                                placeholder="youremail@gmail.com"
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />

                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="password" value="Kata Sandi" />

                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full rounded-3xl"
                                autoComplete="new-password"
                                placeholder="password123"
                                onChange={(e) => setData('password', e.target.value)}
                                required
                            />

                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="password_confirmation" value="Konfirmasi Kata Sandi" />

                            <TextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                placeholder="password123"
                                value={data.password_confirmation}
                                className="mt-1 block w-full rounded-3xl"
                                autoComplete="new-password"
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                required
                            />

                            <InputError message={errors.password_confirmation} className="mt-2" />
                        </div>

                        <div className="mt-6">
                            <PrimaryButton className="w-full justify-center rounded-3xl bg-red-600 hover:bg-red-700" disabled={processing}>
                                {processing ? 'Memproses...' : 'Daftar'}
                            </PrimaryButton>
                        </div>

                        <div className="my-6 border-t border-gray-300"></div>

                        <div className="mt-6">
                            <p className="text-sm text-gray-700 mb-2">Sudah punya akun?</p>
                            <Link href={route('login')}>
                                <PrimaryButton className="w-full justify-center rounded-3xl bg-gray-300 text-red-700 hover:bg-gray-400">
                                    MASUK
                                </PrimaryButton>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
