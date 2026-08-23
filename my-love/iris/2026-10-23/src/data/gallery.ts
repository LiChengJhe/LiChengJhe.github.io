import { PhotoItem, TravelCareTip } from '../types'

export const defaultGooglePhotosUrl = 'https://photos.google.com/'

export const galleryPhotos: PhotoItem[] = [
  {
    id: 'p1',
    title: '伏見稻荷大社 • 千本鳥居',
    location: '京都 伏見區',
    date: 'Day 02 • 10/09',
    imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200&auto=format&fit=crop',
    category: 'kyoto',
    categoryName: '京都古韻',
    description: '陽光穿透朱紅千本鳥居的清晨，牽著彥伃的手漫步，祈願我們與全家健康平安。',
    featured: true,
    tags: ['千本鳥居', '伏見狐狸繪馬', '稻荷大社']
  },
  {
    id: 'p2',
    title: '伊根舟屋 • 海上遊覽與海鷗同行',
    location: '京都 丹後半島 伊根町',
    date: 'Day 03 • 10/10',
    imageUrl: 'https://images.unsplash.com/photo-1578637387939-43c525550085?q=80&w=1200&auto=format&fit=crop',
    category: 'sea_kyoto',
    categoryName: '海之京都',
    description: '站在伊根遊覽船甲板上，成群海鷗在蔚藍水面上盤旋，舟屋倒映在波光粼粼的日本海。',
    featured: true,
    tags: ['伊根舟屋', '向井酒造', '海之京都']
  },
  {
    id: 'p3',
    title: '天橋立 • 昇龍觀展望台',
    location: '京都 宮津市 天橋立',
    date: 'Day 03 • 10/10',
    imageUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1200&auto=format&fit=crop',
    category: 'sea_kyoto',
    categoryName: '海之京都',
    description: '日本三景之一天橋立！搭乘纜車登頂，體驗「跨下窺看」如飛龍在天的松樹沙洲奇景。',
    featured: true,
    tags: ['天橋立', '智恩寺', '日本三景']
  },
  {
    id: 'p4',
    title: '白鬚神社 • 湖中朱紅大鳥居',
    location: '滋賀 高島市 琵琶湖',
    date: 'Day 04 • 10/11',
    imageUrl: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=1200&auto=format&fit=crop',
    category: 'shiga',
    categoryName: '滋賀絕景',
    description: '佇立於浩瀚琵琶湖中的千年鳥居，清澈湖水拍打著朱紅木柱，神聖而寧靜。',
    featured: true,
    tags: ['白鬚神社', '湖中鳥居', '近江八景']
  },
  {
    id: 'p5',
    title: '琵琶湖 Terrace • 天空露台雲端絕景',
    location: '滋賀 琵琶湖山頂',
    date: 'Day 04 • 10/11',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop',
    category: 'shiga',
    categoryName: '滋賀絕景',
    description: '海拔 1,100 公尺無邊際景觀水池，眺望日本第一大湖琵琶湖的全景壯闊震撼！',
    featured: true,
    tags: ['BiwakoTerrace', '高空纜車', '近江牛咖哩']
  },
  {
    id: 'p6',
    title: '道頓堀 • 璀璨霓虹與跑跑人',
    location: '大阪 中央區 道頓堀',
    date: 'Day 01 • 10/08',
    imageUrl: 'https://images.unsplash.com/photo-1590559899731-a382839e5549?q=80&w=1200&auto=format&fit=crop',
    category: 'osaka',
    categoryName: '大阪風情',
    description: '熱鬧繁華的道頓堀川畔，跟著固力果跑跑人一起舉起雙手，感受大阪的元氣活力！',
    featured: false,
    tags: ['固力果', '心齋橋', 'PARCO']
  },
  {
    id: 'p7',
    title: '近江八幡 • La Collina 童話草屋',
    location: '滋賀 近江八幡市',
    date: 'Day 04 • 10/11',
    imageUrl: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=1200&auto=format&fit=crop',
    category: 'shiga',
    categoryName: '滋賀絕景',
    description: '彷彿走進吉卜力動畫世界的童話草屋，品嚐 CLUB HARIE 現烤剛出爐的神級年輪蛋糕。',
    featured: false,
    tags: ['LaCollina', 'CLUBHARIE', '年輪蛋糕']
  },
  {
    id: 'p8',
    title: '任天堂博物館 • 經典懷舊夢工廠',
    location: '京都 宇治市 小倉',
    date: 'Day 02 • 10/09',
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop',
    category: 'kyoto',
    categoryName: '京都古韻',
    description: '任天堂全新官方博物館！超巨型紅白機手把雙人挑戰，滿滿兒時回憶與歡笑。',
    featured: false,
    tags: ['NintendoMuseum', '問號方塊', '宇治抹茶']
  },
  {
    id: 'p9',
    title: '關西美食盛宴 • 霜降黑毛和牛與燒肉',
    location: '大阪 / 京都',
    date: 'Day 01 - 06',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop',
    category: 'gourmet',
    categoryName: '極致美食',
    description: '從香嫩多汁的黑毛和牛燒肉、道地壽喜燒，到濃郁神座拉麵與宇治抹茶甜品，美味滿載。',
    featured: false,
    tags: ['和牛燒肉', '壽喜燒', '神座拉麵']
  },
  {
    id: 'p10',
    title: '勝尾寺 • 滿山勝運達摩不倒翁',
    location: '大阪 箕面市',
    date: 'Day 05 (方案B) • 10/12',
    imageUrl: 'https://images.unsplash.com/photo-1528164344705-475426879c0d?q=80&w=1200&auto=format&fit=crop',
    category: 'osaka',
    categoryName: '大阪風情',
    description: '滿山遍野充滿喜氣的紅色達摩，為彥伃點亮右眼祈願心想事成、全家勝運亨通！',
    featured: false,
    tags: ['勝尾寺', '達摩', '萬博太陽之塔']
  },
  {
    id: 'p11',
    title: '甜蜜回憶 • 承哲與彥伃的秋日戀曲',
    location: '日本關西',
    date: '2026/10/08 - 10/13',
    imageUrl: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=1200&auto=format&fit=crop',
    category: 'sweet',
    categoryName: '甜蜜合照',
    description: '牽著手走過古樸京都與現代大阪，妳的笑容就是這趟旅行中最美麗的秋天風景。',
    featured: true,
    tags: ['生日快樂', '浪漫回憶', '承哲與彥伃']
  }
]

export const travelCareTips: TravelCareTip[] = [
  {
    icon: 'Coffee',
    title: '長輩歇腿與定時充電',
    subtitle: '輕鬆不趕路，每 1.5 ~ 2 小時安排茶水歇腳',
    description: '行程中已貼心穿插客美多咖啡、宇治茶屋、琵琶湖景觀露台與商場休息區，讓爸爸媽媽隨時坐下喝熱茶歇腳。',
    practicalTips: [
      '飯店位置極佳，隨時可先回房間放戰利品或小睡片刻。',
      '隨身攜帶保溫瓶，飯店與休息區均可裝溫熱開水。',
      '晚上回飯店貼上「休足時間」，享受舒服熱水澡放鬆雙腿。'
    ]
  },
  {
    icon: 'Utensils',
    title: '免排隊美食與舒適入座',
    subtitle: '避開街邊排隊日曬，選擇舒適預約名店或百貨美食街',
    description: '帶長輩旅行首重用餐品質與舒適度，正餐以預約燒肉、高島屋/大丸百貨樓上景觀餐廳與專車導遊推薦餐廳為主。',
    practicalTips: [
      '早餐可於前晚買好超商飯糰優格，或享用日式咖啡廳厚片套餐。',
      '口味以清淡烏龍麵、壽喜燒、海鮮丼與熟食定食為優先。',
      '長輩如有不吃生食需求，所有餐廳均有豐富熟食與烤物選擇。'
    ]
  },
  {
    icon: 'Bus',
    title: '專車直達與平穩動線',
    subtitle: 'KKday 專車免去提行李與複雜轉乘',
    description: 'Day 3 海之京都與 Day 4 滋賀琵琶湖皆採 KKday 專車一日遊，一車直達景點門口，車上舒適補眠。',
    practicalTips: [
      '景點（天橋立、琵琶湖、勝尾寺）均有全景纜車或無障礙平緩步道。',
      '難波與心齋橋地鐵出入口均有箱型電梯，推行李或長輩上下樓輕鬆無礙。',
      '由良川海上列車與伊根遊覽船船身穩定，老少咸宜不易暈船。'
    ]
  },
  {
    icon: 'HeartHandshake',
    title: '全家回憶與隨手拍照',
    subtitle: '李領隊全方位服務，留下滿滿溫馨照片',
    description: '承哲將隨時擔任專屬攝影師與導遊，幫彥伃、把拔馬麻、大姐二姐記錄每個開心的瞬間！',
    practicalTips: [
      '拍好照片當天即時同步到 Google 雲端相簿，全家都能隨時查看。',
      '行動電源與充電線隨身帶齊，拍照打卡電力滿滿。',
      '彥伃負責美美拍照與開心收生日禮物，其他大小事承哲全力打點！'
    ]
  }
]
