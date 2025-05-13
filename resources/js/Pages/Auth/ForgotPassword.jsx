import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <>
            <Head title="Lupa Kata Sandi - Buku Tamu" />

            <div className="min-h-screen flex items-center justify-center px-4 bg-white">
                <div className="w-full max-w-md bg-white rounded-lg p-8">
                    <div className="text-left mb-8">
                        <img src="/images/logo bosowa.png" alt="BSW Logo" className="w-40 mb-4" />
                        <h1 className="text-2xl font-bold text-gray-900">Lupa Kata Sandi</h1>
                        <p className="text-gray-600 mt-2">
                            Masukkan email Anda dan kami akan mengirimkan tautan untuk mengatur ulang kata sandi.
                        </p>
                    </div>

                    {status && (
                        <div className="mb-4 font-medium text-sm text-green-600">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit}>
                        <div>
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full rounded-3xl"
                                placeholder="youremail@gmail.com"
                                isFocused={true}
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />
                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div className="mt-6">
                            <PrimaryButton className="w-full justify-center rounded-3xl bg-red-600 hover:bg-red-700" disabled={processing}>
                                {processing ? 'Mengirim...' : 'Kirim Link Reset'}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
