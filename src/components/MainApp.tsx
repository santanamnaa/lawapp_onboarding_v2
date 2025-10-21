import { useState } from "react";
import { Home, FileText, MessageSquare, BookOpen, User, Building2 } from "lucide-react";
import { DashboardScreen } from "./screens/DashboardScreen";
import { LegalAssistanceScreen } from "./screens/LegalAssistanceScreen";
import { ConsultationScreen } from "./screens/ConsultationScreen";
import { EducationScreen } from "./screens/EducationScreen";
import { ProfileScreen } from "./screens/ProfileScreen";
import { PublicProjectsScreen } from "./screens/PublicProjectsScreen";

type MainTab = "dashboard" | "assistance" | "consultation" | "education" | "projects" | "profile";

interface MainAppProps {
  onLogout: () => void;
}

export function MainApp({ onLogout }: MainAppProps) {
  const [activeTab, setActiveTab] = useState<MainTab>("dashboard");
  const [autoOpenChatId, setAutoOpenChatId] = useState<number | null>(null);
  const userRole = localStorage.getItem("userRole") || "masyarakat";

  const allTabs = [
    { id: "dashboard" as MainTab, label: "Beranda", icon: Home, roles: ["masyarakat", "instansi"] },
    { id: "assistance" as MainTab, label: "Permohonan", icon: FileText, roles: ["instansi"] },
    { id: "consultation" as MainTab, label: "Konsultasi", icon: MessageSquare, roles: ["masyarakat", "instansi"] },
    { id: "projects" as MainTab, label: "Proyek", icon: Building2, roles: ["masyarakat", "instansi"] },
    { id: "education" as MainTab, label: "Edukasi", icon: BookOpen, roles: ["masyarakat", "instansi"] },
    { id: "profile" as MainTab, label: "Profil", icon: User, roles: ["masyarakat", "instansi"] },
  ];

  // Filter tabs based on user role
  const tabs = allTabs.filter(tab => tab.roles.includes(userRole));

  const handleAssistanceSubmitted = (chatId: number) => {
    // Auto-create chat and navigate to consultation tab
    setAutoOpenChatId(chatId);
    setActiveTab("consultation");
  };

  return (
    <div className="size-full bg-gray-50 flex flex-col">
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === "dashboard" && <DashboardScreen onNavigate={setActiveTab} userRole={userRole} />}
        {activeTab === "assistance" && userRole === "instansi" && (
          <LegalAssistanceScreen onAssistanceSubmitted={handleAssistanceSubmitted} />
        )}
        {activeTab === "consultation" && (
          <ConsultationScreen 
            autoOpenChatId={autoOpenChatId}
            onChatOpened={() => setAutoOpenChatId(null)}
          />
        )}
        {activeTab === "projects" && <PublicProjectsScreen />}
        {activeTab === "education" && <EducationScreen />}
        {activeTab === "profile" && <ProfileScreen onLogout={onLogout} />}
      </div>

      {/* Bottom Navigation */}
      <div className="bg-white border-t border-gray-200 px-2 py-2 safe-area-bottom">
        <div className="flex items-center justify-around">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-colors min-w-[60px]"
              >
                <Icon 
                  className={`w-6 h-6 ${
                    isActive ? 'text-[#09142b]' : 'text-gray-400'
                  }`}
                />
                <span 
                  className={`text-xs ${
                    isActive ? 'text-[#09142b]' : 'text-gray-500'
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
