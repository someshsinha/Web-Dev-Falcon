import Mailgen from "mailgen";
import nodemailer from "nodemailer";
const sendEmail = async (options) => {
  const mailGenerator = new Mailgen({
    theme: "neopolitan",
    product: {
      // Appears in header & footer of e-mails
      name: "Mailgen",
      link: "https://mailgen.js/",
      // Optional product logo
      logo: "https://branition.com/assets/img/users/logos/15905-xb0ooJM.webp",
    },
  });

  const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent);
  const emailHtml = mailGenerator.generate(options.mailgenContent);

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_MAILTRAP_HOST,
    port: process.env.SMTP_MAILTRAP_PORT,
    secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
    auth: {
      user: process.env.SMTP_MAILTRAP_USERNAME,
      pass: process.env.SMTP_MAILTRAP_PASS,
    },
  });

  const mail = {
    from: "mail.taskmanager@example.com",
    to: options.email,
    subject: options.subject,
    text: emailTextual,
    html: emailHtml,
  };

  try {
    await transporter.sendMail(mail);
  } catch (error) {
    console.error(
      "Email service failed siliently. Most sure that you have provided your MAILTRAP crenditials correct in the .env file",
    );
  }
};

const emailVerificationMailgenContent = (username, verificationUrl) => {
  return {
    body: {
      name: username,
      intro: "Welcome to MasterJI, we are excited to have you here.",
      action: {
        instructions:
          "To verify you email please click on the following button",
        button: {
          color: "#22BC66", // Optional action button color
          text: "Confirm your account",
          link: verificationUrl,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};

const forgetPasswordMailgenContent = (username, verificationUrl) => {
  return {
    body: {
      name: username,
      intro:
        "We received a request for reset password of your MasterJi account.",
      action: {
        instructions:
          "To reset your password please click on the following button",
        button: {
          color: "#22BC66", // Optional action button color
          text: "Confirm your account",
          link: verificationUrl,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};

export {
  sendEmail,
  forgetPasswordMailgenContent,
  emailVerificationMailgenContent,
};
