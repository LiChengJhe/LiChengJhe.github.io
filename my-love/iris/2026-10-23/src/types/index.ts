export interface FlightDetail {
  direction: '去程' | '回程'
  airline: string
  flightNo: string
  fromCity: string
  fromAirport: string
  toCity: string
  toAirport: string
  departureDate: string
  departureTime: string
  arrivalDate: string
  arrivalTime: string
  seats: string
  baggage: string
  duration: string
  terminal: string
  gate?: string
  statusBadge: string
}

export interface ItineraryItem {
  id: string
  time: string
  title: string
  description?: string
  category: 'flight' | 'transport' | 'food' | 'shopping' | 'attraction' | 'hotel' | 'activity'
  icon: string
  cost?: string
  location?: string
  tags?: string[]
  elderTips?: string // 長輩/家族貼心提醒
  mustTry?: string // 必吃必買特色
  transitInfo?: string // 交通乘車與轉乘指引
}

export interface DailyPlan {
  dayNumber: number
  dateStr: string
  weekday: string
  title: string
  subtitle: string
  weatherSummary: string
  transportPass: string
  tags: string[]
  hasAlternative?: boolean
  planAName?: string
  planBName?: string
  itemsPlanA: ItineraryItem[]
  itemsPlanB?: ItineraryItem[]
}

export interface PhotoItem {
  id: string
  title: string
  location: string
  date: string
  imageUrl: string
  category: 'osaka' | 'kyoto' | 'sea_kyoto' | 'shiga' | 'gourmet' | 'sweet'
  categoryName: string
  description: string
  featured?: boolean
  tags?: string[]
}

export interface PackingItem {
  id: string
  category: 'documents' | 'clothing' | 'electronics' | 'elderCare' | 'shopping'
  name: string
  description?: string
  requiredFor: string // e.g. "所有人", "彥伃", "承哲", "長輩必備"
  completed: boolean
}

export interface TravelCareTip {
  icon: string
  title: string
  subtitle: string
  description: string
  practicalTips: string[]
}
