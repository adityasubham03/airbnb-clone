const User = require("../models/User");
const bcrypt = require("bcrypt");
const register = async (req, res, next) => {
	const { name, email, password } = req.body;
	if (!name || !email || !password) {
		return res
			.status(404)
			.json({ message: "Please enter all the fields!!", success: false });
	}

	const existingUser = await User.findOne({ email: email });
	if (existingUser) {
		return res.status(400).json({
			success: false,
			message: "Account already exists associated with this account!!",
			reason: "email",
		});
	}

	const hashedPassword = await bcrypt.hash(password, 12);
	const user = new User({
		name: name,
		email: email,
		password: hashedPassword,
	});
	try {
		user.save();
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			success: false,
			message: "Internal Server Error",
			reason: "server",
		});
	}
	return res.status(200).json({
		success: true,
		message: "Account Created Successfully!!",
	});
};

const login = async (req, res, next) => {
    
}

module.exports = { register };
