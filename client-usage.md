# 할 것 
- node서버 프로젝트 github에 올리기

# 정보
- html로 localhost:3000으로 접속
- 블럭 100개 confirm되야 전송가능
- 안드로이드 앱에서의 연결은 컴퓨터의 ip를 적으면 됨
- 채굴: `litecoin client > window > console` 에서 `generate <block count> <try count>` 입력

## 빌드
- `api`와 `web` 폴더를 실행하면서 없는 npm을 계속 다운로드 한다

## olivingcoin-api
- litecoin client와 api로 연결해주는 역할

## olivingcoin-web
- olivingcoin-api로 얻은 client의 정보를 html로 뿌려주는 역할

## 서버 실행방법
- litecoin client 실행
- api와 web에서 `nodemon app.js`으로 서버 실행

