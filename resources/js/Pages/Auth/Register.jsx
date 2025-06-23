import { useEffect, useState, useRef } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { FaUpload } from 'react-icons/fa';
import imageCompression from 'browser-image-compression';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone: '',
        company_name: '',
        company_id_card: '',
        face_photo: null,
        id_card_photo: null,
        company_id_card_photo: null,
        agree: false,
    });
    const [step, setStep] = useState(1);
    const [preview, setPreview] = useState({
        face_photo: null,
        id_card_photo: null,
        company_id_card_photo: null,
    });
    const facePhotoRef = useRef();
    const idCardPhotoRef = useRef();
    const companyIdCardPhotoRef = useRef();
    const [alert, setAlert] = useState("");

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const handleFileChange = async (e, field) => {
        const file = e.target.files[0];
        if (!file) {
            setData(field, null);
            setPreview((prev) => ({ ...prev, [field]: null }));
            return;
        }

        const options = {
            maxSizeMB: 1, // Kompres gambar agar ukurannya di bawah 1MB
            maxWidthOrHeight: 1920, // Ubah resolusi jika terlalu besar
            useWebWorker: true,
        };

        try {
            const compressedFile = await imageCompression(file, options);
            setData(field, compressedFile);
            setPreview((prev) => ({ ...prev, [field]: URL.createObjectURL(compressedFile) }));
        } catch (error) {
            console.error('Gagal melakukan kompresi gambar:', error);
            // Jika gagal, gunakan file asli
            setData(field, file);
            setPreview((prev) => ({ ...prev, [field]: URL.createObjectURL(file) }));
        }
    };

    const nextStep = (e) => {
        e.preventDefault();
        if (step === 2) {
            if (!data.face_photo || !data.id_card_photo) {
                setAlert("Foto wajah dan foto KTP wajib diisi untuk melanjutkan ke step berikutnya.");
                return;
            }
        }
        setAlert("");
        setStep(step + 1);
    };
    const prevStep = (e) => {
        e.preventDefault();
        setStep(step - 1);
    };

    const submit = (e) => {
        e.preventDefault();
        console.log('face_photo:', data.face_photo);
        console.log('id_card_photo:', data.id_card_photo);
        console.log('company_id_card_photo:', data.company_id_card_photo);
        post(route('register'));
    };

    // STEP 1: Data Diri
    const renderStep1 = () => (
        <>
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
                <InputLabel htmlFor="phone" value="Nomor Telepon" />
                <TextInput
                    id="phone"
                    type="tel"
                    name="phone"
                    value={data.phone}
                    className="mt-1 block w-full rounded-3xl"
                    placeholder="081234567890"
                    onChange={(e) => setData('phone', e.target.value)}
                    required
                />
                <InputError message={errors.phone} className="mt-2" />
            </div>
            <div className="mt-4">
                <InputLabel htmlFor="company_name" value="Nama Perusahaan" />
                <TextInput
                    id="company_name"
                    name="company_name"
                    value={data.company_name}
                    className="mt-1 block w-full rounded-3xl"
                    placeholder="Nama Perusahaan"
                    onChange={(e) => setData('company_name', e.target.value)}
                    required
                />
                <InputError message={errors.company_name} className="mt-2" />
            </div>
            <div className="mt-4">
                <InputLabel htmlFor="company_id_card" value="Nomor Kartu Identitas Perusahaan" />
                <TextInput
                    id="company_id_card"
                    name="company_id_card"
                    value={data.company_id_card}
                    className="mt-1 block w-full rounded-3xl"
                    placeholder="Nomor Kartu Identitas Perusahaan"
                    onChange={(e) => setData('company_id_card', e.target.value)}
                    required
                />
                <InputError message={errors.company_id_card} className="mt-2" />
            </div>
        </>
    );

    // STEP 2: Upload Foto
    const renderStep2 = () => (
        <>
            {alert && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg font-semibold animate-pulse">
                    {alert}
                </div>
            )}
            <div className="mb-4">
                <InputLabel htmlFor="face_photo" value="Foto Wajah (Selfie)" />
                <div className="flex items-center gap-8">
                    {/* Kiri: Preview hasil upload dan tombol upload */}
                    <div className="flex flex-col items-center justify-center">
                        <div className="inline-block rounded-lg overflow-hidden w-64 h-64 bg-transparent flex flex-col items-center justify-center border border-dashed border-gray-300 mb-2">
                            {preview.face_photo ? (
                                <img src={preview.face_photo} alt="Preview Selfie" className="w-full h-full object-contain" />
                            ) : (
                                <span className="text-gray-400">Belum ada foto</span>
                            )}
                        </div>
                        <button
                            type="button"
                            className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg font-semibold shadow hover:bg-red-700 transition cursor-pointer mt-2"
                            onClick={() => facePhotoRef.current && facePhotoRef.current.click()}
                        >
                            <FaUpload className="mr-2" /> Upload Foto
                        </button>
                        <input
                            type="file"
                            id="face_photo"
                            name="face_photo"
                            accept="image/*"
                            className="hidden"
                            ref={facePhotoRef}
                            onChange={(e) => handleFileChange(e, 'face_photo')}
                        />
                    </div>
                    {/* Kanan: Contoh gambar */}
                    <div className="inline-block rounded-lg overflow-hidden w-64 h-64 bg-transparent flex flex-col items-center justify-center ml-auto">
                        <img src="/images/selfie.png" alt="Contoh Selfie" className="w-full h-full object-contain" />
                    </div>
                </div>
                <span className="text-xs text-gray-500">Sertakan foto selfie anda, pastikan foto terlihat jelas</span>
                <InputError message={errors.face_photo} className="mt-2" />
            </div>
            <div className="mb-4">
                <InputLabel htmlFor="id_card_photo" value="Foto KTP" />
                <div className="flex items-center gap-8">
                    {/* Kiri: Preview hasil upload dan tombol upload */}
                    <div className="flex flex-col items-center justify-center">
                        <div className="inline-block rounded-lg overflow-hidden w-64 h-64 bg-transparent flex flex-col items-center justify-center border border-dashed border-gray-300 mb-2">
                            {preview.id_card_photo ? (
                                <img src={preview.id_card_photo} alt="Preview KTP" className="w-full h-full object-contain" />
                            ) : (
                                <span className="text-gray-400">Belum ada foto</span>
                            )}
                        </div>
                        <button
                            type="button"
                            className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg font-semibold shadow hover:bg-red-700 transition cursor-pointer mt-2"
                            onClick={() => idCardPhotoRef.current && idCardPhotoRef.current.click()}
                        >
                            <FaUpload className="mr-2" /> Upload KTP
                        </button>
                        <input
                            type="file"
                            id="id_card_photo"
                            name="id_card_photo"
                            accept="image/*"
                            className="hidden"
                            ref={idCardPhotoRef}
                            onChange={(e) => handleFileChange(e, 'id_card_photo')}
                        />
                    </div>
                    {/* Kanan: Contoh gambar */}
                    <div className="inline-block rounded-lg overflow-hidden w-64 h-64 bg-transparent flex flex-col items-center justify-center ml-auto">
                        <img src="/images/IDCARD.jpeg" alt="Contoh KTP" className="w-full h-full object-contain" />
                    </div>
                </div>
                <span className="text-xs text-gray-500">Foto KTP harus terlihat jelas</span>
                <InputError message={errors.id_card_photo} className="mt-2" />
            </div>
            <div className="mb-4">
                <InputLabel htmlFor="company_id_card_photo" value="Foto Kartu Identitas Perusahaan (Opsional)" />
                <div className="flex items-center gap-8">
                    {/* Kiri: Preview hasil upload dan tombol upload */}
                    <div className="flex flex-col items-center justify-center">
                        <div className="inline-block rounded-lg overflow-hidden w-64 h-64 bg-transparent flex flex-col items-center justify-center border border-dashed border-gray-300 mb-2">
                            {preview.company_id_card_photo ? (
                                <img src={preview.company_id_card_photo} alt="Preview Kartu Perusahaan" className="w-full h-full object-contain" />
                            ) : (
                                <span className="text-gray-400">Belum ada foto</span>
                            )}
                        </div>
                        <button
                            type="button"
                            className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg font-semibold shadow hover:bg-red-700 transition cursor-pointer mt-2"
                            onClick={() => companyIdCardPhotoRef.current && companyIdCardPhotoRef.current.click()}
                        >
                            <FaUpload className="mr-2" /> Upload Kartu Perusahaan
                        </button>
                        <input
                            type="file"
                            id="company_id_card_photo"
                            name="company_id_card_photo"
                            accept="image/*"
                            className="hidden"
                            ref={companyIdCardPhotoRef}
                            onChange={(e) => handleFileChange(e, 'company_id_card_photo')}
                        />
                    </div>
                    {/* Kanan: Contoh gambar */}
                    <div className="inline-block rounded-lg overflow-hidden w-64 h-64 bg-transparent flex flex-col items-center justify-center ml-auto">
                        <img src="/images/idcardcompany.png" alt="Contoh Kartu Perusahaan" className="w-full h-full object-contain" />
                    </div>
                </div>
                <span className="text-xs text-gray-500">Foto kartu identitas perusahaan <b>tidak wajib</b> diisi</span>
                <InputError message={errors.company_id_card_photo} className="mt-2" />
            </div>
        </>
    );

    // STEP 3: Ketentuan & Password
    const renderStep3 = () => (
        <>
            <div className="space-y-4">
                <h2 className="text-lg font-bold">Syarat & Ketentuan</h2>
                <ul className="list-disc pl-6 text-sm text-gray-700">
                    <li>Data yang Anda masukkan harus benar dan dapat dipertanggungjawabkan.</li>
                    <li>Foto yang diunggah harus jelas dan sesuai dengan identitas Anda.</li>
                    <li>Setelah mendaftar, akun Anda akan diverifikasi oleh admin.</li>
                    <li>Jika data tidak valid, akun dapat ditolak.</li>
                </ul>
                <div className="flex items-center gap-2 mt-4">
                    <input
                        type="checkbox"
                        id="agree"
                        checked={data.agree || false}
                        onChange={e => setData('agree', e.target.checked)}
                        required
                    />
                    <label htmlFor="agree" className="text-sm">Saya menyetujui syarat & ketentuan di atas</label>
                </div>
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
        </>
    );

    return (
        <>
            <Head title="Daftar - Buku Tamu" />
            <div
                className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
                style={{
                    backgroundImage: "url('/images/BackgroundPage.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat"
                }}
            >
                <div className="w-full max-w-3xl p-8 relative z-10 bg-white/80 rounded-xl shadow-lg backdrop-blur-md overflow-auto" style={{maxHeight: '90vh'}}>
                    <div className="text-left mb-8">
                        <img src="/images/logo bosowa.png" alt="BSW Logo" className="w-40 mb-4 drop-shadow-lg" />
                        <h1 className="text-2xl font-bold text-gray-900">Daftar</h1>
                        <p className="text-gray-700 mt-2">Buat akun baru untuk mengakses buku tamu</p>
                    </div>
                    <form onSubmit={step === 3 ? submit : nextStep} encType="multipart/form-data">
                        {step === 1 && renderStep1()}
                        {step === 2 && renderStep2()}
                        {step === 3 && renderStep3()}
                        <div className="flex justify-between mt-8">
                            {step > 1 && (
                                <button type="button" onClick={prevStep} className="rounded-3xl px-6 py-2 bg-gray-300 text-gray-700 hover:bg-gray-400">Kembali</button>
                            )}
                            {step < 3 && (
                                <PrimaryButton className="rounded-3xl px-6" disabled={processing} type="submit">
                                    Selanjutnya
                                </PrimaryButton>
                            )}
                            {step === 3 && (
                                <PrimaryButton className="rounded-3xl px-6" disabled={processing || !data.agree} type="submit">
                                    {processing ? 'Memproses...' : 'Daftar'}
                                </PrimaryButton>
                            )}
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

