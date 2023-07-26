import express, { Request } from 'express';
import passport from 'passport';
import session from "express-session";
const authController = require("../controllers/authController");

const router = express.Router();

router.get('/google',
  passport.authenticate('google', { scope: ['profile'] }));

router.get('google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
    });
  
router.get('/protected', (req: Request, res) => {
    const name = req.user
    res.send(`Hello, ${name}`)
})

router.post("/register", authController.register);

router.post("/login", authController.login);

module.exports = router;