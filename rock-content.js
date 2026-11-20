// Scope and historical peaks supplied by Seowoo Kim.
// Public images checked 2026-11-14. These examples are not identified as the peak reel.
export const rockPosts = [
  { kind: '매거진', src: 'assets/wonderwall/magazine-oasis.jpg', alt: '원더월 월간 오아시스 4월 매거진 표지', width: 932, height: 933, url: 'https://www.instagram.com/p/C6PhAJ6SFfK/?img_index=10' },
  { kind: '릴스', src: 'assets/wonderwall/reel-DGhPVY6BVzK.jpg', alt: '라디오헤드가 바라봤던 미래와 현재에 대해 — 직접 편집한 원더월 릴스 커버', width: 427, height: 756, url: 'https://www.instagram.com/reel/DGhPVY6BVzK/' },
  { kind: '릴스', src: 'assets/wonderwall/reel-C0gHz0NyYMV.jpg', alt: '직접 편집한 원더월 공연 영상 릴스 커버', width: 1080, height: 1920, url: 'https://www.instagram.com/reel/C0gHz0NyYMV/' },
];

export const rockProject = {
  id: 'project-c', title: 'Wonderwall', theme: 'pearl', layout: 'magazine',
  indexLabel: '인스타그램 매거진 · 달력·티셔츠 제작', category: 'Instagram',
  description: '해외 록을 다룬 Instagram 매거진. 계정을 운영하며 게시물을 발행하고, 릴스는 커버와 영상 편집을 직접 했습니다. 직접 편집한 릴스 한 편은 조회수 193만 회를 기록했고, 매거진을 통해 모인 록 팬들이 교류할 수 있도록 디스코드 서버와 오픈채팅방을 운영했습니다.',
  tools: ['CapCut', 'Photoshop', 'MiriCanvas'],
  metadata: [{ label: '기간', value: '2023.12 – 2025.03' }],
  links: [{ label: '매거진', href: 'https://www.instagram.com/wonderwall_withrock/' }],
  stats: {
    items: [
      { label: '팔로워', value: '3,000+', unit: '명' },
      { label: '릴스 최고 조회수', value: '193만', unit: '회' },
    ],
    note: '팔로워와 릴스 조회수 모두 2025.03 기준입니다.',
  },
  cover: { type: 'rock-gallery', posts: rockPosts, alt: '원더월의 매거진 게시물과 직접 편집한 릴스 예시' },
  extensions: [{
    title: '티셔츠 제작과 판매',
    post: { src: 'assets/wonderwall/tshirt-promotion.jpg', alt: '원더월 티셔츠 판매 홍보 게시물', width: 1080, height: 1080, url: 'https://www.instagram.com/p/C-KTJw7yLBW/?img_index=1' },
    text: '매거진 운영과 함께 티셔츠를 직접 만들어 판매했습니다. 디지털 콘텐츠에서 실제로 입을 수 있는 제품으로 작업을 확장했습니다.',
  }, {
    title: '락스타 달력 디자인·공유',
    text: '3월부터 12월까지 매달 달력을 직접 디자인해 사람들에게 공유하는 고정 콘텐츠를 진행했습니다.',
    calendars: [
      { src: 'assets/wonderwall/calendars/radiohead.png', label: 'Radiohead', alt: 'Radiohead를 주제로 디자인한 3월 달력' },
      { src: 'assets/wonderwall/calendars/queen.png', label: 'Queen', alt: 'Queen을 주제로 디자인한 3월 달력' },
      { src: 'assets/wonderwall/calendars/oasis.jpg', label: 'Oasis', alt: 'Oasis를 주제로 디자인한 3월 달력' },
      { src: 'assets/wonderwall/calendars/nirvana.png', label: 'Nirvana', alt: 'Nirvana를 주제로 디자인한 3월 달력' },
    ],
  }],
};
