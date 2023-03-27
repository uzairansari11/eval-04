
const  jwt = require("jsonwebtoken");
const authMiddleware = (req, res, next) => {
	const token = req.headers?.authorization?.split(" ")[1];

	if (token) {
		const decoded = jwt.verify(token, "abc");

		if (decoded) {
			req.body.user_ID = decoded.User_ID;
            // console.log("auth",req.body)
			next();
		} else {
			res.status(400).send({ msg: "PLease login First" });
		}
	} else {
		res.status(400).send({ msg: "PLease login First" });
	}
};

module.exports = { authMiddleware };
