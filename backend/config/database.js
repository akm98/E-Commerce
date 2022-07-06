const mongoose = require("mongoose");

const connectDB = () => {
	mongoose
		.connect(process.env.DB_URI, {
			useUnifiedTopology: true,		
		})
		.then((data) => {
			console.log("Mongo Db connected with server :", data.connection.host);
		})
		// no need for this as we have handled this in server.js
		
		// .catch((err) => {
		// 	console.log("An error occured ", err);
		// });
};

module.exports = connectDB