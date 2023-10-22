const express = require("express")
const mysql = require("mysql")
const app = express()
const port = 3000


var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "SPD123",
  database: "mydb"
});



con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});





app.get('/index.js', (req, res) => {res.sendFile("index.js",{root:__dirname})});
app.get('/index.css', (req, res) => {res.sendFile("index.css",{root:__dirname})});



app.get('/', (req, res) => {

    console.log("Connected!");
    con.query("SELECT * FROM productos", function (err, result) {
      if (err) throw err;
      //console.log("Result: " + result);
      res.sendFile("index.html",{root:__dirname})
    });


  //res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})