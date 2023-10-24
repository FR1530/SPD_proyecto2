/*
@param {string} element_name
*/
function __add_element(element_name="div" ,text_content=""){
	element = document.createElement(element_name);
	element.textContent = text_content;
	return element
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


	_producto.setAttribute("contenteditable", true)
	_cantidad.setAttribute("contenteditable", true)
	_precio.setAttribute("contenteditable", true)

	_id.classList.add("filas")
	_producto.classList.add("filas")
	_cantidad.classList.add("filas")
	_precio.classList.add("filas")



	fila.appendChild(_id)
	fila.appendChild(_producto)
	fila.appendChild(_precio)
	fila.appendChild(_cantidad)
	return fila
}

async function send_to_db(){

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
function add_fila(){
	ID_GLOBAL+=1
	let tabla = document.getElementById("tabla")
		tableRow = __add_element("tr")
		id = __add_element("td",ID_GLOBAL)
		producto = __add_element("td")
		cantidad = __add_element("td",0)
		precio = __add_element("td",0)
		borrar = __add_element("td","delete")


		tabla.appendChild(tableRow)
		tableRow.appendChild(id)
		tableRow.appendChild(producto)
		tableRow.appendChild(cantidad)
		tableRow.appendChild(precio)
		tableRow.appendChild(borrar)
		producto.setAttribute("contenteditable", true)
		cantidad.setAttribute("contenteditable", true)
		precio.setAttribute("contenteditable", true)



		id.classList.add("filas")
		producto.classList.add("filas")
		cantidad.classList.add("filas")
		precio.classList.add("filas")

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



		id.classList.add("filas")
		producto.classList.add("filas")
		cantidad.classList.add("filas")
		precio.classList.add("filas")

	}

}

