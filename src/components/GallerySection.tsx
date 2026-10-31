import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
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
  ArrowRight,
  RefreshCw,
  FolderCheck,
  Sparkles
} from 'lucide-react';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';

interface GallerySectionProps {
  onOpenApplyModal?: () => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ onOpenApplyModal }) => {
  const [dynamicItems, setDynamicItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>('all');
  const [activeModalItem, setActiveModalItem] = useState<GalleryItem | null>(null);
  useBodyScrollLock(Boolean(activeModalItem));
  const [searchQuery, setSearchQuery] = useState('');
  const [mediaFilter, setMediaFilter] = useState<'all' | 'images' | 'videos'>('all');
  const [visibleCount, setVisibleCount] = useState(18);

  // Video playback controls inside modal
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isSlowMo, setIsSlowMo] = useState(false);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  // Automatically discover photos and videos pasted into "public/gallery assets/Photos" & "Videos"
  const fetchGalleryAssets = async () => {
    setIsSyncing(true);
    try {
      const res = await fetch('/api/gallery/assets', { cache: 'no-store' });
      const data = await res.json();
      if (data && Array.isArray(data.items)) {
        setDynamicItems(data.items);
      }
    } catch (err) {
      console.warn('Could not auto-fetch gallery assets:', err);
    } finally {
      setIsSyncing(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGalleryAssets();
  }, []);

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

  // Combine dynamically discovered assets from public/gallery assets with static data
  const allGalleryItems = [...dynamicItems, ...GALLERY_ITEMS];

  // Filtering Logic
  const filteredItems = allGalleryItems.filter((item) => {
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
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00c878]/15 border border-[#00c878]/30 text-[#00c878] text-xs font-mono font-bold tracking-wider uppercase">
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

        {/* Live Auto-Sync Status Bar */}
        <div className="pt-2 flex items-center justify-center gap-2 text-xs font-mono text-[#8a9690]">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#121a17] border border-[#16241f]">
            <FolderCheck className="w-3.5 h-3.5 text-[#00c878]" />
            <span>Folder Auto-Discovery:</span>
            <strong className="text-[#f5f7f6]">
              {dynamicItems.length} media file{dynamicItems.length === 1 ? '' : 's'}
            </strong>
          </span>
          <button
            type="button"
            onClick={fetchGalleryAssets}
            disabled={isSyncing}
            className="p-1.5 rounded-lg bg-[#121a17] hover:bg-[#16241f] text-[#00c878] border border-[#16241f] transition-all cursor-pointer flex items-center gap-1 hover:scale-105"
            title="Scan public/gallery assets now"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span className="text-[11px] font-bold">Refresh</span>
          </button>
        </div>
      </div>

      {/* If Gallery is Empty: Clean, Prestigious Dropzone / Empty State */}
      {allGalleryItems.length === 0 ? (
        <div className="max-w-2xl mx-auto my-8 p-8 sm:p-12 rounded-3xl bg-[#0b100e]/95 border border-[#16241f] text-center space-y-6 shadow-2xl backdrop-blur-xl">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-[#121a17] border border-[#00c878]/30 flex items-center justify-center text-[#00c878] shadow-inner">
            <Film className="w-8 h-8 text-[#00c878]" />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#00c878]/10 text-[#00c878] text-[11px] font-mono font-bold">
              <Sparkles className="w-3 h-3" />
              <span>Zero-Code Automatic Gallery</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#f5f7f6] font-sans">
              Dynamic Gallery Folders Active
            </h3>
            <p className="text-xs sm:text-sm text-[#8a9690] leading-relaxed max-w-lg mx-auto">
              Any photo or video you paste into the dedicated folders below will automatically appear in this gallery without any manual code editing:
            </p>
          </div>

          {/* Dedicated Folder Paths Box */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-left font-mono">
            <div className="p-4 rounded-2xl bg-[#050706] border border-[#16241f] space-y-1">
              <div className="text-[#00c878] font-bold text-xs uppercase flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5 text-[#00c878]" />
                <span>Photos Folder</span>
              </div>
              <div className="text-xs text-[#f5f7f6] break-all font-bold">
                public/gallery assets/Photos/
              </div>
              <div className="text-[10px] text-[#8a9690]">
                Drop .jpg, .jpeg, .png, .webp, .svg
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#050706] border border-[#16241f] space-y-1">
              <div className="text-red-400 font-bold text-xs uppercase flex items-center gap-1.5">
                <Film className="w-3.5 h-3.5 text-red-400" />
                <span>Videos Folder</span>
              </div>
              <div className="text-xs text-[#f5f7f6] break-all font-bold">
                public/gallery assets/Videos/
              </div>
              <div className="text-[10px] text-[#8a9690]">
                Drop .mp4, .webm, .mov, .m4v
              </div>
            </div>
          </div>

          {/* Interactive Scan Button */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={fetchGalleryAssets}
              disabled={isSyncing}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#00c878] hover:bg-[#00c878]/90 text-[#050706] font-mono font-bold text-xs shadow-lg transition-all hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 text-[#050706] ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Scanning Folders...' : 'Detect Pasted Media Now'}</span>
            </button>

            {onOpenApplyModal && (
              <button
                type="button"
                onClick={onOpenApplyModal}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#121a17] hover:bg-[#16241f] text-[#8a9690] hover:text-[#f5f7f6] border border-[#16241f] font-mono font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#e6ad54]" />
                <span>Book Campus Studio Tour</span>
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

          {/* Gallery Grid - Pure Visual Media Tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filteredItems.slice(0, visibleCount).map((item) => {
              const isVideo = item.mediaType === 'video' || Boolean(item.videoSrc);

              return (
                <div
                  key={item.id}
                  onClick={() => setActiveModalItem(item)}
                  className="group relative rounded-3xl overflow-hidden bg-[#070b09] border border-[#16241f] hover:border-[#00c878]/60 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-[#00c878]/15 cursor-pointer aspect-[16/10] sm:aspect-[16/10]"
                >
                  {isVideo && item.videoSrc ? (
                    <div className="relative w-full h-full bg-[#050706]">
                      <video
                        src={`${item.videoSrc}#t=0.1`}
                        preload="metadata"
                        muted
                        playsInline
                        className="w-full h-full object-cover filter brightness-95 group-hover:brightness-105 group-hover:scale-105 transition-all duration-500 pointer-events-none"
                      />
                      {/* Centered Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-14 h-14 rounded-2xl bg-black/65 backdrop-blur-md border border-white/20 text-[#00c878] flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.6)] group-hover:scale-110 group-hover:bg-[#00c878] group-hover:text-[#050706] transition-all duration-300">
                          <Play className="w-6 h-6 fill-current ml-0.5" />
                        </div>
                      </div>
                      {/* Subtle Top-Right Video Indicator */}
                      <div className="absolute top-3 right-3 px-2 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 text-white text-[10px] font-mono font-bold flex items-center gap-1 shadow-md">
                        <Film className="w-3 h-3 text-red-400" />
                        <span>VIDEO</span>
                      </div>
                    </div>
                  ) : (
                    <div className="relative w-full h-full bg-[#050706]">
                      <img
                        src={item.image}
                        alt=""
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          if (!target.src.includes('/camera_setup.png')) {
                            target.src = '/camera_setup.png';
                          }
                        }}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter brightness-95 group-hover:brightness-105"
                      />
                      {/* Subtle Hover Maximize Button */}
                      <div className="absolute bottom-3 right-3 p-2 rounded-xl bg-black/60 backdrop-blur-md text-[#8a9690] opacity-0 group-hover:opacity-100 group-hover:text-white group-hover:bg-[#00c878] group-hover:text-[#050706] transition-all shadow-md">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                    </div>
                  )}

                  {/* Gradient Vignette on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </div>
              );
            })}
          </div>

          {/* Load More Button */}
          {visibleCount < filteredItems.length && (
            <div className="mt-10 text-center">
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => prev + 12)}
                className="px-6 py-3 rounded-xl bg-[#121a17] hover:bg-[#16241f] border border-[#00c878]/40 hover:border-[#00c878] text-[#00c878] font-mono text-xs font-bold transition-all shadow-md cursor-pointer"
              >
                Load More Media (+12)
              </button>
            </div>
          )}
        </>
      )}

      {/* Pure Media Player / Lightbox Modal - Mounted with createPortal */}
      {activeModalItem && typeof document !== 'undefined' && createPortal(
        <div 
          className="fixed inset-0 z-[9999] bg-black/92 backdrop-blur-xl flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden animate-in fade-in duration-200"
          onClick={() => setActiveModalItem(null)}
        >
          <div 
            className="relative w-full max-w-5xl bg-[#070b09] border border-[#16241f] rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] my-auto animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Minimal Floating Controls Header */}
            <div className="p-3.5 sm:p-4 flex items-center justify-between border-b border-[#16241f]/70 bg-[#070b09]">
              <div className="flex items-center gap-2">
                {activeModalItem.mediaType === 'video' || activeModalItem.videoSrc ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-red-500/15 border border-red-500/30 text-red-400 font-mono text-[10px] font-bold uppercase">
                    <Film className="w-3 h-3" />
                    <span>Video Player</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#00c878]/15 border border-[#00c878]/30 text-[#00c878] font-mono text-[10px] font-bold uppercase">
                    <Camera className="w-3 h-3" />
                    <span>Photo View</span>
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {activeModalItem.videoSrc && (
                  <button
                    type="button"
                    onClick={toggleSlowMo}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold border transition-colors cursor-pointer ${
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
                  type="button"
                  onClick={() => setActiveModalItem(null)}
                  className="p-2 rounded-xl bg-[#121a17] hover:bg-[#16241f] text-[#8a9690] hover:text-[#f5f7f6] border border-[#16241f] transition-colors cursor-pointer"
                  title="Close Media Window"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Pure Media Viewport */}
            <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden min-h-[320px] sm:min-h-[480px]">
              {activeModalItem.videoSrc ? (
                <div className="relative w-full h-full max-h-[75vh] flex items-center justify-center">
                  <video
                    ref={modalVideoRef}
                    src={activeModalItem.videoSrc}
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    className="max-h-[75vh] w-auto max-w-full object-contain"
                  />

                  {/* Video Overlay Playback Controls */}
                  <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-black/80 backdrop-blur-md p-2 rounded-2xl border border-white/15 z-20 shadow-xl">
                    <button
                      type="button"
                      onClick={toggleModalVideoPlay}
                      className="p-2 rounded-xl bg-white/10 text-white hover:bg-[#00c878] hover:text-[#050706] transition-all cursor-pointer"
                      title={isPlaying ? 'Pause' : 'Play'}
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                    </button>
                    <button
                      type="button"
                      onClick={toggleModalVideoMute}
                      className="p-2 rounded-xl bg-white/10 text-white hover:bg-[#00c878] hover:text-[#050706] transition-all cursor-pointer"
                      title={isMuted ? 'Unmute' : 'Mute'}
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              ) : (
                <img
                  src={activeModalItem.image}
                  alt=""
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (!target.src.includes('/camera_setup.png')) {
                      target.src = '/camera_setup.png';
                    }
                  }}
                  className="max-h-[75vh] w-auto max-w-full object-contain"
                />
              )}

              {/* Prev / Next Arrows */}
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-4 p-2.5 rounded-full bg-[#050706]/80 hover:bg-[#00c878] hover:text-[#050706] text-[#f5f7f6] border border-[#16241f] transition-colors z-10 cursor-pointer shadow-lg"
                title="Previous Media"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-4 p-2.5 rounded-full bg-[#050706]/80 hover:bg-[#00c878] hover:text-[#050706] text-[#f5f7f6] border border-[#16241f] transition-colors z-10 cursor-pointer shadow-lg"
                title="Next Media"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};
