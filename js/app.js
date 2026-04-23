//variables

const carrito = document.querySelector('#carrito');

const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');

cargaEventListeners();

function cargaEventListeners() {
    listaCursos.addEventListener('click', agregarCurso);
}

//funciones
function agregarCurso() {
    console.log("Presionando cursos");
        
}