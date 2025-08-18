//--------------------------------------//
//--|funcionalidad_obtener_parametros|--//
//--------------------------------------//
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}
const nombre = getQueryParam("nombre");
const pagina = getQueryParam("pagina");
const icono = getQueryParam("icono");
document.getElementById("paginaPrincipal").textContent = pagina || "No definida";
if (nombre) {
    document.title = nombre + "";
}
//-----------------------------------------------//
//--|funcionalidad_menu_de_navegacion_dinamico|--//
//-----------------------------------------------//
document.addEventListener("DOMContentLoaded", () => {
    const paginasGuardadas = JSON.parse(localStorage.getItem("paginas")) || [];
    const tablaIndices = JSON.parse(localStorage.getItem("tablaPaginas")) || [];
    const imagenGuardada = localStorage.getItem("imagenTabla") || "";
    const submenuGuardadoRaw = localStorage.getItem("submenuTabla");
    if (imagenGuardada) {
        const logoImg = document.querySelector("#imagendinamico img");
        if (logoImg) {
            logoImg.src = imagenGuardada;
        }
    }
    let opcionesHTML = "";
    tablaIndices.forEach(rawIdx => {
        const index = parseInt(rawIdx);
        const pagina = paginasGuardadas[index];
        if (!pagina) return;
        opcionesHTML += `<li><a href="#">${pagina.titulo}</a></li>`;
    });
    const opcionesNav = document.getElementById("opcionesdinamico");
    if (opcionesNav) {
        opcionesNav.innerHTML = opcionesHTML;
    }
    if (submenuGuardadoRaw) {
        const submenuData = JSON.parse(submenuGuardadoRaw);
        let submenuHTML = "";
        submenuData.subpaginas.forEach(op => {
            submenuHTML += `<li><a href="#">${op}</a></li>`;
        });
        opcionesNav.innerHTML += `
            <li>
                <a href="#">${submenuData.principal} ▾</a>
                <ul id="submenudinamico" class="submenu">
                    ${submenuHTML}
                </ul>
            </li>
        `;
    }
});