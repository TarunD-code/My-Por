let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let isRunning = false;
let laps = [];
let lastLapTime = 0;

const digitalDisplay = document.querySelector('.digital-display');
const lapsList = document.getElementById('laps');

function start() {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now() - elapsedTime;
        timerInterval = requestAnimationFrame(update);
    }
}

function stop() {
    if (isRunning) {
        isRunning = false;
        cancelAnimationFrame(timerInterval);
    }
}

function reset() {
    stop();
    elapsedTime = 0;
    lastLapTime = 0;
    laps = [];
    updateDisplay(0);
    lapsList.innerHTML = '';
}

function lap() {
    if (isRunning) {
        const currentTime = Date.now() - startTime;
        const lapTime = currentTime - lastLapTime;
        lastLapTime = currentTime;
        laps.push({ total: currentTime, lap: lapTime });
        renderLaps();
    }
}

function update() {
    if (isRunning) {
        timerInterval = requestAnimationFrame(update);
        const currentTime = Date.now();
        elapsedTime = currentTime - startTime;
        updateDisplay(elapsedTime);
    }
}

function updateDisplay(time) {
    const hours = Math.floor(time / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    digitalDisplay.querySelectorAll('.digit')[0].textContent = pad(hours);
    digitalDisplay.querySelectorAll('.digit')[1].textContent = pad(minutes);
    digitalDisplay.querySelectorAll('.digit')[2].textContent = pad(seconds);
    digitalDisplay.querySelector('.milli').textContent = `:${pad(milliseconds)}`;
}

function renderLaps() {
    lapsList.innerHTML = laps.map((lap, index) => `
        <div class="lap-item">
            <span>LAP ${index + 1}</span>
            <span class="lap-time">${formatTime(lap.lap)}</span>
        </div>
    `).join('');
    
    lapsList.scrollTop = lapsList.scrollHeight;
}

function formatTime(time) {
    const date = new Date(time);
    return `${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}:${pad(date.getUTCSeconds())}.${pad(Math.floor(time % 1000 / 10))}`;
}

function pad(number) {
    return number.toString().padStart(2, '0');
}

// Initialize glitch text effects
document.querySelectorAll('.cyber-button').forEach(button => {
    const text = button.querySelector('.glitch-text');
    text.setAttribute('data-text', text.textContent);
});