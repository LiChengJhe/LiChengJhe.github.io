<template>
  <section id="gallery" class="gallery-section">
    <div class="container">
      <!-- Section Title -->
      <div class="section-title-wrap">
        <span class="section-tag">Memories & Google Album</span>
        <h2 class="section-title">📷 旅途寫真 • 回憶相簿</h2>
        <p class="section-desc">
          記錄每一刻心動與歡笑 • 整合 Google 雲端相簿與旅程經典寫真
        </p>
      </div>

      <!-- Google Photos Header Banner -->
      <div class="google-photos-banner glass-card">
        <div class="gp-left">
          <div class="gp-icon-wrap">
            <svg class="gp-svg-icon" viewBox="0 0 24 24" width="42" height="42">
              <path fill="#EA4335" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
          </div>
          <div>
            <h3 class="gp-title font-serif">Google Photos 雲端共用相簿</h3>
            <p class="gp-desc">
              旅行中與返台後，點擊下方按鈕即可隨時開啟並上傳高畫質原始照片與影片，與全家人同步珍貴回憶！
            </p>
          </div>
        </div>

        <div class="gp-right">
          <a
            :href="googlePhotosLink"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-primary btn-gp"
          >
            <span>🔗</span>
            <span>前往 Google 雲端相簿</span>
          </a>
          <button class="btn btn-glass btn-edit-url" @click="showEditLink = !showEditLink">
            <span>⚙️</span>
            <span>{{ showEditLink ? '隱藏網址設定' : '自訂相簿連結' }}</span>
          </button>
        </div>
      </div>

      <!-- Google Photos Link Customizer Drawer -->
      <div v-if="showEditLink" class="custom-link-box glass-card">
        <label class="custom-link-label">
          <strong>自訂 Google 相簿網址 (Google Photos URL)：</strong>
        </label>
        <div class="custom-link-input-row">
          <input
            v-model="customUrlInput"
            type="url"
            class="custom-url-input"
            placeholder="請貼上您的 Google 相簿共用連結 (例如: https://photos.app.goo.gl/...)"
          />
          <button class="btn btn-gold" @click="saveGooglePhotosUrl">
            儲存相簿連結
          </button>
        </div>
        <p class="custom-link-hint">
          * 儲存後將自動記住您的相簿連結，點擊上方按鈕即可一鍵跳轉。
        </p>
      </div>

      <!-- Categories & Controls Bar -->
      <div class="gallery-controls-bar">
        <div class="category-filters">
          <button
            v-for="cat in categoryList"
            :key="cat.key"
            class="cat-filter-btn"
            :class="{ active: selectedCategory === cat.key }"
            @click="selectedCategory = cat.key"
          >
            <span class="cat-icon">{{ cat.icon }}</span>
            <span>{{ cat.label }}</span>
            <span class="cat-count">({{ getCategoryCount(cat.key) }})</span>
          </button>
        </div>

        <button class="btn btn-outline btn-add-photo" @click="showAddPhotoModal = true">
          <span>➕</span>
          <span>新增回憶照片</span>
        </button>
      </div>

      <!-- Photos Grid -->
      <div class="photos-grid">
        <div
          v-for="photo in filteredPhotos"
          :key="photo.id"
          class="photo-card glass-card"
          @click="openLightbox(photo)"
        >
          <div class="photo-img-wrap">
            <img :src="photo.imageUrl" :alt="photo.title" loading="lazy" class="photo-img" />
            <div class="photo-overlay">
              <span class="view-icon">🔍 點擊放大查看</span>
            </div>
            <span class="photo-date-tag">{{ photo.date }}</span>
          </div>

          <div class="photo-info">
            <div class="photo-header">
              <span class="badge badge-maple">{{ photo.categoryName }}</span>
              <span class="photo-loc">📍 {{ photo.location }}</span>
            </div>
            <h4 class="photo-title font-serif">{{ photo.title }}</h4>
            <p class="photo-desc">{{ photo.description }}</p>
            <div v-if="photo.tags && photo.tags.length" class="photo-tags">
              <span v-for="t in photo.tags" :key="t" class="p-tag">#{{ t }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Lightbox Modal -->
      <div v-if="lightboxPhoto" class="lightbox-backdrop" @click.self="closeLightbox">
        <div class="lightbox-box">
          <button class="lightbox-close" @click="closeLightbox">✕</button>
          
          <div class="lightbox-content">
            <img :src="lightboxPhoto.imageUrl" :alt="lightboxPhoto.title" class="lightbox-img" />
            <div class="lightbox-caption">
              <div class="caption-head">
                <span class="badge badge-gold">{{ lightboxPhoto.categoryName }}</span>
                <span class="caption-date">{{ lightboxPhoto.date }} • 📍 {{ lightboxPhoto.location }}</span>
              </div>
              <h3 class="caption-title font-serif">{{ lightboxPhoto.title }}</h3>
              <p class="caption-desc">{{ lightboxPhoto.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Add Photo Modal -->
      <div v-if="showAddPhotoModal" class="modal-backdrop" @click.self="showAddPhotoModal = false">
        <div class="modal-container glass-card modal-compact">
          <button class="modal-close-btn" @click="showAddPhotoModal = false">✕</button>
          
          <div class="modal-header">
            <h3 class="modal-title font-serif">📸 新增旅途回憶相片</h3>
            <p class="modal-subtitle">上傳或貼上照片網址，永久保留在相簿清單中</p>
          </div>

          <form @submit.prevent="submitNewPhoto" class="add-photo-form">
            <div class="form-group">
              <label>照片標題 *</label>
              <input v-model="newPhoto.title" required placeholder="例如: 伏見稻荷大社鳥居前甜蜜合照" class="form-input" />
            </div>

            <div class="form-group">
              <label>拍攝地點</label>
              <input v-model="newPhoto.location" placeholder="例如: 京都 伏見稻荷" class="form-input" />
            </div>

            <div class="form-group">
              <label>日期 / 天數</label>
              <input v-model="newPhoto.date" placeholder="例如: Day 02 • 10/09" class="form-input" />
            </div>

            <div class="form-group">
              <label>分類</label>
              <select v-model="newPhoto.category" class="form-input">
                <option value="sweet">甜蜜合照</option>
                <option value="osaka">大阪風情</option>
                <option value="kyoto">京都古韻</option>
                <option value="sea_kyoto">海之京都</option>
                <option value="shiga">滋賀絕景</option>
                <option value="gourmet">極致美食</option>
              </select>
            </div>

            <div class="form-group">
              <label>照片來源 (可選上傳本機圖片 或 貼上網址)</label>
              <div class="file-upload-box">
                <input type="file" accept="image/*" @change="handleFileUpload" class="file-input" />
              </div>
              <input v-model="newPhoto.imageUrl" placeholder="或者直接貼上圖片 URL" class="form-input mt-2" />
            </div>

            <div class="form-group">
              <label>照片故事 / 心情筆記</label>
              <textarea v-model="newPhoto.description" rows="3" placeholder="記錄下當時的感動與回憶..." class="form-input"></textarea>
            </div>

            <div class="form-actions">
              <button type="button" class="btn btn-outline" @click="showAddPhotoModal = false">取消</button>
              <button type="submit" class="btn btn-primary">確認新增相片</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { galleryPhotos, defaultGooglePhotosUrl } from '../data/gallery'
import { PhotoItem } from '../types'

const categoryList = [
  { key: 'all', label: '全部照片', icon: '🌟' },
  { key: 'sweet', label: '甜蜜合照', icon: '💖' },
  { key: 'kyoto', label: '京都古韻', icon: '⛩️' },
  { key: 'sea_kyoto', label: '海之京都', icon: '🌊' },
  { key: 'shiga', label: '滋賀絕景', icon: '🏞️' },
  { key: 'osaka', label: '大阪風情', icon: '🎡' },
  { key: 'gourmet', label: '極致美食', icon: '🥩' }
]

const selectedCategory = ref('all')
const googlePhotosLink = ref(defaultGooglePhotosUrl)
const showEditLink = ref(false)
const customUrlInput = ref('')

const photosList = ref<PhotoItem[]>([...galleryPhotos])
const lightboxPhoto = ref<PhotoItem | null>(null)
const showAddPhotoModal = ref(false)

const newPhoto = ref({
  title: '',
  location: '',
  date: 'Day 01 • 10/08',
  category: 'sweet' as 'osaka' | 'kyoto' | 'sea_kyoto' | 'shiga' | 'gourmet' | 'sweet',
  imageUrl: '',
  description: ''
})

onMounted(() => {
  const savedUrl = localStorage.getItem('iris_kansai_google_photos_url')
  if (savedUrl) {
    googlePhotosLink.value = savedUrl
    customUrlInput.value = savedUrl
  } else {
    customUrlInput.value = defaultGooglePhotosUrl
  }

  const savedCustomPhotos = localStorage.getItem('iris_kansai_custom_photos')
  if (savedCustomPhotos) {
    try {
      const parsed = JSON.parse(savedCustomPhotos)
      if (Array.isArray(parsed)) {
        photosList.value = [...parsed, ...galleryPhotos]
      }
    } catch {
      // Ignore
    }
  }
})

function saveGooglePhotosUrl() {
  if (customUrlInput.value.trim()) {
    googlePhotosLink.value = customUrlInput.value.trim()
    localStorage.setItem('iris_kansai_google_photos_url', customUrlInput.value.trim())
    showEditLink.value = false
  }
}

const filteredPhotos = computed(() => {
  if (selectedCategory.value === 'all') {
    return photosList.value
  }
  return photosList.value.filter(p => p.category === selectedCategory.value)
})

function getCategoryCount(key: string): number {
  if (key === 'all') return photosList.value.length
  return photosList.value.filter(p => p.category === key).length
}

function openLightbox(photo: PhotoItem) {
  lightboxPhoto.value = photo
}

function closeLightbox() {
  lightboxPhoto.value = null
}

function handleFileUpload(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    const file = target.files[0]
    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target?.result) {
        newPhoto.value.imageUrl = e.target.result as string
      }
    }
    reader.readAsDataURL(file)
  }
}

function submitNewPhoto() {
  if (!newPhoto.value.title || !newPhoto.value.imageUrl) return

  const categoryNamesMap: Record<string, string> = {
    sweet: '甜蜜合照',
    osaka: '大阪風情',
    kyoto: '京都古韻',
    sea_kyoto: '海之京都',
    shiga: '滋賀絕景',
    gourmet: '極致美食'
  }

  const created: PhotoItem = {
    id: 'custom-' + Date.now(),
    title: newPhoto.value.title,
    location: newPhoto.value.location || '日本關西',
    date: newPhoto.value.date || '2026/10',
    category: newPhoto.value.category,
    categoryName: categoryNamesMap[newPhoto.value.category] || '珍貴回憶',
    imageUrl: newPhoto.value.imageUrl,
    description: newPhoto.value.description || '',
    tags: ['珍貴紀念']
  }

  photosList.value.unshift(created)

  // Save to localStorage
  const savedCustomPhotos = localStorage.getItem('iris_kansai_custom_photos')
  let customArray: PhotoItem[] = []
  if (savedCustomPhotos) {
    try {
      customArray = JSON.parse(savedCustomPhotos)
    } catch {
      customArray = []
    }
  }
  customArray.unshift(created)
  localStorage.setItem('iris_kansai_custom_photos', JSON.stringify(customArray))

  showAddPhotoModal.value = false
  // Reset form
  newPhoto.value = {
    title: '',
    location: '',
    date: 'Day 01 • 10/08',
    category: 'sweet',
    imageUrl: '',
    description: ''
  }
}
</script>

<style scoped>
.gallery-section {
  padding: 5rem 0;
  position: relative;
}

/* Google Photos Banner */
.google-photos-banner {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 2rem;
  margin-bottom: 2rem;
  border-left: 5px solid #4285f4;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(240, 244, 255, 0.9));
}

@media (min-width: 860px) {
  .google-photos-banner {
    flex-direction: row;
    align-items: center;
    padding: 2.25rem 2.75rem;
  }
}

.gp-left {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.gp-icon-wrap {
  width: 60px;
  height: 60px;
  border-radius: 16px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 14px rgba(66, 133, 244, 0.2);
  flex-shrink: 0;
}

.gp-title {
  font-size: 1.3rem;
  font-weight: 800;
  color: var(--kyoto-indigo);
  margin-bottom: 0.35rem;
}

.gp-desc {
  font-size: 0.92rem;
  color: var(--text-secondary);
  line-height: 1.6;
  max-width: 650px;
}

.gp-right {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
}

.btn-gp {
  background: linear-gradient(135deg, #4285f4, #1a73e8);
  box-shadow: 0 4px 14px rgba(66, 133, 244, 0.35);
}
.btn-gp:hover {
  box-shadow: 0 6px 20px rgba(66, 133, 244, 0.5);
}

.btn-edit-url {
  font-size: 0.85rem;
  padding: 0.65rem 1.15rem;
}

/* Custom Link Drawer */
.custom-link-box {
  padding: 1.5rem;
  margin-bottom: 2rem;
  background: #ffffff;
  border: 1.5px solid rgba(66, 133, 244, 0.3);
}

.custom-link-label {
  display: block;
  font-size: 0.9rem;
  color: var(--kyoto-indigo);
  margin-bottom: 0.5rem;
}

.custom-link-input-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.custom-url-input {
  flex: 1;
  min-width: 260px;
  padding: 0.75rem 1rem;
  border-radius: var(--radius-md);
  border: 1.5px solid rgba(0, 0, 0, 0.15);
  font-size: 0.92rem;
  outline: none;
}
.custom-url-input:focus {
  border-color: #4285f4;
}

.custom-link-hint {
  font-size: 0.8rem;
  color: var(--text-muted);
  margin-top: 0.5rem;
}

/* Controls Bar */
.gallery-controls-bar {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.category-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.cat-filter-btn {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.45rem 1rem;
  border-radius: var(--radius-full);
  border: 1px solid rgba(184, 59, 50, 0.15);
  background: rgba(255, 255, 255, 0.8);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
}

.cat-filter-btn:hover {
  background: white;
  color: var(--primary-maple);
}

.cat-filter-btn.active {
  background: var(--primary-maple);
  color: white;
  border-color: var(--primary-maple);
  box-shadow: 0 4px 12px rgba(184, 59, 50, 0.3);
}

.cat-count {
  font-size: 0.75rem;
  opacity: 0.8;
}

.btn-add-photo {
  font-size: 0.85rem;
  padding: 0.5rem 1.15rem;
}

/* Photo Grid */
.photos-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 640px) {
  .photos-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .photos-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.photo-card {
  border-radius: var(--radius-lg);
  overflow: hidden;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(0, 0, 0, 0.08);
  background: white;
  transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.photo-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 32px rgba(35, 20, 15, 0.14);
}

.photo-img-wrap {
  position: relative;
  width: 100%;
  padding-top: 65%;
  overflow: hidden;
  background: #f0ebe4;
}

.photo-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.photo-card:hover .photo-img {
  transform: scale(1.06);
}

.photo-overlay {
  position: absolute;
  inset: 0;
  background: rgba(27, 33, 56, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.photo-card:hover .photo-overlay {
  opacity: 1;
}

.view-icon {
  background: rgba(255, 255, 255, 0.92);
  color: var(--kyoto-indigo);
  font-size: 0.82rem;
  font-weight: 700;
  padding: 0.4rem 0.9rem;
  border-radius: var(--radius-full);
}

.photo-date-tag {
  position: absolute;
  bottom: 0.6rem;
  left: 0.6rem;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  font-size: 0.72rem;
  font-weight: 600;
  padding: 0.2rem 0.6rem;
  border-radius: var(--radius-full);
  backdrop-filter: blur(4px);
}

.photo-info {
  padding: 1.25rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.photo-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.photo-loc {
  font-size: 0.78rem;
  color: var(--text-muted);
}

.photo-title {
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--kyoto-indigo);
  margin-bottom: 0.4rem;
}

.photo-desc {
  font-size: 0.88rem;
  color: var(--text-secondary);
  line-height: 1.6;
  flex: 1;
  margin-bottom: 0.75rem;
}

.photo-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.p-tag {
  font-size: 0.72rem;
  color: var(--primary-maple);
  background: var(--primary-maple-soft);
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
}

/* Lightbox Modal */
.lightbox-backdrop {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(10, 12, 20, 0.9);
  backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}

.lightbox-box {
  position: relative;
  max-width: 900px;
  width: 100%;
  background: white;
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.4);
}

.lightbox-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: none;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 1.1rem;
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.lightbox-close:hover {
  background: var(--primary-maple);
  transform: scale(1.1);
}

.lightbox-img {
  width: 100%;
  max-height: 60vh;
  object-fit: cover;
  display: block;
}

.lightbox-caption {
  padding: 1.5rem 2rem;
  background: #ffffff;
}

.caption-head {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.caption-date {
  font-size: 0.85rem;
  color: var(--text-muted);
}

.caption-title {
  font-size: 1.4rem;
  font-weight: 800;
  color: var(--kyoto-indigo);
  margin-bottom: 0.5rem;
}

.caption-desc {
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.7;
}

/* Modal Form */
.modal-compact {
  max-width: 540px;
}

.add-photo-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.form-group label {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--kyoto-indigo);
}

.form-input {
  padding: 0.65rem 0.85rem;
  border-radius: var(--radius-sm);
  border: 1.5px solid rgba(0, 0, 0, 0.15);
  font-size: 0.9rem;
  font-family: inherit;
}
.form-input:focus {
  border-color: var(--primary-maple);
  outline: none;
}

.file-upload-box {
  padding: 0.5rem;
  border: 1px dashed rgba(0, 0, 0, 0.2);
  border-radius: var(--radius-sm);
}

.file-input {
  font-size: 0.85rem;
}

.mt-2 {
  margin-top: 0.5rem;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1rem;
}
</style>
