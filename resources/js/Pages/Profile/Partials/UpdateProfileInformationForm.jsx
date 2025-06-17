import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }) {
    const user = usePage().props.auth.user;

    // Form untuk data diri
    const { data: dataProfile, setData: setDataProfile, patch: patchProfile, errors: errorsProfile, processing: processingProfile, recentlySuccessful: recentlySuccessfulProfile } = useForm({
        name: user.name,
        email: user.email,
    });

    // Form untuk upload foto
    const { data: dataFoto, setData: setDataFoto, patch: patchFoto, errors: errorsFoto, processing: processingFoto, recentlySuccessful: recentlySuccessfulFoto } = useForm({
        face_photo_blob: '',
        id_card_photo: '',
        company_id_card_photo: '',
    });

    const handleFileChange = (e, field) => {
        setDataFoto(field, e.target.files[0]);
    };

    const submitProfile = (e) => {
        e.preventDefault();
        patchProfile(route('profile.update'));
    };

    const submitFoto = (e) => {
        e.preventDefault();
        const formData = new FormData();
        if (dataFoto.face_photo_blob) formData.append('face_photo_blob', dataFoto.face_photo_blob);
        if (dataFoto.id_card_photo) formData.append('id_card_photo', dataFoto.id_card_photo);
        if (dataFoto.company_id_card_photo) formData.append('company_id_card_photo', dataFoto.company_id_card_photo);
        patchFoto(route('profile.update'), {
            data: formData,
            forceFormData: true,
            onSuccess: () => window.location.reload(),
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Profile Information</h2>
                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information and email address.
                </p>
            </header>

            {/* Form Data Diri */}
            <form onSubmit={submitProfile} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="Name" />
                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={dataProfile.name}
                        onChange={(e) => setDataProfile('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />
                    <InputError className="mt-2" message={errorsProfile.name} />
                </div>
                <div>
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={dataProfile.email}
                        onChange={(e) => setDataProfile('email', e.target.value)}
                        required
                        autoComplete="username"
                    />
                    <InputError className="mt-2" message={errorsProfile.email} />
                </div>
                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2 text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>
                        {status === 'verification-link-sent' && (
                            <div className="mt-2 font-medium text-sm text-green-600">
                                A new verification link has been sent to your email address.
                            </div>
                        )}
                    </div>
                )}
                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processingProfile}>Save Data Diri</PrimaryButton>
                    <Transition
                        show={recentlySuccessfulProfile}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>

            {/* Form Upload Foto */}
            {/* Bagian upload foto dihapus, hanya form data diri yang tersisa */}
        </section>
    );
}
