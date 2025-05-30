export default function About() {
  return (
    <div className="py-16 sm:py-24 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-foreground mb-6">
            Tentang Tumbuh Ide Indonesia
          </h1>
          <p className="text-xl text-muted-foreground">
            Platform yang lahir dari kepedulian terhadap perkembangan ekosistem digital Indonesia
          </p>
        </div>
        
        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
          <img 
            src="https://images.unsplash.com/photo-1555109307-f7d9da25c244?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400" 
            alt="Pemandangan alam Indonesia yang menggambarkan pertumbuhan dan perkembangan" 
            className="w-full h-64 object-cover rounded-xl shadow-lg mb-8"
          />
          
          <h2 className="text-2xl font-display font-bold text-foreground mb-4">Misi Kami</h2>
          <p className="text-muted-foreground mb-6">
            Tumbuh Ide Indonesia hadir untuk memberdayakan content creator dan brand lokal dalam memaksimalkan potensi digital mereka. Kami percaya bahwa setiap creator dan brand Indonesia memiliki cerita unik yang layak untuk didengar dan dilihat oleh dunia.
          </p>
          
          <h2 className="text-2xl font-display font-bold text-foreground mb-4">Visi Kami</h2>
          <p className="text-muted-foreground mb-6">
            Menjadi platform pilihan utama bagi content creator dan brand Indonesia untuk membangun presence digital yang kuat, profesional, dan mudah diakses oleh audience mereka.
          </p>
          
          <h2 className="text-2xl font-display font-bold text-foreground mb-4">Mengapa Fokus di Surabaya, Gresik, dan Sidoarjo?</h2>
          <p className="text-muted-foreground mb-6">
            Kami memulai dari wilayah Jawa Timur karena melihat potensi besar ekosistem digital yang sedang berkembang pesat di daerah ini. Surabaya sebagai kota metropolitan kedua di Indonesia, ditambah dengan Gresik dan Sidoarjo yang memiliki komunitas bisnis dan creator yang aktif, menjadi fondasi yang sempurna untuk memulai misi kami.
          </p>
          
          <h2 className="text-2xl font-display font-bold text-foreground mb-4">Komitmen Kami</h2>
          <ul className="space-y-2 text-muted-foreground mb-6">
            <li><strong className="text-foreground">Gratis untuk Semua:</strong> Akses tanpa biaya untuk semua fitur dasar</li>
            <li><strong className="text-foreground">Mobile-First:</strong> Dirancang khusus untuk pengguna mobile Indonesia</li>
            <li><strong className="text-foreground">Dukungan Lokal:</strong> Tim support yang memahami kebutuhan creator Indonesia</li>
            <li><strong className="text-foreground">Privacy First:</strong> Data Anda aman dan tidak akan dibagikan ke pihak ketiga</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
