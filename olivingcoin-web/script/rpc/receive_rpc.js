document.write(`<script type='text/javascript' src='./script/rpcparams.js'></script>`); 
document.write(`<script type='text/javascript' src='./script/utilfunction.js'></script>`);

function btnOnclicked(address) {

    const params = {
        "cht": "qr",
        "chs": "150x150",
        "chl": `olivingcoin:${address}`,
    }; 
    
    let url = 'https://chart.apis.google.com/chart?';

    printQREvent('QR Code', url, params);
}

const listReceivedByAddress = ((...args) => {
    const POSTBody = getPOSTBody(args);

    fetch(`http://${APIURL}/${POST}/listReceivedByAddress`, POSTBody)
        .then((res) => res.json())
        .then((text) => {

            //기존에 있던 tbody를 remove하고 새로운 tbody를 생성 (기존 내용 지우기)
            const tbody = document.getElementById('receivedByAddressTbody');
            tbody.remove();
            const newTbody = document.createElement('tbody');
            newTbody.id = "receivedByAddressTbody";

            //table 하위에 새로운 tbody를 추가
            const table = document.getElementById('receivedByAddressTable');
            table.appendChild(newTbody);

            //반복문을 통해 addr 리스트 만들기
            for (let i = 0; i < text.length; i++) {
                const tr = document.createElement("tr");
                tr.id = "addr" + i;
                const addr = document.createElement("td");
                const amount = document.createElement("td");
                const confirm = document.createElement("td");
                const QRCode = document.createElement("td");
                addr.textContent = text[i].address;
                amount.textContent
                    = `${parseFloat(text[i].amount).toFixed(8)} ${DEFAULT_COIN_UNIT}`;
                confirm.textContent = text[i].confirmations;


                const QRCodeButton = document.createElement("button");
                QRCodeButton.textContent = '버튼';
                QRCodeButton.setAttribute('onclick', `btnOnclicked('${addr.textContent}')`);

                //const QRCodeImage = document.createElement("img");
                //QRCodeImage.setAttribute('src', url);

                /*fetch(url).then((res) => {
                    console.log(res.body)
                    QRCode.textContent = res.json();   
                })*/

                newTbody.appendChild(tr);
                const addrList = document.getElementById("addr" + i);
                addrList.appendChild(addr);
                addrList.appendChild(amount);
                addrList.appendChild(confirm);
                addrList.appendChild(QRCode);
                //QRCode.appendChild(QRCodeImage);
                QRCode.appendChild(QRCodeButton);
            }
        })
        .catch((error) => console.error(error));
});

const getListReceiveTransactions = ((...args) => {
        const POSTBody = getPOSTBody(args);
    
        fetch(`http://${APIURL}/${POST}/listTransactions`, POSTBody)
        .then((res) => res.json())
        .then((text) => {
            let numberOfSendTx = 0; //category가 send에 해당하는 개수 측정
            const numberOfTx = text.length; //text 객체의 길이가 가져온 Tx의 개수

            // 최신 Tx가 위로 오게 하기 위해 JSON 객체를 reverse
            text = text.reverse()

            //기존에 있던 tbody를 remove하고 새로운 tbody를 생성 (기존 내용 지우기)
            const tbody = document.getElementById('receiveTbody');
            tbody.remove();
            const newTbody = document.createElement('tbody');
            newTbody.id = "receiveTbody";

            //table 하위에 새로운 tbody를 추가
            const table = document.getElementById('receiveTable');
            table.appendChild(newTbody);

            //반복문을 통해 트랜잭션 리스트 만들기
            for (let i = 0; i < numberOfTx; i++) {
                if (text[i].category == 'receive') {
                    const tr = document.createElement("tr");
                    tr.id = "tx" + i;
                    const addr = document.createElement("td");
                    const category = document.createElement("td");
                    const amount = document.createElement("td");
                    const confirm = document.createElement("td");
                    const txid = document.createElement("td");
                    addr.textContent = text[i].address;
                    category.textContent = text[i].category;
                    amount.textContent
                        = `${parseFloat(text[i].amount).toFixed(8)} ${DEFAULT_COIN_UNIT}`;
                    confirm.textContent = text[i].confirmations;
                    txid.textContent = text[i].txid;
                    //const trList = document.getElementById("tbody");
                    newTbody.appendChild(tr);
                    const txList = document.getElementById("tx" + i);
                    txList.appendChild(addr);
                    txList.appendChild(category);
                    txList.appendChild(amount);
                    txList.appendChild(confirm);
                    txList.appendChild(txid);

                    numberOfSendTx++;
                }
            }

            document.querySelector('#countTx').textContent 
                = `${numberOfTx} 개 중 ${numberOfSendTx}개 조회`;
        })
        .catch((error) => console.error(error));
})
