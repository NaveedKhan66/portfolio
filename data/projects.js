export const projects = [
  {
    id: 1,
    title: "Infinity Table - AR Virtual Tabletop RPG",
    description:
      "An AI-powered augmented reality virtual tabletop RPG platform built with FastAPI and MySQL.",
    shortDescription: "Voice-guided AR tabletop RPG with AI-driven Game Master",
    image: "/images/projects/infinity-table/infinity-main.png",
    gallery: [
      "/images/projects/infinity-table/infinity-1.png",
      "/images/projects/infinity-table/infinity-2.png",
      "/images/projects/infinity-table/infinity-3.png",
      "/images/projects/infinity-table/infinity-4.png",
      "/images/projects/infinity-table/infinity-5.png",
    ],
    tech: [
      "Python",
      "FastAPI",
      "MySQL",
      "AI Game Master",
      "Augmented Reality",
      "Voice Recognition",
    ],
    liveUrl: "/private",
    githubUrl: "/private",
    category: "Backend Development",
    year: "2025",
    caseStudy: {
      overview:
        "Infinity Table is an augmented reality virtual tabletop designed for playing role-playing game (RPG) modules with the help of an AI-powered, voice-controlled 'Adventure Guide' that acts as the Game Master. Inspired by Dungeons & Dragons, the platform creates an immersive AR-driven experience for players.",
      challenge:
        "Building a dynamic, modular backend to support real-time AR gameplay, natural language input, voice interaction with AI, and multi-user adventure modules while ensuring performance and scalability.",
      solution:
        "Contributed to backend planning and implementation using FastAPI and MySQL, focusing on scalable architecture for real-time data exchange, AI integration endpoints, and AR asset synchronization. Designed systems to manage player sessions, game logic, and AI dialogue flow management.",
      features: [
        "AI-powered voice-controlled 'Adventure Guide' acting as Game Master",
        "Real-time AR module rendering and synchronization",
        "Modular adventure storylines and branching logic support",
        "Multi-user session management and state persistence",
        "FastAPI backend with asynchronous processing",
        "MySQL-based structured data storage for game assets and player progress",
        "Developer tools for creating custom adventures",
        "Voice command parsing and AI response system",
      ],
      results:
        "Enabled seamless AR gameplay with responsive AI interaction and modular campaign support. The project laid the foundation for AI-driven tabletop experiences, receiving positive early feedback from closed beta testers for immersion and innovation.",
    },
  },

  {
    id: 2,
    title: "AudioCardio - Audio Therapy App",
    description:
      "Clinically-backed audio therapy app to improve hearing and manage tinnitus using personalized sound conditioning.",
    shortDescription:
      "Hearing improvement and tinnitus relief through sound therapy",
    image: "/images/projects/audio-cardio/audio-main.png",
    gallery: [
      "/images/projects/audio-cardio/audio-1.png",
      "/images/projects/audio-cardio/audio-2.png",
      "/images/projects/audio-cardio/audio-3.png",
      "/images/projects/audio-cardio/audio-4.png",
      "/images/projects/audio-cardio/audio-5.jpeg",
      "/images/projects/audio-cardio/audio-6.jpeg",
      "/images/projects/audio-cardio/audio-7.jpeg",
      "/images/projects/audio-cardio/audio-8.jpeg",
    ],
    tech: [
      "Python",
      "Django",
      "React.js",
      "ANT Design",
      "Firebase",
      "Firestore",
      "GCP App Engine",
    ],
    liveUrl: "https://audiocardio.com/",
    githubUrl: "/private",
    category: "Full Stack",
    year: "2023",
    caseStudy: {
      overview:
        "AudioCardio is a mobile-first audio therapy application that uses clinically-validated Threshold Sound Conditioning™ to strengthen hearing and reduce the effects of tinnitus. The app delivers customized, inaudible sound therapy tailored to the user's hearing profile, with seamless background operation and daily engagement.",
      challenge:
        "Building a scalable and maintainable full-stack platform that handles personalized audio session logic, user tracking, and cross-platform notifications — all while maintaining a smooth user experience and reliable deployments.",
      solution:
        "Worked on both backend and frontend teams to build core infrastructure in Django, integrated Firebase Firestore for flexible NoSQL storage, and developed APIs to manage therapy sessions and user profiles. Created CI/CD pipelines and upgraded the deployment process using Google Cloud App Engine. Contributed to the React frontend using ANT Design to deliver a clean and intuitive UI.",
      features: [
        "Personalized sound therapy generation and user tracking",
        "Firebase Firestore for session and user data storage",
        "Firebase Cloud Messaging for notification delivery",
        "CI/CD pipelines for automated deployment and testing",
        "Deployment and scaling using GCP App Engine",
        "React.js frontend built with ANT Design system",
        "Modular backend API architecture using Django",
        "Daily session reminders and progress visualization",
      ],
      results:
        "Improved deployment efficiency and system scalability while contributing to the growth of a user-facing healthcare tool trusted by thousands. Enhanced the reliability of therapy delivery and accelerated feature rollout.",
    },
  },

  {
    id: 3,
    title: "OmniActive Fitness App",
    description:
      "Trainer-driven fitness and nutrition platform offering personalized programs, progress tracking, and real-time engagement.",
    shortDescription:
      "Custom fitness platform with real-time tracking and trainer interaction",
    image: "/images/projects/omniactive/omni-main.png",
    gallery: [
      "/images/projects/omniactive/omni-1.png",
      "/images/projects/omniactive/omni-2.png",
      "/images/projects/omniactive/omni-3.png",
      "/images/projects/omniactive/omni-4.png",
      "/images/projects/omniactive/omni-5.png",
      "/images/projects/omniactive/omni-6.png",
      "/images/projects/omniactive/omni-7.png",
      "/images/projects/omniactive/omni-8.png",
    ],
    tech: [
      "Python",
      "Django",
      "Django REST Framework",
      "PostgreSQL",
      "AWS Elastic Beanstalk",
      "EC2",
      "S3",
      "AWS Lambda",
      "Amazon EventBridge",
      "Amazon RDS With Read Replicas",
    ],
    liveUrl: "https://www.omniactivefitness.com/",
    githubUrl: "/private",
    category: "Backend Development",
    year: "2024",
    caseStudy: {
      overview:
        "OmniActive is a fitness and wellness platform that provides personalized training programs, live trainer interactions, progress tracking, and health data integration. The app combines custom workouts, gamification elements, and direct trainer support to deliver a holistic fitness experience.",
      challenge:
        "Building a robust and scalable backend system capable of supporting real-time interactions between users and trainers, handling personalized fitness programs, and managing extensive health tracking data while integrating with AWS services for performance and reliability.",
      solution:
        "Worked on the backend development team using Django and Django REST Framework to build scalable APIs. Integrated PostgreSQL for structured data storage, utilized AWS services like Elastic Beanstalk for deployment, EC2 for compute, S3 for media handling, Lambda functions for background processing, EventBridge for event-driven automation, and Amazon RDS for database management.",
      features: [
        "RESTful API development with Django REST Framework",
        "Custom workout and nutrition program logic",
        "Progress tracking and goal setting endpoints",
        "S3-based media upload and retrieval",
        "Serverless event-driven workflows using AWS Lambda and EventBridge",
        "PostgreSQL data modeling and optimization",
        "Secure deployment using AWS Elastic Beanstalk and EC2",
        "Trainer-user messaging and notification system",
      ],
      results:
        "Successfully supported thousands of users with stable backend infrastructure, enabling scalable deployment, faster response times, and improved system observability across AWS-integrated services.",
    },
  },
  {
    id: 4,
    title: "Gamerize Dictionary Platform",
    description:
      "Gamified English learning platform combining vocabulary building, pronunciation training, and spaced repetition with real-time performance tracking and scalable backend infrastructure.",
    shortDescription:
      "Gamified English-learning platform with scalable backend and performance monitoring",
    image: "/images/projects/gamerize/gamerize-main.png",
    gallery: [
      "/images/projects/gamerize/gamerize-1.png",
      "/images/projects/gamerize/gamerize-2.jpeg",
      "/images/projects/gamerize/gamerize-3.png",
      "/images/projects/gamerize/gamerize-4.png",
      "/images/projects/gamerize/gamerize-5.png",
      "/images/projects/gamerize/gamerize-6.png",
      "/images/projects/gamerize/gamerize-7.jpeg",
      "/images/projects/gamerize/gamerize-8.jpeg",

    ],
    tech: [
      "Python",
      "Django",
      "Django REST Framework",
      "PostgreSQL",
      "AWS Elastic Beanstalk",
      "EC2",
      "Amazon RDS",
      "S3",
      "AWS Lambda",
      "Amazon EventBridge",
      "Bitbucket Pipelines",
      "Django Silk",
      "New Relic",
    ],
    liveUrl: "https://gamerize-dictionary.com/en/",
    githubUrl: "/private",
    category: "Backend Development",
    year: "2024",
    caseStudy: {
      overview:
        "Gamerize is a gamified learning platform designed to help students improve their English skills through interactive vocabulary practice, pronunciation challenges, and personalized feedback. The platform is used in educational institutions to support classroom learning with engaging digital content.",
      challenge:
        "Build and maintain a highly available backend system that supports real-time user interactions, integrates performance monitoring, handles cron-driven tasks, and scales with thousands of active learners, while ensuring fast deployments and robust observability.",
      solution:
        "Led backend development using Django and Django REST Framework. Implemented scalable APIs and cron jobs using App Scheduler. Deployed infrastructure on AWS using Elastic Beanstalk and EC2, with RDS for data storage and S3 for media. Integrated AWS Lambda and EventBridge for asynchronous workflows. Set up New Relic and Django Silk for application monitoring. Designed and implemented CI/CD pipelines using Bitbucket Pipelines, reducing deployment time by 90%.",
      features: [
        "RESTful API development with Django REST Framework",
        "Cron job automation via App Scheduler",
        "Bitbucket Pipelines for rapid deployment (90% time reduction)",
        "AWS Lambda and EventBridge-based event processing",
        "Integrated performance tracking with New Relic and Django Silk",
        "Scalable infrastructure with AWS Elastic Beanstalk and EC2",
        "S3-based file storage and retrieval",
        "Optimized PostgreSQL queries and data models",
      ],
      results:
        "Delivered a stable and responsive backend capable of supporting thousands of daily active users. Enhanced deployment reliability and speed, improved system observability, and ensured seamless scalability through AWS-native solutions and performance tools.",
    },
  },
];

export const featuredProjects = projects.slice(0, 3);
