import { Profile, VerifyCallback, Strategy } from 'passport-google-oauth20';
import passport from 'passport';
import { API_PATH_SEGMENT } from '../../constants/url';
import User from '../../classes/User';
import logError from '../logError';
import { EncryptedUser } from '../../types/user';

const GOOGLE_SIGN_IN_CALLBACK_URL = API_PATH_SEGMENT.root + API_PATH_SEGMENT.auth.segment +
    API_PATH_SEGMENT.auth.signIn.segment + API_PATH_SEGMENT.auth.signIn.google.segment +
    API_PATH_SEGMENT.auth.signIn.google.callback.segment;

const PassportStrategyOption = {
    callbackURL: GOOGLE_SIGN_IN_CALLBACK_URL,
    clientID: process.env.SSO_GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.SSO_GOOGLE_CLIENT_SECRET as string,
};

const verify = async (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
    const userFromGoogle = {
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails ? profile.emails[0].value : null,
        photo: profile.photos ? profile.photos[0].value : null,
    };

    try {
        const encryptedUser = await User.getOrCreateUser(userFromGoogle);

        done(null, encryptedUser);
    } catch (error) {
        logError(error, userFromGoogle);

        done(null, false);
    }
};

// Set the passport strategy
passport.use(new Strategy(PassportStrategyOption, verify));

// Save the user to the cookie (called once at sign in)
passport.serializeUser((user, done) => {
    done(null, user);
});

// Read the user from the cookie and decrypt it (called at every request after sign in)
passport.deserializeUser((encryptedUser: EncryptedUser, done) => {
    done(null, {
        ...encryptedUser,
        id: User.decryptUserId(encryptedUser.id),
        isAdmin: false,
    });
});

export default passport;
