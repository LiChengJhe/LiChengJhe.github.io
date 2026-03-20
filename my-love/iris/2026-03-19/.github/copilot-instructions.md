# Copilot Instructions for Romantic Celebration SPA

This project is a Vue 3 + Vite single-page application designed for a romantic, interactive celebration. AI agents should follow these guidelines for effective contributions:

## Project Architecture
- **SPA Structure**: The app is a single-page Vue 3 application, bootstrapped via `main.js` and rendered in `App.vue`.
- **Component Organization**: All major features are implemented as Vue components in `src/components/`. Key components include:
  - `FloatingHearts.vue`: Animated heart background
  - `HeroSection.vue`: Opening birthday greeting and ring animation
  - `LoveTimeline.vue`: Visual timeline of relationship milestones
  - `MemoryGallery.vue`: Photo gallery with lightbox
  - `WishSection.vue`: Interactive blessing cards
  - `ProposalInteractive.vue`: Multi-step proposal experience
- **Global Styles**: Theme colors and base animations are defined in `src/styles/global.css` (edit `:root` for palette).
- **Assets**: Images and audio are stored in `src/assets/` subfolders.

## Developer Workflows
- **Development**: Use `npm run dev` to start Vite's local server (`http://localhost:5173`).
- **Build**: Use `npm run build` to generate production assets in `dist/`.
- **Preview**: Use `npm run preview` to locally preview the production build.
- **Deployment**: For GitHub Pages, upload the `dist/` folder after build.

## Project-Specific Patterns
- **Component Data**: Texts and blessings are defined in each component's `<script setup>` block for easy editing.
- **Animation**: Custom keyframes (e.g., `fadeUp`, `floatSlow`) are used for transitions; adjust in `global.css`.
- **Event Communication**: Components communicate via custom events (e.g., `@start-journey`, `@play-melody`, `@lightbox-open`).
- **No Routing**: The app is a true SPA with no Vue Router; all navigation is scroll-based.
- **No State Management**: No Vuex/Pinia; state is local to components or shared via props/events.

## External Dependencies
- **Vue 3**: Main framework
- **Vite**: Build tool and dev server
- **@vitejs/plugin-vue**: Vite plugin for Vue SFCs

## Conventions & Customization
- **Naming**: Use descriptive, romantic names for variables and components.
- **Extending**: Add new features as components in `src/components/` and register them in `App.vue`.
- **Styling**: Prefer editing `global.css` for theme changes; use scoped styles for component-specific tweaks.

## Key Files
- `src/App.vue`: Main layout and feature composition
- `src/main.js`: App entry point
- `src/components/`: All interactive and visual modules
- `src/styles/global.css`: Theme and animation base
- `package.json`: Scripts and dependencies

---
For questions or unclear conventions, review `README.md` or ask for clarification. Please suggest improvements if any section is incomplete or ambiguous.
