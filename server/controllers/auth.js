const User = require("../models/user");
const bcrypt = require("bcrypt");
exports.register = async (req, res) => {
  const { name, email, password, is_manager } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please fill all fields" });
  }
  try {
    existingUser = await User.findOne({ email });
    if (existingUser)
      return res
        .status(400)
        .json({ msg: "Email has been taken, please use another email" });
    const hashedPassword = await bcrypt.hash(password, 8);
    const payload = {
      name,
      email,
      password: hashedPassword,
      is_manager,
    };
    const user = new User(payload);
    await user.save();
    return res
      .status(201)
      .json({ msg: "User created successfully, please login" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
