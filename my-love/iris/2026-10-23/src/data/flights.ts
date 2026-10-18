import { FlightDetail } from '../types'

export interface BirthdayGiftInfo {
  giver: string
  receiver: string
  occasion: string
  birthdayDate: string
  tripDates: string
  familyMembers: string[]
  giftTitle: string
  giftSubtitle: string
  giftMessage: string
}

export const birthdayGiftData: BirthdayGiftInfo = {
  giver: '承哲 (Cheng-Jhe)',
  receiver: '彥伃',
  occasion: '彥伃 10/23 專屬生日特別獻禮 🎂',
  birthdayDate: '2026-10-23',
  tripDates: '2026/10/08 (四) ～ 2026/10/13 (二)',
  familyMembers: [
    '彥伃 (壽星公主 💖)',
    '承哲 (專屬領隊 & 贊助彥伃機票 ✈️)'
  ],
  giftTitle: '✈️ 承哲送給彥伃的生日禮物：贊助彥伃關西來回機票',
  giftSubtitle: 'Tigerair Taiwan 台灣虎航 • 桃園 (TPE) ⇄ 關西 (KIX) 浪漫同行',
  giftMessage: '親愛的彥伃，生日快樂！這趟關西秋日之旅，我特別贊助妳的來回機票作為專屬生日禮物，希望能和妳一起走過京都的古街、伊根的舟屋、琵琶湖的湖光山色與環球影城，留下我們最珍貴浪漫的秋天回憶。'
}

export const flightDetails: FlightDetail[] = [
  {
    direction: '去程',
    airline: '台灣虎航 (Tigerair Taiwan)',
    flightNo: 'IT210',
    fromCity: '台北 / 桃園',
    fromAirport: 'TPE 桃園國際機場 (第一航廈 T1)',
    toCity: '大阪 / 關西',
    toAirport: 'KIX 關西國際機場 (第一航廈 T1)',
    departureDate: '2026/10/08 (四)',
    departureTime: '06:40',
    arrivalDate: '2026/10/08 (四)',
    arrivalTime: '10:25',
    seats: '28A / 28B (靠窗甜蜜景觀位)',
    baggage: '含 20kg 托運行李 + 10kg 手提',
    duration: '2 小時 45 分',
    terminal: 'T1',
    statusBadge: '準時啟航 (On Time)'
  },
  {
    direction: '回程',
    airline: '台灣虎航 (Tigerair Taiwan)',
    flightNo: 'IT213',
    fromCity: '大阪 / 關西',
    fromAirport: 'KIX 關西國際機場 (第一航廈 T1)',
    toCity: '台北 / 桃園',
    toAirport: 'TPE 桃園國際機場 (第一航廈 T1)',
    departureDate: '2026/10/13 (二)',
    departureTime: '19:50',
    arrivalDate: '2026/10/13 (二)',
    arrivalTime: '22:05',
    seats: '28E / 28F (滿載紀念品返台)',
    baggage: '含 20kg 托運行李 + 伴手禮手提',
    duration: '3 小時 15 分',
    terminal: 'T1',
    statusBadge: '平安歸途 (Scheduled)'
  }
]

export const hotelInfo = {
  name: 'Four Points Flex by Sheraton Osaka Shinsaibashi',
  nameZh: '大阪心齋橋喜來登福朋快捷酒店',
  address: '大阪市中央區南船場 3-chōme-5-2 (西心齋橋 1-10-10)',
  addressEn: '3-5-2 Minamisenba / 1-10-10 Nishi-Shinsaibashi, Chuo-ku, Osaka, 542-0086 Japan',
  checkIn: '15:00 以後',
  checkOut: '11:00 以前',
  phone: '+81 6-6121-8280',
  googleMapsUrl: 'https://maps.app.goo.gl/xKkcxD1Jnpwu2ZKBA',
  officialUrl: 'https://www.marriott.com/en-us/hotels/osahu-four-points-flex-osaka-shinsaibashi/overview/',
  photos: [
    {
      title: '萬豪官方大廳實景 (Lobby)',
      url: 'https://cache.marriott.com/is/image/marriotts7prod/xf-osahu-lobby-01-34480:Wide-Hor?wid=1336&fit=constrain'
    },
    {
      title: '館內 Cafe Bohemia 餐廳實景',
      url: 'https://s7d1.scene7.com/is/image/marriotts7prod/xf-osahu-breakfast-01-10734:Wide-Hor?wid=1336&fit=constrain'
    }
  ],
  metroExits: [
    '地鐵御堂筋線／長堀鶴見綠地線「心齋橋站」北 8 號出口，步行約 3 分鐘',
    '地鐵堺筋線「長堀橋站」2A 號出口，步行約 5 分鐘',
    '經心齋橋地下街 (Crysta Nagahori) 可全程遮陽遮雨直達飯店附近'
  ],
  highlights: [
    '萬豪國際集團旗下品牌，現代簡約舒適',
    '地理位置極佳，步行 3 分鐘即達心齋橋筋商店街、大丸百貨',
    '鄰近長堀橋地下街 Crysta Nagahori，雨天逛街移動無阻礙',
    '地鐵站設有電梯直達地下街與路面，出入輕鬆無負擔',
    '周邊超商 (7-11, Lawson, FamilyMart) 密集，採買消夜超便利'
  ]
}
