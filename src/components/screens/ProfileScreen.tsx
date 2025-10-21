import { 
  User, Mail, Phone, MapPin, FileText, Settings, 
  HelpCircle, LogOut, ChevronRight, Shield, Bell,
  FolderOpen, Star
} from "lucide-react";
import { Card } from "../ui/card";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

interface ProfileScreenProps {
  onLogout: () => void;
}

export function ProfileScreen({ onLogout }: ProfileScreenProps) {
  // Get user name from localStorage
  const userName = localStorage.getItem("userName") || "Budi Santoso";
  
  const userData = {
    name: userName,
    email: "budi.santoso@email.com",
    phone: "081234567890",
    address: "Kota Baru, Kalimantan Selatan",
    memberSince: "Januari 2025"
  };

  const stats = [
    { label: "Pengajuan", value: "7", icon: FileText },
    { label: "Konsultasi", value: "3", icon: Star },
    { label: "Dokumen", value: "5", icon: FolderOpen }
  ];

  const menuItems = [
    {
      icon: User,
      label: "Edit Profil",
      description: "Ubah informasi pribadi",
      action: () => console.log("Edit profile")
    },
    {
      icon: Shield,
      label: "Ubah Password",
      description: "Keamanan akun",
      action: () => console.log("Change password")
    },
    {
      icon: Bell,
      label: "Notifikasi",
      description: "Atur preferensi notifikasi",
      action: () => console.log("Notifications")
    },
    {
      icon: Settings,
      label: "Pengaturan",
      description: "Preferensi aplikasi",
      action: () => console.log("Settings")
    },
    {
      icon: HelpCircle,
      label: "Bantuan & FAQ",
      description: "Pertanyaan umum",
      action: () => console.log("Help")
    }
  ];

  return (
    <div className="size-full bg-gray-50 overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#09142b] to-[#1a2847] px-6 pt-12 pb-20">
        <h1 className="font-['The_Seasons'] text-2xl text-white mb-2">
          Profil Saya
        </h1>
        <p className="text-white/70 text-sm">
          Kelola informasi akun Anda
        </p>
      </div>

      {/* Profile Card */}
      <div className="px-6 -mt-12 mb-6">
        <Card className="p-6 shadow-lg">
          <div className="flex flex-col items-center text-center mb-6">
            <Avatar className="w-24 h-24 mb-4 border-4 border-white shadow-lg">
              <AvatarFallback className="bg-[#09142b] text-white text-2xl">
                {userData.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <h2 className="font-['The_Seasons'] text-xl text-[#09142b] mb-1">
              {userData.name}
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Anggota sejak {userData.memberSince}
            </p>
          </div>

          <Separator className="mb-6" />

          {/* Contact Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Mail className="w-4 h-4 text-gray-600" />
              </div>
              <div className="flex-1">
                <p className="text-gray-500 text-xs">Email</p>
                <p className="text-[#09142b]">{userData.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Phone className="w-4 h-4 text-gray-600" />
              </div>
              <div className="flex-1">
                <p className="text-gray-500 text-xs">Telepon</p>
                <p className="text-[#09142b]">{userData.phone}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <div className="p-2 bg-gray-100 rounded-lg">
                <MapPin className="w-4 h-4 text-gray-600" />
              </div>
              <div className="flex-1">
                <p className="text-gray-500 text-xs">Alamat</p>
                <p className="text-[#09142b]">{userData.address}</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Stats */}
      <div className="px-6 mb-6">
        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <Card key={idx} className="p-4">
                <div className="flex flex-col items-center gap-2">
                  <div className="p-2 bg-[#09142b]/10 rounded-lg">
                    <Icon className="w-5 h-5 text-[#09142b]" />
                  </div>
                  <p className="text-2xl text-[#09142b]">{stat.value}</p>
                  <p className="text-xs text-gray-600 text-center">{stat.label}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-6 mb-6">
        <h3 className="text-sm text-gray-500 mb-3 px-1">Pengaturan Akun</h3>
        <Card className="divide-y">
          {menuItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={idx}
                onClick={item.action}
                className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Icon className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-[#09142b]">{item.label}</p>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            );
          })}
        </Card>
      </div>

      {/* Logout Button */}
      <div className="px-6 pb-8">
        <Button
          onClick={onLogout}
          variant="outline"
          className="w-full h-14 text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Keluar
        </Button>
      </div>

      {/* Footer */}
      <div className="px-6 pb-6 text-center text-xs text-gray-500">
        <p>Tanya Jaksa v1.0.0</p>
        <p className="mt-1">Kejaksaan Negeri Kota Baru</p>
        <p>© 2025 Pemerintah Kabupaten Kota Baru</p>
      </div>
    </div>
  );
}
