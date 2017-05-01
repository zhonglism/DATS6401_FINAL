var express=require('express');
var fs = require('fs');
var mysql=require('mysql');
var path = require("path");
var csvwriter=require('csvwriter')
module.exports=function(app){
	app.use(express.static(path.join(__dirname, 'public')));

	app.get('/', function (req, res) {

		var connection = mysql.createConnection({
		  host:'****',
		  port:'3306',
		  user:'****',
		  password:'****',
		  database:'****'
		});

		connection.connect(function(err){

		if(!err) {
		    console.log("Database is connected ... ");    
		} else {
		    console.log(err.stack);}
		});

		connection.
		query('SELECT * FROM dats6401_final.mpg', 
		  function(err, rows, fields) {
		    if(err) throw err;
		    fs.writeFile('./public/data/mpg_scatter.json', 
		      JSON.stringify(rows),
		       function (err) {
		      if (err) throw err;
		    });		
		});

		connection.
		query('select count(manufacturer) as num ,\
			manufacturer from mpg group by(manufacturer) order by num', 
		  function(err, rows, fields) {
		    if(err) throw err;
		    fs.writeFile('./public/data/mpg_bar.json', 
		      JSON.stringify(rows),
		       function (err) {
		      if (err) throw err;
		      // console.log('quering');
		    });		
		});

		connection.
		query('select count(model) as count,\
		 model from dats6401_final.mpg \
		 group by(model) order by count;', 
		  function(err, rows, fields) {
		    if(err) throw err;
		    mydata=JSON.stringify(rows);
		    // console.log(mydata);
		    csvwriter(mydata, function(err, csv) {
		    fs.writeFile('./public/data/mpg_pie.csv',csv,function(err){
		      if(err) throw err;

		    })  
		})
		});

		connection.
		query('select Species,\
		 count(Species) as count\
		  from iris group by(Species) order by count;', 
		  function(err, rows, fields) {
		    if(err) throw err;
		    mydata=JSON.stringify(rows);
		    // console.log(mydata);
		    csvwriter(mydata, function(err, csv) {
		    fs.writeFile('./public/data/hc_bar.csv',csv,function(err){
		      if(err) throw err;
		    })  
		})
		});

		connection.
		query('select * from econ where year=2007;', 
		  function(err, rows, fields) {
		    if(err) throw err;
		    mydata=JSON.stringify(rows);
		    // console.log(mydata);
		    csvwriter(mydata, function(err, csv) {
		    fs.writeFile('./public/data/pl_scatter.csv',csv,function(err){
		      if(err) throw err;

		    })  
		})
		});

        connection.
		query('select * from wind;', 
		  function(err, rows, fields) {
		    if(err) throw err;
		    mydata=JSON.stringify(rows);
		    // console.log(mydata);
		    csvwriter(mydata, function(err, csv) {
		    fs.writeFile('./public/data/pl_line.csv',csv,function(err){
		      if(err) throw err;
		      console.log('quering')
		    })  
		})
		});
		connection.end()
    	res.sendFile(path.join(__dirname+ '/../public/home.html'));
});

}