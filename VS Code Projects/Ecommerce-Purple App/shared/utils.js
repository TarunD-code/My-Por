// Check authentication state
function checkAuth() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(!currentUser) {
        window.location.href = '/auth/login.html';
    }
}

// Initialize on every page
document.addEventListener('DOMContentLoaded', checkAuth);