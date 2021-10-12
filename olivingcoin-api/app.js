// Require module
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')

// Declare constant value
const DEFAULT_PORT = 4000

// Start express module
const app = express();

//Use static path
app.use('/script', express.static(__dirname + "/script"));


// Set value for express module
// app.set(key, value); --> It can be imported value into app.get(key)
app.set('port', process.env.PORT || DEFAULT_PORT);

app.use(cors());
app.use(bodyParser.json()); 

// Use routes
app.use('/get', require('./routes/get/getapi'));
app.use('/post', require('./routes/post/postapi'));

// Start express server
app.listen(app.get('port'), () => {
  console.log('Start Olivingcoin api Server');
  console.log('http://localhost:', app.get('port'));
});
