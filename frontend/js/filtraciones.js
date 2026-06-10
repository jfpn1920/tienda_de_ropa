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
