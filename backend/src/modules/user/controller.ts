import express, { Request, Response } from "express";
import passport from "./passport";
const userService = require("./service");

const router = express.Router();

router.get('', (req, res) => {
  res.send("list user")
});

router.post("/register-staff", userService.registerStaff);
router.post("/register", userService.registerCustomer);
router.post("/login", userService.login);
router.post('/google/authentication', userService.oauthAppLogin)



export {router as userController};