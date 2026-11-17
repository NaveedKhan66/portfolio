---
title: "AudioCardio — Clinically Proven Hearing Therapy & Sound Conditioning Platform"
subtitle: "Delivering non-invasive acoustic physical therapy to exercise hearing and relieve tinnitus through cross-platform React Native mobile apps, Django backend APIs, and a React subscription administration portal on GCP."
author: "Naveed"
role: "Full-Stack Engineer"
client: "AudioCardio"
category: "FULL-STACK / DIGITAL HEALTH / MOBILE / GCP"
year: "2024"
liveUrl: "https://audiocardio.com"
---

# Physical Therapy for Your Hearing

Hearing health is directly connected to cognitive and brain health. Traditional hearing aids simply amplify sound—often overwhelming already fatigued hair cells in the cochlea—while sound masking tools merely drown out tinnitus temporarily. **AudioCardio** takes a fundamentally different, restorative approach: non-invasive, personalized sound therapy that exercises and rehabilitates the auditory system.

Backed by clinical research—including a double-blind randomized controlled trial led by **Stanford University** researchers where **78.3%** of participants showed significant hearing threshold improvements—AudioCardio delivers "physical therapy for your ears." Recognized as a **Fast Company World Changing Ideas Finalist**, the platform empowers users to strengthen their hearing and find relief from tinnitus using everyday smartphones and headphones.

![AudioCardio Hero Landing — Evidence-based mobile app designed to strengthen hearing and relieve tinnitus, recognized as a Fast Company World Changing Ideas Finalist](/projects/audiocardio/audiocardio-hero-landing.webp)

---

## My Role as Full-Stack Engineer

As the **Full-Stack Engineer** on the project, I contributed across the entire stack—spanning the mobile application, web management portals, backend services, and cloud infrastructure:

- **Mobile Application (React Native)**: Developed and maintained key features for the cross-platform **iOS and Android** client apps, including the calibrated hearing assessment engine, background acoustic session playback, and longitudinal progress tracking.
- **Backend Architecture (Django)**: Built and maintained RESTful APIs using **Django** and **Django REST Framework** backed by **PostgreSQL**, powering user authentication, session data logging, hearing threshold records, and billing integrations.
- **Admin & Client Web Portal (React)**: Developed the web front-end in **React**, designed specifically as an administrative portal to manage registered clients, oversee active subscription tiers, and handle payment methods.
- **Cloud Infrastructure (GCP)**: Deployed and maintained scalable, secure cloud services on **Google Cloud Platform (GCP)**, ensuring reliable API uptime, data persistence, and secure handling of user health metrics.

---

## How Threshold Sound Conditioning (TSC) Works

At the core of AudioCardio is patented **Threshold Sound Conditioning (TSC)** technology. Rather than blasting loud sounds, TSC gently stimulates damaged or dormant auditory cells at their perception threshold:

![AudioCardio Hearing Assessment Science — Patented Threshold Sound Conditioning (TSC) calibrated to individual ear frequencies](/projects/audiocardio/audiocardio-science-assessment.webp)

1. **Personalized Assessment**: Users take a quick 2-to-3 minute hearing check per ear using standard headphones to establish baseline frequency thresholds ($dBr$) and generate an ear-by-ear **Hearing Score** (0–100).
2. **Sub-Audible Stimulation**: The algorithm targets the user's weakest frequency bands and generates barely audible or sub-threshold acoustic signals. This encourages the cochlea's hair cells and auditory pathways to actively fire and adapt through neuroplasticity without causing auditory fatigue.
3. **Passive Daily Conditioning**: Users complete a 60-minute daily session (once a day or two 30-minute intervals). The therapy runs passively in the background, allowing users to listen while working, relaxing, or streaming media.

---

## Mobile App Experience (iOS & Android)

The mobile application built with **React Native** serves as the primary touchpoint for end users:

![AudioCardio Sound Therapy Session and Hearing Progress Score — 60-minute daily acoustic conditioning session and personal hearing score progress](/projects/audiocardio/audiocardio-mobile-sound-therapy.webp)

- **Calibrated Hearing Check**: Fast, self-administered hearing test plotting accurate threshold audiograms and personal Hearing Scores.
- **Passive Background Audio**: Seamlessly plays sound therapies in the background or layered over external audio services like **Spotify** and local stored music.
- **Streak & Habit Tracking**: Tracks consecutive listening days, session completion rates, and historical frequency threshold gains.
- **Hardware Agnostic**: Delivers clinical-grade therapy through everyday consumer wired or Bluetooth earbuds, eliminating the need for expensive proprietary hardware.

---

## React Web Admin & Subscription Portal

While end users interact primarily through the mobile app, business operations, customer support, and subscription billing are managed via a dedicated **React** web portal:

![AudioCardio Web Admin Portal — User and client management table for platform operations](/projects/audiocardio/audiocardio-admin-users.webp)

![AudioCardio Subscription and Payment Management — Web dashboard for managing client subscriptions, billing cycles, and payment methods](/projects/audiocardio/audiocardio-client-subscriptions.webp)

- **Client Directory Management**: View, filter, and inspect registered users, account statuses, and therapy onboarding states.
- **Subscription Lifecycle**: Manage recurring membership tiers (monthly and annual plans), handle promotional trials, and review transaction records.
- **Payment Method Controls**: Secure customer billing updates, payment gateway synchronization, and automated invoice tracking.

---

## Tech Stack Overview

- **Mobile Application**: React Native (iOS & Android), Background Audio Services, Audio Mixing
- **Backend Services**: Python, Django, Django REST Framework, PostgreSQL
- **Web Admin Portal**: React, Modular CSS / Component Library
- **Payments & Billing**: Stripe / In-App Purchases & Web Subscriptions
- **Cloud Infrastructure**: Google Cloud Platform (GCP)
