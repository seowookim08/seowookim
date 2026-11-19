# Seowoo Kim — Portfolio

05 Personal Assembly의 색감과 타이포그래피를 유지하며, 실제 작업 중심으로 편집한 포트폴리오입니다. Node.js 기본 모듈과 HTML/CSS/ES modules만 사용합니다. 의존성 설치는 필요 없습니다.

```sh
npm run dev
npm run check
```

[미리보기](http://127.0.0.1:4173/) · [메멘토](http://127.0.0.1:4173/?project=project-a) · [Problem](http://127.0.0.1:4173/?project=project-b) · [Wonderwall](http://127.0.0.1:4173/?project=project-c)

## 화면 구성

이름과 프로젝트 선택 → 메멘토 → Problem → Wonderwall → 오늘의 운동회 증명사진 → About → 실제 외부 링크.

- 메멘토: 넓은 앱 표지와 기획·구현 / 사용자 피드백 / 선택·출시의 세 장. 데스크톱에서는 시각 자료가 고정되고 본문 스크롤에 맞춰 바뀝니다.
- Problem: 모든 영상의 기획·제작·편집·녹음 기여를 한 번 설명하고 대표 영상 세 편을 보여줍니다. 각 영상은 YouTube로 연결합니다.
- Wonderwall: 운영 당시 최고 기록(릴스 193만 회, 팔로워 3,000명 이상)을 한 번 표시합니다. 실제 게시물과 릴스 예시, 티셔츠 제작·판매 경험을 담습니다. 예시 릴스를 최고 조회수 릴스로 특정하지 않습니다.
- 작은 프로젝트는 펼쳐 읽는 카드 하나로 구성합니다.
- About에는 짧은 자기소개와 기술 스택과 도구, 가치관, 영향을 받은 책을 담습니다.

820px 이하 또는 높이 600px 이하에서는 각 장의 이미지를 본문 앞에 펼칩니다. 스크롤을 가로채지 않으며, 미디어 확대·Escape 닫기·포커스 복귀·목차 이동·동작 줄이기 설정을 지원합니다.

## 콘텐츠 교체

| 파일 | 내용 |
| --- | --- |
| `story-content.js` | 이름, 짧은 소개, About, 이메일, 외부 링크, 프로젝트 순서 |
| `memento-content.js` | 메멘토 설명·세 장·화면·출시 이력·작은 프로젝트 |
| `channel-content.js` | Problem 설명·대표 영상 |
| `rock-content.js` | Wonderwall 설명·최고 기록·게시물·티셔츠 활동 |
| `story.js` | 공통 화면 렌더링과 스크롤·확대 보기 동작 |
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

실제 화면과 썸네일은 `assets/`에 로컬로 저장되어 있습니다. 소스 기록은 `docs/*-content-sources.md`, 이번 편집 방향은 `docs/2026-11-15-edit-design.md`, 검증 기록은 `docs/2026-11-15-redesign-verification.md`에 있습니다. `previews/redesign-*.png`는 새 화면의 브라우저 캡처입니다.

초기 다섯 방향 비교와 이전 시안은 `directions.html`, `studio.*`, `prototype.*`, `content.js`, `story-art.js`에 보존되어 있습니다. 현재 페이지에서는 연결하지 않습니다.

메타 설명과 Open Graph 제목은 현재 콘텐츠에 맞췄습니다. 공개 도메인 확정 전이므로 `noindex,nofollow`는 유지합니다. 배포 시 canonical 주소와 공유 이미지를 추가하고 검색 제외 설정을 해제합니다.
