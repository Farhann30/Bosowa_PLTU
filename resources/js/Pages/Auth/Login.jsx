import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <>
            <Head title="Masuk - Buku Tamu" />

            <div className="min-h-screen flex items-center justify-center px-4 bg-white">
                <div className="w-full max-w-md bg-white rounded-lg p-8">
                    <div className="text-left mb-8">
                        <img src="/images/logo BSW.png" alt="BSW Logo" className="w-24 mb-4" />
                        <h1 className="text-2xl font-bold text-gray-900">Masuk</h1>
                        <p className="text-gray-600 mt-2">Silakan masuk untuk mengakses buku tamu</p>
                    </div>

                    {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

                    <form onSubmit={submit}>
                        <div>
                            <InputLabel htmlFor="email" value="Alamat Email" />

                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full rounded-3xl"
                                autoComplete="username"
                                placeholder="youremail@gmail.com"
                                isFocused={true}
                                onChange={(e) => setData('email', e.target.value)}
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
                                autoComplete="current-password"
                                placeholder="password123"
                                onChange={(e) => setData('password', e.target.value)}
                            />

                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                />
                                <span className="ms-2 text-sm text-gray-700">Ingat saya</span>
                            </div>

                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="underline text-sm text-gray-600 hover:text-gray-900"
                                >
                                    Lupa kata sandi?
                                </Link>
                            )}
                        </div>

                        <div className="mt-6">
                            <PrimaryButton className="w-full justify-center rounded-3xl bg-red-600 hover:bg-red-700" disabled={processing}>
                                {processing ? 'Memproses...' : 'Masuk'}
                            </PrimaryButton>
                        </div>

                        <div className="my-6 border-t border-gray-300"></div>

                        <div className="mt-6">
                            <p className="text-sm text-gray-700 mb-2">Belum punya akun?</p>
                                <Link href={route('register')}>
                                    <PrimaryButton className="w-full justify-center rounded-3xl bg-gray-300 text-red-700 hover:bg-gray-400">
                                        BUAT AKUN
                                    </PrimaryButton>
                                </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
