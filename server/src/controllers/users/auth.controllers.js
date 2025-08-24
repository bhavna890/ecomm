const { verify } = require("jsonwebtoken");
const Cart = require("../../models/cart");
const WishList = require("../../models/wishlist");
const { registerUser, findUserByEmail } = require("../../services/users/auth.services");
const { generateToken, hashPassword, verifyPassword } = require("../../utils");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({
      success: false,
      error: "All fields are required",
    });
  }

  try {
  //  hash password
    const hashPswd =await hashPassword(password);
    const user = await registerUser({ name, email, password: hashPswd});

    // remove password
     user.password = undefined;
     user.__v = undefined;

    return res.json({
      success: true,
      data: user,
      message: "User registered successfully",
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.json({
        success: false,
        error: "Email already exists",
      });
    }

    console.log(error)

    return res.json({
      success: false,
      error: "User registration failed",
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      success: false,
      error: "Email or Password is required!",
    });
  }

  try {
    const user = await findUserByEmail(email);

    // check user
    if (!user) {
      return res.json({
        success: false,
        error: "User doesn't exist!",
      });
    }

    // check password
    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      return res.json({
        success: false,
        error: "Wrong password!",
      });
    }

    user.password = undefined;

    // generate token
    const { accessToken, refreshToken } = generateToken({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });

    return res.json({
      success: true,
      message: "User loggedin successfully!",
      data: { user, accessToken, refreshToken },
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      error: "something went wrong!",
    });
  }
};



module.exports = { register, login };