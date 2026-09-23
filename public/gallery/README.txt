MUTHAMIZH ACADEMY - GALLERY ORGANIZATION GUIDE
=================================================

To categorize your pictures and videos under specific tabs, simply place your files in the respective folders below:

FOLDERS STRUCTURE:
-----------------
1. /public/gallery/studios/
   -> For Studio Floor, Chroma cycloramas, Lighting grids, Soundstages
   -> Category Tab: 'studios' (Studios & Soundstages)

2. /public/gallery/newsrooms/
   -> For News studio, Multi-camera teleprompters, PCR switcher rooms
   -> Category Tab: 'newsrooms' (Newsrooms & PCR)

3. /public/gallery/edit-suites/
   -> For Avid Media Composer suites, DaVinci Resolve grading, Audio labs
   -> Category Tab: 'edit_suites' (Edit & Grading Suites)

4. /public/gallery/server-rooms/
   -> For Central Teleport MCR, Satellite uplink dish, SDI router racks
   -> Category Tab: 'server_rooms' (Server Rooms & MCR)

5. /public/gallery/classrooms/
   -> For Lecture amphitheatres, Smart preview theatres, Digital labs
   -> Category Tab: 'classrooms' (Classrooms & Labs)

6. /public/gallery/equipment/
   -> For ARRI/RED cinema rigs, Lenses, Pedestals, Drones, Gimbals
   -> Category Tab: 'equipment' (Cinema Gear & Campus)

7. /public/gallery/videos/
   -> For Facility walkthrough video reels (.mp4 / .webm)

HOW TO REGISTER IMAGES & VIDEOS:
--------------------------------
Open: /src/data/galleryData.ts
Add an entry in the GALLERY_ITEMS array. Every item you add AUTOMATICALLY appears in its specific category tab AND in the "All Facilities" tab!

Example Photo:
{
  id: 'my-studio-pic-1',
  title: 'Chroma Floor 1',
  category: 'studios', // 'studios' | 'newsrooms' | 'edit_suites' | 'server_rooms' | 'classrooms' | 'equipment'
  categoryLabel: 'Television Studio',
  image: '/gallery/studios/my-studio-pic-1.jpg',
  description: '10,000 sq.ft floor with live green screen setup.',
  specs: ['10,000 Sq.Ft', 'Green Cyc', '4K Pedestals'],
  location: 'Studio Complex Floor 1'
}

Example Video:
{
  id: 'my-newsroom-video',
  title: 'Live News Bulletin Walkthrough',
  category: 'newsrooms',
  categoryLabel: 'Newsroom & PCR',
  mediaType: 'video',
  videoSrc: '/gallery/videos/newsroom-walkthrough.mp4',
  image: '/gallery/newsrooms/newsroom-poster.jpg',
  description: 'Behind the scenes video clip of prime time bulletin.',
  specs: ['4K 50fps', 'Slow-Mo 0.5x', 'Blackmagic Vision Mixer'],
  location: 'News Studio 2'
}
