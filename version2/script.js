/*
 * 헤세드 ART 링크 페이지 설정
 * 아래 CONFIG 값만 수정하면 전화번호·외부 링크·예약 전송 방식을 바꿀 수 있습니다.
 */
const CONFIG = {
  // 전화 연결을 사용하려면 실제 번호로 바꿔 주세요. 예: "01012345678"
  phone: "050714618584",
  kakaoUrl: "https://pf.kakao.com/_AnxoxaG",
  blogUrl: "https://blog.naver.com/hesed_art",
  mapUrl: "https://naver.me/FY3UM7Fq",

  // Formspree 등 폼 수신 주소가 있으면 입력하세요.
  // 예: "https://formspree.io/f/xxxxxxxx"
  // 비워 두면 예약 내용을 복사한 뒤 카카오톡 상담창으로 이동합니다.
  formEndpoint: ""
};

const dialog = document.querySelector("#reservationDialog");
const form = document.querySelector("#reservationForm");
const toast = document.querySelector("#toast");
let toastTimer;

function showToast(message) {
  window.clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("show");
  toastTimer = window.setTimeout(() => toast.classList.remove("show"), 2800);
}

function normalizePhone(value) {
  return String(value || "").replace(/[^0-9+]/g, "");
}

function openReservation(preselectedClass = "") {
  const classSelect = form.elements.classType;
  const matchedOption = [...classSelect.options].find(option => option.text === preselectedClass);
  classSelect.value = matchedOption ? matchedOption.value : "";
  dialog.showModal();
  window.setTimeout(() => form.elements.name.focus(), 60);
}

function makeReservationMessage(formData) {
  const data = Object.fromEntries(formData.entries());
  return [
    "[헤세드 ART 사전예약 문의]",
    `신청자명: ${data.name}`,
    `연락처: ${data.phone}`,
    `신청 클래스: ${data.classType}`,
    `희망일: ${data.preferredDate || "협의"}`,
    `희망 시간: ${data.preferredTime || "협의"}`,
    `문의 내용: ${data.memo || "없음"}`
  ].join("\n");
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (_) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    const copied = document.execCommand("copy");
    textarea.remove();
    return copied;
  }
}

function callAcademy() {
  const phone = normalizePhone(CONFIG.phone);
  if (!phone) {
    showToast("script.js의 CONFIG.phone에 학원 전화번호를 입력해 주세요.");
    return;
  }
  window.location.href = `tel:${phone}`;
}

document.querySelectorAll("[data-config-link]").forEach(link => {
  const key = link.dataset.configLink;
  const url = CONFIG[key];
  if (url) {
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  }
});

document.querySelectorAll("[data-open-reservation]").forEach(button => {
  button.addEventListener("click", () => openReservation(button.dataset.openReservation));
});

document.querySelector("#closeDialog").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => {
  if (event.target === dialog) dialog.close();
});

document.querySelector("#callCard").addEventListener("click", callAcademy);
document.querySelector("#callQuickButton").addEventListener("click", callAcademy);

document.querySelector("#shareButton").addEventListener("click", async () => {
  const shareData = {
    title: document.title,
    text: "그림을 그리고 싶은 곳, 헤세드 미술학원",
    url: window.location.href
  };
  try {
    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      await copyText(window.location.href);
      showToast("페이지 주소를 복사했습니다.");
    }
  } catch (error) {
    if (error.name !== "AbortError") showToast("공유하지 못했습니다. 다시 시도해 주세요.");
  }
});

form.addEventListener("submit", async event => {
  event.preventDefault();
  if (!form.reportValidity()) return;

  const formData = new FormData(form);
  const message = makeReservationMessage(formData);

  if (CONFIG.formEndpoint) {
    try {
      const response = await fetch(CONFIG.formEndpoint, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" }
      });
      if (!response.ok) throw new Error("예약 전송 실패");
      form.reset();
      dialog.close();
      showToast("예약 문의가 접수되었습니다.");
      return;
    } catch (error) {
      showToast("전송에 실패해 카카오톡 문의로 연결합니다.");
    }
  }

  await copyText(message);
  dialog.close();
  showToast("예약 내용이 복사되었습니다. 카카오톡에 붙여넣어 주세요.");
  window.setTimeout(() => window.open(CONFIG.kakaoUrl, "_blank", "noopener,noreferrer"), 500);
});

document.querySelector("#year").textContent = new Date().getFullYear();
