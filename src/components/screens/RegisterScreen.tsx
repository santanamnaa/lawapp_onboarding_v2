import { useState } from "react";
import { ArrowLeft, User, Mail, Lock, Phone, Eye, EyeOff, Building, CreditCard } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Alert, AlertDescription } from "../ui/alert";

interface RegisterScreenProps {
  onRegister: (role: string) => void;
  onNavigateToLogin: () => void;
}

export function RegisterScreen({ onRegister, onNavigateToLogin }: RegisterScreenProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    nik: "",
    password: "",
    confirmPassword: "",
    role: "masyarakat" // default: Masyarakat Umum
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      alert("Password tidak cocok!");
      setLoading(false);
      return;
    }
    
    // Save user data with role
    localStorage.setItem("userRole", formData.role);
    localStorage.setItem("userName", formData.name);
    localStorage.setItem("userEmail", formData.email);
    
    // Simulate API call and OTP verification
    setTimeout(() => {
      setLoading(false);
      onRegister(formData.role);
    }, 1500);
  };

  return (
    <div className="size-full bg-white flex flex-col overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#09142b] to-[#1a2847] px-6 pt-12 pb-8 sticky top-0 z-10">
        <button 
          onClick={onNavigateToLogin}
          className="p-2 -ml-2 text-white hover:bg-white/10 rounded-lg mb-4"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="font-['The_Seasons'] text-2xl text-white mb-2">
          Daftar Akun Baru
        </h1>
        <p className="text-white/80 text-sm">Buat akun untuk mengakses layanan hukum</p>
      </div>

      {/* Form */}
      <div className="flex-1 px-6 pt-6 pb-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Role Selection */}
          <div className="space-y-3">
            <Label>Jenis Pengguna</Label>
            <RadioGroup 
              value={formData.role} 
              onValueChange={(value) => setFormData({ ...formData, role: value })}
              className="space-y-3"
            >
              <div className="flex items-start space-x-3 border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                <RadioGroupItem value="masyarakat" id="masyarakat" className="mt-0.5" />
                <label htmlFor="masyarakat" className="flex-1 cursor-pointer">
                  <div className="flex items-center gap-2 mb-1">
                    <User className="w-4 h-4 text-[#09142b]" />
                    <span className="text-[#09142b]">Masyarakat Umum</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Untuk warga yang membutuhkan konsultasi dan edukasi hukum
                  </p>
                </label>
              </div>
              <div className="flex items-start space-x-3 border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                <RadioGroupItem value="instansi" id="instansi" className="mt-0.5" />
                <label htmlFor="instansi" className="flex-1 cursor-pointer">
                  <div className="flex items-center gap-2 mb-1">
                    <Building className="w-4 h-4 text-[#09142b]" />
                    <span className="text-[#09142b]">Instansi Pemerintah</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Untuk instansi pemerintah, BUMD, dan aparatur yang membutuhkan pendampingan hukum
                  </p>
                </label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Nama Lengkap</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="name"
                type="text"
                placeholder="Nama sesuai KTP"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="pl-11 h-12"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="contoh@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="pl-11 h-12"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">No. Telepon</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="phone"
                type="tel"
                placeholder="08xxxxxxxxxx"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="pl-11 h-12"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="nik">NIK (Nomor Induk Kependudukan)</Label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="nik"
                type="text"
                placeholder="16 digit NIK sesuai KTP"
                value={formData.nik}
                onChange={(e) => setFormData({ ...formData, nik: e.target.value })}
                className="pl-11 h-12"
                required
                maxLength={16}
                pattern="[0-9]{16}"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Data NIK hanya digunakan untuk keperluan administrasi internal
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Min. 8 karakter"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="pl-11 pr-11 h-12"
                required
                minLength={8}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Ulangi password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="pl-11 h-12"
                required
              />
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-900">
              Dengan mendaftar, Anda menyetujui syarat dan ketentuan layanan Tanya Jaksa
            </p>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[#09142b] hover:bg-[#09142b]/90 h-14 text-base mt-6"
          >
            {loading ? "Memproses..." : "Daftar"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Sudah punya akun?{" "}
            <button
              onClick={onNavigateToLogin}
              className="text-[#09142b] hover:underline"
            >
              Masuk
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
