import { useState } from "react";
import { BookOpen, Search, Bookmark, ExternalLink, Filter, ChevronRight, Scale } from "lucide-react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { ArticleDetailScreen } from "./ArticleDetailScreen";

type View = "list" | "detail";

export function EducationScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentView, setCurrentView] = useState<View>("list");
  const [selectedArticleId, setSelectedArticleId] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [bookmarkedArticles, setBookmarkedArticles] = useState<number[]>([1, 2]);

  const articles = [
    {
      id: 1,
      title: "Memahami Hak Waris dalam Hukum Islam dan Perdata",
      category: "Hukum Perdata",
      excerpt: "Pembagian harta warisan menurut hukum Islam dan perdata memiliki aturan yang jelas dan adil untuk semua ahli waris. Pelajari perbedaan dan persamaannya.",
      image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXclMjBib29rcyUyMGVkdWNhdGlvbnxlbnwxfHx8fDE3NjEwNTQ0MTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      date: "18 Okt 2025",
      readTime: "5 menit",
      isFeatured: true
    },
    {
      id: 2,
      title: "Langkah-Langkah Mediasi dalam Sengketa Tanah",
      category: "Hukum Perdata",
      excerpt: "Mediasi adalah cara penyelesaian sengketa yang efektif dan damai. Berikut panduan lengkap prosedur mediasi untuk sengketa pertanahan.",
      image: "https://images.unsplash.com/photo-1758518731462-d091b0b4ed0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWdhbCUyMGNvbnN1bHRhdGlvbiUyMG1lZXRpbmd8ZW58MXx8fHwxNzYwOTQxMzk0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      date: "15 Okt 2025",
      readTime: "7 menit",
      isFeatured: false
    },
    {
      id: 3,
      title: "Hak dan Kewajiban dalam Perjanjian Kerja",
      category: "Hukum Perdata",
      excerpt: "Ketahui hak-hak Anda sebagai pekerja dan kewajiban yang harus dipenuhi dalam kontrak kerja sesuai UU Ketenagakerjaan.",
      image: "https://images.unsplash.com/flagged/photo-1551135049-83f3419ef05c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGNvbnRyYWN0JTIwc2lnbmluZ3xlbnwxfHx8fDE3NjEwNTIzOTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
      date: "12 Okt 2025",
      readTime: "6 menit",
      isFeatured: false
    },
    {
      id: 4,
      title: "Prosedur Pelaporan Tindak Pidana ke Kepolisian",
      category: "Hukum Pidana",
      excerpt: "Panduan lengkap tentang cara melaporkan tindak pidana ke pihak berwajib, dokumen yang diperlukan, dan hak-hak pelapor.",
      image: "https://images.unsplash.com/photo-1607447670038-46b137e95441?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3Zlcm5tZW50JTIwYnVpbGRpbmclMjBpbmRvbmVzaWF8ZW58MXx8fHwxNzYxMDE1MDE1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      date: "10 Okt 2025",
      readTime: "8 menit",
      isFeatured: false
    },
    {
      id: 5,
      title: "Gugatan Tata Usaha Negara: Syarat dan Prosedur",
      category: "Hukum TUN",
      excerpt: "Memahami prosedur mengajukan gugatan Tata Usaha Negara (TUN) terhadap keputusan pejabat/badan TUN yang merugikan.",
      image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXclMjBib29rcyUyMGVkdWNhdGlvbnxlbnwxfHx8fDE3NjEwNTQ0MTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      date: "8 Okt 2025",
      readTime: "10 menit",
      isFeatured: false
    },
    {
      id: 6,
      title: "Permohonan Izin Mendirikan Bangunan (IMB)",
      category: "Hukum TUN",
      excerpt: "Syarat, prosedur, dan dokumen yang diperlukan untuk mengurus Izin Mendirikan Bangunan di wilayah Kabupaten Kota Baru.",
      image: "https://images.unsplash.com/photo-1607447670038-46b137e95441?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3Zlcm5tZW50JTIwYnVpbGRpbmclMjBpbmRvbmVzaWF8ZW58MXx8fHwxNzYxMDE1MDE1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      date: "5 Okt 2025",
      readTime: "6 menit",
      isFeatured: false
    },
    {
      id: 7,
      title: "Sanksi Pidana Korupsi: Jenis dan Hukumannya",
      category: "Hukum Pidana",
      excerpt: "Mengenal jenis-jenis tindak pidana korupsi dan sanksi hukuman yang diatur dalam UU Tipikor beserta mekanisme penanganannya.",
      image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXclMjBib29rcyUyMGVkdWNhdGlvbnxlbnwxfHx8fDE3NjEwNTQ0MTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      date: "3 Okt 2025",
      readTime: "9 menit",
      isFeatured: false
    },
    {
      id: 8,
      title: "Perjanjian Jual Beli Tanah dan Persyaratannya",
      category: "Hukum Perdata",
      excerpt: "Panduan lengkap tentang perjanjian jual beli tanah, syarat sah jual beli, dan dokumen-dokumen yang harus disiapkan.",
      image: "https://images.unsplash.com/flagged/photo-1551135049-83f3419ef05c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGNvbnRyYWN0JTIwc2lnbmluZ3xlbnwxfHx8fDE3NjEwNTIzOTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
      date: "1 Okt 2025",
      readTime: "7 menit",
      isFeatured: false
    }
  ];

  const categories = [
    { name: "Semua", count: articles.length },
    { name: "Hukum Perdata", count: articles.filter(a => a.category === "Hukum Perdata").length },
    { name: "Hukum Pidana", count: articles.filter(a => a.category === "Hukum Pidana").length },
    { name: "Hukum TUN", count: articles.filter(a => a.category === "Hukum TUN").length }
  ];

  const handleOpenJDIH = () => {
    window.open("https://jdih.kotabaru.go.id", "_blank", "noopener,noreferrer");
  };

  const handleViewArticle = (id: number) => {
    setSelectedArticleId(id);
    setCurrentView("detail");
  };

  const toggleBookmark = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedArticles(prev => 
      prev.includes(id) 
        ? prev.filter(articleId => articleId !== id)
        : [...prev, id]
    );
  };

  const filteredArticles = articles.filter(article => {
    const matchesCategory = activeCategory === "Semua" || article.category === activeCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (currentView === "detail" && selectedArticleId) {
    return (
      <ArticleDetailScreen
        articleId={selectedArticleId}
        onBack={() => {
          setCurrentView("list");
          setSelectedArticleId(null);
        }}
      />
    );
  }

  return (
    <div className="size-full bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#09142b] to-[#1a2847] px-6 pt-12 pb-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 bg-white/10 rounded-xl">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-['The_Seasons'] text-2xl text-white">
              Edukasi Hukum
            </h1>
          </div>
        </div>
        <p className="text-white/70 text-sm">
          Pelajari hak-hak hukum Anda melalui artikel edukatif
        </p>
      </div>

      {/* Search Bar */}
      <div className="px-6 -mt-3 mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari artikel hukum..."
            className="pl-11 h-12 bg-white shadow-md"
          />
        </div>
      </div>

      {/* JDIH Link Card */}
      <div className="px-6 mb-4">
        <Card 
          onClick={handleOpenJDIH}
          className="p-4 bg-gradient-to-r from-[#6a462f] to-[#8a5d3f] cursor-pointer hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <Scale className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-white mb-1">JDIH Kota Baru</h3>
                <p className="text-white/80 text-sm">
                  Jaringan Dokumentasi & Informasi Hukum
                </p>
              </div>
            </div>
            <ExternalLink className="w-5 h-5 text-white flex-shrink-0" />
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex-1 overflow-y-auto">
        <Tabs defaultValue="all" className="px-6">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="all">Semua Artikel</TabsTrigger>
            <TabsTrigger value="saved">
              <Bookmark className="w-4 h-4 mr-1" />
              Tersimpan ({bookmarkedArticles.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4 pb-6">
            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-6 px-6">
              {categories.map((cat) => (
                <Button
                  key={cat.name}
                  variant={activeCategory === cat.name ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(cat.name)}
                  className={`whitespace-nowrap ${
                    activeCategory === cat.name 
                      ? 'bg-[#09142b] hover:bg-[#09142b]/90' 
                      : ''
                  }`}
                >
                  {cat.name}
                  <Badge 
                    variant="secondary" 
                    className={`ml-2 text-xs ${
                      activeCategory === cat.name 
                        ? 'bg-white/20 text-white border-0' 
                        : ''
                    }`}
                  >
                    {cat.count}
                  </Badge>
                </Button>
              ))}
            </div>

            {/* Featured Article */}
            {activeCategory === "Semua" && filteredArticles.find(a => a.isFeatured) && (
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-1 w-1 bg-[#6a462f] rounded-full" />
                  <p className="text-sm text-gray-600">Artikel Unggulan</p>
                </div>
                {filteredArticles
                  .filter(article => article.isFeatured)
                  .map((article) => (
                    <Card 
                      key={article.id}
                      onClick={() => handleViewArticle(article.id)}
                      className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                    >
                      <div className="h-48 w-full">
                        <ImageWithFallback
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline" className="text-xs">
                            {article.category}
                          </Badge>
                          <button 
                            onClick={(e) => toggleBookmark(article.id, e)}
                            className="p-1 hover:bg-gray-100 rounded"
                          >
                            <Bookmark 
                              className={`w-4 h-4 ${
                                bookmarkedArticles.includes(article.id) 
                                  ? 'fill-[#09142b] text-[#09142b]' 
                                  : 'text-gray-400'
                              }`} 
                            />
                          </button>
                        </div>
                        <h3 className="text-[#09142b] mb-2 leading-snug">
                          {article.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span>{article.date}</span>
                          <span>•</span>
                          <span>{article.readTime}</span>
                        </div>
                      </div>
                    </Card>
                  ))}
              </div>
            )}

            {/* Articles List */}
            <div className="space-y-4">
              {filteredArticles
                .filter(article => !article.isFeatured || activeCategory !== "Semua")
                .map((article) => (
                  <Card 
                    key={article.id} 
                    onClick={() => handleViewArticle(article.id)}
                    className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  >
                    <div className="flex gap-4">
                      <div className="w-32 h-32 flex-shrink-0">
                        <ImageWithFallback
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 p-4 pr-3">
                        <div className="flex items-start justify-between mb-2">
                          <Badge variant="outline" className="text-xs mb-2">
                            {article.category}
                          </Badge>
                          <button 
                            onClick={(e) => toggleBookmark(article.id, e)}
                            className="p-1 hover:bg-gray-100 rounded"
                          >
                            <Bookmark 
                              className={`w-4 h-4 ${
                                bookmarkedArticles.includes(article.id) 
                                  ? 'fill-[#09142b] text-[#09142b]' 
                                  : 'text-gray-400'
                              }`} 
                            />
                          </button>
                        </div>
                        <h3 className="text-[#09142b] mb-2 line-clamp-2 leading-snug">
                          {article.title}
                        </h3>
                        <p className="text-sm text-gray-500 line-clamp-2 mb-2">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span>{article.date}</span>
                          <span>•</span>
                          <span>{article.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
            </div>

            {filteredArticles.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">Tidak ada artikel ditemukan</p>
                <p className="text-sm text-gray-400 mt-1">Coba ubah filter atau kata kunci pencarian</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="saved" className="space-y-4 pb-6">
            {bookmarkedArticles.length === 0 ? (
              <div className="text-center py-12">
                <Bookmark className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">Belum ada artikel tersimpan</p>
                <p className="text-sm text-gray-400 mt-1">Tap ikon bookmark untuk menyimpan artikel</p>
              </div>
            ) : (
              <div className="space-y-4">
                {articles
                  .filter(a => bookmarkedArticles.includes(a.id))
                  .map((article) => (
                    <Card 
                      key={article.id} 
                      onClick={() => handleViewArticle(article.id)}
                      className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                    >
                      <div className="flex gap-4">
                        <div className="w-32 h-32 flex-shrink-0">
                          <ImageWithFallback
                            src={article.image}
                            alt={article.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 p-4 pr-3">
                          <div className="flex items-start justify-between mb-2">
                            <Badge variant="outline" className="text-xs mb-2">
                              {article.category}
                            </Badge>
                            <button 
                              onClick={(e) => toggleBookmark(article.id, e)}
                              className="p-1 hover:bg-gray-100 rounded"
                            >
                              <Bookmark 
                                className="w-4 h-4 fill-[#09142b] text-[#09142b]"
                              />
                            </button>
                          </div>
                          <h3 className="text-[#09142b] mb-2 line-clamp-2">
                            {article.title}
                          </h3>
                          <div className="flex items-center gap-3 text-xs text-gray-500">
                            <span>{article.date}</span>
                            <span>•</span>
                            <span>{article.readTime}</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
