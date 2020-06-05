const nodemailer = require('nodemailer');
const secret = require('../Config/config').pass;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'guerrerospartano123@gmail.com',
    pass: secret,
  },
});

const Emailsend = async (email, passnew) => {
  const mailOptions = {
    from: 'guerrerospartano123@gmail.com',
    to: email,
    subject: 'Colfunding',
    text: `tu nueva contraseña es: ${passnew}`,
  };
  // Enviamos el email
  const info = await transporter.sendMail(mailOptions).catch((err) => {
    console.log(err);
  });

  return info;
};

module.exports = Emailsend;
