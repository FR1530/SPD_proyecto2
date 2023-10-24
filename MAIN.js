const express = require("express");
const req = require("express/lib/request");
const body_parser = require("body-parser")
const mysql = require("mysql");
const bodyParser = require("body-parser");
const app = express()
const port = 3000
app.use(express.json())

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



function pedir_tabla(table_name,res){
  con.query("SELECT * FROM " + table_name, function (err, result) {
    if (err) throw err;
    console.log(JSON.stringify(result))
    res.json(result);
  });
}







/*
@request body:
  - tabla
  - arreglo de información que añadir
    - ID 
    - nombre 
    - cantidad disponible
    - precio 
    - empresa


*/ 



function actualizar_database(request_body){

  contenido = request_body
  tabla = contenido.tabla;
  arreglo = JSON.parse(contenido.arreglo)

  for(let i=0; i <arreglo.length;i++){

    //ese string de abajo es nefasto
    let valor_actual = arreglo[i]
    let comando = "INSERT "+tabla+"(idproductos,precio,nombre,distribuidor,`cantidad disponible`, inventario_idinventario) "
    + "values(" +valor_actual.id+","+valor_actual.precio+",'"+valor_actual.nombre+"', 'empresa',"+valor_actual.cantidad+",1)"

    console.log({
      index: valor_actual,
      com: comando
    })



    con.query(comando, function (err, result) {
      if (err) throw err;
      console.log(JSON.stringify(result))
    });


  }



}




app.get('/index.js', (req, res) => {res.sendFile("index.js",{root:__dirname})});
app.get('/index.css', (req, res) => {res.sendFile("index.css",{root:__dirname})});

app.get('/tables/productos', (req, res) => {
  pedir_tabla("productos",res)
})

app.post("/tables/update",(req,res) =>{
  actualizar_database(req.body)
  console.log(req.body) 
  res.json(JSON.stringify({test:"a"}))
  
})



app.get('/', (req, res) => {




    console.log("Connected!");
    res.sendFile("index.html",{root:__dirname})


  //res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})