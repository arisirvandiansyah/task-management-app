const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.token = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(401);
  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const payload = {
      _id: decoded._id,
      name: decoded.name,
      email: decoded.email,
      is_manager: decoded.is_manager,
    };
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "20s",
    });
    return res.send({ accessToken });
  } catch (error) {
    return res.status(500).send({ msg: error.message });
  }
};

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
    return res.sendStatus(500).send({ msg: error.message });
  }
};

exports.logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);
  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findOne({ _id: decoded._id });
    if (!user) {
      res.clearCookie("refreshToken");
      return res.sendStatus(204);
    }
    user.tokens = user.tokens.filter((token) => token.token !== refreshToken);
    await user.save();
    res.clearCookie("refreshToken");
    return res.status(200).send({ msg: "Logout successfully" });
  } catch (error) {
    return res.status(500).send({ msg: error.message });
  }
};
