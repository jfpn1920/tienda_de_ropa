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