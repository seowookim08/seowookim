# Seowoo Kim — Portfolio

05 Personal Assembly의 색감과 타이포그래피를 유지하며, 실제 작업 중심으로 편집한 포트폴리오입니다. Node.js 기본 모듈과 HTML/CSS/ES modules만 사용합니다. 의존성 설치는 필요 없습니다. https://seowookim08.github.io/ 로 배포되어 있습니다.

```sh
npm run dev
npm run check
```

[미리보기](http://127.0.0.1:4173/) · [메멘토](http://127.0.0.1:4173/?project=project-a) · [Problem](http://127.0.0.1:4173/?project=project-b) · [Wonderwall](http://127.0.0.1:4173/?project=project-c)

## 화면 구성

이름과 프로젝트 선택 → 메멘토 → Problem → Wonderwall → 오늘의 운동회 증명사진 → About → 실제 외부 링크.

첫 화면은 이름이 픽셀 더미로 흩어져 있다가 왼쪽에서 오른쪽으로 자리를 잡고, 이어서 소개 문구와 Work 카드가 시차를 두고 올라옵니다(약 1.7초). 동작 줄이기 설정에서는 애니메이션 없이 완성된 화면을 바로 보여줍니다.

- 메멘토: 넓은 앱 표지와 기획·구현 / 사용자 피드백 / 선택·출시의 세 장. 데스크톱에서는 시각 자료가 고정되고 본문 스크롤에 맞춰 바뀝니다.
- Problem: 모든 영상의 기획·제작·편집·녹음 기여를 한 번 설명하고 대표 영상 세 편을 보여줍니다. 각 영상은 YouTube로 연결합니다.
- Wonderwall: 운영 당시 최고 기록(릴스 193만 회, 팔로워 3,000명 이상)을 한 번 표시합니다. 실제 게시물과 릴스 예시, 티셔츠 제작·판매 경험을 담습니다. 예시 릴스를 최고 조회수 릴스로 특정하지 않습니다.
- 작은 프로젝트는 펼쳐 읽는 카드 하나로 구성합니다.
- About에는 짧은 자기소개와 기술 스택과 도구, 가치관, 영향을 받은 책을 담습니다.

820px 이하 또는 높이 600px 이하에서는 각 장의 이미지를 본문 앞에 펼칩니다. 스크롤을 가로채지 않으며, 미디어 확대·Escape 닫기·포커스 복귀·목차 이동·동작 줄이기 설정을 지원합니다.

## 콘텐츠 교체

| 파일 | 내용 |
| --- | --- |
| `story-content.js` | 이름, 첫 화면 한 줄 소개(`introduction`·`introductionDetail`), About, 이메일, 외부 링크, 프로젝트 순서 |
| `memento-content.js` | 메멘토 설명·세 장·화면·출시 이력·작은 프로젝트 |
| `channel-content.js` | Problem 설명·대표 영상 |
| `rock-content.js` | Wonderwall 설명·최고 기록·게시물·티셔츠 활동 |
| `story.js` | 공통 화면 렌더링과 스크롤·확대 보기 동작 |
| `pixel-home.js` | 첫 화면의 픽셀 타이틀·배경 캔버스와 인트로 모션 |
| `story.css` | 전체 레이아웃·반응형·공통 인터페이스 |
| `project-media.css`, `channel.css`, `rock.css` | 프로젝트별 시각 자료 |

프로젝트의 `layout`은 `story`, `films`, `magazine` 중 하나를 사용합니다. 긴 사례는 `chapters`에 제목·본문·미디어를 추가하면 됩니다. 강조 박스나 요약 목록을 강제로 만들지 않습니다. 이미지가 없는 빈 영역을 생성하지 않습니다.

일반 미디어 형식:

```js
{
  type: 'image',
  src: 'assets/project/image.webp',
  alt: '이미지 내용',
  caption: '짧은 설명',
  width: 1200,
  height: 850,
}
```

`type: 'video'`는 `src`, `poster`, `alt`를 사용합니다. 사용자 컨트롤을 제공하며 자동 재생하지 않습니다. `profile.about`은 홈의 About 섹션에, `profile.email`은 값이 있는 경우 푸터에 표시됩니다.

실제 화면과 썸네일은 `assets/`에 로컬로 저장되어 있습니다.

메타 설명과 Open Graph 제목·공유 이미지는 현재 콘텐츠에 맞췄습니다(`assets/share-card.jpg`, 1200×630). `index.html`에는 canonical 주소가 있고, `robots.txt`와 `sitemap.xml`로 검색 노출을 열어 두었습니다. 이전 디자인 시안과 내부 문서는 저장소에서 정리했고 이전 커밋 이력에만 남아 있습니다.
