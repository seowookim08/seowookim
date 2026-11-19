// Facts from the supplied report. Source mapping: docs/memento-content-sources.md.
const screenshot = (file, alt, caption) => ({
  type: 'image', layout: 'app-screen', src: `assets/memento/${file}.jpg`,
  alt, caption, width: 832, height: 1800,
});

export const mementoProject = {
  id: 'project-a', title: '메멘토', theme: 'indigo', layout: 'story',
  indexLabel: '배움 기록 앱', category: 'Web · Android · iOS',
  description: 'SNS에서 콘텐츠를 빠르게 소비하며 생각을 정리하지 못했던 경험에서 출발해 배움 기록·관점 공유 앱 ‘메멘토’를 기획하고 출시했습니다. 자기계발과 배움에 관심 있는 그룹에 앱을 소개해 실제 사용으로 이끌어냈습니다. 사업자등록과 결제 기능 도입을 거쳐 현재는 월간 구독 유료 서비스를 도입하여 운영 중입니다.',
  metadata: [{ label: '기간', value: '2026.06 – 2026.11' }],
  links: [
    { label: '서비스', href: 'https://memento-app.kr/landing' },
    { label: '소개 영상', href: 'https://youtube.com/shorts/POsGrKvNqJo' },
  ],
  cover: {
    type: 'app-gallery',
    screens: [
      { src: 'assets/memento/home.jpg', alt: '메멘토 홈 화면', label: '기록' },
      { src: 'assets/memento/feedback.jpg', alt: '메멘토 관점 화면', label: '관점' },
      { src: 'assets/memento/ritual.jpg', alt: '메멘토 되새김 화면', label: '되새김' },
    ],
    alt: '메멘토의 기록, 관점, 되새김 앱 화면',
    posters: [
      { src: 'assets/memento/app-overview.jpg', alt: '메멘토 앱 소개, 배움 기록, 카드 넘기기, 관점 나누기' },
      { src: 'assets/memento/app-features.jpg', alt: '메멘토의 모임 기록, 콘텐츠 연결, 관점 요청, 지난 기록 되새김 기능' },
    ],
  },
  chapters: [
    {
      id: 'development', label: '문제 발견·시장 검증',
      title: '소셜 미디어의 소비 문제를 발견하고,\n배움 기록 앱을 기획하다.',
      paragraphs: [
        '저는 책과 철학, 음악, 영화를 소개하는 계정을 즐겨 보았습니다. 하지만 원하는 콘텐츠를 찾으려 SNS를 열었다가 자극적인 영상에 빠져 시간을 보내곤 했습니다. 다큐멘터리 《소셜 딜레마》를 보며 앱의 설계가 콘텐츠 소비 방식에 미치는 영향에도 관심을 갖게 되었습니다. 다양한 콘텐츠를 접하고도 정작 원하는 것에 집중하지 못하고, 인상 깊었던 내용을 자기 생각으로 발전시키기 어려웠던 경험에서 문제를 발견했습니다. 콘텐츠를 빠르게 소비하고 지나치는 데 그치지 않고, 인상 깊었던 내용을 기록하며 스스로 생각을 정리하고 되새길 수 있는 공간을 만들고자 했습니다.',
        '사람들이 취향과 경험을 어떻게 기록하고 공유하는지 알아보기 위해 취향 관련 자료와 ‘텍스트 힙’, 독서 굿즈, 경험 소비에 관한 자료를 조사했습니다. 이를 통해 자신의 취향을 표현하고, 일상을 기록하며, 경험을 다른 사람과 나누려는 흐름을 발견했습니다. 이를 바탕으로 일상의 배움과 생각을 기록하고 나누는 서비스에도 사람들이 관심을 가질 것이라는 가설을 세웠습니다.',
        '초기 이용자는 책과 영화, 다양한 활동을 통해 얻은 생각을 나누는 사람들로 설정했습니다. 학생 주도 활동이 활발한 대안학교와 독서·영화·인문학 모임을 중심으로 초기 이용자를 찾고자 했습니다. 실제로 이들과 서비스를 사용하며 기록과 관점 공유 기능이 필요한지 확인하고자 했습니다.',
      ],
      media: screenshot('home', '메멘토의 기록 홈 화면', '배움 기록을 시작하는 메멘토 홈 화면'),
    },
    {
      id: 'feedback', label: '제품 설계·기술 구현',
      title: '사용자 흐름부터 데이터·API까지,\n직접 설계하고 구현하다.',
      paragraphs: [
        'Google AI Studio로 초기 화면을 만들고 GitHub 저장소에 연결한 뒤, Claude와 Figma로 앱을 설계했습니다. 첫 접속에서 기록 작성, 다른 사람의 기록 읽기와 관점 공유로 이어지는 흐름을 구성하고, 기록의 계기와 내용, 공개 범위, 받고 싶은 관점을 입력하는 순서를 정했습니다. 요구사항을 정리해 AI의 도움으로 구현하고 화면과 기능을 다듬었습니다.',
        'Firebase Authentication으로 Google·Kakao 로그인과 출시 준비 단계의 Apple·이메일 로그인을 구현했습니다. Firestore에는 사용자 프로필과 기록을 저장했습니다. 책은 카카오 검색, 영화는 KMDb, 음악은 Spotify API와 연결해 작품 제목과 표지를 기록에 불러오도록 했습니다.',
        'AI 코치와 되새김 질문에는 OpenAI API를 사용했습니다. 외부 서비스 요청은 Firebase Cloud Functions를 거치도록 구성하고 API 키를 서버에 보관해 앱 코드에 노출되지 않게 했습니다. AI 호출 횟수도 사용자별로 제한해 기능 구현과 함께 보안, 운영 비용을 고려했습니다. Cloudflare Pages에 웹을 배포하고 랜딩 페이지, 개인정보 처리방침과 이용약관도 마련했습니다.',
      ],
      media: { type: 'memento-diagram', alt: '메멘토 앱과 Firebase, 작품 검색 및 AI API 연결 구조', caption: '앱·데이터베이스·외부 API 연결 구조' },
    },
    {
      id: 'release', label: '사용성 개선·서비스 운영',
      title: '사용자 피드백으로 기능을 다듬고,\n서비스 운영까지 연결하다.',
      paragraphs: [
        'IT 스타트업에서 7회 멘토링을 받았습니다. Use Case로 정상 흐름과 예외 상황을 정리하고, IA와 와이어프레임으로 화면 구조와 사용자 흐름을 구체화했습니다. 패딩 피드백을 반영하고 색상·글자·간격의 디자인 시스템을 적용해 화면마다 달랐던 기준을 정리했습니다.',
        '학교 종례와 교회 소모임에서 앱을 사용하며 흐름을 관찰했습니다. 되새김 질문에 짧게만 답하는 모습을 보고, 빈칸부터 쓰는 부담을 줄이도록 객관식 답변 뒤에 생각을 이어 쓰게 개선했습니다. 관점 수정 요청에는 작성 후 5분 안에 삭제할 수 있도록 바꾸고 서버에도 같은 조건을 적용했습니다.',
        '처음에는 새로운 기록을 보여줄 탐색 탭을 이틀간 개발했지만, 처음 사용한 사람들은 온보딩과 탭 구성이 복잡하다고 했습니다. 탐색 기능과 관련 데이터베이스 규칙을 제거하고 기록 탭과 온보딩을 단순화했습니다. 이후 사용성 개선 반응을 확인했습니다. AI 코치는 결론을 대신 내리지 않고 질문으로 생각을 돕도록 설계했습니다.',
        '결제 기능을 도입하고 Android와 App Store 심사를 준비했습니다. Apple 로그인 버튼의 대비를 수정해 재제출한 뒤 Android와 App Store에서 앱 심사를 통과했습니다.',
      ],
      milestones: [
        { date: '2026.09.17', text: '사업자등록' },
        { date: '2026.10.08', text: 'App Store 첫 심사 통과' },
      ],
      links: [
        { label: 'App Store', href: 'https://apps.apple.com/kr/app/id6815112443' },
        { label: 'Google Play', href: 'https://play.google.com/store/apps/details?id=kr.memento.app' },
      ],
      media: screenshot('feedback', '메멘토의 관점 화면', '관점을 나누는 화면'),
    },
  ],
};

export const sportsMiniProject = {
  title: '오늘의 운동회 증명사진', category: '연합 체육대회 웹',
  url: 'https://mindlegame.pages.dev',
  description: '9개 질문에 답하고 사진을 찍으면 자신의 유형을 담은 증명사진을 받는 웹사이트.',
  details: '지역 대안교육기관 연합 체육대회 부스를 위해 기획·개발했습니다. 결과 화면에는 잘 맞는 유형의 다른 학교 친구들을, 부스 노트북에는 학교별·전체 유형 통계를 보여주어 학생들이 서로 말을 걸 계기를 만들었습니다.',
};
