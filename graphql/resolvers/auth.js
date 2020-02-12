const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../models/user");

module.exports = {
  createUser: async args => {
    try {
      const existingUser = await User.findOne({ email: args.userInput.email });
      if (existingUser) {
        throw new Error("User exist already.");
      }
      const hash = await bcrypt.hash(args.userInput.password, 12);

      const user = new User({
        email: args.userInput.email,
        password: hash
      });

      const result = await user.save();
      return { ...result._doc, password: null, _id: result.id };
    } catch (err) {
      throw err;
    }
  },
  login: async ({ email, password }) => {
    const user = await User.findOne({ email: email });
    if (!user) {
      //TODO Change error message for "Invalid credentials or Email and Password do not match"
      throw new Error("User does not exist");
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      throw new Error("Email and Password do not match");
    }
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.SECRET,
      { expiresIn: "1h" }
    );
    return { userId: user.id, token: token, tokenExpiration: 1 };
  }
};
