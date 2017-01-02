var _DATA;
var fs = require("fs");
var papa = require('papaparse');

exports.parse = function(MongoClient) {

	content=fs.readFileSync('./example.csv', 'utf8', function (err,data) {
	    if(err){
	        console.log("Can't open file");
	          return console.log(err); 
	     }
    });
	papa.parse(content, {
		header: true,
		complete: function(results) {
			//console.log(results.data[1]);
			//return results.data;

			MongoClient.connect("mongodb://localhost/city", function(error, db) {
				if (error) return funcCallback(error);
				console.log("Connected to 'city' collection");

				results.data.forEach(function(obj) {
					db.collection("city").insert(obj, null, function (error, results) {
					    if (error) throw error;
						console.log(obj);
					    console.log("Document inserted");
					});
				});
			});
		}
	});
}
