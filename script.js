const greeting = document.getElementById('greeting');
const textInput = document.getElementById('text-input');

textInput.addEventListener('input', () => {
    if (textInput.value === 'hello') {
        greeting.textContent = 'boing';
    } else {
        greeting.textContent = 'hello';
    }
});
