var MongoClient = require("mongodb").MongoClient;
var fs = require("fs");
var papa = require('papaparse');

const folderPath = './csvtodb/';

// Getting all filenames of the directory from folderPath
fs.readdir(folderPath, (err, files) => {
	if(err){
		console.log("Could not list folder files");
	}
	files.forEach(fileName => {
		//console.log(fileName);
		if(fileName.indexOf(".csv") !== -1){
			fileContent = getFileContent(fileName);
			var json = csvToJson(fileContent);
			console.log(json);
			insertIntoDb(fileName.replace('.csv',''), json);
		}
	});


})

function insertIntoDb(collectionName, json) {

	// Database connexion
	MongoClient.connect("mongodb://localhost/city", function(error, db) {

		if (error) {
			return funcCallback(error);
		}
		console.log("Connected to "+collectionName+" collection");

		json.forEach(function(document) {
			db.collection(collectionName).insert(document, null, function (error, results) {
				if (error) throw error;
				console.log(document);
				console.log("Document inserted");
			});
		});
	});
}

function csvToJson(csv) {

	var json = papa.parse(fileContent, {
		header: true
	});
	return json.data;
}

function getFileContent(fileName) {

	fileContent=fs.readFileSync(folderPath+fileName, "utf8", function (err,data) {
		if(err){
			console.log("Cannot open file");
			return console.log(err); 
		}
	});
	return fileContent;
}

