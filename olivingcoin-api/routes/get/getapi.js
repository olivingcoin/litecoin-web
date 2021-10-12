var express = require('express');
var router = express.Router();
const client = require('../../client')

router.get('/getBlockchainInfo', ((req, res) => {
    client.getBlockchainInfo().then((params) => res.status(200).json(params));
}))
router.get('/getWalletInfo', ((req, res) => {
    client.getWalletInfo().then((params) => res.status(200).json(params));
}))
router.get('/listAddressGroupings', ((req, res) => {
    client.listAddressGroupings().then((params) => res.status(200).json(params));
}))
router.get('/getBalanceAll', ((req, res) => {
    client.getBalanceAll().then((params) => res.status(200).json(params));
}))
router.get('/getBalanceConfirm', ((req, res) => {
    client.getBalanceConfirm(req.param('arg1'), req.param('arg2')).then((params) => res.status(200).json(params));
}))
router.get('/listTransactions', ((req, res) => {
    client.listTransactions(req.param('arg1'), req.param('arg2')).then((params) => res.status(200).json(params));
}))
router.get('/sendToAddress', ((req, res) => {
    client.sendToAddress(req.param('arg1'), req.param('arg2')).then((params) => res.status(200).json(params));
}))

module.exports = router;
