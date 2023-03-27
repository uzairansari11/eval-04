const express = require("express");
const { UserModel } = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
	const { name, email, gender, password, age, city, is_married } = req.body;

	const is_UserExists = await UserModel.find({ email: email });
	console.log(is_UserExists);
	if (is_UserExists.length) {
		return res.status(400).send({ msg: "User Already Exists" });
	} else {
		try {
			if (name && email && gender && password && age && city && is_married) {
				const hashedPass = await bcrypt.hash(password, 3);
				const newUser = UserModel({ ...req.body, password: hashedPass });
				await newUser.save();
				console.log(req.body);
				res.status(200).send({ msg: "User Has Been Created Successfully" });
			} else {
				res.status(400).send({ msg: "Please Provide All the Details" });
			}
		} catch (error) {
			res.status(400).send({ msg: "Something went wrong" });
		}
	}
});

userRouter.post("/login", async (req, res) => {
	const { email, password } = req.body;

	const user = await UserModel.find({ email: email });

	console.log(user);

	try {
		if (user.length > 0) {
			bcrypt.compare(password, user[0].password, async (err, result) => {
				if (result) {
					const token = await jwt.sign({ User_ID: user[0]._id }, "abc");
					res.status(200).send({ msg: "Login Success", token: token });
					console.log(token);
				} else {
					res.status(400).send({ msg: "wrong credientals" });
				}
			});
		} else {
			res.status(400).send({ msg: "wrong credientals" });
		}
	} catch (error) {
		res.status(400).send({ msg: "wrong credientals" });
	}
});

module.exports = { userRouter };
