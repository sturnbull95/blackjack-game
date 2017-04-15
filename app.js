// app.js for homework #7 - blackjack
var fs = require('fs');
var express = require('express');
var hbs = require('hbs');
var expressSess = require("express-session");
var mongoose = require('mongoose');
const URLSlugs = require('mongoose-url-slugs');
var bodyParser = require("body-parser");
var app = express();
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
console.log(__dirname);
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get('/',function(req,res){
  res.sendFile(__dirname + '/myapp/public/index.html');
});
app.get('/javascripts/main.js',function(req,res){
  res.sendFile(__dirname + '/myapp/public/javascripts/main.js');
});


app.listen(3000);
