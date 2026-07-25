# Hesed Art Academy 링크형 홈페이지

새 HESED 로고의 크림·딥그린 색상에 맞춰 전체 분위기를 다시 구성한 모바일 우선 반응형 정적 홈페이지입니다.

## 변경된 디자인

- 상단 `.wordmark` 텍스트를 새 로고 이미지로 교체
- 기존 핑크·레드 색상을 크림·딥그린 계열로 변경
- 카드 아이콘을 하트형에서 타원형 미니 인장 스타일로 변경
- 카드, 예약창, 하단 빠른 메뉴의 버튼과 포커스 색상 통일
- 모바일 화면에서도 로고가 자연스럽게 보이도록 자동 크롭 적용

## 파일 구성

- `index.html`: 기본 홈페이지
- `style.css`: 전체 디자인
- `script.js`: 예약, 전화, 공유 기능
- `assets/hesed-wordmark.webp`: 새 HESED 로고
- `index-single.html`: 이미지·CSS·JavaScript를 한 파일에 포함한 버전

## 가장 먼저 수정할 곳

`script.js` 상단의 `CONFIG`만 수정하면 됩니다.

```js
const CONFIG = {
  phone: "050712345678",
  kakaoUrl: "https://pf.kakao.com/_yqLIn",
  blogUrl: "https://blog.naver.com/hesed_art",
  mapUrl: "https://naver.me/FY3UM7Fq",
  formEndpoint: ""
};
```

- `phone`: 0507 안심번호를 포함해 하이픈 없이 입력
- `formEndpoint`: Formspree 폼 주소가 있으면 입력. 비워 두면 예약 내용을 복사한 뒤 카카오톡으로 이동

## 실행 방법

폴더 안의 `index.html`을 더블클릭하면 바로 확인할 수 있습니다.

로컬 서버로 확인하려면:

```bash
python -m http.server 8000
```

그 후 브라우저에서 `http://localhost:8000`으로 접속합니다.
