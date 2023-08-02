import Google, { Profile as GoogleProfile } from "passport-google-oauth20";
import passport from "passport"
import { Request } from "express";


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

export default passport