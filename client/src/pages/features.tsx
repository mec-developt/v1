import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Link2, 
  Smartphone, 
  BarChart3, 
  Shield, 
  Zap, 
  Globe,
  Users,
  Heart,
  Star
} from "lucide-react";

const features = [
  {
    icon: Link2,
    title: "Satu Link, Semua Platform",
    description: "Gabungkan Instagram, TikTok, YouTube, Facebook, dan platform lainnya dalam satu link yang mudah dibagikan.",
    color: "bg-primary/10 text-primary"
  },
  {
    icon: Smartphone,
    title: "Mobile-First Design",
    description: "Tampilan yang dioptimalkan untuk mobile, sempurna untuk audience Indonesia yang mayoritas menggunakan smartphone.",
    color: "bg-secondary/10 text-secondary"
  },
  {
    icon: BarChart3,
    title: "Analytics Lengkap",
    description: "Pantau performa link Anda dengan analytics detail, termasuk klik, views, dan demografi pengunjung.",
    color: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
  },
  {
    icon: Shield,
    title: "Keamanan Terjamin",
    description: "Data Anda aman dengan enkripsi tingkat enterprise dan tidak akan dibagikan ke pihak ketiga.",
    color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
  },
  {
    icon: Zap,
    title: "Setup Super Cepat",
    description: "Buat halaman link-in-bio profesional hanya dalam 2 menit. Tidak perlu coding atau design skill.",
    color: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400"
  },
  {
    icon: Globe,
    title: "Custom Domain",
    description: "Gunakan domain sendiri untuk branding yang lebih profesional dan memorable.",
    color: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
  },
  {
    icon: Users,
    title: "Khusus Indonesia",
    description: "Dirancang khusus untuk content creator dan brand Indonesia dengan dukungan bahasa lokal.",
    color: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
  },
  {
    icon: Heart,
    title: "Gratis Selamanya",
    description: "Semua fitur dasar gratis tanpa batas waktu. Tidak ada biaya tersembunyi atau subscription wajib.",
    color: "bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400"
  },
  {
    icon: Star,
    title: "Support 24/7",
    description: "Tim support Indonesia siap membantu Anda kapan saja via WhatsApp, email, atau live chat.",
    color: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400"
  }
];

export default function Features() {
  return (
    <div className="min-h-screen bg-background dark:bg-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-background to-secondary-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight text-foreground dark:text-white mb-6">
              Fitur Lengkap untuk
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {" "}Content Creator
              </span>
            </h1>
            <p className="text-xl text-muted-foreground dark:text-slate-300 max-w-3xl mx-auto mb-8">
              Semua yang Anda butuhkan untuk membangun presence digital yang kuat dan profesional dalam satu platform.
            </p>
            <Button size="lg" className="hover:scale-105 transition-transform duration-200">
              Mulai Gratis Sekarang
            </Button>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground dark:text-white mb-4">
              Mengapa Tumbuh Ide Berbeda?
            </h2>
            <p className="text-lg text-muted-foreground dark:text-slate-300 max-w-3xl mx-auto">
              Kami memahami kebutuhan unik content creator dan brand Indonesia. Berikut fitur-fitur yang membuat kami unggul.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-slide-up">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={index} 
                  className="feature-card group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ${feature.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-display font-semibold text-foreground dark:text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground dark:text-slate-300">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 sm:py-24 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 animate-scale-in">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-6">
            Siap Memulai Journey Digital Anda?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Bergabung dengan ribuan content creator dan brand Indonesia yang sudah mempercayai Tumbuh Ide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-white text-primary border-white hover:bg-white/90 hover:scale-105 transition-all duration-200"
            >
              Lihat Demo
            </Button>
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 hover:scale-105 transition-all duration-200"
            >
              Daftar Gratis
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}