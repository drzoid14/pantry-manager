const express = require('express');
const app = express();
const { router: usersRouter } = require('./users');
const { router: authRouter, localStrategy, jwtStrategy } = require('./auth');
const passport = require('passport');
const session = require('express-session');
const morgan = require('morgan');
const route = require('./pantry-items/routes');
const { PORT, DATABASE_URL } = require('./config')
const mongoose = require('mongoose');
const cookieParser=require('cookie-parser');

app.use(cookieParser());
app.use(express.static('public'))
app.use(express.json());
app.use(morgan('common'));
app.use(session({ secret: 'mysession' }));
app.use(passport.initialize());
app.use(passport.session());
passport.use(localStrategy);
passport.use(jwtStrategy);
mongoose.Promise = global.Promise;
//app.listen(process.env.PORT || 8080);


app.use('/items', route);
app.use('/pantry/users', usersRouter);
app.use('/login', authRouter);


app.use('*', function (req, res) {

    res.status(404).json({ message: 'Not Found' });
});

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

let server;
//hi
function runServer(databaseUrl, port = PORT) {
    return new Promise((resolve, reject) => {
        mongoose.connect(databaseUrl, err => {
            if (err) {
                return reject(err);
            }
            server = app.listen(port, () => {
                console.log(`Your app is listening on port ${port}`);
                resolve();
            })
                .on('error', err => {
                    mongoose.disconnect();
                    reject(err);
                });
        });
    });
}


function closeServer() {
    return mongoose.disconnect().then(() => {
        return new Promise((resolve, reject) => {
            console.log('Closing server');
            server.close(err => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    });
}

if (require.main === module) {
    runServer(DATABASE_URL).catch(err => console.error(err));
}


module.exports = { runServer, app, closeServer };