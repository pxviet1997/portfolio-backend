import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import { smtpTransport } from "./emailServer.js";

const app = express();

const router = express.Router();

app.use(cors());
app.use(express.json());
// app.use(cookieParser());

app.use('/send-email', router.post('/', async (req, res) => {
  console.log(req.body);
  const { firstName, lastName, email, subject, message } = req.body;
  // console.log(email);
  try {
    const response = await smtpTransport.sendMail({
      // from: `"${firstName} ${lastName}" <${email}>`, // sender address
      from: {
        name: `${firstName} ${lastName}`,
        address: email
      },
      sender: email,
      to: "pxviet1997@gmail.com", // list of receivers
      subject, // Subject line
      text: message, // plain text body
      html: `<p>${message}</p>`, // html body
    });

    console.log("Message sent: " + response.messageId);
    res.status(201).json({ message: 'An email has been sent. Please check you email inbox for account verification instruction' });
  } catch (error) {
    console.log(error);
    res.json({ status: "ERROR" });

  }

}));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port : ${PORT}`));