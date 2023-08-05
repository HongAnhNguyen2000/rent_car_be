import express, { Request, Response } from "express";
import passport from "./passport";
const userService = require("./service");

const router = express.Router();

router.get('', (req, res) => {
  res.send("list user")
});

router.post("/register", userService.register);
router.post("/login", userService.login);

router.post('/google/authentication', userService.oauthAppLogin)


export {router as userController};