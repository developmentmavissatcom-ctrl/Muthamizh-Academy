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
}

/**
 * Muthamizh Academy Facilities & Infrastructure Gallery
 * Kept empty for now. Photos and videos will be placed here later.
 */
export const GALLERY_ITEMS: GalleryItem[] = [];
