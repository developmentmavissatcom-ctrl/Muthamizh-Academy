import React, { useState, useRef, useEffect } from 'react';
import { 
  GALLERY_ITEMS, 
  GalleryCategory, 
  GalleryItem,
  DRIVE_FOLDER_URL
} from '../data/galleryData';
import { 
  Camera, 
  Tv, 
  Sliders, 
  Server, 
  GraduationCap, 
  Layers, 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  MapPin, 
  Info,
  Sparkles,
  FolderPlus,
  Search,
  Film,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Gauge,
  HelpCircle,
  CheckCircle2,
  Copy,
  ExternalLink
} from 'lucide-react';

interface GallerySectionProps {
  onOpenApplyModal?: () => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ onOpenApplyModal }) => {
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>('all');
  const [activeModalItem, setActiveModalItem] = useState<GalleryItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [mediaFilter, setMediaFilter] = useState<'all' | 'images' | 'videos'>('all');
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const [visibleCount, setVisibleCount] = useState(18);
  const [useDriveEmbed, setUseDriveEmbed] = useState(false);

  // Video playback controls inside modal
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isSlowMo, setIsSlowMo] = useState(true);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setVisibleCount(18);
  }, [selectedCategory, mediaFilter, searchQuery]);

  useEffect(() => {
    setUseDriveEmbed(false);
  }, [activeModalItem]);

  useEffect(() => {
    if (activeModalItem?.videoSrc && modalVideoRef.current && !useDriveEmbed) {
      modalVideoRef.current.playbackRate = isSlowMo ? 0.5 : 1.0;
      modalVideoRef.current.play().catch(() => undefined);
    }
  }, [activeModalItem, isSlowMo, useDriveEmbed]);

  const toggleModalVideoPlay = () => {
    const video = modalVideoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play().catch(() => undefined);
      setIsPlaying(true);
    }
  };

  const toggleModalVideoMute = () => {
    const video = modalVideoRef.current;
    if (!video) return;
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleSlowMo = () => {
    const video = modalVideoRef.current;
    const nextSlowMo = !isSlowMo;
    setIsSlowMo(nextSlowMo);
    if (video) {
      video.playbackRate = nextSlowMo ? 0.5 : 1.0;
    }
  };

  const categories: { id: GalleryCategory; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'All Facilities', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'studios', label: 'Studios & Soundstages', icon: <Tv className="w-3.5 h-3.5" /> },
    { id: 'newsrooms', label: 'Newsrooms & PCR', icon: <Camera className="w-3.5 h-3.5" /> },
    { id: 'edit_suites', label: 'Edit & Grading Suites', icon: <Sliders className="w-3.5 h-3.5" /> },
    { id: 'server_rooms', label: 'Server Rooms & MCR', icon: <Server className="w-3.5 h-3.5" /> },
    { id: 'classrooms', label: 'Classrooms & Labs', icon: <GraduationCap className="w-3.5 h-3.5" /> },
    { id: 'equipment', label: 'Cinema Gear & Campus', icon: <Sparkles className="w-3.5 h-3.5" /> },
  ];

  // Filtering Logic
  const filteredItems = GALLERY_ITEMS.filter((item) => {
    // 1. Category Filter
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;

    // 2. Media Type Filter
    const isVideo = item.mediaType === 'video' || Boolean(item.videoSrc);
    const matchesMedia = 
      mediaFilter === 'all' ||
      (mediaFilter === 'videos' && isVideo) ||
      (mediaFilter === 'images' && !isVideo);

    // 3. Search Query Filter
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || (
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.categoryLabel.toLowerCase().includes(q) ||
      (item.location && item.location.toLowerCase().includes(q)) ||
      (item.specs && item.specs.some(s => s.toLowerCase().includes(q)))
    );

    return matchesCategory && matchesMedia && matchesSearch;
  });

  const handleNext = () => {
    if (!activeModalItem) return;
    const currentIndex = filteredItems.findIndex(i => i.id === activeModalItem.id);
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setActiveModalItem(filteredItems[nextIndex]);
  };

  const handlePrev = () => {
    if (!activeModalItem) return;
    const currentIndex = filteredItems.findIndex(i => i.id === activeModalItem.id);
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setActiveModalItem(filteredItems[prevIndex]);
  };

  const copyCodeSample = () => {
    const code = `{\n  id: 'my-custom-photo',\n  title: 'Studio Floor 2',\n  category: 'studios',\n  categoryLabel: 'Television Studio',\n  image: '/gallery/studios/floor2.jpg',\n  description: '10,000 sq.ft live production stage.',\n  specs: ['10,000 Sq.Ft', 'DMX Lighting', 'Chroma Green'],\n  location: 'Floor 1 — Main Floor'\n}`;
    navigator.clipboard.writeText(code);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 xl:px-12 w-full max-w-[1440px] mx-auto text-[#f5f7f6]">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto mb-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00c878]/15 border border-[#00c878]/30 text-[#00c878] text-xs font-mono font-bold tracking-wider uppercase">
          <Camera className="w-3.5 h-3.5 animate-pulse" />
          <span>Campus & Studio Infrastructure</span>
        </div>
        
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-sans">
          Academy & Studio Floor{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00c878] via-[#e6ad54] to-[#f5f7f6]">
            Gallery
          </span>
        </h2>
        
        <p className="text-[#8a9690] text-sm sm:text-base leading-relaxed">
          Explore our 10,000+ sq.ft broadcast soundstages, 4K teleprompter newsrooms, Avid NLE edit suites, enterprise satellite MCR server rooms, and smart media lecture theatres.
        </p>

      </div>

      {/* Quick Search and Media Filters Bar */}
      <div className="bg-[#0b100e] border border-[#16241f] rounded-2xl p-3 sm:p-4 mb-8 max-w-4xl mx-auto shadow-xl flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#8a9690] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search facility (e.g. newsroom, Avid, chroma)..."
            className="w-full pl-10 pr-8 py-2 rounded-xl bg-[#050706] border border-[#16241f] text-xs text-[#f5f7f6] placeholder-[#536159] focus:outline-none focus:border-[#00c878] font-mono transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8a9690] hover:text-white"
            >
              ✕
            </button>
          )}
        </div>

        {/* Media Type Filter (All / Photos / Videos) */}
        <div className="flex items-center gap-1.5 bg-[#050706] p-1 rounded-xl border border-[#16241f] self-stretch sm:self-auto justify-center">
          <button
            onClick={() => setMediaFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
              mediaFilter === 'all'
                ? 'bg-[#121a17] text-[#00c878] border border-[#00c878]/50 shadow-sm'
                : 'text-[#8a9690] hover:text-[#f5f7f6]'
            }`}
          >
            All Media
          </button>

          <button
            onClick={() => setMediaFilter('images')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-1.5 ${
              mediaFilter === 'images'
                ? 'bg-[#121a17] text-[#00c878] border border-[#00c878]/50 shadow-sm'
                : 'text-[#8a9690] hover:text-[#f5f7f6]'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Photos</span>
          </button>

          <button
            onClick={() => setMediaFilter('videos')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-1.5 ${
              mediaFilter === 'videos'
                ? 'bg-[#121a17] text-[#00c878] border border-[#00c878]/50 shadow-sm'
                : 'text-[#8a9690] hover:text-[#f5f7f6]'
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            <span>Video Reels</span>
          </button>
        </div>

        {/* Results Counter */}
        <div className="text-xs font-mono text-[#8a9690]">
          Showing <span className="text-[#00c878] font-bold">{filteredItems.length}</span> items
        </div>
      </div>

      {/* Category Navigation Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          const count = cat.id === 'all' 
            ? GALLERY_ITEMS.length 
            : GALLERY_ITEMS.filter(i => i.category === cat.id).length;

          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 border ${
                isActive
                  ? 'bg-[#00c878] text-[#050706] border-[#00c878] shadow-[0_4px_16px_rgba(0,200,120,0.3)] scale-[1.02]'
                  : 'bg-[#0b100e]/80 text-[#8a9690] border-[#16241f] hover:text-[#f5f7f6] hover:border-[#00c878]/40 hover:bg-[#121a17]'
              }`}
            >
              {cat.icon}
              <span>{cat.label}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                isActive ? 'bg-[#050706] text-[#00c878]' : 'bg-[#16241f] text-[#8a9690]'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* No Results Fallback */}
      {filteredItems.length === 0 && (
        <div className="p-12 text-center bg-[#0b100e] border border-[#16241f] rounded-2xl max-w-xl mx-auto space-y-3">
          <Info className="w-8 h-8 text-[#e6ad54] mx-auto" />
          <h4 className="text-base font-bold text-[#f5f7f6]">No facilities match your search</h4>
          <p className="text-xs text-[#8a9690]">
            Try clearing the search input or choosing &quot;All Facilities&quot; to view all photos and videos.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setMediaFilter('all');
            }}
            className="px-4 py-2 rounded-xl bg-[#121a17] text-[#00c878] border border-[#00c878]/40 text-xs font-mono font-bold"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredItems.slice(0, visibleCount).map((item) => {
          const isVideo = item.mediaType === 'video' || Boolean(item.videoSrc);

          return (
            <div
              key={item.id}
              onClick={() => {
                setActiveModalItem(item);
                setIsSlowMo(true);
                setIsPlaying(true);
              }}
              className="group relative bg-[#0b100e] border border-[#16241f] hover:border-[#00c878]/60 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_12px_30px_rgba(0,0,0,0.6)] cursor-pointer flex flex-col"
            >
              {/* Image / Video Poster Container */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#050706]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                
                {/* Category Pill Over Image */}
                <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5">
                  <span className="px-2.5 py-1 rounded-full bg-[#050706]/85 backdrop-blur-md border border-[#16241f] text-[11px] font-mono text-[#00c878] font-bold">
                    {item.categoryLabel}
                  </span>

                  {/* Video Badge */}
                  {isVideo && (
                    <span className="px-2 py-0.5 rounded-full bg-red-600/90 text-white text-[10px] font-mono font-bold flex items-center gap-1 shadow-md">
                      <Play className="w-2.5 h-2.5 fill-current" />
                      <span>VIDEO</span>
                    </span>
                  )}
                </div>

                {/* Hover Expand Icon or Play overlay for videos */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  {isVideo ? (
                    <div className="w-12 h-12 rounded-full bg-[#00c878] text-[#050706] flex items-center justify-center shadow-2xl scale-95 group-hover:scale-100 transition-transform">
                      <Play className="w-6 h-6 fill-current ml-0.5" />
                    </div>
                  ) : (
                    <div className="p-2.5 rounded-xl bg-[#050706]/90 border border-[#00c878]/40 text-[#00c878]">
                      <Maximize2 className="w-5 h-5" />
                    </div>
                  )}
                </div>

                {/* Gradient Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b100e] via-transparent to-transparent opacity-80" />
              </div>

              {/* Info Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  {item.location && (
                    <div className="flex items-center gap-1.5 text-[11px] text-[#e6ad54] font-mono mb-1">
                      <MapPin className="w-3 h-3 shrink-0 text-[#e6ad54]" />
                      <span>{item.location}</span>
                    </div>
                  )}
                  
                  <h3 className="text-lg font-bold text-[#f5f7f6] group-hover:text-[#00c878] transition-colors leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#8a9690] leading-relaxed mt-1.5 line-clamp-2">
                    {item.description}
                  </p>
                </div>

                {/* Tech Specs Chips */}
                {item.specs && (
                  <div className="pt-2 border-t border-[#16241f] flex flex-wrap gap-1.5">
                    {item.specs.map((spec, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2 py-0.5 rounded bg-[#121a17] text-[10px] font-mono text-[#8a9690] border border-[#16241f]"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination / Load More Controls */}
      {filteredItems.length > visibleCount && (
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => setVisibleCount((prev) => prev + 18)}
            className="px-6 py-2.5 rounded-xl bg-[#121a17] hover:bg-[#16241f] text-[#00c878] border border-[#00c878]/40 hover:border-[#00c878] text-xs font-mono font-bold transition-all shadow-md flex items-center gap-2"
          >
            <span>Load More Facilities (+18 remaining: {filteredItems.length - visibleCount})</span>
          </button>
          <button
            onClick={() => setVisibleCount(filteredItems.length)}
            className="px-4 py-2.5 rounded-xl bg-[#0b100e] hover:bg-[#121a17] text-[#8a9690] hover:text-[#f5f7f6] border border-[#16241f] text-xs font-mono transition-all"
          >
            Show All ({filteredItems.length})
          </button>
        </div>
      )}

      {/* Bottom CTA Banner */}
      <div className="mt-16 p-8 rounded-2xl bg-[#0b100e] border border-[#16241f] flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#e6ad54]">
            <Info className="w-3.5 h-3.5" />
            <span>Campus Tours & Studio Visits Available</span>
          </div>
          <h4 className="text-xl font-bold text-[#f5f7f6]">
            Experience the Jaya TV Network Studio Floor in Person
          </h4>
          <p className="text-xs text-[#8a9690] max-w-xl">
            Book a counseling session or facility walk-through at our Ekkattuthangal, Chennai broadcast complex before finalizing admissions.
          </p>
        </div>

        {onOpenApplyModal && (
          <button
            onClick={onOpenApplyModal}
            className="shrink-0 px-6 py-3 rounded-xl bg-gradient-to-r from-[#00c878] to-[#006b45] hover:from-[#00c878] hover:to-[#00c878] text-[#050706] font-bold text-xs sm:text-sm font-mono flex items-center gap-2 shadow-lg transition-transform hover:scale-105"
          >
            <GraduationCap className="w-4 h-4" />
            <span>Schedule Campus Visit / Apply</span>
          </button>
        )}
      </div>

      {/* Lightbox / Modal for Full-Screen View */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 lg:p-10 animate-in fade-in duration-200">
          <div 
            className="relative w-full max-w-5xl bg-[#0b100e] border border-[#16241f] rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-[#16241f] flex items-center justify-between gap-4 bg-[#070b09]">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-[#00c878] uppercase tracking-wider font-bold">
                    {activeModalItem.categoryLabel}
                  </span>
                  {activeModalItem.videoSrc && (
                    <span className="px-2 py-0.5 rounded bg-red-600/20 text-red-400 border border-red-500/40 text-[10px] font-mono font-bold">
                      VIDEO CLIP
                    </span>
                  )}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#f5f7f6]">
                  {activeModalItem.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                {activeModalItem.videoSrc && activeModalItem.drivePreviewUrl && (
                  <button
                    onClick={() => setUseDriveEmbed(!useDriveEmbed)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold border transition-colors ${
                      useDriveEmbed
                        ? 'bg-[#00c878]/20 text-[#00c878] border-[#00c878]'
                        : 'bg-[#121a17] text-[#8a9690] border-[#16241f] hover:text-[#f5f7f6]'
                    }`}
                    title="Toggle Google Drive Embed Player"
                  >
                    <Tv className="w-3.5 h-3.5" />
                    <span>{useDriveEmbed ? 'Drive Player' : 'Stream Player'}</span>
                  </button>
                )}

                {activeModalItem.videoSrc && !useDriveEmbed && (
                  <button
                    onClick={toggleSlowMo}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold border transition-colors ${
                      isSlowMo
                        ? 'bg-[#00c878]/20 text-[#00c878] border-[#00c878]'
                        : 'bg-[#121a17] text-[#8a9690] border-[#16241f]'
                    }`}
                    title="Toggle Slow-Motion 0.5x"
                  >
                    <Gauge className="w-3.5 h-3.5" />
                    <span>{isSlowMo ? '0.5x Slow-Mo' : '1.0x Normal'}</span>
                  </button>
                )}

                <button
                  onClick={() => setActiveModalItem(null)}
                  className="p-2 rounded-xl bg-[#121a17] hover:bg-[#16241f] text-[#8a9690] hover:text-[#f5f7f6] border border-[#16241f] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Media Viewport */}
            <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden min-h-[300px] sm:min-h-[440px]">
              {useDriveEmbed && activeModalItem.drivePreviewUrl ? (
                <iframe
                  src={activeModalItem.drivePreviewUrl}
                  title={activeModalItem.title}
                  className="w-full h-full min-h-[60vh] max-h-[65vh] border-0"
                  allow="autoplay; encrypted-media; fullscreen"
                  allowFullScreen
                />
              ) : activeModalItem.videoSrc ? (
                <div className="relative w-full h-full max-h-[65vh] flex items-center justify-center">
                  <video
                    ref={modalVideoRef}
                    src={activeModalItem.videoSrc}
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    className="max-h-[65vh] w-auto max-w-full object-contain"
                  />

                  {/* Video Overlay Controls */}
                  <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-black/80 p-1.5 rounded-xl border border-white/10 z-20">
                    <button
                      onClick={toggleModalVideoPlay}
                      className="p-1.5 rounded-lg text-white hover:text-[#00c878]"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                    </button>
                    <button
                      onClick={toggleModalVideoMute}
                      className="p-1.5 rounded-lg text-white hover:text-[#00c878]"
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              ) : (
                <img
                  src={activeModalItem.image}
                  alt={activeModalItem.title}
                  className="max-h-[65vh] w-auto max-w-full object-contain"
                />
              )}

              {/* Prev / Next Arrows */}
              <button
                onClick={handlePrev}
                className="absolute left-4 p-2.5 rounded-full bg-[#050706]/80 hover:bg-[#00c878] hover:text-[#050706] text-[#f5f7f6] border border-[#16241f] transition-colors z-10"
                title="Previous Facility"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 p-2.5 rounded-full bg-[#050706]/80 hover:bg-[#00c878] hover:text-[#050706] text-[#f5f7f6] border border-[#16241f] transition-colors z-10"
                title="Next Facility"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Footer Description */}
            <div className="p-5 border-t border-[#16241f] bg-[#070b09] space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  {activeModalItem.location && (
                    <div className="flex items-center gap-1.5 text-xs text-[#e6ad54] font-mono">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{activeModalItem.location}</span>
                    </div>
                  )}
                  {activeModalItem.specs && (
                    <div className="flex flex-wrap gap-1.5">
                      {activeModalItem.specs.map((spec, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded bg-[#121a17] text-[10px] font-mono text-[#00c878] border border-[#00c878]/30"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Open in Google Drive button */}
                <a
                  href={activeModalItem.driveViewUrl || activeModalItem.driveFolderUrl || activeModalItem.drivePreviewUrl || DRIVE_FOLDER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#00c878]/15 hover:bg-[#00c878]/25 border border-[#00c878]/50 text-xs font-mono font-semibold text-[#00c878] transition-all shadow-sm"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open in Google Drive</span>
                </a>
              </div>
              <p className="text-xs sm:text-sm text-[#8a9690] leading-relaxed">
                {activeModalItem.description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Guide Modal: How to Categorize & Fetch Photos */}
      {showGuideModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div 
            className="relative w-full max-w-2xl bg-[#0b100e] border border-[#00c878]/40 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#16241f] pb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[#00c878]/20 text-[#00c878]">
                  <FolderPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#f5f7f6]">
                    How to Categorize Pictures & Videos
                  </h3>
                  <p className="text-xs text-[#8a9690]">
                    Simple 2-step process to fetch and organize media under specific tabs
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowGuideModal(false)}
                className="p-2 rounded-xl bg-[#121a17] text-[#8a9690] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Step 1: Folders Breakdown */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold text-[#e6ad54] uppercase tracking-wider flex items-center gap-2">
                <span>Step 1: Put files in the folder</span>
              </h4>
              <p className="text-xs text-[#8a9690]">
                Organize your images and videos inside the <code className="text-[#00c878]">/public/gallery/</code> directory:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2.5 rounded-xl bg-[#050706] border border-[#16241f]">
                  <div className="text-[#00c878] font-bold">/public/gallery/studios/</div>
                  <div className="text-[#8a9690] text-[11px]">Tab: Studios & Soundstages</div>
                </div>
                <div className="p-2.5 rounded-xl bg-[#050706] border border-[#16241f]">
                  <div className="text-[#00c878] font-bold">/public/gallery/newsrooms/</div>
                  <div className="text-[#8a9690] text-[11px]">Tab: Newsrooms & PCR</div>
                </div>
                <div className="p-2.5 rounded-xl bg-[#050706] border border-[#16241f]">
                  <div className="text-[#00c878] font-bold">/public/gallery/edit-suites/</div>
                  <div className="text-[#8a9690] text-[11px]">Tab: Edit & Grading Suites</div>
                </div>
                <div className="p-2.5 rounded-xl bg-[#050706] border border-[#16241f]">
                  <div className="text-[#00c878] font-bold">/public/gallery/server-rooms/</div>
                  <div className="text-[#8a9690] text-[11px]">Tab: Server Rooms & MCR</div>
                </div>
                <div className="p-2.5 rounded-xl bg-[#050706] border border-[#16241f]">
                  <div className="text-[#00c878] font-bold">/public/gallery/classrooms/</div>
                  <div className="text-[#8a9690] text-[11px]">Tab: Classrooms & Labs</div>
                </div>
                <div className="p-2.5 rounded-xl bg-[#050706] border border-[#16241f]">
                  <div className="text-[#00c878] font-bold">/public/gallery/equipment/</div>
                  <div className="text-[#8a9690] text-[11px]">Tab: Cinema Gear & Campus</div>
                </div>
              </div>
            </div>

            {/* Step 2: Register in galleryData.ts */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-mono font-bold text-[#e6ad54] uppercase tracking-wider">
                  Step 2: Add to <code className="text-[#00c878]">galleryData.ts</code>
                </h4>
                <button
                  onClick={copyCodeSample}
                  className="flex items-center gap-1.5 text-xs text-[#00c878] font-mono hover:underline"
                >
                  {copiedText ? <CheckCircle2 className="w-3.5 h-3.5 text-[#00c878]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedText ? 'Copied!' : 'Copy Snippet'}</span>
                </button>
              </div>

              <div className="p-3.5 rounded-xl bg-[#050706] border border-[#16241f] text-[11px] font-mono text-[#8a9690] overflow-x-auto">
                <pre className="text-[#f5f7f6]">
{`{
  id: 'studio-floor-custom',
  title: 'Chroma Soundstage Floor',
  category: 'studios', // Automatically appears in 'Studios' AND 'All Facilities'
  categoryLabel: 'Television Studio',
  image: '/gallery/studios/my-photo.jpg',
  description: '10,000 sq.ft stage with motorized lights.',
  specs: ['10,000 Sq.Ft', 'DMX Grid', 'Chroma Cyc'],
  location: 'Studio Complex Floor 1'
}`}
                </pre>
              </div>

              <div className="p-3 rounded-xl bg-[#121a17] border border-[#00c878]/30 text-xs text-[#8a9690] leading-relaxed">
                <span className="text-[#00c878] font-bold">Note on &quot;All Facilities&quot;: </span>
                Every picture or video with any category automatically shows up in the <strong className="text-white">&quot;All Facilities&quot;</strong> tab without doing any extra work!
              </div>
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setShowGuideModal(false)}
                className="px-5 py-2.5 rounded-xl bg-[#00c878] text-[#050706] font-bold text-xs font-mono"
              >
                Got it, close guide
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
