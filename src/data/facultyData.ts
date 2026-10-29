import { FacultyMember, AlumniStory } from '../types';

export interface DepartmentInfo {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  focusAreas: string[];
  status: 'active' | 'upcoming';
}

export const DEPARTMENTS: DepartmentInfo[] = [
  {
    id: 'news',
    name: 'News Department',
    shortName: 'News & Media',
    tagline: 'Television Journalism, PCR Direction & Prime-Time Broadcast Anchoring',
    description: 'Spearheaded by veteran news directors, chief editors, and satellite broadcast anchors from Jaya TV Network.',
    focusAreas: ['News Gathering', 'Broadcast Anchoring', 'PCR & Studio Output', 'Editorial Planning', 'Digital Journalism'],
    status: 'active'
  },
  {
    id: 'it',
    name: 'IT Department',
    shortName: 'Information Technology & AI',
    tagline: 'School of Computing, AI Systems, Full-Stack Architecture & Agentic Engineering',
    description: 'Curated curriculum led by industry software architects, AI researchers, and cloud DevOps specialists.',
    focusAreas: ['AI & Agentic Workflows', 'Full-Stack Web Systems', 'Cloud Infrastructure', 'Model Context Protocol (MCP)', 'Enterprise Software'],
    status: 'active'
  }
];

export const FACULTY_DATA: FacultyMember[] = [

  
  {
  id: 'fac-4',
  name: 'Joseph Anto Amalgeethan',
  role: 'Veteran Media Professional & Production Specialist',
  department: 'News Department',
  experience: '30+ Years in Television & Media Production',
  expertise: [
    'Television Production',
    'Production Planning & Coordination',
    'On-Ground Production',
    'Media Production Management'
  ],
  bio: 'A seasoned media professional with over 30 years of experience across the television and media industry. Brings extensive hands-on expertise across multiple departments of production, from planning and coordination to execution and on-ground operations. Known for practical problem-solving, leadership, teamwork, and adapting to evolving technologies and audience expectations.',
  image: '/f4.png',
  networkCredit: 'Jaya TV Production'
  },
  {
  id: 'fac-5',
  name: 'M. Ganesan',
  role: 'Chief News Editor & Senior Journalism Professional',
  department: 'News Department',
  experience: '25+ Years in Journalism & News Media',
  expertise: [
    'News Gathering',
    'Editorial Planning',
    'Fact-Checking & Content Evaluation',
    'News Presentation',
    'Newsroom Management'
  ],
  bio: 'Highly experienced media professional and Chief News Editor with over 25 years in journalism and news media. Specializes in editorial planning, news gathering, fact-checking, content evaluation and newsroom management. Brings strong editorial judgment, leadership and adaptability across traditional and digital news environments, with a focus on accurate, relevant and responsible news reporting.',
  image: '/f5.png',
  networkCredit: 'Jaya TV News'
  },
  {
  id: 'fac-8',
  name: 'Prabhakaran Periyasamy',
  role: 'Deputy Editor & Senior News Professional',
  department: 'News Department',
  experience: '20+ Years in News & Media',
  expertise: [
    'Editorial Planning',
    'News Production',
    'Story Development',
    'Content Development',
    'Newsroom Management',
    'Editorial Coordination',
    'Digital Journalism'
  ],
  bio: 'Experienced Deputy Editor with over 20 years in the news and media industry. Brings extensive newsroom experience and strong editorial insight across story development, content refinement, editorial planning and news production. Combines traditional journalistic values with contemporary digital-first media practices, with a focus on clear, engaging and meaningful news content.',
  image: '/f8.jpeg',
  networkCredit: 'Jaya TV News'
  },
  {
  id: 'fac-6',
  name: 'Vinitha S',
  role: 'News Presenter, Anchor & Digital Host',
  department: 'News Department',
  experience: '10 Years in Television & Digital Media',
  expertise: [
    'News Presentation',
    'Show Hosting',
    'Cinema Shows',
    'One-to-One Interviews',
    'Movie Team Interviews',
    'Voice Over'
  ],
  bio: 'Experienced News Presenter and Anchor with 10 years in television and digital media. Has worked across leading media platforms including Captain TV, Jaya TV, Maalai Murasu TV and Kumudam Digital. Specializes in news presentation, show hosting, cinema programming, interviews and voice-over, with extensive experience adapting content for both television and digital audiences.',
  image: '/f6.jpeg',
  networkCredit: 'Jaya TV News & Digital'
  },
  {
  id: 'fac-7',
  name: 'Sigamani',
  role: 'Journalist, News Anchor & Broadcast Trainer',
  department: 'News Department',
  experience: '8+ Years in Journalism & Broadcast Media',
  expertise: [
    'News Reporting',
    'Sub-Editing',
    'Output Management',
    'News Production',
    'Live Television Anchoring',
    'News Reading',
    'Broadcast Journalism Training'
  ],
  bio: 'Dynamic and energetic media professional with over 8 years of experience across reporting, sub-editing, output management, production, live television anchoring and news reading. Currently focused on training aspiring news anchors and broadcast journalists through structured, professional and industry-oriented training.',
  image: '/f7.jpeg',
  networkCredit: 'Jaya TV News'
  },
  {
  id: 'fac-10',
  name: 'Mahendrakumar S',
  role: 'Head of Broadcast & IT Department ',
  department: 'Broadcast & IT',
  experience: '18+ Years in Broadcast Engineering, Media Technology & IT Infrastructure Management',
  expertise: [
    'CCNA & Advanced Computer Networking',
    'Broadcast Engineering & Television Transmission Systems',
    'Audio Engineering, Digital Audio Mixing & Signal Processing',
    'Video Production, Live Video Mixing & Broadcast Switching',
    'Professional Camera Operation & Broadcast Camera Systems',
    'Vision Mixer & Production Switcher Configuration',
    'IP Routing, Switching & Network Infrastructure Management',
    'Broadcast Network Architecture & IP-Based Media Transmission',
    'Live Broadcast Operations & Transmission Control',
    'Satellite Communication & Uplink/Downlink Systems',
    'Broadcast Automation & Playout Systems',
    'Master Control Room (MCR) Operations & Management',
    'Production Control Room (PCR) Setup & Maintenance',
    'Studio Infrastructure Design, Installation & Configuration',
    'Audio-Video Signal Routing & Distribution',
    'SDI, HDMI, NDI & IP-Based Video Workflows',
    'Video Encoding, Decoding, Compression & Streaming',
    'Digital Video Broadcasting & Signal Monitoring',
    'Server Installation, Configuration & Maintenance',
    'Broadcast Media Servers & Playout Server Administration',
    'Linux & Windows Server Administration',
    'Server Room & Data Center Operations',
    'Rack Mounting, Structured Cabling & Infrastructure Management',
    'Network Troubleshooting & Performance Optimization',
    'Router, Switch, Firewall & VLAN Configuration',
    'TCP/IP, DNS, DHCP, NAT & Network Security',
    'LAN/WAN Infrastructure Planning & Administration',
    'Wireless Networking & Connectivity Management',
    'Firewall Administration & Network Access Control',
    'Hardware Diagnostics, Preventive Maintenance & Repair',
    'IT Helpdesk, Desktop Support & Technical Troubleshooting',
    'Broadcast Equipment Installation & Commissioning',
    'Audio Console, Microphone & Intercom System Management',
    'Video Signal Testing, Synchronization & Quality Control',
    'Transmission Monitoring, Fault Diagnosis & Signal Integrity',
    'Media Asset Management & Digital Content Workflows',
    'Broadcast Equipment Integration & System Interoperability',
    'UPS, Power Backup & Critical Equipment Management',
    'Technical Team Leadership & Department Management',
    'Broadcast Operations Planning & Resource Coordination',
    'Vendor Coordination, Technical Procurement & Asset Management',
    'Preventive Maintenance Scheduling & Technical Documentation',
    'Broadcast Compliance, Operational Reliability & Risk Management',
    'Cross-Department Technical Support & Workflow Optimization'
  ],
  bio: 'Highly experienced Broadcast and IT professional with 18 years of expertise in television broadcasting, media transmission, network engineering and IT infrastructure management. Skilled in managing broadcast operations, configuring and maintaining Master Control Rooms (MCR), Production Control Rooms (PCR), television studios, transmission systems and professional audio-video infrastructure. Experienced in audio mixing, video switching, camera operations, broadcast signal routing, IP-based media workflows, server configuration, playout systems and transmission monitoring. Strong technical knowledge of CCNA-level networking, IP routing, switching, VLANs, LAN/WAN infrastructure, Linux and Windows server administration, firewall configuration and network troubleshooting. Proficient in broadcast equipment installation, system integration, preventive maintenance, fault diagnosis and operational continuity. Demonstrates strong leadership in managing Broadcast and IT teams, coordinating technical operations, optimizing media workflows, maintaining critical infrastructure and ensuring reliable, high-quality broadcast transmission.',
  image: '/f1.jpg',
  networkCredit: 'Jaya TV Technology & Software'
  },

  {
  id: 'fac-9',
  name: 'Ashok',
  role: 'Senior Software Developer & Network Engineer',
  department: 'IT Department',
  experience: '3+ Years in Software Development & Technical Support',
  expertise: [
    'Computer Networking & IT Support Engineering',
    'Cyber Security',
    'Linux Administration',
    'AI Engineering',
    'Server & Domain Management',
    'Firewall Configuration',
    'Hardware & Software Troubleshooting',
    'Photography & Video Editing',
    'Graphic & Logo Design'
  ],
  bio: 'Adaptable technology professional with experience across network engineering, software development, cybersecurity, Linux, AI and technical support. Skilled in setting up, installing, configuring and managing desktops, servers, domains and firewalls, with hands-on experience resolving hardware and software issues. Brings additional creative expertise in photography, logo design, video editing and Canva, along with strong communication, presentation, problem-solving and risk-management skills.',
  image: '/f2.png',
  networkCredit: 'Jaya TV Technology & Software'
  },
  {
  id: 'fac-10',
  name: 'Malik Basha R',
  role: 'Web Developer',
  department: 'IT Department',
  experience: 'Computer Science Engineering Graduate',
  expertise: [
    'Frontend Web Development',
    'Responsive Web Design',
    'UI/UX Design',
    'Computer & Networking'
  ],
  bio: 'Computer Science Engineering graduate and Web Developer with an interest in frontend technologies and emerging digital tools. Focuses on making technical concepts simple, practical and easy to understand for beginners and students. Uses a learn-by-doing approach through live demonstrations, practical exercises and real-world mini projects to help students build practical digital skills and confidence.',
  image: '/f10.jpeg',
  networkCredit: 'Jaya TV Technology & Software'
}
];

export const ALUMNI_DATA: AlumniStory[] = [
  {
    id: 'alum-1',
    name: 'Anand Kumar',
    courseName: 'PG Diploma in Television Production',
    batchYear: '2023 Batch',
    currentRole: 'Associate Director & PCR Producer',
    company: 'Jaya TV Network',
    testimonial: 'Training on actual studio floors with real satellite channel equipment gave me an immediate edge over other graduates. I was hired by Jaya TV within two weeks of graduation!',
    avatar: '/alumni-anand.jpg',
    featuredWork: 'Prime Time Live News Bulletin Producer'
  },
  {
    id: 'alum-2',
    name: 'Divya Bharathi',
    courseName: 'Certificate in Digital Cinematography',
    batchYear: '2024 Batch',
    currentRole: 'Operative Camerawoman & Focus Puller',
    company: 'Leading Tamil OTT Series',
    testimonial: 'The hands-on practice with Sony FX6 and ARRI lights at Muthamizh Academy was priceless. Astra AI counselor helped me choose the exact course suited to my passion.',
    avatar: '/alumni-divya.jpg',
    featuredWork: 'Cinematographer for Web Series'
  },
  {
    id: 'alum-3',
    name: 'Suresh Menon',
    courseName: 'PG Diploma in Broadcast Journalism',
    batchYear: '2022 Batch',
    currentRole: 'Senior Field Reporter',
    company: 'Mavis Satcom News Division',
    testimonial: 'Live teleprompter drills and outdoor broadcast van practice prepared me for high-pressure live reporting. Muthamizh Academy is the best investment I ever made.',
    avatar: '/alumni-suresh.jpg',
    featuredWork: 'Special Investigative Reporter'
  }
];
