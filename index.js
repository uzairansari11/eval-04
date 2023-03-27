/-------------import -----/;
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connection } = require("./db");
const { userRouter } = require("./routes/users.routes")
const {postRoute}=require('./routes/posts.routes')
const {authMiddleware}=require("./middleware/auth.middleware")
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
	res.send({ msg: "Welcome to LinkedIn" });
});

app.use("/users", userRouter);
app.use(authMiddleware);

app.use("/posts", postRoute);

app.listen(process.env.port, async () => {
	await connection();
	console.log(`Server is running at ${process.env.port}`);
});
