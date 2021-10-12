# 빌드 방법
1. Node.js 다운로드
2. npm으로 `nodemon` 다운로드
3. nodemon으로 `api`와 `web` app.js를 실행하면서 없는 npm을 계속 다운로드 한다
4. 모두 다운로드 후, litecoin-qt-client를 실행하고 `localhost:3000`으로 접속하면 client정보가 web으로 나타나있음



# olivingcoin-api
- litecoin client정보를 쓰기위해 api로 연결해주는 역할



# olivingcoin-web
- olivingcoin-api로 얻은 client의 정보를 html로 뿌려주는 역할



# 실행방법
※ 빌드가 되어있어야 함  
- litecoin client 실행
- api와 web에서 `nodemon app.js`으로 서버 실행



# 정보
- html로 `localhost:3000`으로 접속
- 블럭 100개 confirm되야 전송가능
- 안드로이드 앱에서의 연결은 컴퓨터의 ip를 적으면 됨
- 채굴: `litecoin client > window > console` 에서 `generate <block count> <try count>` 입력
