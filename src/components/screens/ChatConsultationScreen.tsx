import { useState } from "react";
import { ArrowLeft, Send, Paperclip, Video, Users, Calendar, CheckCircle2 } from "lucide-react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Alert, AlertDescription } from "../ui/alert";

interface ChatConsultationScreenProps {
  consultationId: number;
  onBack: () => void;
  onUpgradeToFormal: (consultationId: number) => void;
  isNewChat?: boolean; // Flag to indicate if this is a new chat session
}

export function ChatConsultationScreen({ consultationId, onBack, onUpgradeToFormal, isNewChat = false }: ChatConsultationScreenProps) {
  const [message, setMessage] = useState("");
  
  // Check if this chat is from assistance submission
  const chatSessionData = localStorage.getItem(`chat_${consultationId}`);
  const chatSession = chatSessionData ? JSON.parse(chatSessionData) : null;
  const isFromAssistance = chatSession?.fromAssistance || false;
  
  // Mock data - in real app, fetch based on consultationId
  const consultation = {
    id: consultationId,
    title: chatSession?.topic || "Konsultasi Warisan Keluarga",
    category: chatSession?.category || "Warisan",
    status: "Chat Aktif",
    prosecutor: {
      name: "Siti Aminah, S.H.",
      title: "Jaksa Muda",
      avatar: "SA"
    },
    messages: isFromAssistance ? [
      {
        id: 0,
        sender: "system",
        senderName: "Sistem",
        message: chatSession.type === "pendampingan" 
          ? "Anda telah mengajukan permohonan Pendampingan Hukum. Silakan gunakan ruang chat ini untuk berdiskusi dengan Jaksa."
          : "Anda telah mengajukan permohonan Bantuan Hukum. Silakan gunakan ruang chat ini untuk berdiskusi dengan Jaksa.",
        timestamp: new Date().toLocaleString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        read: true,
        isSystem: true
      },
      {
        id: 1,
        sender: "prosecutor",
        senderName: "Siti Aminah, S.H.",
        message: "Selamat siang! Saya Jaksa Siti Aminah yang akan membantu Anda. Saya sudah menerima permohonan Anda dan akan segera mereview dokumen yang diajukan. Jika ada pertanyaan atau informasi tambahan, silakan sampaikan di sini.",
        timestamp: new Date().toLocaleString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        read: true
      }
    ] : isNewChat ? [
      {
        id: 1,
        sender: "prosecutor",
        senderName: "Siti Aminah, S.H.",
        message: "Selamat siang! Saya Jaksa Siti Aminah yang akan membantu konsultasi Anda. Silakan jelaskan permasalahan hukum yang ingin Anda konsultasikan.",
        timestamp: new Date().toLocaleString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        read: true
      }
    ] : [
      {
        id: 1,
        sender: "user",
        senderName: "Budi Santoso",
        message: "Selamat siang, saya ingin berkonsultasi tentang pembagian warisan keluarga.",
        timestamp: "18 Okt 2025, 09:30",
        read: true
      },
      {
        id: 2,
        sender: "prosecutor",
        senderName: "Siti Aminah, S.H.",
        message: "Selamat siang Bapak Budi. Saya Jaksa Siti Aminah yang akan membantu konsultasi Bapak. Bisa dijelaskan sedikit tentang kasus warisannya?",
        timestamp: "18 Okt 2025, 09:45",
        read: true
      },
      {
        id: 3,
        sender: "user",
        senderName: "Budi Santoso",
        message: "Jadi begini Bu, ayah saya baru meninggal dan meninggalkan sebidang tanah. Saya punya 2 saudara kandung dan 1 saudara tiri. Bagaimana pembagiannya menurut hukum?",
        timestamp: "18 Okt 2025, 09:50",
        read: true
      },
      {
        id: 4,
        sender: "prosecutor",
        senderName: "Siti Aminah, S.H.",
        message: "Baik Pak Budi, untuk kasus seperti ini memang perlu penjelasan detail. Apakah ayah Bapak meninggalkan surat wasiat?",
        timestamp: "18 Okt 2025, 10:15",
        read: true
      },
      {
        id: 5,
        sender: "user",
        senderName: "Budi Santoso",
        message: "Tidak ada surat wasiat Bu. Semua harus dibagi sesuai hukum waris.",
        timestamp: "18 Okt 2025, 10:20",
        read: true
      },
      {
        id: 6,
        sender: "prosecutor",
        senderName: "Siti Aminah, S.H.",
        message: "Saya paham. Untuk kasus ini, saya sarankan kita lakukan konsultasi yang lebih mendalam. Apakah Bapak bersedia untuk sesi konsultasi formal? Bisa via Zoom atau tatap muka di kantor.",
        timestamp: "18 Okt 2025, 10:25",
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
          <Badge className="bg-green-500/20 text-green-100 border-green-400/30">
            Chat Aktif
          </Badge>
        </div>
      </div>

      {/* Consultation Info */}
      <div className="px-6 -mt-3 mb-4">
        <Card className="p-4 shadow-lg">
          <div className="flex items-start gap-3">
            <div className="flex-1">
              <h3 className="text-[#09142b] mb-1">{consultation.title}</h3>
              <Badge variant="outline" className="text-xs">
                {consultation.category}
              </Badge>
            </div>
          </div>
        </Card>
      </div>

      {/* Upgrade to Formal Consultation Alert */}
      <div className="px-6 mb-4">
        <Alert className="bg-blue-50 border-blue-200">
          <AlertDescription className="text-sm text-blue-900">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <p className="mb-2">
                  Untuk konsultasi lebih mendalam, Anda bisa mengajukan sesi konsultasi formal (Zoom atau Tatap Muka).
                </p>
              </div>
            </div>
            <Button
              onClick={() => onUpgradeToFormal(consultation.id)}
              size="sm"
              className="w-full mt-3 bg-blue-600 hover:bg-blue-700"
            >
              Ajukan Konsultasi Formal
            </Button>
          </AlertDescription>
        </Alert>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 pb-4">
        {(isNewChat || isFromAssistance) && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-900 text-center">
              {isFromAssistance 
                ? "✓ Permohonan berhasil diajukan. Anda dapat langsung memulai chat dengan Jaksa."
                : "✓ Chat konsultasi berhasil dibuat! Silakan mulai percakapan dengan Jaksa."}
            </p>
          </div>
        )}
        <div className="mb-3">
          <p className="text-sm text-gray-500 text-center">
            {isNewChat || isFromAssistance ? "Chat dimulai hari ini" : "Konsultasi awal via chat"}
          </p>
        </div>

        <div className="space-y-4">
          {consultation.messages.map((msg) => {
            const isUser = msg.sender === "user";
            const isSystem = msg.sender === "system";
            
            // System message styling
            if (isSystem) {
              return (
                <div key={msg.id} className="flex justify-center mb-4">
                  <div className="max-w-[85%] p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-900 leading-relaxed text-center">
                      💬 {msg.message}
                    </p>
                  </div>
                </div>
              );
            }
            
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
      </div>

      {/* Message Input */}
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
    </div>
  );
}
