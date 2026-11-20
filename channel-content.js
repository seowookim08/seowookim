// Ownership supplied by Seowoo Kim. Public video metadata checked 2026-11-15.
export const channelVideos = [
  {
    id: '-7iSykqzDj8', title: '뉴진스는 왜 사라졌을까',
    thumbnail: 'assets/problem/disappear.avif', duration: '19분 40초', views: 200221,
    url: 'https://www.youtube.com/watch?v=-7iSykqzDj8',
  },
  {
    id: 'LOFTTClopBg', title: '민희진 기자회견 총정리｜뉴진스 탬퍼링 논란, 타임라인으로 다시 보기',
    thumbnail: 'assets/problem/timeline.avif', duration: '13분 4초', views: 13867,
    url: 'https://www.youtube.com/watch?v=LOFTTClopBg',
  },
  {
    id: '8W5plY1YYu8', title: '“우리는 누구든 매장할 수 있어”',
    thumbnail: 'assets/problem/bury-anyone.jpg', duration: '21분 16초', views: 44890,
    url: 'https://www.youtube.com/watch?v=8W5plY1YYu8',
  },
];

export const channelProject = {
  id: 'project-b', title: 'Problem', theme: 'lemon', layout: 'films',
  indexLabel: '유튜브 채널 · 최고 조회 20만 회', category: 'YouTube',
  description: '사회 이슈를 둘러싼 정보의 불균형에 문제를 느껴, 「뉴진스는 왜 사라졌을까」를 제작했습니다. 전하고 싶었던 이야기를 다룬 후에는 조회수만을 위해 콘텐츠를 만들고 싶지 않아 추가적인 영상 게시는 멈춘 상태입니다. 채널 운영과 모든 영상의 기획·제작·편집·녹음을 맡았습니다.',
  tools: ['CapCut', 'ElevenLabs', 'Vrew'],
  metadata: [{ label: '기간', value: '2025.08 – 2026.01' }],
  links: [{ label: '채널', href: 'https://www.youtube.com/@askhopewonder/videos' }],
  cover: { type: 'video-board', videos: channelVideos, alt: 'Problem 채널의 대표 영상 세 편' },
};
