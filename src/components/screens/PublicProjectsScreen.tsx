import { Building2, Calendar, TrendingUp, FileText, Eye, Download } from "lucide-react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { Separator } from "../ui/separator";

export function PublicProjectsScreen() {
  // Mock data - in real app, fetch from backend
  const publicProjects = [
    {
      id: 1,
      title: "Pembangunan Rumah Sakit Daerah Kota Baru",
      category: "Infrastruktur Kesehatan",
      progress: 35,
      status: "Tahap Pembebasan Lahan Selesai",
      lastUpdate: "20 Oktober 2025",
      description: "Proyek pembangunan rumah sakit type B dengan kapasitas 200 tempat tidur yang berlokasi di Kecamatan Kota Tengah",
      timeline: [
        { phase: "Perencanaan", status: "Selesai", date: "Jan 2025" },
        { phase: "Pembebasan Lahan", status: "Selesai", date: "Mar 2025" },
        { phase: "Konstruksi Fisik", status: "Berjalan", date: "Apr - Des 2025" },
        { phase: "Pengadaan Alat", status: "Menunggu", date: "2026" }
      ],
      agency: "Dinas Kesehatan Kab. Kota Baru"
    },
    {
      id: 2,
      title: "Pembangunan Jalan Tol Kota Baru - Pelabuhan",
      category: "Infrastruktur Transportasi",
      progress: 55,
      status: "Konstruksi Segmen 1 & 2 Selesai",
      lastUpdate: "18 Oktober 2025",
      description: "Pembangunan jalan tol sepanjang 45 km yang menghubungkan pusat kota dengan kawasan pelabuhan untuk mendukung distribusi logistik",
      timeline: [
        { phase: "Perencanaan", status: "Selesai", date: "2024" },
        { phase: "Pembebasan Lahan", status: "Selesai", date: "Jan 2025" },
        { phase: "Konstruksi Segmen 1-2", status: "Selesai", date: "Feb - Sep 2025" },
        { phase: "Konstruksi Segmen 3-4", status: "Berjalan", date: "Okt 2025 - Jun 2026" }
      ],
      agency: "Dinas Pekerjaan Umum Kab. Kota Baru"
    },
    {
      id: 3,
      title: "Revitalisasi Pasar Tradisional Sentral",
      category: "Ekonomi & Perdagangan",
      progress: 80,
      status: "Tahap Finishing Interior",
      lastUpdate: "15 Oktober 2025",
      description: "Modernisasi pasar tradisional dengan tetap mempertahankan nilai kearifan lokal, dilengkapi fasilitas modern untuk 500 pedagang",
      timeline: [
        { phase: "Perencanaan", status: "Selesai", date: "Des 2024" },
        { phase: "Pembongkaran & Relokasi", status: "Selesai", date: "Jan 2025" },
        { phase: "Konstruksi Utama", status: "Selesai", date: "Feb - Agt 2025" },
        { phase: "Finishing & Uji Coba", status: "Berjalan", date: "Sep - Nov 2025" }
      ],
      agency: "Dinas Perdagangan Kab. Kota Baru"
    }
  ];

  return (
    <div className="size-full bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#09142b] to-[#1a2847] px-6 pt-12 pb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 bg-white/10 rounded-xl">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-['The_Seasons'] text-2xl text-white">
              Transparansi Proyek
            </h1>
          </div>
        </div>
        <p className="text-white/70 text-sm">
          Pantau progres proyek pemerintah yang didampingi Kejaksaan
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 pt-6 pb-8 overflow-y-auto">
        {/* Info Banner */}
        <Card className="p-4 mb-6 bg-blue-50 border-blue-200">
          <div className="flex gap-3">
            <Eye className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-blue-900 leading-relaxed">
                Portal ini menampilkan progres proyek-proyek strategis pemerintah daerah yang mendapat pendampingan hukum dari Kejaksaan Negeri Kota Baru. Informasi diperbarui secara berkala.
              </p>
            </div>
          </div>
        </Card>

        {/* Projects List */}
        <div className="space-y-4">
          {publicProjects.map((project) => (
            <Card key={project.id} className="overflow-hidden">
              {/* Project Header */}
              <div className="p-5 bg-gradient-to-r from-[#09142b]/5 to-transparent">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <Badge variant="outline" className="mb-2 text-xs">
                      {project.category}
                    </Badge>
                    <h3 className="text-[#09142b] mb-2 leading-snug">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Progres Keseluruhan</span>
                    <span className="text-[#09142b]">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>
              </div>

              <Separator />

              {/* Latest Status */}
              <div className="p-5 bg-green-50/50">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 mb-1">Status Terkini:</p>
                    <p className="text-sm text-[#09142b]">{project.status}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Diperbarui: {project.lastUpdate}
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Timeline */}
              <div className="p-5">
                <h4 className="text-[#09142b] mb-3 text-sm">Timeline Proyek</h4>
                <div className="space-y-3">
                  {project.timeline.map((phase, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="flex flex-col items-center">
                        <div className={`w-3 h-3 rounded-full ${
                          phase.status === "Selesai" ? "bg-green-500" :
                          phase.status === "Berjalan" ? "bg-blue-500" :
                          "bg-gray-300"
                        }`} />
                        {idx < project.timeline.length - 1 && (
                          <div className={`w-0.5 h-8 ${
                            phase.status === "Selesai" ? "bg-green-300" : "bg-gray-200"
                          }`} />
                        )}
                      </div>
                      <div className="flex-1 pb-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm text-[#09142b]">{phase.phase}</p>
                            <p className="text-xs text-gray-500">{phase.date}</p>
                          </div>
                          <Badge 
                            variant={
                              phase.status === "Selesai" ? "default" :
                              phase.status === "Berjalan" ? "secondary" :
                              "outline"
                            }
                            className="text-xs"
                          >
                            {phase.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Footer */}
              <div className="p-4 bg-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-gray-500" />
                  <span className="text-xs text-gray-600">{project.agency}</span>
                </div>
                <Button variant="ghost" size="sm" className="text-xs">
                  <FileText className="w-4 h-4 mr-1" />
                  Detail
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Footer Info */}
        <Card className="mt-6 p-5 bg-gray-100 border-gray-200">
          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Informasi Pembaruan</strong>
              </p>
              <p className="text-xs text-gray-600 leading-relaxed">
                Data progres proyek diperbarui setiap minggu berdasarkan laporan dari instansi terkait dan verifikasi Kejaksaan Negeri Kota Baru.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
