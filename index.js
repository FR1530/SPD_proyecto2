

var ID_GLOBAL = 0
function add_fila(){
	ID_GLOBAL+=1
	let tabla = document.getElementById("tabla")
		tableRow = document.createElement("tr")
		id = document.createElement("td")
		id.textContent = ID_GLOBAL
		producto = document.createElement("td")
		producto.textContent = ""
		cantidad = document.createElement("td")
		cantidad.textContent = 0
		precio = document.createElement("td")
		precio.textContent = 0
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



function main(){

	let tabla = document.getElementById("tabla")

	for(let i=0; i <10;i++){
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

