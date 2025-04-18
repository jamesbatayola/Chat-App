import jwt from "jsonwebtoken";
import kleur from "kleur";
// import User from "../../models/user.js";
import db from "../../../Models/Index.js";
import { generateId } from "../../utils/generateId.js";
import { hashPassword, decryptPassword } from "../../utils/bcryt.js";

export const createUser = async (requestBody) => {
  const { username, email, password } = requestBody;

  const findUser = await db.User.findOne({ where: { email: email } });

  if (findUser) {
    const error = new Error("Cannot create use | Already exist");
    error.statusCode = 409;
    error.status = "failed";
    error.info = `${email} already used, please input another email`;
    throw error;
  }

  // store user to databse
  const newUser = await db.User.create({
    id: await generateId(),
    username: username,
    email: email,
    password: await hashPassword(password),
  });

  return {
    user: {
      username: newUser.username,
      id: newUser.id,
      email: newUser.email,
    },
  };
};

export const loginUser = async (req) => {
  const { email, password } = req.body;

  let findUser;

  try {
    findUser = await db.User.findOne({ where: { email: email } });
  } catch (err) {
    err.info = "Sequelize error";
    throw err;
  }

  // if email does not exist
  if (!findUser) {
    const error = new Error("User does not exist");
    error.statusCode = 404;
    error.status = "failed";
    error.info = `The email "${email}" do not exist`;
    throw error;
  }

  // if invalid password
  if (!(await decryptPassword(password, findUser.password))) {
    const error = new Error("Invalid password");
    error.statusCode = 401;
    error.status = "failed";
    error.info = "You typed a wrong password";
    throw error;
  }

  // Generate jwt token
  const token = jwt.sign({ email: findUser.email }, process.env.JWT_TOKEN);

  return {
    token: token,
    user: {
      id: findUser.id,
      name: findUser.username,
    },
  };
};
