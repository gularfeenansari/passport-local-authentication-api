//Importing libraries
const LocalStrategy  = require('passport-local'); // importing passport local startegy
const passport = require('passport');
const db = require('../database/databaseConnection'); // importing database connection
const bcrypt = require('bcrypt'); // importing library for hashing password

passport.use(new LocalStrategy(async function verify(username, password, cb) {
    await db.query('SELECT * FROM users WHERE username = ?', [ username ]).then(async(data)=>{
        if(!data[0][0]){
            return cb(null, false, { message: 'Incorrect username or password.' });
        }
        if(!await bcrypt.compare(password,data[0][0].password)){
            return cb(null, false, { message: 'Incorrect username or password.' });
        }
        return cb(null, data[0][0]);
    })

    }));

// serialization
passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, user.username);
  });
});

// deserialization
passport.deserializeUser( function(user, cb) {
  process.nextTick(async function() {
    await db.query('select * from users where username=?',[user]).then((data)=>{
        const usr = {usermame : data[0][0].username,createdon : data[0][0].createdon};
        return cb(null, usr);
    }).catch((err)=>{
        return cb(null, err);
    })

  });
});


module.exports = passport;
