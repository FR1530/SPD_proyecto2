/*
@param {string} element_name
*/
function __add_element(element_name="div" ,text_content=""){
	element = document.createElement(element_name);
	element.textContent = text_content;
	return element
}








function validar_informacion(){

	productos = leer_tabla()
	let valor_ret = true
	for(let i=0; i < productos.length;i++){

			console.log(productos[i])
			if(isNaN(productos[i].precio) || isNaN(productos[i].cantidad)){
				tabla = document.getElementById("tabla")
				tabla.childNodes[i+2].classList.add("error")
				valor_ret = false
			}else{
				tabla.childNodes[i+2].classList.remove("error")
			}
		}
		

		for(let i=0; i < productos.length && valor_ret;i++){
				tabla.childNodes[i+2].classList.remove("error")
			}
		if(valor_ret == false){alert("hay algun dato invalido")}
		return valor_ret




	}













/*
retorna un array de objetos con todas las entradas de la tabla 
*/ 
function leer_tabla(){

	let productos = []
	let tabla = document.getElementById("tabla")
	for(let i=0; i <tabla.childNodes.length;i++){
		if(tabla.childNodes[i].nodeName != "TR"){continue}
		nodo_actual = tabla.childNodes[i]
		productos.push({
			id: parseInt(nodo_actual.childNodes[0].textContent,10),
			nombre: nodo_actual.childNodes[1].textContent,
			precio: parseInt(nodo_actual.childNodes[2].textContent,10),
			cantidad: parseInt(nodo_actual.childNodes[3].textContent,10),
		})


	}
	return productos
}




function __add_fila(id=0,producto="",precio=0,cantidad=0){
	let fila = __add_element("tr")
	let _id = __add_element("td",id)
	let _producto = __add_element("td",producto)
	let _precio = __add_element("td",precio)
	let _cantidad = __add_element("td",cantidad) 
	let borrar = __add_element("button","X")
	let _borrar = __add_element("td")

	_producto.setAttribute("contenteditable", true)
	_cantidad.setAttribute("contenteditable", true)
	_precio.setAttribute("contenteditable", true)
	//_id.classList.add("filas")
	//_producto.classList.add("filas")
	//_cantidad.classList.add("filas")
	//_precio.classList.add("filas")

	borrar.setAttribute("onclick",`eliminar_celda(this)`)
	_borrar.classList.add("btn_delete")

	fila.appendChild(_id)
	fila.appendChild(_producto)
	fila.appendChild(_precio)
	fila.appendChild(_cantidad)
	fila.appendChild(_borrar)
	_borrar.appendChild(borrar)
	return fila
}

async function send_to_db(){

	if(validar_informacion() == false){return}


	opts = {
		method: "POST",
		headers:{
			"Content-Type":"application/json"
		},
		body: JSON.stringify({tabla:"productos",arreglo:JSON.stringify(leer_tabla())})


	}
	request = await fetch("http://localhost:3000/tables/update",opts)



}




async function add_from_database(){
	resultados = await fetch("http://localhost:3000/tables/productos")
	productos = await resultados.json()
	let tabla = document.getElementById("tabla")
	for(let i=0; i <productos.length;i++){
		let temp = __add_fila(productos[i].idproductos,productos[i].nombre,productos[i].precio,productos[i]["cantidad disponible"])
		tabla.appendChild(temp)
	}
	
	

}







var ID_GLOBAL = 0


function eliminar_celda(e) {
    // Preguntar al usuario antes de eliminar la celda
    // var pregunta = confirm("¿Eliminar esta celda desplazará todos los IDs siguientes en -1. ¿Está seguro de que quiere eliminar esta celda?");
    // if (!pregunta) {
    //     return;
    // }

    var fila = e.closest("tr");

    var id = parseInt(fila.cells[0].textContent);

    var productos = document.getElementById("tabla");

    var len = productos.rows.length;

    for (var i = id+1; i < len; i++) {
        var filaActual = productos.rows[i];
        var idActual = parseInt(filaActual.cells[0].textContent);
        filaActual.cells[0].textContent = idActual - 1;
    }
	fila.remove();
}






function add_fila(){
	tmp=[]
	for(let i=0; i<leer_tabla().length;i++){
		tmp.push(leer_tabla()[i].id)
	}
	console.log(tmp)

	ID_GLOBAL = tmp.length >0 ? Math.max(...tmp)+1 : 1


	let tabla = document.getElementById("tabla")
		tableRow = __add_element("tr")
		id = __add_element("td",ID_GLOBAL)
		producto = __add_element("td")
		cantidad = __add_element("td",0)
		precio = __add_element("td",0)
		borrar = __add_element("button","X")
		_borrar = __add_element("td")


		tabla.appendChild(tableRow)
		tableRow.appendChild(id)
		tableRow.appendChild(producto)
		tableRow.appendChild(cantidad)
		tableRow.appendChild(precio)
		tableRow.appendChild(_borrar)
		_borrar.appendChild(borrar)
		producto.setAttribute("contenteditable", true)
		cantidad.setAttribute("contenteditable", true)
		precio.setAttribute("contenteditable", true)
		
		
		borrar.setAttribute("onclick",`eliminar_celda(this)`)
		_borrar.classList.add("btn_delete")


}



function main(){

	let tabla = document.getElementById("tabla")
	for(let i=1; i <10;i++){
		ID_GLOBAL =i
		tableRow = document.createElement("tr")
		id = document.createElement("td")
		id.textContent = i 
		producto = document.createElement("td")
		producto.textContent = "producto " + i
		cantidad = document.createElement("td")
		cantidad.textContent = i*100
		precio = document.createElement("td")
		precio.textContent = i*100
		borrar = document.createElement("td")
		borrar.textContent = "delete"



		tabla.appendChild(tableRow)
		tableRow.appendChild(id)
		tableRow.appendChild(producto)
		tableRow.appendChild(cantidad)
		tableRow.appendChild(precio)
		tableRow.appendChild(borrar)

		producto.setAttribute("contenteditable", true)
		cantidad.setAttribute("contenteditable", true)
		precio.setAttribute("contenteditable", true)



		//id.classList.add("filas")
		//producto.classList.add("filas")
		//cantidad.classList.add("filas")
		//precio.classList.add("filas")

	}

}

