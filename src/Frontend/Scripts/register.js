let tempEmail;
let tempPassword;

document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    tempEmail = email;
    tempPassword = password;

    if (password != confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: tempEmail, password:tempPassword, confirmPassword }),
    });

    const responseData = await response.json();
    if (response.ok) {
        alert('Registration successful! Please check your email for the OTP.');
        document.getElementById('registerForm').style.display = 'none';
        document.getElementById('otpForm').style.display = 'block';
    } else {
        alert(`Registration failed: ${responseData.error || 'Unknown error'}`);
    }
});

// OTP Verification
document.getElementById('otpForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const otp = document.getElementById('otp').value;

    const response = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password:tempPassword, email: tempEmail, otp }),
    });

    const responseData = await response.json();
    if (response.ok) {
        alert('OTP verified! You may now log in.');
        window.location.href="/login.html";
    } else {
        alert(`OTP verification failed: ${responseData.error}`);
    }
});
