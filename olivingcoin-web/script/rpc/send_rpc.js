document.write(`<script type='text/javascript' src='./script/rpcparams.js'></script>`);
document.write(`<script type='text/javascript' src='./script/utilfunction.js'></script>`);

const getBalance = ((...args) => {
    const POSTBody = getPOSTBody(args);
    const getBalancePromise = fetch(`http://${APIURL}/${POST}/getBalance`, POSTBody)
        .catch((error) => console.error(error));

    return getBalancePromise;
});

const validateAddress = ((...args) => {
    const POSTBody = getPOSTBody(args);
    const validateAddressPromise = fetch(`http://${APIURL}/${POST}/validateAddress`, POSTBody)
        .catch((error) => console.error(error));

    return validateAddressPromise;
});


const setTxFee = ((...args) => {
    const POSTBody = getPOSTBody(args);
    fetch(`http://${APIURL}/${POST}/setTxFee`, POSTBody)
        .then((res) => res.text())
        .then((text) => {
            if (Boolean(text) == true) {
                document.getElementById('currentTxFee').textContent
                    = `현재 트랜잭션 수수료는 ${document.getElementById('setTxFee').value}입니다.`
            } else {
                document.getElementById('currentTxFee').textContent
                    = `수수료 설정에 실패하였습니다.`
            }
        })
        .catch((error) => console.error(error));
});


const sendToAddress = ((...args) => {
    const POSTBody = getPOSTBody(args);
    fetch(`http://${APIURL}/${POST}/sendToAddress`, POSTBody)
        .then((res) => res.json())
        .then((text) => {
            console.log(text);
            getListSendTransactions('*', MAX_RPC_INTEGER);
            getcurrentBalance();
        })
        .catch((error) => console.error(error));
});

const getListSendTransactions = ((...args) => {
    const POSTBody = getPOSTBody(args);
    fetch(`http://${APIURL}/${POST}/listTransactions`, POSTBody)
        .then((res) => res.json())
        .then((text) => {
            let numberOfSendTx = 0; //category가 send에 해당하는 개수 측정
            const numberOfTx = text.length; //text 객체의 길이가 가져온 Tx의 개수

            // 최신 Tx가 위로 오게 하기 위해 JSON 객체를 reverse
            text = text.reverse()

            //기존에 있던 tbody를 remove하고 새로운 tbody를 생성 (기존 내용 지우기)
            const tbody = document.getElementById('tbody');
            tbody.remove();
            const newTbody = document.createElement('tbody');
            newTbody.id = "tbody";

            //table 하위에 새로운 tbody를 추가
            const table = document.getElementById('sendTable');
            table.appendChild(newTbody);

            //반복문을 통해 트랜잭션 리스트 만들기
            for (let i = 0; i < numberOfTx; i++) {
                if (text[i].category == 'send') {
                    const tr = document.createElement("tr");
                    tr.id = "tx" + numberOfSendTx;

                    tr.setAttribute(`ondblclick`, `getTransaction('${text[i].txid}')`)
                    tr.setAttribute(`onclick`, `clickTxEvent(this)`)

                    const time = document.createElement("td");
                    const addr = document.createElement("td");
                    const amount = document.createElement("td");
                    const comfirm = document.createElement("td");
                    const txid = document.createElement("td");
                    time.textContent = convertUnixTime(text[i].time);
                    addr.textContent = text[i].address;
                    amount.textContent
                        = `${parseFloat(text[i].amount + text[i].fee).toFixed(8)} ${DEFAULT_COIN_UNIT}`;
                    comfirm.textContent = text[i].confirmations;
                    txid.textContent = text[i].txid;
                    txid.id = "txid" + numberOfSendTx;
                    //const trList = document.getElementById("tbody");
                    newTbody.appendChild(tr);
                    
                    const txList = document.getElementById("tx" + numberOfSendTx);
                    txList.appendChild(time);
                    txList.appendChild(addr);
                    txList.appendChild(amount);
                    txList.appendChild(comfirm);
                    txList.appendChild(txid);

                    numberOfSendTx++;
                }
            }

            document.getElementById('countTx').textContent
                = `${numberOfTx} 개 중 ${numberOfSendTx}개 조회`;
        })
        .catch((error) => console.error(error));
})