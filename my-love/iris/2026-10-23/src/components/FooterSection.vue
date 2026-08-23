<template>
  <footer class="footer-section">
    <div class="container footer-content">
      <div class="footer-seal">
        <span class="seal-icon">🍁</span>
      </div>

      <h3 class="footer-title font-serif">
        2026 關西秋日浪漫之旅 • 彥伃 10/23 生日特別紀念
      </h3>

      <p class="footer-romantic-quote font-serif">
        「每一次啟程都是因為愛，願這趟秋日關西之旅，在妳心裡留下永恆閃耀的溫暖回憶。」
      </p>

      <div class="footer-credits">
        <div class="credit-badge">
          <span>💖 承哲 ＆ 彥伃 的甜蜜旅行專屬網頁</span>
        </div>
        <div class="family-badge">
          <span>👨‍👩‍👧‍👧 同行家人：彥伃 • 承哲 • 爸爸 • 媽媽 • 大姐 • 二姐</span>
        </div>
      </div>

      <div class="footer-bottom">
        <p class="copyright">
          © 2026 Maple Kansai • Designed with Love by 李承哲 for 林彥伃 (Iris Lin)
        </p>
        <button class="back-to-top-btn" @click="scrollToTop">
          <span>⬆️ 回到頂部</span>
        </button>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style scoped>
.footer-section {
  background: linear-gradient(180deg, var(--bg-washi), #ede4d8);
  border-top: 1px solid rgba(184, 59, 50, 0.15);
  padding: 4rem 0 3rem;
  margin-top: 4rem;
  text-align: center;
  position: relative;
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
}

.footer-seal {
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background: var(--primary-maple-soft);
  border: 1.5px solid var(--primary-maple);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
}

.footer-title {
  font-size: 1.4rem;
  font-weight: 800;
  color: var(--kyoto-indigo);
}

.footer-romantic-quote {
  font-size: 1.05rem;
  color: var(--text-secondary);
  max-width: 620px;
  line-height: 1.8;
}

.footer-credits {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
  margin: 0.5rem 0;
}

.credit-badge, .family-badge {
  font-size: 0.85rem;
  font-weight: 600;
  padding: 0.35rem 0.9rem;
  border-radius: var(--radius-full);
  background: rgba(255, 255, 255, 0.85);
  border: 1px solid rgba(0, 0, 0, 0.08);
  color: var(--kyoto-indigo);
}

.footer-bottom {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-top: 2rem;
  border-top: 1px dashed rgba(0, 0, 0, 0.1);
  margin-top: 1.5rem;
  gap: 1rem;
}

.copyright {
  font-size: 0.82rem;
  color: var(--text-muted);
}

.back-to-top-btn {
  background: white;
  border: 1px solid rgba(184, 59, 50, 0.2);
  color: var(--primary-maple);
  padding: 0.4rem 1rem;
  border-radius: var(--radius-full);
  font-size: 0.82rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
}

.back-to-top-btn:hover {
  background: var(--primary-maple);
  color: white;
}
</style>
