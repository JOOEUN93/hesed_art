/*
 * 헤세드 ART 링크 페이지 설정
 * 아래 CONFIG의 전화번호와 링크만 실제 정보로 바꾸면 됩니다.
 */
const CONFIG = {
  // 0507 안심번호 사용 가능. 하이픈 없이 입력하세요. 예: "050712345678"
  phone: "0507-1461-8584",
  kakaoUrl: "https://pf.kakao.com/_yqLIn",
  blogUrl: "https://blog.naver.com/hesed_art",
  mapUrl: "https://naver.me/FY3UM7Fq",
};

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

function callAcademy() {
  const phone = normalizePhone(CONFIG.phone);
  if (!phone) {
    showToast("script.js의 CONFIG.phone에 학원 전화번호를 입력해 주세요.");
    return;
  }
  window.location.href = `tel:${phone}`;
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

document.querySelectorAll("[data-config-link]").forEach(link => {
  const key = link.dataset.configLink;
  const url = CONFIG[key];
  if (url) {
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  }
});


const classDialog = document.querySelector("#classDialog");
const classDialogTitle = document.querySelector("#classDialogTitle");
const classDialogContent = document.querySelector("#classDialogContent");

const classTemplates = {
  "정규클래스": document.querySelector("#regularClassTemplate"),
  "원데이클래스": document.querySelector("#oneDayClassTemplate")
};

function closeClassDialog() {
  if (classDialog.open) classDialog.close();
}

document.querySelectorAll("[data-open-class]").forEach(button => {
  button.addEventListener("click", () => {
    const className = button.dataset.openClass;
    const template = classTemplates[className];
    if (!template) return;

    classDialogTitle.textContent = className;
    classDialogContent.replaceChildren(template.content.cloneNode(true));
    classDialog.showModal();
  });
});

document.querySelector("#closeClassDialog").addEventListener("click", closeClassDialog);
document.querySelector("#confirmClassDialog").addEventListener("click", closeClassDialog);
classDialog.addEventListener("click", event => {
  if (event.target === classDialog) closeClassDialog();
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

document.querySelector("#year").textContent = new Date().getFullYear();
