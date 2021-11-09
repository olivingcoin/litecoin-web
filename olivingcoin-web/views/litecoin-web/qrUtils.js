document.write(`<script type='text/javascript' src='../../script/rpcparams.js'></script>`);
document.write(`<script type='text/javascript' src='../../script/utilfunction.js'></script>`);

/*
- 외부에서 이 함수를 호출해서 qrInfo객체의 qrImgSrc, address 값을 사용하면 됨

*/
const getReceivingQRInfo = ((price) => {
    const params = {
        "cht": "qr",
        "chs": "150x150",
        "chl": "abcd1234",
        // "chl": `${address}`,
    };

    let url = 'https://chart.apis.google.com/chart?';

    // 테스트 창 띄우기
    printReadOnlyQREvent('Receiving QR', url, params, price);

    const qrInfo = new Object;
    const coinParams = new Object;
    coinParams.amount = price;

    const query = Object.keys(params).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k])).join('&');
    const coinParamsQuery = Object.keys(coinParams).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(coinParams[k])).join('&');
    qrInfo.qrImgSrc = url + query + "?" + coinParamsQuery;
    qrInfo.address = params.chl;

    return qrInfo;
});