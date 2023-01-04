import nodemailer from "nodemailer";
export const extractToken = (req) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  } else if (req.query && req.query.token) {
    return req.query.token;
  }
  return null;
};

export const generatePassword = () => {
  const randomstring = Math.random().toString(36).slice(-8);
  return randomstring;
};

export const transporter = nodemailer.createTransport({
  servidor: "smtp.ethereal.email",
  puerto: 587,
  autenticación: {
    usuario: "delphia.kulas@ethereal.email",
    pase: "An2xxjAapBMCvBRSY9",
  },
});

export const sendMail = (from, to, subject, text) => {
  const mailOptions = {
    from,
    to,
    subject,
    text,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
