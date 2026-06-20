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
//---------------------//
//--|crear_categoria|--//
//---------------------//
const botonCrearCategoria =
    document.querySelector(
        ".boton_crear"
    );
const inputCategoria =
    document.querySelector(
        ".input_categoria"
    );
botonCrearCategoria.addEventListener(
    "click",
    function () {
        const nombreCategoria =
            inputCategoria.value.trim();
        if (
            nombreCategoria === ""
        ) {
            alert(
                "Escribe un nombre para la categoria"
            );
            return;
        }
        let categorias =
            JSON.parse(
                localStorage.getItem(
                    "lista_categorias"
                )
            ) || [];
        const existe =
            categorias.some(
                function(categoria){
                    return categoria.toLowerCase() ===
                        nombreCategoria.toLowerCase();
                }
            );
        if (
            existe
        ) {
            alert(
                "La categoria ya existe"
            );
            return;
        }
        categorias.push(
            nombreCategoria
        );
        localStorage.setItem(
            "lista_categorias",
            JSON.stringify(
                categorias
            )
        );
        alert(
            "Categoria creada correctamente"
        );
        inputCategoria.value = "";
    }
);
//--------------------------------------------//
//--|funcionalidad_herramientas_de_busqueda|--//
//--------------------------------------------//
const campoBuscarCategoria =
    document.getElementById(
        "input_buscar_categoria"
    );
const botonBuscarCategoria =
    document.getElementById(
        "btn_buscar_categoria"
    );
const botonAgregarTodo =
    document.getElementById(
        "btn_agregar_todo"
    );
const botonEliminarTodo =
    document.getElementById(
        "btn_eliminar_todo"
    );
const campoFiltro =
    document.getElementById(
        "campo_filtro"
    );
const textoFiltro =
    document.getElementById(
        "texto_filtro"
    );
const botonDesplegarFiltro =
    document.getElementById(
        "btn_desplegar_filtro"
    );
const listaFiltro =
    document.getElementById(
        "lista_filtro"
    );
const opcionesFiltro =
    document.querySelectorAll(
        ".opcion_filtro"
    );
botonDesplegarFiltro.addEventListener(
    "click",
    function(){
        listaFiltro.classList.toggle(
            "activa"
        );
        const icono =
            botonDesplegarFiltro.querySelector(
                "i"
            );
        if(
            listaFiltro.classList.contains(
                "activa"
            )
        ){
            icono.classList.remove(
                "fa-chevron-down"
            );
            icono.classList.add(
                "fa-chevron-up"
            );
        }
        else{
            icono.classList.remove(
                "fa-chevron-up"
            );
            icono.classList.add(
                "fa-chevron-down"
            );
        }
    }
);
//------------------------//
//--|seleccionar_opcion|--//
//------------------------//
opcionesFiltro.forEach(
    function(
        opcion
    ){
        opcion.addEventListener(
            "click",
            function(){
                const filtro =
                    this.dataset.filtro;
                textoFiltro.textContent =
                    this.textContent;
                listaFiltro.classList.remove(
                    "activa"
                );
                const icono =
                    botonDesplegarFiltro.querySelector(
                        "i"
                    );
                icono.classList.remove(
                    "fa-chevron-up"
                );
                icono.classList.add(
                    "fa-chevron-down"
                );
                filtrarProductos(
                    filtro
                );
            }
        );
    }
);
//---------------------//
//--|buscar_producto|--//
//---------------------//
function buscarProducto(){
    const textoBusqueda =
        campoBuscarCategoria.value
        .toLowerCase()
        .trim();
    const productos =
        JSON.parse(
            localStorage.getItem(
                "lista_productos_categoria"
            )
        ) || [];
    if(
        textoBusqueda.length === 0
    ){
        const mensajeVacio =
            document.getElementById(
                "mensaje_vacio"
            );
        mensajeVacio.textContent =
            "Ningun producto almacenado";
        cargarProductosTablero();
        return;
    }
    const productosFiltrados =
        productos.filter(
            function(
                producto
            ){
                return producto.nombre
                    .toLowerCase()
                    .includes(
                        textoBusqueda
                    );
            }
        );
    mostrarProductosBuscados(
        productosFiltrados
    );
}
//-------------------//
//--|agregar_todos|--//
//-------------------//
function agregarTodosProductos(){
    let productos =
        JSON.parse(
            localStorage.getItem(
                "lista_productos_categoria"
            )
        ) || [];
    if(
        productos.length === 0
    ){
        alert(
            "No existen productos para enviar."
        );
        return;
    }
    productos.forEach(
        function(
            producto
        ){
            producto.seleccionado =
                true;
        }
    );
    localStorage.setItem(
        "lista_productos_categoria",
        JSON.stringify(
            productos
        )
    );
    cargarProductosTablero();
    alert(
        "Se han enviado todos los productos a todas las categorias correspondientes."
    );
}
//--------------------//
//--|eliminar_todos|--//
//--------------------//
function eliminarTodosProductos(){
    let productos =
        JSON.parse(
            localStorage.getItem(
                "lista_productos_categoria"
            )
        ) || [];
    if(
        productos.length === 0
    ){
        alert(
            "No existen productos para eliminar."
        );
        return;
    }
    const respuesta = confirm(
        "¿Desea eliminar todos los productos del tablero?"
    );
    if(
        !respuesta
    ){
        return;
    }
    localStorage.removeItem(
        "lista_productos_categoria"
    );
    cargarProductosTablero();
    alert(
        "Todos los productos fueron eliminados correctamente."
    );
}
//-----------------------//
//--|filtrar_productos|--//
//-----------------------//
function filtrarProductos(
    filtro
){
    let productos =
        JSON.parse(
            localStorage.getItem(
                "lista_productos_categoria"
            )
        ) || [];
    if(
        filtro === ""
    ){
        cargarProductosTablero();
        return;
    }
    if(
        filtro === "alfabetico"
    ){
        productos.sort(
            function(
                a,
                b
            ){
                return a.nombre.localeCompare(
                    b.nombre
                );
            }
        );
    }
    else if(
        filtro === "precio_alto"
    ){
        productos.sort(
            function(
                a,
                b
            ){
                return parseFloat(
                    b.precio
                ) - parseFloat(
                    a.precio
                );
            }
        );
    }
    else if(
        filtro === "precio_bajo"
    ){
        productos.sort(
            function(
                a,
                b
            ){
                return parseFloat(
                    a.precio
                ) - parseFloat(
                    b.precio
                );
            }
        );
    }
    else if(
        filtro === "negro"
    ){
        productos =
            productos.filter(
                function(
                    producto
                ){
                    return producto.color
                        .toLowerCase()
                        ===
                        "negro";
                }
            );
    }
    else if(
        filtro === "blanco"
    ){
        productos =
            productos.filter(
                function(
                    producto
                ){
                    return producto.color
                        .toLowerCase()
                        ===
                        "blanco";
                }
            );
    }
    else if(
        filtro === "azul"
    ){
        productos =
            productos.filter(
                function(
                    producto
                ){
                    return producto.color
                        .toLowerCase()
                        ===
                        "azul";
                }
            );
    }
    mostrarProductosBuscados(
        productos
    );
}
function mostrarProductosBuscados(
    listaProductos
){
    const tbody =
        document.getElementById(
            "tbody_productos"
        );
    const mensajeVacio =
        document.getElementById(
            "mensaje_vacio"
        );
    tbody.innerHTML = "";
    if(
        listaProductos.length === 0
    ){
        mensajeVacio.style.display =
            "flex";
        mensajeVacio.textContent =
            "No se encontraron productos.";
        return;
    }
    mensajeVacio.style.display =
        "none";
    mensajeVacio.textContent =
        "Ningun producto almacenado";
    listaProductos.forEach(
        function(
            producto,
            indice
        ){
            const fila =
                document.createElement(
                    "tr"
                );
            fila.innerHTML = `
                <td>${producto.nombre}</td>
                <td>
                    ${
                        producto.imagenes &&
                        producto.imagenes.length > 0
                        ?
                        `<img
                            src="${producto.imagenes[0]}"
                            width="50"
                            height="50"
                        >`
                        :
                        "Sin imagen"
                    }
                </td>
                <td>${producto.categoria}</td>
                <td>${producto.tallas.join(", ")}</td>
                <td>${producto.color}</td>
                <td>${producto.marca}</td>
                <td>${producto.precio}</td>
                <td>
                    <i
                        class="fa-solid ${
                            producto.seleccionado
                            ?
                            "fa-check"
                            :
                            "fa-plus"
                        } icono_agregar"
                        data-id="${indice}"
                    ></i>
                    <i
                        class="fa-solid fa-trash icono_eliminar"
                        data-id="${indice}"
                    ></i>
                </td>
            `;
            tbody.appendChild(
                fila
            );
        }
    );
}
//--------------------------------//
//--|cerrar_filtro_click_fuera|--//
//--------------------------------//
document.addEventListener(
    "click",
    function(
        evento
    ){
        if(
            !evento.target.closest(
                ".contenedor_filtro"
            )
        ){
            listaFiltro.classList.remove(
                "activa"
            );
            const icono =
                botonDesplegarFiltro.querySelector(
                    "i"
                );
            icono.classList.remove(
                "fa-chevron-up"
            );
            icono.classList.add(
                "fa-chevron-down"
            );
        }
    }
);
botonBuscarCategoria.addEventListener(
    "click",
    buscarProducto
);
botonAgregarTodo.addEventListener(
    "click",
    agregarTodosProductos
);
botonEliminarTodo.addEventListener(
    "click",
    eliminarTodosProductos
);
campoBuscarCategoria.addEventListener(
    "input",
    buscarProducto
);
//-------------------------------------------//
//--|funcionalidad_formulario_de_categoria|--//
//-------------------------------------------//
(() => {
const campoSelectUbicacion =
    document.querySelector(".campo_select");
const campoDescripcion =
    document.querySelector(".campo_descripcion");
const botonCrearCategoria =
    document.querySelector(".botones-crear-categoria");
function cargarUbicacionesMenu() {
    const ubicaciones =
        JSON.parse(
            localStorage.getItem("ubicaciones_menu")
        ) || [];
    campoSelectUbicacion.innerHTML = `
        <option value="">
            Ninguna ubicacion...
        </option>
    `;
    ubicaciones.forEach(function (opcion) {
        if (opcion.oculto) return;
        const option =
            document.createElement("option");
        option.value = opcion.clave;
        option.textContent = opcion.nombre;
        campoSelectUbicacion.appendChild(option);
    });
}
//--------------------------//
//--|tablero_de_productos|--//
//--------------------------//
function cargarProductosTablero(
    listaProductos = null
){
    const tbody =
        document.querySelector(
            "#tbody_productos"
        );
    const mensajeVacio =
        document.querySelector(
            "#mensaje_vacio"
        );
    let productos =
        listaProductos;
    if(
        productos === null
    ){
        productos =
            JSON.parse(
                localStorage.getItem(
                    "lista_productos_categoria"
                )
            ) || [];
    }
    tbody.innerHTML = "";
    if(
        productos.length === 0
    ){
        mensajeVacio.style.display =
            "flex";
        return;
    }
    mensajeVacio.style.display =
        "none";
    productos.forEach(
        function(
            producto,
            indice
        ){
            const fila =
                document.createElement(
                    "tr"
                );
            fila.innerHTML = `
                <td>
                    ${
                        producto.nombre ||
                        "Sin nombre"
                    }
                </td>
                <td>
                    ${
                        Array.isArray(
                            producto.imagenes
                        ) &&
                        producto.imagenes.length > 0
                        ?
                        `<img
                            src="${producto.imagenes[0]}"
                            width="50"
                            height="50"
                        >`
                        :
                        "Sin imagen"
                    }
                </td>
                <td>
                    ${
                        producto.categoria ||
                        "Sin categoría"
                    }
                </td>
                <td>
                    ${
                        Array.isArray(
                            producto.tallas
                        )   
                        ?
                        producto.tallas.join(
                            ", "
                        )
                        :
                        "Sin talla"
                    }
                </td>
                <td>
                    ${
                        producto.color ||
                        "Sin color"
                    }
                </td>
                <td>
                    ${
                        producto.marca ||
                        "Sin marca"
                    }
                </td>
                <td>
                    ${
                        producto.precio ||
                        "0"
                    }
                </td>
                <td>
                    <i
                        class="fa-solid ${
                            producto.seleccionado
                            ? "fa-check"
                            : "fa-plus"
                        } icono_agregar"
                        data-id="${indice}"
                    ></i>
                    <i
                        class="fa-solid fa-trash icono_eliminar"
                        data-id="${indice}"
                    ></i>
                </td>
            `;
            tbody.appendChild(
                fila
            );
        }
    );
}
if(
    campoSelectUbicacion
){
    campoSelectUbicacion.addEventListener(
        "change",
        () => {
            console.log(
                campoSelectUbicacion.value
            );
        }
    );
}
if(
    campoDescripcion
){
    campoDescripcion.addEventListener(
        "input",
        () => {
            console.log(
                campoDescripcion.value
            );
        }
    );
}
//--------------//
//--|eliminar|--//
//--------------//
document.addEventListener(
    "click",
    function(
        evento
    ){
        if(
            evento.target.classList.contains(
                "icono_eliminar"
            )
        ){
            const indice =
                evento.target.dataset.id;
            let productos =
                JSON.parse(
                    localStorage.getItem(
                        "lista_productos_categoria"
                    )
                ) || [];
            productos.splice(
                indice,
                1
            );
            localStorage.setItem(
                "lista_productos_categoria",
                JSON.stringify(
                    productos
                )
            );
            cargarProductosTablero();
        }
    }
);
//-------------//
//--|agregar|--//
//-------------//
document.addEventListener(
    "click",
    function(
        evento
    ){
        if(
            evento.target.classList.contains(
                "icono_agregar"
            )
        ){
            const indice =
                evento.target.dataset.id;
            let productos =
                JSON.parse(
                    localStorage.getItem(
                        "lista_productos_categoria"
                    )
                ) || [];
            const producto =
                productos[indice];
            producto.seleccionado =
                !producto.seleccionado;
            localStorage.setItem(
                "lista_productos_categoria",
                JSON.stringify(
                    productos
                )
            );
            cargarProductosTablero();
            alert(
                producto.seleccionado
                ?
                "Producto seleccionado: " +
                producto.nombre
                :
                "Producto desmarcado: " +
                producto.nombre
            );
        }
    }
);
//--------------------------//
//--|crear_esta_categoria|--//
//--------------------------//
if (botonCrearCategoria) {
    botonCrearCategoria.addEventListener("click", () => {
        const ubicacion = campoSelectUbicacion.value;
        const descripcion = campoDescripcion.value.trim();
        const productos =
            JSON.parse(localStorage.getItem("lista_productos_categoria")) || [];
        const productosSeleccionados =
            productos.filter(p => p.seleccionado === true);
        const valido =
            ubicacion &&
            ubicacion !== "" &&
            descripcion.length > 0 &&
            productosSeleccionados.length > 0;
        if (valido) {
            const nuevaCategoria = {
                id: Date.now(),
                ubicacion,
                descripcion,
                productos: productosSeleccionados
            };
            let categorias =
                JSON.parse(localStorage.getItem("categorias_creadas")) || [];
            categorias.push(nuevaCategoria);
            localStorage.setItem(
                "categorias_creadas",
                JSON.stringify(categorias)
            );
            campoSelectUbicacion.value = "";
            campoDescripcion.value = "";
            productos.forEach(p => p.seleccionado = false);
            localStorage.setItem(
                "lista_productos_categoria",
                JSON.stringify(productos)
            );
            cargarProductosTablero();
            alert("categoría creada exitosamente");
        } else {
            alert("no se ha creado ninguna categoría");
        }
    });
}
window.addEventListener("DOMContentLoaded", () => {
    cargarUbicacionesMenu();
    cargarProductosTablero();
});
})();
//----------------------------------------------------//
//--|funcionalidad_contador_progresivo_de_categoria|--//
//----------------------------------------------------//
function actualizarContadorCategorias(){
    let categorias =
        JSON.parse(
            localStorage.getItem(
                "categorias_creadas"
            )
        ) || [];
    let totalCategorias =
        categorias.length;
    let elementoTotal =
        document.getElementById(
            "total_categorias"
        );
    if(
        elementoTotal
    ){
        elementoTotal.textContent =
            totalCategorias;
    }
}
window.addEventListener(
    "DOMContentLoaded",
    function(){
        actualizarContadorCategorias();
    }
);
//-----------------------------------------//
//--|funcionalidad_tablero_de_categorias|--//
//-----------------------------------------//
let categorias = [];
function cargarTableroCategorias(){
    let tbody =
        document.getElementById(
            "tbody_tablero_categorias"
        );
    tbody.innerHTML = "";
    let categorias =
        JSON.parse(
            localStorage.getItem(
                "categorias_creadas"
            )
        ) || [];
    if(
        categorias.length === 0
    ){
        tbody.innerHTML =
        `
            <tr class="fila_vacia_tablero_categorias">
                <td colspan="9">
                    Ningun categoria añadida
                </td>
            </tr>
        `;
        actualizarContadorCategorias();
        return;
    }
    categorias.forEach(
        function(
            categoria,
            categoriaIndex
        ){
            categoria.productos.forEach(
                function(producto){
                    let fila =
                    `
                        <tr>
                            <td>
                                ${
                                    producto.imagenes &&
                                    producto.imagenes.length > 0
                                    ?
                                    `
                                    <img
                                        src="${producto.imagenes[0]}"
                                        width="60"
                                        height="60"
                                    >
                                    `
                                    :
                                    "Sin imagen"
                                }
                            </td>
                            <td>
                                ${producto.nombre}
                            </td>
                            <td class="celda_descripcion">
                                ${categoria.descripcion}
                            </td>
                            <td>
                                ${categoria.ubicacion}
                            </td>
                            <td>
                                ${
                                    Array.isArray(
                                        producto.tallas
                                    )
                                    ?
                                    producto.tallas.join(", ")
                                    :
                                    ""
                                }
                            </td>
                            <td>
                                ${producto.color}
                            </td>
                            <td>
                                ${producto.marca}
                            </td>
                            <td>
                                ${producto.precio}
                            </td>
                            <td>
                                <i
                                    class="fa-solid fa-upload icono_publicar"
                                    onclick="publicarCategoria(${categoriaIndex})"
                                    title="Publicar"
                                ></i>
                                <i
                                    class="fa-solid fa-eye icono_vista_previa"
                                    onclick="vistaPreviaCategoria(${categoriaIndex})"
                                    title="Vista previa"
                                ></i>
                                <i
                                    class="fa-solid fa-trash icono_eliminar_categoria"
                                    onclick="eliminarCategoria(${categoria.id})"
                                    title="Eliminar"
                                ></i>
                                <i
                                    class="fa-solid fa-filter icono_agregar_filtro"
                                    onclick="agregarAlFiltro(${categoria.id})"
                                    title="Añadir al filtro"
                                ></i>
                            </td>
                        </tr>
                    `;
                    tbody.innerHTML += fila;
                }
            );
        }
    );
    actualizarContadorCategorias();
}
//------------------------//
//--|publicar_categoria|--//
//------------------------//
function publicarCategoria(
    index
){
    let categorias =
        JSON.parse(
            localStorage.getItem(
                "categorias_creadas"
            )
        ) || [];
    let categoria =
        categorias[index];
    alert(
        'Se ha publicado esta categoría en "' +
        categoria.ubicacion +
        '" correctamente.'
    );
}
//----------------------------//
//--|vista_previa_categoria|--//
//----------------------------//
function vistaPreviaCategoria(
    index
){
    let categorias =
        JSON.parse(
            localStorage.getItem(
                "categorias_creadas"
            )
        ) || [];
    let categoria =
        categorias[index];
    let textoProductos =
        categoria.productos
        .map(
            function(producto){
                return (
                    producto.nombre
                );
            }
        )
        .join(", ");
    alert(
        "UBICACIÓN:\n" +
        categoria.ubicacion +
        "\n\nDESCRIPCIÓN:\n" +
        categoria.descripcion +
        "\n\nPRODUCTOS:\n" +
        textoProductos
    );
}
//------------------------//
//--|eliminar_categoria|--//
//------------------------//
function eliminarCategoria(
    idCategoria
){
    let confirmar =
        confirm(
            "¿Desea eliminar esta categoría?"
        );
    if(
        !confirmar
    ){
        return;
    }
    let categorias =
        JSON.parse(
            localStorage.getItem(
                "categorias_creadas"
            )
        ) || [];
    console.log(
        "Categorias antes:",
        categorias
    );
    console.log(
        "Productos:",
        JSON.parse(
            localStorage.getItem(
                "lista_productos_categoria"
            )
        )
    );
    console.log(
        "Inventario:",
        JSON.parse(
            localStorage.getItem(
                "lista_productos"
            )
        )
    );
    categorias =
        categorias.filter(
            function(categoria){
                return (
                    categoria.id !==
                    idCategoria
                );
            }
        );
    localStorage.setItem(
        "categorias_creadas",
        JSON.stringify(
            categorias
        )
    );
    console.log(
        "Categorias después:",
        JSON.parse(
            localStorage.getItem(
                "categorias_creadas"
            )
        )
    );
    console.log(
        "Productos después:",
        JSON.parse(
            localStorage.getItem(
                "lista_productos_categoria"
            )
        )
    );
    console.log(
        "Inventario después:",
        JSON.parse(
            localStorage.getItem(
                "lista_productos"
            )
        )
    );
    cargarTableroCategorias();
    alert(
        "Categoría eliminada correctamente."
    );
}
cargarTableroCategorias();
//-------------------//
//--|filtrarciones|--//
//-------------------//
function agregarAlFiltro(
    idCategoria
){
    let categorias =
        JSON.parse(
            localStorage.getItem(
                "categorias_creadas"
            )
        ) || [];
    let categoriaSeleccionada =
        categorias.find(
            function(categoria){
                return (
                    categoria.id ===
                    idCategoria
                );
            }
        );
    if(!categoriaSeleccionada){
        alert(
            "Categoría no encontrada."
        );
        return;
    }
    let productosParaFiltros =
        JSON.parse(
            localStorage.getItem(
                "productos_para_filtros"
            )
        ) || [];
    let productosAgregados = 0;
    categoriaSeleccionada.productos.forEach(
        function(producto){
            let existe =
                productosParaFiltros.some(
                    function(item){
                        return (
                            item.producto ===
                            producto.nombre
                            &&
                            item.marca ===
                            producto.marca
                        );
                    }
                );
            if(existe){
                return;
            }
            productosParaFiltros.push({
                imagen:
                    producto.imagenes &&
                    producto.imagenes.length > 0
                    ?
                    producto.imagenes[0]
                    :
                    "",
                producto:
                    producto.nombre,
                descripcion:
                    categoriaSeleccionada.descripcion,
                ubicacion:
                    categoriaSeleccionada.ubicacion,
                talla:
                    Array.isArray(
                        producto.tallas
                    )
                    ?
                    producto.tallas.join(", ")
                    :
                    "",
                color:
                    producto.color,
                marca:
                    producto.marca,
                precio:
                    producto.precio
            });
            productosAgregados++;
        }
    );
    localStorage.setItem(
        "productos_para_filtros",
        JSON.stringify(
            productosParaFiltros
        )
    );
    if(
        productosAgregados > 0
    ){
        alert(
            "Se añadieron " +
            productosAgregados +
            " producto(s) al tablero de filtros."
        );
    }
    else{
        alert(
            "Todos los productos de esta categoría ya se encuentran en el tablero de filtros."
        );
    }
}