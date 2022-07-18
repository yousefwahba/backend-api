//@reoute POST /api/users/
//@desc register user
//@access public
const registerUser = (req, res) => {
  res.send("register route");
};

//@reoute login /api/users/login
//@desc login user
//@access public
const loginUser = (req, res) => {
  const { name, email, password } = req.body;

  //validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  res.send("login route");
};

//export constroller
module.exports = {
  registerUser,
  loginUser,
};
