import nodemailer from 'nodemailer';

export const smtpTransport = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  port: 587,
  secure: true,
  auth: {
    user: 'pxviet_1997@outlook.com', // generated ethereal user
    pass: 'Pxviet471997', // generated ethereal password
  },
});