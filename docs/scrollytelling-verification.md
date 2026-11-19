# Personal Assembly — Scrollytelling 검증

## 정적 검사와 제공

- `npm run check`: JavaScript 7개 파일 문법 검사 성공.
- 새 진입 화면, 4개 story 모듈·스타일 파일, 3개 개별 프로젝트 주소, 이전 비교 페이지와 새 스크린샷: HTTP 200.
- JPEG 스크린샷의 응답 형식: `image/jpeg`.
- 새 런타임 의존성 없음.

## 브라우저 검증

- 1440px: Hero, 상세 장, 고정 미디어와 본문 구도 확인. 가로 넘침 없음.
- 1920px: 개별 케이스 스터디 가로 넘침 없음. 시각 자료 약 995px, 본문 최대 560px 폭 확인.
- 390px: 고정 미디어를 숨기고 각 장의 시각 자료를 본문에 표시하는 읽기 구조 확인. 가로 넘침 없음.
- 320px: 3개 프로젝트, 총 12개 장이 표시되고 전체 문서 가로 넘침 없음.
- 목차에서 문제·의사결정·배경 장으로 이동하고, 해당 장의 미디어·라벨·현재 목차 표시가 바뀜을 확인.
- PageDown으로 실제 스크롤 후 미디어가 다음 장에 맞춰 바뀜을 확인.
- 데스크톱과 모바일의 미디어 확대 모달 표시, Escape로 닫기, 호출 버튼으로 포커스 복귀 확인.
- `?project=project-a`: 프로젝트 하나와 단일 h1 제목 표시 확인.
- 없는 프로젝트를 요청하면 안내문과 전체 프로젝트 표시 확인.
- `directions.html#personal`: 이전 다섯 방향 비교의 Personal Assembly 표시 확인.
- 검사한 브라우저 콘솔에 error/warn 로그 없음.

## 캡처

- `previews/selected-hero.jpg`: 1440px Hero.
- `previews/selected-story.jpg`: 1440px 의사결정 장.
- `previews/selected-wide.jpg`: 1920px 배경 장.
- `previews/selected-mobile.jpg`: 390px 읽기 화면.

## 검증 범위

실제 프로젝트 내용과 미디어를 추가하기 전의 디자인 시안입니다. 이미지·영상 데이터 경로와 실제 메일 주소는 아직 연결하지 않았으므로 해당 실제 자료의 로딩과 재생 검증은 포함하지 않습니다. reduced-motion 처리는 코드에서 확인했으며 운영체제 설정을 변경하는 검증은 수행하지 않았습니다.
