//--------------------------------------//
//--|funcionalidad_menu_de_navegacion|--//
//--------------------------------------//
const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");
const contents = document.querySelectorAll(
    ".main-content-8, .main-content-9, .main-content-10, .main-content-11, .main-content-12, .main-content-13, .main-content-14, .contenido-container5, .toolbar5"
);
menuToggle.addEventListener("click", () => {
    sidebar.classList.toggle("active");
    contents.forEach(content => {
        content.classList.toggle("active");
    });
});
//------------------------------------------//
//--|funcionalidad_fomulario_de_productos|--//
//------------------------------------------//
