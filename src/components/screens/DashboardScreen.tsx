import { Bell, FileText, MessageSquare, BookOpen, Clock, ChevronRight, TrendingUp, Users, CheckCircle } from "lucide-react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface DashboardScreenProps {
  onNavigate: (tab: string) => void;
  userRole: string;
}

export function DashboardScreen({ onNavigate, userRole }: DashboardScreenProps) {
  // Get user name from localStorage
  const userName = localStorage.getItem("userName") || "Budi Santoso";
  const isInstansi = userRole === "instansi";

  const activeApplications = [
    { id: 1, type: "Bantuan Hukum", case: "Sengketa Tanah", status: "Diproses", date: "15 Okt 2025" },
    { id: 2, type: "Konsultasi", case: "Warisan Keluarga", status: "Dijadwalkan", date: "20 Okt 2025" },
  ];

  const legalTips = [
    {
      title: "Tips Mengurus Surat Perjanjian",
      category: "Hukum Perdata",
      image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXclMjBib29rcyUyMGVkdWNhdGlvbnxlbnwxfHx8fDE3NjA4NTA4OTN8MA&ixlib=rb-4.1.0&q=80&w=400"
    },
    {
      title: "Hak-Hak Anda dalam Mediasi",
      category: "Mediasi",
      image: "https://images.unsplash.com/photo-1758518731462-d091b0b4ed0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWdhbCUyMGNvbnN1bHRhdGlvbiUyMG1lZXRpbmd8ZW58MXx8fHwxNzYwODA3MTc1fDA&ixlib=rb-4.1.0&q=80&w=400"
    }
  ];

  return (
    <div className="size-full bg-gray-50 overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#09142b] to-[#1a2847] px-6 pt-12 pb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-white/70 text-sm mb-1">Selamat datang kembali,</p>
            <h1 className="font-['The_Seasons'] text-2xl text-white capitalize">{userName}</h1>
          </div>
          <button className="relative p-2 bg-white/10 rounded-xl backdrop-blur-sm">
            <Bell className="w-6 h-6 text-white" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-4">
            <div className="flex flex-col items-center gap-2">
              <TrendingUp className="w-5 h-5 text-white" />
              <p className="text-2xl text-white">2</p>
              <p className="text-xs text-white/70 text-center">Aktif</p>
            </div>
          </Card>
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-4">
            <div className="flex flex-col items-center gap-2">
              <CheckCircle className="w-5 h-5 text-white" />
              <p className="text-2xl text-white">5</p>
              <p className="text-xs text-white/70 text-center">Selesai</p>
            </div>
          </Card>
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-4">
            <div className="flex flex-col items-center gap-2">
              <Users className="w-5 h-5 text-white" />
              <p className="text-2xl text-white">12</p>
              <p className="text-xs text-white/70 text-center">Total</p>
            </div>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 -mt-4 mb-6">
        <Card className="p-5 shadow-lg">
          <p className="text-sm text-gray-600 mb-4">Aksi Cepat</p>
          <div className={`grid ${isInstansi ? 'grid-cols-3' : 'grid-cols-2'} gap-3`}>
            {isInstansi && (
              <button 
                onClick={() => onNavigate("assistance")}
                className="flex flex-col items-center gap-2 p-3 rounded-xl bg-[#09142b]/5 hover:bg-[#09142b]/10 transition-colors"
              >
                <div className="p-3 bg-[#09142b] rounded-xl">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs text-center text-gray-700">Ajukan Permohonan</span>
              </button>
            )}
            
            <button 
              onClick={() => onNavigate("consultation")}
              className="flex flex-col items-center gap-2 p-3 rounded-xl bg-[#6a462f]/5 hover:bg-[#6a462f]/10 transition-colors"
            >
              <div className="p-3 bg-[#6a462f] rounded-xl">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs text-center text-gray-700">Konsultasi</span>
            </button>
            
            <button 
              onClick={() => onNavigate("education")}
              className="flex flex-col items-center gap-2 p-3 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors"
            >
              <div className="p-3 bg-blue-500 rounded-xl">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs text-center text-gray-700">Edukasi Hukum</span>
            </button>
          </div>
        </Card>
      </div>

      {/* Active Applications */}
      <div className="px-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-['The_Seasons'] text-xl text-[#09142b]">Pengajuan Aktif</h2>
          <button className="text-sm text-[#6a462f] hover:underline">Lihat Semua</button>
        </div>
        
        <div className="space-y-3">
          {activeApplications.map((app) => (
            <Card key={app.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-[#09142b]/10 rounded-lg">
                  {app.type === "Bantuan Hukum" ? (
                    <FileText className="w-5 h-5 text-[#09142b]" />
                  ) : (
                    <MessageSquare className="w-5 h-5 text-[#09142b]" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <p className="text-sm text-gray-500">{app.type}</p>
                      <h3 className="text-[#09142b] mb-1">{app.case}</h3>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {app.status}
                    </Badge>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {app.date}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Legal Tips */}
      <div className="px-6 pb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-['The_Seasons'] text-xl text-[#09142b]">Tips Hukum</h2>
          <button 
            onClick={() => onNavigate("education")}
            className="text-sm text-[#6a462f] hover:underline"
          >
            Lihat Semua
          </button>
        </div>
        
        <div className="grid gap-4">
          {legalTips.map((tip, idx) => (
            <Card 
              key={idx} 
              onClick={() => onNavigate("education")}
              className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex gap-3">
                <div className="w-24 h-24 flex-shrink-0">
                  <ImageWithFallback
                    src={tip.image}
                    alt={tip.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 p-3 pr-4">
                  <Badge variant="outline" className="text-xs mb-2">
                    {tip.category}
                  </Badge>
                  <h3 className="text-sm text-[#09142b] leading-snug">
                    {tip.title}
                  </h3>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
