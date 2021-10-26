# 설명
- QR image은 Google Chart API 이용해서 생성

# 구현
- web에서 총 금액을 가져와서 `금액`과 `주소`에 맞는 QR을 생성하고 난 뒤에 `QR이미지`와 `총 금액`을 web으로 띄워준다
- 각 코드는 상황에 맞게 위치, 내용을 수정해서 사용
## 1. QR 이미지 생성
1. `olivingcoin-web\script\rpc\receive_rpc.js`의 `btnOnclicked(address)` 함수부분을 실행
2. 위의 1번이 실행되면 `olivingcoin-web\script\utilfunction.js`의 `printQREvent = ((title, url, params)`가 실행되면서 QR이미지가 생성됨

## 2. QR 이미지 업데이트
- 생성한 QR에 금액에 대한 업데이트를 한다
- `olivingcoin-web\views\receive.html`파일

## 3. 이미지 띄우기
- QR이미지와 총 금액을 띄운다

# 개선할 것
- 결제방식에서 특정 유저의 결제를 확인할 수 있는 방법이 필요함 (e.g. 각 다른 주소로 결제 or 결제에 특정 msg 보내기)

# 메모
- vsc로 수정하고 browser를 새로고침해야 수정한 내용이 적용됨
