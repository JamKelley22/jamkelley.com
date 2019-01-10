var cors = require('cors')
var fs = require('fs');
const express = require('express');
const http = require('http');

const app = express();
const server = http.Server(app);

app.use(cors())

let port = process.env.PORT || 3001;
server.listen(port, () => {
	  console.log(`Listening on port ${port}`);
});

//==========================================================

app.get('/download', function(req, res){
  var file = __dirname + '/downloads/PunchClock.exe';
	var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	res.download(file, 'PunchClock.exe', function(err){
	  if (err) {
	    // Handle error, but keep in mind the response may be partially-sent
	    // so check res.headersSent
			console.error("Problem Downloading Exe");
	  } else {
	    // decrement a download credit, etc.
			fs.appendFile('pc_ips.txt', ip + "\n", function (err) {
			  if (err) throw err;
			  console.log('+1');
			});
	  }
	});
});

//==========================================================

const processExitHandler = async (error) => {
	console.log("Cleaning up");
	return 0;
};

process.on('SIGINT', processExitHandler); // Catches ctrl+c
process.on('SIGUSR1', processExitHandler); // SIGUSR1 and SIGUSR2 are for `kill pid` (ex: nodemon restart)
