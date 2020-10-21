import http from 'http';
import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
const LocalStrategy = require ('passport-local').Strategy;//this is your email and password stored locally. if its facebook it will be a facebook strategy

import config from './config';
import routes from './routes';
import bodyParser from 'body-parser';

//declare and creating server
let app = express();
app.server = http.createServer(app);

//middleware
//parse application/json
//this is also set up in the config file to manage the size data sent 
app.use(bodyParser.json({
    limit: config.bodyLimit
}));

//passport config
app.use(passport.initialize());
let Account = require('./model/account');
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
    Account.authenticate()
));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

//api route v1 - will use th "import routes"
app.use('/v1', routes);

app.server.listen(config.port); //information will come from import config
console.log(`Started on port ${app.server.address().port}`);

export default app;