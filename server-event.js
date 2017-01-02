var http = require('http');

var EventEmitter = require('events').EventEmitter;

var jeu = new EventEmitter();

var server = http.createServer(function(req, res) {
  res.writeHead(200);
  res.end('Salut tout le monde !');
});

server.on('close', function() { // On écoute l'évènement close
    console.log('Bye bye !');
	jeu.emit('gameover', 'Vous avez perdu !');
})

server.listen(8080); // Démarre le serveur

server.close(); // Arrête le serveur. Déclenche l'évènement close


jeu.on('gameover', function(message){
    console.log(message);
});
