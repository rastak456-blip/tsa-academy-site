# TSA Academy Site

## 파일 구조

- `src/partials/site-header.html`: TSA 홈페이지 공통 헤더
- `src/partials/family-header.html`: Talkstation 브랜드 소개 페이지 헤더
- `src/partials/site-footer.html`: 공통 푸터
- `src/pages/`: 페이지별 HTML 소스
- `tools/build-site.mjs`: 공통 영역을 조합하는 빌드 파일
- `tools/serve.mjs`: `dist/`를 로컬에서 확인하는 미리보기 서버
- `dist/`: Netlify 배포 결과

## 교육과정 메뉴 구조

Curriculum 메뉴는 2단계로 구성합니다. ESL 과정과 IELTS 과정은 상위 메뉴에 마우스를 올리면 세부 과정이 펼쳐집니다.

- 전체 과정 안내: `curriculum-overview.html`
- ESL 과정: `curriculum-esl.html`
  - Regular ESL: `curriculum-esl-regular.html`
  - Regular+ ESL: `curriculum-esl-regular-plus.html`
  - Intensive Speaking: `curriculum-esl-intensive.html`
  - Power Speaking: `curriculum-esl-power.html`
- IELTS 과정: `curriculum-ielts.html`
  - Pre-IELTS: `curriculum-ielts-pre.html`
  - Regular IELTS: `curriculum-ielts-regular.html`
  - IELTS Guarantee: `curriculum-ielts-guarantee.html`
- 레벨 시스템: `curriculum-levels.html`

메뉴에 페이지를 추가하거나 뺄 때는 `src/partials/site-header.html`과 `tools/build-site.mjs`의 `menuGroups.curriculum` 목록을 함께 수정합니다.

`curriculum-speaking.html`, `curriculum-special.html`, `curriculum-junior.html`은 파일로 남아 있지만 현재 메뉴에서는 제외되어 있습니다.

## 다국어 처리

페이지 본문은 영어로 작성하고, 한국어 문구는 `script.js` 상단의 `koreanTranslations` 목록에 원문과 번역을 짝으로 추가합니다. 목록에 없는 문구는 한국어 화면에서도 영어 원문 그대로 표시됩니다.

## 수정 방법

헤더 또는 푸터를 변경할 때는 `src/partials/`의 파일만 수정합니다. 페이지 본문은 `src/pages/`에서 수정합니다.

```powershell
npm run build
```

빌드하면 기존 미리보기 경로와 `dist/`가 함께 갱신됩니다. Netlify는 `netlify.toml` 설정에 따라 `dist/`를 배포합니다.

## 제휴 문의 접수

- 입력 페이지: `src/pages/pages/partnership-inquiry.html`
- 접수 완료 페이지: `src/pages/pages/partnership-thank-you.html`
- Netlify 프로젝트에서 Forms 감지를 활성화한 뒤 다시 배포해야 실제 문의가 저장됩니다.
- 배포 후 접수 내용은 Netlify의 Forms 메뉴에서 확인합니다.
- 보안 확인 화면은 로컬 파일이 아니라 Netlify에 배포된 페이지에서 표시됩니다.
