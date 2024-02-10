import passport from 'passport';
import JwtStrategy from "passport-jwt";
import { ExtractJwt } from "passport-jwt";
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
const User = mongoose.model("User");

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET as string,
  };
  
  passport.use(new JwtStrategy.Strategy(jwtOptions, (payload, done) => {
    if (payload) {
      return done(null, payload);
    }
    return done(null, false);
  }));
