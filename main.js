const greeting = document.getElementById('greeting');
const textInput = document.getElementById('text-input');

const allWords = [
    'apple', 'banana', 'orange', 'grape', 'strawberry', 'blueberry', 'raspberry', 'pineapple', 'mango', 'kiwi',
    'cat', 'dog', 'bird', 'fish', 'rabbit', 'hamster', 'guinea', 'pig', 'snake', 'lizard',
    'house', 'car', 'tree', 'flower', 'cloud', 'sun', 'moon', 'star', 'river', 'mountain',
    'book', 'pen', 'paper', 'computer', 'phone', 'keyboard', 'mouse', 'screen', 'chair', 'table',
    'happy', 'sad', 'angry', 'excited', 'calm', 'tired', 'hungry', 'thirsty', 'bored', 'confused'
];

let words = [];
let currentWordIndex = 0;

function initializeWords() {
    // Shuffle allWords and pick 10 unique words
    const shuffled = allWords.sort(() => 0.5 - Math.random());
    words = shuffled.slice(0, 10);
    currentWordIndex = 0;
    greeting.textContent = words[currentWordIndex];
}

// Initialize with the first set of words
initializeWords();

textInput.addEventListener('input', () => {
    if (textInput.value === words[currentWordIndex]) {
        currentWordIndex++;
        if (currentWordIndex >= words.length) {
            // All words in the current set typed, re-initialize for a new set
            initializeWords();
        }
        greeting.textContent = words[currentWordIndex];
        textInput.value = ''; // Clear the input field
    }
});
