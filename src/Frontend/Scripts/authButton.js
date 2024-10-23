document.addEventListener('DOMContentLoaded', () => {
    const authButton = document.getElementById('authButton');
    const token = localStorage.getItem('token');

    if (token) {
        authButton.textContent = 'Logout';
    } else {
        authButton.textContent = 'Login';
    }

    authButton.addEventListener('click', () => {
        if (localStorage.getItem('token')) {
            localStorage.removeItem('token');
            authButton.textContent = 'Login';
            alert('You have been logged out');
            window.location.href = 'login.html';
        } else {
            window.location.href = 'login.html';
        }
    });
});
