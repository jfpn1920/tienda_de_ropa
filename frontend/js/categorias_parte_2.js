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
//--------------------//
//--|funcionalidad_|--//
//--------------------//
