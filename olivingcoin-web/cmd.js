/*var exec = require('child_process').exec;

exec("ping google.com", function(error, stdout, stderr) {
    // 결과값 출력
    console.log(stdout);
});*/

var spawn = require('child_process').spawn;
//var child = spawn('minerd', ['-a', 'scrypt']);
var child = spawn('ping', ['google.com']);

child.stdout.on('data', function(chunk) {
  // output will be here in chunks
  console.log(chunk.toString('utf8'));
})

child.stderr.on('data', function (chunk) {
    console.log(chunk);
  });

/*
var spawn = require('child_process').spawn;
var child = spawn('minerd', ['-a', 'scrypt']);

child.stdout.on('data', function(chunk) {
  // output will be here in chunks
  console.log(chunk.toString('utf8'));
});*/

// or if you want to send output elsewhere
//child.stdout.pipe(dest);