var express = require('express');
var router = express.Router();




function getIndex(login) {
    const fixUser = (str) => str.replace(/\s+/g, '').trim().toLowerCase();

    for (i = 0; i < users.length; i++) {
        if (fixUser(users[i].getLogin()) === fixUser(login))
            return i;
    }

    return -1;
}

router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});


router.post('/save', function (req, res, next) {
    if (getIndex(req.body.username) !== -1)
        res.status(400).json({
            msg: 'Username already saved!'
        });
    else {
        users.push(new GithubUser(req.body.username));
        res.status(200).json({
            msg: 'User \'' + req.body.username + '\' saved!'
        });
    }

});

router.post('/delete', function (req, res, next) {
    const index = getIndex(req.body.username);
    if (index === -1)
        res.status(404).json({
            msg: 'No such username!'
        });
    else {
        users.splice(index, 1);
        res.status(200).json({
            msg: 'User \'' + req.body.username + '\' deleted!'
        });
    }

});

router.get('/getSaved', function (req, res, next) {
    res.status(200).json({
        users: users
    });
});



module.exports = router;