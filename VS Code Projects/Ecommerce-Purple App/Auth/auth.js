class Auth {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('purpleUsers')) || [];
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    register(user) {
        if(this.users.some(u => u.email === user.email)) {
            throw new Error('User with this email already exists');
        }
        this.users.push(user);
        localStorage.setItem('purpleUsers', JSON.stringify(this.users));
        localStorage.setItem('currentUser', JSON.stringify(user));
    }

    login(email, password) {
        const user = this.users.find(u => u.email === email && u.password === password);
        if(!user) throw new Error('Invalid credentials');
        localStorage.setItem('currentUser', JSON.stringify(user));
        return user;
    }
}

// Initialize auth service
const authService = new Auth();

// Signup Form Handler
document.getElementById('signupForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    try {
        authService.register({
            name: document.getElementById('fullName').value,
            email: document.getElementById('signupEmail').value,
            password: document.getElementById('signupPassword').value
        });
        window.location.href = '../products/index.html';
    } catch(error) {
        alert(error.message);
    }
});

// Login Form Handler
document.getElementById('loginForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    try {
        authService.login(
            document.getElementById('loginEmail').value,
            document.getElementById('loginPassword').value
        );
        window.location.href = '../products/index.html';
    } catch(error) {
        alert(error.message);
    }
});

// Terms Modal Handler
const termsModal = document.getElementById('termsModal');
const termsLink = document.getElementById('termsLink');
const closeBtn = document.querySelector('.close');

termsLink?.addEventListener('click', (e) => {
    e.preventDefault();
    termsModal.style.display = 'block';
});

closeBtn?.addEventListener('click', () => {
    termsModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if(e.target === termsModal) {
        termsModal.style.display = 'none';
    }
});