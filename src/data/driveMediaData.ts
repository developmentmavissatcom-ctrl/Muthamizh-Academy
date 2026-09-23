/**
 * Muthamizh Academy & Jaya TV Drive Media Registry
 * Auto-synced from Google Drive Folder: 1NYhrQ72MNMGOqPYmyK1bA5NAzRTJIo5d
 * Contains 50 Authentic Newsroom & PCR Photos and 25 Professional Broadcast Videos
 */

export interface DriveVideoMedia {
  id: string;
  driveId: string;
  fileName: string;
  title: string;
  category: "newsrooms";
  categoryLabel: string;
  description: string;
  specs: string[];
  location: string;
  mediaType: "video";
  videoSrc: string;
  fallbackVideoSrc: string;
  thumbnailUrl: string;
  drivePreviewUrl: string;
  driveFolderUrl: string;
  playbackSpeed: number;
}

export interface DriveImageMedia {
  id: string;
  driveId: string;
  fileName: string;
  title: string;
  category: "newsrooms";
  categoryLabel: string;
  description: string;
  specs: string[];
  location: string;
  mediaType: "image";
  image: string;
  thumbnailUrl: string;
  driveViewUrl: string;
  driveFolderUrl: string;
}

export const DRIVE_PCR_VIDEOS: DriveVideoMedia[] = [
  {
    "id": "pcr-video-1",
    "driveId": "15RXvkjc_dN-NaYKVoSfxL6jcXP_tPx4q",
    "fileName": "CAM14005.MP4",
    "title": "Multi-Cam Newsroom Live Floor Operations",
    "category": "newsrooms",
    "categoryLabel": "Newsroom & PCR Video",
    "description": "Live multi-camera floor positioning and teleprompter alignment during broadcast run-through.",
    "specs": [
      "1080p 50fps",
      "Pedestal Rigs",
      "Floor Prompter",
      "Live Floor A"
    ],
    "location": "Jaya TV Studio Floor & PCR Suite",
    "mediaType": "video",
    "videoSrc": "/api/media/stream/15RXvkjc_dN-NaYKVoSfxL6jcXP_tPx4q",
    "fallbackVideoSrc": "https://drive.usercontent.google.com/download?id=15RXvkjc_dN-NaYKVoSfxL6jcXP_tPx4q&export=download&confirm=t",
    "thumbnailUrl": "https://lh3.googleusercontent.com/d/14NLJSRniwwerBXFSvr0rktvliojPkgs3",
    "drivePreviewUrl": "https://drive.google.com/file/d/15RXvkjc_dN-NaYKVoSfxL6jcXP_tPx4q/preview",
    "driveFolderUrl": "https://drive.google.com/drive/folders/15KHYoaRx96uJycnJLUbwG1OI-ANRIKsX",
    "playbackSpeed": 0.5
  },
  {
    "id": "pcr-video-2",
    "driveId": "1346tY4lRMsr_pmg8SYjyyu34UpKJFBg3",
    "fileName": "CAM14006.MP4",
    "title": "PCR Production Vision Mixer Live Switching",
    "category": "newsrooms",
    "categoryLabel": "Newsroom & PCR Video",
    "description": "Multi-channel vision switcher executing live cutaways, lower-third supers, and split-screen feeds.",
    "specs": [
      "Ross Vision Suite",
      "ATEM 4K",
      "Multi-Screen Wall",
      "PCR Suite 01"
    ],
    "location": "Jaya TV Studio Floor & PCR Suite",
    "mediaType": "video",
    "videoSrc": "/api/media/stream/1346tY4lRMsr_pmg8SYjyyu34UpKJFBg3",
    "fallbackVideoSrc": "https://drive.usercontent.google.com/download?id=1346tY4lRMsr_pmg8SYjyyu34UpKJFBg3&export=download&confirm=t",
    "thumbnailUrl": "https://lh3.googleusercontent.com/d/11kOeRKuIpniQ-ZR8dtcf3vATMjTZyu_0",
    "drivePreviewUrl": "https://drive.google.com/file/d/1346tY4lRMsr_pmg8SYjyyu34UpKJFBg3/preview",
    "driveFolderUrl": "https://drive.google.com/drive/folders/15KHYoaRx96uJycnJLUbwG1OI-ANRIKsX",
    "playbackSpeed": 0.5
  },
  {
    "id": "pcr-video-3",
    "driveId": "1GgCCeK14VXoUzJBGXefmMfK4fp6p_mSG",
    "fileName": "CAM14007.MP4",
    "title": "Broadcast Floor Lighting & Grid Calibrations",
    "category": "newsrooms",
    "categoryLabel": "Newsroom & PCR Video",
    "description": "DMX-controlled softlights and key Fresnel rigging balanced for prime-time news broadcast anchors.",
    "specs": [
      "DMX Dimmer",
      "ARRI SkyPanel",
      "High-Bay Grid",
      "Floor A Grid"
    ],
    "location": "Jaya TV Studio Floor & PCR Suite",
    "mediaType": "video",
    "videoSrc": "/api/media/stream/1GgCCeK14VXoUzJBGXefmMfK4fp6p_mSG",
    "fallbackVideoSrc": "https://drive.usercontent.google.com/download?id=1GgCCeK14VXoUzJBGXefmMfK4fp6p_mSG&export=download&confirm=t",
    "thumbnailUrl": "https://lh3.googleusercontent.com/d/14TNEBgOFjDBX7pUA-AKUllmjbfa0h31r",
    "drivePreviewUrl": "https://drive.google.com/file/d/1GgCCeK14VXoUzJBGXefmMfK4fp6p_mSG/preview",
    "driveFolderUrl": "https://drive.google.com/drive/folders/15KHYoaRx96uJycnJLUbwG1OI-ANRIKsX",
    "playbackSpeed": 0.5
  },
  {
    "id": "pcr-video-4",
    "driveId": "1O1QrhDjB1-HmiEDdc7kcJHZo7gVVswa0",
    "fileName": "CAM14008.MP4",
    "title": "Anchor Desk Directing & IFB Talkback",
    "category": "newsrooms",
    "categoryLabel": "Newsroom & PCR Video",
    "description": "News anchor coordination with executive producer and director over private IFB ear communicator.",
    "specs": [
      "IFB Matrix",
      "Autocue Teleprompter",
      "Prime Anchor Desk",
      "Floor A"
    ],
    "location": "Jaya TV Studio Floor & PCR Suite",
    "mediaType": "video",
    "videoSrc": "/api/media/stream/1O1QrhDjB1-HmiEDdc7kcJHZo7gVVswa0",
    "fallbackVideoSrc": "https://drive.usercontent.google.com/download?id=1O1QrhDjB1-HmiEDdc7kcJHZo7gVVswa0&export=download&confirm=t",
    "thumbnailUrl": "https://lh3.googleusercontent.com/d/1dto6fWR6pRstdO-aBczmvBx4d12VQf9Y",
    "drivePreviewUrl": "https://drive.google.com/file/d/1O1QrhDjB1-HmiEDdc7kcJHZo7gVVswa0/preview",
    "driveFolderUrl": "https://drive.google.com/drive/folders/15KHYoaRx96uJycnJLUbwG1OI-ANRIKsX",
    "playbackSpeed": 0.5
  },
  {
    "id": "pcr-video-5",
    "driveId": "1GxWpw7IEwWENHqqcd1PtE-27sJ85t-Fn",
    "fileName": "CAM14009.MP4",
    "title": "PCR Multi-Viewer & Camera Return Matrix",
    "category": "newsrooms",
    "categoryLabel": "Newsroom & PCR Video",
    "description": "Real-time quad-split telemetry showing Program, Preview, Remote Live Feeds, and Graphics Channels.",
    "specs": [
      "Quad Multi-View",
      "SDI Matrix Routing",
      "Tally Signals",
      "PCR Deck"
    ],
    "location": "Jaya TV Studio Floor & PCR Suite",
    "mediaType": "video",
    "videoSrc": "/api/media/stream/1GxWpw7IEwWENHqqcd1PtE-27sJ85t-Fn",
    "fallbackVideoSrc": "https://drive.usercontent.google.com/download?id=1GxWpw7IEwWENHqqcd1PtE-27sJ85t-Fn&export=download&confirm=t",
    "thumbnailUrl": "https://lh3.googleusercontent.com/d/1Op0GOVwvonJebAMPpe_iWWDzeRqSr8eq",
    "drivePreviewUrl": "https://drive.google.com/file/d/1GxWpw7IEwWENHqqcd1PtE-27sJ85t-Fn/preview",
    "driveFolderUrl": "https://drive.google.com/drive/folders/15KHYoaRx96uJycnJLUbwG1OI-ANRIKsX",
    "playbackSpeed": 0.5
  },
  {
    "id": "pcr-video-6",
    "driveId": "1vOK_d5sGICR_TixtUjuBqL28n7sYZQLe",
    "fileName": "CAM14010.MP4",
    "title": "Studio Pedestal Tracking & Dolly Motion",
    "category": "newsrooms",
    "categoryLabel": "Newsroom & PCR Video",
    "description": "Smooth hydraulic pedestal movements following studio host walk-up and news standup segments.",
    "specs": [
      "Vinten Pedestals",
      "Pan-Tilt Heads",
      "Smooth Glide",
      "Studio Stage"
    ],
    "location": "Jaya TV Studio Floor & PCR Suite",
    "mediaType": "video",
    "videoSrc": "/api/media/stream/1vOK_d5sGICR_TixtUjuBqL28n7sYZQLe",
    "fallbackVideoSrc": "https://drive.usercontent.google.com/download?id=1vOK_d5sGICR_TixtUjuBqL28n7sYZQLe&export=download&confirm=t",
    "thumbnailUrl": "https://lh3.googleusercontent.com/d/1Ho5bJW4pN4-e58h67WVXwxmxAYWNberl",
    "drivePreviewUrl": "https://drive.google.com/file/d/1vOK_d5sGICR_TixtUjuBqL28n7sYZQLe/preview",
    "driveFolderUrl": "https://drive.google.com/drive/folders/15KHYoaRx96uJycnJLUbwG1OI-ANRIKsX",
    "playbackSpeed": 0.5
  },
  {
    "id": "pcr-video-7",
    "driveId": "1QEx-Izt4t_DUhezFeLcWvHfReUq6m45g",
    "fileName": "CAM14011.MP4",
    "title": "Audio Console & Lapel Mic Sound Balancing",
    "category": "newsrooms",
    "categoryLabel": "Newsroom & PCR Video",
    "description": "Multi-fader broadcast sound mixing desk managing wireless lavaliers, sound bites, and station jingles.",
    "specs": [
      "Digital Audio Board",
      "Sennheiser Wireless",
      "Ducking Limiter",
      "PCR Audio"
    ],
    "location": "Jaya TV Studio Floor & PCR Suite",
    "mediaType": "video",
    "videoSrc": "/api/media/stream/1QEx-Izt4t_DUhezFeLcWvHfReUq6m45g",
    "fallbackVideoSrc": "https://drive.usercontent.google.com/download?id=1QEx-Izt4t_DUhezFeLcWvHfReUq6m45g&export=download&confirm=t",
    "thumbnailUrl": "https://lh3.googleusercontent.com/d/18e_9PYmLLliZAegrhII8mUTJDuQwJd4P",
    "drivePreviewUrl": "https://drive.google.com/file/d/1QEx-Izt4t_DUhezFeLcWvHfReUq6m45g/preview",
    "driveFolderUrl": "https://drive.google.com/drive/folders/15KHYoaRx96uJycnJLUbwG1OI-ANRIKsX",
    "playbackSpeed": 0.5
  },
  {
    "id": "pcr-video-8",
    "driveId": "1yv-gs8bFHUhg5LgEAPf0VGAYNQYwYYf1",
    "fileName": "CAM14012.MP4",
    "title": "MCR Satellite Uplink & Teleport Feeds",
    "category": "newsrooms",
    "categoryLabel": "Newsroom & PCR Video",
    "description": "Master Control Room feed dispatch monitoring transponder status and Jaya TV satellite transmission.",
    "specs": [
      "DVB-S2 Playout",
      "Transponder Ingest",
      "Mavis Satcom Teleport",
      "MCR"
    ],
    "location": "Jaya TV Studio Floor & PCR Suite",
    "mediaType": "video",
    "videoSrc": "/api/media/stream/1yv-gs8bFHUhg5LgEAPf0VGAYNQYwYYf1",
    "fallbackVideoSrc": "https://drive.usercontent.google.com/download?id=1yv-gs8bFHUhg5LgEAPf0VGAYNQYwYYf1&export=download&confirm=t",
    "thumbnailUrl": "https://lh3.googleusercontent.com/d/1j3Jd7ZXUrTTaCJM1J2d3pdomkc66mNMI",
    "drivePreviewUrl": "https://drive.google.com/file/d/1yv-gs8bFHUhg5LgEAPf0VGAYNQYwYYf1/preview",
    "driveFolderUrl": "https://drive.google.com/drive/folders/15KHYoaRx96uJycnJLUbwG1OI-ANRIKsX",
    "playbackSpeed": 0.5
  },
  {
    "id": "pcr-video-9",
    "driveId": "1WxMSZB_AhRfDH68RXRAF8YQh2y9mpOHy",
    "fileName": "CAM14013.MP4",
    "title": "Automated Teleprompter Rundown Speed Control",
    "category": "newsrooms",
    "categoryLabel": "Newsroom & PCR Video",
    "description": "Newsroom script scrolling timed precisely to speech cadence via foot pedal and desk dial.",
    "specs": [
      "Avid iNews Prompter",
      "Foot Controller",
      "Anchor Telemetry",
      "News Desk"
    ],
    "location": "Jaya TV Studio Floor & PCR Suite",
    "mediaType": "video",
    "videoSrc": "/api/media/stream/1WxMSZB_AhRfDH68RXRAF8YQh2y9mpOHy",
    "fallbackVideoSrc": "https://drive.usercontent.google.com/download?id=1WxMSZB_AhRfDH68RXRAF8YQh2y9mpOHy&export=download&confirm=t",
    "thumbnailUrl": "https://lh3.googleusercontent.com/d/16p9BbzNn9UfgIvaFDI5tsgZzR-qUSver",
    "drivePreviewUrl": "https://drive.google.com/file/d/1WxMSZB_AhRfDH68RXRAF8YQh2y9mpOHy/preview",
    "driveFolderUrl": "https://drive.google.com/drive/folders/15KHYoaRx96uJycnJLUbwG1OI-ANRIKsX",
    "playbackSpeed": 0.5
  },
  {
    "id": "pcr-video-10",
    "driveId": "1ShnlGIaHSbP-d3URnRHpZm4UlEe7Veln",
    "fileName": "CAM14014.MP4",
    "title": "Chroma Key Virtual Studio Compositing",
    "category": "newsrooms",
    "categoryLabel": "Newsroom & PCR Video",
    "description": "Live green-screen cyclorama keying with virtual graphic sets rendered with zero latency.",
    "specs": [
      "Zero-Delay Chroma",
      "Ultimatte Keyer",
      "180° Cyclorama",
      "Floor B"
    ],
    "location": "Jaya TV Studio Floor & PCR Suite",
    "mediaType": "video",
    "videoSrc": "/api/media/stream/1ShnlGIaHSbP-d3URnRHpZm4UlEe7Veln",
    "fallbackVideoSrc": "https://drive.usercontent.google.com/download?id=1ShnlGIaHSbP-d3URnRHpZm4UlEe7Veln&export=download&confirm=t",
    "thumbnailUrl": "https://lh3.googleusercontent.com/d/1Gle5OZHaql1PQpuPtViuMkff06LApciB",
    "drivePreviewUrl": "https://drive.google.com/file/d/1ShnlGIaHSbP-d3URnRHpZm4UlEe7Veln/preview",
    "driveFolderUrl": "https://drive.google.com/drive/folders/15KHYoaRx96uJycnJLUbwG1OI-ANRIKsX",
    "playbackSpeed": 0.5
  },
  {
    "id": "pcr-video-11",
    "driveId": "1Bt-d2z3NO0Umu8exDLyFWkD3e6SWvmPr",
    "fileName": "CAM14015.MP4",
    "title": "Jib Crane Overhead Sweeps & Studio Panorama",
    "category": "newsrooms",
    "categoryLabel": "Newsroom & PCR Video",
    "description": "High-angle camera jib sweep capturing the entire Jaya TV news arena and video wall backdrop.",
    "specs": [
      "Jimmy Jib Triangle",
      "Overhead Shot",
      "Motorized Pan-Tilt",
      "Studio Alpha"
    ],
    "location": "Jaya TV Studio Floor & PCR Suite",
    "mediaType": "video",
    "videoSrc": "/api/media/stream/1Bt-d2z3NO0Umu8exDLyFWkD3e6SWvmPr",
    "fallbackVideoSrc": "https://drive.usercontent.google.com/download?id=1Bt-d2z3NO0Umu8exDLyFWkD3e6SWvmPr&export=download&confirm=t",
    "thumbnailUrl": "https://lh3.googleusercontent.com/d/1TSoSeQdShfLPP6v9gKArCcdmj5JD91nk",
    "drivePreviewUrl": "https://drive.google.com/file/d/1Bt-d2z3NO0Umu8exDLyFWkD3e6SWvmPr/preview",
    "driveFolderUrl": "https://drive.google.com/drive/folders/15KHYoaRx96uJycnJLUbwG1OI-ANRIKsX",
    "playbackSpeed": 0.5
  },
  {
    "id": "pcr-video-12",
    "driveId": "1jRjRfA-ocix4FvB4T3r3WO6PpUquyGt4",
    "fileName": "CAM14016.MP4",
    "title": "Breaking News Ticker & CG Graphic Playout",
    "category": "newsrooms",
    "categoryLabel": "Newsroom & PCR Video",
    "description": "Real-time character generator pushing live headlines, stock tickers, and breaking alerts on-air.",
    "specs": [
      "Chyron / Vizrt CG",
      "Real-Time Ticker",
      "4K Graphics Engine",
      "PCR CG Deck"
    ],
    "location": "Jaya TV Studio Floor & PCR Suite",
    "mediaType": "video",
    "videoSrc": "/api/media/stream/1jRjRfA-ocix4FvB4T3r3WO6PpUquyGt4",
    "fallbackVideoSrc": "https://drive.usercontent.google.com/download?id=1jRjRfA-ocix4FvB4T3r3WO6PpUquyGt4&export=download&confirm=t",
    "thumbnailUrl": "https://lh3.googleusercontent.com/d/1drlHHJ3pce5-yggPkiJySzirAPXcaMxg",
    "drivePreviewUrl": "https://drive.google.com/file/d/1jRjRfA-ocix4FvB4T3r3WO6PpUquyGt4/preview",
    "driveFolderUrl": "https://drive.google.com/drive/folders/15KHYoaRx96uJycnJLUbwG1OI-ANRIKsX",
    "playbackSpeed": 0.5
  },
  {
    "id": "pcr-video-13",
    "driveId": "19ftzGKQ2d45-ZPCbWrsYGITFZJqTcO6e",
    "fileName": "CAM14018.MP4",
    "title": "News Assignment Desk & Ingest Influx",
    "category": "newsrooms",
    "categoryLabel": "Newsroom & PCR Video",
    "description": "Field reporter video links ingested through fiber and cellular backpack systems to the server pool.",
    "specs": [
      "LiveU / Dejero",
      "Fiber Ingest SAN",
      "Field Wire Feeds",
      "News Desk"
    ],
    "location": "Jaya TV Studio Floor & PCR Suite",
    "mediaType": "video",
    "videoSrc": "/api/media/stream/19ftzGKQ2d45-ZPCbWrsYGITFZJqTcO6e",
    "fallbackVideoSrc": "https://drive.usercontent.google.com/download?id=19ftzGKQ2d45-ZPCbWrsYGITFZJqTcO6e&export=download&confirm=t",
    "thumbnailUrl": "https://lh3.googleusercontent.com/d/1Rhvw4PnTksOLaSj4OanRTtAyM86ooAP4",
    "drivePreviewUrl": "https://drive.google.com/file/d/19ftzGKQ2d45-ZPCbWrsYGITFZJqTcO6e/preview",
    "driveFolderUrl": "https://drive.google.com/drive/folders/15KHYoaRx96uJycnJLUbwG1OI-ANRIKsX",
    "playbackSpeed": 0.5
  },
  {
    "id": "pcr-video-14",
    "driveId": "1HVNILXpfoDEiB_MnuNW6iNn4oVc9X6pH",
    "fileName": "CAM14019.MP4",
    "title": "Color Calibrated Reference Monitoring",
    "category": "newsrooms",
    "categoryLabel": "Newsroom & PCR Video",
    "description": "Sony OLED master monitors verifying BT.709 and Rec.2020 legal gamut broadcast compliance.",
    "specs": [
      "Sony BVM OLED",
      "Waveform & Vectorscope",
      "Color Grading",
      "QC Lab"
    ],
    "location": "Jaya TV Studio Floor & PCR Suite",
    "mediaType": "video",
    "videoSrc": "/api/media/stream/1HVNILXpfoDEiB_MnuNW6iNn4oVc9X6pH",
    "fallbackVideoSrc": "https://drive.usercontent.google.com/download?id=1HVNILXpfoDEiB_MnuNW6iNn4oVc9X6pH&export=download&confirm=t",
    "thumbnailUrl": "https://lh3.googleusercontent.com/d/111fYz1WOli0BmGBl2hrKIuItwIyr1pFJ",
    "drivePreviewUrl": "https://drive.google.com/file/d/1HVNILXpfoDEiB_MnuNW6iNn4oVc9X6pH/preview",
    "driveFolderUrl": "https://drive.google.com/drive/folders/15KHYoaRx96uJycnJLUbwG1OI-ANRIKsX",
    "playbackSpeed": 0.5
  },
  {
    "id": "pcr-video-15",
    "driveId": "1L5Q8LoQNsTbBWLV1Gfc05oOk6dnUheLq",
    "fileName": "CAM14020.MP4",
    "title": "Slow-Motion Replay & Clip Cueing Console",
    "category": "newsrooms",
    "categoryLabel": "Newsroom & PCR Video",
    "description": "Operator cueing live sports and news package replays with instant jog-shuttle control.",
    "specs": [
      "EVS XT / Grass Valley",
      "Jog-Shuttle Dial",
      "Instant Replay",
      "PCR Replay"
    ],
    "location": "Jaya TV Studio Floor & PCR Suite",
    "mediaType": "video",
    "videoSrc": "/api/media/stream/1L5Q8LoQNsTbBWLV1Gfc05oOk6dnUheLq",
    "fallbackVideoSrc": "https://drive.usercontent.google.com/download?id=1L5Q8LoQNsTbBWLV1Gfc05oOk6dnUheLq&export=download&confirm=t",
    "thumbnailUrl": "https://lh3.googleusercontent.com/d/1i-QEkeLVhNfc8hCBnCBJTRqeiI61u3pT",
    "drivePreviewUrl": "https://drive.google.com/file/d/1L5Q8LoQNsTbBWLV1Gfc05oOk6dnUheLq/preview",
    "driveFolderUrl": "https://drive.google.com/drive/folders/15KHYoaRx96uJycnJLUbwG1OI-ANRIKsX",
    "playbackSpeed": 0.5
  },
  {
    "id": "pcr-video-16",
    "driveId": "1AHZjpu1ngEn_aluUODM0oDxoryrA4RJU",
    "fileName": "CAM14021.MP4",
    "title": "Studio Talkback Intercom Network Hub",
    "category": "newsrooms",
    "categoryLabel": "Newsroom & PCR Video",
    "description": "Matrix intercom station connecting director, floor manager, lighting technician, and sound engineer.",
    "specs": [
      "Riedel Bolero Intercom",
      "Wireless Beltpacks",
      "Partyline Audio",
      "Studio Floor"
    ],
    "location": "Jaya TV Studio Floor & PCR Suite",
    "mediaType": "video",
    "videoSrc": "/api/media/stream/1AHZjpu1ngEn_aluUODM0oDxoryrA4RJU",
    "fallbackVideoSrc": "https://drive.usercontent.google.com/download?id=1AHZjpu1ngEn_aluUODM0oDxoryrA4RJU&export=download&confirm=t",
    "thumbnailUrl": "https://lh3.googleusercontent.com/d/1q-G9dtMuHH-mexXLueyzsPfQmDIpRLBP",
    "drivePreviewUrl": "https://drive.google.com/file/d/1AHZjpu1ngEn_aluUODM0oDxoryrA4RJU/preview",
    "driveFolderUrl": "https://drive.google.com/drive/folders/15KHYoaRx96uJycnJLUbwG1OI-ANRIKsX",
    "playbackSpeed": 0.5
  },
  {
    "id": "pcr-video-17",
    "driveId": "11gLiwZonIzBcBAFLOwvFQjHTORCl6qXI",
    "fileName": "CAM14022.MP4",
    "title": "Robotic Camera Pan-Tilt Controller Rig",
    "category": "newsrooms",
    "categoryLabel": "Newsroom & PCR Video",
    "description": "Remote joystick controller fine-tuning PTZ heads across the newsroom floor during multi-show shifts.",
    "specs": [
      "Panasonic PTZ Suite",
      "Preset Recalls",
      "Remote Pan-Tilt",
      "Control Booth"
    ],
    "location": "Jaya TV Studio Floor & PCR Suite",
    "mediaType": "video",
    "videoSrc": "/api/media/stream/11gLiwZonIzBcBAFLOwvFQjHTORCl6qXI",
    "fallbackVideoSrc": "https://drive.usercontent.google.com/download?id=11gLiwZonIzBcBAFLOwvFQjHTORCl6qXI&export=download&confirm=t",
    "thumbnailUrl": "https://lh3.googleusercontent.com/d/1o_uHui__bvh41jv-wlhsK19wPGD9P80U",
    "drivePreviewUrl": "https://drive.google.com/file/d/11gLiwZonIzBcBAFLOwvFQjHTORCl6qXI/preview",
    "driveFolderUrl": "https://drive.google.com/drive/folders/15KHYoaRx96uJycnJLUbwG1OI-ANRIKsX",
    "playbackSpeed": 0.5
  },
  {
    "id": "pcr-video-18",
    "driveId": "1IZHdEOOVWsBPOnmzksnXBXxQaes23O6m",
    "fileName": "CAM14023.MP4",
    "title": "Video Wall Dynamic Backdrop Controller",
    "category": "newsrooms",
    "categoryLabel": "Newsroom & PCR Video",
    "description": "Ultra-fine pixel pitch LED backdrop displaying responsive animations and remote interview feeds.",
    "specs": [
      "LED Display Controller",
      "Barco Processor",
      "Color Balanced",
      "Newsroom Backdrop"
    ],
    "location": "Jaya TV Studio Floor & PCR Suite",
    "mediaType": "video",
    "videoSrc": "/api/media/stream/1IZHdEOOVWsBPOnmzksnXBXxQaes23O6m",
    "fallbackVideoSrc": "https://drive.usercontent.google.com/download?id=1IZHdEOOVWsBPOnmzksnXBXxQaes23O6m&export=download&confirm=t",
    "thumbnailUrl": "https://lh3.googleusercontent.com/d/1b_dh57Harf9YDBOciuff1oNU9pcwWcgi",
    "drivePreviewUrl": "https://drive.google.com/file/d/1IZHdEOOVWsBPOnmzksnXBXxQaes23O6m/preview",
    "driveFolderUrl": "https://drive.google.com/drive/folders/15KHYoaRx96uJycnJLUbwG1OI-ANRIKsX",
    "playbackSpeed": 0.5
  },
  {
    "id": "pcr-video-19",
    "driveId": "15N2PkcgnIDirQtH-tANWfp4FjhT8rheu",
    "fileName": "CAM14024.MP4",
    "title": "Floor Manager Cueing & Countdown Directing",
    "category": "newsrooms",
    "categoryLabel": "Newsroom & PCR Video",
    "description": "Floor manager providing silent visual cues, time countdowns, and talent placement on set.",
    "specs": [
      "Floor Direction",
      "Live Standup Cues",
      "Time Rundown",
      "Studio Arena"
    ],
    "location": "Jaya TV Studio Floor & PCR Suite",
    "mediaType": "video",
    "videoSrc": "/api/media/stream/15N2PkcgnIDirQtH-tANWfp4FjhT8rheu",
    "fallbackVideoSrc": "https://drive.usercontent.google.com/download?id=15N2PkcgnIDirQtH-tANWfp4FjhT8rheu&export=download&confirm=t",
    "thumbnailUrl": "https://lh3.googleusercontent.com/d/1g2jIYcgYpnai2ZhoAEwz1oXHTqepQ4IA",
    "drivePreviewUrl": "https://drive.google.com/file/d/15N2PkcgnIDirQtH-tANWfp4FjhT8rheu/preview",
    "driveFolderUrl": "https://drive.google.com/drive/folders/15KHYoaRx96uJycnJLUbwG1OI-ANRIKsX",
    "playbackSpeed": 0.5
  },
  {
    "id": "pcr-video-20",
    "driveId": "1dcICoFOQS-MQ4djPQv2hipMfn2CPun7A",
    "fileName": "CAM14025.MP4",
    "title": "Live Debate Circular Round-Table Setup",
    "category": "newsrooms",
    "categoryLabel": "Newsroom & PCR Video",
    "description": "Multi-angle framing calibrated for prime-time evening debates with isolated ISO recordings.",
    "specs": [
      "Multi-Cam ISO Recording",
      "Debate Rig",
      "Omni Audio",
      "Floor A Main"
    ],
    "location": "Jaya TV Studio Floor & PCR Suite",
    "mediaType": "video",
    "videoSrc": "/api/media/stream/1dcICoFOQS-MQ4djPQv2hipMfn2CPun7A",
    "fallbackVideoSrc": "https://drive.usercontent.google.com/download?id=1dcICoFOQS-MQ4djPQv2hipMfn2CPun7A&export=download&confirm=t",
    "thumbnailUrl": "https://lh3.googleusercontent.com/d/1ddUCX_qMME2HZrC27pa_nnl4fl5g66zG",
    "drivePreviewUrl": "https://drive.google.com/file/d/1dcICoFOQS-MQ4djPQv2hipMfn2CPun7A/preview",
    "driveFolderUrl": "https://drive.google.com/drive/folders/15KHYoaRx96uJycnJLUbwG1OI-ANRIKsX",
    "playbackSpeed": 0.5
  },
  {
    "id": "pcr-video-21",
    "driveId": "1ET9SoIkxJ-xJPqMDsKMau_Y3KJL5wSkG",
    "fileName": "CAM14026.MP4",
    "title": "Broadcast Server Rack & SAN Ingest Engine",
    "category": "newsrooms",
    "categoryLabel": "Newsroom & PCR Video",
    "description": "Redundant enterprise storage nodes providing simultaneous access to editors and playout engines.",
    "specs": [
      "10GbE SAN",
      "RAID 6 Storage Pool",
      "Avid NEXIS Hub",
      "Server Room"
    ],
    "location": "Jaya TV Studio Floor & PCR Suite",
    "mediaType": "video",
    "videoSrc": "/api/media/stream/1ET9SoIkxJ-xJPqMDsKMau_Y3KJL5wSkG",
    "fallbackVideoSrc": "https://drive.usercontent.google.com/download?id=1ET9SoIkxJ-xJPqMDsKMau_Y3KJL5wSkG&export=download&confirm=t",
    "thumbnailUrl": "https://lh3.googleusercontent.com/d/1Hr8bngZrsCCsAEnUzFzDixe2miZOqkzG",
    "drivePreviewUrl": "https://drive.google.com/file/d/1ET9SoIkxJ-xJPqMDsKMau_Y3KJL5wSkG/preview",
    "driveFolderUrl": "https://drive.google.com/drive/folders/15KHYoaRx96uJycnJLUbwG1OI-ANRIKsX",
    "playbackSpeed": 0.5
  },
  {
    "id": "pcr-video-22",
    "driveId": "1JYtwtpoiv2EcImbKWMjPiLGgBNtIa3xI",
    "fileName": "CAM14027.MP4",
    "title": "Satellite Dish Earth Station Ground Station",
    "category": "newsrooms",
    "categoryLabel": "Newsroom & PCR Video",
    "description": "High-power amplifier (HPA) transmitter dish beaming Jaya TV channels across Asia-Pacific.",
    "specs": [
      "C-Band Earth Station",
      "Klystron Amplifiers",
      "Redundant Uplink",
      "Teleport Field"
    ],
    "location": "Jaya TV Studio Floor & PCR Suite",
    "mediaType": "video",
    "videoSrc": "/api/media/stream/1JYtwtpoiv2EcImbKWMjPiLGgBNtIa3xI",
    "fallbackVideoSrc": "https://drive.usercontent.google.com/download?id=1JYtwtpoiv2EcImbKWMjPiLGgBNtIa3xI&export=download&confirm=t",
    "thumbnailUrl": "https://lh3.googleusercontent.com/d/1zEDiUzSICTrocu0LfJp1M834uu6HU7YL",
    "drivePreviewUrl": "https://drive.google.com/file/d/1JYtwtpoiv2EcImbKWMjPiLGgBNtIa3xI/preview",
    "driveFolderUrl": "https://drive.google.com/drive/folders/15KHYoaRx96uJycnJLUbwG1OI-ANRIKsX",
    "playbackSpeed": 0.5
  },
  {
    "id": "pcr-video-23",
    "driveId": "19JFXHW__Vw4nGtIgk-Uw7Qg18vSVc2Vp",
    "fileName": "CAM14028.MP4",
    "title": "Weather & Election Special Broadcast Desk",
    "category": "newsrooms",
    "categoryLabel": "Newsroom & PCR Video",
    "description": "Interactive touch display and augmented reality graphics integration for special bulletin broadcasts.",
    "specs": [
      "AR Graphics",
      "Interactive Screen",
      "Live Data Feed",
      "Studio Desk"
    ],
    "location": "Jaya TV Studio Floor & PCR Suite",
    "mediaType": "video",
    "videoSrc": "/api/media/stream/19JFXHW__Vw4nGtIgk-Uw7Qg18vSVc2Vp",
    "fallbackVideoSrc": "https://drive.usercontent.google.com/download?id=19JFXHW__Vw4nGtIgk-Uw7Qg18vSVc2Vp&export=download&confirm=t",
    "thumbnailUrl": "https://lh3.googleusercontent.com/d/1o2iK1sHrfokgSMvYh6zGyWi3QTv3g0O1",
    "drivePreviewUrl": "https://drive.google.com/file/d/19JFXHW__Vw4nGtIgk-Uw7Qg18vSVc2Vp/preview",
    "driveFolderUrl": "https://drive.google.com/drive/folders/15KHYoaRx96uJycnJLUbwG1OI-ANRIKsX",
    "playbackSpeed": 0.5
  },
  {
    "id": "pcr-video-24",
    "driveId": "1xktT8-ipCWntHa6KIepDxLhhd56wMugd",
    "fileName": "CAM14030.MP4",
    "title": "Direct-to-Air Playout Automation Suite",
    "category": "newsrooms",
    "categoryLabel": "Newsroom & PCR Video",
    "description": "Continuous automated schedule queue switching seamlessly between live news bulletins and promos.",
    "specs": [
      "Marina Playout",
      "Emergency Switchover",
      "DVB Encoder",
      "Playout Master"
    ],
    "location": "Jaya TV Studio Floor & PCR Suite",
    "mediaType": "video",
    "videoSrc": "/api/media/stream/1xktT8-ipCWntHa6KIepDxLhhd56wMugd",
    "fallbackVideoSrc": "https://drive.usercontent.google.com/download?id=1xktT8-ipCWntHa6KIepDxLhhd56wMugd&export=download&confirm=t",
    "thumbnailUrl": "https://lh3.googleusercontent.com/d/1VUmLQ2L2qyfk9Rjrf-MuZXJCiK5LPmaD",
    "drivePreviewUrl": "https://drive.google.com/file/d/1xktT8-ipCWntHa6KIepDxLhhd56wMugd/preview",
    "driveFolderUrl": "https://drive.google.com/drive/folders/15KHYoaRx96uJycnJLUbwG1OI-ANRIKsX",
    "playbackSpeed": 0.5
  },
  {
    "id": "pcr-video-25",
    "driveId": "1Cj7O5Uv2CcH1Y4xUxVJAwew5McQGrkGE",
    "fileName": "CAM14031.MP4",
    "title": "Post-Production Master Review & Sound Mix",
    "category": "newsrooms",
    "categoryLabel": "Newsroom & PCR Video",
    "description": "Final QC inspection before long-form documentary and investigative series transmission.",
    "specs": [
      "Dolby Pro Mastering",
      "Loudness EBU R128",
      "Broadcast QC",
      "Final Master Lab"
    ],
    "location": "Jaya TV Studio Floor & PCR Suite",
    "mediaType": "video",
    "videoSrc": "/api/media/stream/1Cj7O5Uv2CcH1Y4xUxVJAwew5McQGrkGE",
    "fallbackVideoSrc": "https://drive.usercontent.google.com/download?id=1Cj7O5Uv2CcH1Y4xUxVJAwew5McQGrkGE&export=download&confirm=t",
    "thumbnailUrl": "https://lh3.googleusercontent.com/d/1zKvSoyFFNdp7ldVYFKjQmfrMGSbfjep0",
    "drivePreviewUrl": "https://drive.google.com/file/d/1Cj7O5Uv2CcH1Y4xUxVJAwew5McQGrkGE/preview",
    "driveFolderUrl": "https://drive.google.com/drive/folders/15KHYoaRx96uJycnJLUbwG1OI-ANRIKsX",
    "playbackSpeed": 0.5
  }
];

export const DRIVE_NEWSROOM_IMAGES: DriveImageMedia[] = [
  {
    "id": "newsroom-photo-1",
    "driveId": "1olNyETk7Zh9mkgiJMcuHrKBdGz2qdAG4",
    "fileName": "DSC07854.JPG",
    "title": "Studio Floor A Multi-Pedestal Camera Lineup (Ref #1)",
    "category": "newsrooms",
    "categoryLabel": "Newsroom & PCR Photo",
    "description": "Authentic photograph from the Jaya TV network production facility and Muthamizh Academy practical training floor.",
    "specs": [
      "High-Res Digital Capture",
      "Jaya TV Network Floor",
      "Hands-On Facility",
      "Muthamizh Academy"
    ],
    "location": "Jaya TV Studio Campus, Chennai",
    "mediaType": "image",
    "image": "https://lh3.googleusercontent.com/d/1olNyETk7Zh9mkgiJMcuHrKBdGz2qdAG4",
    "thumbnailUrl": "https://lh3.googleusercontent.com/d/1olNyETk7Zh9mkgiJMcuHrKBdGz2qdAG4=w800",
    "driveViewUrl": "https://drive.google.com/file/d/1olNyETk7Zh9mkgiJMcuHrKBdGz2qdAG4/view",
    "driveFolderUrl": "https://drive.google.com/drive/folders/1f8muAhgEsBdfu2gyRpjbPKIjae-eTFgW"
  },
  {
    "id": "newsroom-photo-2",
    "driveId": "1OIYpNvWDJgvpZUnUXmgxFPshKI5F07K8",
    "fileName": "DSC07855.JPG",
    "title": "PCR Vision Mixing Console & Multi-Screen Monitor Wall (Ref #2)",
    "category": "newsrooms",
    "categoryLabel": "Newsroom & PCR Photo",
    "description": "Authentic photograph from the Jaya TV network production facility and Muthamizh Academy practical training floor.",
    "specs": [
      "High-Res Digital Capture",
      "Jaya TV Network Floor",
      "Hands-On Facility",
      "Muthamizh Academy"
    ],
    "location": "Jaya TV Studio Campus, Chennai",
    "mediaType": "image",
    "image": "https://lh3.googleusercontent.com/d/1OIYpNvWDJgvpZUnUXmgxFPshKI5F07K8",
    "thumbnailUrl": "https://lh3.googleusercontent.com/d/1OIYpNvWDJgvpZUnUXmgxFPshKI5F07K8=w800",
    "driveViewUrl": "https://drive.google.com/file/d/1OIYpNvWDJgvpZUnUXmgxFPshKI5F07K8/view",
    "driveFolderUrl": "https://drive.google.com/drive/folders/1f8muAhgEsBdfu2gyRpjbPKIjae-eTFgW"
  },
  {
    "id": "newsroom-photo-3",
    "driveId": "1Mbu_HAqu2EO3Lj_DeYnNrcjkJvhWT6Ya",
    "fileName": "DSC07856.JPG",
    "title": "Prime-Time Newsroom Anchor Desk & Teleprompter (Ref #3)",
    "category": "newsrooms",
    "categoryLabel": "Newsroom & PCR Photo",
    "description": "Authentic photograph from the Jaya TV network production facility and Muthamizh Academy practical training floor.",
    "specs": [
      "High-Res Digital Capture",
      "Jaya TV Network Floor",
      "Hands-On Facility",
      "Muthamizh Academy"
    ],
    "location": "Jaya TV Studio Campus, Chennai",
    "mediaType": "image",
    "image": "https://lh3.googleusercontent.com/d/1Mbu_HAqu2EO3Lj_DeYnNrcjkJvhWT6Ya",
    "thumbnailUrl": "https://lh3.googleusercontent.com/d/1Mbu_HAqu2EO3Lj_DeYnNrcjkJvhWT6Ya=w800",
    "driveViewUrl": "https://drive.google.com/file/d/1Mbu_HAqu2EO3Lj_DeYnNrcjkJvhWT6Ya/view",
    "driveFolderUrl": "https://drive.google.com/drive/folders/1f8muAhgEsBdfu2gyRpjbPKIjae-eTFgW"
  },
  {
    "id": "newsroom-photo-4",
    "driveId": "1JUqrwn-8PCvd7LAdMfhtSC9gfgIYljW5",
    "fileName": "DSC07857.JPG",
    "title": "Broadcast DMX Dimmer Rack & High-Bay Lighting (Ref #4)",
    "category": "newsrooms",
    "categoryLabel": "Newsroom & PCR Photo",
    "description": "Authentic photograph from the Jaya TV network production facility and Muthamizh Academy practical training floor.",
    "specs": [
      "High-Res Digital Capture",
      "Jaya TV Network Floor",
      "Hands-On Facility",
      "Muthamizh Academy"
    ],
    "location": "Jaya TV Studio Campus, Chennai",
    "mediaType": "image",
    "image": "https://lh3.googleusercontent.com/d/1JUqrwn-8PCvd7LAdMfhtSC9gfgIYljW5",
    "thumbnailUrl": "https://lh3.googleusercontent.com/d/1JUqrwn-8PCvd7LAdMfhtSC9gfgIYljW5=w800",
    "driveViewUrl": "https://drive.google.com/file/d/1JUqrwn-8PCvd7LAdMfhtSC9gfgIYljW5/view",
    "driveFolderUrl": "https://drive.google.com/drive/folders/1f8muAhgEsBdfu2gyRpjbPKIjae-eTFgW"
  },
  {
    "id": "newsroom-photo-5",
    "driveId": "1-HaEq8eFE_Kl3BOnJHkdg136AwFKNh3u",
    "fileName": "DSC07858.JPG",
    "title": "Camera 1 Studio Pedestal Rig & Viewfinder (Ref #5)",
    "category": "newsrooms",
    "categoryLabel": "Newsroom & PCR Photo",
    "description": "Authentic photograph from the Jaya TV network production facility and Muthamizh Academy practical training floor.",
    "specs": [
      "High-Res Digital Capture",
      "Jaya TV Network Floor",
      "Hands-On Facility",
      "Muthamizh Academy"
    ],
    "location": "Jaya TV Studio Campus, Chennai",
    "mediaType": "image",
    "image": "https://lh3.googleusercontent.com/d/1-HaEq8eFE_Kl3BOnJHkdg136AwFKNh3u",
    "thumbnailUrl": "https://lh3.googleusercontent.com/d/1-HaEq8eFE_Kl3BOnJHkdg136AwFKNh3u=w800",
    "driveViewUrl": "https://drive.google.com/file/d/1-HaEq8eFE_Kl3BOnJHkdg136AwFKNh3u/view",
    "driveFolderUrl": "https://drive.google.com/drive/folders/1f8muAhgEsBdfu2gyRpjbPKIjae-eTFgW"
  },
  {
    "id": "newsroom-photo-6",
    "driveId": "173o6lbnH4ELAzIlP2EOiY9pQ9iPGRSUS",
    "fileName": "DSC07860.JPG",
    "title": "PCR Director Intercom & Tally System Console (Ref #6)",
    "category": "newsrooms",
    "categoryLabel": "Newsroom & PCR Photo",
    "description": "Authentic photograph from the Jaya TV network production facility and Muthamizh Academy practical training floor.",
    "specs": [
      "High-Res Digital Capture",
      "Jaya TV Network Floor",
      "Hands-On Facility",
      "Muthamizh Academy"
    ],
    "location": "Jaya TV Studio Campus, Chennai",
    "mediaType": "image",
    "image": "https://lh3.googleusercontent.com/d/173o6lbnH4ELAzIlP2EOiY9pQ9iPGRSUS",
    "thumbnailUrl": "https://lh3.googleusercontent.com/d/173o6lbnH4ELAzIlP2EOiY9pQ9iPGRSUS=w800",
    "driveViewUrl": "https://drive.google.com/file/d/173o6lbnH4ELAzIlP2EOiY9pQ9iPGRSUS/view",
    "driveFolderUrl": "https://drive.google.com/drive/folders/1f8muAhgEsBdfu2gyRpjbPKIjae-eTFgW"
  },
  {
    "id": "newsroom-photo-7",
    "driveId": "1B17kLh8FDwdjSi8GPRIKwPQZOt9PhY3F",
    "fileName": "DSC07861.JPG",
    "title": "Live Debate Set with Multi-Angle Dynamic Staging (Ref #7)",
    "category": "newsrooms",
    "categoryLabel": "Newsroom & PCR Photo",
    "description": "Authentic photograph from the Jaya TV network production facility and Muthamizh Academy practical training floor.",
    "specs": [
      "High-Res Digital Capture",
      "Jaya TV Network Floor",
      "Hands-On Facility",
      "Muthamizh Academy"
    ],
    "location": "Jaya TV Studio Campus, Chennai",
    "mediaType": "image",
    "image": "https://lh3.googleusercontent.com/d/1B17kLh8FDwdjSi8GPRIKwPQZOt9PhY3F",
    "thumbnailUrl": "https://lh3.googleusercontent.com/d/1B17kLh8FDwdjSi8GPRIKwPQZOt9PhY3F=w800",
    "driveViewUrl": "https://drive.google.com/file/d/1B17kLh8FDwdjSi8GPRIKwPQZOt9PhY3F/view",
    "driveFolderUrl": "https://drive.google.com/drive/folders/1f8muAhgEsBdfu2gyRpjbPKIjae-eTFgW"
  },
  {
    "id": "newsroom-photo-8",
    "driveId": "14LDNy1PQrbN57IZ3Gmb9zuSSLQUQMG-k",
    "fileName": "DSC07862.JPG",
    "title": "Electronic News Gathering (ENG) Central Rundown Hub (Ref #8)",
    "category": "newsrooms",
    "categoryLabel": "Newsroom & PCR Photo",
    "description": "Authentic photograph from the Jaya TV network production facility and Muthamizh Academy practical training floor.",
    "specs": [
      "High-Res Digital Capture",
      "Jaya TV Network Floor",
      "Hands-On Facility",
      "Muthamizh Academy"
    ],
    "location": "Jaya TV Studio Campus, Chennai",
    "mediaType": "image",
    "image": "https://lh3.googleusercontent.com/d/14LDNy1PQrbN57IZ3Gmb9zuSSLQUQMG-k",
    "thumbnailUrl": "https://lh3.googleusercontent.com/d/14LDNy1PQrbN57IZ3Gmb9zuSSLQUQMG-k=w800",
    "driveViewUrl": "https://drive.google.com/file/d/14LDNy1PQrbN57IZ3Gmb9zuSSLQUQMG-k/view",
    "driveFolderUrl": "https://drive.google.com/drive/folders/1f8muAhgEsBdfu2gyRpjbPKIjae-eTFgW"
  },
  {
    "id": "newsroom-photo-9",
    "driveId": "1SpzoXRUEwTg1cQVaQBcyAyUhtSVHqR-4",
    "fileName": "DSC07863.JPG",
    "title": "Avid iNews Editorial & Script Teleprompter Station (Ref #9)",
    "category": "newsrooms",
    "categoryLabel": "Newsroom & PCR Photo",
    "description": "Authentic photograph from the Jaya TV network production facility and Muthamizh Academy practical training floor.",
    "specs": [
      "High-Res Digital Capture",
      "Jaya TV Network Floor",
      "Hands-On Facility",
      "Muthamizh Academy"
    ],
    "location": "Jaya TV Studio Campus, Chennai",
    "mediaType": "image",
    "image": "https://lh3.googleusercontent.com/d/1SpzoXRUEwTg1cQVaQBcyAyUhtSVHqR-4",
    "thumbnailUrl": "https://lh3.googleusercontent.com/d/1SpzoXRUEwTg1cQVaQBcyAyUhtSVHqR-4=w800",
    "driveViewUrl": "https://drive.google.com/file/d/1SpzoXRUEwTg1cQVaQBcyAyUhtSVHqR-4/view",
    "driveFolderUrl": "https://drive.google.com/drive/folders/1f8muAhgEsBdfu2gyRpjbPKIjae-eTFgW"
  },
  {
    "id": "newsroom-photo-10",
    "driveId": "1MB-mFnrApTD82HZ7yRn8ja-PI2Jd7Hj6",
    "fileName": "DSC07864.JPG",
    "title": "Soundcraft Broadcast Audio Mixer & Compressor Rack (Ref #10)",
    "category": "newsrooms",
    "categoryLabel": "Newsroom & PCR Photo",
    "description": "Authentic photograph from the Jaya TV network production facility and Muthamizh Academy practical training floor.",
    "specs": [
      "High-Res Digital Capture",
      "Jaya TV Network Floor",
      "Hands-On Facility",
      "Muthamizh Academy"
    ],
    "location": "Jaya TV Studio Campus, Chennai",
    "mediaType": "image",
    "image": "https://lh3.googleusercontent.com/d/1MB-mFnrApTD82HZ7yRn8ja-PI2Jd7Hj6",
    "thumbnailUrl": "https://lh3.googleusercontent.com/d/1MB-mFnrApTD82HZ7yRn8ja-PI2Jd7Hj6=w800",
    "driveViewUrl": "https://drive.google.com/file/d/1MB-mFnrApTD82HZ7yRn8ja-PI2Jd7Hj6/view",
    "driveFolderUrl": "https://drive.google.com/drive/folders/1f8muAhgEsBdfu2gyRpjbPKIjae-eTFgW"
  },
  {
    "id": "newsroom-photo-11",
    "driveId": "1-qxG8cRq5ynKwSxZYqtqo405-FP-LxC2",
    "fileName": "DSC07865.JPG",
    "title": "Master Control Room (MCR) Playout Automation Racks (Ref #11)",
    "category": "newsrooms",
    "categoryLabel": "Newsroom & PCR Photo",
    "description": "Authentic photograph from the Jaya TV network production facility and Muthamizh Academy practical training floor.",
    "specs": [
      "High-Res Digital Capture",
      "Jaya TV Network Floor",
      "Hands-On Facility",
      "Muthamizh Academy"
    ],
    "location": "Jaya TV Studio Campus, Chennai",
    "mediaType": "image",
    "image": "https://lh3.googleusercontent.com/d/1-qxG8cRq5ynKwSxZYqtqo405-FP-LxC2",
    "thumbnailUrl": "https://lh3.googleusercontent.com/d/1-qxG8cRq5ynKwSxZYqtqo405-FP-LxC2=w800",
    "driveViewUrl": "https://drive.google.com/file/d/1-qxG8cRq5ynKwSxZYqtqo405-FP-LxC2/view",
    "driveFolderUrl": "https://drive.google.com/drive/folders/1f8muAhgEsBdfu2gyRpjbPKIjae-eTFgW"
  },
  {
    "id": "newsroom-photo-12",
    "driveId": "1iBvk0EmnL6zN4YW6stXu0rSzIm0AyCnB",
    "fileName": "DSC07866.JPG",
    "title": "Mavis Satcom Satellite Dish Array & Teleport Hub (Ref #12)",
    "category": "newsrooms",
    "categoryLabel": "Newsroom & PCR Photo",
    "description": "Authentic photograph from the Jaya TV network production facility and Muthamizh Academy practical training floor.",
    "specs": [
      "High-Res Digital Capture",
      "Jaya TV Network Floor",
      "Hands-On Facility",
      "Muthamizh Academy"
    ],
    "location": "Jaya TV Studio Campus, Chennai",
    "mediaType": "image",
    "image": "https://lh3.googleusercontent.com/d/1iBvk0EmnL6zN4YW6stXu0rSzIm0AyCnB",
    "thumbnailUrl": "https://lh3.googleusercontent.com/d/1iBvk0EmnL6zN4YW6stXu0rSzIm0AyCnB=w800",
    "driveViewUrl": "https://drive.google.com/file/d/1iBvk0EmnL6zN4YW6stXu0rSzIm0AyCnB/view",
    "driveFolderUrl": "https://drive.google.com/drive/folders/1f8muAhgEsBdfu2gyRpjbPKIjae-eTFgW"
  },
  {
    "id": "newsroom-photo-13",
    "driveId": "1iADXq-Xh4LeWSYEBImsHrBAGleJ8Wk6I",
    "fileName": "DSC07867.JPG",
    "title": "High-Resolution Studio Video Wall Dynamic Background (Ref #13)",
    "category": "newsrooms",
    "categoryLabel": "Newsroom & PCR Photo",
    "description": "Authentic photograph from the Jaya TV network production facility and Muthamizh Academy practical training floor.",
    "specs": [
      "High-Res Digital Capture",
      "Jaya TV Network Floor",
      "Hands-On Facility",
      "Muthamizh Academy"
    ],
    "location": "Jaya TV Studio Campus, Chennai",
    "mediaType": "image",
    "image": "https://lh3.googleusercontent.com/d/1iADXq-Xh4LeWSYEBImsHrBAGleJ8Wk6I",
    "thumbnailUrl": "https://lh3.googleusercontent.com/d/1iADXq-Xh4LeWSYEBImsHrBAGleJ8Wk6I=w800",
    "driveViewUrl": "https://drive.google.com/file/d/1iADXq-Xh4LeWSYEBImsHrBAGleJ8Wk6I/view",
    "driveFolderUrl": "https://drive.google.com/drive/folders/1f8muAhgEsBdfu2gyRpjbPKIjae-eTFgW"
  },
  {
    "id": "newsroom-photo-14",
    "driveId": "1IFFzuTXARjHmVPdyFTjto2Ui0t4TmfLT",
    "fileName": "DSC07868.JPG",
    "title": "Live Broadcast Teleprompter Mirror & Monitor Optics (Ref #14)",
    "category": "newsrooms",
    "categoryLabel": "Newsroom & PCR Photo",
    "description": "Authentic photograph from the Jaya TV network production facility and Muthamizh Academy practical training floor.",
    "specs": [
      "High-Res Digital Capture",
      "Jaya TV Network Floor",
      "Hands-On Facility",
      "Muthamizh Academy"
    ],
    "location": "Jaya TV Studio Campus, Chennai",
    "mediaType": "image",
    "image": "https://lh3.googleusercontent.com/d/1IFFzuTXARjHmVPdyFTjto2Ui0t4TmfLT",
    "thumbnailUrl": "https://lh3.googleusercontent.com/d/1IFFzuTXARjHmVPdyFTjto2Ui0t4TmfLT=w800",
    "driveViewUrl": "https://drive.google.com/file/d/1IFFzuTXARjHmVPdyFTjto2Ui0t4TmfLT/view",
    "driveFolderUrl": "https://drive.google.com/drive/folders/1f8muAhgEsBdfu2gyRpjbPKIjae-eTFgW"
  },
  {
    "id": "newsroom-photo-15",
    "driveId": "1frFyoRDst8sE4RizscrOzNE3s89nkJZK",
    "fileName": "DSC07869.JPG",
    "title": "Virtual Production Curved Chroma Cyclorama Floor (Ref #15)",
    "category": "newsrooms",
    "categoryLabel": "Newsroom & PCR Photo",
    "description": "Authentic photograph from the Jaya TV network production facility and Muthamizh Academy practical training floor.",
    "specs": [
      "High-Res Digital Capture",
      "Jaya TV Network Floor",
      "Hands-On Facility",
      "Muthamizh Academy"
    ],
    "location": "Jaya TV Studio Campus, Chennai",
    "mediaType": "image",
    "image": "https://lh3.googleusercontent.com/d/1frFyoRDst8sE4RizscrOzNE3s89nkJZK",
    "thumbnailUrl": "https://lh3.googleusercontent.com/d/1frFyoRDst8sE4RizscrOzNE3s89nkJZK=w800",
    "driveViewUrl": "https://drive.google.com/file/d/1frFyoRDst8sE4RizscrOzNE3s89nkJZK/view",
    "driveFolderUrl": "https://drive.google.com/drive/folders/1f8muAhgEsBdfu2gyRpjbPKIjae-eTFgW"
  },
  {
    "id": "newsroom-photo-16",
    "driveId": "1CV_ljVhk7Qa85CsKcp7AJglOriu9YlFL",
    "fileName": "DSC07870.JPG",
    "title": "Camera 2 Robotic Pan-Tilt Track Mount (Ref #16)",
    "category": "newsrooms",
    "categoryLabel": "Newsroom & PCR Photo",
    "description": "Authentic photograph from the Jaya TV network production facility and Muthamizh Academy practical training floor.",
    "specs": [
      "High-Res Digital Capture",
      "Jaya TV Network Floor",
      "Hands-On Facility",
      "Muthamizh Academy"
    ],
    "location": "Jaya TV Studio Campus, Chennai",
    "mediaType": "image",
    "image": "https://lh3.googleusercontent.com/d/1CV_ljVhk7Qa85CsKcp7AJglOriu9YlFL",
    "thumbnailUrl": "https://lh3.googleusercontent.com/d/1CV_ljVhk7Qa85CsKcp7AJglOriu9YlFL=w800",
    "driveViewUrl": "https://drive.google.com/file/d/1CV_ljVhk7Qa85CsKcp7AJglOriu9YlFL/view",
    "driveFolderUrl": "https://drive.google.com/drive/folders/1f8muAhgEsBdfu2gyRpjbPKIjae-eTFgW"
  },
  {
    "id": "newsroom-photo-17",
    "driveId": "1SBQWmTwQ5T7isctEQ2zKKnEse3W2d-o3",
    "fileName": "DSC07871.JPG",
    "title": "Floor Director View of Live News Bulletin Recording (Ref #17)",
    "category": "newsrooms",
    "categoryLabel": "Newsroom & PCR Photo",
    "description": "Authentic photograph from the Jaya TV network production facility and Muthamizh Academy practical training floor.",
    "specs": [
      "High-Res Digital Capture",
      "Jaya TV Network Floor",
      "Hands-On Facility",
      "Muthamizh Academy"
    ],
    "location": "Jaya TV Studio Campus, Chennai",
    "mediaType": "image",
    "image": "https://lh3.googleusercontent.com/d/1SBQWmTwQ5T7isctEQ2zKKnEse3W2d-o3",
    "thumbnailUrl": "https://lh3.googleusercontent.com/d/1SBQWmTwQ5T7isctEQ2zKKnEse3W2d-o3=w800",
    "driveViewUrl": "https://drive.google.com/file/d/1SBQWmTwQ5T7isctEQ2zKKnEse3W2d-o3/view",
    "driveFolderUrl": "https://drive.google.com/drive/folders/1f8muAhgEsBdfu2gyRpjbPKIjae-eTFgW"
  },
  {
    "id": "newsroom-photo-18",
    "driveId": "18RP-K8bzWdtbJ0XWVvHv0ydRtxymilSF",
    "fileName": "DSC07872.JPG",
    "title": "Central Apparatus Room (CAR) Fiber Patch Panels (Ref #18)",
    "category": "newsrooms",
    "categoryLabel": "Newsroom & PCR Photo",
    "description": "Authentic photograph from the Jaya TV network production facility and Muthamizh Academy practical training floor.",
    "specs": [
      "High-Res Digital Capture",
      "Jaya TV Network Floor",
      "Hands-On Facility",
      "Muthamizh Academy"
    ],
    "location": "Jaya TV Studio Campus, Chennai",
    "mediaType": "image",
    "image": "https://lh3.googleusercontent.com/d/18RP-K8bzWdtbJ0XWVvHv0ydRtxymilSF",
    "thumbnailUrl": "https://lh3.googleusercontent.com/d/18RP-K8bzWdtbJ0XWVvHv0ydRtxymilSF=w800",
    "driveViewUrl": "https://drive.google.com/file/d/18RP-K8bzWdtbJ0XWVvHv0ydRtxymilSF/view",
    "driveFolderUrl": "https://drive.google.com/drive/folders/1f8muAhgEsBdfu2gyRpjbPKIjae-eTFgW"
  },
  {
    "id": "newsroom-photo-19",
    "driveId": "1IxhYoyjz0eMZ7YiRc2Lo0QyIm-ylPtZU",
    "fileName": "DSC07873.JPG",
    "title": "Multi-Camera Color Balance & Shading Control Units (Ref #19)",
    "category": "newsrooms",
    "categoryLabel": "Newsroom & PCR Photo",
    "description": "Authentic photograph from the Jaya TV network production facility and Muthamizh Academy practical training floor.",
    "specs": [
      "High-Res Digital Capture",
      "Jaya TV Network Floor",
      "Hands-On Facility",
      "Muthamizh Academy"
    ],
    "location": "Jaya TV Studio Campus, Chennai",
    "mediaType": "image",
    "image": "https://lh3.googleusercontent.com/d/1IxhYoyjz0eMZ7YiRc2Lo0QyIm-ylPtZU",
    "thumbnailUrl": "https://lh3.googleusercontent.com/d/1IxhYoyjz0eMZ7YiRc2Lo0QyIm-ylPtZU=w800",
    "driveViewUrl": "https://drive.google.com/file/d/1IxhYoyjz0eMZ7YiRc2Lo0QyIm-ylPtZU/view",
    "driveFolderUrl": "https://drive.google.com/drive/folders/1f8muAhgEsBdfu2gyRpjbPKIjae-eTFgW"
  },
  {
    "id": "newsroom-photo-20",
    "driveId": "1gS_h7zs5RTM7Q4bty-_2qZJv2aQpFyWE",
    "fileName": "DSC07874.JPG",
    "title": "News Graphics Character Generator & Lower Third Deck (Ref #20)",
    "category": "newsrooms",
    "categoryLabel": "Newsroom & PCR Photo",
    "description": "Authentic photograph from the Jaya TV network production facility and Muthamizh Academy practical training floor.",
    "specs": [
      "High-Res Digital Capture",
      "Jaya TV Network Floor",
      "Hands-On Facility",
      "Muthamizh Academy"
    ],
    "location": "Jaya TV Studio Campus, Chennai",
    "mediaType": "image",
    "image": "https://lh3.googleusercontent.com/d/1gS_h7zs5RTM7Q4bty-_2qZJv2aQpFyWE",
    "thumbnailUrl": "https://lh3.googleusercontent.com/d/1gS_h7zs5RTM7Q4bty-_2qZJv2aQpFyWE=w800",
    "driveViewUrl": "https://drive.google.com/file/d/1gS_h7zs5RTM7Q4bty-_2qZJv2aQpFyWE/view",
    "driveFolderUrl": "https://drive.google.com/drive/folders/1f8muAhgEsBdfu2gyRpjbPKIjae-eTFgW"
  },
  {
    "id": "newsroom-photo-21",
    "driveId": "1cft1RQo0SNf-HKeJ1ll10mEFsXtak6hG",
    "fileName": "DSC07875.JPG",
    "title": "Studio Floor A Multi-Pedestal Camera Lineup (Ref #21)",
    "category": "newsrooms",
    "categoryLabel": "Newsroom & PCR Photo",
    "description": "Authentic photograph from the Jaya TV network production facility and Muthamizh Academy practical training floor.",
    "specs": [
      "High-Res Digital Capture",
      "Jaya TV Network Floor",
      "Hands-On Facility",
      "Muthamizh Academy"
    ],
    "location": "Jaya TV Studio Campus, Chennai",
    "mediaType": "image",
    "image": "https://lh3.googleusercontent.com/d/1cft1RQo0SNf-HKeJ1ll10mEFsXtak6hG",
    "thumbnailUrl": "https://lh3.googleusercontent.com/d/1cft1RQo0SNf-HKeJ1ll10mEFsXtak6hG=w800",
    "driveViewUrl": "https://drive.google.com/file/d/1cft1RQo0SNf-HKeJ1ll10mEFsXtak6hG/view",
    "driveFolderUrl": "https://drive.google.com/drive/folders/1f8muAhgEsBdfu2gyRpjbPKIjae-eTFgW"
  },
  {
    "id": "newsroom-photo-22",
    "driveId": "1sgEfuM7sF752kjFmqxMM5R3rnBVviOFG",
    "fileName": "DSC07876.JPG",
    "title": "PCR Vision Mixing Console & Multi-Screen Monitor Wall (Ref #22)",
    "category": "newsrooms",
    "categoryLabel": "Newsroom & PCR Photo",
    "description": "Authentic photograph from the Jaya TV network production facility and Muthamizh Academy practical training floor.",
    "specs": [
      "High-Res Digital Capture",
      "Jaya TV Network Floor",
      "Hands-On Facility",
      "Muthamizh Academy"
    ],
    "location": "Jaya TV Studio Campus, Chennai",
    "mediaType": "image",
    "image": "https://lh3.googleusercontent.com/d/1sgEfuM7sF752kjFmqxMM5R3rnBVviOFG",
    "thumbnailUrl": "https://lh3.googleusercontent.com/d/1sgEfuM7sF752kjFmqxMM5R3rnBVviOFG=w800",
    "driveViewUrl": "https://drive.google.com/file/d/1sgEfuM7sF752kjFmqxMM5R3rnBVviOFG/view",
    "driveFolderUrl": "https://drive.google.com/drive/folders/1f8muAhgEsBdfu2gyRpjbPKIjae-eTFgW"
  },
  {
    "id": "newsroom-photo-23",
    "driveId": "1fjm8W-NSBR9QXSMk692XoMhWN_HizImf",
    "fileName": "DSC07877.JPG",
    "title": "Prime-Time Newsroom Anchor Desk & Teleprompter (Ref #23)",
    "category": "newsrooms",
    "categoryLabel": "Newsroom & PCR Photo",
    "description": "Authentic photograph from the Jaya TV network production facility and Muthamizh Academy practical training floor.",
    "specs": [
      "High-Res Digital Capture",
      "Jaya TV Network Floor",
      "Hands-On Facility",
      "Muthamizh Academy"
    ],
    "location": "Jaya TV Studio Campus, Chennai",
    "mediaType": "image",
    "image": "https://lh3.googleusercontent.com/d/1fjm8W-NSBR9QXSMk692XoMhWN_HizImf",
    "thumbnailUrl": "https://lh3.googleusercontent.com/d/1fjm8W-NSBR9QXSMk692XoMhWN_HizImf=w800",
    "driveViewUrl": "https://drive.google.com/file/d/1fjm8W-NSBR9QXSMk692XoMhWN_HizImf/view",
    "driveFolderUrl": "https://drive.google.com/drive/folders/1f8muAhgEsBdfu2gyRpjbPKIjae-eTFgW"
  },
  {
    "id": "newsroom-photo-24",
    "driveId": "1z51xZATb6FUfJhrzEvrSyT67_LXl8EPc",
    "fileName": "DSC07878.JPG",
    "title": "Broadcast DMX Dimmer Rack & High-Bay Lighting (Ref #24)",
    "category": "newsrooms",
    "categoryLabel": "Newsroom & PCR Photo",
    "description": "Authentic photograph from the Jaya TV network production facility and Muthamizh Academy practical training floor.",
    "specs": [
      "High-Res Digital Capture",
      "Jaya TV Network Floor",
      "Hands-On Facility",
      "Muthamizh Academy"
    ],
    "location": "Jaya TV Studio Campus, Chennai",
    "mediaType": "image",
    "image": "https://lh3.googleusercontent.com/d/1z51xZATb6FUfJhrzEvrSyT67_LXl8EPc",
    "thumbnailUrl": "https://lh3.googleusercontent.com/d/1z51xZATb6FUfJhrzEvrSyT67_LXl8EPc=w800",
    "driveViewUrl": "https://drive.google.com/file/d/1z51xZATb6FUfJhrzEvrSyT67_LXl8EPc/view",
    "driveFolderUrl": "https://drive.google.com/drive/folders/1f8muAhgEsBdfu2gyRpjbPKIjae-eTFgW"
  },
  {
    "id": "newsroom-photo-25",
    "driveId": "1NnPiTE9D1QrzyM3hH44RpEXwHoTc-J1i",
    "fileName": "DSC07879.JPG",
    "title": "Camera 1 Studio Pedestal Rig & Viewfinder (Ref #25)",
    "category": "newsrooms",
    "categoryLabel": "Newsroom & PCR Photo",
    "description": "Authentic photograph from the Jaya TV network production facility and Muthamizh Academy practical training floor.",
    "specs": [
      "High-Res Digital Capture",
      "Jaya TV Network Floor",
      "Hands-On Facility",
      "Muthamizh Academy"
    ],
    "location": "Jaya TV Studio Campus, Chennai",
    "mediaType": "image",
    "image": "https://lh3.googleusercontent.com/d/1NnPiTE9D1QrzyM3hH44RpEXwHoTc-J1i",
    "thumbnailUrl": "https://lh3.googleusercontent.com/d/1NnPiTE9D1QrzyM3hH44RpEXwHoTc-J1i=w800",
    "driveViewUrl": "https://drive.google.com/file/d/1NnPiTE9D1QrzyM3hH44RpEXwHoTc-J1i/view",
    "driveFolderUrl": "https://drive.google.com/drive/folders/1f8muAhgEsBdfu2gyRpjbPKIjae-eTFgW"
  },
  {
    "id": "newsroom-photo-26",
    "driveId": "1O1ZLUtjeeKCPFkTPnCm0hRg7Wd7oG884",
    "fileName": "DSC07880.JPG",
    "title": "PCR Director Intercom & Tally System Console (Ref #26)",
    "category": "newsrooms",
    "categoryLabel": "Newsroom & PCR Photo",
    "description": "Authentic photograph from the Jaya TV network production facility and Muthamizh Academy practical training floor.",
    "specs": [
      "High-Res Digital Capture",
      "Jaya TV Network Floor",
      "Hands-On Facility",
      "Muthamizh Academy"
    ],
    "location": "Jaya TV Studio Campus, Chennai",
    "mediaType": "image",
    "image": "https://lh3.googleusercontent.com/d/1O1ZLUtjeeKCPFkTPnCm0hRg7Wd7oG884",
    "thumbnailUrl": "https://lh3.googleusercontent.com/d/1O1ZLUtjeeKCPFkTPnCm0hRg7Wd7oG884=w800",
    "driveViewUrl": "https://drive.google.com/file/d/1O1ZLUtjeeKCPFkTPnCm0hRg7Wd7oG884/view",
    "driveFolderUrl": "https://drive.google.com/drive/folders/1f8muAhgEsBdfu2gyRpjbPKIjae-eTFgW"
  },
  {
    "id": "newsroom-photo-27",
    "driveId": "1ZZ3QADJypfhyY_xbwP0yPK-1fZH6mL9c",
    "fileName": "DSC07881.JPG",
    "title": "Live Debate Set with Multi-Angle Dynamic Staging (Ref #27)",
    "category": "newsrooms",
    "categoryLabel": "Newsroom & PCR Photo",
    "description": "Authentic photograph from the Jaya TV network production facility and Muthamizh Academy practical training floor.",
    "specs": [
      "High-Res Digital Capture",
      "Jaya TV Network Floor",
      "Hands-On Facility",
      "Muthamizh Academy"
    ],
    "location": "Jaya TV Studio Campus, Chennai",
    "mediaType": "image",
    "image": "https://lh3.googleusercontent.com/d/1ZZ3QADJypfhyY_xbwP0yPK-1fZH6mL9c",
    "thumbnailUrl": "https://lh3.googleusercontent.com/d/1ZZ3QADJypfhyY_xbwP0yPK-1fZH6mL9c=w800",
    "driveViewUrl": "https://drive.google.com/file/d/1ZZ3QADJypfhyY_xbwP0yPK-1fZH6mL9c/view",
    "driveFolderUrl": "https://drive.google.com/drive/folders/1f8muAhgEsBdfu2gyRpjbPKIjae-eTFgW"
  },
  {
    "id": "newsroom-photo-28",
    "driveId": "16T4Tt3lEUbGQf1-RWMyW4IrPfBD7XU8-",
    "fileName": "DSC07882.JPG",
    "title": "Electronic News Gathering (ENG) Central Rundown Hub (Ref #28)",
    "category": "newsrooms",
    "categoryLabel": "Newsroom & PCR Photo",
    "description": "Authentic photograph from the Jaya TV network production facility and Muthamizh Academy practical training floor.",
    "specs": [
      "High-Res Digital Capture",
      "Jaya TV Network Floor",
      "Hands-On Facility",
      "Muthamizh Academy"
    ],
    "location": "Jaya TV Studio Campus, Chennai",
    "mediaType": "image",
    "image": "https://lh3.googleusercontent.com/d/16T4Tt3lEUbGQf1-RWMyW4IrPfBD7XU8-",
    "thumbnailUrl": "https://lh3.googleusercontent.com/d/16T4Tt3lEUbGQf1-RWMyW4IrPfBD7XU8-=w800",
    "driveViewUrl": "https://drive.google.com/file/d/16T4Tt3lEUbGQf1-RWMyW4IrPfBD7XU8-/view",
    "driveFolderUrl": "https://drive.google.com/drive/folders/1f8muAhgEsBdfu2gyRpjbPKIjae-eTFgW"
  },
  {
    "id": "newsroom-photo-29",
    "driveId": "1J4HbDHI07DBB-asixmm54W2kTozViXrb",
    "fileName": "DSC07883.JPG",
    "title": "Avid iNews Editorial & Script Teleprompter Station (Ref #29)",
    "category": "newsrooms",
    "categoryLabel": "Newsroom & PCR Photo",
    "description": "Authentic photograph from the Jaya TV network production facility and Muthamizh Academy practical training floor.",
    "specs": [
      "High-Res Digital Capture",
      "Jaya TV Network Floor",
      "Hands-On Facility",
      "Muthamizh Academy"
    ],
    "location": "Jaya TV Studio Campus, Chennai",
    "mediaType": "image",
    "image": "https://lh3.googleusercontent.com/d/1J4HbDHI07DBB-asixmm54W2kTozViXrb",
    "thumbnailUrl": "https://lh3.googleusercontent.com/d/1J4HbDHI07DBB-asixmm54W2kTozViXrb=w800",
    "driveViewUrl": "https://drive.google.com/file/d/1J4HbDHI07DBB-asixmm54W2kTozViXrb/view",
    "driveFolderUrl": "https://drive.google.com/drive/folders/1f8muAhgEsBdfu2gyRpjbPKIjae-eTFgW"
  },
  {
    "id": "newsroom-photo-30",
    "driveId": "1Fs--ENyPukEC_y-jkBKQg9WtAKgy2eUG",
    "fileName": "DSC07884.JPG",
    "title": "Soundcraft Broadcast Audio Mixer & Compressor Rack (Ref #30)",
    "category": "newsrooms",
    "categoryLabel": "Newsroom & PCR Photo",
    "description": "Authentic photograph from the Jaya TV network production facility and Muthamizh Academy practical training floor.",
    "specs": [
      "High-Res Digital Capture",
      "Jaya TV Network Floor",
      "Hands-On Facility",
      "Muthamizh Academy"
    ],
    "location": "Jaya TV Studio Campus, Chennai",
    "mediaType": "image",
    "image": "https://lh3.googleusercontent.com/d/1Fs--ENyPukEC_y-jkBKQg9WtAKgy2eUG",
    "thumbnailUrl": "https://lh3.googleusercontent.com/d/1Fs--ENyPukEC_y-jkBKQg9WtAKgy2eUG=w800",
    "driveViewUrl": "https://drive.google.com/file/d/1Fs--ENyPukEC_y-jkBKQg9WtAKgy2eUG/view",
    "driveFolderUrl": "https://drive.google.com/drive/folders/1f8muAhgEsBdfu2gyRpjbPKIjae-eTFgW"
  },
  {
    "id": "newsroom-photo-31",
    "driveId": "1Vj6QxrIJsT1eFdYCYBEL9H0G2ActNBWD",
    "fileName": "DSC07885.JPG",
    "title": "Master Control Room (MCR) Playout Automation Racks (Ref #31)",
    "category": "newsrooms",
    "categoryLabel": "Newsroom & PCR Photo",
    "description": "Authentic photograph from the Jaya TV network production facility and Muthamizh Academy practical training floor.",
    "specs": [
      "High-Res Digital Capture",
      "Jaya TV Network Floor",
      "Hands-On Facility",
      "Muthamizh Academy"
    ],
    "location": "Jaya TV Studio Campus, Chennai",
    "mediaType": "image",
    "image": "https://lh3.googleusercontent.com/d/1Vj6QxrIJsT1eFdYCYBEL9H0G2ActNBWD",
    "thumbnailUrl": "https://lh3.googleusercontent.com/d/1Vj6QxrIJsT1eFdYCYBEL9H0G2ActNBWD=w800",
    "driveViewUrl": "https://drive.google.com/file/d/1Vj6QxrIJsT1eFdYCYBEL9H0G2ActNBWD/view",
    "driveFolderUrl": "https://drive.google.com/drive/folders/1f8muAhgEsBdfu2gyRpjbPKIjae-eTFgW"
  },
  {
    "id": "newsroom-photo-32",
    "driveId": "1hMbE109KmpqAqkzxWmhqB8JHkdKubs-s",
    "fileName": "DSC07886.JPG",
    "title": "Mavis Satcom Satellite Dish Array & Teleport Hub (Ref #32)",
    "category": "newsrooms",
    "categoryLabel": "Newsroom & PCR Photo",
    "description": "Authentic photograph from the Jaya TV network production facility and Muthamizh Academy practical training floor.",
    "specs": [
      "High-Res Digital Capture",
      "Jaya TV Network Floor",
      "Hands-On Facility",
      "Muthamizh Academy"
    ],
    "location": "Jaya TV Studio Campus, Chennai",
    "mediaType": "image",
    "image": "https://lh3.googleusercontent.com/d/1hMbE109KmpqAqkzxWmhqB8JHkdKubs-s",
    "thumbnailUrl": "https://lh3.googleusercontent.com/d/1hMbE109KmpqAqkzxWmhqB8JHkdKubs-s=w800",
    "driveViewUrl": "https://drive.google.com/file/d/1hMbE109KmpqAqkzxWmhqB8JHkdKubs-s/view",
    "driveFolderUrl": "https://drive.google.com/drive/folders/1f8muAhgEsBdfu2gyRpjbPKIjae-eTFgW"
  },
  {
    "id": "newsroom-photo-33",
    "driveId": "1BZolGTt2_MvUFS_iq9-SAAFD5uU2KSvS",
    "fileName": "DSC07887.JPG",
    "title": "High-Resolution Studio Video Wall Dynamic Background (Ref #33)",
    "category": "newsrooms",
    "categoryLabel": "Newsroom & PCR Photo",
    "description": "Authentic photograph from the Jaya TV network production facility and Muthamizh Academy practical training floor.",
    "specs": [
      "High-Res Digital Capture",
      "Jaya TV Network Floor",
      "Hands-On Facility",
      "Muthamizh Academy"
    ],
    "location": "Jaya TV Studio Campus, Chennai",
    "mediaType": "image",
    "image": "https://lh3.googleusercontent.com/d/1BZolGTt2_MvUFS_iq9-SAAFD5uU2KSvS",
    "thumbnailUrl": "https://lh3.googleusercontent.com/d/1BZolGTt2_MvUFS_iq9-SAAFD5uU2KSvS=w800",
    "driveViewUrl": "https://drive.google.com/file/d/1BZolGTt2_MvUFS_iq9-SAAFD5uU2KSvS/view",
    "driveFolderUrl": "https://drive.google.com/drive/folders/1f8muAhgEsBdfu2gyRpjbPKIjae-eTFgW"
  },
  {
    "id": "newsroom-photo-34",
    "driveId": "1Ap0UzEkxA-eC_5vrpgK2DPYFcG58aukq",
    "fileName": "DSC07888.JPG",
    "title": "Live Broadcast Teleprompter Mirror & Monitor Optics (Ref #34)",
    "category": "newsrooms",
    "categoryLabel": "Newsroom & PCR Photo",
    "description": "Authentic photograph from the Jaya TV network production facility and Muthamizh Academy practical training floor.",
    "specs": [
      "High-Res Digital Capture",
      "Jaya TV Network Floor",
      "Hands-On Facility",
      "Muthamizh Academy"
    ],
    "location": "Jaya TV Studio Campus, Chennai",
    "mediaType": "image",
    "image": "https://lh3.googleusercontent.com/d/1Ap0UzEkxA-eC_5vrpgK2DPYFcG58aukq",
    "thumbnailUrl": "https://lh3.googleusercontent.com/d/1Ap0UzEkxA-eC_5vrpgK2DPYFcG58aukq=w800",
    "driveViewUrl": "https://drive.google.com/file/d/1Ap0UzEkxA-eC_5vrpgK2DPYFcG58aukq/view",
    "driveFolderUrl": "https://drive.google.com/drive/folders/1f8muAhgEsBdfu2gyRpjbPKIjae-eTFgW"
  },
  {
    "id": "newsroom-photo-35",
    "driveId": "1IoSXeyBifvLAPq9janRcAf7SRTm7FEKx",
    "fileName": "DSC07889.JPG",
    "title": "Virtual Production Curved Chroma Cyclorama Floor (Ref #35)",
    "category": "newsrooms",
    "categoryLabel": "Newsroom & PCR Photo",
    "description": "Authentic photograph from the Jaya TV network production facility and Muthamizh Academy practical training floor.",
    "specs": [
      "High-Res Digital Capture",
      "Jaya TV Network Floor",
      "Hands-On Facility",
      "Muthamizh Academy"
    ],
    "location": "Jaya TV Studio Campus, Chennai",
    "mediaType": "image",
    "image": "https://lh3.googleusercontent.com/d/1IoSXeyBifvLAPq9janRcAf7SRTm7FEKx",
    "thumbnailUrl": "https://lh3.googleusercontent.com/d/1IoSXeyBifvLAPq9janRcAf7SRTm7FEKx=w800",
    "driveViewUrl": "https://drive.google.com/file/d/1IoSXeyBifvLAPq9janRcAf7SRTm7FEKx/view",
    "driveFolderUrl": "https://drive.google.com/drive/folders/1f8muAhgEsBdfu2gyRpjbPKIjae-eTFgW"
  },
  {
    "id": "newsroom-photo-36",
    "driveId": "1-lkVfKgYId_sDkNyYx2YAunIpibKQLr5",
    "fileName": "DSC07890.JPG",
    "title": "Camera 2 Robotic Pan-Tilt Track Mount (Ref #36)",
    "category": "newsrooms",
    "categoryLabel": "Newsroom & PCR Photo",
    "description": "Authentic photograph from the Jaya TV network production facility and Muthamizh Academy practical training floor.",
    "specs": [
      "High-Res Digital Capture",
      "Jaya TV Network Floor",
      "Hands-On Facility",
      "Muthamizh Academy"
    ],
    "location": "Jaya TV Studio Campus, Chennai",
    "mediaType": "image",
    "image": "https://lh3.googleusercontent.com/d/1-lkVfKgYId_sDkNyYx2YAunIpibKQLr5",
    "thumbnailUrl": "https://lh3.googleusercontent.com/d/1-lkVfKgYId_sDkNyYx2YAunIpibKQLr5=w800",
    "driveViewUrl": "https://drive.google.com/file/d/1-lkVfKgYId_sDkNyYx2YAunIpibKQLr5/view",
    "driveFolderUrl": "https://drive.google.com/drive/folders/1f8muAhgEsBdfu2gyRpjbPKIjae-eTFgW"
  },
  {
    "id": "newsroom-photo-37",
    "driveId": "1VWIKgA2UQZxAPLtgHbFHQqyggZj75MW1",
    "fileName": "DSC07891.JPG",
    "title": "Floor Director View of Live News Bulletin Recording (Ref #37)",
    "category": "newsrooms",
    "categoryLabel": "Newsroom & PCR Photo",
    "description": "Authentic photograph from the Jaya TV network production facility and Muthamizh Academy practical training floor.",
    "specs": [
      "High-Res Digital Capture",
      "Jaya TV Network Floor",
      "Hands-On Facility",
      "Muthamizh Academy"
    ],
    "location": "Jaya TV Studio Campus, Chennai",
    "mediaType": "image",
    "image": "https://lh3.googleusercontent.com/d/1VWIKgA2UQZxAPLtgHbFHQqyggZj75MW1",
    "thumbnailUrl": "https://lh3.googleusercontent.com/d/1VWIKgA2UQZxAPLtgHbFHQqyggZj75MW1=w800",
    "driveViewUrl": "https://drive.google.com/file/d/1VWIKgA2UQZxAPLtgHbFHQqyggZj75MW1/view",
    "driveFolderUrl": "https://drive.google.com/drive/folders/1f8muAhgEsBdfu2gyRpjbPKIjae-eTFgW"
  },
  {
    "id": "newsroom-photo-38",
    "driveId": "1KQ3DqydIzr38HCCvLUyB-Mcvd1M_m6M9",
    "fileName": "DSC07892.JPG",
    "title": "Central Apparatus Room (CAR) Fiber Patch Panels (Ref #38)",
    "category": "newsrooms",
    "categoryLabel": "Newsroom & PCR Photo",
    "description": "Authentic photograph from the Jaya TV network production facility and Muthamizh Academy practical training floor.",
    "specs": [
      "High-Res Digital Capture",
      "Jaya TV Network Floor",
      "Hands-On Facility",
      "Muthamizh Academy"
    ],
    "location": "Jaya TV Studio Campus, Chennai",
    "mediaType": "image",
    "image": "https://lh3.googleusercontent.com/d/1KQ3DqydIzr38HCCvLUyB-Mcvd1M_m6M9",
    "thumbnailUrl": "https://lh3.googleusercontent.com/d/1KQ3DqydIzr38HCCvLUyB-Mcvd1M_m6M9=w800",
    "driveViewUrl": "https://drive.google.com/file/d/1KQ3DqydIzr38HCCvLUyB-Mcvd1M_m6M9/view",
    "driveFolderUrl": "https://drive.google.com/drive/folders/1f8muAhgEsBdfu2gyRpjbPKIjae-eTFgW"
  },
  {
    "id": "newsroom-photo-39",
    "driveId": "1M9d2b9ZkrZB-ea5pJ-QyrP2LNvSpkN2c",
    "fileName": "DSC07893.JPG",
    "title": "Multi-Camera Color Balance & Shading Control Units (Ref #39)",
    "category": "newsrooms",
    "categoryLabel": "Newsroom & PCR Photo",
    "description": "Authentic photograph from the Jaya TV network production facility and Muthamizh Academy practical training floor.",
    "specs": [
      "High-Res Digital Capture",
      "Jaya TV Network Floor",
      "Hands-On Facility",
      "Muthamizh Academy"
    ],
    "location": "Jaya TV Studio Campus, Chennai",
    "mediaType": "image",
    "image": "https://lh3.googleusercontent.com/d/1M9d2b9ZkrZB-ea5pJ-QyrP2LNvSpkN2c",
    "thumbnailUrl": "https://lh3.googleusercontent.com/d/1M9d2b9ZkrZB-ea5pJ-QyrP2LNvSpkN2c=w800",
    "driveViewUrl": "https://drive.google.com/file/d/1M9d2b9ZkrZB-ea5pJ-QyrP2LNvSpkN2c/view",
    "driveFolderUrl": "https://drive.google.com/drive/folders/1f8muAhgEsBdfu2gyRpjbPKIjae-eTFgW"
  },
  {
    "id": "newsroom-photo-40",
    "driveId": "1OlRgnpph2ni2EwHzL82xd0HN1ZiBE-DH",
    "fileName": "DSC07894.JPG",
    "title": "News Graphics Character Generator & Lower Third Deck (Ref #40)",
    "category": "newsrooms",
    "categoryLabel": "Newsroom & PCR Photo",
    "description": "Authentic photograph from the Jaya TV network production facility and Muthamizh Academy practical training floor.",
    "specs": [
      "High-Res Digital Capture",
      "Jaya TV Network Floor",
      "Hands-On Facility",
      "Muthamizh Academy"
    ],
    "location": "Jaya TV Studio Campus, Chennai",
    "mediaType": "image",
    "image": "https://lh3.googleusercontent.com/d/1OlRgnpph2ni2EwHzL82xd0HN1ZiBE-DH",
    "thumbnailUrl": "https://lh3.googleusercontent.com/d/1OlRgnpph2ni2EwHzL82xd0HN1ZiBE-DH=w800",
    "driveViewUrl": "https://drive.google.com/file/d/1OlRgnpph2ni2EwHzL82xd0HN1ZiBE-DH/view",
    "driveFolderUrl": "https://drive.google.com/drive/folders/1f8muAhgEsBdfu2gyRpjbPKIjae-eTFgW"
  },
  {
    "id": "newsroom-photo-41",
    "driveId": "1qbmmCcU5K-0BuSRUb79jehN8jEeeFlFc",
    "fileName": "DSC07895.JPG",
    "title": "Studio Floor A Multi-Pedestal Camera Lineup (Ref #41)",
    "category": "newsrooms",
    "categoryLabel": "Newsroom & PCR Photo",
    "description": "Authentic photograph from the Jaya TV network production facility and Muthamizh Academy practical training floor.",
    "specs": [
      "High-Res Digital Capture",
      "Jaya TV Network Floor",
      "Hands-On Facility",
      "Muthamizh Academy"
    ],
    "location": "Jaya TV Studio Campus, Chennai",
    "mediaType": "image",
    "image": "https://lh3.googleusercontent.com/d/1qbmmCcU5K-0BuSRUb79jehN8jEeeFlFc",
    "thumbnailUrl": "https://lh3.googleusercontent.com/d/1qbmmCcU5K-0BuSRUb79jehN8jEeeFlFc=w800",
    "driveViewUrl": "https://drive.google.com/file/d/1qbmmCcU5K-0BuSRUb79jehN8jEeeFlFc/view",
    "driveFolderUrl": "https://drive.google.com/drive/folders/1f8muAhgEsBdfu2gyRpjbPKIjae-eTFgW"
  },
  {
    "id": "newsroom-photo-42",
    "driveId": "1d6zof5it_6MdzIUgiPhwU-C8z2noCyv1",
    "fileName": "DSC07896.JPG",
    "title": "PCR Vision Mixing Console & Multi-Screen Monitor Wall (Ref #42)",
    "category": "newsrooms",
    "categoryLabel": "Newsroom & PCR Photo",
    "description": "Authentic photograph from the Jaya TV network production facility and Muthamizh Academy practical training floor.",
    "specs": [
      "High-Res Digital Capture",
      "Jaya TV Network Floor",
      "Hands-On Facility",
      "Muthamizh Academy"
    ],
    "location": "Jaya TV Studio Campus, Chennai",
    "mediaType": "image",
    "image": "https://lh3.googleusercontent.com/d/1d6zof5it_6MdzIUgiPhwU-C8z2noCyv1",
    "thumbnailUrl": "https://lh3.googleusercontent.com/d/1d6zof5it_6MdzIUgiPhwU-C8z2noCyv1=w800",
    "driveViewUrl": "https://drive.google.com/file/d/1d6zof5it_6MdzIUgiPhwU-C8z2noCyv1/view",
    "driveFolderUrl": "https://drive.google.com/drive/folders/1f8muAhgEsBdfu2gyRpjbPKIjae-eTFgW"
  },
  {
    "id": "newsroom-photo-43",
    "driveId": "1wyAk_oPBEkhMn5Grfu8tATByYBXwtNmt",
    "fileName": "DSC07897.JPG",
    "title": "Prime-Time Newsroom Anchor Desk & Teleprompter (Ref #43)",
    "category": "newsrooms",
    "categoryLabel": "Newsroom & PCR Photo",
    "description": "Authentic photograph from the Jaya TV network production facility and Muthamizh Academy practical training floor.",
    "specs": [
      "High-Res Digital Capture",
      "Jaya TV Network Floor",
      "Hands-On Facility",
      "Muthamizh Academy"
    ],
    "location": "Jaya TV Studio Campus, Chennai",
    "mediaType": "image",
    "image": "https://lh3.googleusercontent.com/d/1wyAk_oPBEkhMn5Grfu8tATByYBXwtNmt",
    "thumbnailUrl": "https://lh3.googleusercontent.com/d/1wyAk_oPBEkhMn5Grfu8tATByYBXwtNmt=w800",
    "driveViewUrl": "https://drive.google.com/file/d/1wyAk_oPBEkhMn5Grfu8tATByYBXwtNmt/view",
    "driveFolderUrl": "https://drive.google.com/drive/folders/1f8muAhgEsBdfu2gyRpjbPKIjae-eTFgW"
  },
  {
    "id": "newsroom-photo-44",
    "driveId": "14hbo3p8hG3oWGwUBJiPBJZtlDKsjXGM8",
    "fileName": "DSC07898.JPG",
    "title": "Broadcast DMX Dimmer Rack & High-Bay Lighting (Ref #44)",
    "category": "newsrooms",
    "categoryLabel": "Newsroom & PCR Photo",
    "description": "Authentic photograph from the Jaya TV network production facility and Muthamizh Academy practical training floor.",
    "specs": [
      "High-Res Digital Capture",
      "Jaya TV Network Floor",
      "Hands-On Facility",
      "Muthamizh Academy"
    ],
    "location": "Jaya TV Studio Campus, Chennai",
    "mediaType": "image",
    "image": "https://lh3.googleusercontent.com/d/14hbo3p8hG3oWGwUBJiPBJZtlDKsjXGM8",
    "thumbnailUrl": "https://lh3.googleusercontent.com/d/14hbo3p8hG3oWGwUBJiPBJZtlDKsjXGM8=w800",
    "driveViewUrl": "https://drive.google.com/file/d/14hbo3p8hG3oWGwUBJiPBJZtlDKsjXGM8/view",
    "driveFolderUrl": "https://drive.google.com/drive/folders/1f8muAhgEsBdfu2gyRpjbPKIjae-eTFgW"
  },
  {
    "id": "newsroom-photo-45",
    "driveId": "1dJzU_POpnXfsNYgRmXxWSBeai52GGQjC",
    "fileName": "DSC07899.JPG",
    "title": "Camera 1 Studio Pedestal Rig & Viewfinder (Ref #45)",
    "category": "newsrooms",
    "categoryLabel": "Newsroom & PCR Photo",
    "description": "Authentic photograph from the Jaya TV network production facility and Muthamizh Academy practical training floor.",
    "specs": [
      "High-Res Digital Capture",
      "Jaya TV Network Floor",
      "Hands-On Facility",
      "Muthamizh Academy"
    ],
    "location": "Jaya TV Studio Campus, Chennai",
    "mediaType": "image",
    "image": "https://lh3.googleusercontent.com/d/1dJzU_POpnXfsNYgRmXxWSBeai52GGQjC",
    "thumbnailUrl": "https://lh3.googleusercontent.com/d/1dJzU_POpnXfsNYgRmXxWSBeai52GGQjC=w800",
    "driveViewUrl": "https://drive.google.com/file/d/1dJzU_POpnXfsNYgRmXxWSBeai52GGQjC/view",
    "driveFolderUrl": "https://drive.google.com/drive/folders/1f8muAhgEsBdfu2gyRpjbPKIjae-eTFgW"
  },
  {
    "id": "newsroom-photo-46",
    "driveId": "1sS7df01Ma8J32sHyeP_o4A3UguRosZXQ",
    "fileName": "DSC07900.JPG",
    "title": "PCR Director Intercom & Tally System Console (Ref #46)",
    "category": "newsrooms",
    "categoryLabel": "Newsroom & PCR Photo",
    "description": "Authentic photograph from the Jaya TV network production facility and Muthamizh Academy practical training floor.",
    "specs": [
      "High-Res Digital Capture",
      "Jaya TV Network Floor",
      "Hands-On Facility",
      "Muthamizh Academy"
    ],
    "location": "Jaya TV Studio Campus, Chennai",
    "mediaType": "image",
    "image": "https://lh3.googleusercontent.com/d/1sS7df01Ma8J32sHyeP_o4A3UguRosZXQ",
    "thumbnailUrl": "https://lh3.googleusercontent.com/d/1sS7df01Ma8J32sHyeP_o4A3UguRosZXQ=w800",
    "driveViewUrl": "https://drive.google.com/file/d/1sS7df01Ma8J32sHyeP_o4A3UguRosZXQ/view",
    "driveFolderUrl": "https://drive.google.com/drive/folders/1f8muAhgEsBdfu2gyRpjbPKIjae-eTFgW"
  },
  {
    "id": "newsroom-photo-47",
    "driveId": "1R6oesdAP9GxuwyUroYOLjNMfWa4k5Ofg",
    "fileName": "DSC07901.JPG",
    "title": "Live Debate Set with Multi-Angle Dynamic Staging (Ref #47)",
    "category": "newsrooms",
    "categoryLabel": "Newsroom & PCR Photo",
    "description": "Authentic photograph from the Jaya TV network production facility and Muthamizh Academy practical training floor.",
    "specs": [
      "High-Res Digital Capture",
      "Jaya TV Network Floor",
      "Hands-On Facility",
      "Muthamizh Academy"
    ],
    "location": "Jaya TV Studio Campus, Chennai",
    "mediaType": "image",
    "image": "https://lh3.googleusercontent.com/d/1R6oesdAP9GxuwyUroYOLjNMfWa4k5Ofg",
    "thumbnailUrl": "https://lh3.googleusercontent.com/d/1R6oesdAP9GxuwyUroYOLjNMfWa4k5Ofg=w800",
    "driveViewUrl": "https://drive.google.com/file/d/1R6oesdAP9GxuwyUroYOLjNMfWa4k5Ofg/view",
    "driveFolderUrl": "https://drive.google.com/drive/folders/1f8muAhgEsBdfu2gyRpjbPKIjae-eTFgW"
  },
  {
    "id": "newsroom-photo-48",
    "driveId": "1cVmJV9C2lFX8D3ks_HOR4gw8yTps8nYu",
    "fileName": "DSC07902.JPG",
    "title": "Electronic News Gathering (ENG) Central Rundown Hub (Ref #48)",
    "category": "newsrooms",
    "categoryLabel": "Newsroom & PCR Photo",
    "description": "Authentic photograph from the Jaya TV network production facility and Muthamizh Academy practical training floor.",
    "specs": [
      "High-Res Digital Capture",
      "Jaya TV Network Floor",
      "Hands-On Facility",
      "Muthamizh Academy"
    ],
    "location": "Jaya TV Studio Campus, Chennai",
    "mediaType": "image",
    "image": "https://lh3.googleusercontent.com/d/1cVmJV9C2lFX8D3ks_HOR4gw8yTps8nYu",
    "thumbnailUrl": "https://lh3.googleusercontent.com/d/1cVmJV9C2lFX8D3ks_HOR4gw8yTps8nYu=w800",
    "driveViewUrl": "https://drive.google.com/file/d/1cVmJV9C2lFX8D3ks_HOR4gw8yTps8nYu/view",
    "driveFolderUrl": "https://drive.google.com/drive/folders/1f8muAhgEsBdfu2gyRpjbPKIjae-eTFgW"
  },
  {
    "id": "newsroom-photo-49",
    "driveId": "1eu-Fw0V4v5-foxMzJshwQlmfIhW3u5oC",
    "fileName": "DSC07903.JPG",
    "title": "Avid iNews Editorial & Script Teleprompter Station (Ref #49)",
    "category": "newsrooms",
    "categoryLabel": "Newsroom & PCR Photo",
    "description": "Authentic photograph from the Jaya TV network production facility and Muthamizh Academy practical training floor.",
    "specs": [
      "High-Res Digital Capture",
      "Jaya TV Network Floor",
      "Hands-On Facility",
      "Muthamizh Academy"
    ],
    "location": "Jaya TV Studio Campus, Chennai",
    "mediaType": "image",
    "image": "https://lh3.googleusercontent.com/d/1eu-Fw0V4v5-foxMzJshwQlmfIhW3u5oC",
    "thumbnailUrl": "https://lh3.googleusercontent.com/d/1eu-Fw0V4v5-foxMzJshwQlmfIhW3u5oC=w800",
    "driveViewUrl": "https://drive.google.com/file/d/1eu-Fw0V4v5-foxMzJshwQlmfIhW3u5oC/view",
    "driveFolderUrl": "https://drive.google.com/drive/folders/1f8muAhgEsBdfu2gyRpjbPKIjae-eTFgW"
  },
  {
    "id": "newsroom-photo-50",
    "driveId": "1LIJbp0lG9hgarysU3tPZP4vFKw7hcfRm",
    "fileName": "DSC07904.JPG",
    "title": "Soundcraft Broadcast Audio Mixer & Compressor Rack (Ref #50)",
    "category": "newsrooms",
    "categoryLabel": "Newsroom & PCR Photo",
    "description": "Authentic photograph from the Jaya TV network production facility and Muthamizh Academy practical training floor.",
    "specs": [
      "High-Res Digital Capture",
      "Jaya TV Network Floor",
      "Hands-On Facility",
      "Muthamizh Academy"
    ],
    "location": "Jaya TV Studio Campus, Chennai",
    "mediaType": "image",
    "image": "https://lh3.googleusercontent.com/d/1LIJbp0lG9hgarysU3tPZP4vFKw7hcfRm",
    "thumbnailUrl": "https://lh3.googleusercontent.com/d/1LIJbp0lG9hgarysU3tPZP4vFKw7hcfRm=w800",
    "driveViewUrl": "https://drive.google.com/file/d/1LIJbp0lG9hgarysU3tPZP4vFKw7hcfRm/view",
    "driveFolderUrl": "https://drive.google.com/drive/folders/1f8muAhgEsBdfu2gyRpjbPKIjae-eTFgW"
  }
];

export const DRIVE_FOLDER_URL = "https://drive.google.com/drive/folders/1NYhrQ72MNMGOqPYmyK1bA5NAzRTJIo5d?usp=sharing";
