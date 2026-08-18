const chapters = [...document.querySelectorAll(".chapter")];
const nextButtons = document.querySelectorAll("[data-next]");
const openingGift = document.getElementById("openingGift");
const openingNote = document.getElementById("openingNote");

let currentChapter = "opening";

function showChapter(id) {
  const target = document.getElementById(id);
  if (!target) return;

  chapters.forEach(chapter => {
    chapter.classList.toggle("active", chapter.id === id);
  });

  currentChapter = id;
  window.scrollTo({ top: 0, behavior: "smooth" });

  if (id === "opening") {
    document.body.classList.remove("final-mode");
  }
}

function createFloatingHearts() {
  const container = document.querySelector(".floating-hearts");
  const symbols = ["♡", "♥", "✦", "·"];

  for (let i = 0; i < 22; i++) {
    const heart = document.createElement("span");
    heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.animationDuration = `${8 + Math.random() * 9}s`;
    heart.style.animationDelay = `${Math.random() * 10}s`;
    heart.style.fontSize = `${12 + Math.random() * 17}px`;
    container.appendChild(heart);
  }
}

function sprinkleHearts(count = 18) {
  const container = document.querySelector(".floating-hearts");

  for (let i = 0; i < count; i++) {
    const item = document.createElement("span");
    item.textContent = Math.random() > .25 ? "♥" : "✦";
    item.style.left = `${35 + Math.random() * 30}%`;
    item.style.top = `${35 + Math.random() * 25}%`;
    item.style.fontSize = `${14 + Math.random() * 22}px`;
    item.style.animation = `pop .5s ease ${i * .035}s both, floatHeart 2.7s ease ${i * .035}s forwards`;
    container.appendChild(item);

    setTimeout(() => item.remove(), 3300);
  }
}

function openGift() {
  openingGift.classList.add("open");
  openingNote.textContent = "meow! the gift is opening... ♡";
  sprinkleHearts(20);

  setTimeout(() => showChapter("letter"), 900);
}

document.querySelector('[data-next="letter"]').addEventListener("click", openGift);

nextButtons.forEach(button => {
  if (button.dataset.next !== "letter") {
    button.addEventListener("click", () => showChapter(button.dataset.next));
  }
});

/* LETTER */
const envelopeWrap = document.getElementById("envelopeWrap");
const envelope = envelopeWrap.querySelector(".envelope");
const letterNext = document.getElementById("letterNext");

envelopeWrap.addEventListener("click", () => {
  envelope.classList.toggle("open");
  if (envelope.classList.contains("open")) {
    sprinkleHearts(8);
  }
});

letterNext.addEventListener("click", () => {
  if (!envelope.classList.contains("open")) {
    envelope.classList.add("open");
    setTimeout(() => showChapter("quote"), 700);
    return;
  }
  showChapter("quote");
});

/* CAKE */
const blowCandles = document.getElementById("blowCandles");
const cakeMessage = document.getElementById("cakeMessage");
const cakeNext = document.getElementById("cakeNext");

blowCandles.addEventListener("click", () => {
  document.querySelectorAll(".candle").forEach(candle => candle.classList.add("off"));

  blowCandles.disabled = true;
  blowCandles.textContent = "WISH MADE! ✨";
  cakeMessage.classList.add("show");
  sprinkleHearts(28);

  setTimeout(() => {
    cakeNext.classList.remove("hidden");
  }, 1300);
});

cakeNext.addEventListener("click", () => showChapter("photos"));

/* PHOTO MODAL */
const modal = document.getElementById("photoModal");
const modalImage = document.getElementById("modalImage");
const modalPlaceholder = document.getElementById("modalPlaceholder");
const modalCaption = document.getElementById("modalCaption");
const modalClose = document.getElementById("modalClose");

document.querySelectorAll(".photo-card").forEach(card => {
  card.addEventListener("click", () => {
    const src = card.dataset.photo;
    modalImage.src = src;
    modalImage.alt = card.dataset.caption;
    modalCaption.textContent = card.dataset.caption;

    modalImage.onload = () => {
      modalImage.style.display = "block";
      modalPlaceholder.style.display = "none";
    };

    modalImage.onerror = () => {
      modalImage.style.display = "none";
      modalPlaceholder.style.display = "grid";
    };

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  });
});

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

modalClose.addEventListener("click", closeModal);
document.querySelector(".modal-backdrop").addEventListener("click", closeModal);

document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeModal();
});

/* FLOWERS */
const takeFlowers = document.getElementById("takeFlowers");
const flowerMessage = document.getElementById("flowerMessage");
const flowerNext = document.getElementById("flowerNext");

takeFlowers.addEventListener("click", () => {
  takeFlowers.disabled = true;
  takeFlowers.textContent = "INI UNTUKMU ♡";
  flowerMessage.classList.add("show");
  sprinkleHearts(24);

  document.querySelectorAll(".flower i").forEach((petal, index) => {
    petal.style.animation = `float ${1.4 + index * .12}s ease-in-out infinite`;
  });

  setTimeout(() => flowerNext.classList.remove("hidden"), 1100);
});

flowerNext.addEventListener("click", () => showChapter("finalGift"));

/* FINAL GIFT */
const finalBox = document.getElementById("finalBox");
const openFinal = document.getElementById("openFinal");
const finalReveal = document.getElementById("finalReveal");
const messageNext = document.getElementById("messageNext");

openFinal.addEventListener("click", () => {
  finalBox.classList.add("open");
  openFinal.disabled = true;
  openFinal.textContent = "OPENING... ♡";
  sprinkleHearts(35);

  setTimeout(() => {
    finalReveal.classList.add("show");
    openFinal.classList.add("hidden");
  }, 900);
});

messageNext.addEventListener("click", () => {
  showChapter("finalMessage");
  sprinkleHearts(30);
});

/* RESTART */
document.getElementById("restart").addEventListener("click", () => {
  // Reset interactions
  envelope.classList.remove("open");
  document.querySelectorAll(".candle").forEach(candle => candle.classList.remove("off"));

  blowCandles.disabled = false;
  blowCandles.textContent = "TIUP LILINNYA🕯️";
  cakeMessage.classList.remove("show");
  cakeNext.classList.add("hidden");

  takeFlowers.disabled = false;
  takeFlowers.textContent = "AMBIL INI♡";
  flowerMessage.classList.remove("show");
  flowerNext.classList.add("hidden");

  finalBox.classList.remove("open");
  openFinal.disabled = false;
  openFinal.textContent = "OPEN THE FINAL GIFT 🎁";
  openFinal.classList.remove("hidden");
  finalReveal.classList.remove("show");

  openingGift.classList.remove("open");
  openingNote.textContent = "click the button... the kitty is waiting!";

  showChapter("opening");
});

/* BACKGROUND HEARTS */
createFloatingHearts();

/* Prevent accidental form-like button behavior */
document.querySelectorAll("button").forEach(button => {
  button.type = "button";
});
