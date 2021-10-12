const rpcAPI = ((name, args) => {
    const POSTBody = getPOSTBody(args);
    const rpcAPIPromise = fetch(`http://${APIURL}/${POST}/${name}`, POSTBody)
        .catch((error) => console.error(error));

    return rpcAPIPromise;
});

const getBalance = ((...args) => {
    const POSTBody = getPOSTBody(args);
    const getBalancePromise = fetch(`http://${APIURL}/${POST}/getBalance`, POSTBody)
        .catch((error) => console.error(error));

    return getBalancePromise;
});

const getBlockchainInfo = ((...args) => {
    const POSTBody = getPOSTBody(args);
    const getBlockchainInfoPromise = fetch(`http://${APIURL}/${POST}/getBlockchainInfo`, POSTBody)
        .catch((error) => console.error(error));

    return getBlockchainInfoPromise;
});

const getWalletInfo = ((...args) => {
    const POSTBody = getPOSTBody(args);
    const getWalletInfoPromise = fetch(`http://${APIURL}/${POST}/getWalletInfo`, POSTBody)
        .catch((error) => console.error(error));

    return getWalletInfoPromise;
});

const getTransaction = ((...args) => {
    const POSTBody = getPOSTBody(args);
    const getTransactionPromise = fetch(`http://${APIURL}/${POST}/getTransaction`, POSTBody)
        .catch((error) => console.error(error));

    return getTransactionPromise;
});

const listAddressGroupings = ((...args) => {
    const POSTBody = getPOSTBody(args);
    const listAddressGroupingsPromise = fetch(`http://${APIURL}/${POST}/listAddressGroupings`, POSTBody)
        .catch((error) => console.error(error));

    return listAddressGroupingsPromise;
});

const listTransactions = ((...args) => {
    const POSTBody = getPOSTBody(args);
    const listTransactionsPromise = fetch(`http://${APIURL}/${POST}/listTransactions`, POSTBody)
        .catch((error) => console.error(error));

    return listTransactionsPromise;
});

const sendToAddress = ((...args) => {
    const POSTBody = getPOSTBody(args);
    const sendToAddressPromise = fetch(`http://${APIURL}/${POST}/sendToAddress`, POSTBody)
        .catch((error) => console.error(error));

    return sendToAddressPromise;
});

const setTxFee = ((...args) => {
    const POSTBody = getPOSTBody(args);
    const setTxFeePromise = fetch(`http://${APIURL}/${POST}/setTxFee`, POSTBody)
        .catch((error) => console.error(error));

    return setTxFeePromise;
});

const validateAddress = ((...args) => {
    const POSTBody = getPOSTBody(args);
    const validateAddressPromise = fetch(`http://${APIURL}/${POST}/validateAddress`, POSTBody)
        .catch((error) => console.error(error));

    return validateAddressPromise;
});