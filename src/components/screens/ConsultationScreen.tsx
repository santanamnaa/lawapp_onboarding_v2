import { useState, useEffect } from "react";
import { MessageSquare, Video, Users, Calendar, ChevronRight, Clock, Plus, XCircle, CheckCircle } from "lucide-react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { ScheduleConsultationScreen } from "./ScheduleConsultationScreen";
import { ConsultationDetailScreen } from "./ConsultationDetailScreen";
import { ChatConsultationScreen } from "./ChatConsultationScreen";
import { RescheduleConsultationScreen } from "./RescheduleConsultationScreen";
import { StartChatFormScreen } from "./StartChatFormScreen";

type View = "list" | "schedule" | "detail" | "chat" | "reschedule" | "startChat";

interface ConsultationScreenProps {
  autoOpenChatId?: number | null;
  onChatOpened?: () => void;
}

export function ConsultationScreen({ autoOpenChatId = null, onChatOpened }: ConsultationScreenProps = {}) {
  const [currentView, setCurrentView] = useState<View>("list");
  const [selectedConsultationId, setSelectedConsultationId] = useState<number | null>(null);
  const [showChoiceDialog, setShowChoiceDialog] = useState(false);

  // Auto-open chat when navigated from assistance submission
  useEffect(() => {
    if (autoOpenChatId) {
      setSelectedConsultationId(autoOpenChatId);
      setCurrentView("chat");
      onChatOpened?.();
    }
  }, [autoOpenChatId, onChatOpened]);

  // Mock consultations with different statuses
  const consultations = [
    {
      id: 1,
      title: "Konsultasi Warisan Keluarga",
      type: "Online (Zoom)",
      prosecutor: "Jaksa Muda: Siti Aminah, S.H.",
      status: "Dijadwalkan",
      date: "25 Okt 2025, 14:00 WIB",
      category: "Warisan"
    },
    {
      id: 2,
      title: "Sengketa Tanah dengan Tetangga",
      type: "Tatap Muka",
      prosecutor: "Jaksa: Ahmad Yani, S.H., M.H.",
      status: "Pending Approval",
      date: "23 Okt 2025, 10:00 WIB",
      category: "Tanah",
      submittedDate: "21 Okt 2025"
    },
    {
      id: 3,
      title: "Konsultasi Hukum Waris",
      type: "Chat",
      prosecutor: "Jaksa: Siti Aminah, S.H.",
      status: "Chat Aktif",
      date: "Dimulai 18 Okt 2025",
      category: "Warisan"
    },
    {
      id: 4,
      title: "Review Kontrak Bisnis",
      type: "Online (Zoom)",
      prosecutor: "Jaksa: Dr. Budi Santoso, S.H.",
      status: "Ditolak",
      date: "22 Okt 2025, 15:00 WIB",
      category: "Bisnis",
      rejectionReason: "Mohon maaf, jadwal bentrok. Silakan pilih waktu lain."
    },
    {
      id: 5,
      title: "Mediasi Sengketa Tanah",
      type: "Tatap Muka",
      prosecutor: "Jaksa: Ahmad Yani, S.H., M.H.",
      status: "Selesai",
      date: "12 Okt 2025, 10:00 WIB",
      category: "Tanah"
    },
    {
      id: 6,
      title: "Pertanyaan Hukum Perceraian",
      type: "Chat",
      prosecutor: "Jaksa: Dewi Sartika, S.H.",
      status: "Selesai",
      date: "10 Okt 2025",
      category: "Keluarga"
    }
  ];

  if (currentView === "schedule") {
    return <ScheduleConsultationScreen onBack={() => setCurrentView("list")} />;
  }

  if (currentView === "startChat") {
    return (
      <StartChatFormScreen
        onBack={() => setCurrentView("list")}
        onSubmit={(topik, kategori) => {
          // Create new chat session
          const newChatId = Math.floor(Math.random() * 10000);
          setSelectedConsultationId(newChatId);
          setCurrentView("chat");
        }}
      />
    );
  }

  if (currentView === "chat" && selectedConsultationId) {
    // Check if this is a new chat (id > 1000 indicates newly created)
    const isNewChat = selectedConsultationId > 1000;
    
    return (
      <ChatConsultationScreen
        consultationId={selectedConsultationId}
        isNewChat={isNewChat}
        onBack={() => {
          setCurrentView("list");
          setSelectedConsultationId(null);
        }}
        onUpgradeToFormal={(id) => {
          setSelectedConsultationId(id);
          setCurrentView("schedule");
        }}
      />
    );
  }

  if (currentView === "reschedule" && selectedConsultationId) {
    return (
      <RescheduleConsultationScreen
        consultationId={selectedConsultationId}
        onBack={() => {
          setCurrentView("list");
          setSelectedConsultationId(null);
        }}
      />
    );
  }

  if (currentView === "detail" && selectedConsultationId) {
    return (
      <ConsultationDetailScreen
        consultationId={selectedConsultationId}
        onBack={() => {
          setCurrentView("list");
          setSelectedConsultationId(null);
        }}
      />
    );
  }

  const handleViewDetail = (id: number, status: string) => {
    setSelectedConsultationId(id);
    if (status === "Chat Aktif") {
      setCurrentView("chat");
    } else {
      setCurrentView("detail");
    }
  };

  const handleReschedule = (id: number) => {
    setSelectedConsultationId(id);
    setCurrentView("reschedule");
  };

  // Statistics
  const stats = {
    chat: consultations.filter(c => c.status === "Chat Aktif").length,
    pending: consultations.filter(c => c.status === "Pending Approval").length,
    scheduled: consultations.filter(c => c.status === "Dijadwalkan").length,
    rejected: consultations.filter(c => c.status === "Ditolak").length
  };

  return (
    <div className="size-full bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#09142b] to-[#1a2847] px-6 pt-12 pb-6">
        <h1 className="font-['The_Seasons'] text-2xl text-white mb-2">
          Konsultasi Hukum
        </h1>
        <p className="text-white/70 text-sm">
          Kelola konsultasi dan riwayat Anda
        </p>
      </div>

      {/* Info Cards */}
      <div className="px-6 -mt-3 mb-4">
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-4 bg-white shadow-md">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <MessageSquare className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Chat Aktif</p>
                <p className="text-lg text-[#09142b]">{stats.chat}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-white shadow-md">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 rounded-lg">
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Pending</p>
                <p className="text-lg text-[#09142b]">{stats.pending}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex-1 overflow-y-auto">
        <Tabs defaultValue="active" className="px-6">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="active">Aktif</TabsTrigger>
            <TabsTrigger value="pending">
              Pending
              {stats.pending > 0 && (
                <Badge className="ml-1 bg-amber-500 text-white text-xs px-1.5 py-0">
                  {stats.pending}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="history">Riwayat</TabsTrigger>
          </TabsList>

          {/* Active Tab - Chat & Scheduled */}
          <TabsContent value="active" className="space-y-3 pb-6">
            {/* Chat Consultations */}
            {consultations.filter(c => c.status === "Chat Aktif").length > 0 && (
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <MessageSquare className="w-4 h-4 text-purple-600" />
                  <p className="text-sm text-gray-600">Konsultasi Chat</p>
                </div>
                {consultations.filter(c => c.status === "Chat Aktif").map((consultation) => (
                  <Card 
                    key={consultation.id} 
                    onClick={() => handleViewDetail(consultation.id, consultation.status)}
                    className="p-4 mb-3 hover:shadow-lg transition-shadow cursor-pointer"
                  >
                    <div className="flex gap-3">
                      <div className="p-3 bg-purple-100 rounded-lg">
                        <MessageSquare className="w-6 h-6 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-[#09142b] mb-1">{consultation.title}</h3>
                            <p className="text-sm text-gray-500 mb-1">{consultation.prosecutor}</p>
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                        </div>
                        <div className="flex items-center gap-2 flex-wrap mb-2">
                          <Badge variant="outline" className="text-xs">
                            {consultation.category}
                          </Badge>
                          <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">
                            Chat Aktif
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {consultation.date}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* Scheduled Consultations */}
            {consultations.filter(c => c.status === "Dijadwalkan").length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                  <p className="text-sm text-gray-600">Konsultasi Terjadwal</p>
                </div>
                {consultations.filter(c => c.status === "Dijadwalkan").map((consultation) => (
                  <Card 
                    key={consultation.id} 
                    onClick={() => handleViewDetail(consultation.id, consultation.status)}
                    className="p-4 mb-3 hover:shadow-lg transition-shadow cursor-pointer"
                  >
                    <div className="flex gap-3">
                      <div className="p-3 bg-[#09142b]/10 rounded-lg">
                        {consultation.type.includes("Online") ? (
                          <Video className="w-6 h-6 text-[#09142b]" />
                        ) : (
                          <Users className="w-6 h-6 text-[#09142b]" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-[#09142b] mb-1">{consultation.title}</h3>
                            <p className="text-sm text-gray-500 mb-1">{consultation.prosecutor}</p>
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                        </div>
                        <div className="flex items-center gap-2 flex-wrap mb-2">
                          <Badge variant="outline" className="text-xs">
                            {consultation.category}
                          </Badge>
                          <Badge className="bg-blue-100 text-blue-700 border-blue-200 text-xs">
                            {consultation.type}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {consultation.date}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
            
            {consultations.filter(c => c.status === "Chat Aktif" || c.status === "Dijadwalkan").length === 0 && (
              <div className="text-center py-12">
                <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-2">Belum ada konsultasi aktif</p>
                <p className="text-sm text-gray-400 mb-4">Mulai chat dari tombol (+) di bawah</p>
                <Button 
                  onClick={() => setShowChoiceDialog(true)}
                  variant="outline"
                  className="mt-2"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Mulai Konsultasi
                </Button>
              </div>
            )}
          </TabsContent>

          {/* Pending Tab */}
          <TabsContent value="pending" className="space-y-3 pb-6">
            {/* Pending Approval */}
            {consultations.filter(c => c.status === "Pending Approval").map((consultation) => (
              <Card key={consultation.id} className="p-4">
                <div className="flex gap-3">
                  <div className="p-3 bg-amber-100 rounded-lg">
                    {consultation.type.includes("Online") ? (
                      <Video className="w-6 h-6 text-amber-600" />
                    ) : (
                      <Users className="w-6 h-6 text-amber-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[#09142b] mb-1">{consultation.title}</h3>
                    <p className="text-sm text-gray-500 mb-2">{consultation.prosecutor}</p>
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      <Badge variant="outline" className="text-xs">
                        {consultation.category}
                      </Badge>
                      <Badge className="bg-amber-100 text-amber-700 border-amber-200 text-xs">
                        Menunggu Persetujuan
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-gray-600 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Diajukan: {consultation.submittedDate}
                      </p>
                      <p className="text-xs text-gray-600 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Jadwal diajukan: {consultation.date}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}

            {/* Rejected */}
            {consultations.filter(c => c.status === "Ditolak").map((consultation) => (
              <Card key={consultation.id} className="p-4 border-red-200">
                <div className="flex gap-3">
                  <div className="p-3 bg-red-100 rounded-lg">
                    <XCircle className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[#09142b] mb-1">{consultation.title}</h3>
                    <p className="text-sm text-gray-500 mb-2">{consultation.prosecutor}</p>
                    <Badge className="bg-red-100 text-red-700 border-red-200 text-xs mb-3">
                      Ditolak
                    </Badge>
                    <div className="p-3 bg-red-50 rounded-lg mb-3">
                      <p className="text-sm text-red-900">
                        <strong>Alasan:</strong> {consultation.rejectionReason}
                      </p>
                    </div>
                    <Button
                      onClick={() => handleReschedule(consultation.id)}
                      size="sm"
                      className="w-full bg-[#09142b] hover:bg-[#09142b]/90"
                    >
                      Jadwalkan Ulang
                    </Button>
                  </div>
                </div>
              </Card>
            ))}

            {consultations.filter(c => c.status === "Pending Approval" || c.status === "Ditolak").length === 0 && (
              <div className="text-center py-12">
                <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Tidak ada permohonan pending</p>
              </div>
            )}
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-3 pb-6">
            {consultations.filter(c => c.status === "Selesai").map((consultation) => (
              <Card 
                key={consultation.id} 
                onClick={() => handleViewDetail(consultation.id, consultation.status)}
                className="p-4 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex gap-3">
                  <div className="p-3 bg-gray-100 rounded-lg">
                    {consultation.type === "Chat" ? (
                      <MessageSquare className="w-6 h-6 text-gray-600" />
                    ) : consultation.type.includes("Online") ? (
                      <Video className="w-6 h-6 text-gray-600" />
                    ) : (
                      <Users className="w-6 h-6 text-gray-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-[#09142b] mb-1">{consultation.title}</h3>
                        <p className="text-sm text-gray-500 mb-1">{consultation.prosecutor}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    </div>
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      <Badge variant="outline" className="text-xs">
                        {consultation.category}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        Selesai
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {consultation.date}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>

      {/* Floating Action Button */}
      <div className="absolute bottom-24 right-6">
        <Button
          onClick={() => setShowChoiceDialog(true)}
          className="h-14 w-14 rounded-full bg-[#09142b] hover:bg-[#09142b]/90 shadow-lg"
          size="icon"
        >
          <Plus className="w-6 h-6" />
        </Button>
      </div>

      {/* Choice Dialog */}
      <Dialog open={showChoiceDialog} onOpenChange={setShowChoiceDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Pilih jenis konsultasi</DialogTitle>
            <DialogDescription>
              Mulai chat cepat atau ajukan konsultasi terjadwal
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-3 py-4">
            {/* Konsultasi Chat Option */}
            <Card 
              onClick={() => {
                setShowChoiceDialog(false);
                setCurrentView("startChat");
              }}
              className="p-4 hover:shadow-lg transition-all cursor-pointer border-2 hover:border-purple-500"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-100 rounded-xl">
                  <MessageSquare className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-[#09142b] mb-1">Konsultasi Chat</h3>
                  <p className="text-sm text-gray-600">
                    Mulai percakapan langsung dengan Jaksa secara asynchronous
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">
                      Respon 1-2 jam
                    </Badge>
                    <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                      Tanpa jadwal
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>

            {/* Konsultasi Formal Option */}
            <Card 
              onClick={() => {
                setShowChoiceDialog(false);
                setCurrentView("schedule");
              }}
              className="p-4 hover:shadow-lg transition-all cursor-pointer border-2 hover:border-blue-500"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-[#09142b] mb-1">Konsultasi Formal</h3>
                  <p className="text-sm text-gray-600">
                    Jadwalkan sesi konsultasi via Zoom atau tatap muka
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                      Perlu persetujuan
                    </Badge>
                    <Badge variant="outline" className="text-xs bg-amber-50 text-amber-700 border-amber-200">
                      Terjadwal
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-500">
              Pilih metode konsultasi yang sesuai dengan kebutuhan Anda
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
