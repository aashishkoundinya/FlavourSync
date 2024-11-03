const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const crypto = require('crypto');
const User = require('../Models/userModel');
const nodeMailer = require('nodemailer');
const router = express.Router();

require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
    console.error('JWT_SECRET is not set in the environment variables');
    process.exit(1);
}

const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const generateOTP = () => crypto.randomInt(100000, 999999).toString();

const otpStore = {};

// Register route
router.post('/register', async (req, res) => {
    const { email, password, confirmPassword, username } = req.body;

    if (password != confirmPassword) {
        return res.status(400).json({ error: 'Passwords do not match' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
        return res.status(400).json({error: 'Username is already taken'});
    }

    const otp = generateOTP();
    const otpExpires = Date.now() + 5 * 60 * 1000; // 5 minutes

    otpStore[email] = { otp, otpExpires };

    const mailOptions = {
        from: 'Flavour Sync <' + process.env.EMAIL_USER + '>',
        to: email,
        subject: 'Welcome to Flavour Sync',
        attachments: [{
            filename: 'Welcome.png',
            path: path.join(__dirname, '../../Frontend/Assets/Welcome.png'),
            cid: 'bannerImage'
        }],
        html: `
            <div>
                <img src="cid:bannerImage" style="width: 100%; height: auto;">
                <p>Hi There,</p>
                <p>Your OTP for completing your registration is <strong>${otp}</strong>. It will expire in 10 minutes. <strong>Do Not share OTP with anyone!!</strong></p>
                <p>Happy cooking! You're now part of the Flavour Sync family. Let's create some delicious memories and recipes together.</p>
                <p>Thank you for registering with us! We hope you enjoy using our platform.</p>
                <p>Best Regards,<br>The Flavour Sync Team</p>
            </div>
        `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email: ', error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    return res.status(201).json({ message: 'OTP sent to your email. Please verify to complete registration.' });
});

// OTP Verification
router.post('/verify-otp', async (req, res) => {
    const { email, otp, password, username } = req.body;

    const storedOtpData = otpStore[email];
    if (!storedOtpData || storedOtpData.otp !== otp || storedOtpData.otpExpires < Date.now()) {
        return res.status(400).json({ error: 'Invalid or expired OTP' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword, username });
    
    try {
        await newUser.save();
        delete otpStore[email];
        return res.status(200).json({ message: 'Registration successful!' });
    } catch (error) {
        return res.status(500).json({ error: 'Error registering user' });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '1h' });
    res.json({ token });
});

// Forgot Password Route - Send OTP
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({ error: 'No user found with this email' });
    }

    const otp = generateOTP();
    const otpExpires = Date.now() + 5 * 60 * 1000; // OTP expires in 5 minutes
    otpStore[email] = { otp, otpExpires };

    const mailOptions = {
        from: 'Flavour Sync <' + process.env.EMAIL_USER + '>',
        to: email,
        subject: 'Password Reset OTP',
        html: `<p>Your OTP for password reset is <strong>${otp}</strong>.<strong>Do Not Share OTP with anyone!!</p>`,
    };

    transporter.sendMail(mailOptions, (error) => {
        if (error) {
            return res.status(500).json({ error: 'Error sending email' });
        }
        res.status(200).json({ message: 'OTP sent to your email' });
    });
});

// Reset Password Route - Verify OTP and Update Password
router.post('/reset-password', async (req, res) => {
    const { otp, newPassword } = req.body;
    const userEmail = Object.keys(otpStore).find(email => otpStore[email].otp === otp);

    if (!userEmail || otpStore[userEmail].otpExpires < Date.now()) {
        return res.status(400).json({ error: 'Invalid or expired OTP' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    try {
        await User.updateOne({ email: userEmail }, { password: hashedPassword });
        delete otpStore[userEmail];
        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        res.status(500).json({ error: 'Error resetting password' });
    }
});

module.exports = router;
