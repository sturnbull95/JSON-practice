const fs = require('fs');
const bask = require('./basketfunc.js');
const request = require('request');
request('http://foureyes.github.io/csci-ua.0480-spring2017-008/homework/02/0021600680_gamedetail.json'
, function (error, response, body) {
  if (!error ) {
    body = JSON.parse(body);
    body = bask.processGameData(body);
    console.log(body);
    // if(newBody != undefined){
    //   body = JSON.parse();
    //   console.log(bask.processGameData(JSON.parse(body)));
    // }
  }
})

// fs.readFile('tests/0021600681_gamedetail.json','utf8', (err,data) =>{
//   if(err){
//     throw err;
//   }
//   data = JSON.parse(data);
//   data = bask.processGameData(data);
//   console.log(data);
// });
