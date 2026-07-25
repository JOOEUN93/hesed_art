# Hesed Art Academy 링크형 홈페이지

기존 Linktree 화면의 분위기를 살려 만든 모바일 우선 반응형 정적 홈페이지입니다.

## 포함 기능

- 기존 링크 페이지와 유사한 핑크 배경, 카드형 메뉴, 로고 스타일
- 사전예약 모달 폼
- 전화 바로 연결
- 카카오톡 채널, 네이버 블로그, 오시는 길 연결
- 모바일 하단 고정 빠른 메뉴
- 공유 버튼(Web Share API, 미지원 시 주소 복사)
- Formspree 등 외부 폼 수신 서비스 연동 가능

## 가장 먼저 수정할 곳

`script.js` 상단의 `CONFIG`만 수정하면 됩니다.

```js
const CONFIG = {
  phone: "050714618584",
  kakaoUrl: "https://pf.kakao.com/_yqLIn",
  blogUrl: "https://blog.naver.com/hesed_art",
  mapUrl: "https://naver.me/FY3UM7Fq",
  formEndpoint: ""
};
```

- `phone`: 하이픈 없이 실제 전화번호 입력
- `formEndpoint`: Formspree 폼 주소가 있으면 입력. 비워 두면 예약내용을 복사한 뒤 카카오톡으로 이동

## 실행 방법

폴더 안의 `index.html`을 더블클릭하면 바로 확인할 수 있습니다.

로컬 서버로 확인하려면:

```bash
python -m http.server 8000
```

그 후 브라우저에서 `http://localhost:8000`으로 접속합니다.

## 무료 배포

GitHub Pages, Netlify, Cloudflare Pages 중 한 곳에 이 폴더를 업로드하면 됩니다.
