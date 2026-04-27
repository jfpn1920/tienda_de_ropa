//------------------------------------------//
//--|funcionalidad_formulario_del_chatbot|--//
//------------------------------------------//
let flujo = {};
let contadorOpciones = 0;
function guardarEnLocalStorage() {
    localStorage.setItem("flujoChatbot", JSON.stringify(flujo));
}
function cargarDesdeLocalStorage() {
    const datos = localStorage.getItem("flujoChatbot");
    if (datos) {
        flujo = JSON.parse(datos);
        mostrarJSON();
        actualizarSelects();
    }
}
function actualizarSelects() {
    const selects = document.querySelectorAll("#opciones-container select");
    selects.forEach(select => {
        const valorActual = select.value;
        select.innerHTML = `
            <option value="">Seleccionar nodo</option>
            ${Object.keys(flujo)
                .map(id => `<option value="${id}">${id}</option>`)
                .join("")}
        `;
        select.value = valorActual;
    });
}
function limpiarTodo() {
    localStorage.removeItem("flujoChatbot");
    flujo = {};
    mostrarJSON();
}
function agregarOpcion() {
    const container = document.getElementById("opciones-container");
    const div = document.createElement("div");
    div.classList.add("opcion");
    const opcionesNodos = Object.keys(flujo)
        .map(id => `<option value="${id}">${id}</option>`)
        .join("");
    div.innerHTML = `
        <input type="text" placeholder="Texto de la opción">
        <select>
            <option value="">Seleccionar nodo</option>
            ${opcionesNodos}
        </select>
    `;
    container.appendChild(div);
}
function guardarNodo() {
    const pregunta = document.getElementById("pregunta").value.trim();
    const idNodo = document.getElementById("idNodo").value.trim();
    if (!idNodo || !pregunta) {
        alert("Debes completar el ID y la pregunta");
        return;
    }
    const opcionesHTML = document.querySelectorAll("#opciones-container .opcion");
    let opciones = [];
    opcionesHTML.forEach(op => {
        const input = op.querySelector("input");
        const select = op.querySelector("select");
        if (input.value && select.value) {
            opciones.push({
                texto: input.value,
                siguiente: select.value
            });
        }
    });
    if (flujo[idNodo]) {
        const confirmar = confirm("Este nodo ya existe. ¿Deseas actualizarlo?");
        if (!confirmar) return;
    }
    flujo[idNodo] = {
        texto: pregunta,
        opciones: opciones
    };
    guardarEnLocalStorage();
    actualizarSelects();
    mostrarJSON();
    limpiarFormulario();
}
function limpiarFormulario() {
    document.getElementById("pregunta").value = "";
    document.getElementById("idNodo").value = "";
    const inputs = document.querySelectorAll("#opciones-container input");
    const selects = document.querySelectorAll("#opciones-container select");
    inputs.forEach(input => input.value = "");
    selects.forEach(select => select.value = "");
}
/*----------------------------------------------*/
/*--|funcionalidad_flujo_generado_del_chatbot|--*/
/*----------------------------------------------*/
function mostrarJSON() {
    document.getElementById("resultado").textContent =
        JSON.stringify(flujo, null, 2);
}
function crearChatbot() {
    if (Object.keys(flujo).length === 0) {
        alert("No hay datos en el chatbot");
        return;
    }

    // 🔥 guardar flujo final
    localStorage.setItem("chatbotFinal", JSON.stringify(flujo));

    // ✅ solo confirmar
    alert("Chatbot creado y guardado correctamente");
}
window.onload = function () {
    cargarDesdeLocalStorage();
};