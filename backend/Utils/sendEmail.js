const nodemailer = require("nodemailer");

const sendEmail = async (emailObj) => {
	const transporter = nodemailer.createTransport({
		service: process.env.SMPT_SERVICE,
		auth: {
			user: process.env.SMPT_ADDRESS,
			pass: process.env.SMPT_PASSWORD,
		},
	});
	const mailOptions = {
		from: process.env.SMPT_ADDRESS,
		to: emailObj.email,
		subject: emailObj.subject,
		text: emailObj.message,
	};

	await transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error);
		}
	});
};

module.exports = sendEmail;
