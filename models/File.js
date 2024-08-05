const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
require("dotenv").config();

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  videoUrl: {
    type: String,
  },
  tags: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
});

// post middleware
fileSchema.post("save", async (doc) => {
  // jo entry db me create hui hai wahi doc se refer kr rhe hai
  try {
    console.log(doc, "doc");
    // Create trasnporter

    //TODO :  Shift this to config folder in a new file  nodemailer.js
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
    //   send mail
    let mailContent = await transporter.sendMail({
      from: "Ashish Srivastava - NodeMailer",
      to: doc.email,
      subject: "New File Uploaded on Cloudinary",
      html: `<h1>Hello ${doc.name}</h1> <p>New File Uploaded on Cloudinary.<br> Visit The link to check the file ${doc.imageUrl} </p>`,
    });
    console.log(mailContent, "mailcontent");
  } catch (e) {
    console.log(e);
  }
});

module.exports = mongoose.model("file", fileSchema);
