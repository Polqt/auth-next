import nodemailer from 'nodemailer'
import User from '@/models/userModel'
import bcrypt from 'bcryptjs'

interface SendEmailParams {
    email: string;
    emailType: 'VERIFY' | 'RESET';
    userId: string;
}

export const sendEmail = async ({ email, emailType, userId}: SendEmailParams) => {
    try {
        const hashedToken = await bcrypt.hash(userId.toString(), 10)

        if (emailType === 'VERIFY') {
            await User.findByIdAndUpdate(userId, 
                {verifyToken: hashedToken,
                verifyTokenExpire: Date.now() + 3600000},
                {new: true, runValidators: true}
            )
        } else if (emailType === 'RESET') {
            await User.findByIdAndUpdate(userId, 
                {forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpire: Date.now() + 3600000},
                {new: true, runValidators: true}
            )
        }

        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASS,
            },
        });

        const mailOptions = {
            from: 'poyhidalgo@gmail.com',
            to: email,
            subject: emailType === 'VERIFY' ? 'Verify your email': 'Reset your password',
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`
        }

        const mailResponse = await transport.sendMail(mailOptions)
        return mailResponse
    } catch (error: any) {
        throw new Error(error.message)
    }
}