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
  id: 'fac-9',
  name: 'Ashok',
  role: 'Senior Software Developer & Network Engineer',
  department: 'IT Department',
  experience: '3+ Years in Software Development & Technical Support',
  expertise: [
    'Network Engineering & CCNA',
    'Full-Stack Development',
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
  image: '/f2.jpg',
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
