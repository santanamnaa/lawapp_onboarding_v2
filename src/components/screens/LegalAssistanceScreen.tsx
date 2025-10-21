import { useState } from "react";
import { ArrowLeft, FileText, Plus, Search, Filter, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { AssistanceFormScreen } from "./AssistanceFormScreen";
import { AssistanceDetailScreen } from "./AssistanceDetailScreen";

type View = "list" | "form" | "detail";

interface LegalAssistanceScreenProps {
  onAssistanceSubmitted?: (chatId: number) => void;
}

export function LegalAssistanceScreen({ onAssistanceSubmitted }: LegalAssistanceScreenProps) {
  const [currentView, setCurrentView] = useState<View>("list");
  const [selectedApplicationId, setSelectedApplicationId] = useState<number | null>(null);

  const applications = [
    { 
      id: 1, 
      title: "Sengketa Tanah Warisan", 
      type: "Bantuan Hukum",
      status: "Diproses", 
      date: "15 Okt 2025",
      icon: AlertCircle,
      color: "orange"
    },
    { 
      id: 2, 
      title: "Perjanjian Jual Beli", 
      type: "Pendampingan Hukum",
      status: "Disetujui", 
      date: "10 Okt 2025",
      icon: CheckCircle,
      color: "green"
    },
    { 
      id: 3, 
      title: "Mediasi Utang Piutang", 
      type: "Bantuan Hukum",
      status: "Selesai", 
      date: "05 Okt 2025",
      icon: CheckCircle,
      color: "blue"
    },
    { 
      id: 4, 
      title: "Review Kontrak Bisnis", 
      type: "Pendampingan Hukum",
      status: "Ditolak", 
      date: "01 Okt 2025",
      icon: XCircle,
      color: "red"
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Diproses": return "bg-orange-100 text-orange-700 border-orange-200";
      case "Disetujui": return "bg-green-100 text-green-700 border-green-200";
      case "Selesai": return "bg-blue-100 text-blue-700 border-blue-200";
      case "Ditolak": return "bg-red-100 text-red-700 border-red-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  if (currentView === "form") {
    return (
      <AssistanceFormScreen 
        onBack={() => setCurrentView("list")}
        onSubmitSuccess={(chatId) => {
          setCurrentView("list");
          onAssistanceSubmitted?.(chatId);
        }}
      />
    );
  }

  if (currentView === "detail" && selectedApplicationId) {
    return (
      <AssistanceDetailScreen 
        applicationId={selectedApplicationId}
        onBack={() => {
          setCurrentView("list");
          setSelectedApplicationId(null);
        }}
      />
    );
  }

  const handleViewDetail = (id: number) => {
    setSelectedApplicationId(id);
    setCurrentView("detail");
  };

  return (
    <div className="size-full bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#09142b] to-[#1a2847] px-6 pt-12 pb-6">
        <h1 className="font-['The_Seasons'] text-2xl text-white mb-2">
          Permohonan Hukum
        </h1>
        <p className="text-white/70 text-sm">
          Ajukan permohonan pendampingan & bantuan hukum
        </p>
      </div>

      {/* New Application Button & Search */}
      <div className="px-6 -mt-3 mb-4 space-y-3">
        <Button
          onClick={() => setCurrentView("form")}
          className="w-full bg-[#6a462f] hover:bg-[#6a462f]/90 h-12 shadow-lg"
        >
          <Plus className="w-5 h-5 mr-2" />
          Ajukan Permohonan Baru
        </Button>
        
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Cari permohonan..."
              className="pl-11 h-12 bg-white shadow-md"
            />
          </div>
          <Button variant="outline" size="icon" className="h-12 w-12 bg-white shadow-md">
            <Filter className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex-1 overflow-y-auto">
        <Tabs defaultValue="all" className="px-6">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="all">Semua</TabsTrigger>
            <TabsTrigger value="active">Aktif</TabsTrigger>
            <TabsTrigger value="completed">Selesai</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-3 pb-6">
            {applications.map((app) => {
              const StatusIcon = app.icon;
              return (
                <Card 
                  key={app.id} 
                  onClick={() => handleViewDetail(app.id)}
                  className="p-4 hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div className="flex gap-3">
                    <div className={`p-2 rounded-lg ${
                      app.color === 'orange' ? 'bg-orange-100' :
                      app.color === 'green' ? 'bg-green-100' :
                      app.color === 'blue' ? 'bg-blue-100' :
                      'bg-red-100'
                    }`}>
                      <StatusIcon className={`w-5 h-5 ${
                        app.color === 'orange' ? 'text-orange-600' :
                        app.color === 'green' ? 'text-green-600' :
                        app.color === 'blue' ? 'text-blue-600' :
                        'text-red-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-[#09142b] mb-1">{app.title}</h3>
                          <p className="text-sm text-gray-500">{app.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge className={getStatusColor(app.status)}>
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
              );
            })}
          </TabsContent>

          <TabsContent value="active" className="space-y-3 pb-6">
            {applications.filter(app => app.status === "Diproses" || app.status === "Disetujui").map((app) => {
              const StatusIcon = app.icon;
              return (
                <Card 
                  key={app.id} 
                  onClick={() => handleViewDetail(app.id)}
                  className="p-4 hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div className="flex gap-3">
                    <div className={`p-2 rounded-lg ${app.color === 'orange' ? 'bg-orange-100' : 'bg-green-100'}`}>
                      <StatusIcon className={`w-5 h-5 ${app.color === 'orange' ? 'text-orange-600' : 'text-green-600'}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[#09142b] mb-1">{app.title}</h3>
                      <p className="text-sm text-gray-500 mb-2">{app.type}</p>
                      <Badge className={getStatusColor(app.status)}>
                        {app.status}
                      </Badge>
                    </div>
                  </div>
                </Card>
              );
            })}
          </TabsContent>

          <TabsContent value="completed" className="space-y-3 pb-6">
            {applications.filter(app => app.status === "Selesai" || app.status === "Ditolak").map((app) => {
              const StatusIcon = app.icon;
              return (
                <Card 
                  key={app.id} 
                  onClick={() => handleViewDetail(app.id)}
                  className="p-4 hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div className="flex gap-3">
                    <div className={`p-2 rounded-lg ${app.color === 'blue' ? 'bg-blue-100' : 'bg-red-100'}`}>
                      <StatusIcon className={`w-5 h-5 ${app.color === 'blue' ? 'text-blue-600' : 'text-red-600'}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[#09142b] mb-1">{app.title}</h3>
                      <p className="text-sm text-gray-500 mb-2">{app.type}</p>
                      <Badge className={getStatusColor(app.status)}>
                        {app.status}
                      </Badge>
                    </div>
                  </div>
                </Card>
              );
            })}
          </TabsContent>
        </Tabs>
      </div>

      {/* Floating Action Button */}
      <div className="absolute bottom-24 right-6">
        <Button
          onClick={() => setCurrentView("form")}
          className="h-14 w-14 rounded-full bg-[#09142b] hover:bg-[#09142b]/90 shadow-lg"
          size="icon"
        >
          <Plus className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
}
