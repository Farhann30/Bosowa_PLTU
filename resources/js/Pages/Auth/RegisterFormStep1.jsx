import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';

export default function RegisterFormStep1({ data, setData, errors }) {
    return (
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
} 