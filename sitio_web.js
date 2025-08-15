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
document.addEventListener("DOMContentLoaded", function () {
    const formSitioWeb = document.getElementById("formSitioWeb");
    if (formSitioWeb) {
        formSitioWeb.addEventListener("submit", function(e) {
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
    }
    function mostrarSitios(filtro = "") {
        const lista = document.getElementById("listaSitios");
        if (!lista) return;
        lista.innerHTML = "";
        let sitios = JSON.parse(localStorage.getItem("sitiosWeb")) || [];
        sitios
            .filter(sitio => sitio.nombre.toLowerCase().includes(filtro.toLowerCase()))
            .forEach(sitio => {
                let tarjeta = document.createElement("div");
                tarjeta.classList.add("tarjeta-sitio");
                tarjeta.innerHTML = `
                    <div class="tarjeta-header">
                        <span class="icono"><i class="${sitio.icono}"></i></span>
                        <span class="nombre">${sitio.nombre}</span>
                        <span class="numero">2</span>
                    </div>
                    <div class="tarjeta-contenido"></div>
                    <div class="tarjeta-footer">
                        <button class="btn-ver">ver sitio web</button>
                    </div>
                `;
                lista.appendChild(tarjeta);
            });
        if (lista.innerHTML === "") {
            lista.innerHTML = "<p>No se encontraron sitios</p>";
        }
    }
    const selectPagina = document.getElementById("paginaPrincipal");
    if (selectPagina) {
        let paginas = JSON.parse(localStorage.getItem("paginasGuardadas")) || [];
        paginas.forEach(pagina => {
            const option = document.createElement("option");
            option.value = pagina.toLowerCase().replace(/\s+/g, "_");
            option.textContent = pagina;
            selectPagina.appendChild(option);
        });
    }
    mostrarSitios();
    //--------------------------------------//
    //--|funcionalidad_busqueda_categoria|--//
    //--------------------------------------//
    const busquedaCategoria = document.getElementById("busquedaCategoria");
    if (busquedaCategoria) {
        busquedaCategoria.addEventListener("input", function() {
            const texto = this.value.trim();
            mostrarSitios(texto);
        });
    }
});
//----------------------------//
//--|funcionalidad_opciones|--//
//----------------------------//