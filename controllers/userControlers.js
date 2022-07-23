const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
//@reoute POST /api/users/
//@desc register user
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  //validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("please fill all fields");
  }
  //find if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new error("Invalid data");
  }
});

//@reoute login /api/users/login
//@desc login user
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //validation
  if (!email || !password) {
    res.status(400);
    throw new Error("please fill all fields");
  }
  //find if user exists
  const userExists = await User.findOne({ email });
  if (!userExists) {
    res.status(400);
    throw new Error("User does not exist");
  }
  //check password
  const isMatch = await bcrypt.compare(password, userExists.password);
  if (!isMatch) {
    res.status(400);
    throw new Error("Invalid password");
  } else {
    res.json({
      _id: userExists._id,
      name: userExists.name,
      email: userExists.email,
    });
  }
});
//@reoute get /api/users/me
//@desc register user
//@access private
const getMe = asyncHandler(async (req, res) => {
  const user = {
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };
  res.json(user);
});

//generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

//export constroller
module.exports = {
  registerUser,
  loginUser,
  getMe,
};
