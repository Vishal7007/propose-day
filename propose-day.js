document.addEventListener("DOMContentLoaded", () => {
  const ringBox = document.getElementById("ringBox");
  const proposalText = document.getElementById("proposalText");
  const decisionButtons = document.getElementById("decisionButtons");
  const hiddenSurprise = document.getElementById("hiddenSurprise");
  const noBtn = document.getElementById("noBtn");
  const yesBtn = document.getElementById("yesBtn");
  const openDrumSound = document.getElementById("openDrumSound");
  const magicSound = document.getElementById("magicSound");

  let intimateMode = false;
  let touchCount = 0;
  // Create starry background
  function createStars() {
    const sky = document.querySelector(".starry-sky");
    for (let i = 0; i < 200; i++) {
      const star = document.createElement("div");
      star.className = "star";
      star.style.width = Math.random() * 3 + "px";
      star.style.height = star.style.width;
      star.style.left = Math.random() * 100 + "%";
      star.style.top = Math.random() * 100 + "%";
      star.style.setProperty("--duration", Math.random() * 3 + 2 + "s");
      sky.appendChild(star);
    }
  }

  // Romantic messages for the proposal
  const romanticMessages = [
    "Every moment with you feels like a dream...",
    "You make my heart skip a beat...",
    "I want to wake up next to you every morning...",
    "You're the missing piece to my puzzle...",
    "I can't imagine my life without you...",
  ];

  // Special touch interaction
  function handleIntimateTouch(e) {
    if (!intimateMode) return;

    const ripple = document.createElement("div");
    ripple.className = "touch-ripple";
    ripple.style.left = (e.clientX || e.touches[0].clientX) + "px";
    ripple.style.top = (e.clientY || e.touches[0].clientY) + "px";
    document.body.appendChild(ripple);

    touchCount++;
    if (touchCount > 5) {
      showHiddenSurprise();
    }

    // Trigger haptic feedback if available
    if (navigator.vibrate) {
      navigator.vibrate([50, 30, 50]);
    }

    setTimeout(() => ripple.remove(), 1000);
  }

  // Show hidden surprise element
  function showHiddenSurprise() {
    hiddenSurprise.classList.add("visible");
    const input = document.getElementById("whisperInput");

    input.addEventListener("input", (e) => {
      if (e.target.value.length > 3) {
        const intensity = Math.min(e.target.value.length * 10, 100);
        document.body.style.setProperty("--glow-intensity", intensity + "%");
      }
    });
  }

  // Ring box interaction
  ringBox.addEventListener("click", () => {
    ringBox.querySelector(".box-top").classList.add("open");
    ringBox.querySelector(".ring").style.opacity = "1";
    setTimeout(startProposal, 1000);
    openDrumSound.volume = 0.1; // Set volume to 50%
    openDrumSound.play();
    magicSound.play();
    intimateMode = true;
  });

  // Start proposal sequence
  function startProposal() {
    proposalText.classList.add("visible");
    const text = proposalText.querySelector(".typewriter-text");
    text.textContent = "";
    currentMessage = romanticMessages[Math.floor(Math.random())];

    typeWriter(text, currentMessage, () => {
      setTimeout(() => {
        decisionButtons.classList.add("visible");
      }, 1000);
    });
  }

  // Typewriter effect
  function typeWriter(element, text, callback, speed = 50) {
    let i = 0;
    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      } else if (callback) {
        callback();
      }
    }
    type();
  }

  // Make "No" button dodge the cursor
  noBtn.addEventListener("mouseover", (e) => {
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
    noBtn.style.position = "fixed";
    noBtn.style.left = x + "px";
    noBtn.style.top = y + "px";
  });

  // Yes button interaction
  yesBtn.addEventListener("click", () => {
    document.body.innerHTML = "";
    // document.body.style.background = '#ff4757';

    const celebration = document.createElement("div");
    celebration.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 20px;
            color: white;
            text-align: center;
        `;
    celebration.innerHTML =
      'Happy Propose Day!<br><image src="propose-day.png"></image><br>Forever Yours!<br> Vishal ❤️ Shubhangi <audio id="romanticSound" preload="auto" loop> <source src="romantic_melody.mp3" type="audio/mpeg"></audio>';
    document.body.appendChild(celebration);
    document.getElementById("romanticSound").play();
    createHeartShower();
  });

  // Create heart shower effect
  function createHeartShower() {
    setInterval(() => {
      const heart = document.createElement("div");
      heart.textContent = "❤️";
      heart.style.cssText = `
                position: fixed;
                top: -40px;
                left: ${Math.random() * 100}%;
                font-size: 24px;
                animation: fall ${Math.random() * 3 + 2}s linear;
            `;
      document.body.appendChild(heart);

      // Remove heart after animation ends
      setTimeout(() => heart.remove(), 5000);
    }, 100);
  }

  // Initialize
  createStars();
  document.addEventListener("mousemove", handleIntimateTouch);
  document.addEventListener("touchmove", handleIntimateTouch);
});
