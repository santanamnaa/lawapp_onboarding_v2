import { useState } from "react";
import { Scale, Mail, Lock, Eye, EyeOff, Info } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card } from "../ui/card";

interface LoginScreenProps {
  onLogin: () => void;
  onNavigateToRegister: () => void;
}

// Demo accounts for testing
const DEMO_ACCOUNTS = [
  { email: "budi@email.com", password: "demo123", name: "Budi Santoso", role: "masyarakat" },
  { email: "siti@email.com", password: "demo123", name: "Siti Aminah", role: "masyarakat" },
  { email: "instansi@kotabaru.go.id", password: "demo123", name: "Dinas Kesehatan", role: "instansi" },
  { email: "demo@tanyajaksa.id", password: "password", name: "User Demo", role: "masyarakat" }
];

export function LoginScreen({ onLogin, onNavigateToRegister }: LoginScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    // Simulate API call with basic validation
    setTimeout(() => {
      const account = DEMO_ACCOUNTS.find(
        acc => acc.email.toLowerCase() === email.toLowerCase() && acc.password === password
      );
      
      if (account || email.includes("@")) {
        // Accept demo accounts or any valid email format
        const userName = account?.name || email.split("@")[0];
        const userRole = account?.role || localStorage.getItem("userRole") || "masyarakat";
        
        localStorage.setItem("userName", userName);
        localStorage.setItem("userRole", userRole);
        setLoading(false);
        onLogin();
      } else {
        setError("Email atau password salah. Coba akun demo di bawah.");
        setLoading(false);
      }
    }, 1500);
  };

  const handleDemoLogin = (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
  };

  return (
    <div className="size-full bg-white flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#09142b] to-[#1a2847] px-8 pt-16 pb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
            <Scale className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-['The_Seasons'] text-2xl text-white">
            Tanya Jaksa
          </h1>
        </div>
        <p className="text-white/80">Masuk ke akun Anda</p>
      </div>

      {/* Form */}
      <div className="flex-1 px-8 pt-8 overflow-y-auto">
        {/* Demo Info */}
        <Card className="p-4 mb-6 bg-blue-50 border-blue-200">
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-blue-900 mb-2">
                <strong>Akun Demo Tersedia:</strong>
              </p>
              <div className="space-y-3 text-xs text-blue-800">
                {DEMO_ACCOUNTS.map((acc, idx) => (
                  <div key={idx} className="flex items-center justify-between gap-2">
                    <div className="flex-1">
                      <p className="text-xs mb-1 text-blue-700">
                        {acc.role === "instansi" ? "🏛️ Instansi Pemerintah" : "👤 Masyarakat Umum"}
                      </p>
                      <div className="font-mono bg-white/50 px-2 py-1 rounded text-xs">
                        {acc.email}
                      </div>
                      <div className="font-mono bg-white/50 px-2 py-1 rounded mt-1 text-xs">
                        Password: {acc.password}
                      </div>
                    </div>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => handleDemoLogin(acc.email, acc.password)}
                      className="text-xs h-7 bg-white flex-shrink-0"
                    >
                      Gunakan
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email atau No. Telepon</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="email"
                type="text"
                placeholder="contoh@email.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                className="pl-11 h-12"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                className="pl-11 pr-11 h-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              {error}
            </div>
          )}

          <button
            type="button"
            className="text-[#6a462f] text-sm hover:underline"
          >
            Lupa Password?
          </button>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[#09142b] hover:bg-[#09142b]/90 h-14 text-base"
          >
            {loading ? "Memproses..." : "Masuk"}
          </Button>
        </form>

        <div className="mt-6 text-center pb-6">
          <p className="text-gray-600">
            Belum punya akun?{" "}
            <button
              onClick={onNavigateToRegister}
              className="text-[#09142b] hover:underline"
            >
              Daftar Sekarang
            </button>
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="px-8 py-6 text-center text-sm text-gray-500">
        <p>Kejaksaan Negeri Kota Baru</p>
        <p>Pemerintah Kabupaten Kota Baru</p>
      </div>
    </div>
  );
}
