//--------------------------------------//
//--|funcionalidad_menu_de_navegacion|--//
//--------------------------------------//
const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");
const contents = document.querySelectorAll(
    ".main-content-29, .main-content-30, .main-content-31, .main-content-32, .tablero_de_datos_productos-parte-2, .contenedor_buscador-parte-2, .contenedor_productos-parte-2, .contenedor_estadisticas-parte-2, .contenedor_tablero_categorias-parte-2"
);
menuToggle.addEventListener("click", () => {
    sidebar.classList.toggle("active");
    contents.forEach(content => {
        content.classList.toggle("active");
    });
});
//----------------------------------------//
//--|funcionalidad_formulario_de_filtro|--//
//----------------------------------------//

//--------------------------------------//
//--|tablero_de_producos_para_filtros|--//
//--------------------------------------//
const cuerpoTabla_tablero_de_productos_para_filtros =
document.getElementById(
    "tabla_productos_para_filtros"
);
function agregarProducto_tablero_de_productos_para_filtros(
    imagen,
    producto,
    descripcion,
    ubicacion,
    talla,
    color,
    marca,
    precio
){
    const filaVacia =
    cuerpoTabla_tablero_de_productos_para_filtros.querySelector(
        ".fila_vacia_tablero_de_productos_para_filtros"
    );
    if(filaVacia){
        filaVacia.remove();
    }
    const fila =
    document.createElement("tr");
    const celdaImagen =
    document.createElement("td");
    const img =
    document.createElement("img");
    img.src = imagen;
    img.width = 60;
    img.height = 60;
    celdaImagen.appendChild(img);
    const celdaProducto =
    document.createElement("td");
    celdaProducto.textContent =
    producto;
    const celdaDescripcion =
    document.createElement("td");
    celdaDescripcion.textContent =
    descripcion;
    const celdaUbicacion =
    document.createElement("td");
    celdaUbicacion.textContent =
    ubicacion;
    const celdaTalla =
    document.createElement("td");
    celdaTalla.textContent =
    talla;
    const celdaColor =
    document.createElement("td");
    celdaColor.textContent =
    color;
    const celdaMarca =
    document.createElement("td");
    celdaMarca.textContent =
    marca;
    const celdaPrecio =
    document.createElement("td");
    celdaPrecio.textContent =
    precio;
    const celdaAcciones =
    document.createElement("td");
    //--------------------------------//
    //--|boton_seleccionar_producto|--//
    //--------------------------------//
    const botonSeleccionar_tablero_de_productos_para_filtros =
    document.createElement("button");
    botonSeleccionar_tablero_de_productos_para_filtros.type =
    "button";
    botonSeleccionar_tablero_de_productos_para_filtros.innerHTML =
    '<i class="fa-regular fa-square"></i>';
    botonSeleccionar_tablero_de_productos_para_filtros.addEventListener(
        "click",
        function(){
            if(
                fila.classList.contains(
                    "fila_seleccionada_tablero_de_productos_para_filtros"
                )
            ){
                fila.classList.remove(
                    "fila_seleccionada_tablero_de_productos_para_filtros"
                );
                botonSeleccionar_tablero_de_productos_para_filtros.classList.remove(
                    "boton_seleccionado_tablero_de_productos_para_filtros"
                );
                botonSeleccionar_tablero_de_productos_para_filtros.innerHTML =
                '<i class="fa-regular fa-square"></i>';
                alert(
                    "El producto ha sido desmarcado."
                );
            }else{
                fila.classList.add(
                    "fila_seleccionada_tablero_de_productos_para_filtros"
                );
                botonSeleccionar_tablero_de_productos_para_filtros.classList.add(
                    "boton_seleccionado_tablero_de_productos_para_filtros"
                );
                botonSeleccionar_tablero_de_productos_para_filtros.innerHTML =
                '<i class="fa-solid fa-square-check"></i>';
                alert(
                    "El producto ha sido seleccionado."
                );
            }
        }
    );
    //-----------------------------//
    //--|boton_eliminar_producto|--//
    //-----------------------------//
    const botonEliminar_tablero_de_productos_para_filtros =
    document.createElement("button");
    botonEliminar_tablero_de_productos_para_filtros.type =
    "button";
    botonEliminar_tablero_de_productos_para_filtros.innerHTML =
    '<i class="fa-solid fa-trash"></i>';
    botonEliminar_tablero_de_productos_para_filtros.addEventListener(
        "click",
        function(){
            const confirmarEliminar =
            confirm(
                "¿Desea eliminar este producto?"
            );
            if(
                !confirmarEliminar
            ){
                return;
            }
            fila.remove();
            guardarProductos_tablero_de_productos_para_filtros();
            if(
                cuerpoTabla_tablero_de_productos_para_filtros.children.length === 0
            ){
                cuerpoTabla_tablero_de_productos_para_filtros.innerHTML =
                `
                <tr class="fila_vacia_tablero_de_productos_para_filtros">
                    <td colspan="9">
                        Ningún producto añadido
                    </td>
                </tr>
                `;
                localStorage.removeItem(
                    "productos_para_filtros"
                );
            }
            alert(
                "El producto ha sido eliminado correctamente."
            );
        }
    );
    //--------------------------------------//
    //--|agregar_botones_a_la_celda|--//
    //--------------------------------------//
    celdaAcciones.appendChild(
        botonSeleccionar_tablero_de_productos_para_filtros
    );
    
    celdaAcciones.appendChild(
        botonEliminar_tablero_de_productos_para_filtros
    );
    fila.appendChild(celdaImagen);
    fila.appendChild(celdaProducto);
    fila.appendChild(celdaDescripcion);
    fila.appendChild(celdaUbicacion);
    fila.appendChild(celdaTalla);
    fila.appendChild(celdaColor);
    fila.appendChild(celdaMarca);
    fila.appendChild(celdaPrecio);
    fila.appendChild(celdaAcciones);
    cuerpoTabla_tablero_de_productos_para_filtros.appendChild(
        fila
    );
}
function cargarProductos_tablero_de_productos_para_filtros(){
    const productos =
    JSON.parse(
        localStorage.getItem(
            "productos_para_filtros"
        )
    ) || [];
    productos.forEach(
        function(producto){
            agregarProducto_tablero_de_productos_para_filtros(
                producto.imagen,
                producto.producto,
                producto.descripcion,
                producto.ubicacion,
                producto.talla,
                producto.color,
                producto.marca,
                producto.precio
            );
        }
    );
}
function guardarProductos_tablero_de_productos_para_filtros(){
    const productos = [];
    const filas =
    cuerpoTabla_tablero_de_productos_para_filtros.querySelectorAll(
        "tr"
    );
    filas.forEach(
        function(fila){
            if(
                fila.classList.contains(
                    "fila_vacia_tablero_de_productos_para_filtros"
                )
            ){
                return;
            }
            const celdas =
            fila.querySelectorAll("td");
            productos.push({
                imagen:
                celdas[0]
                .querySelector("img")
                .src,
                producto:
                celdas[1].textContent,
                descripcion:
                celdas[2].textContent,
                ubicacion:
                celdas[3].textContent,
                talla:
                celdas[4].textContent,
                color:
                celdas[5].textContent,
                marca:
                celdas[6].textContent,
                precio:
                celdas[7].textContent
            });
        }
    );
    localStorage.setItem(
        "productos_para_filtros",
        JSON.stringify(productos)
    );
}
document.addEventListener(
    "DOMContentLoaded",
    function(){
        cargarProductos_tablero_de_productos_para_filtros();
    }
);