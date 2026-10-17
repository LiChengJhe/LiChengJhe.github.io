<template>
  <section id="birthday-card" class="birthday-card-section">
    <div class="container">
      <!-- Section Header -->
      <div class="section-title-wrap">
        <span class="section-tag">Birthday Letter</span>
        <h2 class="section-title">💌 承哲寫給彥伃的生日卡片</h2>
        <p class="section-desc">
          回憶 6 天 5 夜的關西足跡 • 在 10/23 這一天獻給最親愛的壽星女孩
        </p>
      </div>

      <!-- Main Birthday Card Container -->
      <div class="card-wrapper">
        <!-- Envelope Top Flap Deco -->
        <div class="envelope-accent">
          <div class="wax-seal" @click="toggleLetterFold" :title="isLetterExpanded ? '點擊折疊信件' : '點擊展開信件'">
            <span class="wax-icon">💌</span>
            <span class="wax-date font-display">10/23</span>
            <span class="wax-name font-serif">Iris</span>
          </div>
        </div>

        <!-- The Letter Sheet -->
        <article class="letter-sheet glass-card" :class="{ 'letter-expanded': isLetterExpanded }">
          <!-- Letter Golden Corner Borders -->
          <div class="corner-decor top-left">✨</div>
          <div class="corner-decor top-right">✨</div>
          <div class="corner-decor bottom-left">🌸</div>
          <div class="corner-decor bottom-right">🌸</div>

          <!-- Letter Header -->
          <header class="letter-header">
            <div class="letter-badge-row">
              <span class="badge badge-maple">10/23 專屬生日手寫信</span>
              <span class="badge badge-gold">關西旅程美好回憶</span>
              <span class="badge badge-blush">永遠愛妳</span>
            </div>
            <h3 class="letter-salutation font-serif">
              親愛的彥伃（我的 Iris）：
            </h3>
            <div class="letter-wishes-highlight font-display">
              🎂 Happy 10/23 Birthday! 生日大快樂！✨
            </div>
          </header>

          <!-- Letter Body Text (Collapsible) -->
          <div v-show="isLetterExpanded" class="letter-content font-serif">
            <p class="letter-p indent">
              祝我最愛的女孩、我心裡最在乎的 Iris 生日快樂！🎂✨
            </p>
            <p class="letter-p indent">
              從關西回來這幾天，每當我翻看手機裡那一張張照片，總會不自覺地傻笑。這趟 6 天 5 夜的旅程是我送給妳的 10/23 生日禮物，但對我來說，能牽著妳的手、看著妳因為沿途風景而展露笑顏，才是我收過最珍貴、最幸福的禮物。
            </p>

            <!-- Memory Highlight Cards inside Letter -->
            <div class="trip-memory-box">
              <div class="memory-box-title">
                <span>📸</span>
                <strong>這趟旅途裡，每一個因為有妳而在心底發光的瞬間：</strong>
              </div>
              <ul class="memory-list">
                <li class="memory-item-clickable" @click="jumpToItineraryDay(1)" title="點擊查看 Day 01 行程">
                  <span class="mem-icon">🐻</span>
                  <div class="mem-text">
                    <strong>心齋橋 PARCO：</strong>在自嘲熊專區看見妳拿著自嘲熊吊飾時，那雙像孩子般清澈閃爍的眼睛，那一刻我就想把妳世界裡所有的快樂都買給妳。
                  </div>
                  <span class="mem-jump-chip">Day 01 ➔</span>
                </li>
                <li class="memory-item-clickable" @click="jumpToItineraryDay(2)" title="點擊查看 Day 02 行程">
                  <span class="mem-icon">🍵</span>
                  <div class="mem-text">
                    <strong>京都宇治與平等院：</strong>飄著茶香的表參道、阿字池旁倒映的千年鳳凰堂，雖然風景很美，但我眼裡最好看的風景，始終是身邊喝著抹茶拿鐵滿足微笑的妳。
                  </div>
                  <span class="mem-jump-chip">Day 02 ➔</span>
                </li>
                <li class="memory-item-clickable" @click="jumpToItineraryDay(2)" title="點擊查看 Day 02 行程">
                  <span class="mem-icon">🎮</span>
                  <div class="mem-text">
                    <strong>任天堂博物館：</strong>我們兩個人像傻瓜一樣手忙腳亂、齊心協力拍打巨大的紅白機手把，笑到眼淚都流出來，那是我好久好久沒有過的單純快樂。
                  </div>
                  <span class="mem-jump-chip">Day 02 ➔</span>
                </li>
                <li class="memory-item-clickable" @click="jumpToItineraryDay(3)" title="點擊查看 Day 03 行程">
                  <span class="mem-icon">🌊</span>
                  <div class="mem-text">
                    <strong>海之京都伊根舟屋：</strong>在天橋立吹著微涼的海風，在遊覽船上拿著蝦味先被成群海鷗環繞，那一刻海天一色，妳依偎在我身邊的溫度好真實、好溫暖。
                  </div>
                  <span class="mem-jump-chip">Day 03 ➔</span>
                </li>
                <li class="memory-item-clickable" @click="jumpToItineraryDay(4)" title="點擊查看 Day 04 行程">
                  <span class="mem-icon">🏡</span>
                  <div class="mem-text">
                    <strong>滋賀琵琶湖與近江八幡：</strong>站在 1,100 公尺的山頂露台看著湛藍如海的湖面，在童話草屋前幫妳捕捉一張張仙氣滿滿的美照、一起挑選明日的早餐，只要身邊是妳，處處都是最美的風景。
                  </div>
                  <span class="mem-jump-chip">Day 04 ➔</span>
                </li>
                <li class="memory-item-clickable" @click="jumpToItineraryDay(5)" title="點擊查看 Day 05 行程">
                  <span class="mem-icon">🏰</span>
                  <div class="mem-text">
                    <strong>環球影城 USJ 的冒險：</strong>在活米村看妳揮舞魔杖施法、敲磚塊收集金幣，在芙莉蓮主題餐廳為妳慶生，晚上還一起在三根掃帚餐廳點了萬聖節套餐！還有我們手牽著手闖進《Resident Evil Requiem》深淵絕境去看里昂、鼓起勇氣挑戰殭屍工廠——雖然現場氣氛真的很可怕，但妳緊緊抓著我手臂的那一瞬間，我就在心裡默默發誓：這輩子不管遇到什麼恐懼與困難，都有我在妳前面，我會永遠保護妳。
                  </div>
                  <span class="mem-jump-chip">Day 05 ➔</span>
                </li>
              </ul>
            </div>

            <p class="letter-p indent">
              彥伃，謝謝妳出現在我的生命裡。妳總是那麼貼心、那麼善良，在我累的時候給我最溫暖的擁抱，用妳專屬的可愛把我的煩惱全都融化。有妳在的日子，平凡的散步是浪漫，簡單的吃飯是幸福。
            </p>

            <p class="letter-p indent next-trip-promise">
              ✨ <strong>我藏在心底、最想對妳說的心願：</strong><br />
              這趟關西之旅每一步我都深刻記在心裡，而回到台灣後，我常常在想一件事——<strong>我真的好希望、好期待下一次，能和妳兩個人單獨一起出國旅遊！</strong><br />
              沒有任何顧慮、沒有任何繁瑣的安排，就只有我們兩個人。我們可以一起睡到自然醒，牽著手在陌生的異國小巷漫無目的地散步；想停下來喝杯咖啡就坐上一整個午後，想拍照我就隨時替妳捕捉最美的身影。去哪裡都好，只要身邊是妳，就是最完美的旅程。
            </p>

            <p class="letter-p indent">
              祝我的寶貝 10/23 生日快樂。新的一歲，願妳想做的事都順利、天天都能開懷大笑。記得妳有我，我會一直當妳最可靠的靠山、專屬的司機與提袋大臣，把妳捧在手心裡疼愛。
            </p>

            <p class="letter-p indent proposal-confession">
              💍 <strong>悄悄藏在心底的真心話：</strong><br />
              雖然這一次在關西向妳求婚，妳還沒有準備好答應我，但完全沒關係，我知道妳有妳的步調，我也會用更多的愛和行動讓妳感到安心踏實。<br />
              未來的日子裡我會繼續努力成為那個能讓妳放心託付一生的人，<strong>希望下一次當我再次拿出戒指、向妳求婚的時候，妳可以甜甜地對我點頭說一聲：「好，我願意！」💍✨</strong>
            </p>

            <p class="letter-p indent bold-promise">
              未來的每一年、每一次遠行、每一個生日，我都想牽著妳的手一起走下去。愛妳，永遠。❤️
            </p>

            <!-- Letter Signature Block -->
            <div class="letter-footer">
              <div class="stamp-box">
                <span class="stamp-icon">🌸</span>
                <span class="stamp-text">關西回憶 • 浪漫同行</span>
              </div>
              <div class="signature-info">
                <div class="sig-title">永遠愛妳的男友兼專屬領隊</div>
                <div class="sig-name font-display">承哲 (Cheng-Jhe) 筆 💖</div>
                <div class="sig-date">2026 年 10 月 23 日 • 關西旅程紀念</div>
              </div>
            </div>
          </div>

          <!-- Birthday Interactive Wish Coupons -->
          <div class="coupons-section">
            <h4 class="coupons-title font-serif">
              <span>✈️</span> 承哲送給彥伃的「專屬甜蜜約定券」
            </h4>
            <div class="coupons-grid">
              <div
                v-for="(coupon, index) in birthdayCoupons"
                :key="coupon.id"
                class="coupon-card"
                :class="{ 'coupon-redeemed': coupon.redeemed }"
                @click="redeemCoupon(index)"
              >
                <div class="coupon-icon">{{ coupon.icon }}</div>
                <div class="coupon-details">
                  <div class="coupon-title">{{ coupon.title }}</div>
                  <div class="coupon-desc">{{ coupon.description }}</div>
                  <div class="coupon-expiry">效期：永久有效 • 無限次數</div>
                </div>
                <div class="coupon-action">
                  <span v-if="coupon.redeemed" class="stamp-badge">
                    <span>💮</span>
                    <span>已核准兌換</span>
                  </span>
                  <button v-else class="btn btn-sm btn-outline-blush">
                    點擊兌換
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Send Heart Floating Feedback -->
          <div class="card-interaction-bar">
            <div class="heart-counter">
              <span class="heart-icon">💖</span>
              <span>已累積 <strong>{{ heartCount }}</strong> 顆愛心送給壽星彥伃</span>
            </div>
            <div class="interaction-buttons">
              <button class="btn btn-primary btn-sm animate-pulse-glow" @click="addHeart">
                <span>💖</span>
                <span>送出愛心祝福 (+1)</span>
              </button>
              <button class="btn btn-outline btn-sm" @click="toggleLetterFold">
                <span>{{ isLetterExpanded ? '收起卡片' : '閱讀完整卡片' }}</span>
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isLetterExpanded = ref(true)
const heartCount = ref(520)

interface Coupon {
  id: string
  icon: string
  title: string
  description: string
  redeemed: boolean
}

const birthdayCoupons = ref<Coupon[]>([
  {
    id: 'c3',
    icon: '✈️',
    title: '下次「單獨兩人專屬旅行」約定券',
    description: '承哲承諾下一次專屬於我們兩個人的海外浪漫之旅，全程專屬陪伴，世界各地任彥伃挑選！',
    redeemed: true
  }
])

function toggleLetterFold() {
  isLetterExpanded.value = !isLetterExpanded.value
  if (!isLetterExpanded.value) {
    const cardEl = document.getElementById('birthday-card')
    if (cardEl) {
      cardEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }
}

function redeemCoupon(index: number) {
  birthdayCoupons.value[index].redeemed = true
  addHeart()
}

function addHeart() {
  heartCount.value++
}

function jumpToItineraryDay(dayNumber: number) {
  window.dispatchEvent(new CustomEvent('select-day', { detail: dayNumber }))
  const el = document.getElementById('itinerary')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>

<style scoped>
.birthday-card-section {
  --color-coffee-dark: #2b2523;
  --color-coffee-medium: #5f5753;
  --color-coffee-light: #8d847e;
  --color-maple-crimson: var(--primary-maple, #b83b32);
  --color-maple-red: var(--primary-maple-dark, #88221b);
  --color-blush-rose: var(--accent-blush, #e86380);
  --space-4xl: 4.5rem;
  --space-3xl: 3.5rem;
  --space-2xl: 2.5rem;
  --space-xl: 1.75rem;
  --space-lg: 1.25rem;
  --space-md: 0.85rem;
  --space-sm: 0.5rem;
  --radius-2xl: 28px;
  --transition-bounce: 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  --transition-fast: 0.2s ease;

  padding: var(--space-4xl) 0;
  position: relative;
  background: linear-gradient(
    180deg,
    rgba(251, 248, 243, 0.7) 0%,
    rgba(255, 245, 238, 0.95) 50%,
    rgba(251, 248, 243, 0.7) 100%
  );
}

.card-wrapper {
  max-width: 860px;
  margin: 0 auto;
  position: relative;
}

/* Wax Seal & Envelope Accent */
.envelope-accent {
  display: flex;
  justify-content: center;
  margin-bottom: -24px;
  position: relative;
  z-index: 10;
}

.wax-seal {
  width: 68px;
  height: 68px;
  background: radial-gradient(circle at 35% 35%, #e0533c, #9e2a2b, #6b1d1e);
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #fff;
  box-shadow: 0 8px 24px rgba(158, 42, 43, 0.45), inset 0 2px 4px rgba(255, 255, 255, 0.4);
  cursor: pointer;
  border: 3px solid #ffbc99;
  transition: all var(--transition-bounce);
  box-sizing: border-box;
  overflow: hidden;
  user-select: none;
}

.wax-seal:hover {
  transform: scale(1.08) rotate(5deg);
  box-shadow: 0 12px 32px rgba(158, 42, 43, 0.6);
}

.wax-icon {
  font-size: 1.15rem;
  line-height: 1;
  display: block;
}

.wax-date {
  font-size: 0.68rem;
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: 0.5px;
  text-align: center;
  display: block;
}

.wax-name {
  font-size: 0.62rem;
  font-weight: 700;
  line-height: 1.15;
  opacity: 0.95;
  text-align: center;
  font-style: italic;
  display: block;
}

/* Letter Sheet Container */
.letter-sheet {
  background: #fffdfa;
  border: 2px solid rgba(212, 163, 115, 0.35);
  border-radius: var(--radius-2xl);
  padding: var(--space-3xl) var(--space-2xl);
  position: relative;
  box-shadow: 0 20px 60px rgba(74, 55, 40, 0.1), 0 2px 8px rgba(74, 55, 40, 0.05);
  overflow: hidden;
}

@media (max-width: 768px) {
  .letter-sheet {
    padding: 3.25rem var(--space-lg) var(--space-2xl);
  }
}

/* Golden Corner Decors */
.corner-decor {
  position: absolute;
  font-size: 1.4rem;
  opacity: 0.7;
  user-select: none;
}

.corner-decor.top-left { top: 16px; left: 16px; }
.corner-decor.top-right { top: 16px; right: 16px; }
.corner-decor.bottom-left { bottom: 16px; left: 16px; }
.corner-decor.bottom-right { bottom: 16px; right: 16px; }

/* Letter Header */
.letter-header {
  text-align: center;
  border-bottom: 1px dashed rgba(212, 163, 115, 0.4);
  padding-bottom: var(--space-xl);
  margin-bottom: var(--space-2xl);
}

.letter-badge-row {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: var(--space-sm);
  margin-bottom: var(--space-md);
}

.letter-salutation {
  font-size: 1.75rem;
  color: var(--color-coffee-dark);
  margin-bottom: var(--space-sm);
}

.letter-wishes-highlight {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-maple-crimson);
  letter-spacing: 0.5px;
}

/* Letter Content */
.letter-content {
  color: #3d3027;
  font-size: 1.05rem;
  line-height: 2;
}

.letter-p {
  margin-bottom: var(--space-lg);
}

.letter-p.indent {
  text-indent: 2em;
}

.letter-p.next-trip-promise {
  font-size: 1.05rem;
  background: rgba(232, 99, 128, 0.08);
  border: 1.5px dashed rgba(232, 99, 128, 0.45);
  border-radius: var(--radius-lg);
  padding: var(--space-md) var(--space-lg);
  color: #88221b;
  text-indent: 0;
  margin: var(--space-lg) 0;
}

.letter-p.proposal-confession {
  font-size: 1.05rem;
  background: linear-gradient(135deg, rgba(255, 240, 245, 0.95), rgba(254, 247, 235, 0.95));
  border: 1.5px solid rgba(229, 169, 60, 0.6);
  border-radius: var(--radius-lg);
  padding: var(--space-md) var(--space-lg);
  color: #7a201a;
  text-indent: 0;
  margin: var(--space-lg) 0;
  box-shadow: 0 4px 15px rgba(229, 169, 60, 0.12);
}

.letter-p.bold-promise {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--color-maple-crimson);
  background: rgba(230, 81, 0, 0.05);
  padding: var(--space-md) var(--space-lg);
  border-radius: var(--radius-lg);
  border-left: 4px solid var(--color-maple-red);
}

/* Trip Memory Box */
.trip-memory-box {
  background: rgba(254, 250, 246, 0.9);
  border: 1px solid rgba(212, 163, 115, 0.3);
  border-radius: var(--radius-xl);
  padding: var(--space-xl);
  margin: var(--space-xl) 0;
}

.memory-box-title {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  font-size: 1.1rem;
  color: var(--color-coffee-dark);
  margin-bottom: var(--space-md);
}

.memory-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.memory-list li {
  display: flex;
  align-items: flex-start;
  gap: var(--space-md);
  font-size: 0.98rem;
  line-height: 1.7;
}

.memory-item-clickable {
  cursor: pointer;
  padding: 0.6rem 0.75rem;
  border-radius: var(--radius-md);
  transition: all 0.25s ease;
  border: 1px solid transparent;
}

.memory-item-clickable:hover {
  background: rgba(255, 255, 255, 0.95);
  border-color: rgba(184, 59, 50, 0.2);
  box-shadow: 0 4px 16px rgba(184, 59, 50, 0.08);
  transform: translateX(4px);
}

.mem-text {
  flex: 1;
}

.mem-jump-chip {
  align-self: flex-start;
  margin-top: 3px;
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--primary-maple);
  background: var(--primary-maple-soft);
  border: 1px solid rgba(184, 59, 50, 0.2);
  padding: 0.2rem 0.55rem;
  border-radius: var(--radius-full);
  white-space: nowrap;
  flex-shrink: 0;
  transition: all 0.2s ease;
}

.memory-item-clickable:hover .mem-jump-chip {
  background: var(--primary-maple);
  color: #fff;
  transform: scale(1.05);
}

.mem-icon {
  font-size: 1.25rem;
  flex-shrink: 0;
  margin-top: 2px;
}

/* Letter Footer */
.letter-footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: var(--space-2xl);
  padding-top: var(--space-xl);
  border-top: 1px dashed rgba(212, 163, 115, 0.4);
  flex-wrap: wrap;
  gap: var(--space-lg);
}

.stamp-box {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  border: 2px dashed rgba(158, 42, 43, 0.4);
  padding: 6px 14px;
  border-radius: var(--radius-md);
  color: var(--color-maple-red);
  font-size: 0.85rem;
  font-weight: 600;
  transform: rotate(-3deg);
}

.stamp-icon {
  font-size: 1.1rem;
}

.signature-info {
  text-align: right;
}

.sig-title {
  font-size: 0.9rem;
  color: var(--color-coffee-medium);
  margin-bottom: 2px;
}

.sig-name {
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--color-maple-crimson);
  margin-bottom: 2px;
}

.sig-date {
  font-size: 0.85rem;
  color: var(--color-coffee-light);
}

/* Coupons Section */
.coupons-section {
  margin-top: var(--space-3xl);
  padding-top: var(--space-2xl);
  border-top: 1px solid rgba(212, 163, 115, 0.25);
}

.coupons-title {
  font-size: 1.25rem;
  color: var(--color-coffee-dark);
  margin-bottom: var(--space-lg);
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.coupons-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-md);
}

.coupon-card {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  background: #fff;
  border: 1px dashed rgba(212, 163, 115, 0.6);
  border-radius: var(--radius-lg);
  padding: var(--space-md) var(--space-lg);
  transition: all var(--transition-fast);
  cursor: pointer;
  position: relative;
}

.coupon-card:hover {
  transform: translateY(-2px);
  border-color: var(--color-blush-rose);
  box-shadow: 0 6px 18px rgba(235, 126, 151, 0.15);
}

.coupon-card.coupon-redeemed {
  background: rgba(255, 245, 247, 0.6);
  border-style: solid;
  border-color: rgba(235, 126, 151, 0.4);
}

.coupon-icon {
  font-size: 1.8rem;
  flex-shrink: 0;
}

.coupon-details {
  flex: 1;
}

.coupon-title {
  font-weight: 700;
  color: var(--color-coffee-dark);
  font-size: 1rem;
  margin-bottom: 2px;
}

.coupon-desc {
  font-size: 0.85rem;
  color: var(--color-coffee-medium);
  line-height: 1.5;
  margin-bottom: 2px;
}

.coupon-expiry {
  font-size: 0.75rem;
  color: var(--color-maple-crimson);
  font-weight: 600;
}

.coupon-action {
  flex-shrink: 0;
}

.stamp-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: rgba(235, 126, 151, 0.15);
  color: #c92a2a;
  border: 1.5px solid #ffa8a8;
  padding: 4px 10px;
  border-radius: var(--radius-full);
  font-size: 0.8rem;
  font-weight: 700;
  transform: rotate(-4deg);
}

.btn-outline-blush {
  border: 1px solid var(--color-blush-rose);
  color: var(--color-blush-rose);
  background: transparent;
  border-radius: var(--radius-full);
  padding: 4px 12px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.btn-outline-blush:hover {
  background: var(--color-blush-rose);
  color: #fff;
}

/* Card Interaction Bar */
.card-interaction-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: var(--space-2xl);
  padding: var(--space-md) var(--space-lg);
  background: rgba(247, 240, 233, 0.5);
  border-radius: var(--radius-xl);
  flex-wrap: wrap;
  gap: var(--space-md);
}

.heart-counter {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  font-size: 0.95rem;
  color: var(--color-coffee-dark);
}

.heart-counter strong {
  color: var(--color-maple-crimson);
  font-size: 1.15rem;
}

.interaction-buttons {
  display: flex;
  gap: var(--space-sm);
}

@media (max-width: 640px) {
  .birthday-card-section {
    padding: var(--space-2xl) 0;
  }

  .envelope-accent {
    margin-bottom: -20px;
  }

  .wax-seal {
    width: 58px;
    height: 58px;
    border-width: 2.5px;
    box-shadow: 0 6px 18px rgba(158, 42, 43, 0.4), inset 0 1.5px 3px rgba(255, 255, 255, 0.4);
  }

  .wax-icon {
    font-size: 0.95rem;
    line-height: 1;
    margin-bottom: 1px;
  }

  .wax-date {
    font-size: 0.6rem;
    line-height: 1.15;
  }

  .wax-name {
    font-size: 0.54rem;
    line-height: 1.15;
  }

  .letter-sheet {
    padding: 2.85rem 1rem 1.75rem;
    border-radius: 18px;
  }

  .corner-decor.top-left {
    top: 10px;
    left: 10px;
    font-size: 1rem;
    opacity: 0.35;
  }

  .corner-decor.top-right {
    top: 10px;
    right: 10px;
    font-size: 1rem;
    opacity: 0.35;
  }

  .letter-badge-row {
    margin-top: 0.35rem;
    margin-bottom: 0.75rem;
    gap: 0.4rem;
  }

  .letter-badge-row .badge {
    font-size: 0.75rem;
    padding: 0.2rem 0.55rem;
  }

  .letter-salutation {
    font-size: 1.25rem;
  }

  .letter-wishes-highlight {
    font-size: 1.05rem;
    line-height: 1.4;
  }

  .letter-content {
    font-size: 0.95rem;
    line-height: 1.8;
  }

  .letter-p.next-trip-promise,
  .letter-p.bold-promise {
    padding: 0.85rem 1rem;
    font-size: 0.95rem;
  }

  .trip-memory-box {
    padding: 1rem;
  }

  .letter-footer {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1.25rem;
  }

  .signature-info {
    text-align: center;
  }

  .coupon-card {
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem;
  }

  .coupon-action {
    align-self: flex-end;
    margin-top: 0.5rem;
  }

  .card-interaction-bar {
    flex-direction: column;
    text-align: center;
    padding: 1rem;
  }

  .interaction-buttons {
    width: 100%;
    justify-content: center;
  }
}
</style>
