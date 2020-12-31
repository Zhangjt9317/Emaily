const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

// load from the created `users` model
const User = mongoose.model('users');

// serialize user to provide a token for auth
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// deserialize the token to find user by id
passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy({
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: "/auth/google/callback",
            proxy: true
        },
        async (accessToken, refreshToken, profile, done) => {
            // avoid duplicates users
            const existingUser = await User.findOne({googleId: profile.id})

            if (existingUser) {
                //already have a user with profile id
                done(null, existingUser);
            } else {
                // create one
                const user = await new User({googleId: profile.id}).save()
                done(null, user);
            }
        }
    )
);

