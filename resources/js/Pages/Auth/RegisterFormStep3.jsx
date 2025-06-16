export default function RegisterFormStep3({ data, setData }) {
    return (
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
    );
} 