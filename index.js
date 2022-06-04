var express = require('express');
var cors = require('cors');
var multer = require('multer')

require('dotenv').config()

var app = express();

let upload = multer({ dest: '/api/fileanalyse'})
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'),   (req, res) => {
  console.log(req.file);
  let resObj = req.file;
 
  let obj = {
    name: resObj.originalname,
    type: resObj.mimetype,
    size: resObj.size
  }

  res.send(obj)
})



const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
