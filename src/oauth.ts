import Google, { Profile as GoogleProfile } from "passport-google-oauth20";
import passport from "passport"
import dotenv from "dotenv";
import { Request } from "express";

dotenv.config()

const GoogleStrategy = Google.Strategy


passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID ?? '',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '', // Provide a default value if it's undefined
  callbackURL: "http://localhost:8000/auth/google/callback",
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

export default passport