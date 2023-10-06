// Imporrting libraries
require('dotenv/config')
const db = require('../database/databaseConnection')
const router = require('express').Router(); // importing router
const bcrypt = require('bcrypt'); // importing library to hash password
const passport = require('../passport/passport')
const session = require('express-session');



router.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
  }));
router.use(passport.authenticate('session'));


// post method to login
router.post('/login',passport.authenticate('local'),(req,res)=>{
    res.send("Authenticated");
})

//POst method to check if user is Authenticated
router.post('/login/check',(req,res)=>{
    if(req.isAuthenticated()){
        res.send(req.isAuthenticated());
    }else{
        res.send(req.isAuthenticated());
    }
})

// Post method to signup a user
router.post('/signup',async(req,res)=>{
    let {username, password} = req.body;
    if(username && password){
        await db.query('select * from users where username = ?',[username]).then(async(data)=>{
            if(data[0][0]){
                res.send('User already exist');
            }else{
                const hashedPassword =  await bcrypt.hash(password, 8)
                await db.query('insert into users(username,password) values(?,?)',[username,hashedPassword]).then((data)=>{
                    res.send('User Created');
                }).catch((err)=>{
                    res.send(err);
                });

            }
        }).catch((err)=>{
            res.send(err);
        })
    }else{
        res.send('Invalid Name or password');
    }
})

//Post method to logout user
router.post('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.send('logged out');
    });
  });

module.exports = router; // exporting router
