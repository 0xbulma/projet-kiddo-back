import nodemailer from 'nodemailer';

async function sendEmail(resetToken, emailTo) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

   // create reusable transporter object using the default SMTP transport
   let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  // service: "Gmail",
  //   auth: {
  //         user: "******@gmail.com",
  //         pass: "gmail_password"
  //       }

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "test@gmail.com", // list of receivers
    subject: "Kiddo : création d'un nouveau mot de passe", // Subject line
    text: `Lien de récupartion de mot de passe: /https://kiddo-front-la-passerelle.netlify.app/recoverpassowrd?token=${resetToken}`, // plain text body
    html: `<b>Lien de récupartion de mot de passe: /https://kiddo-front-la-passerelle.netlify.app/recoverpassowrd?token=${resetToken}</b>`, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

export default sendEmail;