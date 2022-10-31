import nodemailer from 'nodemailer';

import dotenv from 'dotenv';
import { userI } from '../interfaces/project';
dotenv.config();

export const signupEmail = async (userData: userI) => {
  const { name, lastname, email, token } = userData;

  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transport.sendMail({
    from: '"OhMyTask - Project admin" <account@uptask.com>',
    to: email,
    subject: 'Uptask - Confirm your account',
    text: 'Confirm your account in OhMyTask',
    html: `
    <p>Hello ${lastname} ${name}.</p>
    <p>Your account is almost ready, confirm it by clicking on the following link:</p>

    <a href="${process.env.FRONTEND_URL}/confirm/${token}">Confirm my account</a>

    <p>If you were not the one who created this account, ignore this email.</p>
    `,
  });
};

export const recoverPasswordEmail = async (userData: userI) => {
  const { name, lastname, email, token } = userData;

  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transport.sendMail({
    from: '"OhMyTask - Project admin" <account@uptask.com>',
    to: email,
    subject: 'Uptask - Regain acces to your account',
    text: 'Reset your password account in OhMyTask',
    html: `
    <p>Hello ${lastname} ${name}.</p>
    <p>Do You forgot your password? Don't worry click on the following link to recover it:</p>

    <a href="${process.env.FRONTEND_URL}/forgot-password/${token}">Reset my password</a>

    <p>If you were not the one who applied for this request, ignore this email.</p>
    `,
  });
};
