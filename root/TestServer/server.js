var cors = require('cors')
var formidable = require('formidable');
var fs = require('fs');
const assert = require('assert');
const mongodb = require('mongodb');
const express = require('express');
const http = require('http');
var socketio = require('socket.io');
const aws = require('aws-sdk');
var uuid = require('uuid');

//const multer = require('multer')
//const multerS3 = require('multer-s3')

const app = express();
const server = http.Server(app);
const io = socketio(server);
const MongoClient = mongodb.MongoClient;

app.use(cors())

let port = process.env.PORT || 3000;
server.listen(port, () => {
	  console.log(`Listening on port ${port}`);
});

class Database {
	constructor(url,dbName) {
		MongoClient.connect(url,{useNewUrlParser:true}, (err, client) => {
		  assert.equal(null, err);
		  //console.log("Connected successfully to server");
		  this.db = client.db(dbName);
		});

		this.db = MongoClient.connect(url,{ useNewUrlParser: true }, (err, db) => {
			if(err)
				throw err;
			return db
		})
	}
	query(collection,query) {
		if(this.db === null)
			throw new 'DB Not Created';
		return new Promise((resolve,reject) => {
			this.db.collection(collection).find(query).toArray(function(err, result) {
				if (err) return reject (err);
				resolve(result);
			});
		});
	}
	insertOne(collection,query) {
		if(this.db === null)
			throw new 'DB Not Created';
		return new Promise((resolve,reject) => {
			this.db.collection(collection).insertOne(query).then(result => {
				resolve(result)
			}).catch(err => {
				reject(err)
			})
		});
	}
	close() {
		if(this.db)
			db.close();
	}
}
const dbName = 'one-zero';
const url = 'mongodb://localhost:27017/'
let database = new Database(url,dbName);

//==========================================================

const s3 = new aws.S3({
	  accessKeyId: "AKIAJY5CP7T5EBYHXYQA",
	  secretAccessKey: "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",
	  region: "us-east-1",
});

/*
const upload = multer({
	  storage: multerS3({
		      s3,
		      bucket: "test-jk-rn",
		      acl: 'public-read',
		      metadata(req, file, cb) {
			            cb(null, {fieldName: file.fieldname});
			          },
		      key(req, file, cb) {
			            cb(null, Date.now().toString() + '.png');
			          }
		    })
})
*/
//==========================================================


app.post('/upload', (req,res) => {
	var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    var oldpath = files.photo.path;
    var newpath = '/root/TestServer/pics/' + files.photo.name;
    fs.rename(oldpath, newpath, function (err) {
      if (err) throw err;
			//Add to Mongo
			database.insertOne('pics', {
				name: files.photo.name,
				path: newpath
			})
			console.log('File uploaded and moved!');
			//Tell other clients about the new picture
			io.emit('newPhoto');

			/*
			var objectParams = {Bucket: 'test-jk-rn', Key: files.photo.name, Body: files.photo};
			var uploadPromise = s3.putObject(objectParams).promise();
			uploadPromise.then(data => {
			    console.log("Successfully uploaded data to " + bucketName + "/" + keyName);
			}).catch((err) => {
				console.error(err, err.stack);
			});
			*/
		})
	})
})

app.get('/pic', (req,res) => {
	console.log(database.db);
	res.sendFile('/root/TestServer/pics/photo.jpg');
})

app.get('/pictures', (req,res) => {
	database.query('pics', {}).then(qres => {
		res.json(qres)
	}).catch(err => {
		res.json(err)
	})
})

app.get('/picture/:name', (req,res) => {
	let name = req.params.name;
	res.sendFile(`/root/TestServer/pics/${name}`);
})

io.on('connection', (socket) => {
  console.log('+1');
});

//==========================================================

const processExitHandler = async (error) => {
	console.log("Cleaning up");
	database.close();
};

process.on('SIGINT', processExitHandler); // Catches ctrl+c
process.on('SIGUSR1', processExitHandler); // SIGUSR1 and SIGUSR2 are for `kill pid` (ex: nodemon restart)


/*

const upload2 = multer({ dest: 'pics/'})

app.post('/upload', upload.single('photo'), (req, res, next) => {
	res.json(req.file)
})
app.post('/test', upload2.single('photo'), (req, res) => {
	console.log(req.file)
	res.json(req.file)
})
app.get('/pic', (req,res) => {
	res.sendFile('/root/TestServer/pics/test.jpg');
})

app.get("/pic2", (req, res) => {
	//var data = getIcon(req.params.w);
	var img = new Buffer('/root/TestServer/pics/test.jpg', 'base64');

	res.writeHead(200, {
		'Content-Type': 'image/jpg',
		'Content-Length': img.length
	});
	res.end(img);
});

app.get('/mongo', (req,res) => {
	let collection = 'users';
	let query = { address: "Park Lane 38" };
	database.query(collection,query).then(res => {
		console.log(res);
	})

});

*/
