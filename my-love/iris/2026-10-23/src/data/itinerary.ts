import { DailyPlan } from '../types'

export const itineraryData: DailyPlan[] = [
  {
    dayNumber: 1,
    dateStr: '2026/10/08',
    weekday: '週四 (Thu)',
    title: '抵達關西・心齋橋商圈漫步',
    subtitle: '台灣虎航啟程 ➔ 抵達關西 ➔ 喜來登福朋入住 ➔ 心齋橋 PARCO 自嘲熊 ➔ 心齋橋筋採買',
    weatherSummary: '🍂 關西初秋 18°C ~ 24°C，微風舒適，適合逛街採買',
    transportPass: '南海特急 Rapi:t / 大阪地鐵御堂筋線',
    tags: ['台灣虎航', '關西機場', '南海特急', '心齋橋', 'PARCO', '自嘲熊'],
    itemsPlanA: [
      {
        id: 'd1-0',
        time: '06:40 - 10:25',
        title: '✈️ 台灣虎航 IT210 啟程飛往大阪關西',
        description: '搭乘清晨 06:40 台灣虎航 IT210 班機從桃園第一航廈起飛，兩人靠窗並肩而坐，帶著滿滿期待展開 6 天 5 夜的甜蜜關西冒險！',
        category: 'flight',
        icon: 'PlaneTakeoff',
        image: './images/flight-departure-cabin.jpg',
        imageCaption: '✈️ 承哲 & Iris 在台灣虎航機艙內甜蜜合影，準備啟程！',
        romanticNote: '清晨的機艙裡，看著妳戴著口罩依然藏不住期待笑意的眼睛，牽著妳的手飛向藍天，這趟屬於我們倆的關西生日之旅正式出發囉！'
      },
      {
        id: 'd1-1',
        time: '10:25 - 11:45',
        title: '🛬 抵達關西機場 (KIX) 辦理入境、領行李',
        description: '抵達關西第一航廈 (T1)，出示 Visit Japan Web QR Code 辦理通關入境與提領托運行李。',
        category: 'flight',
        icon: 'PlaneLanding',
        elderTips: '入境大廳設有洗手間可稍作整理儀容，並於飲水機填裝保溫瓶溫水。'
      },
      {
        id: 'd1-2',
        time: '12:00 - 12:45',
        title: '🍜 關西機場享用蕎麥麵午餐',
        description: '於關西機場餐廳享用道地熱騰騰的日式蕎麥麵，暖胃並補足精神體力。',
        category: 'food',
        icon: 'Utensils',
        cost: '約 ¥1,200 / 人',
        mustTry: '日式高湯蕎麥麵、天婦羅炸蝦蕎麥麵'
      },
      {
        id: 'd1-3',
        time: '13:05 - 13:45',
        title: '🚆 搭乘 13:05 南海特急前往難波',
        description: '搭乘帥氣鐵面騎士 13:05 南海特急 Rapi:t 對號座列車，平穩舒適直達難波站。',
        category: 'transport',
        icon: 'Train',
        cost: '¥1,490 / 人',
        transitInfo: '車程 40 分鐘，大件行李有專屬置物鎖'
      },
      {
        id: 'd1-4',
        time: '13:45 - 14:15',
        title: '🏨 前往大阪心齋橋喜來登福朋快捷酒店辦理入住/寄放行李',
        description: '由難波站轉乘地鐵御堂筋線至心齋橋站，前往 Four Points Express by Sheraton 辦理入住或寄放大件行李，輕裝展開旅程。',
        category: 'hotel',
        icon: 'Hotel',
        transitInfo: '地鐵御堂筋線 1 站直達心齋橋站，出站步行約 3 分鐘',
        elderTips: '先在飯店大廳稍作歇息洗手，輕裝出門逛街散策。'
      },
      {
        id: 'd1-5',
        time: '14:30 - 16:00',
        title: '🛍️ 心齋橋 PARCO 自嘲熊',
        description: '朝聖心齋橋 PARCO 官方 Nagano Market，採買滿滿的自嘲熊（ナガノのくま / Joke Bear）限定玩偶、吊飾與周邊！',
        category: 'shopping',
        icon: 'ShoppingBag',
        mustTry: '自嘲熊限定玩偶、壓克力吊飾與特色周邊',
        romanticNote: '看見妳在自嘲熊專區拿著吊飾笑得那麼燦爛，那一刻妳的笑容比大阪所有的燈火都要閃亮！'
      },
      {
        id: 'd1-6',
        time: '16:00 - 18:00',
        title: '🛍️ 心齋橋筋商店街漫步採買（前半）',
        description: '漫步於具備遮雨頂棚的心齋橋筋商店街，悠閒逛各大人氣店鋪、美妝藥妝店與服飾生活雜貨。',
        category: 'shopping',
        icon: 'Sparkles'
      },
      {
        id: 'd1-7',
        time: '18:00 - 19:30',
        title: '🍲 心齋橋享用丼飯晚餐',
        description: '在心齋橋商圈品嚐香氣濃郁的日式丼飯，享受美味溫暖的大阪第一夜晚餐。',
        category: 'food',
        icon: 'UtensilsCrossed',
        cost: '約 ¥1,500 / 人',
        mustTry: '日式特選燒肉丼、海鮮丼或炸蝦天丼'
      },
      {
        id: 'd1-8',
        time: '19:30 - 21:00',
        title: '🛍️ 心齋橋筋商店街漫步採買（後半）',
        description: '繼續漫步採買未逛完的店家，選購人氣伴手禮、藥妝與服飾。',
        category: 'shopping',
        icon: 'ShoppingCart',
        elderTips: '採買休足時間，今晚洗完澡幫大家貼上舒緩雙腿！'
      },
      {
        id: 'd1-9',
        time: '21:00~',
        title: '🌙 漫步返回飯店休息放鬆',
        description: '提著戰利品悠閒步行返回飯店，享受舒適熱水澡，為明天的宇治與任天堂博物館養精蓄銳。',
        category: 'hotel',
        icon: 'Moon'
      }
    ]
  },
  {
    dayNumber: 2,
    dateStr: '2026/10/09',
    weekday: '週五 (Fri)',
    title: '京都宇治茶香・沉浸任天堂博物館',
    subtitle: '宇治抹茶香 ➔ 世界遺產平等院 ➔ 任天堂官方博物館朝聖深度暢玩',
    weatherSummary: '☀️ 京都天氣晴朗舒適 16°C ~ 23°C，古都漫步極佳好天氣',
    transportPass: '大阪地鐵 / 京阪本線 / JR 奈良線',
    tags: ['宇治', '平等院', '抹茶拿鐵', 'NintendoMuseum', '任天堂博物館'],
    albumUrl: 'https://photos.app.goo.gl/ndwb8ckgNhVuNw7j9',
    itemsPlanA: [
      {
        id: 'd2-1',
        time: '08:00 - 09:00',
        title: '🍔 早餐享用摩斯漢堡',
        description: '早晨享用新鮮現做的摩斯漢堡元氣早餐與熱飲，補足活力。',
        category: 'food',
        icon: 'Coffee',
        cost: '約 ¥700 / 人'
      },
      {
        id: 'd2-2',
        time: '09:15 - 10:32',
        title: '🚆 出發前往宇治（10:32 抵達宇治）',
        description: '搭乘電車一路前往京都茶鄉宇治，沿途欣賞秋日關西田園與古都風光，於 10:32 順利抵達宇治。',
        category: 'transport',
        icon: 'Train',
        transitInfo: '車程約 1 小時 15 分，座位寬敞舒適'
      },
      {
        id: 'd2-3',
        time: '10:45 - 11:00',
        title: '🍵 抵達平等院表參道，品嚐抹茶拿鐵',
        description: '漫步古色古香的平等院表參道，品味現刷濃醇的宇治抹茶拿鐵，茶香四溢。',
        category: 'food',
        icon: 'Coffee',
        cost: '約 ¥650 / 人',
        mustTry: '現刷宇治抹茶拿鐵、抹茶冰淇淋',
        romanticNote: '飄著焙茶香氣的宇治街頭，牽著妳的手一起喝抹茶拿鐵，時間彷彿都為我們放慢了腳步。'
      },
      {
        id: 'd2-4',
        time: '11:00 - 13:00',
        title: '⛩️ 世界遺產 平等院（鳳凰堂 & 鳳翔館）參觀',
        description: '參觀日本十圓硬幣與萬元紙鈔上的國寶「平等院鳳凰堂」，欣賞映照在阿字池上的絕美倒影，並入館參觀鳳翔館珍貴歷史文物。',
        category: 'attraction',
        icon: 'Landmark',
        mustTry: '拿 10 圓硬幣與鳳凰堂合影、鳳翔館雲中供養菩薩',
        image: './images/byodoin-phoenix-hall.jpg',
        imageCaption: '📸 承哲 & Iris 在平等院鳳凰堂前甜蜜合影',
        romanticNote: '晴朗藍天下的鳳凰堂阿字池畔，牽著妳的手留下這張合照，陽光灑在妳臉上的笑容，是我心中最珍貴的風景。',
        elderTips: '園區步道平緩好走，池畔微風徐徐，適時坐在長椅休息賞景。'
      },
      {
        id: 'd2-5',
        time: '13:00 - 14:15',
        title: '🍛 表參道享用咖哩飯午餐',
        description: '在表參道特色餐廳享用香醇可口的日式咖哩飯定食，稍作休息補足能量。',
        category: 'food',
        icon: 'UtensilsCrossed',
        cost: '約 ¥1,300 / 人',
        mustTry: '宇治特製抹茶咖哩、日式牛肉咖哩定食'
      },
      {
        id: 'd2-6',
        time: '14:30 - 15:45',
        title: '☕ 前往小倉站附近咖啡廳享用下午茶',
        description: '移動至小倉站周邊日系咖啡廳，品嚐甜點與香醇咖啡/茶飲，手機充飽電，悠閒等待任天堂博物館預約入場。',
        category: 'food',
        icon: 'Coffee',
        cost: '約 ¥1,000 / 人',
        elderTips: '咖啡廳內有舒適軟座，讓大家放鬆雙腿充電。'
      },
      {
        id: 'd2-7',
        time: '16:00 - 19:00',
        title: '🎮 任天堂博物館 (Nintendo Museum) 深度暢玩 & 紀念品採買',
        description: '進入由任天堂宇治小倉工廠改建的夢幻殿堂！巨大手把雙人合作遊戲、光線槍射擊、歷代主機遊戲展覽，並於官方旗艦店採買限定紀念品。',
        category: 'activity',
        icon: 'Gamepad2',
        mustTry: '雙人巨大控制器挑戰、專屬特製硬幣互動卡、官方限定紀念周邊',
        image: './images/nintendo-museum-giant-controller.jpg',
        imageCaption: '🎮 承哲 & Iris 雙人合力挑戰巨大紅白機手把！',
        romanticNote: '兩個人一起手忙腳亂拍打巨大紅白機手把，看妳笑到眼淚都流出來，那是我好久沒有過的單純快樂。',
        elderTips: '館內全無障礙設計，動線平坦寬敞，可輕鬆悠閒參觀拍照。'
      },
      {
        id: 'd2-8',
        time: '19:40 - 20:45',
        title: '🥟 享用中華料理晚餐',
        description: '在周邊餐廳享用溫暖美味的中華料理，熱騰騰的炒菜、煎餃與湯品讓人身心溫暖。',
        category: 'food',
        icon: 'Utensils',
        cost: '約 ¥1,800 / 人'
      },
      {
        id: 'd2-9',
        time: '20:54 - 22:42',
        title: '🌙 從 JR 小倉站搭車返程，返抵飯店休息',
        description: '搭乘 20:54 班車啟程返回大阪市區，於 22:42 平安返抵心齋橋飯店休息，結束充實美好的一天。',
        category: 'transport',
        icon: 'Moon',
        transitInfo: '由 JR 小倉站出發轉乘返回心齋橋飯店'
      }
    ]
  },
  {
    dayNumber: 3,
    dateStr: '2026/10/10',
    weekday: '週六 (Sat)',
    title: '海之京都・天橋立與伊根舟屋',
    subtitle: '天橋立飛龍觀 ➔ 舟屋海上遊覽船 ➔ 智恩寺旋轉橋 ➔ 心齋橋購物',
    weatherSummary: '🌊 日本海沿岸 15°C ~ 21°C，海風徐徐，建議準備薄外套與防風帽',
    transportPass: '專車一日遊（免轉車全程舒適接送）',
    tags: ['天橋立', '伊根舟屋', '飛龍觀', '智恩寺', '旋轉橋', '海之京都'],
    albumUrl: 'https://photos.app.goo.gl/epxWcGQwhSgwaqgs6',
    itemsPlanA: [
      {
        id: 'd3-1',
        time: '07:15~',
        title: '🚌 前往道頓堀東側蟹道樂東門集合出發',
        description: '早上集合於「道頓堀東側蟹道樂東門」集合點，搭乘冷暖氣專車出發前往海之京都。',
        category: 'transport',
        icon: 'Bus',
        elderTips: '專車一路直達丹後，車上可安心補眠，中途停靠休息站上洗手間。'
      },
      {
        id: 'd3-2',
        time: '10:24 - 11:30',
        title: '🚠 天橋立纜車 & 飛龍觀展望台',
        description: '搭乘景觀纜車登頂，俯瞰日本三景之一「天橋立」，體驗經典倒立「胯下窺看 (股のぞき)」如飛龍在天的壯觀景象。',
        category: 'attraction',
        icon: 'Mountain',
        mustTry: '展望台胯下窺看留影、智惠之圈投擲瓦片祈福',
        image: './images/amanohashidate-viewland.jpg',
        imageCaption: '📸 承哲 & Iris 在天橋立飛龍觀展望台甜蜜合影',
        romanticNote: '登上海拔展望台俯瞰日本三景，蔚藍海灣在陽光下閃爍，但最讓我心動的，是身邊比晴空還要燦爛耀眼的妳。',
        elderTips: '纜車有封閉式大車廂與單人吊椅，搭大車廂平穩安全、視野開闊。'
      },
      {
        id: 'd3-3',
        time: '11:30 - 12:30',
        title: '🍱 天橋立海鮮海味御膳午餐',
        description: '品嚐日本海直送當季新鮮海味御膳，享用鮮甜海鮮、烤魚與特色日式小菜。',
        category: 'food',
        icon: 'UtensilsCrossed',
        cost: '約 ¥2,000 / 人',
        mustTry: '丹後海鮮御膳、鮮烤魚乾'
      },
      {
        id: 'd3-4',
        time: '12:36 - 12:56',
        title: '🚢 伊根搭乘觀光遊覽船',
        description: '登上遊覽船環繞世界唯一水上聚落「伊根舟屋」，手拿蝦味先吸引滿天海鷗與老鷹盤旋飛舞。',
        category: 'activity',
        icon: 'Ship',
        mustTry: '船上餵海鷗甜蜜合影、欣賞舟屋傳統木造建築群',
        image: './images/ine-bay-cruise.jpg',
        imageCaption: '🚢 承哲 & Iris 在伊根觀光遊覽船上海景合影',
        romanticNote: '在微涼的海風中，妳拿著蝦味先餵海鷗笑得像個小女孩，依偎在我身邊的妳，就是海天一色裡最美的風景。',
        elderTips: '遊覽船行駛平穩，坐在船艙內也能透過全景大窗欣賞美景。'
      },
      {
        id: 'd3-5',
        time: '13:24 - 14:12',
        title: '🏡 伊根舟屋散策',
        description: '漫步於寧靜純樸的伊根舟屋水上小鎮，穿梭在百年木造漁村街道，感受宛如世外桃源的靜謐氛圍。',
        category: 'attraction',
        icon: 'Sparkles',
        mustTry: '舟屋街景合影、伊根特色手作小店'
      },
      {
        id: 'd3-6',
        time: '14:54 - 15:47',
        title: '⛩️ 智恩寺參拜 & 旋轉橋 & 天橋立沙洲漫步',
        description: '參拜文殊菩薩祈求智慧與平安，求取招牌扇子籤；接著觀看供船隻通行的「迴旋橋（旋轉橋）」特殊開合運作，漫步松林沙洲。',
        category: 'attraction',
        icon: 'Landmark',
        mustTry: '智恩寺扇子籤、旋轉橋開合奇景、天橋立白砂青松',
        image: './images/amanohashidate-rotating-bridge.jpg',
        imageCaption: '🌉 承哲 & Iris 在天橋立迴旋橋（旋轉橋）前留影',
        romanticNote: '微風輕拂水道旁的翠綠松林，倚在橋欄上和妳並肩合照，好希望這段平靜悠閒的美好時光能永遠停留。',
        elderTips: '智恩寺周邊道路平坦，可品嚐知名的「智惠之餅」紅豆麻糬。'
      },
      {
        id: 'd3-7',
        time: '15:50 - 19:07',
        title: '🚌 啟程返回大阪市區，返抵道頓堀',
        description: '搭乘專車踏上返程，全家在車上休息小憩，於 19:07 順利返抵大阪道頓堀市區。',
        category: 'transport',
        icon: 'Bus'
      },
      {
        id: 'd3-8',
        time: '19:30 - 21:00',
        title: '🍲 千日周邊享用晚餐',
        description: '在千日前周邊商圈享用道地美味晚餐，品嚐大阪特色美食或溫暖鍋物料理。',
        category: 'food',
        icon: 'Utensils',
        cost: '約 ¥2,000 / 人'
      },
      {
        id: 'd3-9',
        time: '21:00 - 22:30',
        title: '🛍️ 心齋橋購物採買',
        description: '把握晚間熱鬧時光，在心齋橋商圈補貨人氣伴手禮、藥妝與生活用品。',
        category: 'shopping',
        icon: 'ShoppingCart'
      },
      {
        id: 'd3-10',
        time: '22:30~',
        title: '🌙 抵達飯店休息放鬆',
        description: '步行返抵飯店享受舒緩熱水澡，整理今日拍下的絕美海景照片，安歇就寢。',
        category: 'hotel',
        icon: 'Moon'
      }
    ]
  },
  {
    dayNumber: 4,
    dateStr: '2026/10/11',
    weekday: '週日 (Sun)',
    title: '滋賀絕景・琵琶湖與童話草屋',
    subtitle: '湖中鳥居 ➔ 琵琶湖山谷 ➔ 滿月寺浮禦堂 ➔ 童話草屋美照與挑選明日早餐',
    weatherSummary: '🏞️ 滋賀湖畔 15°C ~ 22°C，山頂展望台風大微涼，建議攜帶保暖防風外套',
    transportPass: '專車一日遊',
    tags: ['白鬚神社', '琵琶湖山谷', 'BiwakoTerrace', '浮禦堂', 'LaCollina', '滋賀'],
    albumUrl: 'https://photos.app.goo.gl/tpNSm4HxN4xLWp6k9',
    itemsPlanA: [
      {
        id: 'd4-1',
        time: '08:00~',
        title: '🚌 道頓堀東側蟹道樂東門集合出發',
        description: '早上 08:00 於道頓堀集合點搭乘舒適專車出發，行經高速公路前往滋賀琵琶湖。',
        category: 'transport',
        icon: 'Bus',
        elderTips: '專車舒適平穩，在車上可輕鬆補眠賞景。'
      },
      {
        id: 'd4-2',
        time: '11:00 - 11:30',
        title: '⛩️ 白鬚神社 湖中鳥居參拜',
        description: '朝聖擁有兩千年歷史的近江最古老神社，站在專屬觀景平台拍下佇立琵琶湖中的朱紅大鳥居，祈求長壽與勝運。',
        category: 'attraction',
        icon: 'Camera',
        mustTry: '湖中鳥居絕美合影、白鬚延壽御守',
        image: './images/shirahige-jinja-torii.jpg',
        imageCaption: '⛩️ 承哲 & Iris 在白鬚神社觀景台合影湖中鳥居',
        romanticNote: '站在平台上看著佇立琵琶湖中的朱紅鳥居，看妳開心地指著鳥居拍照，我悄悄在心中向神明祈願：保佑我身邊的女孩永遠健康幸福。',
        elderTips: '請於「藍湖白鬚台」專屬觀景台拍照，切勿橫越馬路，安全第一。'
      },
      {
        id: 'd4-3',
        time: '12:00 - 13:40',
        title: '🚠 琵琶湖山谷 (Biwako Terrace)',
        description: '搭乘日本最速全景高空纜車直達海拔 1,100 公尺的 Biwako Terrace，俯瞰宛如大海般無邊際的蔚藍湖景並享用午餐。',
        category: 'attraction',
        icon: 'Mountain',
        mustTry: '無邊際水池露台俯瞰琵琶湖全景、藍色琵琶湖特調蘇打',
        image: './images/biwako-valley-terrace.jpg',
        imageCaption: '🚠 承哲 & Iris 在琵琶湖山谷 1,100m 觀景台合影',
        romanticNote: '站在 1,100 公尺的山頂露台俯瞰整片蔚藍的琵琶湖，想把全世界的遼闊與溫柔，通通擁抱給身旁的妳。'
      },
      {
        id: 'd4-4',
        time: '14:54 - 15:27',
        title: '🌊 滿月寺浮禦堂（近江八景「堅田落雁」）',
        description: '造訪建於琵琶湖上的朱紅浮橋古剎，漫步湖中棧道長廊，感受近江八景「堅田落雁」的詩意與禪境。',
        category: 'attraction',
        icon: 'Landmark',
        mustTry: '浮禦堂湖中全景、近江八景石碑打卡',
        image: './images/mangetsu-temple-ukimido.jpg',
        imageCaption: '🌊 承哲 & Iris 在滿月寺浮禦堂前牽手深情相望',
        romanticNote: '波光粼粼的琵琶湖畔，牽著妳的手回頭相視而笑，在這座浮於水上的古寺前，我只想這樣一直牽著妳，走到很遠很遠的以後。'
      },
      {
        id: 'd4-5',
        time: '16:44 - 17:45',
        title: '🏡 童話草屋美照散策 & 挑選明日早餐 (La Collina 近江八幡)',
        description: '走進建築大師藤森照信打造的童話草屋（La Collina 近江八幡），宛如置身吉卜力奇幻童話國度！在綠意盎然的草屋迴廊拍下仙氣滿滿的美照，並為明日一早的環球影城大冒險挑選美味早餐與人氣點心。',
        category: 'attraction',
        icon: 'Sparkles',
        mustTry: '童話草屋綠意迴廊合照留念、挑選明日早餐與人氣點心',
        image: './images/la-collina-fairy-tale-grass-house.jpg',
        imageCaption: '🏡 承哲 & Iris 在吉卜力童話草屋前合影',
        romanticNote: '走在綠意盎然的童話草屋前幫妳拍美照、一起挑選明天去環球影城的美味早餐，只要身邊是妳，處處都是最動人的風景。'
      },
      {
        id: 'd4-6',
        time: '17:45 - 20:27',
        title: '🚌 專車啟程返程，返抵道頓堀',
        description: '專車啟程返回大阪市中心，車程約 2.5 小時，兩人舒適休息補眠，於 20:27 平安抵達集合點。',
        category: 'transport',
        icon: 'Bus'
      },
      {
        id: 'd4-7',
        time: '20:30 - 21:20',
        title: '🍲 YAYOI 軒享用晚餐',
        description: '在道頓堀周邊的 YAYOI 軒（彌生軒）享用溫暖豐盛的日式定食，白飯與熱湯暖胃飽足。',
        category: 'food',
        icon: 'UtensilsCrossed',
        cost: '約 ¥1,200 / 人',
        mustTry: '日式生薑燒肉定食、炸豬排定食'
      },
      {
        id: 'd4-8',
        time: '21:34~',
        title: '🌙 返抵飯店休息放鬆',
        description: '步行返抵心齋橋喜來登福朋快捷酒店，整理今日照片與戰利品，準備迎接明日的日本環球影城冒險！',
        category: 'hotel',
        icon: 'Moon'
      }
    ]
  },
  {
    dayNumber: 5,
    dateStr: '2026/10/12',
    weekday: '週一 (Mon)',
    title: '日本環球影城 USJ・奇幻冒險全日遊',
    subtitle: '哈利波特禁忌之旅 ➔ 瑪利歐園區 ➔ 芙莉蓮主題慶生 ➔ 萬聖節殭屍派對',
    weatherSummary: '🎡 大阪市區 17°C ~ 24°C，白天晴朗溫和，晚間微涼',
    transportPass: 'JR 夢咲線 / 大阪地鐵',
    tags: ['USJ', '超級任天堂世界', '哈利波特', '芙莉蓮', '萬聖節', '環球影城'],
    albumUrl: 'https://photos.app.goo.gl/y4n4a5c7AV64Bx2a6',
    itemsPlanA: [
      {
        id: 'd5-1',
        time: '08:17',
        title: '🎢 抵達日本環球影城',
        description: '準時抵達日本環球影城 (USJ) 大門，準備開啟奇幻精彩的一整天冒險之旅。',
        category: 'activity',
        icon: 'Sparkles',
        image: './images/usj-main-gate-entrance.jpg',
        imageCaption: '🎢 承哲 & Iris 在日本環球影城經典大門拱門前打卡！',
        romanticNote: '站在期待已久的環球影城大門前，陽光燦爛，牽起妳的手，一整天專屬於我們的奇幻冒險正式啟航！'
      },
      {
        id: 'd5-2',
        time: '08:40 - 09:10',
        title: '🏰 進入活米村 ➔ 揮舞魔杖遊玩 ＆ 08:52 體驗哈利波特禁忌之旅',
        description: '開園直奔活米村！拿著專屬互動魔杖在各個魔法景點與櫥窗施法遊玩，並於 08:52 順利體驗經典設施「哈利波特禁忌之旅」，騎乘飛天掃帚穿梭於霍格華茲城堡上空。',
        category: 'activity',
        icon: 'Wand2',
        mustTry: '揮舞互動魔杖施法遊玩、霍格華茲城堡合影、禁忌之旅沉浸飛行',
        romanticNote: '看著妳認真揮舞魔杖施法的可愛模樣，我心裡悄悄許願：未來的每一個魔法瞬間，我都想陪在妳身邊。'
      },
      {
        id: 'd5-3',
        time: '09:13 - 10:00',
        title: '🍄 超級任天堂世界 (瑪利歐園區)',
        description: '進入由水管連接的繽紛瑪利歐王國！敲擊問號磚塊積點、與角色合影，感受滿滿任天堂童年情懷。',
        category: 'activity',
        icon: 'Gamepad2',
        mustTry: '能量手環互動敲磚、奇諾比奧問號方塊',
        image: './images/usj-mario-world-pipe-entrance.jpg',
        images: [
          './images/usj-mario-world-pipe-entrance.jpg',
          './images/usj-mario-world-peach-castle.jpg',
          './images/usj-mario-world.jpg'
        ],
        imageCaption: '🍄 承哲 & Iris 瑪利歐世界冒險合集（共 3 張，可左右切換）',
        romanticNote: '戴著能量手環跟妳在繽紛童話般的瑪利歐世界到處敲磚塊積點，看到妳開懷大笑的模樣，就是我最想守護的寶藏。'
      },
      {
        id: 'd5-4',
        time: '10:30 - 11:00',
        title: '🍌 小小兵瘋狂乘車遊',
        description: '走進小小兵樂園，坐上格魯發明的特製飛車體驗變身小小兵的歡樂搞笑大冒險！',
        category: 'activity',
        icon: 'Smile'
      },
      {
        id: 'd5-5',
        time: '11:00 - 11:30',
        title: '🧟 《Resident Evil Requiem》深淵絕境 看里昂',
        description: '體驗惡靈古堡萬聖節限定實境恐怖射擊體驗，近距離看最帥氣的里昂（Leon）對決喪屍！雖然現場非常可怕，但有承哲在身邊牽著手保護妳，安心沉浸破關！',
        category: 'activity',
        icon: 'Skull',
        mustTry: '與帥氣里昂並肩作戰、沉浸式惡靈古堡逃脫',
        romanticNote: '雖然現場真的很可怕，但感受到妳緊緊抓著我手臂的那一刻，我就知道——這輩子不管遇到什麼，我都會永遠保護妳！'
      },
      {
        id: 'd5-6',
        time: '11:32 - 12:50',
        title: '🎂 芙莉蓮餐廳慶生用餐',
        description: '在聯名主題餐廳享用精緻魔法料理，為壽星彥伃慶生！在滿滿芙莉蓮奇幻氛圍中度過甜蜜浪漫的午餐時光。',
        category: 'food',
        icon: 'UtensilsCrossed',
        cost: '約 ¥2,500 / 人',
        mustTry: '芙莉蓮主題魔法餐點、藍月草特調飲品'
      },
      {
        id: 'd5-7',
        time: '13:00 - 13:50',
        title: '🎉 欣賞大街花車遊行 & 逛伴手禮店',
        description: '在影城大道欣賞熱鬧非凡的花車大遊行，跟著角色們歡呼起舞，並於周邊商店採買人氣紀念品。',
        category: 'activity',
        icon: 'Sparkles'
      },
      {
        id: 'd5-8',
        time: '14:00 - 14:30',
        title: '🧝 芙莉蓮故事徒步之旅',
        description: '走進欣梅爾與芙莉蓮的冒險回憶徒步展覽，沉浸於勇者小隊溫暖動人的足跡之中。',
        category: 'attraction',
        icon: 'Wand2',
        mustTry: '欣梅爾銅像打卡合影、魔導書紀念品'
      },
      {
        id: 'd5-9',
        time: '14:30 - 14:50',
        title: '👻 貞子的詛咒～黑暗驚悚乘車遊～',
        description: '體驗萬聖節限定黑暗驚悚設施，在全黑的軌道中感受貞子詛咒的尖叫與驚險快感！',
        category: 'activity',
        icon: 'Ghost'
      },
      {
        id: 'd5-10',
        time: '14:52 - 15:00',
        title: '🥖 點心時光：里昂的吉拿棒',
        description: '品嚐熱騰騰酥脆的《惡靈古堡》里昂聯名特色吉拿棒，邊吃邊稍作休息。',
        category: 'food',
        icon: 'Utensils',
        cost: '約 ¥750'
      },
      {
        id: 'd5-11',
        time: '15:00 - 15:30',
        title: '🏭 挑戰殭屍工廠',
        description: '挑戰萬聖節驚悚主題迷宮「殭屍工廠」，尖叫聲此起彼落！雖然這項特別可怕，但有承哲在身邊緊緊牽著妳保護妳，勇敢闖關！',
        category: 'activity',
        icon: 'Skull',
        mustTry: '恐怖殭屍工廠突圍、男友力爆發隨身守護'
      },
      {
        id: 'd5-12',
        time: '15:30 - 16:50',
        title: '🎢 好萊塢美夢乘車遊',
        description: '伴隨座椅高音質音樂在天空中高速翱翔俯衝，極度暢快的雲霄飛車體驗！',
        category: 'activity',
        icon: 'Sparkles',
        mustTry: '選播聯名主題音樂在空中飛翔'
      },
      {
        id: 'd5-13',
        time: '16:51 - 17:35',
        title: '🍌 小小兵瘋狂任務～成為大壞蛋之路～',
        description: '走上動態步道、手持特製電光衝鋒射擊槍，加入小小兵的狂歡惡作劇測試，享受歡笑不斷的可愛射擊互動！',
        category: 'activity',
        icon: 'Smile',
        mustTry: '手持發光射擊槍瞄準靶心得分、趣味惡作劇互動',
        image: './images/usj-minion-villain-con.jpg',
        imageCaption: '🍌 承哲 & Iris 手持特製衝鋒槍挑戰成為大壞蛋！',
        romanticNote: '拿著發光衝鋒槍一起認真瞄準靶心，看妳玩得那麼投入可愛，無論妳當大壞蛋還是小可愛，我都是妳最死忠的夥伴！'
      },
      {
        id: 'd5-14',
        time: '17:40 - 18:40',
        title: '🎃 活米村 三根掃帚餐廳享用萬聖節套餐',
        description: '走進活米村最經典著名的「三根掃帚餐廳 (Three Broomsticks)」，在魔法古老客棧的溫暖氛圍中，享用期間限定的萬聖節特別套餐！',
        category: 'food',
        icon: 'UtensilsCrossed',
        mustTry: '萬聖節限定套餐',
        romanticNote: '走了一整天，在溫暖的客棧裡一起大口吃萬聖節大餐，看著妳吃飽滿足的笑臉，就是最踏實的幸福。'
      },
      {
        id: 'd5-15',
        time: '18:45 - 19:21',
        title: '🪄 活米村 互動魔杖施法 ＆ 霍格華茲城堡夜景煙火合影',
        description: '揮動互動魔杖在活米村的櫥窗施展魔法咒語，並漫步至黑湖橋畔，仰望夜空煙火與流光照耀下的霍格華茲城堡夜景！',
        category: 'activity',
        icon: 'Wand2',
        mustTry: '櫥窗施咒魔法互動、霍格華茲城堡夜景合影',
        image: './images/usj-hogwarts-castle-night-fireworks.jpg',
        imageCaption: '🏰 承哲 & Iris 在璀璨煙火與霍格華茲城堡夜景前合影',
        romanticNote: '夜空煙火綻放、金碧輝煌的魔法城堡在夜色中閃閃發光，牽著妳的手站在橋畔，就像走進了最浪漫的童話電影。'
      },
      {
        id: 'd5-16',
        time: '19:30 - 20:00',
        title: '🦕 侏羅紀公園 夜間乘船遊',
        description: '在夜霧瀰漫的熱帶雨林河流中航行，遭遇巨大暴龍後從 25 公尺高處激流俯衝！',
        category: 'activity',
        icon: 'Ship',
        image: './images/usj-jurassic-park-night.jpg',
        imageCaption: '🦕 承哲 & Iris 在侏羅紀公園探索木屋前合影！',
        romanticNote: '夜幕下的侏羅紀雨林帶著一絲神秘，但只要轉頭看見妳笑瞇瞇比讚的模樣，所有冒險都變成了專屬於我們的浪漫回憶。'
      },
      {
        id: 'd5-17',
        time: '20:00 - 20:55',
        title: '🎃 欣賞萬聖節遊行 & 伴手禮採買',
        description: '夜幕降臨，全園區殭屍傾巢而出！加入熱血沸騰的萬聖節街頭群舞派對，並把握最後機會採購園區限定伴手禮。',
        category: 'activity',
        icon: 'Music',
        mustTry: 'Zombie de Dance 街頭殭屍舞狂歡派對'
      },
      {
        id: 'd5-18',
        time: '21:00 - 21:35',
        title: '🦈 大白鯊～紅色警報～',
        description: '搭乘觀光船巡航，在平靜水域中突遭巨大食人鯊襲擊，體驗震撼的水上爆破與驚險逃脫！',
        category: 'activity',
        icon: 'Ship'
      },
      {
        id: 'd5-19',
        time: '21:37 - 22:23',
        title: '🌙 離開環球影城返回飯店休息',
        description: '滿懷快樂回憶與滿滿戰利品離開環球影城，搭乘電車返回心齋橋，於 22:23 返抵飯店泡澡休息。',
        category: 'transport',
        icon: 'Moon',
        transitInfo: '由 Universal City 站搭乘 JR 轉地鐵回心齋橋',
        image: './images/usj-night-departure-harbor.jpg',
        imageCaption: '🌙 承哲 & Iris 離開環球前在海灣夜景前甜蜜合影',
        romanticNote: '繁星點點的夜空下，環球影城的燈火倒映在波光粼粼的水面。走了一整天雖然有些疲憊，但牽著妳的手依偎在微涼的夜風裡，這份溫暖讓我一輩子都忘不了。'
      }
    ]
  },
  {
    dayNumber: 6,
    dateStr: '2026/10/13',
    weekday: '週二 (Tue)',
    title: '梅田採買・南海特急直達返台',
    subtitle: '心齋橋早餐 ➔ 梅田商圈採買 ➔ Nintendo OSAKA ➔ 南海特急直達關空返台',
    weatherSummary: '🛫 大阪市區 18°C ~ 25°C，滿載回憶與戰利品的美好晴天',
    transportPass: '大阪地鐵 / 南海特急 Rapi:t 直達關西機場',
    tags: ['梅田', 'NintendoOSAKA', '友都八喜', '心齋橋', '南海特急', '台灣虎航'],
    itemsPlanA: [
      {
        id: 'd6-1',
        time: '08:40 - 08:45',
        title: '🏨 飯店辦理退房 (Check-out) 並寄放行李',
        description: '於大阪心齋橋喜來登福朋快捷酒店櫃台辦理退房，並將大件行李寄放於櫃台，輕裝展開最後採買行程。',
        category: 'hotel',
        icon: 'Luggage'
      },
      {
        id: 'd6-2',
        time: '08:45 - 09:56',
        title: '🍳 心齋橋站周邊早餐店享用早餐',
        description: '在心齋橋站周邊人氣早餐店享用溫暖美味的晨間套餐，品嚐香醇咖啡、烤吐司與日式朝食。',
        category: 'food',
        icon: 'Coffee',
        cost: '約 ¥800 / 人'
      },
      {
        id: 'd6-3',
        time: '10:06 - 11:30',
        title: '🛍️ 抵達梅田商圈逛街採買',
        description: '搭乘地鐵御堂筋線抵達梅田商圈，逛大丸百貨、阪急百貨與周邊人氣商場，採買各類日系質感選物。',
        category: 'shopping',
        icon: 'ShoppingBag',
        transitInfo: '心齋橋站搭乘御堂筋線直達梅田站（車程約 10 分鐘）'
      },
      {
        id: 'd6-4',
        time: '11:30 - 13:30',
        title: '🍝 梅田享用義大利麵午餐',
        description: '在梅田百貨商圈餐廳享用精緻現做的義大利麵套餐，搭配熱湯與甜點，享受愜意的午間時光。',
        category: 'food',
        icon: 'UtensilsCrossed',
        cost: '約 ¥1,600 / 人',
        mustTry: '義式海鮮義大利麵、焗烤千層麵'
      },
      {
        id: 'd6-5',
        time: '13:50 - 14:20',
        title: '🎮 大丸梅田 Nintendo OSAKA 任天堂商店採買',
        description: '朝聖位於大丸梅田 13F 的官方旗艦店 Nintendo OSAKA，採購各大人氣角色限定玩偶、文具與聯名周邊！',
        category: 'shopping',
        icon: 'Gamepad2',
        mustTry: 'Nintendo OSAKA 限定周邊、瑪利歐與皮卡丘商品'
      },
      {
        id: 'd6-6',
        time: '14:20 - 15:07',
        title: '🛍️ 友都八喜 (Yodobashi 梅田) 採買',
        description: '前往 Yodobashi Camera 梅田旗艦店，選購各類日本最新家電、美妝儀器、耳機配件與人氣模型玩具。',
        category: 'shopping',
        icon: 'ShoppingCart',
        elderTips: '提醒準備護照辦理 Tax Free 退稅手續。'
      },
      {
        id: 'd6-7',
        time: '15:07 - 15:44',
        title: '🚕 搭車返回飯店領取寄放行李',
        description: '搭乘地鐵御堂筋線返回心齋橋飯店，領取寄放的大件行李並整理隨身戰利品。',
        category: 'transport',
        icon: 'Luggage',
        transitInfo: '梅田站搭乘御堂筋線返回心齋橋站'
      },
      {
        id: 'd6-8',
        time: '15:44 - 16:18',
        title: '🚆 前往難波車站準備轉乘',
        description: '推行李前往南海難波車站，於 16:18 順利抵達車站月台與乘車閘門。',
        category: 'transport',
        icon: 'Train',
        transitInfo: '由心齋橋移動至南海難波站'
      },
      {
        id: 'd6-9',
        time: '17:00 - 17:40',
        title: '🚆 搭乘 17:00 南海特急直達關西機場',
        description: '搭乘 17:00 開出的南海特急 Rapi:t 藍色鐵面騎士列車，舒適對號座直達關西國際機場第一航廈（17:40 抵達）。',
        category: 'transport',
        icon: 'Train',
        cost: '¥1,490 / 人',
        transitInfo: '車程 40 分鐘，大件行李專屬放置區',
        image: './images/nankai-rapit-return-cabin.jpg',
        imageCaption: '🚆 承哲 & Iris 在回程南海特急 Rapi:t 車廂內溫馨合影',
        romanticNote: '望著窗外飛逝的大阪街景，這趟旅程雖然到了尾聲，但我們專屬的冒險才剛開始。下一次，我一定還要和妳兩個人單獨去更多美麗的地方！'
      },
      {
        id: 'd6-10',
        time: '17:50 - 19:00',
        title: '✈️ 機場安檢通關、辦理出境手續 & 免稅店採買',
        description: '辦理台灣虎航 IT213 登機與托運行李手續，順利通過安檢出境，把握登機前最後時光採買 Royce 生巧克力、白色戀人等免稅伴手禮。',
        category: 'flight',
        icon: 'ShoppingBag',
        mustTry: '關空免稅店限定伴手禮、Royce 生巧克力、白色戀人'
      },
      {
        id: 'd6-11',
        time: '22:00~',
        title: '🛬 平安返抵桃園國際機場 (TPE)，結束旅程',
        description: '搭乘 IT213 航班平安返抵桃園第一航廈，提領行李出關，為這趟關西 6 天 5 夜的甜蜜慶生冒險畫下完美句點！',
        category: 'flight',
        icon: 'HeartHandshake',
        mustTry: '全家人滿載而歸的溫馨大合照！'
      }
    ]
  }
]
