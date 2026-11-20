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
  notes: {
    title: '이미 아는 사람이 아니라,\n모르는 사람의 관점을 바꾸는 것.',
    paragraphs: [
      'Problem의 목적은 이미 사태를 알고 관심을 가진 팬이나 관심층이 아니라, 정보가 없는 제3자인 대중의 관점을 바꾸는 것이었습니다. 그래서 대중이 한 번쯤 궁금해했을 만한 제목과 썸네일, 인트로를 먼저 설계해 진입 장벽을 낮췄습니다.',
      '전체 구성은 공신력 있는 자료를 바탕으로 이야기의 기승전결을 살렸습니다. 단순한 정보 전달이 아니라 한 편의 다큐멘터리, 한 편의 영화처럼 시작과 끝이 기억에 남도록 만드는 것을 목표로 했습니다.',
      '그렇게 만든 「뉴진스는 왜 사라졌을까」는 조회수 20만 회를 넘겼습니다.',
    ],
  },
  tools: ['CapCut', 'ElevenLabs', 'Vrew'],
  metadata: [{ label: '기간', value: '2025.08 – 2026.01' }],
  links: [{ label: '채널', href: 'https://www.youtube.com/@askhopewonder/videos' }],
  cover: { type: 'video-board', videos: channelVideos, alt: 'Problem 채널의 대표 영상 세 편' },
};
