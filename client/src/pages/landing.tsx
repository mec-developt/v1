import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link2, Smartphone, BarChart3 } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-background to-secondary-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 sm:pt-24 sm:pb-32">
          <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-center">
            {/* Text Content */}
            <div className="lg:col-span-6 animate-slide-up">
              <div className="text-center lg:text-left">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight text-foreground">
                  Satu Link untuk
                  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {" "}Semua Profil
                  </span>
                  {" "}Sosial Media
                </h1>
                
                <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-3xl">
                  Platform gratis untuk content creator dan brand Indonesia. Buat halaman link-in-bio profesional yang menghubungkan semua akun sosial media Anda dalam satu tempat.
                </p>
                
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button size="lg" className="text-lg px-8 py-4">
                    Mulai Gratis Sekarang
                  </Button>
                  <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                    Lihat Contoh
                  </Button>
                </div>
                
                <div className="mt-8 text-sm text-muted-foreground dark:text-slate-300 text-center lg:text-left animate-fade-in">
                  <span className="inline-flex items-center space-x-4">
                    <span className="inline-flex items-center space-x-1">
                      <span className="text-green-500">✓</span>
                      <span>Gratis selamanya</span>
                    </span>
                    <span className="inline-flex items-center space-x-1">
                      <span className="text-green-500">✓</span>
                      <span>Setup dalam 2 menit</span>
                    </span>
                    <span className="inline-flex items-center space-x-1">
                      <span className="text-green-500">✓</span>
                      <span>Mobile-friendly</span>
                    </span>
                  </span>
                </div>
              </div>
            </div>
            
            {/* Hero Image/Mockup */}
            <div className="mt-12 lg:mt-0 lg:col-span-6 animate-scale-in">
              <div className="relative group">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                  alt="Content creator Indonesia bekerja dengan laptop dan smartphone" 
                  className="w-full h-auto rounded-2xl shadow-2xl group-hover:shadow-3xl transition-all duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Overview */}
      <div className="py-16 sm:py-24 bg-background dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground dark:text-white">
              Kenapa Memilih Tumbuh Ide?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground dark:text-slate-300 max-w-3xl mx-auto">
              Dirancang khusus untuk content creator dan brand Indonesia dengan fitur yang mudah digunakan dan tampilan yang profesional.
            </p>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 animate-slide-up">
            {/* Feature 1 */}
            <Card className="feature-card">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                  <Link2 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-display font-semibold text-foreground mb-3">
                  Satu Link, Semua Platform
                </h3>
                <p className="text-muted-foreground">
                  Gabungkan semua akun Instagram, TikTok, YouTube, Facebook, dan platform lainnya dalam satu link yang mudah dibagikan.
                </p>
              </CardContent>
            </Card>
            
            {/* Feature 2 */}
            <Card className="feature-card">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-6">
                  <Smartphone className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-xl font-display font-semibold text-foreground mb-3">
                  Mobile-First Design
                </h3>
                <p className="text-muted-foreground">
                  Tampilan yang dioptimalkan untuk mobile, sempurna untuk audience Indonesia yang mayoritas menggunakan smartphone.
                </p>
              </CardContent>
            </Card>
            
            {/* Feature 3 */}
            <Card className="feature-card">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-6">
                  <BarChart3 className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-display font-semibold text-foreground mb-3">
                  Analytics Lengkap
                </h3>
                <p className="text-muted-foreground">
                  Pantau performa link Anda dengan analytics detail, termasuk klik, views, dan demografi pengunjung.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
