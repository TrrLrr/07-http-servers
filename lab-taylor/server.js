'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const cowsay = require('cowsay');
const parseBody = require('./lib/body-parse.js');
const PORT = process.env.PORT || 3000;

const server = http.createServer(function(req,res) {
  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query);

  
  if(req.method === 'GET' && req.url.pathname === '/cowsay') {
    let params = req.url.query;
    if('text' in params === false) {
      console.log('no params hit');
      res.writeHead(400);
      res.write(cowsay.say({text: 'Bad Request'}));
      res.end();
    }
    if('text' in params === true) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write(cowsay.say({text: params.text}));
    res.end();
    }
  }
  
  if(req.method === 'GET') {
    res.writeHead(200, 'Hello from the server!', {'Content-Type': 'text/plain'});
    res.end();
  }
  

  if(req.method === 'POST' || req.method === 'PUT') {
    parseBody(req, function(err) {
      if(err) throw new Error('error parsing body');
      console.log('request body:', req.body);
    });
    
  }
  
});

server.listen(PORT, () => {
  console.log(`server up: ${PORT}`);
});