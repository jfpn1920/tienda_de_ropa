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
//--------------------//
//--|funcionalidad_|--//
//--------------------//