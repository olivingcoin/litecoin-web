document.write(`<script type='text/javascript' src='./script/rpcparams.js'></script>`); 
document.write(`<script type='text/javascript' src='./script/utilfunction.js'></script>`);

const generate = ((...args) => {
    const POSTBody = getPOSTBody(args);
    fetch(`http://${APIURL}/${POST}/generate`, POSTBody)
        .then((res) => res.json())
        .then((text) => {
            for (let i = 0; i < text.length; i++) {
                const blockHash = document.createElement("div");                
                blockHash.textContent = text[i];
                document.getElementById('printBlockHash').appendChild(blockHash);
                getListMiningTransactions('*', 5000);
            }
        })
        .catch((error) => console.error(error));
    })

const getListMiningTransactions = ((...args) => {
    const POSTBody = getPOSTBody(args);
    fetch(`http://${APIURL}/${POST}/listTransactions`, POSTBody)
        .then((res) => res.json())
        .then((text) => {
            let numberOfMiningTx = 0; //category가 mining에 해당하는 개수 측정
            const numberOfTx = text.length; //text 객체의 길이가 가져온 Tx의 개수

            // 최신 Tx가 위로 오게 하기 위해 JSON 객체를 reverse
            text = text.reverse()

            //기존에 있던 tbody를 remove하고 새로운 tbody를 생성 (기존 내용 지우기)
            const tbody = document.getElementById('miningTbody');
            tbody.remove();
            const newTbody = document.createElement('tbody');
            newTbody.id = "miningTbody";

            //table 하위에 새로운 tbody를 추가
            const table = document.getElementById('miningTable');
            table.appendChild(newTbody);

            //반복문을 통해 트랜잭션 리스트 만들기
            for (let i = 0; i < numberOfTx; i++) {
                if (text[i].category == 'immature' || text[i].category == 'generate') {
                    const tr = document.createElement("tr");
                    tr.id = "tx" + i;
                    const addr = document.createElement("td");
                    const category = document.createElement("td");
                    const amount = document.createElement("td");
                    addr.textContent = text[i].address;
                    category.textContent = text[i].category;
                    amount.textContent
                        = `${parseFloat(text[i].amount).toFixed(8)} ${DEFAULT_COIN_UNIT}`;
                    //const trList = document.getElementById("tbody");
                    newTbody.appendChild(tr);
                    const txList = document.getElementById("tx" + i);
                    txList.appendChild(addr);
                    txList.appendChild(category);
                    txList.appendChild(amount);

                    numberOfMiningTx++;
                }
            }
            document.querySelector('#countTx').textContent 
                = `${numberOfTx} 개 중 ${numberOfMiningTx}개 조회`;
        })
        .catch((error) => console.error(error));
})
