import express, { Request, Response } from "express";
import passport from "passport"
const userService = require("./service");

const router = express.Router();

router.get('', (req, res) => {
  res.send("list user")
});

import Google, { Profile as GoogleProfile } from "passport-google-oauth20";


const GoogleStrategy = Google.Strategy


passport.use(new GoogleStrategy({
  clientID: '1079948418371-plt3a2vo5vsbffl4ioaefov6h0thmv4p.apps.googleusercontent.com',
  clientSecret: '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',
  callbackURL: `https://rent.car.test/api/v1/user/google/callback`,
  passReqToCallback: true 
},
function(request: Request, accessToken: string, refreshToken: string, profile: GoogleProfile, done: Google.VerifyCallback) {
  done(null, profile);
}
));

passport.serializeUser((user: Express.User, done) => {
    done(null, user)
})

passport.deserializeUser((user: Express.User, done) => {
    done(null, user)
})


  

// router.get('google/callback', 
//   passport.authenticate('google', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/');
//     });
  
// router.get('/protected', (req: Request, res: Response) => {
//     const name = req.user
//     res.send(`Hello, ${name}`)
// })

const noCache = (req: any,res: any,next: any) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next()
}

router.post("/register", userService.register);
router.post("/login", userService.login);
router.get('/login-google', (req, res) => {
  
    res.send("<a href='/google'>Login with Google</a>")
})
router.get('/google', noCache,
  passport.authenticate('google', { scope: ['email'] })
)

export {router as userController};