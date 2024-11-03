// Event listener to send OTP
document.getElementById('forgotPasswordForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('forgotEmail').value;

    const response = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
    });

    const responseData = await response.json();
    if (response.ok) {
        alert('OTP sent to your email. Please verify to reset your password.');
        document.getElementById('forgotPasswordForm').style.display = 'none';
        document.getElementById('resetPasswordForm').style.display = 'block';
    } else {
        alert(`Error: ${responseData.error}`);
    }
});

// Event listener to reset password
document.getElementById('resetPasswordForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const otp = document.getElementById('resetOtp').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmNewPassword = document.getElementById('confirmNewPassword').value;

    if (newPassword !== confirmNewPassword) {
        alert('Passwords do not match!');
        return;
    }

    const response = await fetch('/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp, newPassword }),
    });

    const responseData = await response.json();
    if (response.ok) {
        alert('Password reset successful! You may now log in.');
        window.location.href = '/login.html';
    } else {
        alert(`Error: ${responseData.error}`);
    }
});
