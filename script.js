let flashcards = []; // Chứa dữ liệu từ JSON
let currentIndex = 0;
let flipped = false;

// DOM Elements
const flashcardElement = document.getElementById("flashcard");
const flipButton = document.getElementById("flipButton");
const nextButton = document.getElementById("nextButton");

// Fetch data from JSON file
async function loadFlashcards() {
    try {
        const response = await fetch('hsk4_words.json');
        if (!response.ok) throw new Error("Không thể tải dữ liệu");
        flashcards = await response.json();
        showFlashcard();
    } catch (error) {
        console.error("Lỗi:", error);
        flashcardElement.textContent = "Không thể tải dữ liệu";
    }
}

// Hiển thị từ hiện tại
function showFlashcard() {
    if (flashcards.length === 0) return;
    const currentCard = flashcards[currentIndex];
    flashcardElement.textContent = flipped ? currentCard.meaning : currentCard.word;
}

// Lật thẻ
function flipFlashcard() {
    flipped = !flipped;
    showFlashcard();
}

// Chuyển sang từ tiếp theo
function nextFlashcard() {
    currentIndex = (currentIndex + 1) % flashcards.length;
    flipped = false;
    showFlashcard();
}

// Gắn sự kiện
flipButton.addEventListener("click", flipFlashcard);
nextButton.addEventListener("click", nextFlashcard);

// Khởi động
loadFlashcards();
