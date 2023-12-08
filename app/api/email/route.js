import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

let lastEmailSentTimestamp = 0;

export async function POST(req) {
  if (req.method === 'POST') {
    const { email, name, message } = await req.json();
    if (!email || !name || !message) {
      return NextResponse.json({
        msg: 'No data',
        success: false,
      });
    }

    const currentTime = new Date().getTime();
    const elapsedTimeSinceLastEmail = currentTime - lastEmailSentTimestamp;
    const rateLimit = 180 * 1000;

    if (elapsedTimeSinceLastEmail < rateLimit) {
      return NextResponse.json({
        msg: 'Rate limit exceeded. Please wait before sending another email.',
        success: false,
      });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'meetyourmate.od@gmail.com',
        pass: 'sddvorieahdzpdfj',
      },
    });
    const mailOptions = {
      from: 'meetyourmate.od@gmail.com',
      to: 'info@babchenkov-portfolio.com',
      subject: 'New Translator',
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    try {
      await transporter.sendMail(mailOptions);

      lastEmailSentTimestamp = currentTime;

      return NextResponse.json({
        msg: 'Email has been sent successfully',
        success: true,
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: 'Internal server error. Failed to send email.' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed.' });
  }
}
