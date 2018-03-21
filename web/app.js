var express = require("express")
var app = express()

app.use(express.static("public"))

app.get('/', function (req, res) {
  res.sendFile(`${__dirname}/views/home.html`)
})

app.listen(3000, function () {
  console.log("Zapinating on port 3000!")
})