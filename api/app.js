const express = require('express');
const cors = require("cors");
const { set, connect } = require("mongoose");
const { DB, REQUEST_TIMEOUT, PORT } = require("./config/db");
const auth = require("./routes/auth-routes");
const { success, error } = require("consola");

const app = express();

app.use(cors({
    credentials: true,
    origin:'http://localhost:5173',
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", async (req, res) => {
	res.send({
		data: {
			appName: "airbnb clone!",
			developedBy: "Aditya Choudhury",
			maintainedBy: "Aditya Choudhury",
			version: "1.0.0",   
		},
		success: true,
	});
});

app.post("/", (req, res, next) => {
	res.send({
		message: "POST request is not allowed in this endpoint!!",
		success: false,
	});
});

app.get("/api/health", (req, res) => {
	res.send({
		message: "Server is Up and running",
		success: true,
	});
});

app.use("/api/auth", auth);

app.use((req, res) => {
	res.status(404).json({
		reason: "invalid-request",
		message: "The endpoint you wanna reach is not available! Please check the endpoint again",
		success: false,
	});
});

// app.post('/register', (req, res) => {
//     const { name, email, password } = req.body;
//     console.log({ name, email, password });
//     res.json({ name, email, password });
// });



const startApp = async () => {
	try {
		// Connection With DB
		await connect(DB, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			serverSelectionTimeoutMS: REQUEST_TIMEOUT,
		});

		success({
			message: `Successfully connected with the Database \n${DB}`,
			badge: true,
		});

		// Start Listenting for the server on PORT
		app.listen(PORT, async () => {
			success({ message: `Server started on PORT ${PORT}`, badge: true });
		});
	} catch (err) {
		error({
			message: `Unable to connect with Database \n${err}`,
			badge: true,
		});
		startApp();
	}
};

startApp();