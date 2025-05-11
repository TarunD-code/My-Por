let conversionHistory = [];

function convert() {
    const tempInput = document.getElementById('temperature');
    const fromUnit = document.getElementById('fromUnit').value;
    const toUnit = document.getElementById('toUnit').value;
    const resultDiv = document.querySelector('.result-value');
    
    if(tempInput.value === '') {
        showResult('Please enter a temperature', 'error');
        return;
    }

    const temp = parseFloat(tempInput.value);
    let result;
    
    if(fromUnit === toUnit) {
        result = temp;
    } else {
        result = convertTemperature(temp, fromUnit, toUnit);
    }

    const resultString = `${temp} ${unitSymbol(fromUnit)} → ${result.toFixed(2)} ${unitSymbol(toUnit)}`;
    showResult(resultString);
    addToHistory(resultString);
}

function convertTemperature(temp, from, to) {
    const conversionMap = {
        celsius: {
            fahrenheit: (c) => (c * 9/5) + 32,
            kelvin: (c) => c + 273.15
        },
        fahrenheit: {
            celsius: (f) => (f - 32) * 5/9,
            kelvin: (f) => (f - 32) * 5/9 + 273.15
        },
        kelvin: {
            celsius: (k) => k - 273.15,
            fahrenheit: (k) => (k - 273.15) * 9/5 + 32
        }
    };
    
    return conversionMap[from][to](temp);
}

function unitSymbol(unit) {
    const symbols = {
        celsius: '°C',
        fahrenheit: '°F',
        kelvin: 'K'
    };
    return symbols[unit];
}

function showResult(text, type = 'success') {
    const resultDiv = document.querySelector('.result-value');
    resultDiv.textContent = text;
    resultDiv.style.color = type === 'error' ? '#ff003c' : '#00f3ff';
}

function addToHistory(conversion) {
    conversionHistory.push(conversion);
    const historyList = document.getElementById('historyList');
    const entry = document.createElement('div');
    entry.className = 'history-entry';
    entry.textContent = conversion;
    historyList.appendChild(entry);
}

function toggleHistory() {
    const history = document.querySelector('.conversion-history');
    history.classList.toggle('show');
}

function clearHistory() {
    conversionHistory = [];
    document.getElementById('historyList').innerHTML = '';
}

// Particle animation
document.addEventListener('DOMContentLoaded', () => {
    const particles = document.querySelector('.particles-container');
    for(let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${Math.random() * 3 + 2}s`;
        particles.appendChild(particle);
    }
});