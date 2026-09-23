import { DRIVE_PCR_VIDEOS, DRIVE_NEWSROOM_IMAGES, DRIVE_FOLDER_URL } from './driveMediaData';

export type GalleryCategory = 
  | 'all'
  | 'studios'
  | 'newsrooms'
  | 'edit_suites'
  | 'server_rooms'
  | 'classrooms'
  | 'equipment';

export interface GalleryItem {
  id: string;
  title: string;
  category: 'studios' | 'newsrooms' | 'edit_suites' | 'server_rooms' | 'classrooms' | 'equipment';
  categoryLabel: string;
  image: string;
  description: string;
  specs?: string[];
  location?: string;
  mediaType?: 'image' | 'video';
  videoSrc?: string;
  fallbackVideoSrc?: string;
  thumbnailUrl?: string;
  drivePreviewUrl?: string;
  driveViewUrl?: string;
  driveFolderUrl?: string;
  driveId?: string;
}

export { DRIVE_FOLDER_URL };

// Map authentic Drive PCR Videos into Gallery Items
const DRIVE_GALLERY_VIDEOS: GalleryItem[] = DRIVE_PCR_VIDEOS.map((v) => ({
  id: v.id,
  title: v.title,
  category: 'newsrooms',
  categoryLabel: 'Newsroom & PCR Video',
  image: v.thumbnailUrl,
  thumbnailUrl: v.thumbnailUrl,
  description: v.description,
  specs: v.specs,
  location: v.location,
  mediaType: 'video',
  videoSrc: v.videoSrc,
  fallbackVideoSrc: v.fallbackVideoSrc,
  drivePreviewUrl: v.drivePreviewUrl,
  driveFolderUrl: v.driveFolderUrl,
  driveId: v.driveId
}));

// Map authentic Drive Newsroom Photos into Gallery Items
const DRIVE_GALLERY_PHOTOS: GalleryItem[] = DRIVE_NEWSROOM_IMAGES.map((img) => ({
  id: img.id,
  title: img.title,
  category: 'newsrooms',
  categoryLabel: 'Newsroom & PCR Photo',
  image: img.image,
  thumbnailUrl: img.thumbnailUrl,
  description: img.description,
  specs: img.specs,
  location: img.location,
  mediaType: 'image',
  driveViewUrl: img.driveViewUrl,
  driveFolderUrl: img.driveFolderUrl,
  driveId: img.driveId
}));

/**
 * Muthamizh Academy Facilities & Infrastructure Gallery
 * Populated with real broadcast assets from Jaya TV Newsroom & PCR Drive
 */
export const GALLERY_ITEMS: GalleryItem[] = [
  // 1. AUTHENTIC DRIVE VIDEOS (PCR & Studio Floor)
  ...DRIVE_GALLERY_VIDEOS,

  // 2. AUTHENTIC DRIVE PHOTOS (Newsroom, PCR & Studio)
  ...DRIVE_GALLERY_PHOTOS,

  // 3. STUDIOS & SOUNDSTAGES
  {
    id: 'studio-floor-alpha',
    title: 'Multi-Camera Main Studio Floor',
    category: 'studios',
    categoryLabel: 'Television Studio',
    image: '/src/assets/images/hero_broadcast_studio_1785852745647.jpg',
    description: '10,000+ sq.ft acoustic soundstage equipped with heavy camera pedestals, motorized lighting grids, and chroma cyclorama.',
    specs: ['10,000 Sq.Ft', 'Acoustic STC 55+', 'Multi-Cam Pedestals', 'Motorized DMX Grid'],
    location: 'Floor 1 — Studio Alpha'
  },
  {
    id: 'studio-virtual-production',
    title: 'Virtual Production & Chroma Soundstage',
    category: 'studios',
    categoryLabel: 'Television Studio',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80',
    description: 'Specialized 180° curved green-screen cyclorama with real-time camera tracking and live Unreal Engine composite rendering.',
    specs: ['180° Green Cyclorama', 'Mo-Sys StarTracker', 'Zero-Reflect Floor', '4K UltraHD Genlock'],
    location: 'Floor 1 — Virtual Stage'
  },
  {
    id: 'studio-lighting-grid',
    title: 'Broadcast DMX Lighting & Rigging Grid',
    category: 'studios',
    categoryLabel: 'Television Studio',
    image: '/light.jpg',
    description: 'Professional high-bay studio lighting grid with ARRI SkyPanel softlights, Fresnel spotlights, and programmable dimming boards.',
    specs: ['ARRI SkyPanel S60-C', 'ETC Ion DMX Console', '20ft High Ceilings', '3-Phase Studio Power'],
    location: 'Studio Alpha — Ceiling Grid'
  },

  // 4. EDIT SUITES
  {
    id: 'edit-suite-avid-nle',
    title: 'Avid Media Composer & Premiere Pro Suites',
    category: 'edit_suites',
    categoryLabel: 'Post-Production Suite',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
    description: 'Acoustically treated editing suites connected to 10GbE shared SAN storage for multi-cam fast-turnaround news and entertainment shows.',
    specs: ['Avid Media Composer', 'Apple Mac Studio M2 Max', '10GbE SAN Shared Ingest', 'Genelec 8030 Nearfields'],
    location: 'Floor 3 — Post Lab A'
  },
  {
    id: 'edit-suite-color-grading',
    title: 'DaVinci Resolve Color Grading Suite',
    category: 'edit_suites',
    categoryLabel: 'Post-Production Suite',
    image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=1200&q=80',
    description: 'Color grading suite calibrated to DCI-P3 and Rec.709 standards with DaVinci Resolve Mini Panel and Flanders Scientific mastering monitor.',
    specs: ['DaVinci Resolve Studio', 'FSI Reference Monitor', 'Resolve Mini Control Panel', '18% Neutral Gray Suite'],
    location: 'Floor 3 — Color Grading Bay'
  },

  // 5. SERVER ROOMS & MCR
  {
    id: 'server-room-satellite-racks',
    title: 'MCR Transmission Servers & Telecom Racks',
    category: 'server_rooms',
    categoryLabel: 'Server Room & MCR',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    description: 'High-density enterprise server racks hosting playout automation, SAN fiber storage, DVB-S2 satellite modulators, and transponder feeds.',
    specs: ['Pebble Beach Automation', '24/7 Redundant Power (N+1)', '100TB High-Speed SAN', 'Harmonic Video Encoders'],
    location: 'Floor 4 — Teleport Server Room'
  },
  {
    id: 'server-room-transmission-uplink',
    title: 'Satellite Uplink & Earth Station Transponder Hub',
    category: 'server_rooms',
    categoryLabel: 'Server Room & MCR',
    image: 'https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?auto=format&fit=crop&w=1200&q=80',
    description: 'RF engineering console monitoring transponder telemetry, satellite dish positioning, spectrum analyzers, and live earth station feeds.',
    specs: ['C-Band / Ku-Band Uplink', 'Spectrum Analyzers', 'Automatic Failover Routing', 'Evertz IP Router Fabric'],
    location: 'Teleport Hub & Satellite Dish Farm'
  },

  // 6. CLASSROOMS
  {
    id: 'classroom-lecture-theatre',
    title: 'Smart Media Lecture Theatre & Screening Hall',
    category: 'classrooms',
    categoryLabel: 'Classroom & Labs',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80',
    description: 'Tiered 60-seat screening auditorium with 4K laser projection, Dolby 7.1 surround sound, and interactive smartboards for script masterclasses.',
    specs: ['4K Barco Laser Projector', 'Dolby Atmos 7.1 Setup', 'Acoustic Sound Treatment', 'Interactive Pen Boards'],
    location: 'Floor 1 — Auditorium 101'
  },
  {
    id: 'classroom-hands-on-lab',
    title: 'Broadcast Simulation Computer Lab',
    category: 'classrooms',
    categoryLabel: 'Classroom & Labs',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
    description: 'Individual dual-monitor workstations for students to simulate live PCR rundowns, automated scripts, and virtual master control switching.',
    specs: ['30 Workstation Terminals', 'Simulated Playout Software', 'Packet Tracer & AI Lab', 'High-Speed Fiber Net'],
    location: 'Floor 2 — Computer Lab B'
  },

  // 7. EQUIPMENT & CAMERA RIGS
  {
    id: 'equipment-camera-rigs',
    title: 'ARRI & Cinema Multi-Camera Systems',
    category: 'equipment',
    categoryLabel: 'Studio Equipment',
    image: '/src/assets/images/filmmaking_camera_rig_1785852773389.jpg',
    description: 'Heavy-duty cinema camera packages with matte boxes, follow focus units, wireless video transmitters, and prime anamorphic lenses.',
    specs: ['ARRI Alexa & Sony FX9', 'Cooke & Zeiss Prime Lenses', 'Teradek Bolt 4K Wireless', 'Tilta Nucleus-M Focus'],
    location: 'Ground Floor — Central Equipment Locker'
  },
  {
    id: 'equipment-campus-exterior',
    title: 'Muthamizh Academy Campus & Studio Complex',
    category: 'equipment',
    categoryLabel: 'Campus Architecture',
    image: '/src/assets/images/academy_campus_building_1785852759706.jpg',
    description: 'Modern media academy campus in Kalaimagal Nagar, Ekkattuthangal, Chennai, integrated directly with Jaya TV broadcast headquarters.',
    specs: ['25,000+ Total Built Area', 'Metro Connectivity', 'Dedicated Student Lounge', 'Outdoor Shoot Arena'],
    location: 'Kalaimagal Nagar, Ekkattuthangal, Chennai'
  }
];
