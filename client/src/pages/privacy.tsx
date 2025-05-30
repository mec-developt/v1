export default function Privacy() {
  return (
    <div className="py-16 sm:py-24 bg-muted/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-foreground mb-6">
            Kebijakan Privasi
          </h1>
          <p className="text-lg text-muted-foreground">
            Terakhir diperbarui: 30 Mei 2025
          </p>
        </div>
        
        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
          <h2 className="text-2xl font-display font-bold text-foreground mb-4">1. Informasi yang Kami Kumpulkan</h2>
          <ul className="space-y-2 text-muted-foreground mb-6">
            <li><strong className="text-foreground">Data Profil:</strong> Nama, email, username, bio, foto profil</li>
            <li><strong className="text-foreground">Data Penggunaan:</strong> Analytics klik, views, perangkat yang digunakan</li>
            <li><strong className="text-foreground">Data Teknis:</strong> IP address (di-hash untuk privasi), browser, sistem operasi</li>
          </ul>
          
          <h2 className="text-2xl font-display font-bold text-foreground mb-4">2. Bagaimana Kami Menggunakan Data</h2>
          <ul className="space-y-2 text-muted-foreground mb-6">
            <li>Menyediakan dan meningkatkan layanan</li>
            <li>Menampilkan analytics penggunaan</li>
            <li>Komunikasi terkait layanan</li>
            <li>Keamanan dan pencegahan spam</li>
          </ul>
          
          <h2 className="text-2xl font-display font-bold text-foreground mb-4">3. Pembagian Data</h2>
          <p className="text-muted-foreground mb-4">
            <strong className="text-foreground">Kami TIDAK membagikan data pribadi Anda kepada pihak ketiga</strong> untuk tujuan komersial. Data hanya dibagikan dalam kondisi:
          </p>
          <ul className="space-y-2 text-muted-foreground mb-6">
            <li>Atas persetujuan eksplisit Anda</li>
            <li>Karena kewajiban hukum</li>
            <li>Untuk melindungi hak dan keamanan platform</li>
          </ul>
          
          <h2 className="text-2xl font-display font-bold text-foreground mb-4">4. Keamanan Data</h2>
          <p className="text-muted-foreground mb-6">
            Kami menggunakan enkripsi dan security measures industry-standard untuk melindungi data Anda. Namun, tidak ada sistem yang 100% aman.
          </p>
          
          <h2 className="text-2xl font-display font-bold text-foreground mb-4">5. Hak Pengguna</h2>
          <ul className="space-y-2 text-muted-foreground mb-6">
            <li>Mengakses data pribadi Anda</li>
            <li>Memperbaiki data yang tidak akurat</li>
            <li>Menghapus akun dan data</li>
            <li>Membatasi pemrosesan data</li>
            <li>Portabilitas data</li>
          </ul>
          
          <h2 className="text-2xl font-display font-bold text-foreground mb-4">6. Cookies dan Tracking</h2>
          <p className="text-muted-foreground mb-6">
            Kami menggunakan cookies untuk analytics dan meningkatkan pengalaman pengguna. Anda dapat mengatur preferensi cookies di browser Anda.
          </p>
          
          <h2 className="text-2xl font-display font-bold text-foreground mb-4">7. Penyimpanan Data</h2>
          <p className="text-muted-foreground mb-6">
            Data disimpan di server yang berlokasi di Indonesia dan Singapore. Data akan dihapus jika akun dihapus atau setelah periode inaktif yang lama.
          </p>
          
          <h2 className="text-2xl font-display font-bold text-foreground mb-4">8. Kontak</h2>
          <p className="text-muted-foreground mb-6">
            Untuk pertanyaan mengenai privasi atau untuk menggunakan hak Anda, hubungi kami di privacy@tumbuhide.com
          </p>
        </div>
      </div>
    </div>
  );
}
