import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';

export default function RegisterFormStep2({ data, setData, errors, handleFileChange }) {
    return (
        <>
            <div className="mb-4">
                <InputLabel htmlFor="face_photo" value="Foto Wajah (Selfie)" />
                <div className="flex items-center gap-4">
                    <input
                        type="file"
                        id="face_photo"
                        name="face_photo"
                        accept="image/*"
                        className="mt-1 block w-full"
                        onChange={(e) => handleFileChange(e, 'face_photo')}
                        required
                    />
                    <img src="/images/selfie.png" alt="Contoh Selfie" className="w-20 h-20 object-cover rounded-lg border" />
                </div>
                <span className="text-xs text-gray-500">Sertakan foto selfie anda, pastikan foto terlihat jelas</span>
                <InputError message={errors.face_photo} className="mt-2" />
            </div>
            <div className="mb-4">
                <InputLabel htmlFor="id_card_photo" value="Foto KTP" />
                <div className="flex items-center gap-4">
                    <input
                        type="file"
                        id="id_card_photo"
                        name="id_card_photo"
                        accept="image/*"
                        className="mt-1 block w-full"
                        onChange={(e) => handleFileChange(e, 'id_card_photo')}
                        required
                    />
                    <img src="/images/IDCARD.jpeg" alt="Contoh KTP" className="w-20 h-20 object-cover rounded-lg border" />
                </div>
                <span className="text-xs text-gray-500">Foto KTP harus terlihat jelas</span>
                <InputError message={errors.id_card_photo} className="mt-2" />
            </div>
            <div className="mb-4">
                <InputLabel htmlFor="company_id_card_photo" value="Foto Kartu Identitas Perusahaan" />
                <div className="flex items-center gap-4">
                    <input
                        type="file"
                        id="company_id_card_photo"
                        name="company_id_card_photo"
                        accept="image/*"
                        className="mt-1 block w-full"
                        onChange={(e) => handleFileChange(e, 'company_id_card_photo')}
                        required
                    />
                    <img src="/images/contoh_kartu_perusahaan.jpg" alt="Contoh Kartu Perusahaan" className="w-20 h-20 object-cover rounded-lg border" />
                </div>
                <span className="text-xs text-gray-500">Foto kartu identitas perusahaan harus terlihat jelas</span>
                <InputError message={errors.company_id_card_photo} className="mt-2" />
            </div>
        </>
    );
} 