import { useState } from "react";
import { ArrowLeft, Video, Users, Calendar as CalendarIcon, Clock, AlertCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Calendar } from "../ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Alert, AlertDescription } from "../ui/alert";
import { Textarea } from "../ui/textarea";

interface RescheduleConsultationScreenProps {
  consultationId: number;
  onBack: () => void;
}

export function RescheduleConsultationScreen({ consultationId, onBack }: RescheduleConsultationScreenProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  // Mock rejected consultation data
  const consultation = {
    id: consultationId,
    title: "Konsultasi Warisan Keluarga",
    type: "zoom",
    category: "Warisan",
    previousDate: "20 Oktober 2025",
    previousTime: "14:00 - 15:00 WIB",
    rejectionReason: "Mohon maaf, jadwal bentrok dengan agenda penting. Silakan pilih tanggal dan waktu lain."
  };

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
          Penjadwalan Ulang
        </h1>
        <p className="text-white/70 text-sm">
          Pilih jadwal baru untuk konsultasi Anda
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex-1 px-6 pt-6 pb-8 space-y-6">
        {/* Rejection Notice */}
        <Alert className="bg-red-50 border-red-200">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <AlertDescription className="text-sm text-red-900 ml-2">
            <p className="mb-1"><strong>Permohonan Sebelumnya Ditolak</strong></p>
            <p>{consultation.rejectionReason}</p>
          </AlertDescription>
        </Alert>

        {/* Previous Schedule Info */}
        <Card className="p-5">
          <h3 className="text-[#09142b] mb-4">Jadwal Sebelumnya</h3>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                {consultation.type === "zoom" ? (
                  <Video className="w-5 h-5 text-gray-600" />
                ) : (
                  <Users className="w-5 h-5 text-gray-600" />
                )}
              </div>
              <div className="flex-1">
                <h4 className="text-[#09142b] mb-1">{consultation.title}</h4>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="text-xs">
                    {consultation.category}
                  </Badge>
                  <Badge className="bg-blue-100 text-blue-700 border-blue-200 text-xs">
                    {consultation.type === "zoom" ? "Online (Zoom)" : "Tatap Muka"}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">
                  <CalendarIcon className="w-3 h-3 inline mr-1" />
                  {consultation.previousDate}, {consultation.previousTime}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* New Date Selection */}
        <Card className="p-5">
          <h3 className="text-[#09142b] mb-4 flex items-center gap-2">
            <CalendarIcon className="w-5 h-5" />
            Pilih Tanggal Baru
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

        {/* New Time Selection */}
        <Card className="p-5">
          <h3 className="text-[#09142b] mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Pilih Waktu Baru
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

        {/* Additional Notes */}
        <Card className="p-5">
          <h3 className="text-[#09142b] mb-4">
            Catatan Tambahan (Opsional)
          </h3>
          
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Tambahkan catatan jika ada perubahan informasi..."
            rows={3}
          />
        </Card>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={loading || !time}
          className="w-full bg-[#09142b] hover:bg-[#09142b]/90 h-14 text-base"
        >
          {loading ? "Memproses..." : "Ajukan Penjadwalan Ulang"}
        </Button>

        <Alert className="bg-blue-50 border-blue-200">
          <AlertDescription className="text-sm text-blue-900">
            💡 Permohonan penjadwalan ulang akan kembali direview oleh pihak Kejaksaan. Anda akan mendapat notifikasi hasilnya.
          </AlertDescription>
        </Alert>
      </form>
    </div>
  );
}
