import { DailyPlan } from '../types'

export const itineraryData: DailyPlan[] = [
  {
    dayNumber: 1,
    dateStr: '2026/10/08',
    weekday: '週四 (Thu)',
    title: '抵達關西 • 心齋橋秋季漫步',
    subtitle: '啟程啟航 • 初見大阪秋日繁華 • 自嘲熊、西村優志熊貓與 YOSISTAMP 熊熊採購',
    weatherSummary: '🍂 關西初秋 18°C ~ 24°C，微風舒適，建議洋蔥式穿搭',
    transportPass: '南海特急 Rapi:t / 大阪地鐵御堂筋線',
    tags: ['NaganoMarket', '自嘲熊', '西村優志熊貓', 'YOSISTAMP熊熊', '心齋橋', 'PARCO'],
    itemsPlanA: [
      {
        id: 'd1-1',
        time: '04:10',
        title: '抵達桃園機場 (TPE) 辦理報到',
        description: '於第一航廈 (T1) 台灣虎航櫃台辦理報到與行李托運手續。',
        category: 'flight',
        icon: 'PlaneTakeoff',
        elderTips: '提醒大家確認護照效期超過 6 個月，行動電源與鋰電池必須放在隨身行李，切勿托運。',
        mustTry: '出境前全家在虎航候機室合照打卡！',
        transitInfo: '機場捷運或專車接送至 TPE T1'
      },
      {
        id: 'd1-2',
        time: '05:00',
        title: '🍳 機場晨光早餐',
        description: '機場便利商店或機上簡單吃，避免排隊耗時，也讓長輩溫暖開胃。',
        category: 'food',
        icon: 'Utensils',
        cost: '約 NT$ 150 / 人',
        elderTips: '推薦溫熱飲品與熱壓吐司，吃飽好在機上補眠休息。'
      },
      {
        id: 'd1-3',
        time: '06:40',
        title: '🛫 IT210 航班起飛',
        description: '台灣虎航 IT210 準時升空，航程約 2.5 小時，直飛關西國際機場。',
        category: 'flight',
        icon: 'Plane',
        transitInfo: '座位 28A/B (靠窗甜蜜視野)'
      },
      {
        id: 'd1-4',
        time: '10:25',
        title: '🛬 降落關西機場 (KIX) & 入境',
        description: '抵達關西第一航廈 (T1)，出示 Visit Japan Web QR Code 快速通關與提領行李。',
        category: 'flight',
        icon: 'PlaneLanding',
        elderTips: '提領行李後先在入境大廳洗手間稍微整理，填裝保溫瓶溫水。'
      },
      {
        id: 'd1-5',
        time: '11:35',
        title: '搭乘 南海特急 Rapi:t 直達難波',
        description: '搭乘帥氣鐵面騎士特急 Rapi:t，全車對號座，舒適直達難波站。',
        category: 'transport',
        icon: 'Train',
        cost: '¥1,490 / 人',
        transitInfo: '車程約 45 分鐘，大件行李有專屬置物鎖'
      },
      {
        id: 'd1-6',
        time: '12:20',
        title: '難波轉乘御堂筋線至「心齋橋站」',
        description: '轉乘 1 站地鐵直達心齋橋，出站走地下通道前往飯店。',
        category: 'transport',
        icon: 'Subway',
        cost: '¥190 / 人',
        transitInfo: '車程約 5 分鐘'
      },
      {
        id: 'd1-7',
        time: '13:00',
        title: '🏨 抵達飯店寄放行李',
        description: '前往 Four Points Express by Sheraton Osaka Shinsaibashi 寄放行李，輕裝出發。',
        category: 'hotel',
        icon: 'Hotel',
        elderTips: '先在飯店大廳沙發稍作休息，喝口水再漫步出門吃午餐。'
      },
      {
        id: 'd1-8',
        time: '13:30',
        title: '🍲 接風午餐：大丸百貨 / 高島屋美食街',
        description: '選擇舒適入座的高品質美食街或連鎖日式定食，避開街邊排隊日曬。',
        category: 'food',
        icon: 'UtensilsCrossed',
        cost: '約 ¥1,500 / 人',
        mustTry: '日式鰻魚定食、炸豬排定食、天婦羅蕎麥麵'
      },
      {
        id: 'd1-9',
        time: '15:00',
        title: '🛍️ 心齋橋 PARCO 6F：Nagano Market 自嘲熊大採購',
        description: '朝聖官方 Nagano Market！滿滿的自嘲熊 (ナガノのくま / Joke Bear) 限定玩偶、吊飾與周邊，彥伃最愛的專屬第一站！',
        category: 'shopping',
        icon: 'ShoppingBag',
        cost: '約 ¥5,000',
        mustTry: '自嘲熊大阪限定章魚燒吊飾、Nagano 造型玩偶與壓克力立牌'
      },
      {
        id: 'd1-10',
        time: '16:30',
        title: '心齋橋搭乘御堂筋線前往梅田',
        description: '前往大阪交通樞紐梅田商圈，感受現代都會氣息。',
        category: 'transport',
        icon: 'Subway',
        cost: '¥240 / 人',
        transitInfo: '車程約 15 分鐘'
      },
      {
        id: 'd1-11',
        time: '17:00',
        title: '🛍️ 梅田阪急三番街 Kiddy Land / Loft：西村優志熊貓 & YOSISTAMP 熊熊採買',
        description: '朝聖西村優志 (ごきげんぱんだ / 好心情熊貓) 專區與 YOSISTAMP (呦嘻百分百 / 熊熊 Kuma 100%) 專屬專櫃，還有超多可愛扭蛋與盲盒！',
        category: 'shopping',
        icon: 'Sparkles',
        cost: '約 ¥5,000',
        mustTry: '西村優志ごきげんぱんだ玩偶、YOSISTAMP 熊熊限定周邊、文具貼紙'
      },
      {
        id: 'd1-12',
        time: '18:30',
        title: '🥩 晚餐推薦：梅田景觀餐廳 / 心齋橋預約燒肉',
        description: '預先訂位免等候，享受高檔黑毛和牛燒肉，為第一天畫下完美句點。',
        category: 'food',
        icon: 'Flame',
        cost: '約 ¥2,500 / 人',
        mustTry: '特選牛舌、特級牛五花、石鍋拌飯'
      },
      {
        id: 'd1-13',
        time: '20:00',
        title: '搭乘御堂筋線返回難波 / 道頓堀',
        description: '回到熱鬧的道頓堀拍固力果跑跑人招牌夜景。',
        category: 'attraction',
        icon: 'Camera',
        mustTry: '道頓堀固力果跑跑人經典打卡合照'
      },
      {
        id: 'd1-14',
        time: '20:30',
        title: '🛍️ 唐吉訶德 (道頓堀店) 補給採買',
        description: '採買休足時間、眼罩、礦泉水、水果與生活用品。',
        category: 'shopping',
        icon: 'ShoppingCart',
        cost: '約 ¥3,000',
        elderTips: '買好休足時間，今晚洗完澡幫大家貼上舒緩腿部！'
      }
    ]
  },
  {
    dayNumber: 2,
    dateStr: '2026/10/09',
    weekday: '週五 (Fri)',
    title: '京都宇治 • 沉浸任天堂博物館',
    subtitle: '千本鳥居晨光 • 宇治抹茶香 • 任天堂官方博物館朝聖',
    weatherSummary: '🍁 京都秋高氣爽 16°C ~ 23°C，古都漫步極佳好天氣',
    transportPass: '大阪地鐵御堂筋線 / 京阪本線 / 近鐵京都線',
    tags: ['NintendoMuseum', 'Uji', 'Matcha', '伏見稻荷', '千本鳥居'],
    itemsPlanA: [
      {
        id: 'd2-1',
        time: '07:30',
        title: '🍳 晨間元氣早餐',
        description: '飯店早餐或前晚買好的超商日式優格、明太子飯糰。',
        category: 'food',
        icon: 'Utensils',
        cost: '約 ¥800 / 人'
      },
      {
        id: 'd2-2',
        time: '08:45',
        title: '心齋橋出發前往京都伏見稻荷',
        description: '心齋橋 ➔ [御堂筋線] ➔ 淀屋橋 ➔ [京阪本線特急] ➔ 伏見稻荷站。',
        category: 'transport',
        icon: 'Train',
        cost: '約 ¥600 / 人',
        transitInfo: '車程約 1 小時 15 分，特急列車座位寬敞舒適'
      },
      {
        id: 'd2-3',
        time: '10:00',
        title: '⛩️ 伏見稻荷大社 & 漫步千本鳥居',
        description: '漫步千本鳥居祈求全家平安與心想事成，造訪參道古風特色店家與狐狸繪馬許願。',
        category: 'attraction',
        icon: 'Sparkles',
        cost: '參拜免費 (繪馬約 ¥800)',
        mustTry: '伏見狐狸造型繪馬、參道現烤糰子、千本鳥居合照',
        elderTips: '鳥居前段平緩好走，拍照在前半段取景即可，不需攀爬全山以保留長輩體力。'
      },
      {
        id: 'd2-4',
        time: '12:00',
        title: '🍜 午餐推薦：狐狸豆皮烏龍麵 / 老字號鰻魚飯',
        description: '造訪參道老字號「祢ざめ家 (Nezameya)」品嚐炭烤鰻魚飯與金黃狐狸豆皮烏龍麵。',
        category: 'food',
        icon: 'Utensils',
        cost: '約 ¥2,000 / 人',
        mustTry: '甜嫩入味的豆皮烏龍麵、香烤鰻魚飯'
      },
      {
        id: 'd2-5',
        time: '13:30',
        title: '搭乘京阪線轉近鐵前往小倉站',
        description: '伏見稻荷搭乘京阪線至丹波橋，同站轉乘近鐵京都線至「小倉站」。',
        category: 'transport',
        icon: 'Subway',
        cost: '¥320 / 人',
        transitInfo: '車程約 40 分鐘'
      },
      {
        id: 'd2-6',
        time: '14:30',
        title: '☕ 小倉站周邊日系咖啡廳歇腿',
        description: '悠閒喝宇治茶、品嚐抹茶點心，手機充飽電，等待預約時段入場。',
        category: 'food',
        icon: 'Coffee',
        cost: '約 ¥1,000 / 人',
        elderTips: '咖啡廳內有舒適軟座，讓長輩放鬆雙腿充電。'
      },
      {
        id: 'd2-7',
        time: '15:50',
        title: '🎮 任天堂博物館 (Nintendo Museum) 沉浸體驗',
        description: '進入由任天堂宇治小倉工廠改建的夢幻殿堂！巨大紅白機手把雙人合作、光線槍靶場、沉浸式歷史硬體展覽。',
        category: 'activity',
        icon: 'Gamepad2',
        cost: '門票 ¥3,300 / 人',
        mustTry: '雙人巨大控制器挑戰、專屬特製硬幣互動卡、官方紀念品旗艦店限定周邊',
        elderTips: '館內全無障礙設計，動線平坦寬敞，長輩可輕鬆參觀拍照。'
      },
      {
        id: 'd2-8',
        time: '18:00',
        title: '🍔 晚餐：館內餐廳「HATENA BURGER」',
        description: '在任天堂園區內享用自訂專屬主題漢堡，搭配京都特色飲品。',
        category: 'food',
        icon: 'UtensilsCrossed',
        cost: '約 ¥2,500 / 人',
        mustTry: '問號方塊漢堡、京都宇治焙茶特調'
      },
      {
        id: 'd2-9',
        time: '20:00',
        title: '搭乘電車返回大阪心齋橋',
        description: '近鐵小倉站 ➔ 丹波橋 ➔ 淀屋橋 ➔ 心齋橋。',
        category: 'transport',
        icon: 'Train',
        cost: '約 ¥750 / 人',
        transitInfo: '約 1 小時 20 分車程'
      },
      {
        id: 'd2-10',
        time: '21:30',
        title: '返抵心齋橋飯店休息',
        description: '享受熱水澡，整理今日戰利品，準備明日海之京都一日遊。',
        category: 'hotel',
        icon: 'Moon'
      }
    ]
  },
  {
    dayNumber: 3,
    dateStr: '2026/10/10',
    weekday: '週六 (Sat)',
    title: '海之京都 • KKday 丹後巡禮一日遊',
    subtitle: '天橋立飛龍觀 • 伊根舟屋餵海鷗 • 丹後海上夢幻鐵道',
    weatherSummary: '🌊 日本海沿岸 15°C ~ 21°C，海風微涼，請準備薄外套與防風帽',
    transportPass: 'KKday 專車一日遊（免轉車全程舒適接送）',
    tags: ['TangoRailway', 'IneBoat', 'Amanohashidate', 'KKday', '海之京都'],
    itemsPlanA: [
      {
        id: 'd3-1',
        time: '06:30',
        title: '🍳 晨間快速活力早餐',
        description: '前晚超商準備之御飯糰、三明治或麵包配熱茶。',
        category: 'food',
        icon: 'Utensils',
        cost: '約 ¥600 / 人'
      },
      {
        id: 'd3-2',
        time: '07:15',
        title: '🚌 日本橋集合出發（KKday 舒適專車）',
        description: '於「日本橋螃蟹道樂東大門」集合點上車，搭乘冷暖氣專車出發。',
        category: 'transport',
        icon: 'Bus',
        elderTips: '專車一路直達丹後，車上可安心補眠，中途停靠休息站上洗手間。'
      },
      {
        id: 'd3-3',
        time: '10:30',
        title: '🚠 天橋立纜車 & 昇龍觀展望台',
        description: '搭乘景觀纜車登頂，俯瞰日本三景之一「天橋立」，體驗經典倒立「胯下窺看 (股のぞき)」如飛龍在天。',
        category: 'attraction',
        icon: 'Mountain',
        mustTry: '展望台胯下窺看合照、智惠之圈投擲瓦片祈福',
        elderTips: '纜車有封閉式大車廂（老少咸宜）與單人吊椅，長輩搭大車廂平穩安全。'
      },
      {
        id: 'd3-4',
        time: '11:30',
        title: '🛍️ 智恩寺參拜 & 扇子籤',
        description: '參拜文殊菩薩求智慧與平安，求取招牌「扇子籤」，掛在松樹上極為壯觀。',
        category: 'attraction',
        icon: 'Sparkles',
        cost: '約 ¥800',
        mustTry: '智惠之餅 (紅豆麻糬)、黑豆茶點'
      },
      {
        id: 'd3-5',
        time: '12:00',
        title: '🍤 午餐推薦：天橋立海鮮海鮮丼 / 丹後定食',
        description: '品嚐日本海直送當季新鮮海鮮丼、烤花鯽魚與海老天婦羅。',
        category: 'food',
        icon: 'UtensilsCrossed',
        cost: '約 ¥1,800 / 人',
        mustTry: '丹後海鮮丼、鮮烤松葉蟹腳或魚乾'
      },
      {
        id: 'd3-6',
        time: '13:00',
        title: '🛍️ 丹後特產街巡禮',
        description: '採買黑豆茶、沙丁魚油漬罐頭、丹後地酒、現烤竹輪。',
        category: 'shopping',
        icon: 'ShoppingBag',
        cost: '約 ¥1,500'
      },
      {
        id: 'd3-7',
        time: '14:00',
        title: '🚢 伊根舟屋體驗遊覽船 & 海上餵海鷗',
        description: '登上遊覽船環繞世界唯一水上聚落「伊根舟屋」，手拿蝦味先吸引滿天海鷗與老鷹飛翔。',
        category: 'activity',
        icon: 'Ship',
        mustTry: '船上餵海鷗甜蜜合影、欣賞舟屋傳統木造建築',
        elderTips: '遊覽船平穩不顛簸，坐在船艙內也能透過全景大窗欣賞美景。'
      },
      {
        id: 'd3-8',
        time: '15:00',
        title: '🍶 向井酒造：女性杜氏「伊根滿開」',
        description: '造訪百年酒造，品嚐以古代赤米釀造、呈現浪漫粉紅色的知名清酒「伊根滿開」。',
        category: 'shopping',
        icon: 'Wine',
        cost: '約 ¥2,200',
        mustTry: '伊根滿開粉紅清酒（果香甜美極受女生歡迎）'
      },
      {
        id: 'd3-9',
        time: '15:30',
        title: '🚃 京都丹後鐵道海上列車體驗',
        description: '搭乘丹後鐵道行經「由良川鐵橋」，列車行駛於湛藍海面上，宛如《神隱少女》夢幻水上火車！',
        category: 'attraction',
        icon: 'Train',
        mustTry: '由良川鐵橋窗外海天一線絕美視角錄影'
      },
      {
        id: 'd3-10',
        time: '18:00',
        title: '專車返抵大阪難波 / 日本橋',
        description: '下車稍作整理，步行前往餐廳享用豐盛晚餐。',
        category: 'transport',
        icon: 'Bus'
      },
      {
        id: 'd3-11',
        time: '18:30',
        title: '🍢 晚餐推薦：難波 Parks / LUCUA 美食街',
        description: '在室內百貨吹冷氣舒適享用日式串炸、壽喜燒或牛舌定食。',
        category: 'food',
        icon: 'Utensils',
        cost: '約 ¥2,500 / 人'
      }
    ]
  },
  {
    dayNumber: 4,
    dateStr: '2026/10/11',
    weekday: '週日 (Sun)',
    title: '滋賀絕景 • KKday 琵琶湖一日遊',
    subtitle: '湖中鳥居 • 滿月寺浮禦堂 • 琵琶湖 Terrace • 童話草屋 La Collina',
    weatherSummary: '🏞️ 滋賀湖畔 15°C ~ 22°C，山頂展望台風大較涼，建議攜帶保暖外套',
    transportPass: 'KKday 專車一日遊',
    tags: ['BiwakoTerrace', 'ShirahigeShrine', 'OmiHachiman', 'LaCollina', 'KKday'],
    itemsPlanA: [
      {
        id: 'd4-1',
        time: '07:00',
        title: '🍳 早餐推薦：客美多咖啡 (Komeda)',
        description: '體驗經典名古屋朝食文化，點香醇咖啡送現烤厚片土司與水煮蛋/紅豆泥。',
        category: 'food',
        icon: 'Coffee',
        cost: '約 ¥700 / 人',
        mustTry: '紅豆厚片土司配熱咖啡'
      },
      {
        id: 'd4-2',
        time: '08:00',
        title: '搭乘 KKday 專車出發（車程約 2 小時）',
        description: '專車自大阪出發，行經名神高速公路前往滋賀琵琶湖。',
        category: 'transport',
        icon: 'Bus'
      },
      {
        id: 'd4-3',
        time: '10:00',
        title: '🌊 滿月寺浮禦堂（近江八景「堅田落雁」）',
        description: '欣賞建於琵琶湖上的朱紅浮橋古剎，漫步湖中長廊祈求全家闔家平安。',
        category: 'attraction',
        icon: 'Landmark',
        mustTry: '浮禦堂湖中全景、近江八景石碑打卡'
      },
      {
        id: 'd4-4',
        time: '11:30',
        title: '⛩️ 白鬚神社湖中鳥居',
        description: '擁有兩千年歷史的近江最古老神社，站在專屬展望台拍下佇立湖中的朱紅大鳥居，祈求長壽與勝運。',
        category: 'attraction',
        icon: 'Camera',
        mustTry: '湖中鳥居背景浪漫情侶合照、長壽御守',
        elderTips: '請於「藍湖白鬚台」專屬展望平台拍照，切勿橫越馬路，安全第一。'
      },
      {
        id: 'd4-5',
        time: '12:15',
        title: '🛍️ 滋賀土產採買',
        description: '採買近江牛咖哩調理包、甲賀綠茶、琵琶鱒魚甘露煮、紅蒟蒻。',
        category: 'shopping',
        icon: 'ShoppingBag',
        cost: '約 ¥1,500'
      },
      {
        id: 'd4-6',
        time: '14:00',
        title: '🚠 搭乘日本最速高空纜車登頂 琵琶湖觀景台',
        description: '搭乘全景景觀纜車（時速可達 43km/h）直達海拔 1,100 公尺的 Biwako Terrace。',
        category: 'attraction',
        icon: 'Mountain',
        mustTry: '無邊際水池露台俯瞰琵琶湖絕景'
      },
      {
        id: 'd4-7',
        time: '14:15',
        title: '🍛 午餐推薦：琵琶湖 Terrace 景觀餐廳',
        description: '坐在無敵湖景觀景席，享用滋賀特產近江牛咖哩飯或近江牛可樂餅。',
        category: 'food',
        icon: 'UtensilsCrossed',
        cost: '約 ¥2,000 / 人',
        mustTry: '極品近江牛咖哩、近江牛漢堡排、藍色琵琶湖蘇打特調'
      },
      {
        id: 'd4-8',
        time: '16:00',
        title: '🏡 近江八幡 • La Collina 童話草屋園區',
        description: '建築大師藤森照信設計，綠意植被覆蓋的巨型童話草屋，宛如闖入吉卜力神隱少女精靈聚落！',
        category: 'attraction',
        icon: 'Sparkles',
        mustTry: '草屋大門拍精靈風合照、日式庭園漫步'
      },
      {
        id: 'd4-9',
        time: '16:30',
        title: '🍰 下午茶：CLUB HARIE 現烤神級年輪蛋糕',
        description: '品嚐剛出爐、熱騰騰軟綿入口即化的年輪蛋糕，與現做生銅鑼燒。',
        category: 'food',
        icon: 'Cake',
        cost: '約 ¥800 / 人',
        mustTry: '現烤年輪蛋糕 (Baumkuchen)、たねや現烤生銅鑼燒'
      },
      {
        id: 'd4-10',
        time: '17:00',
        title: '🛍️ 伴手禮：CLUB HARIE 禮盒 & たねや栗子饅頭',
        description: '採買秋季限定栗子大福、經典年輪蛋糕禮盒送給親朋好友。',
        category: 'shopping',
        icon: 'Gift',
        cost: '約 ¥1,728'
      },
      {
        id: 'd4-11',
        time: '18:30',
        title: '專車返抵大阪梅田 / 難波',
        description: '搭車一路舒舒服服睡回大阪市中心。',
        category: 'transport',
        icon: 'Bus'
      },
      {
        id: 'd4-12',
        time: '19:00',
        title: '🥩 晚餐推薦：京都勝牛炸牛排 / 頂級和牛燒肉',
        description: '酥炸至三分熟的黃金黑毛和牛炸牛排，鐵板微煎香氣四溢。',
        category: 'food',
        icon: 'Flame',
        cost: '約 ¥2,200 / 人'
      }
    ]
  },
  {
    dayNumber: 5,
    dateStr: '2026/10/12',
    weekday: '週一 (Mon)',
    title: '奇幻雙選擇 • USJ 冒險 或 勝尾寺祈願',
    subtitle: '方案 A：日本環球影城 USJ 奇幻冒險 ｜ 方案 B：勝運勝尾寺 & 萬博太陽之塔',
    weatherSummary: '🎡 大阪市區 17°C ~ 24°C，白天晴朗溫和，晚間微涼',
    transportPass: '方案 A：JR 夢咲線 ｜ 方案 B：御堂筋線/北急 + 阪急巴士',
    tags: ['SuperNintendoWorld', 'USJ', 'Halloween', 'Katsuo-ji', 'ExpoPark'],
    hasAlternative: true,
    planAName: '方案 A：環球影城 USJ 奇幻冒險 (熱血玩樂)',
    planBName: '方案 B：勝運之寺勝尾寺 & 萬博太陽之塔 (悠閒祈福)',
    itemsPlanA: [
      {
        id: 'd5a-1',
        time: '07:30',
        title: '飯店出發前往 USJ 環球影城',
        description: '搭乘地鐵轉 JR 夢咲線至「環球影城站 (Universal City)」，提早於閘門前等候入園。',
        category: 'transport',
        icon: 'Train',
        cost: '約 ¥500 / 人',
        transitInfo: '車程約 40 分鐘'
      },
      {
        id: 'd5a-2',
        time: '08:30',
        title: '📱 入園首要任務：APP 抽整理券',
        description: '入閘門後立即打開 USJ 官方 APP，抽取「超級任天堂世界(瑪利歐)」與「芙莉蓮」免費入場整理券。',
        category: 'activity',
        icon: 'Smartphone',
        mustTry: '確認全隊手機群組門票綁定，一次抽齊全員入場時段！'
      },
      {
        id: 'd5a-3',
        time: '09:00',
        title: '🎟️【快通】好萊塢美夢乘車遊 & 貞子的詛咒',
        description: '體驗空中飛翔的快感！推薦音響選播芙莉蓮聯名主題曲，接著體驗萬聖節限定驚悚設施。',
        category: 'activity',
        icon: 'Ticket',
        mustTry: '好萊塢美夢選曲《葬送的芙莉蓮》主題曲'
      },
      {
        id: 'd5a-4',
        time: '10:50',
        title: '🎟️【快通】惡靈古堡 深淵絕境 (Resident Evil: The Dive)',
        description: '全沉浸式第一人稱實境恐怖射擊體驗（指定時段 10:50 - 11:20），刺激感爆棚！',
        category: 'activity',
        icon: 'Skull'
      },
      {
        id: 'd5a-5',
        time: '11:30',
        title: '🍔 午餐：芙莉蓮主題追憶餐廳',
        description: '享用芙莉蓮魔法料理主題餐點（如巨大漢堡肉排、藍月草特調），或透過 APP 預約優先入席。',
        category: 'food',
        icon: 'UtensilsCrossed',
        cost: '約 ¥2,500 / 人'
      },
      {
        id: 'd5a-6',
        time: '13:30',
        title: '🧝 芙莉蓮故事徒步～追憶之旅～ 光影展',
        description: '沉浸式走進欣梅爾與芙莉蓮的冒險回憶，採買限定魔導書造型周邊與萬聖節伴手禮。',
        category: 'attraction',
        icon: 'Wand2',
        mustTry: '魔導書餅乾盒、欣梅爾銅像打卡合影'
      },
      {
        id: 'd5a-7',
        time: '16:00',
        title: '🍄 超級任天堂世界 (瑪利歐園區) 深度暢玩',
        description: '戴上能量手環敲問號磚塊積點、體驗庫巴挑戰書 AR 賽車、耀西冒險，以及奇諾比奧咖啡店。',
        category: 'activity',
        icon: 'Gamepad2',
        mustTry: '瑪利歐賽車～庫巴的挑戰書～、耀西小點心'
      },
      {
        id: 'd5a-8',
        time: '18:00',
        title: '🧟 萬聖節街頭殭屍出沒：Zombie de Dance',
        description: '夜幕降臨，全園區殭屍群現身，加入 Ado 破億神曲《唱 (Show)》萬人街頭群舞派對！',
        category: 'activity',
        icon: 'Music',
        mustTry: '跟著園區舞者一起狂跳《唱》群舞'
      },
      {
        id: 'd5a-9',
        time: '19:30',
        title: '🎟️【快通】侏羅紀公園 夜晚乘船遊',
        description: '夜間俯衝激流（指定 19:30 - 20:00），感受恐龍在夜霧中的震撼咆哮！',
        category: 'activity',
        icon: 'Ticket'
      },
      {
        id: 'd5a-10',
        time: '20:15',
        title: '🍺 夜間活米村 & 暢飲奶油啤酒',
        description: '夜晚漫步點燈的魔法世界，手捧溫熱無酒精奶油啤酒，欣賞霍格華茲城堡夜景。',
        category: 'food',
        icon: 'Beer',
        cost: '約 ¥800 / 杯',
        mustTry: '泡沫印在嘴唇上的經典俏皮情侶合照'
      },
      {
        id: 'd5a-11',
        time: '20:45',
        title: '🏰 哈利波特禁忌之旅 & 城堡見學',
        description: '閉園前的免排隊黃金時段！搭乘飛天掃帚與哈利波特一同穿梭於魁地奇球場與巨蜘蛛巢穴。',
        category: 'activity',
        icon: 'Sparkles',
        elderTips: '若長輩易暈車，可選擇「城堡步行見學」路線，只參觀會動的畫像與校長室，免搭乘雲霄飛車。'
      },
      {
        id: 'd5a-12',
        time: '22:15',
        title: '搭乘電車回心齋橋吃宵夜',
        description: '搭乘 JR 轉地鐵回心齋橋，品嚐 24 小時熱騰騰拉麵或磯丸水產燒烤。',
        category: 'food',
        icon: 'Utensils',
        cost: '約 ¥1,500 / 人'
      }
    ],
    itemsPlanB: [
      {
        id: 'd5b-1',
        time: '08:30',
        title: '🍳 悠閒朝食：松屋或 Doutor 可頌套餐',
        description: '睡到自然醒，享用熱呼呼的日式鮭魚朝食或熱咖啡可頌。',
        category: 'food',
        icon: 'Coffee',
        cost: '約 ¥600 / 人'
      },
      {
        id: 'd5b-2',
        time: '09:15',
        title: '心齋橋出發前往千里中央站',
        description: '心齋橋 ➔ [御堂筋線直通北急] ➔ 千里中央站。',
        category: 'transport',
        icon: 'Subway',
        cost: '¥400 / 人',
        transitInfo: '車程約 45 分鐘，一車直達無須轉乘'
      },
      {
        id: 'd5b-3',
        time: '10:00',
        title: '千里中央轉乘阪急巴士至勝尾寺',
        description: '搭乘阪急巴士 29 路直達勝尾寺山門前。',
        category: 'transport',
        icon: 'Bus',
        cost: '¥450 / 人',
        transitInfo: '車程約 30 分鐘，沿途欣賞箕面山區秋景'
      },
      {
        id: 'd5b-4',
        time: '10:30',
        title: '🔴 勝運之寺・勝尾寺 萬尊達摩巡禮',
        description: '朝聖全日本最著名的「勝運」古寺！漫山遍野擺滿信眾奉納的紅色達摩不倒翁。求取專屬達摩，為其「點右眼」許下心願！',
        category: 'attraction',
        icon: 'Sparkles',
        mustTry: '求勝運達摩籤（藏在達摩肚子裡）、在達摩梯田合影',
        elderTips: '山間空氣極佳，步道平緩且設有電梯與無障礙坡道，長輩非常喜歡。'
      },
      {
        id: 'd5b-5',
        time: '12:00',
        title: '🛍️ 勝尾寺紀念品採買',
        description: '採買必勝不倒翁饅頭、達摩仙貝、勝運健康御守。',
        category: 'shopping',
        icon: 'Gift',
        cost: '約 ¥1,500'
      },
      {
        id: 'd5b-6',
        time: '13:00',
        title: '搭乘計程車/巴士前往萬博紀念公園',
        description: '舒適包車或公車轉單軌電車前往萬博公園。',
        category: 'transport',
        icon: 'Car',
        cost: '約 ¥3,000 (全車)'
      },
      {
        id: 'd5b-7',
        time: '13:30',
        title: '🍱 午餐推薦：EXPOCITY 金子半之助天丼',
        description: '在 EXPOCITY 舒適美食街享用江戶前金子半之助豪華炸蝦天丼或神戶牛定食。',
        category: 'food',
        icon: 'UtensilsCrossed',
        cost: '約 ¥1,500 / 人',
        mustTry: '半熟蛋爆漿炸蝦天丼'
      },
      {
        id: 'd5b-8',
        time: '14:30',
        title: '☀️ 萬博紀念公園 • 太陽之塔朝聖',
        description: '朝聖日本國寶級大師岡本太郎 1970 昭和經典巨作「太陽之塔」，感受震撼魄力。',
        category: 'attraction',
        icon: 'Camera',
        mustTry: '太陽之塔正面「現在之顏」與背面「過去之黑太陽」打卡合影'
      },
      {
        id: 'd5b-9',
        time: '15:30',
        title: '🛍️ 太陽之塔周邊紀念品',
        description: '轉太陽之塔微縮模型扭蛋、買復古帆布袋與紀念明信片。',
        category: 'shopping',
        icon: 'ShoppingBag',
        cost: '約 ¥1,000'
      },
      {
        id: 'd5b-10',
        time: '16:30',
        title: '🛍️ EXPOCITY 質感伴手禮大採購',
        description: '逛「茅乃舍」買無添加天然高湯包、「久世福商店」買海苔醬與萬能沾醬、「Calbee+」吃現炸熱騰騰洋芋片。',
        category: 'shopping',
        icon: 'ShoppingCart',
        cost: '約 ¥2,000',
        elderTips: '茅乃舍高湯是煮湯神器，媽媽與姐姐們採購的最佳首選！'
      },
      {
        id: 'd5b-11',
        time: '17:30',
        title: '搭乘單軌/地鐵返回心齋橋',
        description: '萬博紀念公園站 ➔ 千里中央 ➔ 御堂筋線 ➔ 心齋橋。',
        category: 'transport',
        icon: 'Subway',
        cost: '¥650 / 人',
        transitInfo: '車程約 45 分鐘'
      },
      {
        id: 'd5b-12',
        time: '19:00',
        title: '🥩 晚餐：心齋橋「壽喜燒 木曾路」或和牛燒肉',
        description: '專人桌邊服務的日式高檔壽喜燒，薄切霜降黑毛和牛蘸上濃郁生蛋黃，極致奢華享受。',
        category: 'food',
        icon: 'Flame',
        cost: '約 ¥5,000 / 人',
        mustTry: '黑毛和牛壽喜燒、日式抹茶雪酪'
      }
    ]
  },
  {
    dayNumber: 6,
    dateStr: '2026/10/13',
    weekday: '週二 (Tue)',
    title: '難波 • 心齋橋最後巡禮 • 平安返台',
    subtitle: 'Orange Street 潮流散策 • 藥妝伴手禮最後掃貨 • 滿載回憶起飛',
    weatherSummary: '🛫 大阪市區 18°C ~ 25°C，滿載回憶與戰利品的美好晴天',
    transportPass: '大阪地鐵 / 南海特急 Rapi:t 直達關西機場',
    tags: ['Namba', 'Dotonbori', 'Shinsaibashi', 'Tigerair', 'OrangeStreet', '551蓬萊'],
    itemsPlanA: [
      {
        id: 'd6-1',
        time: '09:30',
        title: '🍳 精緻早午餐：橘子街「Biotop」/「丸福珈琲店」',
        description: '在充滿綠意的 Biotop 頂樓露台喝拿鐵，或到昭和復古丸福珈琲店吃厚烤鬆餅。',
        category: 'food',
        icon: 'Coffee',
        cost: '約 ¥1,500 / 人',
        mustTry: '丸福濃郁黑咖啡、極厚原味奶油鬆餅'
      },
      {
        id: 'd6-2',
        time: '10:00',
        title: '🏨 飯店辦理退房手續',
        description: '退房並將大件行李暫寄放於飯店櫃台，輕裝展開最後半天的購物散策。',
        category: 'hotel',
        icon: 'Luggage'
      },
      {
        id: 'd6-3',
        time: '10:30',
        title: '🌿 橘子街 (Orange Street) 質感散策',
        description: '漫步南堀江美學街區，造訪「LiLo Coffee Roasters」選購手沖精品咖啡濾掛包。',
        category: 'shopping',
        icon: 'Sparkles',
        mustTry: 'LiLo 精品咖啡豆、特色日系文創小店'
      },
      {
        id: 'd6-4',
        time: '12:30',
        title: '🍜 午餐推薦：高島屋/大丸地下街便當 或 神座拉麵',
        description: '品嚐充滿白菜香甜的高人氣神座拉麵，或外帶百貨頂級鰻魚/牛肉雙拼便當。',
        category: 'food',
        icon: 'Utensils',
        cost: '約 ¥1,000 / 人'
      },
      {
        id: 'd6-5',
        time: '14:00',
        title: '🛍️ 藥妝與食品最後大採購',
        description: '心齋橋松本清 / 業務超市最後補貨：日東奶茶、辻利抹茶粉、S&B 咖哩塊、EVE、合力他命、大正感冒藥。',
        category: 'shopping',
        icon: 'ShoppingCart',
        cost: '約 ¥15,000 (免稅滿額折抵)',
        elderTips: '提醒準備護照辦理 Tax Free 退稅，退稅密封袋手提或依規定裝箱。'
      },
      {
        id: 'd6-6',
        time: '15:00',
        title: '回飯店領取行李前往難波站',
        description: '回飯店領取寄存行李，推行李由地下街平穩步道步行或搭乘計程車前往南海難波站。',
        category: 'transport',
        icon: 'Luggage'
      },
      {
        id: 'd6-7',
        time: '15:30',
        title: '搭乘 南海特急 Rapi:t 直達關西機場',
        description: '舒適入座特急 Rapi:t，40 分鐘直達關西機場第一航廈。',
        category: 'transport',
        icon: 'Train',
        cost: '¥1,490 / 人',
        transitInfo: '車程約 40 分鐘'
      },
      {
        id: 'd6-8',
        time: '17:00',
        title: '抵達關西機場 T1 辦理登機與托運',
        description: '台灣虎航櫃台辦理 IT213 登機手續、托運行李（20kg/人），確認超重與隨身行李規範。',
        category: 'flight',
        icon: 'PlaneTakeoff'
      },
      {
        id: 'd6-9',
        time: '18:00',
        title: '🍱 機場晚餐：杵屋烏龍麵 / KYK 炸豬排',
        description: '出境前於航廈餐廳享用熱呼呼的炸豬排定食或手打烏龍麵。',
        category: 'food',
        icon: 'UtensilsCrossed',
        cost: '約 ¥1,200 / 人'
      },
      {
        id: 'd6-10',
        time: '18:30',
        title: '🛍️ 免稅店最後採買',
        description: '免稅店狂掃伴手禮：Royce 生巧克力、白色戀人、NEWYORK PERFECT CHEESE、LeTAO 雙層乳酪蛋糕。',
        category: 'shopping',
        icon: 'Gift',
        cost: '約 ¥8,000'
      },
      {
        id: 'd6-11',
        time: '19:00',
        title: '🍰 最後手提伴手禮：Rikuro 老爺爺現烤起司蛋糕 & 551蓬萊包子',
        description: '手提熱騰騰剛出爐的起司蛋糕與 551 豬肉包子，香氣四溢帶上飛機回台灣！',
        category: 'food',
        icon: 'Cake',
        cost: '約 ¥965',
        mustTry: 'Rikuro 搖鈴剛出爐起司蛋糕'
      },
      {
        id: 'd6-12',
        time: '19:50',
        title: '🛫 IT213 航班起飛 • 滿載回憶平安返台',
        description: '台灣虎航 IT213 起飛（座位 28E/F），回味 6 天 5 夜的美好點滴與滿滿回憶。',
        category: 'flight',
        icon: 'Plane'
      },
      {
        id: 'd6-13',
        time: '22:05',
        title: '🛬 平安抵達桃園機場 (TPE)',
        description: '平安降落桃園第一航廈，提領行李，為彥伃的 2026 生日浪漫之旅劃下溫馨甜蜜的句點！',
        category: 'flight',
        icon: 'HeartHandshake',
        mustTry: '全家在入境大廳溫馨大合照！'
      }
    ]
  }
]
