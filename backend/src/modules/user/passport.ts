import Google, { Profile as GoogleProfile } from "passport-google-oauth20";
import passport from "passport"
import { Request } from "express";
import Setting from "../../utils/setting";


const GoogleStrategy = Google.Strategy


passport.use(new GoogleStrategy({
  clientID: Setting.GOOGLE_CLIENT_ID,
  clientSecret: Setting.GOOGLE_CLIENT_SECRET,
  callbackURL: Setting.GOOGLE_CALLBACK_URL,
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