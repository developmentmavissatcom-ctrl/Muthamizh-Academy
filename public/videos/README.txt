MUTHAMIZH ACADEMY - HERO VIDEOS DIRECTORY
==========================================

You can upload your videos here!
Drop your MP4 or WebM videos into this directory or the /public folder:
e.g.
  /public/videos/studio-walkthrough.mp4
  /public/videos/pcr-switching.mp4
  /public/videos/server-room-telemetry.mp4

To display them in the Broadcast Hero video slides and hover tabs:
Open:
  /src/data/heroVideosData.ts
and add an entry like:
  {
    id: 'my-video',
    title: 'Studio Floor Walkthrough',
    subtitle: '10,000 sq.ft arena in 4K',
    videoSrc: '/videos/studio-walkthrough.mp4',
    tag: 'Studio Tour',
    playbackSpeed: 0.5,
    description: 'Detailed camera movement across our broadcast stage.'
  }
