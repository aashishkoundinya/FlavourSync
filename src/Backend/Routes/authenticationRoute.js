const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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
})

// Register route
router.post('/register', async (req, res) => {
    const { email, password, confirmPassword } = req.body;

    if (password != confirmPassword) {
        return res.status(400).json({error: 'Passwords do not match'});
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ email, password: hashedPassword });

    try {
        await newUser.save();

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Welcome to Flavour Sync',
            text: "Hi There, \n\nHappy cooking! You're now part of the Flavour Sync family. Let's create some delicious memories together.\n\nThank you for registering with us! We hope you enjoy using our platform.\n\nBest Regards,\nThe Flavour Sync Team",
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error sending email: ', error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        return res.status(201).json({ message: 'User registered successfully' });
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

    // Generate JWT
    const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '1h' });
    res.json({ token });
});

module.exports = router;
