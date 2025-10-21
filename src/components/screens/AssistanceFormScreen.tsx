import { useState } from "react";
import { ArrowLeft, Upload, FileText, AlertTriangle, Info } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Card } from "../ui/card";
import { Alert, AlertDescription } from "../ui/alert";
import { toast } from "sonner@2.0.3";

interface AssistanceFormScreenProps {
  onBack: () => void;
  onSubmitSuccess?: (chatId: number) => void;
}

const PERMOHONAN_TYPES = {
  pendampingan: {
    label: "Permohonan Pendampingan Hukum",
    description: "Pendampingan hukum untuk proses hukum yang sedang berjalan, seperti pendampingan dalam persidangan, mediasi, atau negosiasi kontrak."
  },
  bantuan: {
    label: "Permohonan Bantuan Hukum",
    description: "Bantuan hukum untuk konsultasi mendalam, penyusunan dokumen legal, atau analisis masalah hukum yang dihadapi instansi."
  }
};

export function AssistanceFormScreen({ onBack, onSubmitSuccess }: AssistanceFormScreenProps) {
  const [permohonanType, setPermohonanType] = useState<string>("");
  const [institutionName, setInstitutionName] = useState("");
  const [subject, setSubject] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      
      // Generate auto chat ID
      const newChatId = Math.floor(Math.random() * 10000) + 5000;
      
      // Create chat topic based on submission type
      const chatTopic = permohonanType === "pendampingan"
        ? `Pendampingan Hukum - ${subject || institutionName}`
        : `Bantuan Hukum - ${subject || institutionName}`;
      
      // Store chat session info in localStorage for demo
      const chatSession = {
        id: newChatId,
        topic: chatTopic,
        category: permohonanType === "pendampingan" ? "Pendampingan Hukum" : "Bantuan Hukum",
        type: permohonanType,
        createdAt: new Date().toISOString(),
        fromAssistance: true
      };
      
      localStorage.setItem(`chat_${newChatId}`, JSON.stringify(chatSession));
      
      // Show success toast
      toast.success("Permohonan berhasil diajukan!", {
        description: "Anda dapat langsung memulai chat dengan Jaksa"
      });
      
      // Trigger callback to auto-open chat
      onSubmitSuccess?.(newChatId);
    }, 2000);
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
        <h1 className="font-['The_Seasons'] text-2xl text-white mb-2">
          Ajukan Permohonan
        </h1>
        <p className="text-white/70 text-sm">
          Pendampingan & Bantuan Hukum untuk Instansi
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex-1 px-6 pt-6 pb-8 space-y-6">
        {/* Important Notice */}
        <Alert className="border-amber-200 bg-amber-50">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
          <AlertDescription className="text-sm text-amber-900 ml-2">
            <strong>Penting:</strong> Permohonan ini hanya dapat diajukan oleh Instansi Pemerintah Kabupaten Kota Baru, BUMD, dan aparatur pemerintah terkait lainnya.
          </AlertDescription>
        </Alert>

        {/* Jenis Permohonan */}
        <Card className="p-5">
          <h3 className="text-[#09142b] mb-4">Jenis Permohonan</h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="permohonanType">Pilih Jenis Permohonan</Label>
              <Select value={permohonanType} onValueChange={setPermohonanType} required>
                <SelectTrigger id="permohonanType">
                  <SelectValue placeholder="-- Pilih Jenis Permohonan --" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pendampingan">
                    Permohonan Pendampingan Hukum
                  </SelectItem>
                  <SelectItem value="bantuan">
                    Permohonan Bantuan Hukum
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {permohonanType && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex gap-2">
                  <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-[#09142b] mb-1">
                      {PERMOHONAN_TYPES[permohonanType as keyof typeof PERMOHONAN_TYPES].label}
                    </p>
                    <p className="text-xs text-blue-900 leading-relaxed">
                      {PERMOHONAN_TYPES[permohonanType as keyof typeof PERMOHONAN_TYPES].description}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Data Pemohon / Instansi */}
        <Card className="p-5">
          <h3 className="text-[#09142b] mb-4">Data Pemohon / Instansi</h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="institutionName">Nama Instansi</Label>
              <Input 
                id="institutionName"
                value={institutionName}
                onChange={(e) => setInstitutionName(e.target.value)}
                placeholder="Contoh: Dinas Kesehatan Kabupaten Kota Baru" 
                required 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="picName">Nama Penanggung Jawab</Label>
              <Input 
                id="picName" 
                placeholder="Nama lengkap penanggung jawab" 
                required 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="picPosition">Jabatan</Label>
              <Input 
                id="picPosition" 
                placeholder="Contoh: Kepala Dinas" 
                required 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Alamat Instansi</Label>
              <Textarea 
                id="address" 
                placeholder="Alamat lengkap instansi" 
                rows={3} 
                required 
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="phone">No. Telepon</Label>
                <Input id="phone" type="tel" placeholder="08xxx" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Instansi</Label>
                <Input id="email" type="email" placeholder="email@instansi.go.id" required />
              </div>
            </div>
          </div>
        </Card>

        {/* Perihal / Tentang */}
        <Card className="p-5">
          <h3 className="text-[#09142b] mb-4">Perihal / Tentang</h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Judul Permohonan</Label>
              <Input 
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Contoh: Pendampingan Pembangunan Rumah Sakit Daerah" 
                required 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Kategori</Label>
              <Select required>
                <SelectTrigger id="category">
                  <SelectValue placeholder="-- Pilih Kategori --" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="proyek">Proyek Pembangunan</SelectItem>
                  <SelectItem value="kontrak">Kontrak & Perjanjian</SelectItem>
                  <SelectItem value="sengketa">Sengketa Hukum</SelectItem>
                  <SelectItem value="peraturan">Peraturan Daerah</SelectItem>
                  <SelectItem value="lainnya">Lainnya</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Uraian Detail Permohonan</Label>
              <Textarea 
                id="description" 
                placeholder="Jelaskan secara detail permohonan Anda, termasuk latar belakang, tujuan, dan bantuan yang diharapkan..."
                rows={6}
                required 
              />
              <p className="text-xs text-gray-500">
                Minimal 100 karakter. Semakin detail informasi yang diberikan, semakin baik kami dapat membantu Anda.
              </p>
            </div>
          </div>
        </Card>

        {/* Upload Dokumen */}
        <Card className="p-5">
          <h3 className="text-[#09142b] mb-4">Dokumen Pendukung</h3>
          
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#09142b] transition-colors cursor-pointer">
              <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-600 mb-1">
                Klik untuk upload atau drag & drop
              </p>
              <p className="text-xs text-gray-500">
                PDF, JPG, PNG (Max. 5MB per file)
              </p>
              <input type="file" className="hidden" multiple accept=".pdf,.jpg,.jpeg,.png" />
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="text-xs text-gray-700 mb-2">
                <strong>Dokumen yang disarankan:</strong>
              </p>
              <ul className="text-xs text-gray-600 space-y-1 list-disc list-inside">
                <li>Surat permohonan resmi (berkop surat)</li>
                <li>Dokumen terkait masalah hukum</li>
                <li>Surat kuasa (jika ada)</li>
                <li>Dokumen pendukung lainnya</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Submit Button */}
        <div className="space-y-3">
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[#09142b] hover:bg-[#09142b]/90 h-14"
          >
            {loading ? "Mengirim Permohonan..." : "Kirim Permohonan"}
          </Button>
          
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="w-full h-12"
          >
            Batal
          </Button>
        </div>
      </form>
    </div>
  );
}
