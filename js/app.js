//variables

const carrito = document.querySelector('#carrito');

const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];


cargaEventListeners();

function cargaEventListeners() {
    listaCursos.addEventListener('click', agregarCurso);
}

//funciones
function agregarCurso(e) {
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')){
        
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
    
    
}

//Lee el contenido del HTML al que le dimos click y extrae la informacion del curso
function leerDatosCurso(curso){
    console.log(curso);
    
    //crear un  objeto con el contenido del curso actual
    const infoCurso={
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'), 
        cantidad: 1

    }

    //Agrega elementos al carrito
    articulosCarrito=[...articulosCarrito, infoCurso];
    carritoHTML();

}

//Muestra el carrito de compras en el HTML
function carritoHTML(){
    
    //Limpiar HTML
    limpiarHTML();
    
    articulosCarrito.forEach( curso =>{
        const row = document.createElement('tr');
        row.innerHTML = `

            <td> <img src="${curso.imagen}" width=100> </td>
            <td> ${curso.titulo} </td>
            <td> ${curso.precio} </td>
            <td> ${curso.cantidad} </td>
            

        `;

        //Agretga el HTML del carrito al tbody
        contenedorCarrito.appendChild(row);

    } );
}

//Elimina los cursos del tbody
function limpiarHTML(){
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}

