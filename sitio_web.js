//------------------------------------//
//--|funcionalidad_menu_hamburguesa|--//
//------------------------------------//
const toggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');
toggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});
//-----------------------------------//
//--|funcionalidad_crear_sitio_web|--//
//-----------------------------------//
document.getElementById("formSitioWeb").addEventListener("submit", function(e) {
    e.preventDefault();
    const nombre = document.getElementById("nombreSitio").value.trim();
    const pagina = document.getElementById("paginaPrincipal").value;
    const descripcion = document.getElementById("descripcionSitio").value.trim();
    const sesion = document.getElementById("sesionSitio").value;
    let sitios = JSON.parse(localStorage.getItem("sitiosWeb")) || [];
    sitios.push({ nombre, pagina, descripcion, sesion });
    localStorage.setItem("sitiosWeb", JSON.stringify(sitios));
    mostrarSitios();
    this.reset();
});
function mostrarSitios() {
    const lista = document.getElementById("listaSitios");
    lista.innerHTML = "";
    let sitios = JSON.parse(localStorage.getItem("sitiosWeb")) || [];
    sitios.forEach(sitio => {
        let li = document.createElement("li");
        li.textContent = `${sitio.nombre} → Página: ${sitio.pagina}, Sesión: ${sitio.sesion}`;
        lista.appendChild(li);
    });
}
document.addEventListener("DOMContentLoaded", mostrarSitios);