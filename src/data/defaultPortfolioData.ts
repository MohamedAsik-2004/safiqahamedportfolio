// src/data/defaultPortfolioData.ts
import type { PortfolioData } from '../types/portfolio';

export const defaultPortfolioData: PortfolioData = {
  adminPin: '1234',
  hero: {
    name: 'SAFIQ AHAMED J',
    headlineLine1: 'I BUILD',
    headlineLine2: 'DIGITAL',
    headlineLine3: 'EXPERIENCES',
    rolesText: 'GRAPHIC DESIGNER • UI/UX DESIGNER • 3D MODELING DESIGNER',
    descriptionParagraph1: 'I turn bold ideas into seamless digital experiences.',
    descriptionParagraph2: 'Where frontend meets powerful backend, and code transforms vision into impact.',
    exploreWorkText: 'EXPLORE MY WORK',
    resumeUrl: 'https://go.fliplink.me/view/08A0FA05-B268-46A3-9223-8F5A16AFFB5A',
    quoteTitle: 'CODE IS MY CRAFT.',
    quoteSubtitle: 'IMPACT IS MY GOAL.',
    watermarkUrl: 'https://kommodo.ai/i/sBpkyLBNuWavQPrIjMsx',
    heroVideoUrl: '/videos/hero.mp4',
  },
  about: {
    eyebrow: '01 / ABOUT ME',
    headlineLine1: "I DON'T JUST WRITE CODE.",
    headlineLine2: "I BUILD WHAT'S NEXT.",
    bioName: 'SAFIQ AHAMED J',
    bioRole: 'Graphic Designer & 3D Modeling',
    bioDescription:
      "I'm Safiq Ahamed J, a Graphic Designer, UI/UX Designer, and 3D Modeling Specialist dedicated to crafting immersive visual brand identities, digital interfaces, and high-impact 3D assets.",
    stats: [
      { value: '50+', label: 'Design Projects' },
      { value: '3D & UI', label: 'Specialization' },
      { value: '100%', label: 'Creative Excellence' },
      { value: 'Visual', label: 'Storyteller' },
    ],
    aboutImageUrl: '',
  },
  projects: [
    {
      id: 'p1',
      number: '01',
      title: 'PolicyGuard AI',
      category: 'AI / LEGAL-TECH PLATFORM',
      description:
        'AI-powered platform engineered for automated privacy policy analysis and legal contract auditing across web, desktop, and mobile. Implements NLP extraction, real-time risk alert detection, and generative risk score intelligence.',
      githubUrl: 'https://github.com/lohithadamisetti123',
      tech: [
        'React.js',
        'React Native',
        'Electron.js',
        'Node.js',
        'Express.js',
        'MongoDB Atlas',
        'OpenAI API',
        'Prompt Eng',
        'NLP',
        'Docker',
        'JWT',
      ],
      metrics: [
        { label: 'PLATFORMS', value: 'Web, Mobile, Desktop' },
        { label: 'ENGINE', value: 'OpenAI NLP / GPT' },
        { label: 'PIPELINE', value: 'Automated Scoring' },
      ],
    },
    {
      id: 'p2',
      number: '02',
      title: 'Software Release Risk Heatmap',
      category: 'MACHINE LEARNING / DEV PLATFORM',
      description:
        'Full-stack predictive release management platform utilizing Machine Learning. Implements a trained Random Forest classifier to categorize release stability from Low to Critical risk, rendered over a live interactive team heatmap.',
      githubUrl: 'https://github.com/lohithadamisetti123',
      tech: [
        'React.js',
        'TypeScript',
        'Python',
        'FastAPI',
        'scikit-learn',
        'PostgreSQL',
        'Tailwind CSS',
        'REST APIs',
        'JWT',
      ],
      metrics: [
        { label: 'MODEL', value: 'Random Forest' },
        { label: 'ACCURACY', value: 'High Precision' },
        { label: 'DASHBOARD', value: 'Live Risk Heatmap' },
      ],
    },
    {
      id: 'p3',
      number: '03',
      title: 'Multi-Tenant SaaS Platform',
      category: 'CLOUD / DISTRIBUTED SYSTEM',
      description:
        'Enterprise-grade multi-tenant platform built for unified management of teams, projects, and execution lifecycles. Architected with strict tenant data isolation, granular Role-Based Access Control (RBAC), and containerized deployments.',
      githubUrl: 'https://github.com/lohithadamisetti123',
      tech: [
        'Node.js',
        'Express.js',
        'PostgreSQL',
        'React',
        'Docker',
        'JWT',
        'RBAC',
        'REST APIs',
      ],
      metrics: [
        { label: 'ARCHITECTURE', value: 'Multi-Tenant' },
        { label: 'SECURITY', value: 'RBAC Isolation' },
        { label: 'CONTAINERS', value: 'Docker Compose' },
      ],
    },
    {
      id: 'p4',
      number: '04',
      title: 'Payment Gateway with Hosted Checkout',
      category: 'FINTECH / PAYMENT SYSTEMS',
      description:
        'End-to-end hosted payment gateway infrastructure supporting seamless merchant order generation, multi-currency processing, and secure consumer checkout via UPI and Cards with webhook transaction verification.',
      githubUrl: 'https://github.com/lohithadamisetti123',
      tech: [
        'Node.js',
        'Spring Boot',
        'PostgreSQL',
        'React',
        'Docker',
        'REST APIs',
        'UPI / Card Integrations',
      ],
      metrics: [
        { label: 'PROTOCOLS', value: 'UPI & Cards' },
        { label: 'BACKEND', value: 'Spring Boot + Node' },
        { label: 'DATABASE', value: 'ACID PostgreSQL' },
      ],
    },
  ],
  skills: [
    {
      id: 's1',
      title: 'FRONTEND ARCHITECTURE',
      badge: 'CORE PILLAR',
      items: ['React.js', 'React Native', 'Tailwind CSS', 'Electron.js'],
      description:
        'Specialized in building high-performance client applications, custom component libraries, and immersive desktop/mobile interfaces.',
      stat: '100% RESPONSIVE',
      colSpan: 'lg:col-span-7',
    },
    {
      id: 's2',
      title: 'DISTRIBUTED BACKEND',
      badge: 'HIGH CONCURRENCY',
      items: ['Node.js', 'Express.js', 'Spring Boot', 'Docker', 'Redis'],
      description:
        'Engineered RESTful APIs, JWT role-based access control, caching layers, and multi-tenant SaaS backend isolation.',
      stat: '< 40ms LATENCY',
      colSpan: 'lg:col-span-5',
    },
    {
      id: 's3',
      title: 'DATA PLATFORMS',
      badge: 'PERSISTENCE',
      items: ['MongoDB Atlas', 'PostgreSQL', 'MySQL'],
      description:
        'Designing resilient relational and document schemas with optimized indexing and transaction isolation.',
      stat: 'ACID & NOSQL',
      colSpan: 'lg:col-span-5',
    },
    {
      id: 's4',
      title: 'ALGORITHMS & MACHINE LEARNING',
      badge: 'INTELLIGENCE',
      items: ['C++', 'Python', 'Java', 'scikit-learn', 'OpenAI API'],
      description:
        '1200+ algorithm problems solved. Applied Random Forest classifiers for real-time risk heatmaps and NLP policy analyzers.',
      stat: '1200+ SOLVED',
      colSpan: 'lg:col-span-7',
    },
  ],
  experience: [
    {
      id: 'e1',
      year: 'MAY - JUN 2026',
      title: 'FULL STACK & MOBILE INTERN',
      organization: 'TECHNICAL HUB PVT LTD',
      description:
        'Engineered cross-platform mobile and responsive web applications utilizing React Native and modern full-stack workflows.',
    },
    {
      id: 'e2',
      year: '2026 MILESTONE',
      title: 'TOP 100 NATIONAL TEAM',
      organization: 'MYNTRA WEFORSHE HACKERRAMP',
      description:
        'Ranked among the Top 100 nationwide teams while maintaining Department Topper status (9.07 CGPA) in Data Science.',
    },
    {
      id: 'e3',
      year: 'MAY - JUN 2025',
      title: 'FULL STACK TRAINEE',
      organization: 'TECHNICAL HUB PVT LTD',
      description:
        'Trained in modern full-stack architecture, developing and deploying end-to-end interactive responsive web platforms.',
    },
    {
      id: 'e4',
      year: '2023 - 2027',
      title: 'B.TECH IN DATA SCIENCE',
      organization: 'ADITYA COLLEGE OF ENGINEERING',
      description:
        'Specializing in Machine Learning and System Design. Solved 1200+ algorithm challenges across LeetCode, CodeChef, and GeeksforGeeks.',
    },
    {
      id: 'e5',
      year: '2021 - 2023',
      title: 'HIGHER SECONDARY (MPC)',
      organization: 'SRI CHAITANYA JUNIOR COLLEGE',
      description:
        'Completed specialized coursework in Mathematics, Physics, and Chemistry with 90.60% aggregate excellence.',
    },
  ],
  contact: {
    eyebrow: '05 / CONTACT',
    headlineLine1: 'INITIALIZE',
    headlineLine2: 'TRANSMISSION.',
    description:
      'Have an ambitious system to architect, an engineering opportunity, or a collaborative inquiry? Send a direct dispatch below.',
    email: 'mohamedasik.contact@gmail.com',
    phone: '+91 9876543210',
    location: 'TAMIL NADU, INDIA',
    socials: {
      github: 'https://github.com/MohamedAsik-2004',
      linkedin: 'https://linkedin.com/in/mohamedasik',
      leetcode: 'https://leetcode.com',
    },
  },
  messages: [
    {
      id: 'm1',
      name: 'Alex Mercer',
      email: 'alex.mercer@techcorp.io',
      message:
        'Impressed by your PolicyGuard AI project. We would love to discuss a Senior Full Stack Engineering role at TechCorp.',
      timestamp: '2026-09-22 14:30',
      read: false,
    },
  ],
};
