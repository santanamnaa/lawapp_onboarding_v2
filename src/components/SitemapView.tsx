import { useState } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ScrollArea } from "./ui/scroll-area";
import { 
  User, Home, FileText, MessageSquare, BookOpen, 
  Clock, FolderOpen, Settings, LogIn, UserPlus,
  Shield, Bell, ChevronRight, Smartphone
} from "lucide-react";

interface Screen {
  id: string;
  name: string;
  file: string;
  icon: any;
  children?: Screen[];
}

const sitemapData: { [key: string]: Screen[] } = {
  auth: [
    { id: "splash", name: "Splash Screen", file: "SplashScreen.tsx", icon: Smartphone },
    { id: "onboarding", name: "Onboarding (3 slides)", file: "OnboardingScreen.tsx", icon: Smartphone },
    { id: "login", name: "Login", file: "LoginScreen.tsx", icon: LogIn },
    { id: "register", name: "Registrasi", file: "RegisterScreen.tsx", icon: UserPlus },
    { id: "otp-verify", name: "Verifikasi OTP", file: "OtpVerifyScreen.tsx", icon: Shield },
    { id: "forgot-password", name: "Lupa Password", file: "ForgotPasswordScreen.tsx", icon: Shield },
    { id: "reset-password", name: "Reset Password", file: "ResetPasswordScreen.tsx", icon: Shield },
  ],
  main: [
    {
      id: "dashboard",
      name: "Dashboard/Beranda",
      file: "DashboardScreen.tsx",
      icon: Home,
      children: [
        { id: "notifications", name: "Notifikasi", file: "NotificationsScreen.tsx", icon: Bell },
      ]
    },
    {
      id: "legal-assistance",
      name: "Bantuan Hukum",
      file: "LegalAssistanceScreen.tsx",
      icon: FileText,
      children: [
        { id: "assistance-form", name: "Form Pengajuan", file: "AssistanceFormScreen.tsx", icon: FileText },
        { id: "assistance-type", name: "Pilih Jenis Bantuan", file: "AssistanceTypeScreen.tsx", icon: FileText },
        { id: "assistance-tracking", name: "Lacak Status", file: "AssistanceTrackingScreen.tsx", icon: Clock },
        { id: "assistance-detail", name: "Detail Pengajuan", file: "AssistanceDetailScreen.tsx", icon: FileText },
        { id: "assistance-history", name: "Riwayat Pengajuan", file: "AssistanceHistoryScreen.tsx", icon: Clock },
      ]
    },
    {
      id: "consultation",
      name: "Konsultasi",
      file: "ConsultationScreen.tsx",
      icon: MessageSquare,
      children: [
        { id: "consultation-chat", name: "Chat Konsultasi", file: "ConsultationChatScreen.tsx", icon: MessageSquare },
        { id: "schedule-appointment", name: "Jadwalkan Konsultasi", file: "ScheduleAppointmentScreen.tsx", icon: Clock },
        { id: "appointment-type", name: "Pilih Tipe (Online/Offline)", file: "AppointmentTypeScreen.tsx", icon: MessageSquare },
        { id: "appointment-category", name: "Pilih Kategori", file: "AppointmentCategoryScreen.tsx", icon: FileText },
        { id: "consultation-history", name: "Riwayat Konsultasi", file: "ConsultationHistoryScreen.tsx", icon: Clock },
        { id: "consultation-detail", name: "Detail Konsultasi", file: "ConsultationDetailScreen.tsx", icon: MessageSquare },
      ]
    },
    {
      id: "education",
      name: "Edukasi Hukum",
      file: "EducationScreen.tsx",
      icon: BookOpen,
      children: [
        { id: "article-list", name: "Daftar Artikel", file: "ArticleListScreen.tsx", icon: BookOpen },
        { id: "article-detail", name: "Detail Artikel", file: "ArticleDetailScreen.tsx", icon: BookOpen },
        { id: "article-category", name: "Filter Kategori", file: "ArticleCategoryScreen.tsx", icon: BookOpen },
        { id: "article-search", name: "Pencarian Artikel", file: "ArticleSearchScreen.tsx", icon: BookOpen },
        { id: "article-bookmark", name: "Artikel Tersimpan", file: "ArticleBookmarkScreen.tsx", icon: BookOpen },
        { id: "jdih-external", name: "Link ke JDIH", file: "JdihExternalScreen.tsx", icon: BookOpen },
      ]
    },
    {
      id: "progress",
      name: "Update Progress",
      file: "ProgressScreen.tsx",
      icon: Clock,
      children: [
        { id: "case-timeline", name: "Timeline Kasus", file: "CaseTimelineScreen.tsx", icon: Clock },
        { id: "upload-document", name: "Upload Dokumen", file: "UploadDocumentScreen.tsx", icon: FileText },
        { id: "progress-detail", name: "Detail Progress", file: "ProgressDetailScreen.tsx", icon: Clock },
      ]
    },
    {
      id: "documents",
      name: "Pustaka Dokumen",
      file: "DocumentsScreen.tsx",
      icon: FolderOpen,
      children: [
        { id: "template-list", name: "Daftar Template", file: "TemplateListScreen.tsx", icon: FolderOpen },
        { id: "template-detail", name: "Detail Template", file: "TemplateDetailScreen.tsx", icon: FileText },
        { id: "template-preview", name: "Preview Dokumen", file: "TemplatePreviewScreen.tsx", icon: FileText },
        { id: "template-category", name: "Kategori Dokumen", file: "TemplateCategoryScreen.tsx", icon: FolderOpen },
      ]
    },
    {
      id: "profile",
      name: "Profil",
      file: "ProfileScreen.tsx",
      icon: User,
      children: [
        { id: "edit-profile", name: "Edit Profil", file: "EditProfileScreen.tsx", icon: User },
        { id: "change-password", name: "Ubah Password", file: "ChangePasswordScreen.tsx", icon: Shield },
        { id: "settings", name: "Pengaturan", file: "SettingsScreen.tsx", icon: Settings },
      ]
    },
  ]
};

export function SitemapView() {
  const [selectedScreen, setSelectedScreen] = useState<Screen | null>(null);

  const renderScreenNode = (screen: Screen, level: number = 0) => {
    const Icon = screen.icon;
    const hasChildren = screen.children && screen.children.length > 0;

    return (
      <div key={screen.id} className={`${level > 0 ? 'ml-6 mt-3' : 'mb-4'}`}>
        <button
          onClick={() => setSelectedScreen(screen)}
          className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
            selectedScreen?.id === screen.id
              ? 'border-[#09142b] bg-[#09142b]/5'
              : 'border-gray-200 hover:border-[#6a462f] bg-white'
          }`}
        >
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-lg ${
              selectedScreen?.id === screen.id ? 'bg-[#09142b] text-white' : 'bg-gray-100 text-[#09142b]'
            }`}>
              <Icon className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-['DM_Sans'] font-semibold text-[#09142b]">{screen.name}</span>
                {hasChildren && (
                  <Badge variant="outline" className="text-xs">
                    {screen.children!.length}
                  </Badge>
                )}
              </div>
              <span className="text-sm text-gray-500 font-['DM_Sans']">{screen.file}</span>
            </div>
            {hasChildren && <ChevronRight className="w-5 h-5 text-gray-400" />}
          </div>
        </button>
        
        {hasChildren && (
          <div className="mt-2">
            {screen.children!.map(child => renderScreenNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-[#09142b] text-white px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-['The_Seasons'] text-3xl mb-2">Tanya Jaksa</h1>
          <p className="text-gray-300 font-['DM_Sans']">Sitemap & Screen Architecture</p>
          <div className="mt-4 flex gap-3">
            <Badge className="bg-[#6a462f] hover:bg-[#6a462f]/90">
              <Smartphone className="w-3 h-3 mr-1" />
              Mobile First
            </Badge>
            <Badge variant="outline" className="text-white border-white/30">
              42 Screens Total
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs defaultValue="visual" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
            <TabsTrigger value="visual">Visual Sitemap</TabsTrigger>
            <TabsTrigger value="list">Screen List</TabsTrigger>
          </TabsList>

          <TabsContent value="visual" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Authentication Flow */}
              <Card className="p-6 border-2 border-[#09142b]/10">
                <div className="flex items-center gap-3 mb-4 pb-4 border-b">
                  <div className="p-3 bg-[#09142b] text-white rounded-lg">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="font-['The_Seasons'] text-[#09142b]">Authentication</h2>
                    <p className="text-sm text-gray-500">7 screens</p>
                  </div>
                </div>
                <ScrollArea className="h-[400px] pr-4">
                  {sitemapData.auth.map(screen => renderScreenNode(screen))}
                </ScrollArea>
              </Card>

              {/* Main App Flow */}
              <Card className="p-6 border-2 border-[#09142b]/10">
                <div className="flex items-center gap-3 mb-4 pb-4 border-b">
                  <div className="p-3 bg-[#6a462f] text-white rounded-lg">
                    <Home className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="font-['The_Seasons'] text-[#09142b]">Main Application</h2>
                    <p className="text-sm text-gray-500">35 screens</p>
                  </div>
                </div>
                <ScrollArea className="h-[400px] pr-4">
                  {sitemapData.main.map(screen => renderScreenNode(screen))}
                </ScrollArea>
              </Card>
            </div>

            {/* Selected Screen Detail */}
            {selectedScreen && (
              <Card className="p-6 bg-gradient-to-br from-[#09142b] to-[#09142b]/90 text-white border-0">
                <div className="flex items-start gap-4">
                  <div className="p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                    {selectedScreen.icon && <selectedScreen.icon className="w-8 h-8" />}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-['The_Seasons'] mb-2">{selectedScreen.name}</h3>
                    <p className="text-white/80 mb-4 font-['DM_Sans']">File: {selectedScreen.file}</p>
                    {selectedScreen.children && selectedScreen.children.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {selectedScreen.children.map(child => (
                          <Badge key={child.id} variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-0">
                            {child.name}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="list" className="space-y-6">
            <Card className="p-6">
              <h3 className="font-['The_Seasons'] text-xl text-[#09142b] mb-4">Complete Screen List</h3>
              
              {/* Authentication Screens */}
              <div className="mb-8">
                <h4 className="font-semibold text-[#6a462f] mb-3 flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Authentication (7 screens)
                </h4>
                <div className="grid gap-2">
                  {sitemapData.auth.map((screen, idx) => (
                    <div key={screen.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-mono text-gray-500 w-8">{String(idx + 1).padStart(2, '0')}</span>
                      <span className="flex-1 font-['DM_Sans']">{screen.name}</span>
                      <code className="text-xs bg-white px-2 py-1 rounded border text-[#09142b]">{screen.file}</code>
                    </div>
                  ))}
                </div>
              </div>

              {/* Main App Screens */}
              {Object.entries(sitemapData.main).map(([key, screens]) => {
                const mainScreen = screens[0] || screens;
                const allScreens = screens.children || [screens];
                const Icon = mainScreen.icon;
                
                return (
                  <div key={key} className="mb-8">
                    <h4 className="font-semibold text-[#6a462f] mb-3 flex items-center gap-2">
                      <Icon className="w-5 h-5" />
                      {mainScreen.name} ({(screens.children?.length || 0) + 1} screens)
                    </h4>
                    <div className="grid gap-2">
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm font-mono text-gray-500 w-8">01</span>
                        <span className="flex-1 font-['DM_Sans']">{mainScreen.name}</span>
                        <code className="text-xs bg-white px-2 py-1 rounded border text-[#09142b]">{mainScreen.file}</code>
                      </div>
                      {screens.children?.map((child, idx) => (
                        <div key={child.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg ml-6">
                          <span className="text-sm font-mono text-gray-500 w-8">{String(idx + 2).padStart(2, '0')}</span>
                          <span className="flex-1 font-['DM_Sans']">{child.name}</span>
                          <code className="text-xs bg-white px-2 py-1 rounded border text-[#09142b]">{child.file}</code>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </Card>

            {/* Design System Info */}
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="p-6 bg-[#09142b] text-white">
                <h4 className="font-['The_Seasons'] mb-2">Primary Color</h4>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-[#09142b] border-2 border-white"></div>
                  <code className="text-sm">#09142b</code>
                </div>
              </Card>
              
              <Card className="p-6 bg-[#6a462f] text-white">
                <h4 className="font-['The_Seasons'] mb-2">Secondary Color</h4>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-[#6a462f] border-2 border-white"></div>
                  <code className="text-sm">#6a462f</code>
                </div>
              </Card>
              
              <Card className="p-6 border-2">
                <h4 className="font-['The_Seasons'] mb-2 text-[#09142b]">Typography</h4>
                <div className="text-sm space-y-1">
                  <p className="font-['DM_Sans']">UI: DM Sans</p>
                  <p className="font-['The_Seasons']">Heading: The Seasons</p>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
