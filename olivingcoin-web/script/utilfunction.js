document.write(`<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>`);
document.write(`<style> 
  .swal-modal {
    width: 50% !important;
    min-width: 550px;
  }
  </style>`)

const convertUnixTime = ((time) => {
    const date = new Date(time * 1000);
    const year = date.getFullYear();
    const month = "0" + (date.getMonth() + 1);
    const day = "0" + date.getDate();
    const hour = "0" + date.getHours();
    const minute = "0" + date.getMinutes();
    const second = "0" + date.getSeconds();

    return year + "-" + month.substr(-2) + "-" + day.substr(-2) + " " + hour.substr(-2) + ":" + minute.substr(-2) + ":" + second.substr(-2);
})

const preprocessingArgs = ((args) => {
    const arguments = new Object();

    for (let i = 0; i < args.length; i++) {
        if (args[i] == "") {
            args[i] = null;
        }
        else if ((args[i]) == "true" || (args[i].toString()) == "true") { // true 예외처리
            arguments[`arg${i + 1}`] = Boolean(1);
        }
        else if ((args[i]) == "false" || (args[i].toString()) == "false") { // false 예외처리
            arguments[`arg${i + 1}`] = Boolean(0);
        }
        else if (!isNaN(Number(args[i]))) { //문자열을 숫자로 변환해야하는 경우 처리
            arguments[`arg${i + 1}`] = Number(args[i]);
        }
        else { //일반적인 문자열인 경우
            arguments[`arg${i + 1}`] = args[i];
        }
    }

    return arguments;
});

const getPOSTBody = ((args) => {
    let arguments;

    if (args != null) {
        arguments = preprocessingArgs(args);
    }
    //console.log(arguments);

    const POSTBody = {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        cache: 'no-cache',
        mode: 'cors',
        body: JSON.stringify(arguments)
    };

    return POSTBody;
});

const infoEvent = ((title, json) => {
    const keys = Object.keys(json);
    const values = Object.values(json);
    const infoTable = document.createElement("table");
    const tbody = document.createElement("tbody");
    infoTable.appendChild(tbody);
    infoTable.style = "text-align: left; font-weight: bolder"

    for(let i = 0; i < keys.length; i++) {
        const tr = document.createElement("tr");
        tr.id = "tr" + i; 
        const key = document.createElement("td");
        const value = document.createElement("td");      
        key.textContent = keys[i];
        value.textContent = values[i];
        tr.appendChild(key);
        tr.appendChild(value);
        tbody.appendChild(tr);
    }
    const infoEvent = swal({
        title: title,
        content: infoTable,
    })
    return infoEvent; 
});

const infoPreEvent = ((title, text) => {
    const preText = document.createElement("pre");
    preText.style = "text-align: left; font-weight: bolder; white-space: pre-wrap; word-break:break-all;"
    preText.textContent = text;
    const infoPreEvent = swal({
        title: title,
        content: preText,
    })
    return infoPreEvent; 
});

const printQREvent = ((title, url, params) => {
    const query = Object.keys(params) .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k])) .join('&'); 
    
    const contents = document.createElement("table");
    const table = document.createElement("table");
    const tr1 = document.createElement("tr");
    const td11 = document.createElement("td");
    const td12 = document.createElement("td");
    const tr2 = document.createElement("tr");
    const td21 = document.createElement("td");
    const td22 = document.createElement("td");
    const amount = document.createElement("input");
    const message = document.createElement("input");
    const qrImage = document.createElement("img");
    const urlName = document.createElement("div");
    amount.id = 'amount';
    message.id = 'message';
    urlName.id = 'urlName';
    qrImage.id = 'qrImage';

    amount.setAttribute('onchange', `onChangeAmount(this, '${params.chl}')`);

    td11.textContent = '요청 금액'
    td12.appendChild(amount)
    td21.textContent = '메시지'
    td22.appendChild(message)

    qrImage.setAttribute('src', url + query);
    urlName.textContent = params.chl;

    contents.appendChild(table);
    table.appendChild(tr1);
    tr1.appendChild(td11);
    tr1.appendChild(td12);
    table.appendChild(tr2);
    tr2.appendChild(td21);
    tr2.appendChild(td22);
    contents.appendChild(qrImage);
    contents.appendChild(urlName);

    const imgEvent = swal({
        title: title,
        content: contents,
    })
    return imgEvent; 
});

const alertEvent = ((title, text, icon) => {
    const alertEvent = swal({
        title: title,
        text: text,
        icon: icon, //"info,success,warning,error" 중 택1
    })
    return alertEvent; 
});

const getKorTxCategoryName = ((category, confirmations) => {
    switch (category) {
        case 'immature':
            return '채굴(사용 불가능)'
        case 'generate':
            return '채굴(사용 가능)'
        case 'send':
            return '송금'
        case 'receive':
            if (confirmations < 6) return '입금(사용 불가능)'
            else return '입금(사용 가능)'
        default:
            return null;
    }
})

const getTransaction = ((...args) => {
    const POSTBody = getPOSTBody(args);
    fetch(`http://${APIURL}/${POST}/getTransaction`, POSTBody)
        .then((res) => res.json())
        .then((text) => {
            infoPreEvent(`트랜잭션 정보`, JSON.stringify(text, null, 4));
        })
        .catch((error) => console.error(error));
})

/*
var flag;
var swal = swal({
    title: "Y/N?",
    text: "",
    icon: "info",
    buttons: ["NO", "YES"]
}).then((YES) => {
    if (YES) {
        flag = true;        
    }else{
        flag = false;
    }
});

Promise.all([swal]).then(function(){
    console.log(flag);
});
*/


const confirmEvent = ((title, text, icon) => {
    const confirmEvent = swal({
        title: title,
        text: text,
        icon: icon, //"info,success,warning,error" 중 택1
        buttons: ["NO", "YES"]
    })
    return confirmEvent; 
});