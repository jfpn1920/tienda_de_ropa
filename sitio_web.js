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
            sitios.push({ 
                nombre, 
                pagina, 
                icono, 
                fecha: Date.now() 
            });
            localStorage.setItem("sitiosWeb", JSON.stringify(sitios));
            mostrarSitios();
            this.reset();
        });
    }
    function mostrarSitios(filtroTexto = "", sitiosFiltrados = null) {
        const lista = document.getElementById("listaSitios");
        if (!lista) return;
        lista.innerHTML = "";
        let sitios = sitiosFiltrados || JSON.parse(localStorage.getItem("sitiosWeb")) || [];
        sitios = sitios.filter(sitio => 
            sitio.nombre.toLowerCase().includes(filtroTexto.toLowerCase())
        );
        sitios.forEach((sitio, index) => {
            let tarjeta = document.createElement("div");
            tarjeta.classList.add("tarjeta-sitio");
            tarjeta.innerHTML = `
                <div class="tarjeta-header">
                    <span class="icono"><i class="${sitio.icono}"></i></span>
                    <span class="nombre">${sitio.nombre}</span>
                    <span class="numero">${index + 1}</span>
                </div>
                <div class="tarjeta-contenido"></div>
                <div class="tarjeta-footer"></div>
            `;
            const btnVer = document.createElement("button");
            btnVer.textContent = "Ver sitio web";
            btnVer.classList.add("btn-ver");
            btnVer.addEventListener("click", function () {
                const nombre = encodeURIComponent(sitio.nombre);
                const pagina = encodeURIComponent(sitio.pagina);
                const icono = encodeURIComponent(sitio.icono);
                const url = `pagina_web_dinamico.html?nombre=${nombre}&pagina=${pagina}&icono=${icono}`;
                window.open(url, "_blank"); // 👈 abre en nueva pestaña
            });
            tarjeta.querySelector(".tarjeta-footer").appendChild(btnVer);
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
    //----------------------------//
    //--|funcionalidad_opciones|--//
    //----------------------------//
    const filtroSelect = document.getElementById("filtro");
    if (filtroSelect) {
        filtroSelect.addEventListener("change", function () {
            aplicarFiltro(this.value);
        });
    }
    function aplicarFiltro(tipo) {
        let sitios = JSON.parse(localStorage.getItem("sitiosWeb")) || [];
        switch (tipo) {
            case "alfabetico":
                sitios.sort((a, b) => a.nombre.localeCompare(b.nombre));
                break;
            case "iconos":
                sitios.sort((a, b) => a.icono.localeCompare(b.icono));
                break;
            case "recientes":
                sitios.sort((a, b) => b.fecha - a.fecha);
                break;
            case "antiguos":
                sitios.sort((a, b) => a.fecha - b.fecha);
                break;
        }
        mostrarSitios("", sitios);
    }
    const btnEliminarTodo = document.getElementById("eliminarTodo");
    if (btnEliminarTodo) {
        btnEliminarTodo.addEventListener("click", function() {
            if (confirm("¿Seguro que quieres eliminar todos los sitios?")) {
                localStorage.removeItem("sitiosWeb");
                mostrarSitios();
            }
        });
    }
    mostrarSitios();
});