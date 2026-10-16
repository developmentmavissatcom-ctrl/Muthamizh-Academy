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
  id: 'practical-networking-it-support',
  title: 'Practical Computer Networking & IT Support Engineering',
  category: 'online_learning',
  categoryName: 'Online & Virtual Labs',
  duration: '30 Days (20 Days Online + 10 Days Practical)',
  mode: '20 Days Online + 10 Days Hands-On Training at Jaya TV Office',
  deliveryFormat: '20 Days Live Online Interactive Classes & Network Simulation + 10 Days On-Site Real-Time Hardware, Firewall & IT Support Labs',
  isOnline: false,

  eligibility: 'Open to Beginners, CS/IT Students, Diploma/Degree Students, IT Support Seekers & Aspiring Network Engineers',

  description: 'A premier practical networking course engineered to prepare you for high-growth careers in computer networking, systems administration, and IT support work. Master essential networking foundations through interactive classes and network simulation, IP addressing, subnetting, managed switching, VLANs, routing, OSPF, firewalls, network security, and troubleshooting, followed by 10 intensive days of hands-on practical training with real-time enterprise hardware — including physical firewalls, routers, managed switches, servers, patch panels, and structured network cabling at the Jaya TV office.',

  badge: 'Real-Time Hardware & IT Support',

  highlight: 'Hands-on practical networking training for your future networking & IT support career with real-time firewalls, enterprise routers, managed switches, servers, and cabling.',

  image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',

  tools: [
    'Real-Time Enterprise Routers',
    'Managed Network Switches',
    'Hardware & Software Firewalls',
    'Network Simulation Tools & CLI',
    'Network Servers & Server Racks',
    'Ethernet & RJ45 Structured Cabling',
    'Wireshark Network Protocol Analyzer',
    'Network Testing & Cable Diagnostics',
    'IP Addressing & Subnetting Tools',
    'Live Jaya TV Network Infrastructure'
  ],

  careerRoles: [
    'Network Support Engineer',
    'IT Support Engineer / Desktop Support Specialist',
    'Network Administrator',
    'NOC Support Associate',
    'Hardware & Network Technician',
    'Systems & Infrastructure Support Engineer',
    'Field Network Engineer'
  ],

  keyModules: [
    'Computer Networking Fundamentals & Network Simulation Labs',
    'IPv4, IPv6, Subnetting & Enterprise Network Services',
    'Managed Switching, VLANs, Trunking & Dynamic Routing',
    'Enterprise Firewall Configuration, OSPF, DHCP, DNS & NAT',
    'Real-Time Hardware Networking, Firewall Security & Office Network Deployment'
  ],

  chapters: [
    {
      title: 'Chapter 1 — Networking Fundamentals & Network Simulation Basics',
      topics: [
        '1.1 Introduction to Computer Networking (LAN, WAN, WLAN, Internet & Network Topologies)',
        '1.2 Network Devices (PC, Switch, Router, Firewall, Access Point & Server)',
        '1.3 OSI & TCP/IP Reference Models and Protocol Stacks',
        '1.4 Ethernet Standards, MAC Addresses & Frame Communication',
        '1.5 Introduction to Network Simulation Tools & Virtual Workbenches',
        '1.6 Building Your First Network in Simulation (PC-to-Switch, Routing & Basic Connectivity)'
      ]
    },

    {
      title: 'Chapter 2 — IP Addressing, Subnetting & Network Services',
      topics: [
        '2.1 IPv4 Addressing Schemes & Network Configuration',
        '2.2 Subnet Masks, CIDR & Variable Length Subnetting (VLSM)',
        '2.3 Default Gateway, Public vs. Private IPs & RFC 1918',
        '2.4 IPv6 Addressing Fundamentals & Modern Standards',
        '2.5 Core Network Services: DHCP, DNS, ARP & ICMP',
        '2.6 Network IP Configuration & End-to-End Connectivity Labs'
      ]
    },

    {
      title: 'Chapter 3 — Managed Switching, VLANs & Routing Simulation',
      topics: [
        '3.1 Device Operating System CLI & Essential Administrative Commands',
        '3.2 Managed Switch Configuration & MAC Address Learning Tables',
        '3.3 VLAN Segmentation & Access Port Configuration',
        '3.4 802.1Q Trunking & Inter-VLAN Routing (Router-on-a-Stick)',
        '3.5 Static Routing, Default Routes & Floating Routes',
        '3.6 OSPF Dynamic Routing Protocol Fundamentals & Simulation Labs'
      ]
    },

    {
      title: 'Chapter 4 — Network Services, Firewall Security & Troubleshooting',
      topics: [
        '4.1 Enterprise DHCP & DNS Server Configuration',
        '4.2 NAT/PAT Gateway Architecture & Internet Sharing',
        '4.3 Network Security Foundations, Passwords, Access Levels & SSH',
        '4.4 Real-Time Firewall Fundamentals, Access Control Lists (ACLs) & Port Security',
        '4.5 Network Troubleshooting Methodologies (ping, traceroute, netstat & show commands)',
        '4.6 Complete Simulated Enterprise Network Infrastructure Project'
      ]
    },

    {
      title: 'Chapter 5 — Real-Time Hardware Networking, Firewalls & Jaya TV Practical',
      topics: [
        '5.1 Enterprise Router, Managed Switch & Firewall Hardware Identification',
        '5.2 Physical Patch Panels, Ethernet Cable Crimping (T568A/B) & Cable Testing',
        '5.3 Console Cable Direct Access, Terminal Emulation & Device Initial Setup',
        '5.4 Real-Time Firewall Security Policies, VLANs, Trunking & OSPF Deployment',
        '5.5 Server Rack Mounting, DHCP/NAT Integration & Real Network Troubleshooting',
        '5.6 Real-World Office Network Deployment & Final Hands-On Capstone Project'
      ]
    }
  ],

  trainingPlan: {
    onlineTraining: {
      duration: '20 Days',
      format: 'Live Online Classes + Network Simulation Labs',
      focus: [
        'Networking Fundamentals',
        'OSI & TCP/IP Reference Models',
        'Network Devices & Ethernet Protocols',
        'IPv4 & IPv6 Subnetting & Planning',
        'DHCP & DNS Architecture',
        'Device CLI & Configuration',
        'Managed Switching & MAC Tables',
        'VLANs, Access Ports & 802.1Q Trunking',
        'Inter-VLAN Routing & Gateway Routing',
        'Static Routing & OSPF Dynamic Routing',
        'NAT/PAT & Port Forwarding',
        'Firewall Security & Access Control Lists',
        'Network Troubleshooting & Diagnostics',
        'Complete Enterprise Network Simulation Project'
      ]
    },

    practicalTraining: {
      duration: '10 Days',
      location: 'Jaya TV Office',
      format: 'Hands-On Hardware, Firewalls & Live Network Engineering Training',
      focus: [
        'Physical Enterprise Router Hardware',
        'Managed Switch Hardware & Stacking',
        'Real-Time Firewall Configuration & Rules',
        'Enterprise Network Servers & Server Racks',
        'Ethernet RJ45 Cabling & Patch Panels',
        'Console Port Direct Hardware Configuration',
        'VLAN & Trunk Configuration on Real Switches',
        'Inter-VLAN Routing on Physical Routers',
        'Dynamic Routing & OSPF Implementation',
        'Firewall Security Policies & NAT',
        'Live Broadcast Server & Client Connectivity',
        'Hardware Network Troubleshooting & Packet Capture',
        'Complete Real-World Office Network Deployment'
      ]
    }
  },

  practicalLabs: [
    'Build and configure an enterprise LAN using network simulation',
    'Design IPv4 network subnets and assign IP address schemes',
    'Configure managed switches, VLANs, and 802.1Q trunk links',
    'Configure inter-VLAN routing and default gateways',
    'Configure static routes, default routes, and OSPF routing protocols',
    'Deploy real-time firewall policies, access control lists (ACLs), and port security',
    'Deploy enterprise DHCP and DNS services',
    'Configure NAT/PAT for secure corporate internet access',
    'Perform network troubleshooting using CLI diagnostics and Wireshark',
    'Recreate simulated enterprise networks using physical firewalls, routers, and switches'
  ],

  projects: [
    'Project 1: Enterprise Office LAN with Network Simulation',
    'Project 2: Multi-Department VLAN & Segmented Security Network',
    'Project 3: Inter-VLAN Routing, Firewall Rules & DHCP Architecture',
    'Project 4: Multi-Router OSPF Routed Campus Network',
    'Project 5: Complete Office Network Deployment using Real-Time Hardware (Firewalls, Routers & Switches)'
  ],

  assessment: [
    'Online Computer Networking Fundamentals Assessments',
    'IPv4 & Subnetting Problem-Solving Exercises',
    'Network CLI Configuration Practicals',
    'Network Simulation Scenario Labs',
    'Firewall & Network Security Policy Audits',
    'Live Network Troubleshooting Challenge',
    'Physical Hardware Configuration & Cabling Assessment',
    'Final Real-Time Office Network Capstone Project'
  ],

  certification: 'Course Completion Certificate in Practical Computer Networking & IT Support Engineering',

  fee: '₹5,000',

  jayaTvHandsOn: 'Transform network theory into practical job-ready confidence by configuring and troubleshooting real-time hardware — physical enterprise routers, managed switches, real-time firewalls, network servers, and structured cabling — at the Jaya TV office. Students will deploy working multi-tier networks on physical hardware and complete a full real-world office network project.'
},

{
  id: 'manual-software-testing',
  title: 'Manual Software Testing',
  category: 'online_learning',
  categoryName: 'Online Learning',
  duration: '30 Days',
  mode: '100% Online',
  deliveryFormat: '30 Days Live Online Classes + Practical Testing Exercises + Real-Time Web Application Testing',
  isOnline: true,

  eligibility: 'Open to Beginners, CS/IT Students, Diploma/Degree Students, Graduates, Software Testing Aspirants & Working Professionals',

  description: 'Build practical software testing skills through Manual Testing fundamentals, SDLC, STLC, web application testing, basic networking for testers, functional testing, test case design, defect management, Jira, regression testing and real-time web application testing — completely through online training.',

  badge: 'Industry-Ready Manual Testing',

  highlight: 'Learn Manual Testing, Web Testing, Basic Networking for Testers, Test Case Design, Bug Reporting, Jira & Real-Time Online QA Practices',

  image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',

  tools: [
    'Jira',
    'Web Browsers',
    'Google Chrome / Microsoft Edge',
    'Chrome / Edge Developer Tools',
    'Network Tab',
    'Excel / Google Sheets',
    'Test Case Management Tools',
    'Bug Tracking Tools',
    'Postman — Basic API Testing',
    'Real Web Applications'
  ],

  careerRoles: [
    'Manual Tester',
    'Software Test Engineer',
    'QA Tester',
    'Quality Assurance Analyst',
    'Test Analyst',
    'Junior QA Engineer',
    'Software Testing Associate'
  ],

  keyModules: [
    'Software Testing & Web Application Fundamentals',
    'Basic Networking & Web Communication for Testers',
    'Testing Types, Levels & Techniques',
    'Test Case Design & Test Execution',
    'Defect Management, Jira & Real-Time Testing Project'
  ],

  chapters: [
    {
      title: 'Chapter 1 — Software Testing & Web Application Fundamentals',
      topics: [
        '1.1 Introduction to Software Testing & Quality Assurance',
        '1.2 Software Development Life Cycle (SDLC) & Testing Life Cycle (STLC)',
        '1.3 Verification, Validation & Testing Principles',
        '1.4 Client-Server Architecture & Web Application Basics',
        '1.5 Basic Networking — IP Address, DNS, Domain, URL & Ports',
        '1.6 HTTP/HTTPS, Request, Response & Basic Web Communication'
      ]
    },

    {
      title: 'Chapter 2 — Testing Types, Levels & Web Networking',
      topics: [
        '2.1 Functional & Non-Functional Testing',
        '2.2 Unit, Integration, System & Acceptance Testing',
        '2.3 Smoke, Sanity, Regression & Retesting',
        '2.4 Black-Box, Positive, Negative, Exploratory & Ad-hoc Testing',
        '2.5 HTTP Methods — GET, POST, PUT & DELETE',
        '2.6 HTTP Status Codes, Browser Developer Tools & Network Tab'
      ]
    },

    {
      title: 'Chapter 3 — Test Case Design & Test Execution',
      topics: [
        '3.1 Requirement Analysis & Test Scenario Creation',
        '3.2 Test Case Writing & Test Data Preparation',
        '3.3 Equivalence Partitioning',
        '3.4 Boundary Value Analysis',
        '3.5 Decision Table Testing',
        '3.6 Test Execution & Requirement Traceability Matrix (RTM)'
      ]
    },

    {
      title: 'Chapter 4 — Defect Management & Jira',
      topics: [
        '4.1 Defect / Bug Life Cycle',
        '4.2 Bug Identification & Reporting',
        '4.3 Expected Result vs Actual Result',
        '4.4 Severity vs Priority',
        '4.5 Retesting & Regression After Bug Fixes',
        '4.6 Jira — Bug Creation, Tracking & Management'
      ]
    },

    {
      title: 'Chapter 5 — Real-Time Online Manual Testing Project',
      topics: [
        '5.1 Real-World Requirement Analysis',
        '5.2 Test Scenario, Test Case & Test Data Preparation',
        '5.3 Functional, Positive, Negative & Regression Testing',
        '5.4 Web Application Testing & Defect Identification',
        '5.5 Jira Reporting, Retesting & Regression Testing',
        '5.6 End-to-End Web Application Testing Project'
      ]
    }
  ],

  trainingPlan: {
    onlineTraining: {
      duration: '30 Days',
      format: '100% Live Online Classes + Practical Testing Exercises + Real-Time Web Application Testing',
      focus: [
        'Software Testing Fundamentals',
        'SDLC & STLC',
        'Testing Principles',
        'Client-Server Architecture',
        'Basic Networking for Testers',
        'IP Address & DNS Basics',
        'HTTP & HTTPS',
        'Request & Response',
        'Functional & Non-Functional Testing',
        'Testing Levels',
        'Smoke & Sanity Testing',
        'Regression & Retesting',
        'Black-Box Testing',
        'Positive & Negative Testing',
        'HTTP Methods',
        'HTTP Status Codes',
        'Browser Developer Tools',
        'Network Tab',
        'Test Case Design',
        'Test Data Preparation',
        'Test Execution',
        'Defect Reporting',
        'Jira',
        'Real-Time Web Application Testing'
      ]
    }
  },

  practicalLabs: [
    'Understand client-server communication using a web application',
    'Identify basic IP, DNS, domain, URL and HTTP/HTTPS concepts',
    'Inspect HTTP requests and responses using Browser Developer Tools',
    'Identify GET, POST, PUT and DELETE requests',
    'Analyze HTTP status codes such as 200, 201, 400, 401, 403, 404 and 500',
    'Test web application login, registration and form validation',
    'Prepare functional and negative test cases',
    'Perform smoke, sanity, regression and retesting',
    'Apply equivalence partitioning and boundary value analysis',
    'Identify and document software defects',
    'Create and manage bugs using Jira',
    'Perform complete end-to-end web application testing online'
  ],

  projects: [
    'Project 1: Web Application Requirement & Test Scenario Analysis',
    'Project 2: Test Case Design & Functional Testing Project',
    'Project 3: Web Application Network & HTTP Testing Project',
    'Project 4: Jira Defect Management & Regression Testing Project',
    'Project 5: End-to-End Online Web Application Testing Project'
  ],

  assessment: [
    'Software Testing Fundamentals Assessment',
    'SDLC & STLC Assessment',
    'Basic Networking for Testers Assessment',
    'Testing Types & Techniques Exercises',
    'Test Case Design Assessment',
    'Functional Testing Practical',
    'Bug Reporting & Severity/Priority Assessment',
    'Jira Practical Exercise',
    'Web Application Testing Assignment',
    'Final End-to-End Manual Testing Project'
  ],

  certification: 'Course Completion Certificate in Manual Software Testing',

  fee: '₹5,000',

  onlineHandsOn: 'Gain practical Manual Testing experience through live online classes and guided hands-on exercises. Students will analyze real-world requirements, prepare test scenarios and test cases, execute functional and regression tests, inspect web requests using browser developer tools, identify defects, report bugs in Jira, perform retesting and complete an end-to-end web application testing project entirely online.'
},


 
  {
    id: 'Television News Reading, Anchoring & Digital Journalism',
    title: 'NEWS Reader Training Program',
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
  },

  {
    id: 'tally-prime-gst-crash-course',
    title: 'Tally Prime + GST Crash Course (Practical Accounts & GST Training)',
    category: 'short_term',
    categoryName: 'Crash Course (Short Term)',
    duration: '8 Days (16 Hours — 2 Hours / Day)',
    mode: '8 Days Practical Intensive Training (Live Interactive Computer Labs & Case Studies)',
    deliveryFormat: '16 Hours Intensive Practical Training (2 Hours/Day across 8 Days) with Live TallyPrime Software & Government GST Portal',
    isOnline: true,
    eligibility: 'Open to B.Com / M.Com Students, Commerce Graduates, Non-Commerce Beginners, Business Owners, Accounting Aspirants & Working Professionals',
    description: 'A comprehensive 8-day (16-hour) practical intensive crash course engineered to provide complete real-world confidence in computerized accounting and taxation. Master the fundamentals of accounting, financial statement reading, hands-on TallyPrime voucher and inventory workflows, bank reconciliation, and practical GST compliance including portal registration, Input Tax Credit (ITC) computation, and live filing of GSTR-1 and GSTR-3B returns.',
    badge: '8-Day Practical Crash Course',
    highlight: 'Gain 100% practical confidence to independently manage company accounts in TallyPrime and execute all practical GST procedures, from invoice generation to live GSTR-1 & GSTR-3B return filing.',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80',
    tools: [
      'TallyPrime 4.0 / 5.0',
      'GST Government Portal (gst.gov.in)',
      'GSTR-1 Offline Tool & JSON Generator',
      'GSTR-3B Return Filing Utilities',
      'Bank Reconciliation Statements (BRS)',
      'Trial Balance & P&L Statement Analysis',
      'HSN / SAC Code Classification Tools',
      'Microsoft Excel for Financial Auditing'
    ],
    careerRoles: [
      'Tally & Accounts Executive',
      'GST Practitioner & Filing Specialist',
      'Junior / Senior Accountant',
      'Billing & Inventory Manager',
      'Tax & Accounts Consultant',
      'Audit Assistant',
      'Freelance Accounting & GST Consultant'
    ],
    keyModules: [
      'Day 1: Introduction to Accounting & Golden Rules with Practical Business Examples (2 Hrs)',
      'Day 2: Preparation & In-Depth Reading of Financial Statements, P&L & Balance Sheet (2 Hrs)',
      'Day 3: Basics of TallyPrime, Company Creation, Ledgers & Accounting Groups (2 Hrs)',
      'Day 4: Practical Tally Invoicing, Voucher Entries & Inventory Management (2 Hrs)',
      'Day 5: Advanced Tally Practice, Bank Reconciliation (BRS) & Financial Reporting (2 Hrs)',
      'Day 6: Introduction to GST Laws, CGST/SGST/IGST, ITC & Rate Structures (2 Hrs)',
      'Day 7: Practical Approach to New GST Registration on the Official GST Portal (2 Hrs)',
      'Day 8: Practical Filing of GST Returns (GSTR-1 & GSTR-3B) with Live Portal Workflow (2 Hrs)'
    ],
    chapters: [
      {
        title: 'Day 1 — Introduction to Accounting & Fundamentals (2 Hours)',
        topics: [
          'Basic fundamentals of Accounting and its importance in modern businesses',
          'Golden Rules of Accounting: Personal, Real, and Nominal Accounts with real-world examples',
          'Understanding Debits, Credits, Assets, Liabilities, Incomes, and Expenses',
          'Journalizing practical commercial transactions to ensure solid conceptual clarity',
          'Chart of accounts, ledger classification, and trial balance introduction'
        ]
      },
      {
        title: 'Day 2 — Preparation of Financial Statements & Analysis (2 Hours)',
        topics: [
          'Step-by-step preparation of Trading Account, Profit & Loss (P&L) Account, and Balance Sheet',
          'Learning to read and analyze financial statements to understand company profitability and net worth',
          'Verification of Assets vs. Liabilities and working capital analysis',
          'Closing entries, adjustment entries for prepaid/accrued expenses, and bad debts',
          'Cash Flow & Bank Reconciliation Statement (BRS) foundations'
        ]
      },
      {
        title: 'Day 3 — Basics of TallyPrime Architecture & Setup (2 Hours)',
        topics: [
          'Fundamentals of TallyPrime: Interface overview, navigation, and top keyboard shortcuts',
          'Company Creation, alteration, setting up financial years, security controls, and multi-company setup',
          'Primary & Secondary Accounting Groups in TallyPrime and their strategic hierarchy',
          'Creating Ledgers with Bill-by-Bill details, credit periods, and opening balances',
          'Configuring accounting features, voucher types, and basic system preferences'
        ]
      },
      {
        title: 'Day 4 — Tally Practical Training: Daily Vouchers & Inventory (2 Hours)',
        topics: [
          'Practical training and hands-on entry for Payment, Receipt, Contra, and Journal vouchers',
          'Sales & Purchase Invoicing workflows with cash/credit transactions and trade discounts',
          'Inventory Management: Setting up Stock Groups, Stock Categories, Units of Measure (UOM), and Stock Items',
          'Linking inventory items to sales and purchase vouchers with real trade data',
          'Displaying and auditing day-to-day entries in the Day Book'
        ]
      },
      {
        title: 'Day 5 — Advanced Tally Practice: Banking, BRS & Final Reports (2 Hours)',
        topics: [
          'Practical training on Debit Notes (Purchase Returns) and Credit Notes (Sales Returns)',
          'Bank Reconciliation in TallyPrime: Manual and auto-reconciliation of bank statements',
          'Cash Book, Bank Book, and Outstanding Receivables/Payables (Ageing Analysis)',
          'Generating and interpreting real-time Trial Balance, Profit & Loss Account, and Balance Sheet',
          'Simulated end-to-end accounting cycle for trading and service enterprises'
        ]
      },
      {
        title: 'Day 6 — Introduction to GST Framework & Applicability (2 Hours)',
        topics: [
          'Fundamentals of Goods & Services Tax (GST) in India: CGST, SGST, IGST, and UTGST structure',
          'GST applicability thresholds (Goods vs. Services), Composition scheme vs. Regular scheme',
          'HSN (Harmonized System of Nomenclature) and SAC codes identification and tax rate slabs (0%, 5%, 12%, 18%, 28%)',
          'Input Tax Credit (ITC) mechanism: Eligibility criteria, blocked credits under Section 17(5), and tax offset rules',
          'Configuring GST in TallyPrime: Enabling GST, GSTIN configuration, and creating tax ledgers'
        ]
      },
      {
        title: 'Day 7 — Practical Approach to Registration Under GST (2 Hours)',
        topics: [
          'Step-by-step practical approach for New Registration on the official GST Portal (gst.gov.in)',
          'Pre-requisites and documentation checklist: PAN, Aadhaar, Business Address proof, Bank verification, and Authorized Signatory',
          'Filing Form GST REG-01 (Part A generation of TRN and Part B application submission)',
          'e-Verification methods (Aadhaar OTP / DSC) and Application Reference Number (ARN) generation',
          'Tracking registration application status, replying to clarification notices (REG-03/04), and downloading the GSTIN Certificate (REG-06)'
        ]
      },
      {
        title: 'Day 8 — Practical Filing of GST Returns: GSTR-1 & GSTR-3B (2 Hours)',
        topics: [
          'Overview of the GST return filing calendar, due dates, late fees, and statutory interest rules',
          'Filing GSTR-1: Outward supplies, B2B invoices, B2C Large/Small, Credit/Debit notes, and HSN summary',
          'Filing GSTR-3B: Monthly summary return, auto-population from GSTR-1 & GSTR-2B, ITC claim verification, and tax payment via electronic cash/credit ledger',
          'Generating JSON return files directly from TallyPrime and uploading to the GST offline tool/portal',
          'End-to-end practical walkthrough of live GST portal return submission and challan generation'
        ]
      }
    ],
    fee: '₹15,000',
    onlineHandsOn: '100% hands-on practical training with real commercial case studies in TallyPrime, bank reconciliation, GST portal registration simulation, and live filing of GSTR-1 and GSTR-3B returns. Guaranteed to give students absolute confidence to handle company accounts and GST operations independently.'
  }
  
];
