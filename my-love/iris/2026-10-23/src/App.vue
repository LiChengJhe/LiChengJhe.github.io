<template>
  <div class="app-root">
    <!-- Navigation Bar -->
    <Navbar />

    <!-- Main Content -->
    <main>
      <!-- Hero Banner & Birthday Countdown -->
      <HeroBanner />

      <!-- 10/23 Birthday Card Section -->
      <BirthdayCard />

      <!-- Birthday Flight Ticket Gift Showcase -->
      <BoardingPass />

      <!-- 6 Days Daily Itinerary Timeline (Integrated with Google Photos & Travel Notes) -->
      <DailyItinerary />
    </main>

  <!-- Footer Section -->
  <FooterSection />
</div>
</template>

<script setup lang="ts">
import Navbar from './components/Navbar.vue'
import HeroBanner from './components/HeroBanner.vue'
import BoardingPass from './components/BoardingPass.vue'
import DailyItinerary from './components/DailyItinerary.vue'
import BirthdayCard from './components/BirthdayCard.vue'
import FooterSection from './components/FooterSection.vue'
</script>

<style scoped>
.app-root {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
}

main {
  flex: 1;
  position: relative;
  z-index: 2;
}
</style>
