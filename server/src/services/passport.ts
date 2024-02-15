import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import dotenv from "dotenv";
import User from "../models/users/User";

dotenv.config();

const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.JWT_SECRET as string,
};

passport.use(
	new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
		try {
			const user = await User.findById(jwtPayload.userId);
			console.log(user)
			if (!user) {
				return done(null, false);
			}
			return done(null, user);
		} catch (error: unknown | any) {
			done(error, false);
			throw error as Error;
		}
	})
);

export default passport;
