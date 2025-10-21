import { useState } from "react";
import { Scale, MessageSquare, BookOpen, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";

interface OnboardingScreenProps {
  onComplete: () => void;
}

const slides = [
  {
    icon: Scale,
    title: "Bantuan Hukum Gratis",
    description: "Akses layanan bantuan dan pendampingan hukum gratis dari Kejaksaan Negeri Kota Baru",
    color: "#09142b"
  },
  {
    icon: MessageSquare,
    title: "Konsultasi Mudah",
    description: "Jadwalkan konsultasi online atau offline dengan jaksa secara langsung",
    color: "#6a462f"
  },
  {
    icon: BookOpen,
    title: "Edukasi Hukum",
    description: "Pelajari hak-hak hukum Anda melalui artikel dan dokumen template yang tersedia",
    color: "#09142b"
  }
];

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const slide = slides[currentSlide];
  const Icon = slide.icon;

  return (
    <div className="size-full bg-white flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        <div 
          className="p-8 rounded-3xl mb-8"
          style={{ backgroundColor: `${slide.color}15` }}
        >
          <Icon className="w-24 h-24" style={{ color: slide.color }} />
        </div>
        
        <h2 className="font-['The_Seasons'] text-3xl text-[#09142b] text-center mb-4">
          {slide.title}
        </h2>
        
        <p className="text-gray-600 text-center leading-relaxed">
          {slide.description}
        </p>
      </div>
      
      <div className="p-8 space-y-4">
        {/* Pagination dots */}
        <div className="flex justify-center gap-2 mb-4">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide 
                  ? 'w-8 bg-[#09142b]' 
                  : 'w-2 bg-gray-300'
              }`}
            />
          ))}
        </div>
        
        <Button 
          onClick={handleNext}
          className="w-full bg-[#09142b] hover:bg-[#09142b]/90 h-14 text-base"
        >
          {currentSlide < slides.length - 1 ? 'Lanjutkan' : 'Mulai'}
          <ChevronRight className="ml-2 w-5 h-5" />
        </Button>
        
        {currentSlide < slides.length - 1 && (
          <Button 
            onClick={onComplete}
            variant="ghost"
            className="w-full h-12"
          >
            Lewati
          </Button>
        )}
      </div>
    </div>
  );
}
