const express = require('express');
const passport = require('passport');
const router = express.Router();
const user = require('./schema/user')
let token = require("../../onchain/token");
// const {body} = require("express-validator");

// { failureRedirect: '/' },
router.post('/login',
    passport.authenticate('local'),
    function(req, res) {
        res.sendStatus(200);
});

router.get('/info', (req, res) => {
    if(req.user !== undefined) {
        res.send(req.user);
    } else {
        res.send(null);
    }
})

router.get('/logout', (req, res) => {
    if(req.isAuthenticated()){
        req.logout((err) => {
            console.log(err)
            res.redirect('/');
        });
    } else {
        res.redirect('/');
    }
});

router.post('/signup', async (req, res) => {
    const reqBody = req.body;
    console.log({username: reqBody.username, principalId: reqBody.principalId});
    const users = new user({username: reqBody.username, principalId: reqBody.principalId})
    token = await token;
    user.register(users, req.body.password, async (err, user) => {
        if (err) {
            // console.log(err)
            res.status(500).send({success: false, message: err.message});
        } else {
            await token.transfer(await token.textToPrincipal(reqBody.principalId), 5);
            res.redirect('/');
            // res.status(201).send({success: true, message: "Your account has been saved"});
        }
    })
})


module.exports = router;