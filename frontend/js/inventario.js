//--------------------------------------//
//--|funcionalidad_menu_de_navegacion|--//
//--------------------------------------//
const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");
const contents = document.querySelectorAll(
    ".main-content-15, .main-content-16, .main-content-17, .main-content-18, .main-content-19, .main-content-20, .boton-desplegar, .contenedor-desplegante-2, .desplegable-2, .desplegable-3"
);
menuToggle.addEventListener("click", () => {
    sidebar.classList.toggle("active");
    contents.forEach(content => {
        content.classList.toggle("active");
    });
});
//---------------------------------------------//
//--|funcionalidad_observacion_de_inventario|--//
//---------------------------------------------//
const botonesVerProductos =
    document.querySelectorAll(
        ".boton_ver_productos"
    );
const modalRentables =
    document.getElementById(
        "modalRentables"
    );
const modalDevoluciones =
    document.getElementById(
        "modalDevoluciones"
    );
const modalBotados =
    document.getElementById(
        "modalBotados"
    );
const modalPedidos =
    document.getElementById(
        "modalPedidos"
    );
const modales = [
    modalRentables,
    modalDevoluciones,
    modalBotados,
    modalPedidos
];
function cerrarTodosLosModales(){
    modales.forEach(modal => {
        modal.style.display = "none";
    });
}
function abrirModal(tipoModal){
    cerrarTodosLosModales();
    if(tipoModal === "rentables"){
        modalRentables.style.display = "flex";
    }
    if(tipoModal === "devoluciones"){
        modalDevoluciones.style.display = "flex";
    }
    if(tipoModal === "botados"){
        modalBotados.style.display = "flex";
    }
    if(tipoModal === "pedidos"){
        modalPedidos.style.display = "flex";
    }
}
botonesVerProductos.forEach(boton => {
    boton.addEventListener("click", () => {
        const tipoModal =
            boton.dataset.modal;
        abrirModal(tipoModal);
    });
});
const botonesCerrarModal =
    document.querySelectorAll(
        ".cerrar_modal_productos_mas_rentables, \
        .cerrar_modal_productos_con_mas_devoluciones, \
        .cerrar_modal_productos_mas_botados, \
        .cerrar_modal_productos_mas_pedidos"
    );
botonesCerrarModal.forEach(boton => {
    boton.addEventListener("click", () => {
        cerrarTodosLosModales();
    });
});
window.addEventListener("click", (e) => {
    modales.forEach(modal => {
        if(e.target === modal){
            modal.style.display = "none";
        }
    });
});
//-------------------------------------------//
//--|funcionalidad_productos_en_inventario|--//
//-------------------------------------------//
const inputBuscadorProductosEnInventario =
    document.querySelector(
        ".input_buscador_productos_en_inventario"
    );
const botonBuscadorProductosEnInventario =
    document.querySelector(
        ".boton_buscador_productos_en_inventario"
    );
const selectFiltroProductosEnInventario =
    document.querySelector(
        ".select_filtro_productos_en_inventario"
    );
let textoBusquedaInventario = "";
let filtroInventario =
    "Filtrar Inventario";
function ejecutarBusquedaInventario() {
    textoBusquedaInventario =
        inputBuscadorProductosEnInventario.value
            .toLowerCase()
            .trim();
    mostrarInventario();
}
inputBuscadorProductosEnInventario.addEventListener(
    "input",
    function () {
        ejecutarBusquedaInventario();
    }
);
botonBuscadorProductosEnInventario.addEventListener(
    "click",
    function () {
        ejecutarBusquedaInventario();
    }
);
selectFiltroProductosEnInventario.addEventListener(
    "change",
    function () {
        filtroInventario =
            selectFiltroProductosEnInventario.value;
        mostrarInventario();
    }
);
//--------------------------------------//
//--|funcionalidad_tablero_inventario|--//
//--------------------------------------//
const tbody_tablero_inventario =
    document.getElementById(
        "tbody_tablero_de_inventario"
    );
const fila_vacia_tablero_inventario =
    document.getElementById(
        "fila_vacia_tablero_inventario"
    );
const CLAVE_PRODUCTOS =
    "lista_productos";
function mostrarInventario() {
    const productos =
        JSON.parse(
            localStorage.getItem(CLAVE_PRODUCTOS)
        ) || [];
    let productosInventario =
        productos
            .map((p, i) => ({
                ...p,
                _index: i
            }))
            .filter(
                p => p.en_inventario === true
            );
    if (textoBusquedaInventario !== "") {
        productosInventario =
            productosInventario.filter(
                function (producto) {
                    const nombre =
                        producto.nombre
                            ?.toLowerCase() || "";
                    const sku =
                        producto.sku
                            ?.toLowerCase() || "";
                    const marca =
                        producto.marca
                            ?.toLowerCase() || "";
                    const categoria =
                        producto.categoria
                            ?.toLowerCase() || "";
                    return (
                        nombre.includes(
                            textoBusquedaInventario
                        ) ||
                        sku.includes(
                            textoBusquedaInventario
                        ) ||
                        marca.includes(
                            textoBusquedaInventario
                        ) ||
                        categoria.includes(
                            textoBusquedaInventario
                        )
                    );
                }
            );
    }
    switch (filtroInventario.trim()) {
        case "Productos disponible":
            productosInventario =
                productosInventario.filter(
                    function (producto) {
                        const stock =
                            parseInt(producto.stock) || 0;
                        return stock > 0;
                    }
                );
        break;
        case "Productos agotados":
            productosInventario =
                productosInventario.filter(
                    function (producto) {
                        const stock =
                            parseInt(producto.stock) || 0;
                        return stock <= 0;
                    }
                );
        break;
        case "Productos ocultos":
            productosInventario =
                productosInventario.filter(
                    function (producto) {
                        const estado =
                            producto.estado
                                ?.toString()
                                .toLowerCase()
                                .trim() || "";
                        return (
                            estado === "oculto"
                        );
                    }
                );
        break;
        case "Ordenarlo alfabeticamente":
            productosInventario.sort(
                function (a, b) {
                    const nombreA =
                        a.nombre
                            ?.toLowerCase()
                            .trim() || "";
                    const nombreB =
                        b.nombre
                            ?.toLowerCase()
                            .trim() || "";
                    return nombreA.localeCompare(
                        nombreB
                    );
                }
            );
        break;
        case "Mayor precio":
            productosInventario.sort(
                function (a, b) {
                    const precioA =
                        parseFloat(a.precio) || 0;
                    const precioB =
                        parseFloat(b.precio) || 0;
                    return precioB - precioA;
                }
            );
        break;
        case "Menor precio":
            productosInventario.sort(
                function (a, b) {
                    const precioA =
                        parseFloat(a.precio) || 0;
                    const precioB =
                        parseFloat(b.precio) || 0;
                    return precioA - precioB;
                }
            );
        break;
    }
    tbody_tablero_inventario.innerHTML =
        "";
    if (
        productosInventario.length === 0
    ) {
        fila_vacia_tablero_inventario.style.display =
            "table-row";
        tbody_tablero_inventario.appendChild(
            fila_vacia_tablero_inventario
        );
        return;
    }
    fila_vacia_tablero_inventario.style.display =
        "none";
    productosInventario.forEach(
        function (producto) {
            const fila =
                document.createElement("tr");
            fila.classList.add(
                "fila_tablero_inventario"
            );
            fila.innerHTML = `
                <td>${producto.nombre || ""}</td>
                <td>
                    <div class="contenedor_imagenes_inventario">
                        ${
                            (producto.imagenes || [])
                                .map(function (imagen) {
                                    return `
                                        <img
                                            src="${imagen}"
                                            class="imagen_inventario"
                                        >
                                    `;
                                })
                                .join("")
                        }
                    </div>
                </td>
                <td>${producto.sku || ""}</td>
                <td>${producto.stock || 0}</td>
                <td>${producto.estado || ""}</td>
                <td>
                    ${producto.tallas?.join(", ") || ""}
                </td>
                <td>${producto.categoria || ""}</td>
                <td>${producto.precio || 0}</td>
                <td>${producto.marca || ""}</td>
                <td>
                    <button
                        class="boton_inventario ver"
                        data-index="${producto._index}"
                        title="Vista previa"
                    >
                        <i class="fa-solid fa-eye"></i>
                    </button>
                    <button
                        class="boton_inventario eliminar"
                        data-index="${producto._index}"
                        title="Eliminar producto"
                    >
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
            `;
            tbody_tablero_inventario.appendChild(
                fila
            );
        }
    );
}
window.addEventListener(
    "DOMContentLoaded",
    mostrarInventario
);
//----------------------------------------------//
//--|funcionalidad_ventana_emergente_detalles|--//
//----------------------------------------------//
const overlayVentanaEmergenteDetalles =
    document.getElementById(
        "overlayVentanaEmergenteDetalles"
    );
const botonCerrarVentanaEmergenteDetalles =
    document.getElementById(
        "botonCerrarVentanaEmergenteDetalles"
    );
const imagenPrincipalVentanaEmergenteDetalles =
    document.getElementById(
        "imagenPrincipalVentanaEmergenteDetalles"
    );
const miniaturasVentanaEmergenteDetalles =
    document.getElementById(
        "miniaturasVentanaEmergenteDetalles"
    );
const detalleNombreProducto =
    document.getElementById(
        "detalleNombreProducto"
    );
const detalleSkuProducto =
    document.getElementById(
        "detalleSkuProducto"
    );
const detalleCodigoBarraProducto =
    document.getElementById(
        "detalleCodigoBarraProducto"
    );
const detalleCategoriaProducto =
    document.getElementById(
        "detalleCategoriaProducto"
    );
const detalleMarcaProducto =
    document.getElementById(
        "detalleMarcaProducto"
    );
const detalleDescuentoProducto =
    document.getElementById(
        "detalleDescuentoProducto"
    );
const detalleStockProducto =
    document.getElementById(
        "detalleStockProducto"
    );
const detalleStockMinimoProducto =
    document.getElementById(
        "detalleStockMinimoProducto"
    );
const detalleEstadoProducto =
    document.getElementById(
        "detalleEstadoProducto"
    );
const detalleColorProducto =
    document.getElementById(
        "detalleColorProducto"
    );
const detalleTallasProducto =
    document.getElementById(
        "detalleTallasProducto"
    );
document.addEventListener(
    "click",
    function (evento) {
        const botonVista =
            evento.target.closest(".ver");
        if (!botonVista) {
            return;
        }
        const index =
            botonVista.dataset.index;
        const productos =
            JSON.parse(
                localStorage.getItem(
                    CLAVE_PRODUCTOS
                )
            ) || [];
        const producto =
            productos[index];
        overlayVentanaEmergenteDetalles.style.display =
            "flex";
        detalleNombreProducto.textContent =
            producto.nombre || "";
        detalleSkuProducto.textContent =
            producto.sku || "";
        detalleCategoriaProducto.textContent =
            producto.categoria || "";
        detalleMarcaProducto.textContent =
            producto.marca || "";
        detalleDescuentoProducto.textContent =
            producto.descuento || "";
        detalleStockProducto.textContent =
            producto.stock || "";
        detalleStockMinimoProducto.textContent =
            producto.stock_minimo || "";
        detalleEstadoProducto.textContent =
            producto.estado || "";
        detalleColorProducto.textContent =
            producto.color || "";
        detalleTallasProducto.textContent =
            producto.tallas?.join(", ") || "";
        detalleCodigoBarraProducto.src =
            "https://barcodeapi.org/api/128/" +
            producto.codigo_barras;
        miniaturasVentanaEmergenteDetalles.innerHTML =
            "";
        if (
            producto.imagenes &&
            producto.imagenes.length > 0
        ) {
            imagenPrincipalVentanaEmergenteDetalles.src =
                producto.imagenes[0];
            producto.imagenes.forEach(
                function (imagen) {
                    const img =
                        document.createElement(
                            "img"
                        );
                    img.src = imagen;
                    img.addEventListener(
                        "click",
                        function () {
                            imagenPrincipalVentanaEmergenteDetalles.src =
                                imagen;
                        }
                    );
                    miniaturasVentanaEmergenteDetalles.appendChild(
                        img
                    );
                }
            );
        }
    }
);
botonCerrarVentanaEmergenteDetalles.addEventListener(
    "click",
    function () {
        overlayVentanaEmergenteDetalles.style.display =
            "none";
    }
);