var express = require('express');
var MongoClient = require("mongodb").MongoClient;
var url = require('url');
var querystring = require('querystring');
var csvparser = require('./csvparser/csvparser');


var app = express();


app.get('/read', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('READ');

    MongoClient.connect("mongodb://localhost/city", function(error, db) {
    if (error) return funcCallback(error);
	    console.log("Connected to 'city' collection");

	    db.collection("city").find({}).toArray(function (error, results) {
	        if (error) throw error;

        	//console.log("restults: "+ JSON.stringify(results));

	        results.forEach(function(obj) {
				console.log("name:"+ obj.name +", latitude:"+ obj.latitude +", longitude:"+ obj.longitude);
			});
		});
	});
});

//name=Berlin&latitude=52°30′N&longitude=13°25′E
app.get('/write', function(req, res) {
	res.setHeader('Content-Type', 'text/plain');
	res.end('WRITE ');
	params = querystring.parse(url.parse(req.url).query);
	if ('name' in params && 'latitude' in params && 'longitude' in params) {

		MongoClient.connect("mongodb://localhost/city", function(error, db) {
			if (error) return funcCallback(error);
			console.log("Connected to 'city' collection");

			var objNew = { name: params['name'], latitude: params['latitude'], longitude: params['longitude'] };  

			db.collection("city").insert(objNew, null, function (error, results) {
			    if (error) throw error;
				console.log('City: '+ params['name'] +' '+ params['latitude'] +' '+ params['longitude']);
			    console.log("Document inserted");
			});
		});
    }
    else {
        console.log('No proper city in url');
    }
});

app.get('/clean', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('INSERT');

    MongoClient.connect("mongodb://localhost/city", function(error, db) {
    	if (error) return funcCallback(error);
	    console.log("Connected to 'city' collection");

		db.collection("city").remove( function (error, results) {
		    if (error) throw error;

		    console.log("collection city deleted");   
		});
	});
});


/**** A terminer *****/
app.get('/csv', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('CSV');

    MongoClient.connect("mongodb://localhost/city", function(error, db) {
    	if (error) return funcCallback(error);
	    console.log("Connected to 'city' collection");
	    csvparser.parse(MongoClient);
		/*
		MongoClient.connect("mongodb://localhost/city", function(error, db) {
			if (error) return funcCallback(error);
			console.log("Connected to 'city' collection");

			json.forEach(function(obj) {
				db.collection("city").insert(obj, null, function (error, results) {
				    if (error) throw error;
					console.log(obj);
				    console.log("Document inserted");
				});
			});
		});*/
	});
});

app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Page introuvable !');
});

app.listen(8080);