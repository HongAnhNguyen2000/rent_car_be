import express, { Request, Response } from "express";
import passport from "./passport"
const userService = require("./service");

const router = express.Router();

router.get('', (req, res) => {
  res.send("list user")
});

router.post("/register", userService.register);
router.post("/login", userService.login);
router.get('/login-google', (req, res) => {
  res.send("<a href='/api/v1/user/google'>Login with Google</a>")
})
router.get('/google',  passport.authenticate('google', {
    scope: ['email', 'profile'],
}));

router.get (
  '/google/callback',
  passport.authenticate ('google', {
    successRedirect: '/api/v1/user/google/protected',
    failureRedirect: '/api/v1/user/google/failure',
  })
);

router.get('/google/failure', (req, res) => {
  res.send ('Something went wrong!');
});

router.get('/google/protected', userService.oauthLogin);

export {router as userController};