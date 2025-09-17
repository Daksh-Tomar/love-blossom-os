document.addEventListener("DOMContentLoaded", () => {
  const questionContainer = document.querySelector(".question-container");
  const resultContainer = document.querySelector(".result-container"); // fixed selector
  const gifResult = document.querySelector(".gif-result");
  const heartLoader = document.querySelector(".cssload-main");
  const yesBtn = document.querySelector(".js-yes-btn");
  const noBtn = document.querySelector(".js-no-btn");

  if (!questionContainer || !resultContainer || !yesBtn || !noBtn) return;

  // Move the No button randomly
  noBtn.addEventListener("mouseover", () => {
    const newX = Math.floor(
      Math.random() * (questionContainer.offsetWidth - noBtn.offsetWidth)
    );
    const newY = Math.floor(
      Math.random() * (questionContainer.offsetHeight - noBtn.offsetHeight)
    );

    noBtn.style.position = "absolute";
    noBtn.style.left = `${newX}px`;
    noBtn.style.top = `${newY}px`;
  });

  // Yes button functionality
  yesBtn.addEventListener("click", () => {
    questionContainer.style.display = "none";
    heartLoader.style.display = "block";

    setTimeout(() => {
      heartLoader.style.display = "none";
      resultContainer.style.display = "block";

      if (gifResult && gifResult.tagName === "VIDEO") {
        gifResult.currentTime = 0; // restart
        gifResult.play().catch(() => {}); // ensure autoplay works
      }
    }, 3000);
  });
});
