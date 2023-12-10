import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { ApiError, ApiSuccess } from '../enums';

let lastEmailSentTimestamp = 0;

export async function POST(req) {
  if (req.method === 'POST') {
    const { email, name, message } = await req.json();
    if (!email || !name || !message) {
      return NextResponse.json({
        msg: ApiError.NO_DATA,
        success: false,
      });
    }

    const currentTime = new Date().getTime();
    const elapsedTimeSinceLastEmail = currentTime - lastEmailSentTimestamp;
    const rateLimit = 180 * 1000;

    if (elapsedTimeSinceLastEmail < rateLimit) {
      return NextResponse.json({
        msg: ApiError.RATE_LIMIT_EXCEEDED,
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
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: 'New Translator',
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      lastEmailSentTimestamp = currentTime;

      return NextResponse.json({
        msg: ApiSuccess.EMAIL_SENT_SUCCESSFULLY,
        success: true,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: ApiError.INTERNAL_SERVER_ERROR });
    }
  } else {
    return res.status(405).json({ error: ApiError.METHOD_NOT_ALLOWED });
  }
}
