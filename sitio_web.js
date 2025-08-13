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
    const icono = document.getElementById("iconoSitio").value;
    let sitios = JSON.parse(localStorage.getItem("sitiosWeb")) || [];
    sitios.push({ nombre, pagina, icono });
    localStorage.setItem("sitiosWeb", JSON.stringify(sitios));
    mostrarSitios();
    this.reset();
});
function mostrarSitios() {
    const lista = document.getElementById("listaSitios");
    lista.innerHTML = "";
    let sitios = JSON.parse(localStorage.getItem("sitiosWeb")) || [];
    sitios.forEach(sitio => {
        let tarjeta = document.createElement("div");
        tarjeta.classList.add("tarjeta-sitio");
        tarjeta.innerHTML = `
            <div class="tarjeta-header">
                <span class="numero">1</span>
                <span class="nombre"><i class="${sitio.icono}"></i> ${sitio.nombre}</span>
                <span class="numero">2</span>
            </div>
            <div class="tarjeta-contenido"></div>
            <div class="tarjeta-footer">
                <button class="btn-ver">ver sitio web</button>
            </div>
        `;
        lista.appendChild(tarjeta);
    });
}
document.addEventListener("DOMContentLoaded", mostrarSitios);
//------------------------------------------------//
//--|funcionalidad_barra_de_busqueda_categorias|--//
//------------------------------------------------//