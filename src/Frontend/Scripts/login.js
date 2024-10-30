document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
        const responseData = await response.json();
        if (response.ok) {
            localStorage.setItem('token', responseData.token);
            alert('Login successful! Redirecting...');
            window.location.href = '/recipe_display.html';
        } else {
            alert(`Login failed: ${responseData.error || 'Unknown error'}`);
        }
    } else {
        const text = await response.text();
        alert(`Unexpected response: ${text}`);
    }
});
