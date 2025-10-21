import { Scale } from "lucide-react";

export function SplashScreen() {
  return (
    <div className="size-full bg-gradient-to-br from-[#09142b] to-[#1a2847] flex flex-col items-center justify-center">
      <div className="animate-bounce">
        <div className="p-6 bg-white/10 rounded-3xl backdrop-blur-sm border border-white/20">
          <Scale className="w-20 h-20 text-white" />
        </div>
      </div>
      
      <h1 className="font-['The_Seasons'] text-4xl text-white mt-8 mb-2">
        Tanya Jaksa
      </h1>
      
      <p className="text-white/70 text-center px-8">
        Layanan Hukum Gratis untuk Masyarakat
      </p>
      
      <div className="absolute bottom-12 flex flex-col items-center gap-2">
        <div className="w-8 h-8 border-3 border-white/20 border-t-white rounded-full animate-spin"></div>
        <p className="text-white/50 text-sm">Memuat...</p>
      </div>
    </div>
  );
}
