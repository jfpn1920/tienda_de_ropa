//--------------------------------------//
//--|funcionalidad_menu_de_navegacion|--//
//--------------------------------------//
const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");
const contents = document.querySelectorAll(
    ".main-content-21, .main-content-22, .main-content-23, .main-content-24, .main-content-25, .main-content-26, .main-content-27, .main-content-28, .contenedor-deplegable-4, .contenedor_cards_observacion_de_inventario_parte_2, .contenedor_productos_en_inventario_parte_2, .depliegue_tablero_de_inventario_parte_2, .contenedor_anuncio_importante_parte_2"
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
//-------------------------------------------//
//--|funcionalidad_formulario_de_categoria|--//
//-------------------------------------------//
(() => {
//---------------------------//
//--|seleccionar_ubicacion|--//
//---------------------------//
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
function cargarProductosTablero() {
    const tbody =
        document.querySelector("#tbody_productos");
    const mensajeVacio =
        document.querySelector("#mensaje_vacio");
    const productos =
        JSON.parse(
            localStorage.getItem("lista_productos_categoria")
        ) || [];
    tbody.innerHTML = "";
    if (productos.length === 0) {
        mensajeVacio.style.display = "flex";
        return;
    }
    mensajeVacio.style.display = "none";
    productos.forEach(function (producto, indice) {
        const fila =
            document.createElement("tr");
        fila.innerHTML = `
            <td>${producto.nombre}</td>
            <td>
                ${
                    producto.imagenes && producto.imagenes.length > 0
                    ? `<img src="${producto.imagenes[0]}" width="50" height="50">`
                    : "Sin imagen"
                }
            </td>
            <td>${producto.categoria}</td>
            <td>${producto.tallas.join(", ")}</td>
            <td>${producto.color}</td>
            <td>${producto.marca}</td>
            <td>${producto.precio}</td>
            <td>
                <i class="fa-solid ${
                    producto.seleccionado ? "fa-check" : "fa-plus"
                } icono_agregar" data-id="${indice}"></i>
                <i class="fa-solid fa-trash icono_eliminar"
                    data-id="${indice}"></i>
            </td>
        `;
        tbody.appendChild(fila);
    });
}
if (campoSelectUbicacion) {
    campoSelectUbicacion.addEventListener("change", () => {
        console.log(campoSelectUbicacion.value);
    });
}
if (campoDescripcion) {
    campoDescripcion.addEventListener("input", () => {
        console.log(campoDescripcion.value);
    });
}
//--------------//
//--|eliminar|--//
//--------------//
document.addEventListener("click", function (evento) {
    if (evento.target.classList.contains("icono_eliminar")) {
        const indice = evento.target.dataset.id;
        let productos =
            JSON.parse(localStorage.getItem("lista_productos_categoria")) || [];
        productos.splice(indice, 1);
        localStorage.setItem("lista_productos_categoria", JSON.stringify(productos));
        cargarProductosTablero();
    }
});
//-------------//
//--|agregar|--//
//-------------//
document.addEventListener("click", function (evento) {
    if (evento.target.classList.contains("icono_agregar")) {
        const indice = evento.target.dataset.id;
        let productos =
            JSON.parse(localStorage.getItem("lista_productos_categoria")) || [];
        const producto = productos[indice];
        producto.seleccionado = !producto.seleccionado;
        localStorage.setItem("lista_productos_categoria", JSON.stringify(productos));
        cargarProductosTablero();
        alert(
            producto.seleccionado
                ? "Producto seleccionado: " + producto.nombre
                : "Producto desmarcado: " + producto.nombre
        );
    }
});
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