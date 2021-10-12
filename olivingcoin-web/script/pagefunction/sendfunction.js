// pre included `./script/rpcparams.js` & `./script/utilfunction.js` at `./script/rpc/send_rpc.js`

/*
Promise.resolve(성공리턴값): 바로 resolve하는 프로미스
Promise.reject(실패리턴값): 바로 reject하는 프로미스
const promise1 = Promise.resolve('성공1');
const promise2 = Promise.resolve('성공2');
 
Promise 내부 값은 리턴이 안되고 Promise 자체는 리턴할 수 있음
*/

const clickTxEvent = ((target) => {
    const tbody = target.parentNode;
    const trs = tbody.getElementsByTagName('tr');
    var backColor = "#ffffff";
    var textColor = "black";
    var orgBColor = "skyblue";
    var orgTColor = "#ffffff";

    for (let i = 0; i < trs.length; i++) {
        if (trs[i].style.backgroundColor != null)
            trs[i].style.backgroundColor = null;
    }

    target.style.backgroundColor = orgBColor;
})

const getcurrentBalance = (() => {
    const balancePromise = getBalance();
    balancePromise.then((res) => res.text())
        .then((text) => {
            const newBalance = document.createElement('span');
            newBalance.id = 'balance';
            const currentBalance = document.getElementById('currentBalance')
            currentBalance.innerHTML = `현재 잔액은`
            newBalance.textContent = text;
            currentBalance.appendChild(newBalance);
            currentBalance.innerHTML = `${currentBalance.innerHTML} ${DEFAULT_COIN_UNIT} 입니다.`

            document.getElementById('sendValue').setAttribute('max', text);
        });
});

const sendAllBalance = (() => {
    const balance = document.getElementById('balance').textContent;
    document.getElementById('sendValue').value = balance;
})

const sendButtonEvent = (() => {
    const sendAddress = document.getElementById('sendAddress').value;
    const numSendAddress = Number(sendAddress);
    const sendValue = document.getElementById('sendValue').value;
    const numSendValue = Number(sendValue);
    const buttonTitle = `올리빙코인 송금`
    const buttonText = `${parseFloat(sendValue).toFixed(8)}OVC를 ${sendAddress}로 송금하시겠습니까?`
    const currentBalance = document.getElementById('balance').textContent;

    //console.log(numTxFee == NaN)

    if (sendAddress == "") {
        alertEvent(`오류`, `주소가 입력되지 않았습니다.`, 'error');
        return;
    }
    else if (!isNaN(numSendAddress)) {
        alertEvent(`오류`, `잘못된 주소가 입력되었습니다. (숫자가 입력됨)`, 'error');
        return;
    }
    const validateAddressPromise = validateAddress(sendAddress);
    validateAddressPromise.then((res) => res.json())
        .then((text) => {
            if (text.isvalid == false) {
                alertEvent(`오류`, `잘못된 주소가 입력되었습니다.`, 'error');
                return;
            }
        })

    if (sendValue == "") {
        alertEvent(`오류`, `금액이 입력되지 않았습니다.`, 'error');
    }
    else if (isNaN(numSendValue)) {
        alertEvent(`오류`, `숫자가 아닌 값이 입력되었습니다.`, 'error');
    }
    else if (parseFloat(numSendValue).toFixed(8).toString().split('.')[1].length > 8) {
        alertEvent(`오류`, `소수점 자리수가 많습니다.`, 'error');
    }
    else if (numSendValue < 0) {
        alertEvent(`오류`, `0보다 작은 수를 보낼 수 없습니다.`, 'error');
    }
    else if (numSendValue < 0.00100000) {
        alertEvent(`오류`, `0.00100000 보다 작은 값을 보낼 수 없습니다.`, 'error');
    }
    else if (numSendValue > currentBalance) {
        alertEvent(`오류`, `잔액보다 큰 금액을 보낼 수 없습니다.`, 'error');
    }
    else {
        const confirm = confirmEvent(buttonTitle, buttonText, `info`);
        confirm.then((YES) => {
            if (YES) {
                sendToAddress(sendAddress, sendValue);
                alertEvent(`성공`, `${sendAddress}로 ${sendValue}OVC를 성공적으로 보냈습니다.`, 'success');
            }
        });
    }
})

const feeButtonEvent = (() => {
    const txFee = document.getElementById('setTxFee').value;
    const numTxFee = Number(txFee);
    const buttonTitle = `수수료 설정`
    const buttonText = `수수료를 ${txFee}로 변경하시겠습니까?`

    //console.log(numTxFee == NaN)

    if (isNaN(numTxFee)) {
        alertEvent(`오류`, `숫자가 아닌 값이 입력되었습니다.`, 'error');
    }
    else if (txFee.split('.')[1].length > 8) {
        alertEvent(`오류`, `소수점 자리수가 많습니다.`, 'error');
    }
    else if (numTxFee > 0.5) {
        alertEvent(`오류`, `입력된 값이 최고 수수료보다 높습니다. 
                (0.00001000 이상 0.50000000이하)`, 'error');
    }
    else if (numTxFee < 0.00001) {
        alertEvent(`오류`, `입력된 값이 최고 수수료보다 낮습니다.
                (0.00001000 이상 0.50000000이하)`, 'error');
    }
    else {
        const confirm = confirmEvent(buttonTitle, buttonText, `info`);
        confirm.then((YES) => {
            if (YES) {
                setTxFee(txFee);
            }
        });
    }
})