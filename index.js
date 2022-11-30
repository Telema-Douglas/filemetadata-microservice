const express = require('express');
const cors = require('cors');
require('dotenv').config();
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });

var app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse',upload.single('upfile'), function (req, res) {
  const file = req.file;
  const name = file.originalname;
  const type = file.mimetype;
  const size = file.size;
  res.send({name, type, size});
})

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
