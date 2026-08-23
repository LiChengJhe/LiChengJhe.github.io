<template>
  <div class="app-root">
    <!-- Dynamic Autumn Leaves Canvas -->
    <MapleLeavesCanvas />

    <!-- Navigation Bar -->
    <Navbar @open-surprise="openSurpriseModal" />

    <!-- Main Content -->
    <main>
      <!-- Hero Banner & Birthday Countdown -->
      <HeroBanner @open-surprise="openSurpriseModal" />

      <!-- Birthday Flight Ticket Gift Showcase -->
      <BoardingPass />

      <!-- 6 Days Daily Itinerary Timeline -->
      <DailyItinerary />

      <!-- Photo Gallery & Google Photos Album -->
      <PhotoGallery />

      <!-- Hotel Accommodation Info -->
      <HotelInfo />
    </main>

    <!-- Footer Section -->
    <FooterSection />

    <!-- Floating Background Audio Controller -->
    <AudioPlayer />

    <!-- 10/23 Birthday Interactive Surprise Modal -->
    <BirthdayModal
      :is-open="isSurpriseModalOpen"
      @close="isSurpriseModalOpen = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MapleLeavesCanvas from './components/MapleLeavesCanvas.vue'
import Navbar from './components/Navbar.vue'
import HeroBanner from './components/HeroBanner.vue'
import BirthdayModal from './components/BirthdayModal.vue'
import BoardingPass from './components/BoardingPass.vue'
import DailyItinerary from './components/DailyItinerary.vue'
import PhotoGallery from './components/PhotoGallery.vue'
import HotelInfo from './components/HotelInfo.vue'
import AudioPlayer from './components/AudioPlayer.vue'
import FooterSection from './components/FooterSection.vue'

const isSurpriseModalOpen = ref(false)

function openSurpriseModal() {
  isSurpriseModalOpen.value = true
}
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
