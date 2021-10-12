/*
var imported = document.createElement('script'); 
imported.src = '/path/to/imported/script'; 
document.head.appendChild(imported);
*/

document.write(`<script type='text/javascript' src='./script/rpcparams.js'></script>`);
document.write(`<script type='text/javascript' src='./script/utilfunction.js'></script>`);

const getRPCAPI = ((...args) => {
    const s = document.getElementById("RPC_select");
    const APINAME = s.options[s.selectedIndex].value;

    const POSTBody = getPOSTBody(args);
    //console.log(POSTBody);

    fetch(`http://${APIURL}/${POST}/${APINAME}`, POSTBody)
        .then((res) => res.json())
        .then((json) => document.querySelector('#RPC_res')
            .textContent = JSON.stringify(json, null, 2))
        .catch((error) => console.error(error));
})

/*fetch(`http://${APIURL}/${APINAME}`)
    .then((res) => res.json())
    .then((text) => document.querySelector('#RPC_res')
        .innerHTML = JSON.stringify(text, null, 2))
    .catch((error) => console.error(error));
})*/

const getmyAddrList = (() => {
    fetch(`http://${APIURL}/${GET}/listAddressGroupings`)
        .then((res) => res.json())
        .then((text) => {
            let totalvalue = 0;
            const myAddrList = document.getElementById("myAddrList");
            for (let i = 0; i < text.length; i++) {
                for (let j = 0; j < text[i].length; j++) {
                    if (parseInt(text[i][j][1]) == 0) {
                        continue;
                    }
                    totalvalue += parseFloat(text[i][j][1]);
                    const list = document.createElement("div");
                    const addr = document.createElement("span");
                    const value = document.createElement("span");
                    addr.textContent = `${text[i][j][0]} `;
                    value.textContent = `${parseFloat(text[i][j][1]).toFixed(8)} OVC`;
                    list.appendChild(addr);
                    list.appendChild(value);
                    myAddrList.appendChild(list);
                }
            }
            const total = document.createElement("div");
            total.textContent = `총 합계: ${totalvalue.toFixed(8)}`;
            myAddrList.appendChild(total);
        })
        .catch((error) => console.error(error));
})

const getWalletInfo = (() => {
    fetch(`http://${APIURL}/${GET}/getWalletInfo`)
        .then((res) => res.json())
        .then((text) => {
            const balance = parseFloat(text.balance);
            const unconfirmed_balance = parseFloat(text.unconfirmed_balance);
            const immature_balance = parseFloat(text.immature_balance);
            const total = balance + unconfirmed_balance + immature_balance;

            document.getElementById('balance').textContent = balance.toFixed(8);
            document.getElementById('unconfirmed_balance').textContent = unconfirmed_balance.toFixed(8);
            document.getElementById('immature_balance').textContent = immature_balance.toFixed(8);
            document.getElementById('total').textContent = total.toFixed(8);
        })
        .catch((error) => console.error(error));
})

const getBlockchainInfo = ((...args) => {
    const POSTBody = getPOSTBody(args);

    fetch(`http://${APIURL}/${POST}/getNetworkInfo`, POSTBody)
        .then((res) => {
                return res.json()
            })
        .then((text) => {
            document.getElementById('userAgent')
                .textContent = text.subversion;
            document.getElementById('connections')
                .textContent = text.connections;

        })
        .catch((error) => console.error(error));

    fetch(`http://${APIURL}/${POST}/getBlockchainInfo`, POSTBody)
        .then((res) => res.json())
        .then((text) => {
            document.getElementById('networkName')
                .textContent = text.chain;
            document.getElementById('nblocks')
                .textContent = text.blocks;
        })
        .catch((error) => console.error(error));
})

const getHomeListTransactions = ((...args) => {
    const POSTBody = getPOSTBody(args);

    fetch(`http://${APIURL}/${POST}/listTransactions`, POSTBody)
        .then((res) => res.json())
        .then((text) => {
            text = text.reverse()
            const tbody = document.getElementById('tbody');
            tbody.remove();
            const newTbody = document.createElement('tbody');
            newTbody.id = "tbody";
            const table = document.getElementById('homeTxTable');
            table.appendChild(newTbody);

            for (let i = 0; i < text.length; i++) {
                const txList = document.createElement("tr");
                txList.id = "tx" + i;

                const time = document.createElement("td");
                const addr = document.createElement("td");
                const category = document.createElement("td");
                const amount = document.createElement("td");
                time.textContent = convertUnixTime(text[i].time);
                addr.textContent = text[i].address;
                category.textContent = getKorTxCategoryName(text[i].category, text[i].confirmations);

                if (text[i].fee == null) {
                    amount.textContent
                    = `${parseFloat(text[i].amount).toFixed(8)} ${DEFAULT_COIN_UNIT}`;
                } else {
                    amount.textContent
                    = `${parseFloat(text[i].amount + text[i].fee).toFixed(8)} ${DEFAULT_COIN_UNIT}`;
                }
                //const trList = document.getElementById("tbody");

                newTbody.appendChild(txList);
                txList.appendChild(time);
                txList.appendChild(addr);
                txList.appendChild(category);
                txList.appendChild(amount);
            }
        })
        .catch((error) => console.error(error));
})
