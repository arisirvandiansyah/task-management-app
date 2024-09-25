const User = require("../models/user");

exports.getEmployee = async (req, res) => {
  if (!req.user.is_manager) return res.sendStatus(403);
  try {
    const user = await User.find(
      { is_manager: false },
      "-password -tokens -__v"
    );
    if (!user) return res.status(404).send({ msg: "No employee found" });
    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send({ msg: error.message });
  }
};
