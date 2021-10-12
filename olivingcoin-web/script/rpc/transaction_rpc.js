document.write(`<script type='text/javascript' src='./script/rpcparams.js'></script>`); 
document.write(`<script type='text/javascript' src='./script/utilfunction.js'></script>`);

const getListTransactions = ((...args) => {
    const s = document.getElementById("txCategory");
    const CategorySelected = s.options[s.selectedIndex].value;

    const POSTBody = getPOSTBody(args);
    fetch(`http://${APIURL}/${POST}/listTransactions`, POSTBody)
    .then((res) => res.json())
    .then((text) => {
        let numberOfCategoryTx = 0; //category에 해당하는 개수 측정
        const numberOfTx = text.length; //text 객체의 길이가 가져온 Tx의 개수

        // 최신 Tx가 위로 오게 하기 위해 JSON 객체를 reverse
        text = text.reverse()

        const tbody = document.getElementById('tbody');
        tbody.remove();
        const newTbody = document.createElement('tbody');
        newTbody.id = "tbody";
        const table = document.getElementById('table');
        table.appendChild(newTbody);

        for (let i = 0; i < text.length; i++) {
            switch (CategorySelected) {
                case 'all': break;
                case 'generate':
                    if (text[i].category == 'immature' || text[i].category == 'generate') break;
                    else continue;
                case 'send':
                    if (text[i].category == 'send') break;
                    else continue;
                case 'receive':
                    if (text[i].category == 'receive') break;
                    else continue;
                default: break;
            }

            const tr = document.createElement("tr");
            tr.id = "tx" + i;
            tr.setAttribute(`onclick`, `getTransaction('${text[i].txid}')`)
            const time = document.createElement("td");
            const addr = document.createElement("td");
            const category = document.createElement("td");
            const amount = document.createElement("td");
            time.textContent = convertUnixTime(text[i].time);
            addr.textContent = text[i].address;
            category.textContent = getKorTxCategoryName(text[i].category, text[i].confirmations);
            amount.textContent 
                    = `${parseFloat(text[i].amount).toFixed(8)} ${DEFAULT_COIN_UNIT}`;
            //const trList = document.getElementById("tbody");
            newTbody.appendChild(tr);
            const txList = document.getElementById("tx" + i);
            txList.appendChild(time);
            txList.appendChild(addr);
            txList.appendChild(category);
            txList.appendChild(amount);

            numberOfCategoryTx++;
        }
        document.getElementById('countTx').textContent
            = `${numberOfTx} 개 중 ${numberOfCategoryTx}개 조회`;
    })
    .catch((error) => console.error(error));
})
    