const Client = require('bitcoin-core');
const client = new Client({ 
  network: 'mainnet', 
  username: 'user', 
  password: '1234', 
  port: 5232 
});

//const getBlockchainInfo = (() => client.getBlockchainInfo());

const getBlockchainInfo = (() => client.getBlockchainInfo());
const getWalletInfo = (() => client.getWalletInfo());
const listAddressGroupings = (() => client.listAddressGroupings());
const getBalance = ((args) =>client.getBalance(...Object.values(args)));
const listTransactions = ((args) =>client.listTransactions(...Object.values(args)));
const setTxFee = ((args) =>client.setTxFee(...Object.values(args)));
const sendToAddress = ((args) => client.sendToAddress(...Object.values(args)));
const listReceivedByAddress = ((args) => client.listReceivedByAddress(...Object.values(args)));
const generate = ((args) => client.generate(...Object.values(args)));
const getTransaction = ((args) => client.getTransaction(...Object.values(args)));
const validateAddress = ((args) => client.validateAddress(...Object.values(args)));
const getNetworkInfo = ((args) => client.getNetworkInfo(...Object.values(args)));
const getNewAddress = ((args) => client.getNewAddress(...Object.values(args)));

/*const listTransactions = ((arg1, arg2, arg3, arg4) => {
  return client.listTransactions(arg1, arg2, arg3, arg4);
});
//client.getBlockchainInfo().then((help) => console.log(help));
//client.ping().then((ping) => console.log(ping));
*/
/*const sendToAddress = ((args) => {
  const argsArr = new Array()
  for(key in args) {
    argsArr.push(args[key]);
  }
  return client.sendToAddress(...argsArr);
});*/

module.exports = {
  getBlockchainInfo,
  getWalletInfo,
  listAddressGroupings,
  getBalance,
  listTransactions,
  sendToAddress,
  setTxFee,
  listReceivedByAddress,
  generate,
  getTransaction,
  validateAddress,
  getNetworkInfo,
  getNewAddress,
}