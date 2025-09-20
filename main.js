const greetingContainer = document.getElementById('greeting');
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
let typedCharacterIndex = 0;

function renderWord() {
    greetingContainer.innerHTML = '';
    const currentWord = words[currentWordIndex];

    currentWord.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.classList.add('letter');

        if (index < typedCharacterIndex) {
            if (textInput.value[index] === char) {
                span.classList.add('correct');
            } else {
                span.classList.add('incorrect');
            }
        } else if (index === typedCharacterIndex) {
            span.classList.add('current-letter');
        }
        greetingContainer.appendChild(span);
    });
}

function initializeWords() {
    const shuffled = allWords.sort(() => 0.5 - Math.random());
    words = shuffled.slice(0, 10);
    currentWordIndex = 0;
    typedCharacterIndex = 0;
    textInput.value = '';
    renderWord();
}

initializeWords();

textInput.addEventListener('input', () => {
    const currentWord = words[currentWordIndex];
    const typedValue = textInput.value;

    typedCharacterIndex = typedValue.length;

    if (typedValue === currentWord) {
        currentWordIndex++;
        if (currentWordIndex >= words.length) {
            initializeWords();
        } else {
            typedCharacterIndex = 0;
            textInput.value = '';
            renderWord();
        }
    } else {
        renderWord();
    }
});

textInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        initializeWords();
    }
});

window.addEventListener('load', () => {
    textInput.focus();
});
