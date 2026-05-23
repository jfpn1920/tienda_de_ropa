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
//--------------------------------------//
//--|funcionalidad_tablero_inventario|--//
//--------------------------------------//
const tbody_tablero_inventario =
    document.getElementById("tbody_tablero_de_inventario");
const fila_vacia_tablero_inventario =
    document.getElementById("fila_vacia_tablero_inventario");
const CLAVE_PRODUCTOS =
    "lista_productos";
function mostrarInventario() {
    const productos =
        JSON.parse(localStorage.getItem(CLAVE_PRODUCTOS)) || [];
    const productosInventario =
        productos
            .map((p, i) => ({ ...p, _index: i }))
            .filter(p => p.en_inventario === true);
    tbody_tablero_inventario.innerHTML = "";
    if (productosInventario.length === 0) {
        fila_vacia_tablero_inventario.style.display = "table-row";
        return;
    }
    fila_vacia_tablero_inventario.style.display = "none";
    productosInventario.forEach(function (producto, index) {
        const fila = document.createElement("tr");
        fila.classList.add("fila_tablero_inventario");
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
            <td>${producto.tallas?.join(", ") || ""}</td>
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
        tbody_tablero_inventario.appendChild(fila);
    });
}
document.addEventListener("click", function (evento) {
    const botonVer =
        evento.target.closest(".ver");
    if (!botonVer) return;
    const index =
        botonVer.dataset.index;
    const productos =
        JSON.parse(localStorage.getItem(CLAVE_PRODUCTOS)) || [];
    const producto =
        productos[index];
    alert("Vista previa de producto");
});
document.addEventListener("click", function (evento) {
    const botonEliminar =
        evento.target.closest(".eliminar");
    if (!botonEliminar) return;
    const index =
        botonEliminar.dataset.index;
    const productos =
        JSON.parse(localStorage.getItem(CLAVE_PRODUCTOS)) || [];
    const producto =
        productos[index];
    const confirmar =
        confirm("El producto será eliminado del inventario.");
    if (!confirmar) {
        return;
    }
    producto.en_inventario = false;
    localStorage.setItem(
        CLAVE_PRODUCTOS,
        JSON.stringify(productos)
    );
    mostrarInventario();
    alert("El producto fue eliminado del inventario.");
});
window.addEventListener("DOMContentLoaded", mostrarInventario);