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
  // if (err) throw err;
  console.log("Connected!");
});



function pedir_tabla(table_name,res){

  con.query("SELECT * FROM " + table_name, function (err, result) {
    if (err) throw err;
    console.log(JSON.stringify(result))
    res.json(result);
  });
}




app.get('/index.js', (req, res) => {res.sendFile("index.js",{root:__dirname})});
app.get('/index.css', (req, res) => {res.sendFile("index.css",{root:__dirname})});

app.get('/tables/productos', (req, res) => {
  pedir_tabla("productos",res)
})


app.get('/', (req, res) => {
    console.log("Connected!");
    res.sendFile("index.html",{root:__dirname})
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})