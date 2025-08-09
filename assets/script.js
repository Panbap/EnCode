const container = document.getElementById("word-list");

fetch("./assets/Vocabulary.json")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((item, index) => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
          <strong>${index + 1}. ${item.word}</strong> <em>${
        item.pronunciation
      }</em>
          <div class="details">
            <div>💡 Meaning: ${item.meaning}</div>
            <div>📝 Example: ${item.example}</div>
          </div>
          <div class="pronounce">🔊 Play Audio</div>
        `;

      card.addEventListener("click", (e) => {
        if (!e.target.classList.contains("pronounce")) {
          const details = card.querySelector(".details");
          details.style.display =
            details.style.display === "block" ? "none" : "block";
        }
      });

      card.querySelector(".pronounce").addEventListener("click", (e) => {
        e.stopPropagation();
        const audio = new Audio(item.audio);
        audio.play();
      });

      container.appendChild(card);
    });
  })
  .catch((error) => {
    console.error("Lỗi khi tải dữ liệu:", error);
    container.innerHTML = "<p>Không thể tải dữ liệu từ vựng.</p>";
  });
