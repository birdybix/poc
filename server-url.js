var http = require('http');
var url = require('url');
var querystring = require('querystring');

var server = http.createServer(function(req, res) {
    var page = url.parse(req.url).pathname;
    console.log(page);
    res.writeHead(200, {"Content-Type": "text/plain"});
    if (page == '/pop') {
	    var params = querystring.parse(url.parse(req.url).query);
	    if ('prenom' in params && 'nom' in params) {
	        res.write('Vous vous appelez ' + params['prenom'] + ' ' + params['nom']);
	    }
	    else {
	        res.write('Vous devez bien avoir un prénom et un nom, non ?');
	    }
	}

    else if (page == '/') {
        res.write('Vous êtes à l\'accueil, que puis-je pour vous ?');
    }
    else if (page == '/sous-sol') {
        res.write('Vous êtes dans la cave à vins, ces bouteilles sont à moi !');
    }
    else if (page == '/etage/1/chambre') {
        res.write('Hé ho, c\'est privé ici !');
    }
    else {
    	res.writeHead(400, {"Content-Type": "text/plain"});
        res.write('not found');

    }
    res.end();
});
server.listen(8080);