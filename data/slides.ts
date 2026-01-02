import { Slide } from '../types';

export const defaultSlides: Slide[] = [
  {
    id: 'slide-1',
    type: 'intro',
    title: 'LinkedIn 經營攻略',
    subtitle: '履歷被看見！打造你的數位莊園',
    author: 'Robin Hsu',
    items: [
      { id: 'i1', content: '數據真相' },
      { id: 'i2', content: '被動求職' },
      { id: 'i3', content: '流量密碼' },
      { id: 'i4', content: '冠軍思維' }
    ],
    footer: '2026 LinkedIn Strategy'
  },
  {
    id: 'slide-2',
    type: 'agenda',
    title: 'Agenda',
    items: [
      { id: 'a1', title: '01 思維重塑 (Mindset Shift)', content: '紅海 vs 藍海，為什麼 99% 的人都在做白工？' },
      { id: 'a2', title: '02 門面優化 (Profile Optimization)', content: '決策者視角：如何通過黃金六秒的考驗？' },
      { id: 'a3', title: '03 人脈佈局 (Networking Strategy)', content: '破解 80% 隱藏市場：校友、弱連結與主動出擊。' },
      { id: 'a4', title: '04 內功心法 (The Inner Game)', content: '頂尖人才的社交貨幣、自我投資、OMO線上+線下連結。' }
    ],
    footer: '2026 LinkedIn Strategy'
  },
  {
    id: 'slide-3',
    type: 'concept',
    title: '為什麼你需要 LinkedIn ?',
    subtitle: '模組一：思維重塑',
    content: 'Q: 你認為 LinkedIn 和 104/人力銀行最大的差別是什麼？\n104 是「比價」的紅海 (靜態)；LinkedIn 是「價值談判」的藍海 (動態)。',
    items: [
      { id: 'c1', title: '1', content: '莊園理論：傳統求職是打獵 (餓了才去狩獵)；LinkedIn 是經營莊園 (系統性的培育、灌溉、繁衍... 永續耕耘豐富的資源！' },
      { id: 'c2', title: '2', content: 'PR99原則：99%的認為它是靜態履歷；頂尖的Top1將它視為24小時曝光的舞台/自我品牌。' },
      { id: 'c3', title: '3', content: '隱藏市場：80% 的好職缺未公開，是透過「人脈」、被(獵頭)搜尋」成交的。' }
    ],
    footer: '2026 LinkedIn Strategy'
  },
  {
    id: 'slide-4',
    type: 'concept',
    title: '2026 三大關鍵趨勢',
    subtitle: '模組一：思維重塑',
    items: [
      { id: 't1', icon: 'image', title: '圖片、影音優先', content: '演算法與眼球都愛視覺化的真實感，一定要圖文並茂 (影片更加分)。' },
      { id: 't2', icon: 'heart', title: '真實性', content: '不要只寫 Job Description，要寫你的掙扎、失敗與成長故事。' },
      { id: 't3', icon: 'bot', title: 'AI是你的職涯副駕駛', content: '善用各式AI收集素材，提升質量，但是一定要有個人觀點，空泛的廢文會被降權。' }
    ],
    footer: '2026 LinkedIn Strategy'
  },
  {
    id: 'slide-5',
    type: 'concept',
    title: '決策者視角：黃金六秒法則',
    subtitle: '模組二：黃金檔案優化',
    content: 'Q: 當我打開你的 Profile，我只花 6 秒決定是否聯繫。我看哪裡？\nHeadline(技能/關鍵字)、產業/職能經歷(相關性)、照片 (專業/信任感)。',
    image: 'https://picsum.photos/800/200', // Placeholder for the formula image
    footer: '2026 LinkedIn Strategy'
  },
  {
    id: 'slide-6',
    type: 'outro', // Using outro for a simple list view
    title: '關於我 (About) 的寫作策略',
    subtitle: '模組二：黃金檔案優化',
    items: [
      { id: 'o1', content: '不要寫：我是誰，我做了什麼' },
      { id: 'o2', content: '要寫：我能解決誰的痛苦' },
      { id: 'o3', content: '技巧：埋入 JD (Job Description) 關鍵字以利 SEO' },
      { id: 'o4', content: '結構：Hook (鉤子) → Story (職涯故事) → Achievement (量化數據) → CTA (互動性)' }
    ],
    footer: '2026 LinkedIn Strategy'
  },
  {
    id: 'slide-7',
    type: 'resource',
    title: '現在就建立連結！',
    items: [
      { id: 'r1', title: 'Robin Hsu', content: '電商總監 & 職涯教練' },
      { id: 'r2', title: 'LinkedIn Profile', content: 'https://www.linkedin.com/in/robin-hsu-example' }
    ],
    footer: '2026 LinkedIn Strategy'
  }
];