import { Head } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import SelectInput from '@/Components/SelectInput';
import Checkbox from '@/Components/Checkbox';
import Modal from '@/Components/Modal';

export default function Create({ auth, assets = [] }) {
    const [currentStep, setCurrentStep] = useState(1);
    const { data, setData, post, processing, errors } = useForm({
        visit_date: '',
        visit_time_start: '',
        visit_time_end: '',
        building_type: '',
        building_category: '',
        agenda: '',
        meet_with: '',
        notes: '',
        phone: '',
        email: '',
        agreement: false,
    });

    // Tambahan untuk autocomplete PIC
    const [picInput, setPicInput] = useState('');
    const [picOptions, setPicOptions] = useState([]);
    const [selectedPic, setSelectedPic] = useState(null);

    const [showAssetModal, setShowAssetModal] = useState(false);
    const [selectedAssets, setSelectedAssets] = useState([]);

    useEffect(() => {
        if (picInput.length > 0) {
            fetch(`/api/pics?search=${picInput}`)
                .then(res => res.json())
                .then(data => setPicOptions(data));
        } else {
            setPicOptions([]);
        }
    }, [picInput]);

    const nextStep = () => {
        setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        setCurrentStep(currentStep - 1);
    };

    const submit = (e) => { //error msg
        e.preventDefault();
    
        const validationErrors = [];
    
        if (!data.phone || data.phone.trim() === '') {
            validationErrors.push('Tolong isi nomor telepon anda');
        }

        if (!data.visit_date || data.visit_date.trim() === '') {
            validationErrors.push('Tolong isi tanggal kunjungan');
        }
        
        if (!data.visit_time_end || data.visit_time_end.trim() === '') {
            validationErrors.push('Tolong isi jam selesai kunjungan');
        }
        
        if (!data.visit_time_start || data.visit_time_start.trim() === '') {
            validationErrors.push('Tolong isi jam mulai kunjungan');
        }

        if (!data.agenda|| data.agenda.trim() === '') {
            validationErrors.push('Tolong isi agenda kunjungan');    
        }

        if (!data.email || data.email.trim() === '') {
            validationErrors.push('Tolong isi Nama PIC');
        }

        if (!data.building_type || data.building_type.trim() === '') {
            validationErrors.push('Tolong isi tipe bangunan');
        }
        
        if (!data.email || data.email.trim() === '') {
            validationErrors.push('Tolong isi email anda');
        }
    
        if (!data.agreement) {
            validationErrors.push('Anda harus menyetujui persyaratan');
        }
    
        if (validationErrors.length > 0) {
            alert(validationErrors.join('\n'));
            return;
        }
    
        post(route('visits.store'), {
            onSuccess: () => {
                console.log('Success submitting data');
                window.location = route('visits.index');
            },
            onError: (errors) => {
                console.error('Error submitting data:', errors);
            },
            preserveScroll: true,
        });
    };

    const handleAssetCheck = (id) => {
        setSelectedAssets((prev) =>
            prev.includes(id) ? prev.filter((aid) => aid !== id) : [...prev, id]
        );
    };

    const renderStep1 = () => (
        <div className="space-y-6">
            <div>
                <InputLabel htmlFor="visit_date" value="Tanggal Kunjungan" />
                <TextInput
                    id="visit_date"
                    name="visit_date"
                    type="date"
                    value={data.visit_date}
                    onChange={(e) => setData('visit_date', e.target.value)}
                    className="mt-1 block w-full"
                    required
                />
                <InputError message={errors.visit_date} className="mt-1" />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <InputLabel htmlFor="visit_time_start" value="Dari" />
                    <TextInput
                        id="visit_time_start"
                        name="visit_time_start"
                        type="time"
                        value={data.visit_time_start}
                        onChange={(e) => setData('visit_time_start', e.target.value)}
                        className="mt-1 block w-full"
                        required
                    />
                    <InputError message={errors.visit_time_start} className="mt-1" />
                </div>
                <div>
                    <InputLabel htmlFor="visit_time_end" value="Sampai" />
                    <TextInput
                        id="visit_time_end"
                        name="visit_time_end"
                        type="time"
                        value={data.visit_time_end}
                        onChange={(e) => setData('visit_time_end', e.target.value)}
                        className="mt-1 block w-full"
                        required
                    />
                    <InputError message={errors.visit_time_end} className="mt-1" />
                </div>
            </div>

            <div>
                <InputLabel htmlFor="building_type" value="Jenis Gedung" />
                <SelectInput
                    id="building_type"
                    name="building_type"
                    value={data.building_type}
                    onChange={(e) => setData('building_type', e.target.value)}
                    className="mt-1 block w-full"
                >
                    <option value="">Pilih Jenis Gedung</option>
                    <option value="Plant">Plant</option>
                    <option value="Office">Office</option>
                    <option value="Workshop">Workshop</option>
                </SelectInput>
                <InputError message={errors.building_type} className="mt-1" />
            </div>

            <div>
                <InputLabel htmlFor="building_category" value="Kategori Gedung" />
                <SelectInput
                    id="building_category"
                    name="building_category"
                    value={data.building_category}
                    onChange={(e) => setData('building_category', e.target.value)}
                    className="mt-1 block w-full"
                >
                    <option value="">Pilih Kategori Gedung</option>
                    <option value="Restricted">Restricted</option>
                    <option value="Semi-Restricted">Semi-Restricted</option>
                    <option value="Non-Restricted">Non-Restricted</option>
                </SelectInput>
                <InputError message={errors.building_category} className="mt-1" />
            </div>
        </div>
    );

    const renderStep2 = () => (
        <div className="space-y-6">
            <div>
                <InputLabel htmlFor="agenda" value="Agenda" />
                <SelectInput
                    id="agenda"
                    name="agenda"
                    value={data.agenda}
                    onChange={(e) => setData('agenda', e.target.value)}
                    className="mt-1 block w-full"
                >
                    <option value="">Pilih Agenda</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Audit">Audit</option>
                    <option value="Others">Others</option>
                </SelectInput>
                <InputError message={errors.agenda} className="mt-1" />
            </div>

            <div className="relative">
                <InputLabel htmlFor="meet_with" value="Bertemu Dengan (PIC)" />
                <TextInput
                    id="meet_with"
                    name="meet_with"
                    value={picInput}
                    onChange={e => {
                        setPicInput(e.target.value);
                        setSelectedPic(null);
                        setData('meet_with', e.target.value);
                    }}
                    type="text"
                    className="mt-1 block w-full"
                    placeholder="Nama PIC"
                    autoComplete="off"
                />
                {/* Dropdown hasil pencarian PIC */}
                {picOptions.length > 0 && (
                    <ul className="absolute left-0 right-0 bg-white border rounded shadow z-20 max-h-48 overflow-y-auto">
                        {picOptions.map(pic => (
                            <li
                                key={pic.id}
                                className="p-2 hover:bg-gray-200 cursor-pointer"
                                onClick={() => {
                                    setSelectedPic(pic);
                                    setPicInput(pic.nama);
                                    setData('meet_with', pic.nama);
                                    setData('pic_id', pic.id);
                                    setPicOptions([]);
                                }}
                            >
                                {pic.nama} ({pic.email})
                            </li>
                        ))}
                    </ul>
                )}
                {/* Hidden input untuk ID PIC */}
                <input type="hidden" name="pic_id" value={selectedPic ? selectedPic.id : ''} />
                <InputError message={errors.meet_with} className="mt-1" />
            </div>

            <div>
                <InputLabel htmlFor="notes" value="Catatan (Opsional)" />
                <textarea
                    id="notes"
                    name="notes"
                    value={data.notes}
                    onChange={(e) => setData('notes', e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    rows={4}
                />
                <InputError message={errors.notes} className="mt-1" />
            </div>
        </div>
    );

    const renderStep3 = () => (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold">Pilih Aset yang Dibawa</h2>
            <p className="text-gray-600">Silakan pilih aset yang akan Anda bawa saat kunjungan. Jika belum ada, tambahkan aset terlebih dahulu.</p>
            <div className="flex justify-center">
                <button
                    type="button"
                    className="inline-flex items-center px-6 py-3 bg-white border border-red-500 text-red-600 rounded-lg font-semibold shadow hover:bg-red-50 transition"
                    onClick={() => setShowAssetModal(true)}
                >
                    + Tambah Aset
                </button>
            </div>
            {/* Tampilkan aset terpilih */}
            {selectedAssets.length > 0 && (
                <div className="mt-4">
                    <h3 className="font-semibold mb-2">Aset Terpilih:</h3>
                    <ul className="list-disc ml-6">
                        {assets.filter(a => selectedAssets.includes(a.id)).map(a => (
                            <li key={a.id}>{a.name} ({a.category}) - {a.code}</li>
                        ))}
                    </ul>
                </div>
            )}
            {/* Modal checklist aset */}
            {showAssetModal && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-8 max-w-md w-full">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-gray-900">Pilih Aset</h2>
                            <button onClick={() => setShowAssetModal(false)} className="text-gray-400 hover:text-gray-500">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div>
                            <div className="space-y-2 max-h-64 overflow-y-auto">
                                {assets.length === 0 ? (
                                    <div className="text-gray-500">Belum ada aset.</div>
                                ) : (
                                    assets.map(asset => (
                                        <label key={asset.id} className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                checked={selectedAssets.includes(asset.id)}
                                                onChange={() => handleAssetCheck(asset.id)}
                                            />
                                            <span>{asset.name} ({asset.category}) - {asset.code}</span>
                                        </label>
                                    ))
                                )}
                            </div>
                            <div className="mt-6 flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => setShowAssetModal(false)}
                                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition font-semibold"
                                >
                                    Simpan Pilihan
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

    const renderStep4 = () => (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold">Info Pribadi</h2>
            <div>
                <InputLabel htmlFor="phone" value="No Telepon Saya" />
                <TextInput
                    id="phone"
                    type="tel"
                    value={data.phone}
                    onChange={(e) => setData('phone', e.target.value)}
                    className="mt-1 block w-full"
                    required
                />
                <InputError message={errors.phone} className="mt-1" />
            </div>

            <div>
                <InputLabel htmlFor="email" value="Email Saya" />
                <TextInput
                    id="email"
                    type="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    className="mt-1 block w-full"
                    required
                />
                <InputError message={errors.email} className="mt-1" />
            </div>

            <div className="mt-4">
                <label className="flex items-start">
                    <Checkbox
                        name="agreement"
                        checked={data.agreement}
                        onChange={(e) => setData('agreement', e.target.checked)}
                    />
                    <span className="ml-2 text-sm text-gray-600">
                        Saya menyatakan bahwa:<br />
                        1. Saya tidak bepergian dan tidak melakukan kontak tatap muka dengan seorang dari negara endemik virus corona (Covid 19) dalam kurun waktu 14 hari terakhir<br />
                        2. Saya bersedia mengikuti setiap aturan, K3 dan Safety Induction yang sudah saya baca dan tonton di awal pendaftaran yang berlaku di PLTU BOSOWA ENERGI selama bertamu dan bekerja di wilayah kerja PLTU BOSOWA ENERGI<br />
                        3. Saya bersedia mematuhi HSE yang berlaku di PLTU BOSOWA ENERGI
                    </span>
                </label>
                <InputError message={errors.agreement} className="mt-1" />
            </div>
        </div>
    );

    const renderCurrentStep = () => {
        switch (currentStep) {
            case 1:
                return renderStep1();
            case 2:
                return renderStep2();
            case 3:
                return renderStep3();
            case 4:
                return renderStep4();
            default:
                return null;
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Buat Kunjungan Baru" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <form onSubmit={submit}>
                                {/* Progress Bar */}
                                <div className="mb-8">
                                    <div className="flex justify-between mb-2">
                                        {[1, 2, 3, 4].map((step) => (
                                            <div
                                                key={step}
                                                className={`w-1/4 h-2 ${
                                                    step <= currentStep ? 'bg-red-600' : 'bg-gray-200'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {renderCurrentStep()}

                                <div className="mt-6 flex justify-between">
                                    {currentStep > 1 && (
                                        <button
                                            type="button"
                                            onClick={prevStep}
                                            className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150"
                                        >
                                            Kembali
                                        </button>
                                    )}
                                    
                                    {currentStep < 4 ? (
                                        <button
                                            disabled={processing || !data}
                                            type="button"
                                            onClick={nextStep}
                                            className="inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-700 focus:bg-red-700 active:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                        >
                                            Selanjutnya
                                        </button>
                                    ) : (
                                        <button
                                            type="submit"
                                            disabled={processing || !data.agreement}
                                            className="inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-700 focus:bg-red-700 active:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150 disabled:opacity-25"
                                        >
                                            Submit
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}