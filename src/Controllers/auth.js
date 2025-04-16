import kleur from "kleur";
import { createUser, loginUser } from "../services/authentication/authPage.js";
// import { getServer } from "../services/server.js";
// import { wsInit, getWsServer } from "../public/ws.js";

const getLogin = async (req, res, next) => {
  res.render("auth/login");
};

const postLogin = async (req, res, next) => {
  try {
    // Authenticate user & generate JWT
    const payload = await loginUser(req);

    // Store jwt on cookie
    res.cookie("jwt", payload.token, {
      httpOnly: true, // XSS protection
      sameSite: "Strict", // CSRF protection
      maxAge: 3600000, // 1 hour (in milliseconds)
    });

    // Storing username
    res.cookie("username", payload.user.name, {
      httpOnly: false,
      sameSite: "Strict",
      maxAge: 3600000,
    });

    // Storing id
    res.cookie("id", payload.user.id, {
      httpOnly: false,
      sameSite: "Strict",
      maxAge: 3600000,
    });

    res.status(200).json({
      status: "success",
      message: "Redirecting to home page",
    });
  } catch (err) {
    next(err);
  }
};

// Storing JWT token via HttpOnly cookie
// res.cookie("token", payload.token, {
// 	httpOnly: true, // XSS protection
// 	sameSite: "Strict", // SRF protection
// 	maxAge: 3600000, // 1 hour expiration
// });

// Storing JWT token via HttpOnly cookie

// res.cookie("user_id", payload.user.id, {
// 	sameSite: "Strict",
// 	secure: false,
// 	maxAge: 3600000, // 1 hour expiration
// });

// sessionStorage.setItem("user_id", payload.user.id);

// const wsServer = getWsServer();

// wsServer.on("connection", (ws, req) => {});

const getSignup = async (req, res, next) => {
  res.render("auth/signup");
};

const postSignup = async (req, res, next) => {
  try {
    // service method
    const newUser = await createUser(req.body);
    res.status(200).json({
      status: "success",
      message: "successfully created an account",
      createdUser: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (err) {
    next(err);
  }
};

export default { getLogin, postLogin, getSignup, postSignup };
