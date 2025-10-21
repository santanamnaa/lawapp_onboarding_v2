import { useState } from "react";
import { ArrowLeft, MessageSquare } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Card } from "../ui/card";
import { Alert, AlertDescription } from "../ui/alert";
import { toast } from "sonner@2.0.3";

interface StartChatFormScreenProps {
  onBack: () => void;
  onSubmit: (topik: string, kategori: string) => void;
}

export function StartChatFormScreen({ onBack, onSubmit }: StartChatFormScreenProps) {
  const [topik, setTopik] = useState("");
  const [kategori, setKategori] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ topik?: string; kategori?: string }>({});

  const categories = [
    "Pertanahan",
    "Hukum Waris",
    "Pernikahan",
    "Perceraian",
    "Pendirian Perusahaan",
    "Utang Piutang",
    "Lainnya"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const newErrors: { topik?: string; kategori?: string } = {};
    
    if (!topik.trim()) {
      newErrors.topik = "Topik wajib diisi.";
    }
    
    if (!kategori) {
      newErrors.kategori = "Pilih minimal satu kategori.";
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setErrors({});
    setLoading(true);
    
    // Simulate creating chat session with possible error
    setTimeout(() => {
      setLoading(false);
      
      // Simulate success (95% success rate for demo)
      const isSuccess = Math.random() > 0.05;
      
      if (isSuccess) {
        toast.success("Chat konsultasi berhasil dibuat!", {
          description: "Anda akan segera terhubung dengan Jaksa"
        });
        onSubmit(topik, kategori);
      } else {
        toast.error("Tidak dapat memulai chat. Coba lagi.", {
          description: "Terjadi kesalahan saat membuat sesi chat"
        });
      }
    }, 1000);
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
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-white/10 rounded-xl">
            <MessageSquare className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-['The_Seasons'] text-2xl text-white">
              Mulai Konsultasi Chat
            </h1>
          </div>
        </div>
        <p className="text-white/70 text-sm">
          Mulai chat cepat dengan Jaksa Pengacara Negara
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex-1 px-6 pt-6 pb-8 space-y-6">
        {/* Info Alert */}
        <Alert className="bg-purple-50 border-purple-200">
          <MessageSquare className="w-5 h-5 text-purple-600" />
          <AlertDescription className="text-sm text-purple-900 ml-2">
            Konsultasi chat memungkinkan Anda berkomunikasi langsung dengan Jaksa secara asynchronous. Anda bisa mengirim pesan kapan saja dan mendapat balasan dalam 1-2 jam kerja.
          </AlertDescription>
        </Alert>

        {/* Topik Chat */}
        <Card className="p-5">
          <div className="space-y-4">
            <div>
              <Label htmlFor="topik" className="mb-2 block">
                Topik Chat <span className="text-red-500">*</span>
              </Label>
              <Input
                id="topik"
                value={topik}
                onChange={(e) => {
                  setTopik(e.target.value);
                  if (errors.topik) {
                    setErrors({ ...errors, topik: undefined });
                  }
                }}
                placeholder="Mis. Sengketa warisan keluarga"
                className={`h-12 ${errors.topik ? 'border-red-500' : ''}`}
              />
              {errors.topik && (
                <p className="text-sm text-red-600 mt-1">{errors.topik}</p>
              )}
              <p className="text-xs text-gray-500 mt-2">
                Judul singkat untuk mengidentifikasi topik konsultasi Anda
              </p>
            </div>
          </div>
        </Card>

        {/* Kategori */}
        <Card className="p-5">
          <div className="space-y-4">
            <div>
              <Label className="mb-2 block">
                Kategori Permasalahan <span className="text-red-500">*</span>
              </Label>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setKategori(cat);
                      if (errors.kategori) {
                        setErrors({ ...errors, kategori: undefined });
                      }
                    }}
                    className={`p-3 border rounded-lg text-sm transition-colors ${
                      kategori === cat
                        ? 'bg-[#09142b] text-white border-[#09142b]'
                        : errors.kategori
                        ? 'bg-white text-gray-700 border-red-500 hover:border-[#09142b]'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-[#09142b]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              {errors.kategori && (
                <p className="text-sm text-red-600 mt-2">{errors.kategori}</p>
              )}
            </div>
          </div>
        </Card>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-[#09142b] hover:bg-[#09142b]/90 h-14 text-base"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Memproses...
            </>
          ) : (
            <>
              <MessageSquare className="w-5 h-5 mr-2" />
              Mulai Chat
            </>
          )}
        </Button>

        <p className="text-xs text-center text-gray-500">
          Setelah chat dimulai, Anda akan langsung masuk ke ruang percakapan dengan Jaksa yang ditugaskan
        </p>
      </form>
    </div>
  );
}
