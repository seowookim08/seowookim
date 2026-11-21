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
  indexLabel: '유튜브 영상 기획·편집 · 총 조회 32만 회', category: 'YouTube',
  description: '사건을 처음 접하는 사람도 경과를 따라갈 수 있도록 자료를 조사하고 영상의 순서를 구성했습니다. 채널의 기획·편집·녹음을 맡았고, 대표 영상 「뉴진스는 왜 사라졌을까」는 조회수 20만 회를 넘겼습니다.',
  notes: {
    title: '처음 보는 시청자를 위한 편집',
    paragraphs: [
      '사건을 얼마나 알고 있는지에 따라 같은 장면도 다르게 보인다고 생각했습니다. 시청자가 처음 품을 질문을 제목과 썸네일에 담고, 도입부에서 그 질문에 필요한 맥락을 설명했습니다.',
    ],
  },
  extension: {
    title: 'PROTECT THEM - 3D 팬아트 아카이브',
    text: '팬들이 남긴 이미지와 메시지를 3D 우주 속 별처럼 모아 함께 살펴볼 수 있는 디지털 아카이브입니다. 팬들이 각자의 작품을 별 하나로 보태고 다른 사람의 작품도 둘러볼 수 있는 웹 공간을 만들었습니다.',
    image: { src: 'assets/problem/protect-them.png', alt: '팬들의 이미지가 별처럼 모여 있는 PROTECT THEM 3D 아카이브 화면' },
    url: 'https://protectnjz.pages.dev',
  },
  tools: ['CapCut', 'ElevenLabs', 'Vrew'],
  metadata: [{ label: '기간', value: '2025.08 – 2026.01' }],
  links: [{ label: '채널', href: 'https://www.youtube.com/@askhopewonder/videos' }],
  cover: { type: 'video-board', videos: channelVideos, alt: 'Problem 채널의 대표 영상 세 편' },
};
