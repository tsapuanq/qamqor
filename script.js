const WHATSAPP_PHONE = "77071010882";

const pricesByCameraCount = {
  4: 180000,
  6: 250000,
  8: 320000,
  12: 480000,
};

const formatter = new Intl.NumberFormat("ru-KZ");

function buildWhatsappUrl(message) {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

function getCalculatorData(form) {
  const data = new FormData(form);
  return {
    objectType: data.get("objectType"),
    cameraCount: Number(data.get("cameraCount")),
    archiveDays: Number(data.get("archiveDays")),
    outdoor: data.get("outdoor"),
    mobileAccess: data.get("mobileAccess"),
  };
}

function calculateEstimate(data) {
  let estimate = pricesByCameraCount[data.cameraCount] || pricesByCameraCount[4];

  if (data.archiveDays === 30) {
    estimate += 40000;
  }

  if (data.outdoor === "да") {
    estimate += 30000;
  }

  return estimate;
}

function buildCalculatorMessage(data, estimate) {
  return [
    "Здравствуйте! Пишу с сайта QS Kokshetau. Хочу расчет видеонаблюдения в Кокшетау.",
    `Тип объекта: ${data.objectType}`,
    `Количество камер: ${data.cameraCount}`,
    `Архив записи: ${data.archiveDays} дней`,
    `Уличные камеры: ${data.outdoor}`,
    `Просмотр с телефона: ${data.mobileAccess}`,
    `Итоговая сумма с калькулятора: от ${formatter.format(estimate)} тг`,
    "Понимаю, что это предварительный расчет. Уточните точную стоимость по кабелю, высоте монтажа, типу камер и жесткому диску.",
  ].join("\n");
}

function updateCalculatorResult(form) {
  const data = getCalculatorData(form);
  const estimate = calculateEstimate(data);
  const estimateValue = document.querySelector("#estimateValue");
  const estimateDetails = document.querySelector("#estimateDetails");
  const calculatorWhatsapp = document.querySelector("#calculatorWhatsapp");

  estimateValue.textContent = `от ${formatter.format(estimate)} тг`;
  estimateDetails.textContent = `${data.objectType}, ${data.cameraCount} камер, архив ${data.archiveDays} дней, уличные камеры: ${data.outdoor}, просмотр с телефона: ${data.mobileAccess}.`;
  calculatorWhatsapp.href = buildWhatsappUrl(buildCalculatorMessage(data, estimate));
}

document.querySelectorAll(".js-whatsapp").forEach((link) => {
  const message = link.dataset.message || "Здравствуйте! Пишу с сайта QS Kokshetau. Хочу установить камеры видеонаблюдения в Кокшетау.";
  link.href = buildWhatsappUrl(message);

  link.addEventListener("click", () => {
    // GA/GTM event placeholder: click_whatsapp
  });
});

document.querySelectorAll("[data-scroll-target]").forEach((button) => {
  button.addEventListener("click", () => {
    const target = document.querySelector(button.dataset.scrollTarget);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

const calculatorForm = document.querySelector("#calculatorForm");
const leadForm = document.querySelector("#leadForm");
const faqItems = document.querySelectorAll(".faq-list details");
const siteHeader = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");

if (calculatorForm) {
  updateCalculatorResult(calculatorForm);

  calculatorForm.addEventListener("change", () => {
    updateCalculatorResult(calculatorForm);
  });

  calculatorForm.addEventListener("submit", (event) => {
    event.preventDefault();
    updateCalculatorResult(calculatorForm);
    // GA/GTM event placeholder: calculator_submit
  });
}

if (leadForm) {
  leadForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(leadForm);
    const message = [
      "Здравствуйте! Пишу с сайта QS Kokshetau. Хочу оставить заявку на установку камер видеонаблюдения в Кокшетау.",
      `Имя: ${data.get("name") || "не указано"}`,
      `Телефон: ${data.get("phone")}`,
      `Объект: ${data.get("object")}`,
      `Примерное количество камер: ${data.get("cameraCount")}`,
      `Комментарий: ${data.get("comment") || "без комментария"}`,
      "Могу отправить фото объекта, чтобы быстрее понять количество камер, стоимость и что входит в монтаж.",
    ].join("\n");

    // GA/GTM event placeholder: lead_form_submit
    window.location.href = buildWhatsappUrl(message);
  });
}

faqItems.forEach((item) => {
  item.addEventListener("toggle", () => {
    if (!item.open) {
      return;
    }

    faqItems.forEach((otherItem) => {
      if (otherItem !== item) {
        otherItem.open = false;
      }
    });
  });
});

if (siteHeader && menuToggle) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteHeader.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteHeader.querySelectorAll(".nav a, .header-actions a, .header-actions button").forEach((item) => {
    item.addEventListener("click", () => {
      siteHeader.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Formspree / Google Forms placeholder:
// If a hosted form endpoint is added later, replace the WhatsApp redirect above
// with fetch() or a normal form action while keeping lead_form_submit tracking.
