let Auth_user = require('../controllers/authUser');
var express = require('express');

//get landing for $router.get('/', landing.get_landing);$
exports.landing = (req, res, next) => {
    res.render('index', {
        title: 'login page',
        message: ""
    });
};
// to post the page to landing page from any other pages
exports.post_Landing = (req, res, next) => {
    if (Auth_user.isRegestered(res,req,next,req.body.userName, req.body.passwd))
        Auth_user.userRegestered(req, res, next, req.body.userName, req.body.passwd);
    else{
        res.render('index', {
            title: 'login page',
            message: 'the user is not regstered use the default admin ;X'
        });
    }
};
exports.get_Landing = (req, res, next) => {
    res.render('index', {title: 'login page',message:''});
};
