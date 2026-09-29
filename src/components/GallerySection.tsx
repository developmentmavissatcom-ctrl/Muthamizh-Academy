import React, { useState, useRef, useEffect } from 'react';
import { 
  GALLERY_ITEMS, 
  GalleryCategory, 
  GalleryItem
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
  Search,
  Film,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Gauge,
  Calendar,
  ArrowRight
} from 'lucide-react';

interface GallerySectionProps {
  onOpenApplyModal?: () => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ onOpenApplyModal }) => {
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>('all');
  const [activeModalItem, setActiveModalItem] = useState<GalleryItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [mediaFilter, setMediaFilter] = useState<'all' | 'images' | 'videos'>('all');
  const [visibleCount, setVisibleCount] = useState(18);

  // Video playback controls inside modal
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isSlowMo, setIsSlowMo] = useState(false);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setVisibleCount(18);
  }, [selectedCategory, mediaFilter, searchQuery]);

  useEffect(() => {
    if (activeModalItem?.videoSrc && modalVideoRef.current) {
      modalVideoRef.current.playbackRate = isSlowMo ? 0.5 : 1.0;
      modalVideoRef.current.play().catch(() => undefined);
    }
  }, [activeModalItem, isSlowMo]);

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
    { id: 'equipment', label: 'Cinema Gear & Campus', icon: <Film className="w-3.5 h-3.5" /> },
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
          Take a look inside our 10,000+ sq.ft broadcast soundstages, 4K teleprompter newsrooms, Avid NLE edit suites, enterprise satellite MCR server rooms, and campus facilities.
        </p>
      </div>

      {/* If Gallery is Empty: Clean, Prestigious Empty State */}
      {GALLERY_ITEMS.length === 0 ? (
        <div className="max-w-2xl mx-auto my-8 p-8 sm:p-12 rounded-3xl bg-[#0b100e]/95 border border-[#16241f] text-center space-y-6 shadow-2xl backdrop-blur-xl">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-[#121a17] border border-[#00c878]/30 flex items-center justify-center text-[#00c878] shadow-inner">
            <Film className="w-8 h-8 text-[#00c878]" />
          </div>

          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#f5f7f6] font-sans">
              Gallery Media Updating
            </h3>
            <p className="text-xs sm:text-sm text-[#8a9690] leading-relaxed max-w-lg mx-auto">
              New official high-definition video reels, studio floor walkthroughs, and photography for the 2026 academic batch are currently being cataloged and will be published here shortly.
            </p>
          </div>

          {/* Studio Campus Facts */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-left">
            <div className="p-3 rounded-2xl bg-[#050706] border border-[#16241f]">
              <div className="text-[#00c878] font-mono font-bold text-xs uppercase">Studio Floor</div>
              <div className="text-sm font-bold text-[#f5f7f6] mt-0.5">10,000+ Sq.Ft</div>
              <div className="text-[11px] text-[#8a9690]">Acoustic soundstages</div>
            </div>

            <div className="p-3 rounded-2xl bg-[#050706] border border-[#16241f]">
              <div className="text-[#e6ad54] font-mono font-bold text-xs uppercase">Location</div>
              <div className="text-sm font-bold text-[#f5f7f6] mt-0.5">Chennai Campus</div>
              <div className="text-[11px] text-[#8a9690]">Kalaimagal Nagar</div>
            </div>

            <div className="p-3 rounded-2xl bg-[#050706] border border-[#16241f]">
              <div className="text-[#38bdf8] font-mono font-bold text-xs uppercase">Partner Network</div>
              <div className="text-sm font-bold text-[#f5f7f6] mt-0.5">Jaya TV</div>
              <div className="text-[11px] text-[#8a9690]">Mavis Satcom Limited</div>
            </div>
          </div>

          {/* Interactive CTA to Visit Campus in Person */}
          <div className="pt-4 border-t border-[#16241f] flex flex-col sm:flex-row items-center justify-center gap-3">
            {onOpenApplyModal && (
              <button
                onClick={onOpenApplyModal}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#00c878] to-[#008c54] hover:from-[#00c878] hover:to-[#00c878] text-[#050706] font-mono font-bold text-xs shadow-lg transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-[#050706]" />
                <span>Schedule an In-Person Studio Tour</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#050706]" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* If items exist, render normal filters and gallery grid */
        <>
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

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.slice(0, visibleCount).map((item) => {
              const isVideo = item.mediaType === 'video' || Boolean(item.videoSrc);

              return (
                <div
                  key={item.id}
                  onClick={() => setActiveModalItem(item)}
                  className="group relative rounded-2xl overflow-hidden bg-[#0b100e] border border-[#16241f] hover:border-[#00c878]/60 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-[#00c878]/10 cursor-pointer flex flex-col"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-black">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter brightness-95"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="px-2.5 py-1 rounded-lg bg-[#050706]/80 backdrop-blur-md border border-[#16241f] text-[10px] font-mono text-[#00c878] font-bold">
                        {item.categoryLabel}
                      </span>
                    </div>

                    {isVideo && (
                      <div className="absolute top-3 right-3 p-1.5 rounded-lg bg-red-600/90 text-white shadow-md">
                        <Play className="w-3.5 h-3.5 fill-current" />
                      </div>
                    )}

                    <div className="absolute bottom-3 right-3 p-2 rounded-xl bg-black/60 backdrop-blur-md text-[#8a9690] group-hover:text-white group-hover:bg-[#00c878] group-hover:text-[#050706] transition-all">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h3 className="text-base font-bold text-[#f5f7f6] group-hover:text-[#00c878] transition-colors line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#8a9690] mt-1 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {item.location && (
                      <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#e6ad54]">
                        <MapPin className="w-3 h-3 shrink-0" />
                        <span className="truncate">{item.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Load More Button */}
          {visibleCount < filteredItems.length && (
            <div className="mt-12 text-center">
              <button
                onClick={() => setVisibleCount((prev) => prev + 12)}
                className="px-6 py-3 rounded-xl bg-[#121a17] hover:bg-[#16241f] border border-[#00c878]/40 hover:border-[#00c878] text-[#00c878] font-mono text-xs font-bold transition-all shadow-md"
              >
                Load More Facilities (+12)
              </button>
            </div>
          )}
        </>
      )}

      {/* Lightbox / Video Modal */}
      {activeModalItem && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200"
          onClick={() => setActiveModalItem(null)}
        >
          <div 
            className="relative w-full max-w-5xl bg-[#0b100e] border border-[#16241f] rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 flex items-center justify-between border-b border-[#16241f] bg-[#070b09]">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#00c878]/15 text-[#00c878] font-bold border border-[#00c878]/30">
                    {activeModalItem.categoryLabel}
                  </span>
                  {(activeModalItem.mediaType === 'video' || activeModalItem.videoSrc) && (
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-red-500/20 text-red-400 font-bold border border-red-500/40">
                      VIDEO CLIP
                    </span>
                  )}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#f5f7f6]">
                  {activeModalItem.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                {activeModalItem.videoSrc && (
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
              {activeModalItem.videoSrc ? (
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
              </div>
              <p className="text-xs sm:text-sm text-[#8a9690] leading-relaxed">
                {activeModalItem.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
