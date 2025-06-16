import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

export default function UpdatePictureForm({ className = '' }) {
    const user = usePage().props.auth.user;
    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        face_photo_blob: '',
        id_card_photo: '',
        company_id_card_photo: '',
    });

    const handleFileChange = (e, field) => {
        setData(field, e.target.files[0]);
    };

    const submit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        if (data.face_photo_blob) formData.append('face_photo_blob', data.face_photo_blob);
        if (data.id_card_photo) formData.append('id_card_photo', data.id_card_photo);
        if (data.company_id_card_photo) formData.append('company_id_card_photo', data.company_id_card_photo);
        patch(route('profile.update'), {
            data: formData,
            forceFormData: true,
            onSuccess: () => window.location.reload(),
        });
    };

    return (
        <section className={className}>
            <h3 className="text-md font-semibold text-gray-800 mb-2">Upload Foto Identitas</h3>
            <form onSubmit={submit} className="space-y-6" encType="multipart/form-data">
                {/* Input foto wajah jika belum ada */}
                {(!user.face_photo_blob && !user.face_photo) && (
                    <div>
                        <InputLabel htmlFor="face_photo_blob" value="Upload Foto Wajah" />
                        <input
                            id="face_photo_blob"
                            type="file"
                            accept="image/*"
                            className="mt-1 block w-full"
                            onChange={e => handleFileChange(e, 'face_photo_blob')}
                        />
                        <InputError className="mt-2" message={errors.face_photo_blob} />
                    </div>
                )}
                {/* Input foto KTP jika belum ada */}
                {!user.id_card_photo && (
                    <div>
                        <InputLabel htmlFor="id_card_photo" value="Upload Foto KTP" />
                        <input
                            id="id_card_photo"
                            type="file"
                            accept="image/*"
                            className="mt-1 block w-full"
                            onChange={e => handleFileChange(e, 'id_card_photo')}
                        />
                        <InputError className="mt-2" message={errors.id_card_photo} />
                    </div>
                )}
                {/* Input foto Kartu Perusahaan jika belum ada */}
                {!user.company_id_card_photo && (
                    <div>
                        <InputLabel htmlFor="company_id_card_photo" value="Upload Foto Kartu Perusahaan" />
                        <input
                            id="company_id_card_photo"
                            type="file"
                            accept="image/*"
                            className="mt-1 block w-full"
                            onChange={e => handleFileChange(e, 'company_id_card_photo')}
                        />
                        <InputError className="mt-2" message={errors.company_id_card_photo} />
                    </div>
                )}
                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save Foto</PrimaryButton>
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Foto berhasil diupload.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
} 