// Script do formulário de desconto principal
const discountForm = document.getElementById("discount-form");
const emailInput = document.getElementById("email-input");
const signupMessage = document.getElementById("signup-message");
discountForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const email = emailInput.value;
  if (email && email.includes("@")) {
    window.location.href = "obrigado.html";
  } else {
    signupMessage.style.color = "#ff6b6b";
    signupMessage.textContent = "Por favor, insira um e-mail válido.";
    setTimeout(() => {
      signupMessage.textContent = "";
    }, 3000);
  }
});

// Script de controle do vídeo
const video = document.getElementById("main-video");
const playPauseBtn = document.getElementById("play-pause-btn");
const muteUnmuteBtn = document.getElementById("mute-unmute-btn");
const volumeSlider = document.getElementById("volume-slider");
const playIcon = document.getElementById("play-icon");
const pauseIcon = document.getElementById("pause-icon");
const muteIcon = document.getElementById("mute-icon");
const unmuteIcon = document.getElementById("unmute-icon");
let lastVolume = 1;
function updatePlayPauseIcon() {
  if (video.paused) {
    playIcon.style.display = "block";
    pauseIcon.style.display = "none";
  } else {
    playIcon.style.display = "none";
    pauseIcon.style.display = "block";
  }
}
function updateMuteUnmuteIcon() {
  if (video.muted || video.volume === 0) {
    muteIcon.style.display = "block";
    unmuteIcon.style.display = "none";
  } else {
    muteIcon.style.display = "none";
    unmuteIcon.style.display = "block";
  }
}
function togglePlayPause() {
  if (video.paused) video.play();
  else video.pause();
}
function toggleMute() {
  if (video.muted || video.volume === 0) {
    video.volume = lastVolume;
    video.muted = false;
  } else {
    lastVolume = video.volume;
    video.volume = 0;
    video.muted = true;
  }
}
playPauseBtn.addEventListener("click", togglePlayPause);
muteUnmuteBtn.addEventListener("click", toggleMute);
video.addEventListener("click", togglePlayPause);
volumeSlider.addEventListener("input", (e) => {
  const newVolume = e.target.value;
  video.volume = newVolume;
  video.muted = newVolume === "0";
});
video.addEventListener("play", updatePlayPauseIcon);
video.addEventListener("pause", updatePlayPauseIcon);
video.addEventListener("volumechange", () => {
  volumeSlider.value = video.volume;
  updateMuteUnmuteIcon();
  if (!video.muted) lastVolume = video.volume;
});
updatePlayPauseIcon();
updateMuteUnmuteIcon();
volumeSlider.value = video.muted ? 0 : video.volume;

// Script das animações e da seção de personalização
document.addEventListener("DOMContentLoaded", function () {
  // Lógica das animações de scroll
  const animationElements = document.querySelectorAll(".fade-in-up");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  animationElements.forEach((el) => {
    observer.observe(el);
  });

  // Lógica da seção de personalização
  const pendantChoices = document.querySelectorAll(".pendant-choice");
  const mockupImage = document.getElementById("mockup-image");
  const pendantTitle = document.getElementById("pendant-title");
  const pendantDescription = document.getElementById("pendant-description");
  pendantChoices.forEach((choice) => {
    choice.addEventListener("click", () => {
      pendantChoices.forEach((c) => c.classList.remove("active"));
      choice.classList.add("active");
      const newImageSrc = choice.dataset.mockupSrc;
      const newTitle = choice.dataset.title;
      const newDescription = choice.dataset.description;
      mockupImage.src = newImageSrc;
      pendantTitle.textContent = newTitle;
      pendantDescription.textContent = newDescription;
    });
  });

  // --- LÓGICA DO CHAT FLUTUANTE DO WHATSAPP ---
  const whatsappContainer = document.querySelector(".whatsapp-container");
  const openChatBtn = document.getElementById("whatsapp-open-chat");
  const chatBox = document.getElementById("whatsapp-chat-box");
  const closeChatBtn = document.getElementById("chat-box-close");
  const chatForm = document.getElementById("chat-box-form");
  const chatEmailInput = document.getElementById("chat-box-input");

  openChatBtn.addEventListener("click", () => {
    whatsappContainer.classList.add("chat-open");
  });

  closeChatBtn.addEventListener("click", () => {
    whatsappContainer.classList.remove("chat-open");
  });

  chatForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = chatEmailInput.value;
    if (email && email.includes("@")) {
      // MENSAGEM DO WHATSAPP ATUALIZADA
      const whatsappMessage = "Gostaria de saber mais sobre a PetCare. Meu e-mail é " + email;
      // Substitua o número abaixo pelo seu número real (ex: 5511999999999)
      const whatsappUrl = "https://wa.me/5511999999999?text=" + encodeURIComponent(whatsappMessage);
      
      window.open(whatsappUrl, "_blank");
      whatsappContainer.classList.remove("chat-open"); // Fecha o chat após o envio
      chatEmailInput.value = ""; // Limpa o campo
    } else {
      chatEmailInput.classList.add("error");
      setTimeout(() => {
        chatEmailInput.classList.remove("error");
      }, 2000);
    }
  });
});