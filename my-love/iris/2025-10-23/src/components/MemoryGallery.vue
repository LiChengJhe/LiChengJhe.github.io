<template>
	<section class="memory-gallery" aria-labelledby="memories-title">
		<div class="memory-gallery__background" aria-hidden="true">
			<span class="memory-gallery__glow memory-gallery__glow--left"></span>
			<span class="memory-gallery__glow memory-gallery__glow--right"></span>
			<span class="memory-gallery__ring memory-gallery__ring--outer"></span>
			<span class="memory-gallery__ring memory-gallery__ring--inner"></span>
			<span
				v-for="particle in particles"
				:key="particle.id"
				class="memory-gallery__sparkle"
				:style="getParticleStyle(particle)"
			></span>
		</div>

		<header class="memory-gallery__header fade-up">
			<span class="memory-gallery__badge" aria-hidden="true">Treasure Collection</span>
			<h2 id="memories-title">專屬於我們的畫面</h2>
			<p>
				這些片刻都值得被珍藏。點開照片，就能看到我們一起寫下的故事，也歡迎連到完整相簿細細回味。
			</p>
		</header>

		<div class="memory-gallery__grid" role="list">
			<article
				v-for="memory in memories"
				:key="memory.id"
				class="memory-card"
				:style="{ '--card-delay': `${memory.delay}s` }"
				role="listitem"
				:ref="registerCard"
			>
				<div class="memory-card__halo" aria-hidden="true"></div>
				<div class="memory-card__aura" aria-hidden="true"></div>

				<button
					type="button"
					class="memory-card__image"
					:aria-label="`放大檢視 ${memory.title} 的照片`"
					@click="openLightbox(memory)"
				>
					<span class="memory-card__media">
						<img :src="memory.image" :alt="memory.alt" :style="getImageStyle(memory)" loading="lazy" />
						<span class="memory-card__shine" aria-hidden="true"></span>
					</span>
					<span class="memory-card__hint">點擊放大</span>
				</button>

				<div class="memory-card__content">
					<h3>{{ memory.title }}</h3>
					<p>{{ memory.caption }}</p>
					<a
						v-if="memory.link"
						:href="memory.link"
						target="_blank"
						rel="noopener noreferrer"
						class="memory-card__link"
					>
						檢視完整相簿
					</a>
				</div>
			</article>
		</div>

		<transition name="fade">
			<div
				v-if="activeMemory"
				class="lightbox"
				role="dialog"
				aria-modal="true"
				aria-labelledby="lightbox-title"
				@click.self="closeLightbox"
			>
				<div class="lightbox__glow" aria-hidden="true"></div>
				<div class="lightbox__content">
					<button type="button" class="lightbox__close" aria-label="關閉放大視窗" @click="closeLightbox">×</button>
					<div class="lightbox__media">
						<span class="lightbox__halo" aria-hidden="true"></span>
						<img :src="activeMemory.image" :alt="activeMemory.alt" />
					</div>
					<div class="lightbox__text">
						<h3 id="lightbox-title">{{ activeMemory.title }}</h3>
						<p>{{ activeMemory.caption }}</p>
						<a
							v-if="activeMemory.link"
							:href="activeMemory.link"
							target="_blank"
							rel="noopener noreferrer"
							class="memory-card__link"
						>
							前往更多照片
						</a>
					</div>
				</div>
			</div>
		</transition>
	</section>
</template>

<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';

const sparkleColors = ['rgba(255, 216, 232, 0.85)', 'rgba(255, 240, 250, 0.78)', 'rgba(255, 202, 225, 0.82)'];

const particles = Array.from({ length: 18 }, (_, index) => {
	const color = sparkleColors[index % sparkleColors.length];
	return {
		id: index,
		left: Math.random() * 100,
		top: 8 + Math.random() * 80,
		delay: Math.random() * 8,
		duration: 10 + Math.random() * 8,
		scale: 0.6 + Math.random() * 0.8,
		color
	};
});

const getParticleStyle = (particle) => ({
	left: `${particle.left}%`,
	top: `${particle.top}%`,
	animationDelay: `${particle.delay}s`,
	animationDuration: `${particle.duration}s`,
	transform: `scale(${particle.scale})`,
	background: particle.color
});

const baseMemories = [
	{
		id: 'xpark',
		title: 'XPark 水族館',
		caption:
			'在水族館的玻璃世界裡，魚兒悠游，妳的笑容倒映在水光間，愛情也悄悄流淌成溫柔的河流。',
		alt: '我們在 XPark 水族館的合影',
		image: new URL('../assets/memories/1.png', import.meta.url).href,
		link: 'https://photos.app.goo.gl/8p5U6FeFHDNoLFqJA'
	},
	{
		id: 'tung-blossom',
		title: '油桐花初綻',
		caption: '初見時的妳，如同油桐花初綻，純白無瑕，讓我的世界也跟著明亮起來。',
		alt: '油桐花樹下的笑顏',
		image: new URL('../assets/memories/2.png', import.meta.url).href,
		focus: '65% 0%',
		link: 'https://photos.app.goo.gl/5oBvJCjm41Su2yJNA'
	},
	{
		id: 'asakusa',
		title: '淺草和服之旅',
		caption: '和服下的笑顏，是旅途中最美的風景。漫步異鄉街頭，彼此的陪伴讓每一步都踏實。',
		alt: '穿著和服的我們在淺草街頭',
		image: new URL('../assets/memories/3.png', import.meta.url).href,
		link: 'https://photos.app.goo.gl/SB9D8StRpEHNUU2y9'
	},
	{
		id: 'disney',
		title: '東京迪士尼的夢',
		caption: '在童話國度裡，我們像孩子一樣歡笑奔跑，把快樂和夢想都收藏進彼此的心裡。',
		alt: '東京迪士尼的快樂瞬間',
		image: new URL('../assets/memories/4.png', import.meta.url).href,
		link: 'https://photos.app.goo.gl/UhCPtCqtFXiffEJTA'
	},
	{
		id: 'boat',
		title: '同舟共渡的時光',
		caption: '無論前方風平浪靜或波瀾壯闊，有妳在身旁，未來都值得期待。',
		alt: '在小船上泛舟的合影',
		image: new URL('../assets/memories/5.png', import.meta.url).href,
		link: 'https://photos.app.goo.gl/fVpC4N6TMu7XGBZN9'
	},
	{
		id: 'mini-world',
		title: '小人國的笑聲',
		caption: '青春的笑聲在遊樂園裡迴盪，妳的快樂讓愛情變得勇敢又燦爛。',
		alt: '遊樂園裡的合照',
		image: new URL('../assets/memories/6.png', import.meta.url).href,
		link: 'https://photos.app.goo.gl/U1JPusCXg5y7ap63A'
	},
	{
		id: 'light-show',
		title: '花之舞光影展',
		caption: '光影流轉，妳的身影在燈光下格外溫柔，時光彷彿慢了下來，只為記住這一刻。',
		alt: '花之舞光影展的剪影',
		image: new URL('../assets/memories/7.png', import.meta.url).href,
		focus: '0% 0%',
		link: 'https://photos.app.goo.gl/RaaxUVPZ682Jo5BC6'
	},
	{
		id: 'cherry-blossom',
		title: '櫻花樹下的約定',
		caption: '櫻花飄落時，妳的笑容比花還燦爛。愛如春日花雨，輕落在我們肩上。',
		alt: '櫻花樹下牽手的瞬間',
		image: new URL('../assets/memories/8.png', import.meta.url).href,
		link: 'https://photos.app.goo.gl/TR1Yvin5TrsZDjHF7'
	},
	{
		id: 'leo-foo',
		title: '六福村的旋轉木馬',
		caption: '旋轉木馬上的歡笑，是我們青春最純真的記號。願快樂永不止息。',
		alt: '六福村旋轉木馬上的微笑',
		image: new URL('../assets/memories/9.png', import.meta.url).href,
		link: 'https://photos.app.goo.gl/YS88JpdHZofXfzQn7'
	},
	{
		id: 'hakka-village',
		title: '苗栗蘆竹湳古厝',
		caption: '漫步紅磚巷弄，時光凝結。彼此相伴的笑顏，溫柔成為記憶的底片。',
		alt: '苗栗蘆竹湳古厝的笑顏',
		image: new URL('../assets/memories/16.png', import.meta.url).href,
		link: 'https://photos.app.goo.gl/tdf1dApuzzG7g1p79'
	},
	{
		id: 'teamlab',
		title: 'TeamLab 光影的我們',
		caption: '光影交織的空間裡，鏡片反射著同樣的笑意，將繽紛與溫暖收錄心底。',
		alt: 'TeamLab 展覽裡的倒影',
		image: new URL('../assets/memories/15.png', import.meta.url).href,
		link: 'https://photos.app.goo.gl/WgyScc4DPgvFAiCu5'
	},
	{
		id: 'billiards',
		title: '撞球教室的默契',
		caption: '新手握桿的靦腆與陪伴的溫柔，青春瞬間定格成最甜的畫面。',
		alt: '撞球桌前的合照',
		image: new URL('../assets/memories/17.png', import.meta.url).href,
		link: 'https://photos.app.goo.gl/b5x9385ehokV814J9'
	},
	{
		id: 'bowling',
		title: '保齡球館的小挑戰',
		caption: '笨拙拿起沉甸甸的球，暖黃燈光下留下傻氣卻溫馨的笑顏。',
		alt: '保齡球道上的我們',
		image: new URL('../assets/memories/14.png', import.meta.url).href,
		link: 'https://photos.app.goo.gl/ykdDiHNNSTfp9b5m7'
	},
	{
		id: 'bear-exhibition',
		title: '自嘲熊的童趣',
		caption: '和自嘲熊合影的瞬間，童心與可愛讓我們一起大笑。',
		alt: '自嘲熊展覽前的笑容',
		image: new URL('../assets/memories/10.png', import.meta.url).href,
		focus: '65% 0%',
		link: 'https://photos.app.goo.gl/qxfK7HBQJdenoB5S8'
	},
	{
		id: 'hsinchu-lantern',
		title: '竹北燈會的夜',
		caption: '燈火點亮夜色，也照亮我們的未來。有妳在，平凡的夜晚也變得溫馨。',
		alt: '竹北燈會下的身影',
		image: new URL('../assets/memories/11.png', import.meta.url).href,
		focus: '0% 30%',
		link: 'https://photos.app.goo.gl/Fk1eDj66jYYw4uWp6'
	},
	{
		id: 'taoyuan-lantern',
		title: '桃園燈會的依偎',
		caption: '在人潮裡依偎，感受彼此的溫度。幸福就是和妳靜靜走過每個夜晚。',
		alt: '桃園燈會上的合影',
		image: new URL('../assets/memories/12.png', import.meta.url).href,
		focus: '0% 30%',
		link: 'https://photos.app.goo.gl/8rcaomivS85jsys46'
	},
	{
		id: 'climbing',
		title: '勇敢攀岩的一天',
		caption: '每一次攀登都是勇氣的證明，謝謝妳陪我一起突破自己。',
		alt: '攀岩牆上的突破',
		image: new URL('../assets/memories/13.png', import.meta.url).href,
		link: 'https://photos.app.goo.gl/QyYnhKCwDfFsNwz39'
	}
];

const memories = baseMemories.map((memory, index) => ({
	...memory,
	delay: 0.08 * index
}));

const activeMemory = ref(null);
const cardRefs = ref([]);
const observer = ref(null);

const getImageStyle = (memory) =>
	memory.focus
		? {
				objectPosition: memory.focus
			}
		: {};

const registerCard = (el) => {
	if (!el || cardRefs.value.includes(el)) return;
	cardRefs.value.push(el);
	if (observer.value) {
		observer.value.observe(el);
	}
};


const handleKeydown = (event) => {
	if (event.key === 'Escape') {
		closeLightbox();
	}
};

const openLightbox = async (memory) => {
	activeMemory.value = memory;
	await nextTick();
	const closeButton = document.querySelector('.lightbox__close');
	closeButton?.focus({ preventScroll: true });
};

const closeLightbox = () => {
	activeMemory.value = null;
};

onMounted(() => {
	observer.value = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				entry.target.classList.toggle('memory-card--visible', entry.isIntersecting);
			});
		},
		{
			threshold: 0.3,
			rootMargin: '-80px 0px'
		}
	);

	cardRefs.value.forEach((card) => observer.value?.observe(card));
});

watch(activeMemory, (value) => {
	if (value) {
		window.addEventListener('keydown', handleKeydown);
	} else {
		window.removeEventListener('keydown', handleKeydown);
	}
});

onBeforeUnmount(() => {
	window.removeEventListener('keydown', handleKeydown);
	observer.value?.disconnect();
	observer.value = null;
	cardRefs.value = [];
});
</script>

<style scoped>
.memory-gallery {
	position: relative;
	overflow: hidden;
	padding: clamp(3.2rem, 6vw, 5.6rem);
	border-radius: 42px;
	background: var(--surface-gradient);
	box-shadow: 0 42px 128px rgba(244, 93, 144, 0.22);
	display: grid;
	gap: clamp(2.6rem, 5vw, 4rem);
	isolation: isolate;
}

.memory-gallery__background {
	position: absolute;
	inset: -14% -8% -18%;
	pointer-events: none;
	z-index: 0;
	overflow: hidden;
}

.memory-gallery__glow {
	position: absolute;
	width: clamp(280px, 32vw, 420px);
	height: clamp(280px, 32vw, 420px);
	border-radius: 50%;
	filter: blur(50px);
	opacity: 0.75;
	animation: galleryGlowPulse 12s ease-in-out infinite;
}

.memory-gallery__glow--left {
	top: -12%;
	left: -6%;
	background: radial-gradient(circle, rgba(255, 198, 223, 0.75), transparent 68%);
}

.memory-gallery__glow--right {
	bottom: -18%;
	right: -10%;
	background: radial-gradient(circle, rgba(255, 232, 217, 0.7), transparent 72%);
	animation-delay: 4s;
}

.memory-gallery__ring {
	position: absolute;
	border: 1px solid rgba(255, 255, 255, 0.48);
	border-radius: 50%;
	filter: blur(0.6px);
	opacity: 0.35;
	animation: galleryRingPulse 18s ease-in-out infinite;
}

.memory-gallery__ring--outer {
	inset: 14% 16% 18% 12%;
}

.memory-gallery__ring--inner {
	inset: 22% 26% 24% 20%;
	animation-delay: 6s;
	opacity: 0.25;
}

.memory-gallery__sparkle {
	position: absolute;
	width: 12px;
	height: 12px;
	border-radius: 999px;
	filter: blur(1px);
	opacity: 0;
	animation-name: gallerySparkle;
	animation-timing-function: ease-in-out;
	animation-iteration-count: infinite;
}

.memory-gallery__header {
	position: relative;
	z-index: 1;
	text-align: center;
	max-width: 680px;
	margin: 0 auto;
	display: grid;
	gap: 1rem;
}

.memory-gallery__badge {
	justify-self: center;
	padding: 0.45rem 1.4rem;
	border-radius: 999px;
	background: rgba(255, 255, 255, 0.6);
	color: var(--primary-dark);
	font-size: 0.78rem;
	letter-spacing: 0.22em;
	text-transform: uppercase;
	font-weight: 600;
	box-shadow: 0 16px 40px rgba(244, 93, 144, 0.24);
	backdrop-filter: blur(12px);
}

.memory-gallery__header h2 {
	font-size: clamp(2rem, 4vw, 2.6rem);
	color: var(--primary-dark);
	letter-spacing: 0.06em;
}

.memory-gallery__header p {
	color: rgba(51, 28, 46, 0.68);
	line-height: 1.65;
	font-size: 1.05rem;
}

.memory-gallery__grid {
	position: relative;
	z-index: 1;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
	gap: clamp(1.6rem, 3vw, 2.4rem);
}

.memory-card {
	position: relative;
	display: grid;
	gap: 1.4rem;
	padding: clamp(1.6rem, 3vw, 2.2rem);
	border-radius: 30px;
	background: rgba(255, 255, 255, 0.88);
	backdrop-filter: blur(18px);
	box-shadow: 0 26px 72px rgba(51, 28, 46, 0.16);
	transition: transform 0.45s ease, box-shadow 0.45s ease;
	transform: translateY(40px) scale(0.96);
	opacity: 0;
	will-change: transform, opacity;
	transition-delay: var(--card-delay, 0s);
}

.memory-card::after {
	content: '';
	position: absolute;
	inset: -1px;
	border-radius: inherit;
	background: linear-gradient(140deg, rgba(244, 93, 144, 0.24), rgba(255, 198, 223, 0.08));
	opacity: 0;
	transition: opacity 0.45s ease;
	z-index: 0;
	pointer-events: none;
}

.memory-card--visible {
	transform: translateY(0) scale(1);
	opacity: 1;
}

.memory-card:hover,
.memory-card:focus-within {
	transform: translateY(-12px) scale(1.01);
	box-shadow: 0 34px 90px rgba(244, 93, 144, 0.28);
}

.memory-card:hover::after,
.memory-card:focus-within::after {
	opacity: 1;
}

.memory-card__halo,
.memory-card__aura {
	position: absolute;
	inset: 10% 14%;
	border-radius: 24px;
	background: radial-gradient(circle, rgba(255, 209, 231, 0.4), transparent 70%);
	filter: blur(8px);
	opacity: 0;
	transition: opacity 0.45s ease;
	z-index: 0;
	pointer-events: none;
}

.memory-card__aura {
	inset: 16% 20%;
	background: radial-gradient(circle, rgba(255, 255, 255, 0.6), transparent 70%);
}

.memory-card:hover .memory-card__halo,
.memory-card:focus-within .memory-card__halo,
.memory-card:hover .memory-card__aura,
.memory-card:focus-within .memory-card__aura {
	opacity: 1;
}

.memory-card__image {
	position: relative;
	display: block;
	width: 100%;
	border: none;
	padding: 0;
	background: none;
	cursor: pointer;
	text-align: left;
	z-index: 1;
}

.memory-card__image:focus-visible {
	outline: 3px solid rgba(244, 93, 144, 0.45);
	outline-offset: 6px;
}

.memory-card__media {
	position: relative;
	display: block;
	border-radius: 24px;
	overflow: hidden;
	background: rgba(255, 255, 255, 0.8);
	box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.4);
}

.memory-card__media img {
	display: block;
	width: 100%;
	height: clamp(220px, 38vw, 260px);
	object-fit: cover;
	transition: transform 0.6s ease, filter 0.6s ease;
	filter: brightness(0.98) contrast(1.07) saturate(1.05);
}

.memory-card:hover .memory-card__media img,
.memory-card:focus-within .memory-card__media img {
	transform: scale(1.05);
	filter: brightness(1.02) contrast(1.08) saturate(1.1);
}

.memory-card__shine {
	position: absolute;
	inset: -40%;
	background: conic-gradient(from 120deg at 50% 50%, rgba(255, 255, 255, 0.18), rgba(255, 181, 215, 0.4), rgba(255, 255, 255, 0.18));
	filter: blur(12px);
	opacity: 0;
	transform: rotate(0deg);
	transition: transform 1s ease, opacity 0.6s ease;
}

.memory-card:hover .memory-card__shine,
.memory-card:focus-within .memory-card__shine {
	opacity: 0.6;
	transform: rotate(28deg);
}

.memory-card__hint {
	position: absolute;
	bottom: 1rem;
	right: 1rem;
	padding: 0.4rem 0.9rem;
	border-radius: 999px;
	background: rgba(51, 28, 46, 0.65);
	color: #fff;
	font-size: 0.78rem;
	letter-spacing: 0.08em;
	text-transform: uppercase;
	box-shadow: 0 12px 24px rgba(51, 28, 46, 0.2);
	opacity: 0;
	transition: opacity 0.35s ease;
}

.memory-card:hover .memory-card__hint,
.memory-card__image:focus-visible .memory-card__hint {
	opacity: 1;
}

.memory-card__content {
	position: relative;
	display: grid;
	gap: 0.9rem;
	z-index: 1;
}

.memory-card__content h3 {
	font-size: 1.25rem;
	color: var(--primary-dark);
	margin: 0;
}

.memory-card__content p {
	color: rgba(51, 28, 46, 0.68);
	line-height: 1.6;
	font-size: 0.98rem;
}

.memory-card__link {
	justify-self: flex-start;
	display: inline-flex;
	align-items: center;
	gap: 0.45rem;
	padding: 0.48rem 1.05rem;
	border-radius: 999px;
	background: rgba(244, 93, 144, 0.14);
	color: var(--primary-dark);
	font-weight: 600;
	text-decoration: none;
	box-shadow: 0 14px 26px rgba(244, 93, 144, 0.18);
	transition: transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
}

.memory-card__link::after {
	content: '↗';
	font-size: 0.9rem;
}

.memory-card__link:hover,
.memory-card__link:focus-visible {
	transform: translateY(-2px);
	background: rgba(244, 93, 144, 0.24);
	box-shadow: 0 18px 32px rgba(244, 93, 144, 0.24);
}

.lightbox {
	position: fixed;
	inset: 0;
	display: grid;
	place-items: center;
	padding: clamp(1.8rem, 4vw, 3.2rem);
	background: rgba(24, 12, 22, 0.78);
	z-index: 20;
	overflow-y: auto;
}

.lightbox__glow {
	position: absolute;
	inset: 12% 18%;
	background: radial-gradient(circle, rgba(244, 93, 144, 0.35), transparent 75%);
	filter: blur(40px);
	z-index: 0;
	opacity: 0.8;
}

.lightbox__content {
	position: relative;
	background: rgba(255, 255, 255, 0.94);
	border-radius: 32px;
	max-width: min(920px, 94vw);
	width: 100%;
	display: grid;
	gap: clamp(1.6rem, 4vw, 2.6rem);
	grid-template-columns: minmax(260px, 360px) minmax(0, 1fr);
	align-items: center;
	padding: clamp(1.8rem, 4vw, 2.8rem);
	box-shadow: 0 48px 140px rgba(244, 93, 144, 0.34);
	z-index: 1;
}

.lightbox__close {
	position: absolute;
	top: 1.4rem;
	right: 1.4rem;
	border: none;
	background: rgba(51, 28, 46, 0.2);
	color: var(--text-dark);
	width: 2.6rem;
	height: 2.6rem;
	border-radius: 50%;
	font-size: 1.5rem;
	cursor: pointer;
	display: grid;
	place-items: center;
	transition: background 0.3s ease, transform 0.3s ease;
}

.lightbox__close:hover,
.lightbox__close:focus-visible {
	background: rgba(51, 28, 46, 0.32);
	transform: scale(1.05);
}

.lightbox__media {
	position: relative;
	display: grid;
	place-items: center;
	justify-self: center;
}

.lightbox__halo {
	position: absolute;
	inset: -12%;
	border-radius: 30px;
	background: radial-gradient(circle, rgba(255, 209, 231, 0.32), transparent 70%);
	filter: blur(18px);
	z-index: 0;
}

.lightbox__media img {
	position: relative;
	z-index: 1;
	width: min(360px, 46vw);
	height: min(360px, 46vw);
	max-width: 100%;
	border-radius: 26px;
	box-shadow: 0 28px 80px rgba(51, 28, 46, 0.3);
	object-fit: cover;
}

.lightbox__text {
	display: grid;
	gap: 1rem;
	max-width: 480px;
}

.lightbox__text h3 {
	font-size: clamp(1.6rem, 3vw, 2rem);
	color: var(--primary-dark);
}

.lightbox__text p {
	color: rgba(51, 28, 46, 0.72);
	line-height: 1.7;
	font-size: 1rem;
}

@media (max-width: 880px) {
	.memory-gallery__grid {
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
	}

	.memory-card__media img {
		height: clamp(200px, 52vw, 240px);
	}

	.lightbox__content {
		grid-template-columns: 1fr;
	}

	.lightbox__media img {
		width: min(70vw, 340px);
		height: auto;
	}
}

@media (max-width: 620px) {
	.memory-gallery {
		padding: clamp(2.4rem, 10vw, 3rem);
	}

	.memory-gallery__grid {
		gap: 1.4rem;
	}

	.memory-card {
		padding: 1.4rem 1.5rem 1.6rem;
	}

	.memory-card__media img {
		height: clamp(200px, 70vw, 220px);
	}

	.memory-card__hint {
		bottom: 0.8rem;
		right: 0.8rem;
	}
}

@media (prefers-reduced-motion: reduce) {
	.memory-gallery__glow,
	.memory-gallery__ring,
	.memory-gallery__sparkle,
	.memory-card,
	.memory-card__media img,
	.memory-card__shine,
	.lightbox__close {
		animation-duration: 0.001ms !important;
		animation-iteration-count: 1 !important;
		transition-duration: 0.001ms !important;
	}

	.memory-card {
		transform: none;
		opacity: 1;
	}
}

@keyframes galleryGlowPulse {
	0% {
		transform: scale(0.96);
		opacity: 0.6;
	}
	50% {
		transform: scale(1.06);
		opacity: 0.82;
	}
	100% {
		transform: scale(0.96);
		opacity: 0.6;
	}
}

@keyframes galleryRingPulse {
	0%,
	100% {
		transform: scale(0.96);
		opacity: 0.3;
	}
	50% {
		transform: scale(1.05);
		opacity: 0.5;
	}
}

@keyframes gallerySparkle {
	0% {
		transform: translate3d(-10px, 12px, 0) scale(0.6);
		opacity: 0;
	}
	25% {
		opacity: 0.45;
	}
	70% {
		transform: translate3d(18px, -28px, 0) scale(1.05);
		opacity: 0.8;
	}
	100% {
		transform: translate3d(28px, -54px, 0) scale(1.2);
		opacity: 0;
	}
}
</style>
