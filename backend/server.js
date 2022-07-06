const app = require("./app");
const dotenv = require("dotenv");
const connectDB = require("./config/database");

// Handling uncaught exception for eg if using an undefiend var
process.on("uncaughtException", (err) => {
	console.log("uncaughtException Error ---->", err.message);
	process.exit(1);
});

dotenv.config({ path: "backend/config/config.env" });

// handled 3 types of error
// 1 is wrong payload err in api --- ref-> error.js
// 2 is fatal error in api which causes server to be stopped --- ref-> catchAsyncError.js
// 3 is unhandledRejection --- ref -> server.js
// 4 is uncaughtException --- ref -> server.js
// 5 mongo db error --- ref-> error.js

// connect to mongo db

connectDB();

const server = app.listen(process.env.PORT, () => {
	console.clear();
	console.log("Server is running on https://localhost:", process.env.PORT);
});

// Unhandled Promise reject eg wrong connection string or some db expception
process.on("unhandledRejection", (err) => {
	console.log("Error: ", err.message);
	console.log("Shutting down server");
	server.close(() => {
		process.exit(1);
	});
});
