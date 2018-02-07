var express = require('express')
var app = express()
var port = 2000
var bodyParser = require('body-parser')
var path = require('path')
var morgan = require('morgan')
var fs = require('fs')
var Grid = require('gridfs-stream')
var mongo = require('mongodb')
var multer = require('multer')

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')))
app.use('/public', express.static(path.join(__dirname, 'public')))
app.use('/views', express.static(path.join(__dirname, 'views')))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'html')

var mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/clients', function (err) {
  if (err) throw err
  else console.log('connected to the clients db')
})
var conn = mongoose.connection

var nameSchema = new mongoose.Schema({
  cname: String,
  fileId: String,
  file: Buffer
})

var clients = mongoose.model('clients', nameSchema)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.get('/clients', function (req, res) {
  clients.find(function (err, docs) {
    res.json(docs)
  // console.log(docs)
  })
})

var storage = multer.diskStorage({ //multers disk storage settings
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    var datetimestamp = Date.now();
    cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
  }
});
var upload = multer({ //multer settings
  storage: storage
}).single('file');

/** API path that will upload the files */
app.post('/upload', function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      res.json({ error_code: 1, err_desc: err });
      return;
    }
    res.json({ error_code: 0, err_desc: null });
  }) 
    });

// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
/* var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads')
  },
  filename: function (req, file, callback) {
    console.log(file)
    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

var upload = multer({ storage: storage })

app.post('/upload', function (req, res) {
  Grid.mongo = mongoose.mongo
  conn.once('open', function (req, res) {
    console.log('open')
    var gfs = Grid(conn.db)

    console.log('post request started')
    multer({
      dest: './uploads',
      upload: null, // take uploading process 
      inMemory: true, // or false, not needed here

      onFileUploadStart: function (file) {
        // set upload with WritableStream 
        console.log('uploading has started')
        this.upload = gfs.createWriteStream({
          filename: file.originalname,
          mode: 'w',
          chunkSize: 1024 * 4,
          content_type: file.mimetype,
          root: 'fs',
          metadata: {} // put some crazy meta data in here
        })
        console.log('this.upload', this.upload, upload)
      },

      onFileUploadData: function (file, data) {
        // put the chunks into db 
        this.upload.write(data)
      },

      onFileUploadComplete: function (file) {
        // end process 
        this.upload.end()
        console.log('successfully written File to MongoDB Gridfs')
      }
    }),
    function (req, res) {
      res.sendStatus(200)
    }
  })
})
app.route('/clients/:file').get(function (req, res) {
  var readstream = gfs.createReadStream({_id: req.params.file})
  readstream.pipe(res)
})
 */
Grid.mongo = mongoose.mongo
conn.once('open', function (req, res) {
  console.log('open')
  var gfs = Grid(conn.db)

  var writestream = gfs.createWriteStream({
    filename: 'file.txt'
  })

  fs.createReadStream('C:/Users/GSD1004/Desktop/data_save/uploads/file.txt').pipe(writestream)

  writestream.on('close', function (file) {
    console.log(file.filename + 'writting to the database')
  })
})

/* var storage = require('multer-gridfs-storage')({
  url: 'mongodb://localhost:27017/clients',

  file: (req, file) => {
    console.log(req.file)
    return {
      filename: 'file' + Date.now()
    }
  }
})
// var upload = multer({ storage: storage })
var upload = multer({ storage: storage  }).single('file')

app.post('/clients', function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      console.log(err)
    }
  })
})
 */
// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
/* app.post('/clients', function (req, res) {
  var data = new clients(req.body)
  var newData = {
    cname: req.cname,
    fileId: req.fileId,
    file: req.file
  }
  console.log('re.bodyy', data)
  console.log('re.new', newData)
  data.save(function (err, docs) {
    if (err) {
      throw err
    }else {
      res.json(docs)
      console.log(docs)
    }
  })
}) */

app.listen(port, () => {
  console.log('Server listening on port ' + port)
})
