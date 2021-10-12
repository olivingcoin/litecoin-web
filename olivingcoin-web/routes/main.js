var express = require('express');
var router = express.Router();

// Home
router.get('/', ((req, res, next) => {
    res.render('home.html');
}))
router.get('/home', ((req, res) => res.render('home.html')))
router.get('/send', ((req, res) => res.render('send.html')))
router.get('/receive', ((req, res) => res.render('receive.html')))
router.get('/transaction', ((req, res) => res.render('transaction.html')))
router.get('/mining', ((req, res) => res.render('mining.html')))

module.exports = router;
