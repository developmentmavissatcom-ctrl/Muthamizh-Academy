import { DRIVE_PCR_VIDEOS } from './driveMediaData';

export interface HeroVideoSlide {
  id: string;
  title: string;
  subtitle: string;
  videoSrc: string;
  fallbackSrc?: string;
  drivePreviewUrl?: string;
  thumbnail?: string;
  tag: string;
  playbackSpeed: number; // e.g. 0.5
  description: string;
}

/**
 * Hero Videos Registry
 * Powered by authentic broadcast production footage from Jaya TV Newsroom & PCR Drive
 */
export const HERO_VIDEOS: HeroVideoSlide[] = [
  {
    id: 'hero-cam14005',
    title: 'Newsroom Multi-Cam Studio Floor',
    subtitle: '10,000+ sq.ft Jaya TV active broadcast arena',
    videoSrc: '/videos/hero/cam14005.mp4',
    drivePreviewUrl: DRIVE_PCR_VIDEOS[0]?.drivePreviewUrl,
    tag: 'Live Floor',
    playbackSpeed: 1.0,
    description: 'Authentic Jaya TV broadcast news floor featuring multi-camera pedestal rigs, teleprompters, and live talent cues.'
  },
  {
    id: 'hero-cam14006',
    title: 'PCR Production Vision Mixing Suite',
    subtitle: 'Live Multi-Channel Director Switcher',
    videoSrc: '/videos/hero/cam14006.mp4',
    drivePreviewUrl: DRIVE_PCR_VIDEOS[1]?.drivePreviewUrl,
    tag: 'PCR Deck',
    playbackSpeed: 1.0,
    description: 'Live vision mixer switching camera cuts, lower thirds, multi-view feeds, and master program output.'
  },
  {
    id: 'hero-cam14007',
    title: 'Broadcast High-Bay Studio Lighting',
    subtitle: 'DMX-controlled softlights & Fresnel grids',
    videoSrc: '/videos/hero/cam14007.mp4',
    drivePreviewUrl: DRIVE_PCR_VIDEOS[2]?.drivePreviewUrl,
    tag: 'Lighting Grid',
    playbackSpeed: 1.0,
    description: 'Calibrated color temperature and key/fill balance engineered for prime-time television broadcasts.'
  },
  {
    id: 'hero-cam14008',
    title: 'Prime-Time Anchor Desk & IFB Directing',
    subtitle: 'Executive Producer live intercom ear communication',
    videoSrc: '/videos/hero/cam14008.mp4',
    drivePreviewUrl: DRIVE_PCR_VIDEOS[3]?.drivePreviewUrl,
    tag: 'Anchor Desk',
    playbackSpeed: 1.0,
    description: 'Directing on-camera anchors with live teleprompter rundown synchronization and instant rundown changes.'
  },
  {
    id: 'hero-cam14009',
    title: 'PCR Quad-Split Multi-Viewer Wall',
    subtitle: 'SDI matrix routing and return camera telemetry',
    videoSrc: '/videos/hero/cam14009.mp4',
    drivePreviewUrl: DRIVE_PCR_VIDEOS[4]?.drivePreviewUrl,
    tag: 'PCR Multi-View',
    playbackSpeed: 1.0,
    description: 'Director console showing simultaneously ISO camera feeds, graphics server channels, and live program output.'
  },
  {
    id: 'hero-cam14010',
    title: 'Studio Pedestal Tracking & Motion Rigs',
    subtitle: 'Hydraulic camera dollies and precision pan-tilt',
    videoSrc: '/videos/hero/cam14010.mp4',
    drivePreviewUrl: DRIVE_PCR_VIDEOS[5]?.drivePreviewUrl,
    tag: 'Studio Rigs',
    playbackSpeed: 1.0,
    description: 'Cinematography camera operators mastering smooth push-ins, jib sweeps, and live track dollies.'
  }
];
