//VARIABLES GLOBALLES
const d = document;
let nombrePro = d.querySelector("#nombrePro");
let precioPro = d.querySelector("#precioPro");
let imagenPro = d.querySelector("#imagenPro");
let descripcionPro = d.querySelector("#descripcionPro");
let btnGuardar = d.querySelector(".btnGuardar");
let tabla = d.querySelector(".table >tbody");

//VALIDAR DATOS DEL FORMULARIO
btnGuardar.addEventListener("click", ()=>{
    ValidarDatos();
    mostrarDatos();
    
});

//EVENTO PARA DETECTAR CUANDO SE RECARGUE LA PAGINA
d.addEventListener("DOMContentLoaded", ()=>{
    mostrarDatos();
}); 

function ValidarDatos() {
    let producto;
    if(nombrePro.value && precioPro.value && imagenPro.value){
        producto = {
            nombre : nombrePro.value,
            precio : precioPro.value,
            imagen : imagenPro.value,
            descripcionPro : descripcionPro.value
        }
        //LLAMAR FUNCION GUARDAR DATOS
    guardarDatos(producto);
        // alert("Todo bien👌");
    }else{
        alert("Todos los campos son obligatorios");
    }
    nombrePro.value;
    //BORRRAR LOS DATOS DEL FORMULARIO
    nombrePro.value = "";
    precioPro.value = "";
    imagenPro.value = "";
    descripcionPro.value = "";

    //MOSTRAR DATOS EN CONSOLA
    console.log(producto);
}

//FUNCION PARA GUARDAR DATOS EN LOCAL STORAGE
function guardarDatos(pro) {
    let productos = JSON.parse(localStorage.getItem("productos")) || []; //CONDICIONALES DIRECTOS
    productos.push(pro); //PARA EL NUEVO PRODUCTO QUE INGRESA EL USUARIO
    //GUARDAR PRODUCTO EN LOCAL STORAGE
    localStorage.setItem("productos", JSON.stringify(productos));
    alert("productos guardados con éxito");
}

//FUNCION PARA MOSTRAR LOS DATOS EN LA TABLA GUARDADOS EN LOCALSTORAGE
function mostrarDatos() {
    let productos = JSON.parse(localStorage.getItem("productos")) || []; //LA VARIABLE PRODCUTOS AHORA ES UN ARRAY
    productos.forEach((producto, i) => {
        let fila = d.createElement("tr");
        fila.innerHTML = `
        <td>${i+1}</td>
        <td>${producto.nombre}</td>
        <td>${producto.precio}</td>
        <td><img src="${producto.imagen}" width=50% /img></td>
        <td>${producto.descripcionPro}</td>
        <td>
            <span class="btn-editar btn btn-warning"> 🗳️ </span>
            <span onclick="eliminarPedido(${i})"class="btn-editar btn btn-warning"> ❌ </span>
        </td>
        `;
        tabla.appendChild(fila);
    });
}

function borarTabla() {
    let filas= d.querySelectorAll(".table tbody tr");
    filas.forEach((f)=>{
        f.remove();
    });
}

function eliminarPedido(pos) {
    let pedidos = [];
    let pedidosPrevios = JSON.parse(localStorage.getItem(litadoPedidos));
    if(pedidosPrevios != null){
        pedidos = pedidosPrevios;   
    }
    //PEDIDO A ELIMINAR
    let confirmar = confirm("¿Deseas eliminar el producto?")
    if(confirmar){
        alert("Lo eliminaste");
    }
}

//MOSTRAR LOS DATOS AL RECARGAR LA PAGINA
d.addEventListener("DOMContentLoaded", ()=>{
    borarTabla();
    mostrarDatos();
}); 
