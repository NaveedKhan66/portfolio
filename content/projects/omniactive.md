---
title: "OmniActive — Modern In-Home, Virtual & Mobile Fitness Platform"
subtitle: "A comprehensive personal training ecosystem uniting clients, trainers, and regional franchise facilities through custom workout builders, live virtual sessions, and automated Stripe billing."
author: "Naveed"
role: "Full-Stack Engineer"
client: "Omni-Active Fitness"
category: "FULL-STACK / FITNESS PLATFORM / AWS"
year: "2024"
liveUrl: "https://omniactive.com"
---

# Personal Training. Anywhere. Anytime.

Traditional personal training often comes with high friction—rigid gym memberships, crowded facilities, and time-consuming commutes. **Omni-Active® Fitness** was built to solve this by bringing professional, certified fitness training directly to the client: at home, at work, or on their phone.

Rather than relying on automated algorithms or generic workout templates, OmniActive focuses on real, personalized human coaching. Certified trainers build tailored programs, guide clients through live workouts, and keep them accountable every day.

As OmniActive expanded across multiple locations, it needed a unified platform to manage operations—connecting clients, trainers, and regional franchise administrators into one seamless system.

![OmniActive Super Admin Dashboard — Central management portal showing active clients, subscription metrics, Stripe revenue trends, and trainer activity](/projects/omniactive/omniactive-super-admin-dashboard.webp)

---

## My Role as Full-Stack Engineer

As the **Full-Stack Engineer** on the project, I worked across the entire stack to build and ship the platform:

- **Backend Development**: Built scalable REST APIs in **Django** and **Django REST Framework** backed by **PostgreSQL**.
- **Admin & Trainer Web Portals**: Developed responsive single-page web applications in **React** and **Redux** for platform administrators, regional branch managers, and trainers.
- **Multi-Tenant Architecture**: Implemented multi-region support so the platform can run across multiple franchise locations with isolated data and customized permissions.
- **Stripe Connect Integration**: Engineered the automated payment and split-payout system connecting regional admins to the main platform.
- **Workout Builder Studio**: Built an interactive drag-and-drop workout creation studio with instructional video uploads and client plan assignment.
- **Live Virtual Sessions**: Integrated real-time WebRTC video calling for remote 1-on-1 personal training sessions.
- **AWS Cloud Deployment**: Deployed and managed the infrastructure on **AWS** utilizing Elastic Beanstalk, S3 for media storage, and RDS for database management.

---

## Three Flexible Ways to Train

OmniActive offers three core service models to fit every client's lifestyle and budget:

![OmniActive Training Service Tiers — Online App Coaching, Live Virtual Training, and In-Person Training](/projects/omniactive/omniactive-training-service-tiers.webp)

1. **In-Person Training**: Certified personal trainers travel directly to the client's home or office with all necessary equipment. Sessions are booked in the portal and verified on-site via mobile QR code check-in.
2. **Live Virtual Training**: Interactive 1-on-1 video sessions conducted over high-quality WebRTC video calls. Clients train live with their coach from anywhere in the world.
3. **Online App Coaching**: Clients receive custom workout programming, instructional exercise videos, biometric progress tracking, and direct messaging with their trainer right inside the mobile app.

---

## Custom Workout Builder Studio

A core feature of the platform is the **Workout Builder**, an intuitive tool designed for administrators and trainers to formulate, customize, and assign tailored workout plans.

![OmniActive Workout Plans Builder — Comprehensive workout program library categorized by weight loss, muscle building, general fitness, and athletic performance](/projects/omniactive/omniactive-workout-plans-builder.webp)

The builder is organized into three connected levels:

### 1. Exercises & Video Library
Admins and trainers can add exercises with clear, step-by-step biomechanical instructions and uploaded HD demonstration videos. Movements are tagged by target muscles (chest, back, shoulders, arms, legs, core) and equipment requirements, making it easy to assemble balanced routines.

![OmniActive Exercise Video Library — Detailed biomechanical instruction breakdown and embedded demonstration video](/projects/omniactive/omniactive-exercise-video-library.webp)

### 2. Workouts & Circuit Design
Trainers assemble exercises into complete workouts using an interactive drag-and-drop workspace. The system supports single sets, supersets, continuous circuits, and customizable rest intervals, while automatically calculating estimated duration and caloric burn.

![OmniActive Workout Detail Builder — Structuring sets, reps, resistance weights, rest intervals, and target muscle groups](/projects/omniactive/omniactive-workout-detail-builder.webp)

### 3. Plans & Client Customization
Workouts are bundled into multi-week fitness programs (e.g. Weight Loss, Muscle Building, Athletic Performance). Trainers can create public plans for general use or customize private plans specifically for an individual client. 

Once a plan is assigned, it syncs instantly to the client's mobile app, allowing them to follow along and complete workouts on their own schedule. Trainers can also stage upcoming plans in advance so they activate automatically on the next billing cycle.

---

## Multi-Tenant Regional Franchises & Stripe Split Payments

As OmniActive grew to multiple regional markets (such as Cleveland East, Columbus, and Houston), the platform needed to support independent franchise management without duplicating infrastructure.

### Regional Admin Management
All multi-tenancy is controlled through the main super admin panel:
- The main admin can create new regional locations and appoint a regional admin.
- Regional admins receive an invitation link to set up their account and manage their local branch.
- Each regional admin only sees their own clients, trainers, and branch statistics, while the main admin retains global oversight across all regions.

### Automated Stripe Connect Payouts
To handle billing across independent franchise branches, OmniActive utilizes **Stripe Connect**:
- Regional admins connect their Stripe accounts directly through the admin panel.
- When a client signs up or subscribes to a training package, the payment is processed through Stripe.
- A platform fee percentage is automatically deducted and transferred to the main admin, while the remaining balance routes directly to the regional branch owner.
- Subscription status, renewals, and billing history are tracked automatically, ensuring smooth operations without manual invoicing.

---

## Mobile Client Experience

Clients interact with OmniActive through native **iOS and Android mobile apps**, putting a personal trainer right in their pocket.

![OmniActive Mobile Workout Tracking — Real-time circuit tracking, exercise demonstration guidance, and performance logging](/projects/omniactive/omniactive-mobile-app-workout.webp)

Key mobile capabilities include:
- **Interactive Workouts**: Clients view their assigned routines, follow video demonstrations for proper form, and log completed sets, reps, and weights.
- **Progress Tracking**: Metric logging for weight, body fat percentage, and body circumference measurements alongside photo progress journals.
- **Smartwatch & Health Sync**: Syncs daily step counts and active calorie burn from Apple Health and Google Health Connect.
- **Macro Calculator**: Built-in calculator providing daily calorie and macronutrient targets aligned with the client's fitness goals.
- **Direct Trainer Messaging**: In-app two-way messaging for quick questions, motivation, and feedback.
- **Session Attendance**: QR code display for quick verification during in-person sessions, and one-tap access to live virtual training calls.

---

## Summary of the Tech Stack

- **Backend**: Python, Django, Django REST Framework, PostgreSQL
- **Frontend**: React, Redux, Material UI, Modular SCSS
- **Payments & Marketplace**: Stripe & Stripe Connect
- **Live Video**: WebRTC (Agora RTC)
- **Cloud Infrastructure**: AWS (Elastic Beanstalk, S3, RDS)
- **Mobile**: iOS & Android Client and Trainer Apps
