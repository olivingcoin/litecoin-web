// Require module
const express = require('express');
const path = require('path');
const nunjucks = require('nunjucks')
const cors = require('cors');
const bodyParser = require('body-parser')
const cmd = require('node-cmd');

// Declare constant value
const DEFAULT_PORT = 3000

// Start express module
const app = express();

// Use bodyParser
app.use(bodyParser.json()); 

//Use static path
app.use('/script', express.static(__dirname + "/script"));
app.use('/public', express.static(__dirname + "/public"));

// Set value for express module
// app.set(key, value); --> It can be imported value into app.get(key)
app.set('port', process.env.PORT || DEFAULT_PORT);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'njk');

nunjucks.configure('views', {
  express: app,
  watch: true,
});

app.use(cors());

// Use routes
app.use('/', require('./routes/main'));

/*
// Processing of GET event 
app.get('/get', (req, res) => {
  const JSON_RPC = req.param('JSON_RPC');
  //.과 []는 동치임을 기억([]로 문자열 제어)
  client[JSON_RPC]().then((params) => res.send(JSON.stringify(params, null, 2)))
  //pre에서 출력하게끔 조정해야될듯
});*/

// Start express server
app.listen(app.get('port'), () => {
  console.log('Start Olivingcoin web control');
  console.log('http://localhost:', app.get('port'));
});
