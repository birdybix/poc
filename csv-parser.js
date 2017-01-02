var _DATA,  
    _I=0;
var fs = require("fs");
var csvparse = require('csv-parse');

fs.readFile('example.csv', 'utf8', function (err,data) {

    if(err){ 
        console.log("Can't open file");
          return console.log(err); 
     }

    csvparse(data, {delimiter : ";"}, function(err, data){

        _DATA = data;
        console.log("data: "+ _DATA)
        // save_handleLine(_I,function(){
        //     console.log(_I+" entries saved");
        // });

    });
});