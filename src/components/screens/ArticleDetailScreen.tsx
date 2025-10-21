import { useState } from "react";
import { ArrowLeft, Bookmark, Share2, Clock, Calendar, ChevronRight } from "lucide-react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface ArticleDetailScreenProps {
  articleId: number;
  onBack: () => void;
}

export function ArticleDetailScreen({ articleId, onBack }: ArticleDetailScreenProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  
  // Mock data - in real app, fetch based on articleId
  const article = {
    id: articleId,
    title: "Memahami Hak Waris dalam Hukum Islam",
    category: "Hukum Perdata",
    author: "Tim Edukasi Kejaksaan Negeri Kota Baru",
    publishDate: "18 Oktober 2025",
    readTime: "5 menit",
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXclMjBib29rcyUyMGVkdWNhdGlvbnxlbnwxfHx8fDE3NjA4NTA4OTN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    content: [
      {
        type: "paragraph",
        text: "Pembagian harta warisan menurut hukum Islam memiliki aturan yang jelas dan adil untuk semua ahli waris. Dalam artikel ini, kita akan membahas secara lengkap tentang hak-hak waris dalam perspektif hukum Islam yang berlaku di Indonesia."
      },
      {
        type: "heading",
        text: "Dasar Hukum Waris Islam"
      },
      {
        type: "paragraph",
        text: "Hukum waris Islam di Indonesia diatur dalam Kompilasi Hukum Islam (KHI) yang ditetapkan melalui Instruksi Presiden Nomor 1 Tahun 1991. KHI menjadi pedoman utama bagi pengadilan agama dalam menyelesaikan perkara waris."
      },
      {
        type: "heading",
        text: "Siapa Saja Ahli Waris?"
      },
      {
        type: "paragraph",
        text: "Menurut hukum Islam, ahli waris terbagi menjadi beberapa kelompok:"
      },
      {
        type: "list",
        items: [
          "Ahli waris laki-laki: Anak laki-laki, ayah, kakek, saudara laki-laki, paman, dan suami",
          "Ahli waris perempuan: Anak perempuan, ibu, nenek, saudara perempuan, dan istri",
          "Kelompok Ashabul Furudh: Ahli waris yang mendapat bagian tertentu",
          "Kelompok Ashabah: Ahli waris yang mendapat sisa setelah pembagian Ashabul Furudh"
        ]
      },
      {
        type: "heading",
        text: "Pembagian Warisan"
      },
      {
        type: "paragraph",
        text: "Prinsip dasar pembagian waris dalam Islam adalah bagian laki-laki dua kali lipat dari bagian perempuan (2:1). Namun, pembagian ini bisa berbeda tergantung posisi dan hubungan ahli waris dengan pewaris."
      },
      {
        type: "paragraph",
        text: "Contoh pembagian untuk anak:"
      },
      {
        type: "list",
        items: [
          "Jika pewaris meninggalkan anak laki-laki dan perempuan, bagiannya 2:1",
          "Jika hanya ada anak perempuan satu orang, mendapat 1/2",
          "Jika anak perempuan dua orang atau lebih, mendapat 2/3 dibagi rata",
          "Jika hanya ada anak laki-laki, mendapat seluruh harta (setelah dikurangi hak istri/suami)"
        ]
      },
      {
        type: "heading",
        text: "Hak-Hak yang Harus Dipenuhi Terlebih Dahulu"
      },
      {
        type: "paragraph",
        text: "Sebelum harta warisan dibagikan kepada ahli waris, ada beberapa kewajiban yang harus dipenuhi terlebih dahulu:"
      },
      {
        type: "list",
        items: [
          "Biaya pengurusan jenazah (pemandian, pengkafanan, penguburan)",
          "Pembayaran utang-utang pewaris",
          "Pelaksanaan wasiat pewaris (maksimal 1/3 dari harta)",
          "Sisanya baru dibagikan kepada ahli waris"
        ]
      },
      {
        type: "heading",
        text: "Hal-Hal yang Menghalangi Waris"
      },
      {
        type: "paragraph",
        text: "Ada beberapa kondisi yang menyebabkan seseorang tidak berhak menerima warisan:"
      },
      {
        type: "list",
        items: [
          "Membunuh pewaris dengan sengaja",
          "Berbeda agama dengan pewaris",
          "Status budak (sudah tidak relevan di Indonesia modern)"
        ]
      },
      {
        type: "heading",
        text: "Penyelesaian Sengketa Waris"
      },
      {
        type: "paragraph",
        text: "Jika terjadi sengketa dalam pembagian waris, ada beberapa jalur yang bisa ditempuh:"
      },
      {
        type: "list",
        items: [
          "Musyawarah keluarga dengan melibatkan tokoh agama atau adat",
          "Mediasi di Pengadilan Agama",
          "Gugatan perdata di Pengadilan Agama",
          "Konsultasi hukum di Kejaksaan atau lembaga bantuan hukum"
        ]
      },
      {
        type: "heading",
        text: "Kesimpulan"
      },
      {
        type: "paragraph",
        text: "Hukum waris Islam memberikan kepastian dan keadilan bagi seluruh ahli waris. Penting untuk memahami hak dan kewajiban masing-masing agar tidak terjadi konflik keluarga. Jika Anda menghadapi masalah waris, jangan ragu untuk berkonsultasi dengan ahli hukum atau menggunakan layanan bantuan hukum gratis dari Kejaksaan."
      }
    ],
    tags: ["Waris", "Hukum Islam", "Keluarga", "Pembagian Harta"],
    relatedArticles: [
      {
        id: 2,
        title: "Langkah-Langkah Mediasi dalam Sengketa Tanah",
        category: "Hukum Perdata",
        image: "https://images.unsplash.com/photo-1758518731462-d091b0b4ed0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWdhbCUyMGNvbnN1bHRhdGlvbiUyMG1lZXRpbmd8ZW58MXx8fHwxNzYwODA3MTc1fDA&ixlib=rb-4.1.0&q=80&w=400",
        readTime: "7 menit"
      },
      {
        id: 3,
        title: "Membuat Surat Wasiat yang Sah",
        category: "Hukum Perdata",
        image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXclMjBib29rcyUyMGVkdWNhdGlvbnxlbnwxfHx8fDE3NjA4NTA4OTN8MA&ixlib=rb-4.1.0&q=80&w=400",
        readTime: "6 menit"
      }
    ]
  };

  return (
    <div className="size-full bg-white flex flex-col overflow-y-auto">
      {/* Header Image */}
      <div className="relative">
        <button 
          onClick={onBack}
          className="absolute top-4 left-4 z-10 p-2 bg-black/50 backdrop-blur-sm text-white rounded-lg hover:bg-black/70"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="h-64 w-full">
          <ImageWithFallback
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        {/* Meta Info */}
        <div className="mb-4">
          <Badge variant="outline" className="mb-3">
            {article.category}
          </Badge>
          <h1 className="font-['The_Seasons'] text-2xl text-[#09142b] mb-3 leading-tight">
            {article.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {article.publishDate}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {article.readTime}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mb-6">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => setIsBookmarked(!isBookmarked)}
          >
            <Bookmark className={`w-4 h-4 mr-2 ${isBookmarked ? 'fill-current' : ''}`} />
            {isBookmarked ? 'Tersimpan' : 'Simpan'}
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <Share2 className="w-4 h-4 mr-2" />
            Bagikan
          </Button>
        </div>

        <Separator className="mb-6" />

        {/* Article Content */}
        <div className="prose prose-sm max-w-none mb-8">
          {article.content.map((block, idx) => {
            if (block.type === "heading") {
              return (
                <h2 key={idx} className="font-['The_Seasons'] text-xl text-[#09142b] mt-6 mb-3">
                  {block.text}
                </h2>
              );
            }
            
            if (block.type === "paragraph") {
              return (
                <p key={idx} className="text-gray-700 leading-relaxed mb-4">
                  {block.text}
                </p>
              );
            }
            
            if (block.type === "list" && block.items) {
              return (
                <ul key={idx} className="list-disc pl-5 mb-4 space-y-2">
                  {block.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="text-gray-700 leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              );
            }
            
            return null;
          })}
        </div>

        {/* Tags */}
        <div className="mb-8">
          <p className="text-sm text-gray-500 mb-2">Tags:</p>
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag, idx) => (
              <Badge key={idx} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <Separator className="mb-6" />

        {/* Related Articles */}
        <div className="mb-6">
          <h3 className="font-['The_Seasons'] text-xl text-[#09142b] mb-4">
            Artikel Terkait
          </h3>
          <div className="space-y-3">
            {article.relatedArticles.map((related) => (
              <Card key={related.id} className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex gap-3">
                  <div className="w-24 h-24 flex-shrink-0">
                    <ImageWithFallback
                      src={related.image}
                      alt={related.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-3 pr-2">
                    <Badge variant="outline" className="text-xs mb-2">
                      {related.category}
                    </Badge>
                    <h4 className="text-sm text-[#09142b] mb-2 line-clamp-2 leading-snug">
                      {related.title}
                    </h4>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {related.readTime}
                    </p>
                  </div>
                  <div className="flex items-center pr-3">
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <Card className="p-5 bg-gradient-to-r from-[#09142b] to-[#1a2847] text-white">
          <h3 className="font-['The_Seasons'] text-lg mb-2">
            Butuh Konsultasi Hukum?
          </h3>
          <p className="text-white/80 text-sm mb-4">
            Dapatkan bantuan hukum gratis dari Kejaksaan Negeri Kota Baru
          </p>
          <Button className="w-full bg-white text-[#09142b] hover:bg-white/90">
            Ajukan Konsultasi
          </Button>
        </Card>
      </div>
    </div>
  );
}
