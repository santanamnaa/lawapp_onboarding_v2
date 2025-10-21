import { useState } from "react";
import { ArrowLeft, Video, Users, Calendar as CalendarIcon, Clock, MapPin } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Card } from "../ui/card";
import { Calendar } from "../ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Alert, AlertDescription } from "../ui/alert";

interface ScheduleConsultationScreenProps {
  onBack: () => void;
  chatConsultationId?: number; // Optional: if upgrading from chat
}

export function ScheduleConsultationScreen({ onBack, chatConsultationId }: ScheduleConsultationScreenProps) {
  const [consultationType, setConsultationType] = useState<"zoom" | "offline" | "">("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const categories = [
    "Pertanahan",
    "Hukum Waris",
    "Pernikahan",
    "Perceraian",
    "Pendirian Perusahaan",
    "Utang Piutang",
    "Lainnya"
  ];

  const timeSlots = [
    "09:00 - 10:00",
    "10:00 - 11:00",
    "11:00 - 12:00",
    "13:00 - 14:00",
    "14:00 - 15:00",
    "15:00 - 16:00"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      onBack();
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
          {chatConsultationId ? "Upgrade ke Konsultasi Formal" : "Ajukan Konsultasi Formal"}
        </h1>
        <p className="text-white/70 text-sm">
          Pilih jadwal dan metode konsultasi
        </p>
      </div>

      {/* Info Alert */}
      {chatConsultationId && (
        <div className="px-6 pt-6">
          <Alert className="bg-blue-50 border-blue-200">
            <AlertDescription className="text-sm text-blue-900">
              Anda sedang mengajukan konsultasi formal lanjutan dari sesi chat sebelumnya. Pengajuan akan direview oleh pihak Kejaksaan.
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex-1 px-6 pt-6 pb-8 space-y-6">
        {/* Consultation Type */}
        <Card className="p-5">
          <h3 className="text-[#09142b] mb-4">Metode Konsultasi</h3>
          
          <RadioGroup value={consultationType} onValueChange={(value: any) => setConsultationType(value)}>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <RadioGroupItem value="offline" id="offline" className="mt-1" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="w-5 h-5 text-green-600" />
                    <Label htmlFor="offline" className="cursor-pointer">
                      Tatap Muka (Face-to-Face)
                    </Label>
                  </div>
                  <p className="text-sm text-gray-500">
                    Konsultasi langsung di Kantor Kejaksaan Negeri Kota Baru
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <RadioGroupItem value="zoom" id="zoom" className="mt-1" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Video className="w-5 h-5 text-blue-600" />
                    <Label htmlFor="zoom" className="cursor-pointer">
                      Online via Zoom
                    </Label>
                  </div>
                  <p className="text-sm text-gray-500">
                    Konsultasi melalui video conference Zoom
                  </p>
                </div>
              </div>
            </div>
          </RadioGroup>

          {consultationType === "offline" && (
            <Alert className="mt-4 bg-green-50 border-green-200">
              <MapPin className="w-5 h-5 text-green-600" />
              <AlertDescription className="text-sm text-green-900 ml-2">
                <strong>Lokasi:</strong> Kejaksaan Negeri Kota Baru<br />
                Jl. Merdeka No. 123, Kota Baru, Kalimantan Selatan
              </AlertDescription>
            </Alert>
          )}
        </Card>

        {/* Category */}
        <Card className="p-5">
          <h3 className="text-[#09142b] mb-4">Kategori Permasalahan</h3>
          
          <div className="grid grid-cols-2 gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`p-3 border rounded-lg text-sm transition-colors ${
                  category === cat
                    ? 'bg-[#09142b] text-white border-[#09142b]'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-[#09142b]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </Card>

        {/* Date Selection */}
        <Card className="p-5">
          <h3 className="text-[#09142b] mb-4 flex items-center gap-2">
            <CalendarIcon className="w-5 h-5" />
            Pilih Tanggal
          </h3>
          
          <div className="flex justify-center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-lg border"
              disabled={(date) => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return date < today || date.getDay() === 0 || date.getDay() === 6;
              }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Konsultasi tersedia Senin - Jumat
          </p>
        </Card>

        {/* Time Selection */}
        <Card className="p-5">
          <h3 className="text-[#09142b] mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Pilih Waktu
          </h3>
          
          <Select value={time} onValueChange={setTime}>
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Pilih slot waktu" />
            </SelectTrigger>
            <SelectContent>
              {timeSlots.map((slot) => (
                <SelectItem key={slot} value={slot}>
                  {slot} WIB
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Card>

        {/* Notes */}
        <Card className="p-5">
          <h3 className="text-[#09142b] mb-4">
            Deskripsi Permasalahan
          </h3>
          
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Jelaskan singkat permasalahan yang ingin dikonsultasikan..."
            rows={4}
            required
          />
          <p className="text-xs text-gray-500 mt-2">
            Informasi ini akan membantu Jaksa mempersiapkan sesi konsultasi dengan lebih baik.
          </p>
        </Card>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={loading || !consultationType || !category || !time || !notes}
          className="w-full bg-[#09142b] hover:bg-[#09142b]/90 h-14 text-base"
        >
          {loading ? "Memproses..." : "Ajukan Permohonan Konsultasi"}
        </Button>

        <Alert className="bg-amber-50 border-amber-200">
          <AlertDescription className="text-sm text-amber-900">
            ⚠️ Permohonan konsultasi Anda akan direview oleh pihak Kejaksaan. Anda akan menerima notifikasi jika permohonan disetujui atau ditolak.
          </AlertDescription>
        </Alert>
      </form>
    </div>
  );
}
