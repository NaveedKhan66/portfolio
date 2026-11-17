---
title: "Infinity Table — AI-Driven Tabletop RPG Engine"
subtitle: "Architecting a voice-controlled tabletop RPG platform inspired by D&D—combining OpenAI LLMs, Django backend services, PostgreSQL spatial extensions, and real-time obstacle-avoiding pathfinding."
author: "Naveed"
role: "Backend Engineer"
client: "Robot Sea Monster Games"
category: "AI / GAME BACKEND / AR"
year: "2025"
liveUrl: "https://rsm-studio.com/#case-studies"
---

# Bringing Tabletop Roleplaying to Life with Voice & AI

Traditional tabletop roleplaying games like Dungeons & Dragons offer unmatched creative freedom, but they demand heavy manual bookkeeping, rulebook memorization, and continuous physical manipulation of miniatures. **Infinity Table** was envisioned to reinvent that experience: a tabletop RPG run entirely by generative AI and real-time voice commands, bridging digital spatial mechanics with hands-free gameplay.

As a **Backend Engineer** collaborating with the team at **Robot Sea Monster Games**, I spearheaded the backend systems, OpenAI voice-to-action engine, room state persistence, and dynamic pathfinding pipeline.

![Level Design & Tabletop Map Architecture — Isometric dungeon layout with rooms, chests, puzzles, and miniatures](/projects/infinity-table/infinity-table-level-design-figma.webp)

---

## Technical Architecture & Core Stack

The system was engineered around an event-driven architecture designed to minimize latency between voice transcription, AI semantic evaluation, and visual character movement:

* **Backend Engine**: Built with **Python** and **Django**, orchestrating game session lifecycles, player state, inventory systems, room state machines, and API endpoints.
* **Frontend Game Client**: Built in **Unity**, providing real-time 3D and augmented-reality (AR) tabletop rendering of grid maps, interactive objects, and character standees.
* **Voice & AI Core**: Powered by **OpenAI models**, responsible for real-time speech interpretation, intent extraction, spatial command parsing, and contextual narration.
* **Database & Spatial Memory**: **PostgreSQL** configured with vector extensions for entity embeddings and spatial indexes to store coordinate grids, player coordinates, and dungeon obstacle matrices.

![Voice-Command Interaction Loop — Real-time speech recognition prompting user actions and orientations](/projects/infinity-table/infinity-table-voice-session.webp)

---

## Key Engineering Innovations

### 1. Natural Voice Command & Intent Disambiguation
Rather than forcing players into rigid command trees, players interact naturally using voice. The voice pipeline processes both direct granular actions and high-level abstract goals:
* **Relative Coordinate Commands**: *"Move 3 blocks to the right"* or *"Step 4 tiles forward."*
* **Target-Oriented Semantic Commands**: *"Move close to the chest,"* *"Investigate the altar,"* or *"Attack the monster with the sword."*

The backend passes user voice inputs to an OpenAI extraction pipeline that maps conversational phrases into concrete game actions: action type, target entity, vector direction, and equipped item.

---

### 2. Intelligent Obstacle-Avoiding Pathfinding
A standout technical challenge was executing semantic commands like *"move close to the chest."* In a tabletop dungeon, the character cannot simply walk in a straight line through walls, columns, or furniture.

1. **Entity & Room Discovery**: When the player issues a command, the backend queries the PostgreSQL spatial map for the specified entity (e.g., chest, door, enemy) within the player's active room.
2. **Accessible Tile Resolution**: The engine evaluates adjacent walkable grid cells surrounding the target.
3. **Obstacle-Aware Shortest Path**: The pathfinding algorithm computes the shortest valid path from the player's current coordinate to the target tile, routing cleanly around static obstacles (walls, locked doors, debris) and dynamic entities (monsters, party members).
4. **Coordinate Dispatch to Unity**: The computed path array is sent as a sequence of waypoints to the Unity frontend, triggering smooth token navigation on the physical AR grid.

![Grid-Based Pathfinding & Obstacle Avoidance](/projects/infinity-table/infinity-table-grid-navigation.webp)

---

### 3. Dynamic Levels, Puzzles & Inventory Systems
Every level featured interactive puzzles, loot chests, and combat encounters managed by server-authoritative state logic:

* **Interactive Puzzles & Traps**: Players solve environment-based riddles and unlock secret passageways using voice clues.
* **Dynamic Equipment & Effects**: Players pick up, equip, or drop items like swords, enchanted shields, and magic wands. Each item grants unique stats, passive effects, and combat modifiers directly modifying player rolls and abilities.
* **Chest & Loot Mechanics**: Opening chests triggers randomized or tailored loot tables, updating player inventories in real time.

![Tabletop Miniature Standee — 2.5D player character token navigated across coordinate grid tiles](/projects/infinity-table/infinity-table-hero-token.webp)

![Spatial Room Generation & Obstacle Detection](/projects/infinity-table/infinity-table-ar-room.webp)

---

## Collaboration & Backend Impact

* **Cross-Border Coordination**: Collaborated closely with the US-based design and engineering team at **Robot Sea Monster Games**, aligning backend API contracts with the Unity AR team during overlapping hours.
* **Sub-Second Voice Turnaround**: Tuned LLM prompt schemas and state evaluation pipelines to deliver voice-to-movement execution in sub-second response times.
* **Resilient State Persistence**: Maintained reliable game state across disconnections, keeping multiplayer tabletop sessions synchronized.
