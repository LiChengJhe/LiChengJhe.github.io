<template>
	<section class="memory-gallery" aria-labelledby="memories-title">
		<div class="memory-gallery__header fade-up">
			<h2 id="memories-title">專屬於我們的畫面</h2>
			<p>
				這些片刻都值得被珍藏。點開照片，就能看到我們一起寫下的故事，也歡迎連到完整相簿細細回味。
			</p>
		</div>

		<div class="memory-gallery__grid" role="list">
			<article
				v-for="memory in memories"
				:key="memory.id"
				class="memory-card fade-up"
				:style="{ animationDelay: `${memory.delay}s` }"
				role="listitem"
			>
				<button
					type="button"
					class="memory-card__image"
					:aria-label="`放大檢視 ${memory.title} 的照片`"
					@click="openLightbox(memory)"
				>
					<img :src="memory.image" :alt="memory.alt" :style="getImageStyle(memory)" loading="lazy" />
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
				<div class="lightbox__content">
					<button type="button" class="lightbox__close" aria-label="關閉放大視窗" @click="closeLightbox">×</button>
					<div class="lightbox__media">
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
import { nextTick, onBeforeUnmount, ref, watch } from 'vue';

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

const getImageStyle = (memory) =>
	memory.focus
		? {
				objectPosition: memory.focus
			}
		: {};


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

watch(activeMemory, (value) => {
	if (value) {
		window.addEventListener('keydown', handleKeydown);
	} else {
		window.removeEventListener('keydown', handleKeydown);
	}
});

onBeforeUnmount(() => {
	window.removeEventListener('keydown', handleKeydown);
});
</script>

<style scoped>
.memory-gallery {
	background: rgba(255, 255, 255, 0.82);
	border-radius: 28px;
	padding: clamp(3rem, 6vw, 5rem);
	box-shadow: 0 24px 70px rgba(244, 93, 144, 0.18);
	display: grid;
	gap: clamp(2.5rem, 5vw, 3.5rem);
}

.memory-gallery__header {
	text-align: center;
	max-width: 620px;
	margin: 0 auto;
	display: grid;
	gap: 1rem;
}

.memory-gallery__header p {
	color: var(--text-muted);
	line-height: 1.6;
}

.memory-gallery__grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
	gap: 1.8rem;
}

.memory-card {
	background: rgba(255, 255, 255, 0.95);
	border-radius: 28px;
	overflow: hidden;
	box-shadow: 0 18px 40px rgba(51, 28, 46, 0.08);
	display: grid;
	gap: 0;
	transition: transform 0.35s ease, box-shadow 0.35s ease;
}

.memory-card:hover {
	transform: translateY(-8px);
	box-shadow: 0 26px 70px rgba(244, 93, 144, 0.28);
}

.memory-card__image {
	position: relative;
	display: block;
	width: 100%;
	aspect-ratio: 1 / 1;
	border: none;
	padding: 0;
	cursor: pointer;
	overflow: hidden;
	background: rgba(255, 255, 255, 0.7);
}

.memory-card__image:focus-visible {
	outline: 3px solid rgba(51, 28, 46, 0.35);
	outline-offset: 4px;
}


.memory-card__image img {
	width: 100%;
	height: 100%;
	object-fit: cover;
	transition: transform 0.4s ease;
	filter: brightness(0.97) contrast(1.05) saturate(1.05);
}

.memory-card:hover .memory-card__image img,
.memory-card__image:focus-visible img {
	transform: scale(1.04);
}

.memory-card__hint {
	position: absolute;
	bottom: 1rem;
	right: 1rem;
	background: rgba(51, 28, 46, 0.65);
	color: white;
	padding: 0.35rem 0.85rem;
	border-radius: 999px;
	font-size: 0.75rem;
	letter-spacing: 0.06em;
	text-transform: uppercase;
	opacity: 0;
	transition: opacity 0.3s ease;
}

.memory-card:hover .memory-card__hint,
.memory-card__image:focus-visible .memory-card__hint {
	opacity: 1;
}

.memory-card__content {
	display: grid;
	gap: 0.75rem;
	padding: 1.6rem;
}

.memory-card__content h3 {
	font-size: 1.2rem;
}

.memory-card__content p {
	color: var(--text-muted);
	line-height: 1.5;
	font-size: 0.95rem;
}

.memory-card__link {
	justify-self: start;
	font-weight: 600;
	color: var(--primary);
	text-decoration: none;
	display: inline-flex;
	align-items: center;
	gap: 0.35rem;
}

.memory-card__link::after {
	content: '↗';
	font-size: 0.85rem;
}

.memory-card__link:hover {
	text-decoration: underline;
}

.lightbox {
	position: fixed;
	inset: 0;
	background: rgba(27, 14, 24, 0.78);
	display: grid;
	place-items: center;
	padding: clamp(1.5rem, 4vw, 3rem);
	z-index: 20;
	overflow-y: auto;
}

.lightbox__content {
	position: relative;
	background: rgba(255, 255, 255, 0.96);
	border-radius: 28px;
	max-width: min(880px, 92vw);
	width: 100%;
	display: grid;
	gap: clamp(1.4rem, 4vw, 2.2rem);
	grid-template-columns: minmax(260px, 360px) minmax(0, 1fr);
	align-items: center;
	padding: clamp(1.5rem, 4vw, 2.5rem);
	box-shadow: 0 40px 120px rgba(244, 93, 144, 0.35);
}

.lightbox__media {
	display: grid;
	place-items: center;
	justify-self: center;
}

.lightbox__close {
	position: absolute;
	top: 1.2rem;
	right: 1.2rem;
	border: none;
	background: rgba(51, 28, 46, 0.16);
	color: var(--text-dark);
	width: 2.4rem;
	height: 2.4rem;
	border-radius: 50%;
	font-size: 1.4rem;
	cursor: pointer;
	display: grid;
	place-items: center;
	transition: background 0.3s ease;
}

.lightbox__close:hover {
	background: rgba(51, 28, 46, 0.28);
}

.lightbox__media img {
	width: min(360px, 45vw);
	max-width: 100%;
	max-height: min(360px, 45vw);
	border-radius: 22px;
	box-shadow: 0 18px 60px rgba(51, 28, 46, 0.25);
	object-fit: cover;
}

.lightbox__text {
	display: grid;
	gap: 0.8rem;
	max-width: 460px;
}

.lightbox__text p {
	color: var(--text-muted);
	line-height: 1.6;
}

@media (max-width: 720px) {
	.memory-gallery__grid {
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1.2rem;
	}

	.memory-card__content {
		padding: 1.2rem 1.4rem 1.5rem;
	}

	.lightbox__content {
		gap: 1.2rem;
		grid-template-columns: 1fr;
	}

	.lightbox__media img {
		width: min(70vw, 320px);
		max-height: min(70vw, 320px);
	}
}
</style>
