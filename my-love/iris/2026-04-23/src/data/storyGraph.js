const memoryPhotoFiles = [
  '1.jpg', '1.png', '2.jpg', '2.png', '3.jpg', '3.png', '4.jpg', '4.png', '5.jpg', '5.png',
  '6.jpg', '6.png', '7.jpg', '7.png', '8.png', '9.png', '10.png', '11.png', '12.png', '13.png',
  '14.png', '15.png', '16.png', '17.png', '18.png', '19.png'
];

const frameSubtitles = [
  '把心動放進底片裡。',
  '平凡日子也能閃閃發亮。',
  '一路走來，都是我們的記號。',
  '每次回看，都更喜歡彼此。'
];

const createPhotoNodeId = (index) => `photo-${String(index + 1).padStart(2, '0')}`;

const photoJourneyNodes = Object.fromEntries(
  memoryPhotoFiles.map((image, index) => {
    const id = createPhotoNodeId(index);
    const next = index === memoryPhotoFiles.length - 1 ? 'finale' : createPhotoNodeId(index + 1);

    return [
      id,
      {
        id,
        type: 'scene',
        title: '照片旅程｜回憶片段',
        subtitle: frameSubtitles[index % frameSubtitles.length],
        body:
          index === 0
            ? '從這張照片開始，我們把故事一幕一幕走完。\n慢慢往下走，會看到每個時刻如何連成一條溫柔的時間線。'
            : '這一幕收著我們當時的笑與心跳。\n每張照片都在提醒我，幸福其實一直都在身邊。',
        memory: {
          image,
          caption: '這一幕，把當天的光與心情都留了下來。'
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
    body: '這次不分岔，但每次旅程的照片順序都會重新編排。\n每一幕都是我們真實走過的日子。',
    next: 'intro'
  },
  intro: {
    id: 'intro',
    type: 'intro',
    title: '照片旅程起點',
    subtitle: '把所有照片隨機串成同一條愛的路線。',
    body: '每次進入這段旅程，照片都會以不同順序展開，且同一輪不重複。\n好好看見我們的每個瞬間，並把它們串成完整故事。',
    memory: {
      image: memoryPhotoFiles[0],
      caption: '旅程從第一張照片開始。'
    },
    next: createPhotoNodeId(0)
  },
  ...photoJourneyNodes,
  finale: {
    id: 'finale',
    type: 'finale',
    title: '旅程終章',
    subtitle: '所有照片，最後都回到同一個答案。',
    body: '謝謝妳和我一起把這條照片長卷走完。\n每一幕都在說同一句話：有妳在，平凡也會發光。',
    memory: {
      image: memoryPhotoFiles[memoryPhotoFiles.length - 1],
      caption: '最後一幕，不是結束，而是下一段旅程的開始。'
    },
    next: 'credits'
  },
  credits: {
    id: 'credits',
    type: 'credits',
    title: '照片仍在延伸',
    body: '謝謝妳走到最後。\n下一次打開這頁時，我們會有更多新照片，繼續把故事寫下去。',
    memory: {
      image: '8.png',
      caption: '留一張花影作為下次旅程的約定。'
    }
  }
};
