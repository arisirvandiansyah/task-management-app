const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).send("Please fill all fields");
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).send({ msg: "Your credentials is not valid" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).send({ msg: "Your credentials is not valid" });
    const payload = {
      _id: user._id,
      name: user.name,
      email: user.email,
      is_manager: user.is_manager,
    };
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "20s",
    });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "1d",
    });
    user.tokens = user.tokens.concat({ token: refreshToken });
    await user.save();
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res
      .status(200)
      .send({ msg: "Login successfully, please wait", accessToken });
  } catch (error) {
    return res.sendStatus(500).send({ msg: error });
  }
};
