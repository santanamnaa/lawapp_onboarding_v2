import { useState } from "react";
import { ArrowLeft, Video, Users, Send, Paperclip, Calendar, Clock, CheckCircle2, MapPin, ExternalLink } from "lucide-react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Alert, AlertDescription } from "../ui/alert";

interface ConsultationDetailScreenProps {
  consultationId: number;
  onBack: () => void;
}

export function ConsultationDetailScreen({ consultationId, onBack }: ConsultationDetailScreenProps) {
  const [message, setMessage] = useState("");
  
  // Mock data - in real app, fetch based on consultationId
  const consultation = {
    id: consultationId,
    title: "Konsultasi Warisan Keluarga",
    type: "zoom", // "zoom" | "offline"
    status: "Dijadwalkan", // "Dijadwalkan" | "Selesai"
    scheduledDate: "25 Oktober 2025",
    scheduledTime: "14:00 - 15:00 WIB",
    category: "Warisan",
    prosecutor: {
      name: "Siti Aminah, S.H.",
      title: "Jaksa Muda",
      avatar: "SA"
    },
    zoomLink: "https://zoom.us/j/123456789",
    officeLocation: "Kejaksaan Negeri Kota Baru\nJl. Merdeka No. 123, Kota Baru\nKalimantan Selatan",
    notes: "Mohon persiapkan dokumen surat kematian pewaris dan sertifikat tanah untuk konsultasi.",
    approvalStatus: "approved", // "approved" | "pending" | "rejected"
    approvalDate: "21 Oktober 2025",
    messages: [
      {
        id: 1,
        sender: "prosecutor",
        senderName: "Siti Aminah, S.H.",
        message: "Selamat siang Bapak Budi. Permohonan konsultasi Anda telah disetujui. Saya sudah menerima deskripsi permasalahan yang Bapak sampaikan.",
        timestamp: "21 Okt 2025, 10:30",
        read: true
      },
      {
        id: 2,
        sender: "prosecutor",
        senderName: "Siti Aminah, S.H.",
        message: "Untuk sesi konsultasi nanti, mohon persiapkan beberapa pertanyaan spesifik yang ingin Bapak tanyakan terkait pembagian warisan. Jika ada dokumen pendukung, bisa disiapkan juga.",
        timestamp: "21 Okt 2025, 10:32",
        read: true
      },
      {
        id: 3,
        sender: "user",
        senderName: "Budi Santoso",
        message: "Baik Bu, terima kasih. Saya ingin menanyakan tentang hak waris saudara tiri dan bagaimana pembagiannya menurut hukum.",
        timestamp: "21 Okt 2025, 11:15",
        read: true
      },
      {
        id: 4,
        sender: "prosecutor",
        senderName: "Siti Aminah, S.H.",
        message: "Baik Pak, pertanyaan yang bagus. Kita akan bahas detail di sesi konsultasi nanti. Untuk konsultasi Zoom, pastikan koneksi internet stabil ya.",
        timestamp: "21 Okt 2025, 14:20",
        read: true
      }
    ]
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // In real app, send message to backend
    console.log("Sending message:", message);
    setMessage("");
  };

  const handleJoinZoom = () => {
    window.open(consultation.zoomLink, "_blank");
  };

  return (
    <div className="size-full bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#09142b] to-[#1a2847] px-6 pt-12 pb-6">
        <button 
          onClick={onBack}
          className="p-2 -ml-2 text-white hover:bg-white/10 rounded-lg mb-4"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex items-start gap-3">
          <Avatar className="w-12 h-12 border-2 border-white/20">
            <AvatarFallback className="bg-white/20 text-white">
              {consultation.prosecutor.avatar}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h1 className="font-['The_Seasons'] text-xl text-white mb-1">
              {consultation.prosecutor.name}
            </h1>
            <p className="text-white/70 text-sm">{consultation.prosecutor.title}</p>
          </div>
        </div>
      </div>

      {/* Consultation Info */}
      <div className="px-6 -mt-3 mb-4">
        <Card className="p-4 shadow-lg">
          <div className="flex items-start gap-3 mb-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              {consultation.type === "zoom" ? (
                <Video className="w-5 h-5 text-blue-600" />
              ) : (
                <Users className="w-5 h-5 text-green-600" />
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-[#09142b] mb-1">{consultation.title}</h3>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="outline" className="text-xs">
                  {consultation.category}
                </Badge>
                <Badge className={`text-xs ${
                  consultation.type === "zoom" 
                    ? "bg-blue-100 text-blue-700 border-blue-200" 
                    : "bg-green-100 text-green-700 border-green-200"
                }`}>
                  {consultation.type === "zoom" ? "Online (Zoom)" : "Tatap Muka"}
                </Badge>
                {consultation.status === "Dijadwalkan" && (
                  <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 text-xs">
                    ✓ Disetujui
                  </Badge>
                )}
              </div>
            </div>
          </div>
          
          <Separator className="my-3" />
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span className="text-gray-700">{consultation.scheduledDate}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-gray-700">{consultation.scheduledTime}</span>
            </div>
            {consultation.type === "offline" && (
              <div className="flex items-start gap-2 text-sm">
                <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
                <span className="text-gray-700 whitespace-pre-line">{consultation.officeLocation}</span>
              </div>
            )}
          </div>

          {consultation.approvalStatus === "approved" && (
            <>
              <Separator className="my-3" />
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <p className="text-sm text-green-900">
                    Permohonan disetujui pada {consultation.approvalDate}
                  </p>
                </div>
              </div>
            </>
          )}

          {consultation.type === "zoom" && consultation.status === "Dijadwalkan" && (
            <>
              <Separator className="my-3" />
              <Button 
                onClick={handleJoinZoom}
                className="w-full bg-blue-600 hover:bg-blue-700" 
                size="sm"
              >
                <Video className="w-4 h-4 mr-2" />
                Join Zoom Meeting
                <ExternalLink className="w-3 h-3 ml-2" />
              </Button>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Silakan join 5 menit sebelum waktu konsultasi
              </p>
            </>
          )}
        </Card>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 pb-4">
        <div className="mb-3">
          <p className="text-sm text-gray-500 text-center">
            Chat persiapan konsultasi
          </p>
        </div>

        <div className="space-y-4">
          {consultation.messages.map((msg) => {
            const isUser = msg.sender === "user";
            return (
              <div key={msg.id} className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
                {!isUser && (
                  <Avatar className="w-8 h-8 flex-shrink-0">
                    <AvatarFallback className="bg-[#09142b] text-white text-xs">
                      {consultation.prosecutor.avatar}
                    </AvatarFallback>
                  </Avatar>
                )}
                <div className={`flex-1 max-w-[75%] ${isUser ? 'flex flex-col items-end' : ''}`}>
                  {!isUser && (
                    <p className="text-xs text-gray-600 mb-1">{msg.senderName}</p>
                  )}
                  <div className={`p-3 rounded-lg ${
                    isUser 
                      ? 'bg-[#09142b] text-white' 
                      : 'bg-white border border-gray-200'
                  }`}>
                    <p className="text-sm leading-relaxed">{msg.message}</p>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <p className="text-xs text-gray-500">{msg.timestamp}</p>
                    {isUser && msg.read && (
                      <CheckCircle2 className="w-3 h-3 text-blue-600" />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Notes from prosecutor */}
        {consultation.notes && (
          <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-sm text-amber-900">
              <strong>📝 Catatan dari Jaksa:</strong> {consultation.notes}
            </p>
          </div>
        )}

        {/* Completion message for finished consultations */}
        {consultation.status === "Selesai" && (
          <div className="mt-6 p-4 bg-gray-100 border border-gray-200 rounded-lg text-center">
            <CheckCircle2 className="w-8 h-8 text-gray-500 mx-auto mb-2" />
            <p className="text-sm text-gray-700">
              Konsultasi telah selesai dilaksanakan
            </p>
          </div>
        )}
      </div>

      {/* Message Input - Only for scheduled consultations */}
      {consultation.status === "Dijadwalkan" && (
        <div className="border-t bg-white p-4">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Button 
              type="button" 
              size="icon" 
              variant="outline"
              className="flex-shrink-0"
            >
              <Paperclip className="w-5 h-5" />
            </Button>
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ketik pesan..."
              className="flex-1"
            />
            <Button 
              type="submit" 
              size="icon"
              className="bg-[#09142b] hover:bg-[#09142b]/90 flex-shrink-0"
              disabled={!message.trim()}
            >
              <Send className="w-5 h-5" />
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}
