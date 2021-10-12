// pre included `./script/rpcparams.js` & `./script/utilfunction.js` at `./script/rpc/send_rpc.js`

/*
Promise.resolve(성공리턴값): 바로 resolve하는 프로미스
Promise.reject(실패리턴값): 바로 reject하는 프로미스
const promise1 = Promise.resolve('성공1');
const promise2 = Promise.resolve('성공2');
 
Promise 내부 값은 리턴이 안되고 Promise 자체는 리턴할 수 있음
*/

const btnGetBlockchainInfo = (() => {
    const POSTBody = getPOSTBody();
    fetch(`http://${APIURL}/${POST}/getBlockchainInfo`, POSTBody)
        .then((res) => res.json())
        .then((text) => {
            const information = {
                '네트워크 이름': text['chain'],
                '현재 블록 수': text['blocks'],
                'best 블록의 해시': text['bestblockhash'],
                '난이도': text['difficulty'],
                'mediantime': text['mediantime'],
                'verificationprogress': text['verificationprogress'],
                'chainwork': text['chainwork'],
                '디스크 사이즈': text['size_on_disk'],
            };
            infoEvent('블록체인 정보', information, null);
        })
        .catch((error) => console.error(error));;
})

const btnGetWalletInfo = (() => {
    const POSTBody = getPOSTBody();
    fetch(`http://${APIURL}/${POST}/getWalletInfo`, POSTBody)
        .then((res) => res.json())
        .then((text) => {
            /*
            const information = {
                '네트워크 이름': text['chain'],
                '현재 블록 수': text['blocks'],
                'best 블록의 해시': text['bestblockhash'],
                '난이도': text['difficulty'],
                'mediantime': text['mediantime'],
                'verificationprogress': text['verificationprogress'],
                'chainwork': text['chainwork'],
                '디스크 사이즈': text['size_on_disk'],
            };*/
            infoEvent('내 지갑 정보', text, null);
        })
        .catch((error) => console.error(error));;
})

const btnGetNetworkInfo = (() => {
    const POSTBody = getPOSTBody();
    fetch(`http://${APIURL}/${POST}/getNetworkInfo`, POSTBody)
        .then((res) => res.json())
        .then((text) => {
            /*
            const information = {
                '네트워크 이름': text['chain'],
                '현재 블록 수': text['blocks'],
                'best 블록의 해시': text['bestblockhash'],
                '난이도': text['difficulty'],
                'mediantime': text['mediantime'],
                'verificationprogress': text['verificationprogress'],
                'chainwork': text['chainwork'],
                '디스크 사이즈': text['size_on_disk'],
            };*/
            infoEvent('내 지갑 정보', text, null);
        })
        .catch((error) => console.error(error));;
})