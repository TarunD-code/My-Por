// Counter.js
document.addEventListener('DOMContentLoaded', () => {
    // Initialize particles
    particlesJS('particles', {
        particles: {
            number: { value: 80 },
            color: { value: '#ffffff' },
            opacity: { value: 0.5 },
            size: { value: 3 },
            move: { speed: 1 }
        }
    });

    const counter = {
        value: 0,
        max: -Infinity,
        min: Infinity,
        history: [],
        step: 1,
        limit: Infinity,
        
        update(value) {
            this.value = value;
            this.max = Math.max(this.max, value);
            this.min = Math.min(this.min, value);
            this.history.unshift({
                value,
                timestamp: new Date().toLocaleString()
            });
            if(this.history.length > 10) this.history.pop();
        },
        
        increment() {
            const newValue = this.value + this.step;
            if(newValue <= this.limit) this.update(newValue);
        },
        
        decrement() {
            const newValue = this.value - this.step;
            if(newValue >= -this.limit) this.update(newValue);
        },
        
        reset() {
            this.update(0);
            this.max = -Infinity;
            this.min = Infinity;
            this.history = [];
        }
    };

    // DOM elements
    const elements = {
        counter: document.getElementById('Countlabel'),
        max: document.getElementById('maxValue'),
        min: document.getElementById('minValue'),
        history: document.getElementById('historyList'),
        step: document.getElementById('stepSize'),
        limit: document.getElementById('counterLimit')
    };

    // Event listeners
    document.getElementById('increasebtn').addEventListener('click', () => {
        counter.increment();
        updateDisplay();
    });

    document.getElementById('decreasebtn').addEventListener('click', () => {
        counter.decrement();
        updateDisplay();
    });

    document.getElementById('resetbtn').addEventListener('click', () => {
        if(confirm('Are you sure you want to reset?')) {
            counter.reset();
            updateDisplay();
        }
    });

    elements.step.addEventListener('change', () => {
        counter.step = parseInt(elements.step.value) || 1;
    });

    elements.limit.addEventListener('change', () => {
        counter.limit = parseInt(elements.limit.value) || Infinity;
    });

    // Keyboard support
    document.addEventListener('keydown', (e) => {
        if(e.key === 'ArrowUp') counter.increment();
        if(e.key === 'ArrowDown') counter.decrement();
        if(e.key === 'Escape') counter.reset();
        updateDisplay();
    });

    // Update display
    function updateDisplay() {
        elements.counter.textContent = counter.value;
        elements.max.textContent = counter.max === -Infinity ? 0 : counter.max;
        elements.min.textContent = counter.min === Infinity ? 0 : counter.min;
        
        elements.history.innerHTML = counter.history
            .map(entry => `
                <div class="history-item">
                    <span>${entry.timestamp}</span>
                    <span>${entry.value}</span>
                </div>
            `)
            .join('');
        
        // Add animation
        elements.counter.style.transform = 'scale(1.1)';
        setTimeout(() => {
            elements.counter.style.transform = 'scale(1)';
        }, 200);
    }

    // Initial setup
    counter.reset();
    updateDisplay();
});