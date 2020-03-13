const dbModels = require('../models');
var express = require('express');

exports.isRegestered = (res, req, next, userName, Passwd) => {
    var boolia = true;
    dbModels.User.findOne({
        where: {Name: userName}
    }).then(prod => {
        if (prod == null) {
            boolia = false;
        }
    });
    if (boolia) {
        return true;
    }
    return false;
};


exports.userRegestered = (req, res, next, admin, password) => {
    dbModels.User.findOne({
        where: {Name: admin}
    }).then(prod => {
        if (prod == null) {
            dbModels.User.create({
                Name: admin,
                passwd: password,
                saved: ''
            });
            res.render('index', {
                title: 'login page',
                message: "user not found \n the new user is created"
            });
        } else if (password == prod.passwd) {
            var tempo = [];
            dbModels.User.findOne({
                where: {Name: admin}
            }).then(prod => {
                tempo = prod.saved.toString();
                res.render('mainPage',
                    {
                        title: 'Express',
                        message: 'saved users is: ' + tempo
                    });
            });
        } else if (password != prod.passwd) {
            res.render('index', {
                title: 'login page',
                message: "password is incorrect try again"
            });
        }
    })
};


//
// dbModels.User.create({
//     Name: 'admin',
//     passwd: '1234',
//     saved: 'shriki001 amere17'
// });
// dbModels.User.findOne({
//     where: {Name: 'admin'},
// }).then(prod => {
//     console.log(prod.passwd);
//     console.log("qussay");
// });