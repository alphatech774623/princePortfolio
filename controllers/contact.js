import nodemailer from 'nodemailer';

export const contactHandler = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Create email transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'princemaurya529@gmail.com',         // Your Gmail
      pass: process.env.APP_PASS           // Use Gmail App Password
    }
  });

  const mailOptions = {
    from: email,
    to: 'princemaurya@gmail.com',             // ✅ You will receive contact messages here
    subject: `New Contact from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Message sent successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Failed to send message", error: err.message });
  }
};
