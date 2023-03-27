const express = require("express");
const postRoute = express.Router();
const { PostModel } = require("../model/post.model");

postRoute.get("/", async (req, res) => {
	console.log("-----------", req.body.user_ID);
    const filter = req.query;
    console.log(req.query)
	// if (req.query) {
	// 	filter = ;
	// }
	try {
		const post = await PostModel.find(
			{ user_ID: req.body.user_ID },
			 filter 
		);
		res.send({ post });
	} catch (error) {
		res.send({ data: error.message });
	}
});

postRoute.post("/add", async (req, res) => {
	try {
		const payload = req.body;
		const newPost = new PostModel(payload);
		await newPost.save();
		res.send({ msg: "Post Success", data: newPost });
	} catch (error) {
		res.send({ data: error.message });
		console.log(error.message);
	}
});

postRoute.patch("/update/:id", async (req, res) => {
	const payload = req.body;

	try {
		const id = req.params.id;
		await PostModel.findByIdAndUpdate(id, payload);
		res.send({ msg: "Post updated" });
	} catch (error) {
		res.send({ msg: error.message });
	}
});

postRoute.delete("/delete/:id", async (req, res) => {
	try {
		const id = req.params.id;
		await PostModel.findByIdAndDelete(id);
		res.send({ msg: "Post Deleted" });
	} catch (error) {
		res.send({ msg: error.message });
	}
});
module.exports = { postRoute };
