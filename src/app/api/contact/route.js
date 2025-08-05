// src/app/api/contact/route.js
import nodemailer from "nodemailer";
import { connectToDB } from "@/lib/db";
import EmailRecipient from "@/models/EmailRecipient";

export async function POST(req) {
  try {
    const data = await req.json();

    // ⛳️ Get recipient emails from DB
    await connectToDB();
    const recipients = await EmailRecipient.find().then((list) =>
      list.map((item) => item.email)
    );

    // ✅ Setup mail transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    await transporter.verify();

    // ✅ Send email
    const mail = await transporter.sendMail({
      from: `"SFK Real Estate Consultancy" <${process.env.GMAIL_USER}>`,
      to: recipients.join(", "),
      subject: `New Contact Form – ${data.firstName} ${data.lastName}`,
      html: `
        <h2>New Contact Submission</h2>
        <p><b>First Name:</b> ${data.firstName}</p>
        <p><b>Last Name:</b> ${data.lastName}</p>
        <p><b>Email:</b> ${data.email}</p>
        <p><b>Phone:</b> ${data.phone}</p>
        <p><b>Property Type:</b> ${data.property}</p>
        <p><b>Unit Type:</b> ${data.unit}</p>
        <p><b>Preferred Contact Mode:</b> ${data.contactMode}</p>
      `,
    });

    console.log("✅ Email sent:", mail.messageId);
    return Response.json({ ok: true });
  } catch (err) {
    console.error("❌ Mail error:", err);
    return new Response("Mail error", { status: 500 });
  }
}

// ✅ Step 3: 2-Step Verification ON হলে নিচে “App passwords” নামে একটি অপশন আসবে

// এই লিংকেও সরাসরি যেতে পারো (2FA চালু না থাকলে কাজ করবে না):
// 👉 https://myaccount.google.com/apppasswords

// ✅ Step 4: App Password Create করো
// App: Mail সিলেক্ট করো

// Device: Other → লিখো “SFK Real Estate Consultancy”

// ✅ তারপর Generate চাপো

// ✅ Step 5: Google তোমাকে ১৬-সংখ্যার একটা Password দিবে
// 📋 এটা Copy করে রাখো (একবারই দেখা যাবে)

// 🧪 এখন তোমার .env.local ফাইলে রাখো:
// env
// Copy
// Edit
// GMAIL_USER=yourgmail@gmail.com
// GMAIL_PASS=xxxxxxxxxxxxxxxx
// তারপর npm run dev রিস্টার্ট করে আবার submit করো।
