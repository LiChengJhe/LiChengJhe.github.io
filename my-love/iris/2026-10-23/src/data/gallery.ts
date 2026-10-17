import { PhotoItem, TravelCareTip } from '../types'

export const defaultGooglePhotosUrl = 'https://photos.app.goo.gl/ndwb8ckgNhVuNw7j9'

export interface DailyAlbumLink {
  dateStr: string
  dayNumber: number
  dayLabel: string
  title: string
  icon: string
  url: string
  coverTag: string
}

export const dailyGooglePhotosAlbums: DailyAlbumLink[] = [
  {
    dateStr: '10/09',
    dayNumber: 2,
    dayLabel: 'Day 02 (五)',
    title: '京都宇治茶香 • 任天堂博物館',
    icon: '🎮',
    url: 'https://photos.app.goo.gl/ndwb8ckgNhVuNw7j9',
    coverTag: '平等院 • 抹茶拿鐵 • 任天堂博物館'
  },
  {
    dateStr: '10/10',
    dayNumber: 3,
    dayLabel: 'Day 03 (六)',
    title: '海之京都 • 天橋立與伊根舟屋',
    icon: '🌊',
    url: 'https://photos.app.goo.gl/epxWcGQwhSgwaqgs6',
    coverTag: '飛龍觀 • 舟屋散策 • 遊覽船餵海鷗'
  },
  {
    dateStr: '10/11',
    dayNumber: 4,
    dayLabel: 'Day 04 (日)',
    title: '滋賀絕景 • 琵琶湖山谷與童話草根園區',
    icon: '🏞️',
    url: 'https://photos.app.goo.gl/tpNSm4HxN4xLWp6k9',
    coverTag: '白鬚湖中鳥居 • Biwako Terrace • La Collina'
  },
  {
    dateStr: '10/12',
    dayNumber: 5,
    dayLabel: 'Day 05 (一)',
    title: '日本環球影城 USJ • 奇幻冒險全日遊',
    icon: '🎢',
    url: 'https://photos.app.goo.gl/y4n4a5c7AV64Bx2a6',
    coverTag: '瑪利歐 • 芙莉蓮慶生 • 萬聖節殭屍舞'
  }
]

export const galleryPhotos: PhotoItem[] = []

export const travelCareTips: TravelCareTip[] = [
  {
    icon: 'Coffee',
    title: '悠閒節奏與隨時充電',
    subtitle: '輕鬆不趕路，隨時安排茶水甜點歇腳',
    description: '行程中貼心穿插宇治茶屋、小倉站咖啡廳、琵琶湖景觀露台與商場休息區，隨時坐下喝咖啡吃甜點，享受愜意的兩人世界。',
    practicalTips: [
      '飯店位置極佳，逛累了隨時可先回房間放戰利品或小睡片刻。',
      '隨身攜帶保溫瓶或礦泉水，隨時補充水分保持好精神。',
      '晚上回飯店貼上「休足時間」，享受舒服熱水澡放鬆雙腿。'
    ]
  },
  {
    icon: 'Utensils',
    title: '免排隊美食與舒適入座',
    subtitle: '避開街邊排隊日曬，選擇舒適名店或特色餐廳',
    description: '兩人的旅行首重用餐品質與美好體驗，精選道地蕎麥麵、宇治咖哩、丹後海鮮御膳、USJ 芙莉蓮主題料理與梅田義大利麵。',
    practicalTips: [
      '早餐可享用摩斯漢堡或日式咖啡廳朝食，開啟活力滿滿的一天。',
      '午晚餐安排多元在地特色，生魚片、炸物、拉麵與熟食定食豐富多樣。',
      '影城內安排主題餐廳，慶生拍照與用餐一次滿足。'
    ]
  },
  {
    icon: 'Bus',
    title: '專車直達與平穩動線',
    subtitle: '專車一日遊免去提行李與複雜轉乘',
    description: 'Day 3 海之京都與 Day 4 滋賀琵琶湖皆採專車一日遊，一車直達景點門口，車上舒適補眠。',
    practicalTips: [
      '景點（天橋立、琵琶湖 Terrace）均有全景纜車，登高賞景輕鬆又壯觀。',
      '難波與心齋橋地鐵出入口均有箱型電梯，推大件行李與採買戰利品輕鬆無礙。',
      '伊根遊覽船船身平穩，手拿蝦味先享受餵海鷗的浪漫樂趣。'
    ]
  },
  {
    icon: 'HeartHandshake',
    title: '專屬甜蜜回憶與隨手拍照',
    subtitle: '承哲專屬攝影服務，留下滿滿浪漫照片',
    description: '承哲隨時擔任彥伃的專屬攝影師兼領隊，記錄下這趟關西慶生之旅的每個甜蜜動人瞬間！',
    practicalTips: [
      '拍好照片當天即時同步到 Google 雲端相簿，永久保存彼此最美好的回憶。',
      '行動電源與充電線隨身帶齊，USJ 與各大景點拍照打卡電力滿滿。',
      '彥伃負責美美拍照與開心收生日禮物，所有交通行程大小事由承哲全力打點！'
    ]
  }
]
