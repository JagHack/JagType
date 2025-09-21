const greetingContainer = document.getElementById('greeting');
const textInput = document.getElementById('text-input');
const wpmCounter = document.getElementById('wpm-counter');
const commandBarContainer = document.getElementById('command-bar-container');
const commandInput = document.getElementById('command-input');

let currentWord = '';
let wordStartTime = null;

function restartGame() {
    wpmCounter.textContent = '';
    getNewWord();
}

async function getNewWord() {
    try {
        const response = await fetch('/random-word');
        const word = await response.text();
        currentWord = word;
        textInput.value = '';
        wordStartTime = null; 
        renderWord();
    } catch (error) {
        console.error('Failed to fetch new word:', error);
        greetingContainer.textContent = 'Error loading word.';
    }
}

function renderWord() {
    greetingContainer.innerHTML = '';
    const typedValue = textInput.value;

    currentWord.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.classList.add('letter');

        if (index < typedValue.length) {
            if (typedValue[index] === char) {
                span.classList.add('correct');
            } else {
                span.classList.add('incorrect');
            }
        } else if (index === typedValue.length) {
            span.classList.add('current-letter');
        }
        greetingContainer.appendChild(span);
    });
}

function calculateLastWordWPM() {
    if (!wordStartTime) {
        return;
    }

    const elapsedMinutes = (Date.now() - wordStartTime) / 60000;
    if (elapsedMinutes === 0) {
        wpmCounter.textContent = '--- WPM';
        return;
    }
    const wpm = (currentWord.length / 5) / elapsedMinutes;
    wpmCounter.textContent = `${Math.round(wpm)} WPM`;
}

function toggleCommandBar(forceState) {
    const isVisible = commandBarContainer.classList.contains('visible');
    const shouldBeVisible = forceState !== undefined ? forceState : !isVisible;

    if (shouldBeVisible) {
        commandBarContainer.classList.add('visible');
        commandInput.focus();
    } else {
        commandBarContainer.classList.remove('visible');
        textInput.focus(); 
    }
}

textInput.addEventListener('input', () => {
    if (wordStartTime === null && textInput.value.length > 0) {
        wordStartTime = Date.now();
    }

    const typedValue = textInput.value;

    if (typedValue === currentWord) {
        calculateLastWordWPM();
        getNewWord();
    } else {
        renderWord();
    }
});

textInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        restartGame();
    }
});

commandInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        const command = commandInput.value.trim().toLowerCase();

        switch (command) {
            case 'restart':
                restartGame();
                break;
            
        }

        commandInput.value = '';
        toggleCommandBar(false); 
    }
});

window.addEventListener('keydown', (event) => {
    
    if (event.target.tagName === 'INPUT') return;

    if (event.key === 'Escape' || event.key === 'CapsLock') {
        event.preventDefault();
        toggleCommandBar();
    }
});

window.addEventListener('load', () => {
    textInput.focus();
    restartGame();
});
