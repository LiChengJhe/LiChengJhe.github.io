const defaultPhotoDate = '2026-04-23';

export const photoNarrativeByFile = {
  '35.jpg': {
    subtitle: '故事的起點',
    body: '那時我在日本旅遊，透過 Pairs 派愛族交友軟體和妳搭上話。\n為了約妳出來見面，我主動幫妳代購 Yosistamp，這個小小的契機，成了我們故事的起點。',
    caption: '從日本旅遊、Pairs初相識，到Yosistamp代購，這一切都是我們故事的開始。',
    date: '2023-02-18',
    link: 'https://www.instagram.com/s/aGlnaGxpZ2h0OjE4MjQwNDQxNzE1MTQwNDEx?story_media_id=3051034040039492436_1692647445&igsh=MXY2aDE4ajdkd3Q1bw=='
  },
  '19.jpg': {
    subtitle: '小日子烘焙坊・做蛋糕',
    body: '第一次一起到小日子烘焙坊，動手做蛋糕。\n從攪拌麵糊到裝飾蛋糕，每個步驟都有妳的笑聲和專注。和妳一起完成的蛋糕，特別有幸福的味道。',
    caption: '小日子烘焙坊的第一次，妳和蛋糕一樣甜。',
    date: '2023-04-01',
    link: 'https://photos.app.goo.gl/QBrVmw5kgBGbkHJZ9'
  },
  '1.png': {
    subtitle: 'XPark 水族館的藍色光影。',
    body: '玻璃水幕前，魚群安靜穿梭，妳的笑也跟著水波發亮。\n那一刻很安靜，卻把心動寫得很清楚。',
    caption: '在水族館的玻璃世界裡，妳的笑容倒映在水光間。',
    date: '2023-04-16',
    link: 'https://photos.app.goo.gl/8p5U6FeFHDNoLFqJA'
  },
  '2.png': {
    subtitle: '九芎湖雲夢山丘，油桐花開，像初見的妳。',
    body: '在九芎湖雲夢山丘，白色花瓣落下來的時候，妳站在花下回頭看我。\n那個瞬間像春天親手寫下的第一句情書。\n就在這一天，我們牽起手，正式開始屬於彼此的故事。',
    caption: '九芎湖雲夢山丘初見時的妳，如同油桐花初綻，純白又明亮。',
    date: '2023-04-23',
    link: 'https://photos.app.goo.gl/5oBvJCjm41Su2yJNA'
  },
  '23.jpg': {
    subtitle: '兒童新樂園・科教館・北投',
    body: '這天我們跑了好多地方，先在兒童新樂園玩得像小孩，再到士林科教館探索新知，最後一起去北投散步。\n每一站都有妳的笑聲，讓整天都充滿快樂和驚喜。',
    caption: '兒童新樂園、科教館、北投，和妳一起走過的每一站都很美好。',
    date: '2023-04-29',
    link: 'https://photos.app.goo.gl/MwASYdZKxbizzuGw7'
  },
  '26.jpg': {
    subtitle: '青青草原與豆腐岩',
    body: '我們一起在青青草原奔跑、拍照，感受大自然的寬闊。\n接著到頭前溪豆腐岩散步，跳在石頭上的每一步都很開心。有妳陪伴，風景都變得特別美好。',
    caption: '青青草原與豆腐岩，妳的笑容比風景更動人。',
    date: '2023-05-13',
    link: 'https://photos.app.goo.gl/GBdjWgYMHs6VQ67FA'
  },
  '13.jpg': {
    subtitle: '眷村博物館',
    body: '在眷村博物館裡散步，老房子的故事和我們的笑聲交織在一起。\n每個轉角都藏著驚喜，和妳一起探索的時光，讓回憶變得特別溫柔。',
    caption: '眷村博物館的老時光，因妳的陪伴而更有溫度。',
    date: '2023-05-19',
    link: 'https://photos.app.goo.gl/GcDksFSiJkXUKPVD6'
  },
  '8.jpg': {
    subtitle: '手信霧隱城一日遊',
    body: '走進手信霧隱城，體驗日式場景、品嚐和菓子，妳的笑容比甜點更讓人難忘。\n這段回憶像霧一樣溫柔地包圍著我們。',
    caption: '手信霧隱城一日遊，妳的笑容和日式風情一樣令人著迷。',
    date: '2023-05-20',
    link: 'https://photos.app.goo.gl/fkDsZssBojbAjgQL7'
  },
  '32.jpg': {
    subtitle: '合興車站與薰衣草森林',
    body: '我們一起到合興車站拍照、寫下幸福的紀念，再到薰衣草森林散步，空氣裡都是花香和妳的笑聲。\n這一天的浪漫，因妳而特別難忘。',
    caption: '合興車站與薰衣草森林，妳的笑容最浪漫。',
    date: '2023-05-27',
    link: 'https://photos.app.goo.gl/H7Whn9fYmC8TQobX8'
  },
  '20.jpg': {
    subtitle: '新竹動物園',
    body: '一起在新竹動物園散步，看動物、聊心事。\n園區裡的每個角落，都留下我們的笑聲和合影。和妳一起探索的時光，總是特別快樂。',
    caption: '新竹動物園裡，妳的笑容比動物還可愛。',
    date: '2023-06-03',
    link: 'https://photos.app.goo.gl/iA4ULEWbb7TUBpN5A'
  },
  '31.jpg': {
    subtitle: '香山螃蟹步道',
    body: '一起在香山螃蟹步道散步，看潮間帶的風景和小螃蟹。\n妳的笑聲和海風一樣清爽，這段自然裡的時光，讓人一直想再回味。',
    caption: '香山螃蟹步道，妳的笑容比海風還溫柔。',
    date: '2023-06-24',
    link: 'https://photos.app.goo.gl/8yPb47kuoRKEHJRn8'
  },
  '34.jpg': {
    subtitle: '迪士尼100週年特展',
    body: '一起到台北中正紀念堂看迪士尼100週年特展，經典角色和童年回憶都在眼前重現。\n妳的笑容和展覽裡的魔法一樣，讓這一天變得特別夢幻又快樂。',
    caption: '迪士尼100週年特展，和妳一起回味童年最幸福。',
    date: '2023-07-01',
    link: 'https://photos.app.goo.gl/qRjkTs4qnnNXTfhY6'
  },
  '30.jpg': {
    subtitle: '生活美學館與阿忠冰店',
    body: '一起去新竹生活美學館散步，感受藝術與靜謐。\n後來到阿忠冰店吃冰，聽我說爸媽年輕時也在這裡約會。這份跨世代的回憶，因妳的陪伴而更有溫度。',
    caption: '生活美學館與阿忠冰店，妳讓回憶變得更甜。',
    date: '2023-07-23',
    link: 'https://photos.app.goo.gl/XPDWvfLQXQgCgnpi7'
  },
  '17.jpg': {
    subtitle: '小日子烘焙坊・做餅乾',
    body: '第二次一起來小日子烘焙坊，這回換我們動手做餅乾。\n揉麵糰、壓模、烘烤，過程裡有笑聲也有甜甜的期待。和妳一起完成的餅乾，特別有幸福的味道。',
    caption: '小日子烘焙坊裡，妳和餅乾一樣可愛。',
    date: '2023-07-30',
    link: 'https://photos.app.goo.gl/16EKRLyuZwVh1cmv7'
  },
  '29.jpg': {
    subtitle: '小森之歌・落羽松',
    body: '一起到小森之歌散步，看落羽松的綠意和倒影。\n妳的笑容和樹影一樣溫柔，這段靜靜走過的時光，讓心情也變得很平靜。',
    caption: '小森之歌的落羽松，和妳一起欣賞最美。',
    date: '2023-08-05',
    link: 'https://photos.app.goo.gl/zbTVyvCzo4qC5HaH6'
  },
  '9.jpg': {
    subtitle: '間諜家家酒快閃餐廳',
    body: '一起走進間諜家家酒快閃餐廳，沉浸在動畫場景裡，享受限定美食。\n妳的笑容和驚喜，讓這次體驗變得特別又難忘。',
    caption: '間諜家家酒快閃餐廳裡，妳的笑容比任何角色都可愛。',
    date: '2023-08-12',
    link: 'https://photos.app.goo.gl/XAnNDKEGZjdgRFNW8'
  },
  '16.jpg': {
    subtitle: '第一次七夕情人節',
    body: '第一次一起過七夕，妳特地穿上我最喜歡的洋裝。\n那天的浪漫和妳的笑容，都讓這個情人節成為我心裡最珍貴的回憶。',
    caption: '七夕情人節，妳的洋裝和笑容都讓我心動。',
    date: '2023-08-19',
    link: 'https://photos.app.goo.gl/b4RHiD5crPt7AS1C8'
  },
  '33.jpg': {
    subtitle: '雄獅文具・想像力製造所',
    body: '和妳、還有妹妹三人一起到雄獅文具想像力製造所，動手做彩繪零錢包、製作彩色筆。\n創作的過程裡有笑聲、有驚喜，這種一起動手的時光，讓回憶變得特別有趣又溫馨。',
    caption: '雄獅文具想像力製造所，三人行的快樂最難忘。',
    date: '2023-09-02',
    link: 'https://photos.app.goo.gl/zrgwGA3yrTWNDDat9'
  },
  '3.png': {
    subtitle: '淺草寺和服漫步，街景也變得溫柔。',
    body: '在淺草寺穿著和服漫步，沿途還拍了很多照片，留下滿滿回憶，妳牽著我就很安心。\n每一步都像在替這段旅程蓋上專屬印章。\n我們還一起搭乘人力車，繞了淺草寺一圈，欣賞沿途風景，這段特別的體驗讓回憶更加深刻。',
    caption: '淺草寺和服下的笑顏，是旅途中最美的風景。',
    date: '2023-10-05',
    link: 'https://photos.app.goo.gl/SB9D8StRpEHNUU2y9'
  },
  '4.png': {
    subtitle: '迪士尼的一天，像夢真的成真。',
    body: '我們在人群裡笑著跑、笑著拍，像把煩惱都暫停。\n童話不是城堡，而是妳在身邊的每一秒。',
    caption: '在童話國度裡，我們像孩子一樣歡笑奔跑。',
    date: '2023-10-06',
    link: 'https://photos.app.goo.gl/UhCPtCqtFXiffEJTA'
  },
  '15.jpg': {
    subtitle: '奇藝日式餐廳慶生',
    body: '那天我們先去新竹縣美術館欣賞展覽，再到奇藝日式餐廳為妳慶生。\n美術館的靜謐和餐廳的溫馨，還有妳的笑容，都讓這個生日成為最幸福的回憶。能陪妳一起慶祝，是我最開心的事。',
    caption: '奇藝日式餐廳裡，妳的生日笑容最動人。',
    date: '2023-10-22',
    link: 'https://photos.app.goo.gl/LzSVXsVqLDDz1Ep2A'
  },
  '28.jpg': {
    subtitle: '空拍初體驗',
    body: '妳第一次嘗試操作空拍機，我在旁邊一步步教妳。\n看著妳專注又新奇的表情，覺得這個小小的初體驗特別有趣。和妳一起學習、一起記錄天空的畫面，是很珍貴的回憶。',
    caption: '空拍初體驗，妳的笑容和天空一樣明亮。',
    date: '2023-10-29',
    link: 'https://photos.app.goo.gl/hyhckGcFMg3hcvXdA'
  },
  '11.jpg': {
    subtitle: '樹林頭夜市',
    body: '夜市燈火亮起時，我們在人群裡穿梭，邊走邊分享小吃。\n熱鬧的氣氛裡，妳的笑容和夜色一樣溫柔，這些平凡的快樂，總讓人想一再回味。',
    caption: '樹林頭夜市的熱鬧與妳的笑容，是夜晚最溫暖的風景。',
    date: '2023-11-10',
    link: 'https://photos.app.goo.gl/dr37DbCUCN24GqtV9'
  },
  '10.jpg': {
    subtitle: '北埔半日遊',
    body: '北埔的午後，我們一起散步、喝擂茶。\n陽光和妳的笑容一樣溫暖，這段悠閒的時光，成了回憶裡最柔軟的片段。',
    caption: '北埔半日遊，陽光、擂茶和妳的笑容都很溫柔。',
    date: '2023-11-17',
    link: 'https://photos.app.goo.gl/xuDVpVomGndyR2qS6'
  },
  '5.png': {
    subtitle: '埔心牧場同舟共渡，是最踏實的浪漫。',
    body: '在埔心牧場，槳劃開水面，船慢慢前進，時間也慢了下來。\n有妳坐在身旁，未來就不再讓人害怕。',
    caption: '埔心牧場同舟共渡的時光，有妳在身旁，未來都值得期待。',
    date: '2023-11-19',
    link: 'https://photos.app.goo.gl/fVpC4N6TMu7XGBZN9'
  },
  '12.jpg': {
    subtitle: '聖誕節快樂',
    body: '聖誕節的燈飾閃爍，我們一起交換禮物、分享笑聲。\n節日的溫暖和妳的陪伴，讓快樂變得特別有意義。',
    caption: '聖誕節的快樂，是和妳一起度過的每一刻。',
    date: '2023-12-23',
    link: 'https://photos.app.goo.gl/3tf7JzaQXp75GaYi6'
  },
  '21.jpg': {
    subtitle: '交大落羽松',
    body: '一起到交大散步，欣賞落羽松的金黃與倒影。\n樹下的風景和妳的笑容一樣溫柔，這段靜靜走過的時光，讓冬日也變得很溫暖。',
    caption: '交大落羽松下，妳的笑容最美。',
    date: '2024-01-06',
    link: 'https://photos.app.goo.gl/2cF9GpwHEizkE8Hz5'
  },
  '6.png': {
    subtitle: '小人國裡，笑聲比音樂還大。',
    body: '我們在園區裡像兩個放假的小孩，把快樂玩到滿格。\n回頭看這天，青春的亮度剛剛好。',
    caption: '青春的笑聲在遊樂園裡迴盪，快樂也變得勇敢。',
    date: '2024-01-13',
    link: 'https://photos.app.goo.gl/U1JPusCXg5y7ap63A'
  },
  '14.jpg': {
    subtitle: '中壢一日遊',
    body: '在中壢的日式建築間穿梭，走進中平路故事館、壢景町，感受老屋的靜謐與時光的溫度。\n和妳一起探索的每一步，都讓這座城市變得特別溫柔。',
    caption: '中壢一日遊，日式建築與妳的笑容都很迷人。',
    date: '2024-02-03',
    link: 'https://photos.app.goo.gl/G4fzQKPGXxhXkwYC6'
  },
  '7.png': {
    subtitle: '花之舞光影展開場，再把史努比與拉拉熊一起收進回憶。',
    body: '那天我們先去花之舞光影展，色彩一層層流動，妳站在光裡像一幅會呼吸的畫。\n接著又逛了「史努比 x 頂尖藝術大師」快閃和「Rilakkuma 20th Anniversary Tour in Taipei」，把可愛與療癒一次收藏完整。',
    caption: '先看花之舞光影展，再遇見史努比與拉拉熊，這天的心動被我們好好保存。',
    date: '2024-02-17',
    link: 'https://photos.app.goo.gl/RaaxUVPZ682Jo5BC6'
  },
  '8.png': {
    subtitle: '新竹公園賞櫻，春天剛好也在。',
    body: '那天我們去新竹公園賞櫻，花雨落在肩上，我們慢慢走，沒有人催促。\n這一幕很輕，卻把幸福說得很完整。',
    caption: '在新竹公園的櫻花樹下，妳的笑容比花還燦爛。',
    date: '2024-02-25',
    link: 'https://photos.app.goo.gl/TR1Yvin5TrsZDjHF7'
  },
  '27.jpg': {
    subtitle: '福湯岩盤浴',
    body: '一起去福湯岩盤浴放鬆，享受溫暖的石板和靜靜的時光。\n妳靠在我身邊的樣子，讓這份平靜變得特別幸福。',
    caption: '福湯岩盤浴裡，妳的陪伴最溫暖。',
    date: '2024-03-09',
    link: 'https://photos.app.goo.gl/Mi23BfTsAHm3BdYd9'
  },
  '18.jpg': {
    subtitle: '一周年紀念日',
    body: '交往一周年，我們一起在中壢散步、逛IKEA，平凡的日子因為有妳而變得特別。\n這一天的陪伴和笑聲，是我最珍惜的紀念。',
    caption: '一周年紀念日，有妳在身邊，哪裡都很幸福。',
    date: '2024-04-20',
    link: 'https://photos.app.goo.gl/TwFsp4mxHEcbtsRz8'
  },
  '9.png': {
    subtitle: '六福村的旋轉木馬，把笑容轉成回憶。',
    body: '木馬轉了一圈又一圈，我們的笑也沒停過。\n原來最純真的快樂，就是妳看著我笑。',
    caption: '旋轉木馬上的歡笑，是青春最純真的記號。',
    date: '2024-05-18',
    link: 'https://photos.app.goo.gl/YS88JpdHZofXfzQn7'
  },
  '16.png': {
    subtitle: '蘆竹湳古厝，紅磚巷弄的慢時光。',
    body: '老屋與巷道安靜得剛好，像在替故事保留空白。\n那天我們一起動手做湯圓，揉麵糰、搓圓圓，笑聲和糯米香都留在回憶裡。\n我們並肩走過去，笑聲就成了最好的題字。',
    caption: '漫步古厝巷弄、一起做湯圓，彼此相伴的笑顏成了記憶底片。',
    date: '2024-06-02',
    link: 'https://photos.app.goo.gl/tdf1dApuzzG7g1p79'
  },
  '15.png': {
    subtitle: 'TeamLab 與《怪獸與大自然的奇幻世界》，把同一天變得更難忘。',
    body: '白天在《怪獸與大自然的奇幻世界》展裡，看著熟悉角色和奇幻場景，像把童心重新點亮。\n走進 TeamLab 後，鏡面又把我們的回憶複製成星河；每一次回頭，都能看見彼此眼裡的亮光。',
    caption: '從奇幻展到光影空間，這天的每一幕都被我們好好收藏。',
    date: '2024-07-06',
    link: 'https://photos.app.goo.gl/WgyScc4DPgvFAiCu5'
  },
  '25.jpg': {
    subtitle: '松菸・PP mini 快閃店',
    body: '一起在台北松菸散步，逛PP mini快閃店，收藏了好多可愛的瞬間。\n妳的笑容和快閃店的驚喜一樣，讓這一天變得特別開心。',
    caption: '松菸與PP mini快閃店，妳的笑容最可愛。',
    date: '2024-07-27',
    link: 'https://photos.app.goo.gl/eRyzoJXVctNSxRZ28'
  },
  '14.png': {
    subtitle: '保齡球道上，傻氣也很可愛。',
    body: '球有點重、姿勢有點笨，但我們笑得很誠實。\n那種不完美的可愛，才是最真的默契。',
    caption: '保齡球新手的笨拙與笑顏，溫馨得剛剛好。',
    date: '2024-09-07',
    link: 'https://photos.app.goo.gl/ykdDiHNNSTfp9b5m7'
  },
  '17.png': {
    subtitle: '撞球桌旁，練習默契的午後。',
    body: '妳握桿時有點靦腆，我在旁邊偷偷幫妳打氣。\n一顆球滾過去，青春也跟著被輕輕點亮。',
    caption: '新手握桿的靦腆與陪伴的溫柔，定格成甜甜回憶。',
    date: '2024-09-15',
    link: 'https://photos.app.goo.gl/b5x9385ehokV814J9'
  },
  '24.jpg': {
    subtitle: '假日花市與單車時光',
    body: '我們騎著腳踏車去假日花市午餐，沿途吹著微風、聊著天。\n花市裡的美食和妳的笑容，讓這個假日變得特別輕快又幸福。',
    caption: '假日花市與單車時光，有妳陪伴的日子最美好。',
    date: '2024-09-22',
    link: 'https://photos.app.goo.gl/u8cyvrB6FjTmm9ro8'
  },
  '36.jpg': {
    subtitle: '旭集生日大餐',
    body: '2024年妳的生日，我們特地去旭集享用高級日式吃到飽。\n每一道料理都很精緻，妳吃得開心，我也覺得很幸福。能在這樣特別的日子陪妳大快朵頤，是我最想給妳的溫柔與儀式感。',
    caption: '旭集生日大餐，妳的笑容比美食更讓人難忘。',
    date: '2024-10-19',
    link: 'https://photos.app.goo.gl/rroSuETACxeXVex4A'
  },
  '10.png': {
    subtitle: '自嘲熊快閃店和吉伊卡哇快閃店，童心直接滿格。',
    body: '妳在自嘲熊快閃店和吉伊卡哇快閃店裡笑得像小朋友，我也跟著幼稚起來。\n那天沒有偉大道理，只有很真實的開心。',
    caption: '和自嘲熊、吉伊卡哇一起合影的瞬間，童心與可愛讓我們一起大笑。',
    date: '2025-01-26',
    link: 'https://photos.app.goo.gl/qxfK7HBQJdenoB5S8'
  },
  '22.jpg': {
    subtitle: '巨城逛街・好想兔',
    body: '一起在巨城逛街，沒想到巧遇好想兔的快閃活動。\n妳和可愛的好想兔合影，笑容比玩偶還要療癒。這種小驚喜，讓平凡的日子變得特別開心。',
    caption: '巨城巧遇好想兔，妳的笑容最可愛。',
    date: '2025-02-02',
    link: 'https://photos.app.goo.gl/EcGEA9NyuBwpYZTi7'
  },
  '11.png': {
    subtitle: '禮拜五下班的晚上，竹北燈會被妳點亮。',
    body: '禮拜五下班的晚上，我們一起走進燈海；燈海很漂亮，但我最常看的還是妳的側臉。\n人潮再多，妳靠近我時世界就安靜了。',
    caption: '燈火點亮夜色，也照亮我們的未來。',
    date: '2025-02-21',
    link: 'https://photos.app.goo.gl/Fk1eDj66jYYw4uWp6'
  },
  '12.png': {
    subtitle: '桃園燈會裡，肩並肩最安心。',
    body: '我們在人群中慢慢走，不趕路也不慌張。\n幸福像晚風一樣，安靜地停在彼此身上。',
    caption: '在人潮中依偎，幸福就是和妳一起走過夜晚。',
    date: '2025-02-22',
    link: 'https://photos.app.goo.gl/8rcaomivS85jsys46'
  },
  '13.png': {
    subtitle: '攀岩牆前，把勇敢練成日常。',
    body: '每抓住一個點，心裡就多一點篤定。\n我在旁邊為妳加油的聲音，讓我一直想再往上。',
    caption: '每一次攀登，都是勇氣與成長的證明。',
    date: '2025-03-15',
    link: 'https://photos.app.goo.gl/QyYnhKCwDfFsNwz39'
  },
  '37.jpg': {
    subtitle: '兩周年紀念日・甜蜜誤會',
    body: '交往兩周年的紀念日，餐廳帳單上竟然寫著「結婚周年招待蛋糕」，讓我忍不住笑了一下。\n雖然只是小小的誤會，卻讓這個紀念日多了一份特別的甜蜜和回憶。',
    caption: '兩周年紀念日，帳單上的「結婚周年」成了最可愛的插曲。',
    date: '2025-04-27',
    link: 'https://photos.app.goo.gl/VnnWLPmHGm6o7gcf6'
  },
  '7.jpg': {
    subtitle: '植樹與巧克力，把今天種進回憶。',
    body: '上午把樹苗放進土裡，下午把甜味收進心裡。\n這種一起實踐又一起享受的日子，最值得珍藏。',
    caption: '泥土與可可香交織成我們的專屬約會。',
    date: '2025-05-17',
    link: 'https://photos.app.goo.gl/gWYbFpK2RoGbMtfs6'
  },
  '6.jpg': {
    subtitle: '霧隱城與大溪老街的雙線約會。',
    body: '和風場景像電影，大溪街道像舊時明信片。\n一整天從甜點到散步，都剛好甜進心裡。',
    caption: '和風氛圍與老街時光，因妳而格外美好。',
    date: '2025-06-28',
    link: 'https://photos.app.goo.gl/QgyhZKSLjwCwVrie9'
  },
  '2.jpg': {
    subtitle: '華山到密室，從藝文走進奇幻。',
    body: '先看展、再解謎，約會像連續兩章冒險小說。\n有妳一起闖關，連緊張都變得好玩。',
    caption: '從華山文創到稻荷之歌，每一刻都溫柔難忘。',
    date: '2025-07-02',
    link: 'https://photos.app.goo.gl/1wgLYSvp7Jkktsm16'
  },
  '1.jpg': {
    subtitle: '北埔綠世界，陽光穿過樹影。',
    body: '林間步道不急不徐，妳的笑比陽光更暖。\n這種自然又安穩的日子，我想和妳一直走下去。',
    caption: '在綠意裡散步，妳的笑容比花還溫柔。',
    date: '2025-07-19',
    link: 'https://photos.app.goo.gl/gCSiy6HMrtrrwjqr8'
  },
  '5.jpg': {
    subtitle: '喜來登生日宴，祝福都在眼神裡。',
    body: '桌上很豐盛，心裡更滿的是被妳照顧的感覺。\n每一句生日快樂，都因妳而更有重量。',
    caption: '燭光與美食之間，最珍貴的是妳的陪伴。',
    date: '2025-08-24',
    link: 'https://photos.app.goo.gl/p1NZ7fkHLjUbbo7V9'
  },
  '3.jpg': {
    subtitle: '大稻埕午後，老街與河風作伴。',
    body: '走在舊街道上，時間像被拉得很長很慢。\n再遇見可愛的自嘲熊，整天都帶著甜甜笑意。',
    caption: '老街時光與可愛展覽，拼成了特別溫柔的一天。',
    date: '2025-09-27',
    link: 'https://photos.app.goo.gl/DCww3eu6ioVjdkru6'
  },
  '4.jpg': {
    subtitle: '跳格子的那天，像回到童年。',
    body: '一格一格往前跳，笑聲也一格一格放大。\n和妳一起幼稚，原來就是最療癒的浪漫。',
    caption: '和妳玩跳格子的午後，像回到最純真的童年。',
    date: '2025-10-05',
    link: 'https://photos.app.goo.gl/nmFQshtq9XqDfTpx7'
  },
  '18.png': {
    subtitle: '王品牛排的生日驚喜時刻。',
    body: '甜點端上來那秒，妳笑得像收到全世界祝福。\n我記住的不是餐點，而是妳眼裡發光的樣子。',
    caption: '妳在生日甜點前的笑容，是那晚最美的燭光。',
    date: '2025-10-19',
    link: 'https://photos.app.goo.gl/2HU8UipwvAVe2Yyf7'
  },
  '19.png': {
    subtitle: '史努比路跑，並肩奔跑的節奏。',
    body: '我們不是為了名次，只是想把今天一起跑完。\n流汗和笑聲混在一起，青春就有了具體形狀。',
    caption: '和妳並肩奔跑，記住這段笑著流汗的青春。',
    date: '2025-11-01',
    link: 'https://photos.app.goo.gl/A8cpWCi23ZWMakUi9'
  },
  '20.png': {
    subtitle: '情人節這天在金日工飾手作工作室，把承諾做成每天都能戴上的戒指。',
    body: '那天是情人節，我們在金日工飾手作工作室，一起把婚戒慢慢打磨成形。\n妳專注的眼神，讓我更確定，往後的每一天都想和妳並肩走下去。',
    caption: '情人節親手做下的這枚日常婚戒，是我們給彼此最踏實的承諾。',
    date: '2026-02-14',
    link: 'https://photos.app.goo.gl/6X34Hy4KCx4EcBd98'
  },
  '21.png': {
    subtitle: '苗栗火車頭園區，把參觀也走成了甜甜的約會。',
    body: '那天我們在苗栗火車頭園區邊走邊看，每一站都留下我們的笑聲。\n有妳在身邊，再普通的參觀行程，也會變成我想一直收藏的回憶。',
    caption: '在苗栗火車頭園區遊玩參觀的這天，我們又把幸福多存了一張。',
    date: '2026-03-14',
    link: 'https://photos.app.goo.gl/1LYKfF4pBc15648W9'
  }
};

const memoryPhotoFiles = Object.keys(photoNarrativeByFile);

const createPhotoNodeId = (index) => `photo-${String(index + 1).padStart(2, '0')}`;

const photoJourneyNodes = Object.fromEntries(
  memoryPhotoFiles.map((image, index) => {
    const id = createPhotoNodeId(index);
    const next = index === memoryPhotoFiles.length - 1 ? 'finale' : createPhotoNodeId(index + 1);
    const narrative = photoNarrativeByFile[image] || {
      subtitle: '這一幕，也收藏著我們的心動。',
      body: '照片會老去，但當下的心情還是很新。\n只要回頭看見妳，故事就會繼續發光。',
      caption: '這張照片，把當天的心動完整保留下來。',
      date: defaultPhotoDate,
      link: ''
    };

    return [
      id,
      {
        id,
        type: 'scene',
        title: '照片旅程｜回憶片段',
        subtitle: narrative.subtitle,
        body: narrative.body,
        memory: {
          image,
          caption: narrative.caption,
          date: narrative.date || defaultPhotoDate,
          link: narrative.link
        },
        next
      }
    ];
  })
);

export const storyGraph = {
  'hero-opening': {
    id: 'hero-opening',
    type: 'hero',
    title: '櫻花開場章',
    subtitle: '春天把思念吹成花雨，故事從這裡正式開始。',
    body: '每一幕都是我們真實走過的日子。',
    next: memoryPhotoFiles.length ? createPhotoNodeId(0) : 'finale'
  },
  ...photoJourneyNodes,
  finale: {
    id: 'finale',
    type: 'finale',
    title: '我們的未來，現在開始',
    subtitle: '所有照片，最後都回到同一個心願。',
    body: '我一直記得上次我們一起去做戒指，妳低頭認真打磨的樣子，到現在想起來還是會心動。\n以前我總是寫寫卡片、送送禮物、做做網頁，想把愛意好好說給妳聽；這一次，我想把心意再往前走一步，準備了屬於我們的專屬戒指盒，裡面放著兩張機票和悄悄規劃的旅遊行程：10/08 從台北飛往大阪，10/13 再一起回來。\n我想把「我愛妳」寫成一段能和妳一起走過的路，從今天開始，去看更大的世界，也把彼此放進更長的未來。',
    memory: {
      image: '20.png',
      caption: '從一起做戒指的那天，到台北與大阪的這趟旅程，我想陪妳把未來一段段走完。',
      date: photoNarrativeByFile['20.png']?.date || defaultPhotoDate,
      link: photoNarrativeByFile['20.png']?.link || ''
    },
    next: 'credits'
  },
  credits: {
    id: 'credits',
    type: 'credits',
    title: '照片仍在延伸',
    body: '謝謝妳，一路走到這裡。\n妳讓我的每一天都有了想奔赴的方向，\n這次我先把承諾放進機票與行程裡，\n等我們從大阪回來，再用更多照片，把我們的故事繼續寫下去。',
    memory: {
      image: '3.png',
      caption: '把第一次在日本的合影，留作我們故事延伸的起點。',
      date: photoNarrativeByFile['3.png']?.date || defaultPhotoDate,
      link: photoNarrativeByFile['3.png']?.link || ''
    }
  }
};



