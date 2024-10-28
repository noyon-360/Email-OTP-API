require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const admin = require('firebase-admin');
const serviceAccount = require('./email-otp-7a9ff-firebase-adminsdk-c4wy0-d48ced088f.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const app = express();
app.use(cors());
app.use(bodyParser.json());


// Set up the email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Generate a 6-digit verification code
const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// Endpoint to send verification email
app.post('/sendVerificationEmail', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: "Email is required" });
    }

    const verificationCode = generateVerificationCode();

    try {
        await admin.firestore().collection('verifications').doc(email).set({
            code: verificationCode,
            timestap: admin.firestore.FieldValue.serverTimestamp(),
        });
    } catch(e){
        console.error("Error writing to Firestore: ", error);
        return res.status(500).json({error : "Failed to save verification code" });
    }

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your Email Verification Code',
        text: `Your verification code is ${verificationCode}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email: ', error);
            return res.status(500).json({ error: "Failed to send email" });
        }
        res.status(200).json({ message: 'Verification email sent successfully', code: verificationCode });
    });
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
