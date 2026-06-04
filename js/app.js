//variables

const carrito = document.querySelector('#carrito');

const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];


cargaEventListeners();

function cargaEventListeners() {
    listaCursos.addEventListener('click', agregarCurso);

    //Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso)

    //Muestra los cursos de localStorage
    document.addEventListener('DOMContentLoaded', ()=>{
        articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];

        carritoHTML();
    })

    //vaciar carrito
    vaciarCarritoBtn.addEventListener('click', ()=>{


        articulosCarrito = [];
        limpiarHTML();
        sincronizarStorage();
    })
}

//funciones
function agregarCurso(e) {
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')){
        
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
    
    
}

//Eliminar curso del carrito
function eliminarCurso(e){

    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');

        //Elimina articulos del carrito por data-id
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId );
        
        carritoHTML();
        
    }

    
    
}

//Lee el contenido del HTML al que le dimos click y extrae la informacion del curso
function leerDatosCurso(curso){
    
    //crear un  objeto con el contenido del curso actual
    const infoCurso={
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'), 
        cantidad: 1

    }

    //revisa si un elemento existe en el carrito
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id);

    if(existe){
        //actualizar cantidad+
        const cursos = articulosCarrito.map( curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;

                return curso;
            }else{
                return curso;
            }
        } );

        articulosCarrito =[ ...cursos];

    }else{
        //Agrega elementos al carrito
        articulosCarrito=[...articulosCarrito, infoCurso];
        
    }
    
    carritoHTML();
    

}

//Muestra el carrito de compras en el HTML
function carritoHTML(){
    
    //Limpiar HTML
    limpiarHTML();
    
    articulosCarrito.forEach( curso =>{

        const {imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `

            <td> <img src="${imagen}" width=100> </td>
            <td> ${titulo} </td>
            <td> ${precio} </td>
            <td> ${cantidad} </td>
            <td>
                <a hrf="#" class="borrar-curso" data-id="${id}"> X </a>
            </td>

        `;

        //Agretga el HTML del carrito al tbody
        contenedorCarrito.appendChild(row);

    } );

    //Sincronizar con localstorage
    sincronizarStorage();
}

function sincronizarStorage(){
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito))
}

//Elimina los cursos del tbody
function limpiarHTML(){
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}

