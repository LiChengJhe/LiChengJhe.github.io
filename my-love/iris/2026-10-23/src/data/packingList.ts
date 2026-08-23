import { PackingItem } from '../types'

export const defaultPackingList: PackingItem[] = [
  // 證件與重要憑證
  { id: 'doc-1', category: 'documents', name: '護照正本 (效期 6 個月以上)', requiredFor: '全體成員', completed: true },
  { id: 'doc-2', category: 'documents', name: 'Visit Japan Web (VJW) QR Code 截圖', requiredFor: '全體成員', completed: true },
  { id: 'doc-3', category: 'documents', name: '台灣虎航電子機票 (IT210 / IT213)', requiredFor: '全體成員', completed: true },
  { id: 'doc-4', category: 'documents', name: 'KKday 一日遊行程憑證 (天橋立/琵琶湖)', requiredFor: '承哲 & 彥伃', completed: true },
  { id: 'doc-5', category: 'documents', name: '任天堂博物館 (Nintendo Museum) 預約入場 QR', requiredFor: '全體成員', completed: true },
  { id: 'doc-6', category: 'documents', name: '日本實體網卡 / eSIM / 漫遊開通', requiredFor: '全體成員', completed: true },
  { id: 'doc-7', category: 'documents', name: '日幣現鈔 (¥) & 雙幣信用卡/感應支付', requiredFor: '全體成員', completed: true },

  // 長輩與常備健康
  { id: 'med-1', category: 'elderCare', name: '長輩平日個人慢性病藥品 (備足份量+隨身帶)', requiredFor: '長輩必備', completed: true },
  { id: 'med-2', category: 'elderCare', name: '常備綜合感冒藥、止痛藥、腸胃藥、止瀉藥', requiredFor: '全體成員', completed: false },
  { id: 'med-3', category: 'elderCare', name: '休足時間 / 痠痛貼布 (晚間腿部放鬆必備)', requiredFor: '全體成員', completed: false },
  { id: 'med-4', category: 'elderCare', name: '長輩保溫水瓶 (隨時裝溫水暖胃)', requiredFor: '長輩必備', completed: false },
  { id: 'med-5', category: 'elderCare', name: '舒適好走耐磨氣墊球鞋 (極為重要)', requiredFor: '全體成員', completed: false },

  // 秋日衣物與配件
  { id: 'clo-1', category: 'clothing', name: '洋蔥式穿搭薄長袖 + 舒適針織衫', requiredFor: '全體成員', completed: false },
  { id: 'clo-2', category: 'clothing', name: '防風輕便外套 (琵琶湖山頂 & 伊根海邊偏涼)', requiredFor: '全體成員', completed: false },
  { id: 'clo-3', category: 'clothing', name: '彥伃美美的秋天拍照套裝 / 洋裝 / 貝雷帽 👗', requiredFor: '彥伃專屬', completed: false },
  { id: 'clo-4', category: 'clothing', name: '輕巧折疊傘 / 遮陽防曬帽', requiredFor: '全體成員', completed: false },

  // 3C 與配件
  { id: 'ele-1', category: 'electronics', name: '行動電源 (每人一顆，必須放隨身行李！)', requiredFor: '全體成員', completed: false },
  { id: 'ele-2', category: 'electronics', name: '手機充電線、多孔快充充電頭', requiredFor: '全體成員', completed: false },
  { id: 'ele-3', category: 'electronics', name: '日本轉接插頭 (日本雙平腳，台灣插頭多數通用)', requiredFor: '全體成員', completed: false },
  { id: 'ele-4', category: 'electronics', name: '自拍棒 / 輕量腳架 (全家合照神器)', requiredFor: '承哲專用', completed: false },

  // 購物與伴手禮
  { id: 'shp-1', category: 'shopping', name: '大容量輕便折疊購物袋 / 托特包 (裝戰利品)', requiredFor: '全體成員', completed: false },
  { id: 'shp-2', category: 'shopping', name: '行李秤 (回程前確認虎航 20kg 不超重)', requiredFor: '承哲準備', completed: false },
  { id: 'shp-3', category: 'shopping', name: '自嘲熊、西村優志熊貓 & YOSISTAMP 熊熊採購清單', requiredFor: '彥伃專屬', completed: true }
]
