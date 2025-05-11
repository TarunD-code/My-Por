// script.js
let isDarkTheme = true;
const conversionRates = {
    currency: {
        USD: { EUR: 0.85, GBP: 0.73 },
        EUR: { USD: 1.18, GBP: 0.86 },
        GBP: { USD: 1.37, EUR: 1.16 }
    },
    length: {
        meter: { kilometer: 0.001, mile: 0.000621371 },
        kilometer: { meter: 1000, mile: 0.621371 }
    },
    temperature: {
        celsius: { fahrenheit: (val) => (val * 9/5) + 32 },
        fahrenheit: { celsius: (val) => (val - 32) * 5/9 }
    }
};

function toggleTheme() {
    isDarkTheme = !isDarkTheme;
    document.body.classList.toggle('light-mode', !isDarkTheme);
    document.querySelector('.theme-btn i').className = isDarkTheme ? 
        "fas fa-moon" : "fas fa-sun";
}

function switchTab(tabName) {
    document.querySelectorAll('.content').forEach(c => c.classList.remove('active'));
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.getElementById(tabName).classList.add('active');
    document.querySelector(`[onclick="switchTab('${tabName}')"]`).classList.add('active');
}

// Calculator Functions
const display = document.getElementById("display");

function appendToDisplay(input) {
    display.value += input;
}

function clearDisplay() {
    display.value = "";
}

function calculate() {
    try {
        display.value = eval(display.value);
    } catch {
        display.value = "Error";
    }
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

// Unit Converter Functions
function updateConversionUnits() {
    const type = document.getElementById('conversionType').value;
    const units = Object.keys(conversionRates[type]);
    
    const fromSelect = document.getElementById('fromUnit');
    const toSelect = document.getElementById('toUnit');
    
    fromSelect.innerHTML = units.map(u => `<option>${u}</option>`).join('');
    toSelect.innerHTML = units.map(u => `<option>${u}</option>`).join('');
}

function convertUnits() {
    const type = document.getElementById('conversionType').value;
    const fromUnit = document.getElementById('fromUnit').value;
    const toUnit = document.getElementById('toUnit').value;
    const value = parseFloat(document.getElementById('inputValue').value);
    
    let result;
    if (typeof conversionRates[type][fromUnit][toUnit] === 'function') {
        result = conversionRates[type][fromUnit][toUnit](value);
    } else {
        result = value * conversionRates[type][fromUnit][toUnit];
    }
    
    document.getElementById('resultValue').value = result.toFixed(4);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateConversionUnits();
});