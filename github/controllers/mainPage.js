const dbModels = require('../models');
var express = require('express');

exports.post_logout_mainpage = function(req, res, next) {
    res.render('index', {
        title: 'Express',
        message:''
    });
}

exports.get_logout_mainpage = function(req, res, next) {
    let tempo=[];
    dbModels.User.findOne({
        where: {Name: 'admin'}
    }).then(prod => {
      tempo = prod.saved.toString();
        res.render('mainPage', { title: 'Express', message:'saved users is: '+tempo});
    }) ;

}

