// script.js
let history = [];

function generateNumber() {
    const min = parseInt(document.getElementById('minValue').value) || 0;
    const max = parseInt(document.getElementById('maxValue').value) || 100;
    
    if (min >= max) {
        alert('Maximum value must be greater than minimum value!');
        return;
    }

    const resultElement = document.getElementById('result');
    const targetNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    
    // Animate number roll
    animateValue(resultElement, parseInt(resultElement.textContent), targetNumber, 1000);
    
    // Add to history
    addToHistory(targetNumber);
}

function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

function addToHistory(number) {
    const historyDiv = document.getElementById('history');
    const entry = document.createElement('div');
    entry.innerHTML = `
        <span>${new Date().toLocaleTimeString()}</span>
        <span>${number}</span>
    `;
    historyDiv.prepend(entry);
    history.push(number);
    
    // Limit history to 10 entries
    if (historyDiv.children.length > 10) {
        historyDiv.removeChild(historyDiv.lastChild);
    }
}

function copyNumber() {
    const number = document.getElementById('result').textContent;
    navigator.clipboard.writeText(number).then(() => {
        alert('Number copied to clipboard!');
    });
}

// Initialize default values
document.getElementById('minValue').value = 1;
document.getElementById('maxValue').value = 100;