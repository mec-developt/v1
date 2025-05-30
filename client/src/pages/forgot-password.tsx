import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "wouter";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate sending reset email
    setTimeout(() => {
      setEmailSent(true);
      setLoading(false);
      toast({
        title: "Email Terkirim!",
        description: "Silakan cek email Anda untuk reset password",
      });
    }, 1500);
  };

  if (emailSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-background to-secondary-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md animate-scale-in">
          <Card className="shadow-xl">
            <CardContent className="text-center p-8 space-y-6">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              
              <div className="space-y-2">
                <h1 className="text-2xl font-display font-bold text-foreground dark:text-white">
                  Email Terkirim!
                </h1>
                <p className="text-muted-foreground dark:text-slate-300">
                  Kami telah mengirim link reset password ke <strong>{email}</strong>
                </p>
              </div>

              <div className="bg-muted/50 dark:bg-slate-800/50 rounded-lg p-4 text-sm text-muted-foreground dark:text-slate-300">
                <p className="mb-2">📧 Cek folder email Anda</p>
                <p className="mb-2">⏰ Link akan kadaluarsa dalam 1 jam</p>
                <p>📁 Jika tidak ada, cek folder spam</p>
              </div>

              <div className="space-y-3">
                <Button 
                  onClick={() => setEmailSent(false)}
                  variant="outline" 
                  className="w-full"
                >
                  Kirim Ulang Email
                </Button>
                
                <Link href="/login">
                  <Button variant="ghost" className="w-full">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Kembali ke Login
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-background to-secondary-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-scale-in">
        <Card className="shadow-xl">
          <CardHeader className="text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto">
              <span className="text-white font-bold text-xl">TI</span>
            </div>
            <CardTitle className="text-2xl font-display font-bold text-foreground dark:text-white">
              Lupa Password?
            </CardTitle>
            <p className="text-muted-foreground dark:text-slate-300">
              Masukkan email Anda dan kami akan mengirim link untuk reset password
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-foreground dark:text-white">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="nama@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={loading}
              >
                {loading ? "Mengirim..." : "Kirim Link Reset"}
              </Button>
            </form>

            <div className="text-center space-y-4">
              <div className="text-sm text-muted-foreground dark:text-slate-300">
                Ingat password Anda?{" "}
                <Link 
                  href="/login" 
                  className="text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  Masuk di sini
                </Link>
              </div>
              
              <div className="text-sm text-muted-foreground dark:text-slate-300">
                Belum punya akun?{" "}
                <Link 
                  href="/register" 
                  className="text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  Daftar gratis
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}