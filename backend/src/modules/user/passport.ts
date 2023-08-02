import Google, { Profile as GoogleProfile } from "passport-google-oauth20";
import passport from "passport"
import { Request } from "express";


const GoogleStrategy = Google.Strategy


passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.URL_ENDPOINT,
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