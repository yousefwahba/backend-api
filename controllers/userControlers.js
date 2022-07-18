const asyncHandler = require("express-async-handler");
//@reoute POST /api/users/
//@desc register user
//@access public
const registerUser = asyncHandler(async (req, res) => {
  res.send("register route");
});

//@reoute login /api/users/login
//@desc login user
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  //validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("please fill all fields");
  }

  res.send("login route");
});

//export constroller
module.exports = {
  registerUser,
  loginUser,
};
