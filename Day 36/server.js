import { config } from 'dotenv';
import express from 'express';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

config();

const app = express();

app.get("/", (req, res) => {
    res.send("OAuth 2.0 Working!!!!");
});

app.use(passport.initialize());

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
},
    function (_, __, profile, done) {
        return done(null, profile);
    }
));

app.get("/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get("/auth/google/callback",
    passport.authenticate("google", {
        session: false,
        failureRedirect: "/"
    }),
    (req, res) => {
        console.log(req.user);
        res.send("Google Authentication Successful!!!!");
    });

app.listen(process.env.PORT, () => {
    console.log("Server is running on port ", process.env.PORT);
});