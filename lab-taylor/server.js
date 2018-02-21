'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const cowsay = require('cowsay');
const parseBody = require('./lib/body-parse.js');
const PORT = process.env.PORT || 3000;


//server creation and parsing of query string
const server = http.createServer(function(req,res) {
  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query);

  //GET method at cowsay route with valid and invalid text entries 
  if(req.method === 'GET' && req.url.pathname === '/cowsay') {
    let params = req.url.query;
    if('text' in params === false) {
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write(cowsay.say({text: 'Bad Request'}));
      res.end();
    }
    if('text' in params === true) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write(cowsay.say({text: params.text}));
    res.end();
    }
  }
      
  //GET request to the route of the server with standard response message
  if(req.method === 'GET') {
    res.writeHead(200, 'Hello from the server!', {'Content-Type': 'text/plain'});
    res.end();
  }
  
  //POST methods at cowsay route with valid and invalid text entries 
  if(req.method === 'POST' && req.url.pathname === '/cowsay') {
    
    parseBody(req, function() {
      
      
      if(req.body.text) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write(cowsay.say({text: req.body.text}));
        res.end();
      }
      
      if(!req.body.text) {
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.write(cowsay.say({text: 'Bad Request'}));
        res.end();
      }
      
    });
  }
});
      
server.listen(PORT, () => {
  console.log(`server up: ${PORT}`);
});
      
      
    

    

