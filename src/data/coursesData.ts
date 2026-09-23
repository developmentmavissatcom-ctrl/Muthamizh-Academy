import { Course } from '../types';

export const COURSES_DATA: Course[] = [
  {
    id: 'ai-agentic-software-engineering',
    title: 'AI-Assisted Software Development & Agentic Engineering',
    category: 'online_learning',
    categoryName: 'Online & Virtual Labs',
    duration: '1 Months (Intensive & Hands-On)',
    mode: '100% Online (Live Interactive Coding & Remote Agentic Labs)',
    deliveryFormat: '100% Online with Live Code Reviews & Cloud Dev Environments',
    isOnline: true,
    eligibility: 'Open to Beginners, CS/IT Students & Working Software Engineers',
    description: 'Master modern AI-assisted software engineering, AI coding assistants (Cursor, Copilot, Claude Code), agentic workflows, Model Context Protocol (MCP), full-stack web applications, RAG pipelines, and multi-agent orchestration.',
    badge: 'High-Tech & Agentic',
    highlight: 'Build Autonomous AI Agents, Full-Stack SaaS Apps, MCP Tool Integrations & RAG Knowledge Assistants',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    tools: [
      'Cursor & Claude Code',
      'GitHub Copilot & Codex',
      'Model Context Protocol (MCP)',
      'React 19 & Next.js 15',
      'TypeScript & Node.js',
      'PostgreSQL & Drizzle ORM',
      'Vector DBs & RAG Pipelines',
      'Docker & GitHub Actions CI/CD'
    ],
    careerRoles: [
      'AI Software Engineer',
      'Agentic Systems Architect',
      'Full-Stack AI Developer',
      'Prompt & Context Engineer',
      'Technical Product Builder'
    ],
    keyModules: [
      'AI & Modern Software Foundations (LLMs, Context Windows, Programming)',
      'Prompt & Context Engineering (Structured Prompts, Persistent Project Instructions)',
      'AI Coding Tools, Agents & MCP Workflows (Cursor, Claude Code, Subagents)',
      'Full-Stack & AI Application Development (React, Next.js, PostgreSQL, Auth, RAG)',
      'Testing, Security, Docker Deployment & 4 Production Capstone Projects'
    ],
    chapters: [
      {
        title: 'Chapter 1 — AI & Modern Software Development Foundations',
        topics: [
          '1.1 Introduction to Modern Software Development (SDLC, Frontend, Backend, Database, APIs, IDE/CLI)',
          '1.2 Generative AI for Developers (LLMs, Tokens, Context Windows, APIs/SDKs, Assistants vs Agents, Limits)',
          '1.3 Programming & Code Fundamentals (Variables, Functions, Loops, Structures, Modules, Error Handling, Reading Code)',
          '1.4 Developer AI Tools (AI Coding Assistants, AI-enabled IDEs, Terminal AI tools, Model Selection, Local vs Cloud)'
        ]
      },
      {
        title: 'Chapter 2 — Prompt, Context & AI-Assisted Development',
        topics: [
          '2.1 Prompt Engineering for Developers (Effective Instructions, Constraints, Structured & Code-Gen Prompts, Debugging)',
          '2.2 Context Engineering (Project & Codebase Context, File Selection, Context Windows, Persistent Instructions)',
          '2.3 AI-Assisted Development Workflow (Requirements, Specifications, Architecture, Task Decomposition)',
          '2.4 Working With AI During Development (Generate, Explain, Modify, Debug, Refactor, Document, Review)',
          '2.5 Professional Development Process (Human-in-the-loop, Validating Assumptions, Incremental Implementation)'
        ]
      },
      {
        title: 'Chapter 3 — AI Coding Tools, Agents & Engineering Workflows',
        topics: [
          '3.1 AI Coding Assistants (GitHub Copilot, Cursor, Claude Code, OpenAI Codex, IDE vs Terminal Workflows)',
          '3.2 AI Agent Fundamentals (Agent Loop, Planning & Execution, Tool Usage, Autonomous Tasks, Human Approval)',
          '3.3 Advanced AI Development Workflows (Project Rules, Reusable Skills, Custom Commands, Hooks, Memory)',
          '3.4 Subagents & Parallel Development (Specialized Subagents, Task Delegation, Parallel Agents, Git Worktrees)',
          '3.5 AI-Assisted Git & GitHub (Branches, Commits, PRs, Automated Code Reviews, Issue Management)',
          '3.6 MCP — Model Context Protocol (MCP Servers & Clients, Tools, Connecting Databases, APIs & GitHub)'
        ]
      },
      {
        title: 'Chapter 4 — Full-Stack & AI Application Development',
        topics: [
          '4.1 Web Application Development (HTML, CSS, JavaScript, TypeScript, React, Next.js)',
          '4.2 Backend Development (Server-side Applications, REST APIs, Business Logic, Validation, Error Handling)',
          '4.3 Database Development (SQL Fundamentals, PostgreSQL, Tables & Relationships, Queries, ORM, Migrations)',
          '4.4 Authentication & Application Security (Registration, Login, Sessions, Authorization, RBAC, Secrets)',
          '4.5 AI Application Integration (AI APIs, SDKs, Streaming Responses, Structured Outputs, Function/Tool Calling)',
          '4.6 RAG Applications (Retrieval-Augmented Generation, Chunking, Embeddings, Vector Databases, Retrieval Pipeline)',
          '4.7 Building Complete Applications (Frontend + Backend + DB + AI Integration + Auth in Production)'
        ]
      },
      {
        title: 'Chapter 5 — Testing, Security, Deployment & Capstones',
        topics: [
          '5.1 AI-Assisted Testing (Unit, Integration, E2E Testing, Test Generation, Regression & Coverage)',
          '5.2 Debugging & Code Quality (Error Analysis, Root-Cause Analysis, Refactoring, Static Analysis, Linting)',
          '5.3 AI & Application Security (Secure Coding, Secrets Management, Prompt Injection Defense, Safe Agent Execution)',
          '5.4 Deployment & Production (Build & Release, Docker Containers, Cloud Deployment, CI/CD GitHub Actions, Logging)',
          '5.5 Production AI Engineering (Model Selection, Token Management, Reliability, Observability, Maintenance)',
          '5.6 Capstone Projects (Project 1: Full-Stack App, Project 2: AI SaaS, Project 3: RAG Assistant, Project 4: Agentic System with MCP)'
        ]
      }
    ],
    fee: '₹5,000',
    jayaTvHandsOn: 'Build automated AI news summarization bots, broadcast asset tagging agents, and live program indexing tools.'
  },
  {
    id: 'enterprise-it-support-network-engineering',
    title: 'Enterprise IT Support, Cloud Infrastructure & Network Engineering',
    category: 'online_learning',
    categoryName: 'Online & Virtual Labs',
    duration: '1 Months (Comprehensive & Job-Ready)',
    mode: '100% Online (Virtual Labs, Packet Tracer & Remote IT Simulation)',
    deliveryFormat: '100% Online with Virtual Network Labs & Live Mentorship',
    isOnline: true,
    eligibility: 'Open to All 10+2, Diploma & Degree Graduates Seeking Tech Careers',
    description: 'Master the complete job-ready IT Support and Networking curriculum. Learn computer hardware, Windows administration, Active Directory, Cisco networking, IP addressing, TCP/IP, Wireshark, IT security, and cloud virtualization.',
    badge: 'High Employment Rate',
    highlight: '14 Hands-On Modules: Active Directory, Cisco Packet Tracer, Wireshark Packet Analysis, Cloud & Security',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    tools: [
      'Cisco Packet Tracer',
      'Wireshark Network Analyzer',
      'Windows Server & Active Directory',
      'PowerShell & Bash CLI',
      'AWS & Azure Cloud Virtualization',
      'Enterprise Helpdesk Ticketing Systems'
    ],
    careerRoles: [
      'IT Support Engineer (L1/L2)',
      'Network Administrator',
      'System Support Specialist',
      'Broadcast IT Infrastructure Engineer',
      'Help Desk Technical Lead'
    ],
    keyModules: [
      'IT Support & Hardware Fundamentals (L1/L2 Escalations, Windows Administration)',
      'Networking & IP Routing (OSI/TCP-IP, Subnetting, VLANs, 802.1Q, OSPF)',
      'Security & Active Directory (Domain Controllers, GPOs, Firewalls, ACLs)',
      'Network Monitoring & Tools (Wireshark, PowerShell Automation, Sysinternals)',
      'Virtualization, Cloud & Real-World Lab Portfolios (Packet Tracer & Helpdesk Tickets)'
    ],
    chapters: [
      {
        title: 'Modules 1 to 4 — Hardware, Operating Systems & IP Addressing',
        topics: [
          '1. IT Support Fundamentals (Help Desk, L1/L2/L3 Roles, SLA Basics, Troubleshooting Methodology)',
          '2. Computer Hardware & OS (CPU, RAM, Motherboard, BIOS/UEFI, Windows Permissions, Event Viewer)',
          '3. Networking Fundamentals (LAN/WAN/WLAN, Topologies, Switches, Routers, OSI & TCP/IP Models, Cabling)',
          '4. IP Addressing, Subnetting & Services (IPv4/IPv6, CIDR Subnetting, DHCP Troubleshooting, DNS Records, ARP)'
        ]
      },
      {
        title: 'Modules 5 to 8 — Protocols, Switching, Wireless & IT Security',
        topics: [
          '5. TCP/IP Protocols & Connectivity (TCP vs UDP, 3-Way Handshake, HTTP/SSH/RDP, NAT/PAT, VPNs)',
          '6. Switching, VLANs & Routing (MAC Tables, VLANs, Trunking 802.1Q, Inter-VLAN Routing, OSPF Basics)',
          '7. Wireless Networking (Wi-Fi 6, 2.4/5/6 GHz Bands, WPA2/WPA3, Access Point Config, Troubleshooting)',
          '8. IT and Network Security (CIA Triad, MFA, Malware Defense, Firewalls, ACLs, Incident Response)'
        ]
      },
      {
        title: 'Modules 9 to 11 — Active Directory, PowerShell & Wireshark Analysis',
        topics: [
          '9. Windows Server & Active Directory (Domain Controllers, Users/Groups/OUs, Group Policy GPO, Share Permissions)',
          '10. IT Support Tools & Troubleshooting (PowerShell, ping, tracert, nslookup, netstat, Remote Desktop, Printers)',
          '11. Network Monitoring & Wireshark (SNMP, Syslog, Wireshark Packet Captures, DNS/HTTP/TCP Traffic Analysis)'
        ]
      },
      {
        title: 'Modules 12 to 14 — Cloud, Real-World Labs & Interview Preparation',
        topics: [
          '12. Virtualization, Cloud & Backup (VMs, Hypervisors, Azure/AWS IaaS/PaaS, Disaster Recovery, PowerShell Automation)',
          '13. Practical Labs & Real-World IT Support (Windows IT Home Lab, Cisco Packet Tracer Topologies, Helpdesk Tickets)',
          '14. Job and Interview Preparation (Interview Q&A, Active Directory Scenarios, IT Support Home-Lab Portfolio)'
        ]
      }
    ],
    fee: '₹5,000',
    jayaTvHandsOn: 'Hands-on maintenance of satellite channel transmission network racks, SAN storage servers, and PCR workstations.'
  },


 
  {
    id: 'television-news-reading-anchoring',
    title: 'Television News Reading, Anchoring & Digital Journalism',
    category: 'short_term',
    categoryName: 'Short Term',
    duration: '2 Weeks / 4 Weeks / Weekend Batches',
    mode: 'On-Campus Studio Teleprompter & Live Studio Drills',
    deliveryFormat: 'Studio Teleprompter Floor + 4K Broadcast Newsroom Lab',
    isOnline: true,
    eligibility: 'Any Degree or 10+2 with Fluency in Tamil and/or English',
    description: 'Transform into a confident television anchor and digital journalist. Train on live news teleprompters, master Tamil phonetic diction, diaphragmatic breathing, voice modulation, live piece-to-camera (PTC), breaking news handling, debate moderation, and mobile journalism across flexible 2-Week, 4-Week, and Weekend tracks.',
    badge: 'On-Screen Stardom',
    highlight: 'Official 10-Lesson Tamil News Reading Program — Available in 2 Weeks Fast-Track, 4 Weeks Comprehensive, and Weekend Batches',
    image: '/src/assets/images/hero_broadcast_studio_1785852745647.jpg',
    tools: [
      'Studio Teleprompter Pedestal Systems',
      'Broadcast Studio Lapel & Boom Mics',
      'iNews & Newsroom Rundown Software',
      'Multi-Camera Tally Light Switching',
      'Mobile Journalism (MoJo) 4K Kits',
      'Virtual Newsroom Chroma Studio'
    ],
    careerRoles: [
      'Television News Anchor',
      'Prime-Time News Reader',
      'Debate Show Moderator',
      'Special Field Correspondent',
      'Digital Video Journalist & Voice Artist'
    ],
    keyModules: [
      'Lesson 1: News Reading Basics',
      'Lesson 2: Pronounciation & Diction',
      'Lesson 3: Voice Training',
      'Lesson 4: Voice Modulation',
      'Lesson 5: News Script & Writing',
      'Lesson 6: News Presentation',
      'Lesson 7: News Reading Techniques',
      'Lesson 8: Camera & Teleprompter',
      'Lesson 9: Breaking & Live Handling',
      'Lesson 10: Professional News Anchoring'
    ],
    chapters: [
      {
        title: 'Lesson 1 — News Reading Basics',
        topics: [
          '1.1 Overview of Television Broadcast Journalism and Studio Ethics',
          '1.2 Understanding Studio Workflow, Rundowns, Slugs, and Lead-Ins',
          '1.3 Reader vs Presenter vs Anchor: Roles & Expectations',
          '1.4 Managing Reading Cadence, Natural Tempo, and Studio Etiquette'
        ]
      },
      {
        title: 'Lesson 2 — Pronounciation & Diction',
        topics: [
          '2.1 Tamil Phonetic Articulation and Vowel/Consonant Clarity',
          '2.2 Neutralizing Regional Slangs and Mother Tongue Influence (MTI)',
          '2.3 Tongue Twister Workouts and Difficult Multi-Syllabic Words',
          '2.4 Reading Political, Legal, and Scientific Terms Without Stumble'
        ]
      },
      {
        title: 'Lesson 3 — Voice Training',
        topics: [
          '3.1 Diaphragmatic Breath Support and Lung Capacity Expansion',
          '3.2 Building Vocal Warm-Up Rituals Before Going Live on Air',
          '3.3 Vocal Stamina & Longevity: Preventing Throat Strain During Long Bulletins',
          '3.4 Microphone Proximity Effect, Pop Filters, and Acoustic Placement'
        ]
      },
      {
        title: 'Lesson 4 — Voice Modulation',
        topics: [
          '4.1 Pitch, Tone, Tempo, and Volume Inflection Techniques',
          '4.2 Emotional Calibration: Solemn vs Breaking vs Vibrant/Sports Delivery',
          '4.3 Sentence Stressing: Emphasizing the Core Fact in Every Headline',
          '4.4 Pauses as a Weapon: Dramatic Timing and Clarity Breathing Intervals'
        ]
      },
      {
        title: 'Lesson 5 — News Script & Writing',
        topics: [
          '5.1 Writing for the Ear: Short, Punchy, Broadcast-Style Sentences',
          '5.2 Structuring Headlines, Leads, Anchor Copy, and Outros',
          '5.3 Script Formatting for Teleprompters with Visual Phonetic Cues',
          '5.4 Integrating Sound Bites (SOT), Graphics Calls (GFX), and VT Cues'
        ]
      },
      {
        title: 'Lesson 6 — News Presentation',
        topics: [
          '6.1 Anchor Posture, Ergonomics, and Confident Upper-Body Poise',
          '6.2 Eye Contact Mechanics: Looking Directly into the Viewer’s Living Room',
          '6.3 Facial Expressions: Sincerity, Gravity, and Professional Composure',
          '6.4 Wardrobe, Color Psychology, Grooming, and Studio Lighting Adaptation'
        ]
      },
      {
        title: 'Lesson 7 — News Reading Techniques',
        topics: [
          '7.1 Eye Movement Optimization: Eliminating Observable Eye Scanning',
          '7.2 Multi-Camera Switching: Smooth Head Turns to Active Tally Red Lights',
          '7.3 Co-Anchor Coordination: Seamless Two-Presenter Hand-Offs & Chemistry',
          '7.4 Handling Teleprompter Speed Variations and Reading Under Pressure'
        ]
      },
      {
        title: 'Lesson 8 — Camera & Teleprompter',
        topics: [
          '8.1 Hands-On Teleprompter Operation: Optical Glass and Mirror Systems',
          '8.2 Speed Synchronization: Controlling Prompter Speed via Foot/Hand Controllers',
          '8.3 Handling Prompter Malfunctions: Gracefully Transitioning to Hard Copy Scripts',
          '8.4 Live Piece-to-Camera (PTC) Filming on Studio Floor'
        ]
      },
      {
        title: 'Lesson 9 — Breaking & Live Handling',
        topics: [
          '9.1 Breaking News Alert Protocols: Unfolding Events with Zero Script',
          '9.2 Producer IFB Ear-Piece Communication: Listening While Speaking on Air',
          '9.3 Conducting Phone-Ins, Correspondent Cross-Talks, and OB Van Links',
          '9.4 Verifying Real-Time Information Under Strict Live On-Air Deadlines'
        ]
      },
      {
        title: 'Lesson 10 — Professional News Anchoring',
        topics: [
          '10.1 Complete 15-Minute Mock Prime-Time News Bulletin Recording in Jaya TV Newsroom',
          '10.2 Panel Discussion & Live Debate Moderation Mechanics',
          '10.3 High-Definition Anchor Showreel Production with Broadcast Graphics',
          '10.4 Satellite Channel Audition Strategies, Demo Reel Packaging & Network Placements'
        ]
      }
    ],
    durationTracks: [
      {
        id: '2_weeks',
        title: '2 Weeks Fast-Track Bootcamp',
        durationLabel: '2 Weeks',
        badge: 'Fast-Track Intensive',
        schedule: 'Monday to Saturday • 09:00 AM to 01:00 PM / 02:00 PM to 06:00 PM',
        fee: '₹15,000',
        description: 'Accelerated intensive studio bootcamp designed for rapid on-camera mastery, vocal agility, and live teleprompter proficiency in active Jaya TV news studios.',
        recommendedFor: 'Aspiring news readers, voice-over artists, media graduates, and content creators seeking fast, high-impact on-screen transformation.',
        scheduleBreakdown: [
          {
            period: 'Week 1 — Foundations & Vocal Engineering',
            theme: 'Voice Mastery, Tamil Diction & Broadcast Scriptwriting',
            lessons: [
              {
                lessonNumber: 1,
                title: 'News Reading Basics',
                focus: 'Studio environment, rundown sheets, tempo control, and ethics.',
                topics: [
                  'Broadcast journalism standards & newsroom hierarchy',
                  'Reading pace calibration (130-150 words per minute)',
                  'Studio etiquette and microphone discipline'
                ],
                handsOnDrill: 'Cold-reading 5 standard broadcast wire stories on microphone.'
              },
              {
                lessonNumber: 2,
                title: 'Pronounciation & Diction',
                focus: 'Tamil phonetic clarity, tongue twisters, and neutralizing regional slangs.',
                topics: [
                  'Tamil alphabet phonetic articulation drills',
                  'Resolving tongue traps and difficult political headlines',
                  'Pronunciation standards for local and international names'
                ],
                handsOnDrill: 'Rapid tongue-twister repetition and recorded playback analysis.'
              },
              {
                lessonNumber: 3,
                title: 'Voice Training',
                focus: 'Diaphragmatic breath support, stamina, and acoustic resonance.',
                topics: [
                  'Deep belly breathing exercises for uninterrupted delivery',
                  'Expanding vocal stamina to prevent mid-bulletin breathlessness',
                  'Voice projection without shouting'
                ],
                handsOnDrill: '2-minute non-stop breathing control bulletin exercise.'
              },
              {
                lessonNumber: 4,
                title: 'Voice Modulation',
                focus: 'Pitch variation, cadence, sentence stressing, and emotional tone.',
                topics: [
                  'Differentiating breaking, sports, crime, and human interest tones',
                  'Dynamic stressing of key dates, figures, and names',
                  'Strategic pauses for maximum audience comprehension'
                ],
                handsOnDrill: 'Recording contrasting news clips (Serious vs Celebration).'
              },
              {
                lessonNumber: 5,
                title: 'News Script & Writing',
                focus: 'Writing for the ear, headlines, intros, and teleprompter formatting.',
                topics: [
                  'Converting print/web news to broadcast ear-copy',
                  'Drafting punchy headlines and anchor leads',
                  'Formatting scripts with phonetic pronunciation brackets'
                ],
                handsOnDrill: 'Rewriting a live wire news dispatch into a 45-second anchor script.'
              }
            ]
          },
          {
            period: 'Week 2 — Visual Presentation, Teleprompter & Live Anchoring',
            theme: 'On-Camera Mechanics, Real-Time Prompter & Prime-Time Graduation',
            lessons: [
              {
                lessonNumber: 6,
                title: 'News Presentation',
                focus: 'On-camera posture, body language, facial poise, and wardrobe styling.',
                topics: [
                  'Professional upper-body posture and seated anchor ergonomics',
                  'Eye-level camera engagement and confident lens connection',
                  'Facial expressions aligned with story gravity'
                ],
                handsOnDrill: 'Video-recorded on-camera self-assessment with faculty critique.'
              },
              {
                lessonNumber: 7,
                title: 'News Reading Techniques',
                focus: 'Multi-camera head turns, rhythmic breathing, and co-anchor coordination.',
                topics: [
                  'Tracking tally lights between Camera 1 (Wide) and Camera 2 (Tight)',
                  'Hiding breath intakes behind news graphics cutaways',
                  'Seamless dialogue and baton handoffs in dual-anchor setups'
                ],
                handsOnDrill: 'Dual-anchor co-presentation drill with live camera switching.'
              },
              {
                lessonNumber: 8,
                title: 'Camera & Teleprompter',
                focus: 'Mastering the glass teleprompter, scrolling speed, and prompter freezes.',
                topics: [
                  'Reading scrolling text without horizontal eye darting',
                  'Foot-pedal and hand controller speed synchronization',
                  'Handling sudden teleprompter freezes by dropping to desk copy'
                ],
                handsOnDrill: '3-minute live teleprompter studio read with intentional speed changes.'
              },
              {
                lessonNumber: 9,
                title: 'Breaking & Live Handling',
                focus: 'Unscripted breaking news, IFB producer communication, and phone-ins.',
                topics: [
                  'Speaking coherently while producer speaks into your IFB ear-piece',
                  'Formulating live anchor updates from incoming raw paper flashes',
                  'Conducting live cross-talk with field reporters'
                ],
                handsOnDrill: 'Simulated breaking news flash drill with unexpected ear-piece cues.'
              },
              {
                lessonNumber: 10,
                title: 'Professional News Anchoring',
                focus: 'Final mock prime-time news bulletin & personalized broadcast showreel.',
                topics: [
                  'Full 10-minute live-to-tape prime-time bulletin production',
                  'Studio graphics, lower-thirds, and opening titles integration',
                  'Packaging your professional HD anchor showreel for network auditions'
                ],
                handsOnDrill: 'Complete graduation studio broadcast recorded in Jaya TV news facility.'
              }
            ]
          }
        ]
      },
      {
        id: '4_weeks',
        title: '4 Weeks Comprehensive Professional Diploma',
        durationLabel: '4 Weeks',
        badge: 'Comprehensive Diploma',
        schedule: 'Monday to Saturday • 09:00 AM to 01:00 PM  / 02:00 PM to 06:00 PM',
        fee: '₹25,000',
        description: 'The definitive professional broadcast journalism diploma. Features extensive Tamil phonetic diction training, daily studio teleprompter practice, live newsroom reporting, and prime-time showreel packaging.',
        recommendedFor: 'Serious career aspirants seeking full-time positions as prime-time television news anchors, broadcast journalists, and digital news presenters.',
        scheduleBreakdown: [
          {
            period: 'Week 1 — News Foundations, Tamil Phonetics & Vocal Stamina',
            theme: 'Lessons 1, 2 & 3: Theoretical & Acoustic Voice Mastery',
            lessons: [
              {
                lessonNumber: 1,
                title: 'News Reading Basics',
                focus: 'Television newsroom ecosystem, media law, and presentation fundamentals.',
                topics: [
                  'History and structure of 24/7 Tamil satellite television news',
                  'Anatomy of a broadcast newsroom: PCR, MCR, Rundown Editors & Anchors',
                  'Reading speeds: Calibrating WPM for regional broadcast standards',
                  'Studio etiquette, microphone techniques, and monitor awareness'
                ],
                handsOnDrill: 'Acoustic voice recording and baseline tempo assessment.'
              },
              {
                lessonNumber: 2,
                title: 'Pronounciation & Diction',
                focus: 'Tamil phonetic clarity, tongue twisters, and regional dialect neutralization.',
                topics: [
                  'Pure Tamil phonetic articulation (வ, ழ, ள, ற, ன distinction)',
                  'Eliminating regional linguistic inflection and accent neutralization',
                  'Intensive tongue-twister training for muscular tongue agility',
                  'Pronunciation of foreign diplomatic names and scientific terminology'
                ],
                handsOnDrill: 'Individualized diction clinic with senior Tamil language news editor.'
              },
              {
                lessonNumber: 3,
                title: 'Voice Training',
                focus: 'Diaphragmatic breath management, vocal resonance, and throat care.',
                topics: [
                  'Diaphragmatic breathing drills to power multi-hour live coverage',
                  'Chest vs Head vs Throat resonance for authoritative broadcast timber',
                  'Voice warm-up and cool-down routines to preserve vocal cord health',
                  'Microphone gain control and eliminating pops, sibilance, and heavy breathing'
                ],
                handsOnDrill: 'Daily 20-minute diaphragmatic voice projection workouts in sound lab.'
              }
            ]
          },
          {
            period: 'Week 2 — Voice Modulation Dynamics & Broadcast Scriptwriting',
            theme: 'Lessons 4 & 5: Expressive Storytelling & Writing for the Ear',
            lessons: [
              {
                lessonNumber: 4,
                title: 'Voice Modulation',
                focus: 'Inflection, pitch dynamics, emotional pacing, and strategic emphasis.',
                topics: [
                  'Modulating tone for varied genres: Politics, Crime, Human Interest, Cinema, Sports',
                  'Avoiding monotone delivery through pitch variation and sentence cadence',
                  'Inflecting numbers, statistics, and critical headlines for listener retention',
                  'Mastering the broadcast pause: Silence as a powerful communicative tool'
                ],
                handsOnDrill: 'Multi-genre bulletin modulation challenge recorded in studio booth.'
              },
              {
                lessonNumber: 5,
                title: 'News Script & Writing',
                focus: 'Transforming news dispatches into teleprompter-ready anchor copy.',
                topics: [
                  'Writing for broadcast vs print: Simplicity, active verbs, and immediate impact',
                  'Crafting magnetic headlines, teasers, anchor lead-ins, and wrap-arounds',
                  'Teleprompter script formatting: Font sizes, phonetic aids, and cue markers',
                  'Writing cue lines for Sound Bites (SOT), Live Graphics (GFX), and VT packages'
                ],
                handsOnDrill: 'Drafting and proofing a complete 10-story television news rundown.'
              }
            ]
          },
          {
            period: 'Week 3 — On-Camera Presence & Multi-Camera Teleprompter Mastery',
            theme: 'Lessons 6, 7 & 8: Studio Floor Mechanics & Visual Presentation',
            lessons: [
              {
                lessonNumber: 6,
                title: 'News Presentation',
                focus: 'Visual ergonomics, lens eye-contact, professional styling, and body language.',
                topics: [
                  'Anchor desk ergonomics: Sitting tall, hand positions, and subtle gestures',
                  'Connecting through the glass lens with natural conversational authority',
                  'Facial expressions: Maintaining appropriate gravity without appearing stiff',
                  'On-air wardrobe consultation: Solid colors, fabrics, and studio lighting compatibility'
                ],
                handsOnDrill: 'High-definition 4K camera screen tests with professional lighting setup.'
              },
              {
                lessonNumber: 7,
                title: 'News Reading Techniques',
                focus: 'Pacing, breathing camouflage, multi-cam head turns, and dual-anchoring.',
                topics: [
                  'Eliminating visible scanning and eye jitter across prompter lines',
                  'Multi-camera tally light awareness: Natural head pans from Cam 1 to Cam 2',
                  'Breathing techniques timed during VT cuts and graphic wipes',
                  'Co-anchor interplay: Voice balance, non-verbal cues, and shared rundowns'
                ],
                handsOnDrill: 'Co-anchoring a 10-minute dynamic two-anchor live news bulletin.'
              },
              {
                lessonNumber: 8,
                title: 'Camera & Teleprompter',
                focus: 'Hardware teleprompter operation, foot/hand speed sync, and failover protocols.',
                topics: [
                  'Working with optical beam-splitter glass on heavy-duty camera pedestals',
                  'Self-pacing with prompter controllers vs working with a dedicated operator',
                  'Emergency contingency: What to do when the prompter screen goes black',
                  'Piece-to-Camera (PTC) delivery on the open studio floor without a desk'
                ],
                handsOnDrill: 'Simulated prompter blackout drill: Continuing smoothly from desk paper.'
              }
            ]
          },
          {
            period: 'Week 4 — Real-Time Breaking News, PCR Coordination & Prime-Time Anchoring',
            theme: 'Lessons 9 & 10: Live Wire Directing, Debate Hosting & Broadcast Portfolio',
            lessons: [
              {
                lessonNumber: 9,
                title: 'Breaking & Live Handling',
                focus: 'Live breaking news, IFB ear-piece cues, field interviews, and unscripted anchoring.',
                topics: [
                  'Real-time newsroom coordination: Taking live directions from Executive Producer',
                  'Mastering the in-ear monitor (IFB): Hearing director instructions while speaking',
                  'Hosting live telephone interviews and OB satellite cross-talks with field reporters',
                  'Fact-checking and verifying raw social media updates under high pressure'
                ],
                handsOnDrill: 'Intensive 20-minute simulated breaking news crisis broadcast.'
              },
              {
                lessonNumber: 10,
                title: 'Professional News Anchoring',
                focus: 'Prime-time bulletin recording, debate moderation, and graduation showreel.',
                topics: [
                  'Hosting a 4-guest live studio debate: Moderation, time management, and decorum',
                  'Complete prime-time news broadcast production with intro stings and graphics',
                  'Post-production editing of your high-definition professional showreel',
                  'Audition coaching, resume building, and placement introductions with satellite networks'
                ],
                handsOnDrill: 'Recording the official graduation prime-time showreel in Jaya TV News Studio.'
              }
            ]
          }
        ]
      },
      {
        id: 'weekend',
        title: 'Weekend Professional Batch',
        durationLabel: 'Weekend Batch',
        badge: 'Working Professionals',
        schedule: 'Saturdays & Sundays • 09:00 AM to 01:00 PM / 02:00 PM to 06:00 PM ( 12/26 Days)',
        fee: '₹15,000/25,000',
        description: 'Engineered specifically for working professionals, corporate executives, college students, and voice artists who require flexible weekend scheduling with complete access to Jaya TV studio infrastructure.',
        recommendedFor: 'Employed individuals, college students, working journalists, and weekend learners seeking professional anchoring skills without disrupting weekday commitments.',
        scheduleBreakdown: [
          {
            period: 'Weekend 1 (Sat & Sun) — Voice Science, Diction & News Reading Foundations',
            theme: 'Lessons 1, 2 & 3: Voice Conditioning & Tamil Language Articulation',
            lessons: [
              {
                lessonNumber: 1,
                title: 'News Reading Basics',
                focus: 'Broadcast journalism ethics, studio workflow, and reading tempo.',
                topics: [
                  'Introduction to television news broadcasting and studio operations',
                  'Understanding news rundowns, lead-ins, and broadcast vocabulary',
                  'Managing reading rhythm and speed calibration (130-150 WPM)'
                ],
                handsOnDrill: 'Studio microphone voice recording and baseline rhythm calibration.'
              },
              {
                lessonNumber: 2,
                title: 'Pronounciation & Diction',
                focus: 'Tamil phonetic clarity, tongue twisters, and accent neutrality.',
                topics: [
                  'Pronunciation standards for formal broadcast Tamil',
                  'Neutralizing regional dialect inflections and mother tongue influence',
                  'Muscular tongue workouts with complex news headlines'
                ],
                handsOnDrill: 'Individualized phonetic assessment with recorded audio playback.'
              },
              {
                lessonNumber: 3,
                title: 'Voice Training',
                focus: 'Diaphragmatic breathing, vocal stamina, and projection.',
                topics: [
                  'Breathing techniques to sustain continuous news delivery',
                  'Building chest resonance and deep vocal authority',
                  'Vocal warm-ups and exercises to prevent vocal fatigue'
                ],
                handsOnDrill: 'Diaphragm breath control exercises on broadcast condenser microphones.'
              }
            ]
          },
          {
            period: 'Weekend 2 (Sat & Sun) — Modulation Dynamics & Broadcast Copywriting',
            theme: 'Lessons 4 & 5: Story Cadence & Teleprompter Script Construction',
            lessons: [
              {
                lessonNumber: 4,
                title: 'Voice Modulation',
                focus: 'Pitch variation, sentence stressing, and emotional tone calibration.',
                topics: [
                  'Modulation across genres: Breaking, Politics, Cinema, and Sports',
                  'Emphasizing key facts, figures, and names without over-dramatization',
                  'Effective use of pauses for clarity and suspense'
                ],
                handsOnDrill: 'Recording a 5-story varied-tempo news bulletin in audio suite.'
              },
              {
                lessonNumber: 5,
                title: 'News Script & Writing',
                focus: 'Writing for the ear, teleprompter formatting, and anchor copy.',
                topics: [
                  'Transforming raw news copy into punchy broadcast scripts',
                  'Crafting gripping headlines and natural anchor intros',
                  'Formatting scripts with phonetic pronunciation cues for prompter screens'
                ],
                handsOnDrill: 'Writing and teleprompter-formatting a 60-second breaking news script.'
              }
            ]
          },
          {
            period: 'Weekend 3 (Sat & Sun) — Visual Presentation & Teleprompter Operations',
            theme: 'Lessons 6, 7 & 8: On-Camera Presence & Multi-Camera Systems',
            lessons: [
              {
                lessonNumber: 6,
                title: 'News Presentation',
                focus: 'Posture, on-camera eye contact, facial poise, and wardrobe styling.',
                topics: [
                  'Anchor desk posture and upper-body ergonomics',
                  'Direct lens eye connection and facial expression control',
                  'Wardrobe and grooming guidance for 4K broadcast studio cameras'
                ],
                handsOnDrill: 'Camera screen test under professional studio high-bay lighting.'
              },
              {
                lessonNumber: 7,
                title: 'News Reading Techniques',
                focus: 'Eliminating eye darting, multi-camera head turns, and rhythmic breathing.',
                topics: [
                  'Techniques to read without noticeable horizontal eye movement',
                  'Switching smoothly between Camera 1 and Camera 2 following tally lights',
                  'Co-anchor coordination and shared bulletin handoffs'
                ],
                handsOnDrill: 'Multi-camera anchor switching exercise on studio floor.'
              },
              {
                lessonNumber: 8,
                title: 'Camera & Teleprompter',
                focus: 'Teleprompter hardware operation, speed synchronization, and prompter freeze failover.',
                topics: [
                  'Working with studio optical beam-splitter teleprompters',
                  'Controlling prompter scrolling speed with foot and hand controllers',
                  'Graceful fallback to physical desk copy during prompter glitches'
                ],
                handsOnDrill: 'Full 5-minute live prompter reading drill with sudden freeze test.'
              }
            ]
          },
          {
            period: 'Weekend 4 (Sat & Sun) — Breaking News Drills & Prime-Time Showreel',
            theme: 'Lessons 9 & 10: Live Wire Coordination & Graduation Showreel',
            lessons: [
              {
                lessonNumber: 9,
                title: 'Breaking & Live Handling',
                focus: 'Real-time breaking news handling, IFB ear-piece cues, and phone-ins.',
                topics: [
                  'Anchoring unscripted breaking news from wire flashes',
                  'Listening to PCR director instructions in IFB ear-piece while speaking',
                  'Moderating live phone-in discussions and field reporter links'
                ],
                handsOnDrill: 'Simulated breaking news emergency drill with live ear-piece prompts.'
              },
              {
                lessonNumber: 10,
                title: 'Professional News Anchoring',
                focus: 'Complete mock prime-time news bulletin & personalized HD showreel recording.',
                topics: [
                  'Recording a full 10-minute prime-time news bulletin in Jaya TV newsroom',
                  'Studio graphics, lower-thirds, and broadcast presentation polish',
                  'Showreel packaging for satellite channel auditions and digital journalism portfolios'
                ],
                handsOnDrill: 'Final graduation prime-time news broadcast recorded in Jaya TV studio.'
              }
            ]
          }
        ]
      }
    ],
    fee: 'From ₹15,000',
    jayaTvHandsOn: 'Full hands-on training in the Jaya TV 4K newsroom with live teleprompters, studio multi-cam pedestal rigs, and live director ear-piece (IFB) feedback across all 10 lessons.'
  }
  
];
