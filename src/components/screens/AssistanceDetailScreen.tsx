import { useState } from "react";
import { ArrowLeft, FileText, Clock, CheckCircle, AlertCircle, Download, Upload, MessageSquare } from "lucide-react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface AssistanceDetailScreenProps {
  applicationId: number;
  onBack: () => void;
}

export function AssistanceDetailScreen({ applicationId, onBack }: AssistanceDetailScreenProps) {
  // Mock data - in real app, fetch based on applicationId
  const application = {
    id: applicationId,
    title: "Sengketa Tanah Warisan",
    type: "Bantuan Hukum",
    status: "Diproses",
    submittedDate: "15 Oktober 2025",
    applicant: {
      name: "Budi Santoso",
      nik: "6371012345678901",
      phone: "081234567890",
      address: "Jl. Ahmad Yani No. 123, Kota Baru, Kalimantan Selatan"
    },
    description: "Saya mengajukan bantuan hukum terkait sengketa tanah warisan seluas 500m² yang berlokasi di Desa Sungai Bamban. Tanah tersebut merupakan warisan dari almarhum ayah saya yang meninggal pada tahun 2020. Saat ini terdapat saudara kandung yang mengklaim kepemilikan tanah tersebut tanpa dasar hukum yang jelas.",
    category: "Hukum Perdata - Waris",
    timeline: [
      {
        status: "Diajukan",
        date: "15 Okt 2025, 09:30",
        description: "Pengajuan diterima oleh sistem",
        completed: true
      },
      {
        status: "Verifikasi Dokumen",
        date: "15 Okt 2025, 14:20",
        description: "Tim verifikasi sedang memeriksa kelengkapan dokumen",
        completed: true
      },
      {
        status: "Diproses",
        date: "16 Okt 2025, 10:15",
        description: "Pengajuan sedang ditinjau oleh Jaksa Pengampuh Hukum",
        completed: true,
        current: true
      },
      {
        status: "Jadwal Konsultasi",
        date: "Menunggu",
        description: "Konsultasi awal dengan jaksa akan dijadwalkan",
        completed: false
      },
      {
        status: "Selesai",
        date: "Menunggu",
        description: "Proses bantuan hukum selesai",
        completed: false
      }
    ],
    documents: [
      { name: "KTP.pdf", uploadDate: "15 Okt 2025", size: "245 KB", type: "Identitas" },
      { name: "Surat Keterangan Tidak Mampu.pdf", uploadDate: "15 Okt 2025", size: "189 KB", type: "Persyaratan" },
      { name: "Sertifikat Tanah.pdf", uploadDate: "15 Okt 2025", size: "1.2 MB", type: "Bukti Pendukung" },
      { name: "Surat Kematian Pewaris.pdf", uploadDate: "15 Okt 2025", size: "156 KB", type: "Bukti Pendukung" }
    ],
    assignedProsecutor: {
      name: "Ahmad Yani, S.H., M.H.",
      title: "Jaksa Pengampuh Hukum",
      phone: "0821-xxxx-xxxx"
    },
    notes: [
      {
        date: "16 Okt 2025, 10:30",
        author: "Ahmad Yani, S.H., M.H.",
        message: "Dokumen sudah lengkap. Kami akan menjadwalkan konsultasi awal minggu depan untuk membahas langkah mediasi."
      }
    ]
  };

  const getStatusIcon = (completed: boolean, current: boolean) => {
    if (completed && !current) return <CheckCircle className="w-5 h-5 text-green-600" />;
    if (current) return <AlertCircle className="w-5 h-5 text-orange-600" />;
    return <Clock className="w-5 h-5 text-gray-300" />;
  };

  return (
    <div className="size-full bg-gray-50 flex flex-col overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#09142b] to-[#1a2847] px-6 pt-12 pb-6 sticky top-0 z-10">
        <button 
          onClick={onBack}
          className="p-2 -ml-2 text-white hover:bg-white/10 rounded-lg mb-4"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <Badge className="bg-white/20 text-white border-white/30 mb-2">
              {application.type}
            </Badge>
            <h1 className="font-['The_Seasons'] text-xl text-white mb-2">
              {application.title}
            </h1>
            <p className="text-white/70 text-sm">
              Diajukan: {application.submittedDate}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 pt-6 pb-8">
        <Tabs defaultValue="timeline" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="details">Detail</TabsTrigger>
            <TabsTrigger value="documents">Dokumen</TabsTrigger>
          </TabsList>

          {/* Timeline Tab */}
          <TabsContent value="timeline" className="space-y-4">
            <Card className="p-5">
              <h3 className="text-[#09142b] mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Progress Pengajuan
              </h3>
              
              <div className="space-y-4">
                {application.timeline.map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`p-2 rounded-full ${
                        item.completed ? 'bg-green-100' : 
                        item.current ? 'bg-orange-100' : 
                        'bg-gray-100'
                      }`}>
                        {getStatusIcon(item.completed, item.current || false)}
                      </div>
                      {idx < application.timeline.length - 1 && (
                        <div className={`w-0.5 h-12 ${
                          item.completed ? 'bg-green-300' : 'bg-gray-200'
                        }`} />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex items-start justify-between mb-1">
                        <h4 className={`${
                          item.current ? 'text-[#09142b]' : 
                          item.completed ? 'text-gray-700' : 
                          'text-gray-400'
                        }`}>
                          {item.status}
                        </h4>
                        {item.completed && (
                          <Badge variant="outline" className="text-xs">
                            Selesai
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mb-1">{item.description}</p>
                      <p className="text-xs text-gray-400">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Notes from Prosecutor */}
            {application.notes.length > 0 && (
              <Card className="p-5 bg-blue-50 border-blue-200">
                <h3 className="text-[#09142b] mb-3 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Catatan dari Jaksa
                </h3>
                <div className="space-y-3">
                  {application.notes.map((note, idx) => (
                    <div key={idx} className="bg-white p-4 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <p className="text-sm text-[#09142b]">{note.author}</p>
                        <p className="text-xs text-gray-500">{note.date}</p>
                      </div>
                      <p className="text-sm text-gray-700">{note.message}</p>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </TabsContent>

          {/* Details Tab */}
          <TabsContent value="details" className="space-y-4">
            <Card className="p-5">
              <h3 className="text-[#09142b] mb-4">Informasi Pemohon</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Nama Lengkap</p>
                  <p className="text-[#09142b]">{application.applicant.name}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-gray-500">NIK</p>
                  <p className="text-[#09142b]">{application.applicant.nik}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-gray-500">No. Telepon</p>
                  <p className="text-[#09142b]">{application.applicant.phone}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-gray-500">Alamat</p>
                  <p className="text-[#09142b]">{application.applicant.address}</p>
                </div>
              </div>
            </Card>

            <Card className="p-5">
              <h3 className="text-[#09142b] mb-4">Detail Permasalahan</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Kategori</p>
                  <Badge variant="outline">{application.category}</Badge>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-gray-500 mb-2">Kronologi</p>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {application.description}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-5">
              <h3 className="text-[#09142b] mb-4">Jaksa Pengampuh</h3>
              <div className="flex items-start gap-3">
                <div className="p-3 bg-[#09142b]/10 rounded-lg">
                  <FileText className="w-6 h-6 text-[#09142b]" />
                </div>
                <div className="flex-1">
                  <p className="text-[#09142b] mb-1">{application.assignedProsecutor.name}</p>
                  <p className="text-sm text-gray-500 mb-2">{application.assignedProsecutor.title}</p>
                  <p className="text-sm text-gray-600">Kontak: {application.assignedProsecutor.phone}</p>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-4">
            <Card className="p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[#09142b]">Dokumen Pendukung</h3>
                <Button size="sm" variant="outline">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload
                </Button>
              </div>
              
              <div className="space-y-3">
                {application.documents.map((doc, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <FileText className="w-5 h-5 text-red-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-[#09142b] truncate">{doc.name}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>{doc.size}</span>
                        <span>•</span>
                        <span>{doc.uploadDate}</span>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </Card>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900">
                💡 <strong>Tips:</strong> Pastikan dokumen yang Anda upload jelas dan terbaca. 
                Format yang diterima: PDF, JPG, PNG (Max 5MB per file)
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
