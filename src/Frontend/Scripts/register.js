let tempEmail;
let tempPassword;
let tempUsername;

document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const username = document.getElementById('username').value.toLowerCase().replace(/\s+/g, '');

    tempEmail = email;
    tempPassword = password;
    tempUsername = username;

    if (password != confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: tempEmail, password:tempPassword, confirmPassword, username: tempUsername }),
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
    // const otp = document.getElementById('otp').value;
    const otp = Array.from(document.querySelectorAll('#otpInputs input'))
                .map(input => input.value)
                .join('');

    const response = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password:tempPassword, email: tempEmail, username: tempUsername, otp }),
    });

    const responseData = await response.json();
    if (response.ok) {
        alert('OTP verified! You may now log in.');
        window.location.href="/login.html";
    } else {
        alert(`OTP verification failed: ${responseData.error}`);
    }
});

function moveToNext(current, nextFieldId, prevFieldId) {
    if (current.value.length === current.maxLength && nextFieldId) {
        document.getElementById(nextFieldId).focus();
    } else if (current.value.length === 0 && prevFieldId) {
        document.getElementById(prevFieldId).focus();
    }
}

document.querySelectorAll('.otpDigit').forEach((input) => {
    input.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            document.getElementById('verifyOtpBtn').click();
        }
    });
});
