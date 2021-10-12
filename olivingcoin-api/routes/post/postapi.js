var express = require('express');
var router = express.Router();
const client = require('../../client')

router.post('/getBlockchainInfo', ((req, res) => {
    client.getBlockchainInfo(req.body).then((params) => res.status(200).json(params));
}))
router.post('/getWalletInfo', ((req, res) => {
    client.getWalletInfo(req.body).then((params) => res.status(200).json(params));
}))
router.post('/listAddressGroupings', ((req, res) => {
    client.listAddressGroupings(req.body).then((params) => res.status(200).json(params));
}))
router.post('/getBalance', ((req, res) => {
    client.getBalance(req.body).then((params) => res.status(200).json(params));
}))
router.post('/listTransactions', ((req, res) => {
    client.listTransactions(req.body).then((params) => res.status(200).json(params));
}))
router.post('/sendToAddress', ((req, res) => {
    client.sendToAddress(req.body).then((params) => res.status(200).json(params));
}))
router.post('/setTxFee', ((req, res) => {
    client.setTxFee(req.body).then((params) => res.status(200).json(params));
}))
router.post('/listReceivedByAddress', ((req, res) => {
    client.listReceivedByAddress(req.body).then((params) => res.status(200).json(params));
}))
router.post('/generate', ((req, res) => {
    client.generate(req.body).then((params) => res.status(200).json(params));
}))
router.post('/getTransaction', ((req, res) => {
    client.getTransaction(req.body).then((params) => res.status(200).json(params));
}))
router.post('/validateAddress', ((req, res) => {
    client.validateAddress(req.body).then((params) => res.status(200).json(params));
}))
router.post('/getNetworkInfo', ((req, res) => {
    client.getNetworkInfo(req.body).then((params) => res.status(200).json(params));
}))
router.post('/getNewAddress', ((req, res) => {
    client.getNewAddress(req.body).then((params) => res.status(200).json(params));
}))

module.exports = router;
