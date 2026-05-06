//--------------------------------------//
//--|funcionalidad_menu_de_navegacion|--//
//--------------------------------------//
const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");
const contents = document.querySelectorAll(
    ".main-content-8, .main-content-9, .main-content-10, .main-content-11, .main-content-12, .main-content-13, .main-content-14"
);
menuToggle.addEventListener("click", () => {
    sidebar.classList.toggle("active");
    contents.forEach(content => {
        content.classList.toggle("active");
    });
});
//----------------------------------------//
//--|funcionalidad_formulario_de_tienda|--//
//----------------------------------------//
const uploadBox = document.getElementById("uploadBox");
const inputFile = document.getElementById("imagen");
const preview = document.getElementById("preview");
const placeholder = document.getElementById("placeholder");
let tiendas = JSON.parse(localStorage.getItem("tiendas")) || [];
const lista = document.getElementById("contenedor-sitios");
document.getElementById("nombre").addEventListener("input", guardarFormulario);
document.getElementById("pestanas").addEventListener("change", guardarFormulario);
uploadBox.addEventListener("click", () => {
    inputFile.click();
});
inputFile.addEventListener("change", () => {
    const file = inputFile.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.src = e.target.result;
            preview.style.display = "block";
            placeholder.style.display = "none";
            guardarFormulario();
        };
        reader.readAsDataURL(file);
    }
});
function guardarFormulario() {
    const datosFormulario = {
        nombre: document.getElementById("nombre").value,
        pestanas: document.getElementById("pestanas").value,
        imagen: preview.style.display === "block" ? preview.src : ""
    };
    localStorage.setItem("formularioTienda", JSON.stringify(datosFormulario));
}
function cargarFormulario() {
    const datos = JSON.parse(localStorage.getItem("formularioTienda"));
    if (!datos) return;
    document.getElementById("nombre").value = datos.nombre || "";
    document.getElementById("pestanas").value = datos.pestanas || "0";
    if (datos.imagen) {
        preview.src = datos.imagen;
        preview.style.display = "block";
        placeholder.style.display = "none";
    }
}
document.getElementById("crear").addEventListener("click", () => {
    const nombre = document.getElementById("nombre").value.trim();
    const pestanas = document.getElementById("pestanas").value;
    const imagen = preview.style.display === "block" ? preview.src : "";
    if (nombre === "" || pestanas === "0") {
        alert("Completa todos los campos para crear la tienda.");
        return;
    }
    const nuevaTienda = {
        id: Date.now(),
        nombre,
        pestanas,
        imagen
    };
    tiendas.push(nuevaTienda);
    localStorage.setItem("tiendas", JSON.stringify(tiendas));
    alert(`Has creado la tienda "${nombre}" con éxito.`);
    document.getElementById("nombre").value = "";
    document.getElementById("pestanas").value = "0";
    preview.style.display = "none";
    placeholder.style.display = "block";
    localStorage.removeItem("formularioTienda");
    renderTiendas();
});
function renderTiendas() {
    if (!lista) return;
    lista.innerHTML = "";
    tiendas.forEach(tienda => {
        const card = document.createElement("div");
        card.classList.add("tarjeta-sitio");
        card.innerHTML = `
            <div class="header-sitio">
                ${tienda.nombre}
            </div>
            <div class="imagen-sitio">
                ${tienda.imagen ? `<img src="${tienda.imagen}">` : "Sin imagen"}
            </div>
            <div class="acciones-sitio">
                <button class="eliminar" onclick="eliminarTienda(${tienda.id})">Eliminar</button>
                <button class="ver" onclick="window.open('tienda_de_ropa.html?id=${tienda.id}', '_blank')">Ver sitio web</button>
                <button class="editar" onclick="editarTienda(${tienda.id})">Editar</button>
            </div>
        `;
        lista.appendChild(card);
    });
}
function eliminarTienda(id) {
    tiendas = tiendas.filter(t => t.id !== id);
    localStorage.setItem("tiendas", JSON.stringify(tiendas));
    renderTiendas();
}
function verTienda(id) {
    const tienda = tiendas.find(t => t.id === id);
    alert("Viendo: " + tienda.nombre);
}
function editarTienda(id) {
    const tienda = tiendas.find(t => t.id === id);
    alert("Editar: " + tienda.nombre);
}
document.addEventListener("DOMContentLoaded", () => {
    renderTiendas();
    cargarFormulario();
});
//----------------------------------------------------//
//--|funcionalidad_formulario_de_menu_de_navegacion|--//
//----------------------------------------------------//
let imagenBase64 = "";
const uploadBoxMenu2 = document.getElementById("uploadBoxMenu2");
const inputMenu2 = document.getElementById("imagenMenu2");
const previewMenu2 = document.getElementById("previewMenu2");
const placeholderMenu2 = document.getElementById("placeholderMenu2");
uploadBoxMenu2.addEventListener("click", () => inputMenu2.click());
inputMenu2.addEventListener("change", () => {
    const file = inputMenu2.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            imagenBase64 = e.target.result;
            previewMenu2.src = imagenBase64;
            previewMenu2.style.display = "block";
            placeholderMenu2.style.display = "none";
            guardarAutomatico(); 
        };
        reader.readAsDataURL(file);
    }
});
const btnAdd2 = document.getElementById("addOption2");
const inputOption2 = document.getElementById("opcionInput2");
const lista2 = document.getElementById("listaOpciones2");
let opciones2 = [];
document.getElementById("nombreMenu2").addEventListener("input", guardarAutomatico);
["busqueda2", "perfil2", "notificaciones2", "carrito2"].forEach(id => {
    document.getElementById(id).addEventListener("change", guardarAutomatico);
});
btnAdd2.addEventListener("click", () => {
    const valor = inputOption2.value.trim();
    if (!valor) return;
    opciones2.push({
        nombre: valor,
        clave: valor.toLowerCase(),
        contenido: `
            <section class="vista">
                <h1>${valor}</h1>
                <p>Contenido dinámico de ${valor}</p>
            </section>
        `
    });
    inputOption2.value = "";
    renderLista2();
    guardarAutomatico();
});
function renderLista2() {
    lista2.innerHTML = "";
    if (opciones2.length === 0) {
        lista2.innerHTML = `<p class="empty2">Ninguna opcion</p>`;
        return;
    }
    opciones2.forEach((op, index) => {
        const div = document.createElement("div");
        div.classList.add("item2");
        div.innerHTML = `
            <span>${op.nombre}</span>
            <button onclick="eliminar2(${index})" class="eliminar">x</button>
        `;
        lista2.appendChild(div);
    });
}
function eliminar2(index) {
    opciones2.splice(index, 1);
    renderLista2();
    guardarAutomatico();
}
function guardarAutomatico() {
    const nombre = document.getElementById("nombreMenu2").value;
    const menuData = {
        nombre,
        opciones: opciones2,
        logo: imagenBase64,
        elementos: {
            busqueda: document.getElementById("busqueda2").checked,
            perfil: document.getElementById("perfil2").checked,
            notificaciones: document.getElementById("notificaciones2").checked,
            carrito: document.getElementById("carrito2").checked
        }
    };
    localStorage.setItem("menuNavegacion", JSON.stringify(menuData));
}
function guardarSelectDestino() {
    const select = document.getElementById("destino5");
    if (!select) return;
    localStorage.setItem("destino5_opciones", select.innerHTML);
    localStorage.setItem("destino5_valor", select.value);
}
document.addEventListener("DOMContentLoaded", () => {
    const dataGuardada = localStorage.getItem("menuNavegacion");
    if (dataGuardada) {
        const menuData = JSON.parse(dataGuardada);
        document.getElementById("nombreMenu2").value = menuData.nombre;
        document.getElementById("busqueda2").checked = menuData.elementos.busqueda;
        document.getElementById("perfil2").checked = menuData.elementos.perfil;
        document.getElementById("notificaciones2").checked = menuData.elementos.notificaciones;
        document.getElementById("carrito2").checked = menuData.elementos.carrito;
        if (menuData.logo) {
            imagenBase64 = menuData.logo;
            previewMenu2.src = imagenBase64;
            previewMenu2.style.display = "block";
            placeholderMenu2.style.display = "none";
        }
        opciones2 = menuData.opciones || [];
        renderLista2();
    }
    const select = document.getElementById("destino5");
    const opcionesGuardadas = localStorage.getItem("destino5_opciones");
    const valorGuardado = localStorage.getItem("destino5_valor");
    if (select && opcionesGuardadas) {
        select.innerHTML = opcionesGuardadas;
    }
    if (select && valorGuardado) {
        select.value = valorGuardado;
    }
});
const selectDestinoListener = document.getElementById("destino5");
if (selectDestinoListener) {
    selectDestinoListener.addEventListener("change", guardarSelectDestino);
}
document.getElementById("crearMenu2").addEventListener("click", () => {
    const nombre = document.getElementById("nombreMenu2").value;
    const busqueda = document.getElementById("busqueda2").checked;
    const perfil = document.getElementById("perfil2").checked;
    const notificaciones = document.getElementById("notificaciones2").checked;
    const carrito = document.getElementById("carrito2").checked;
    if (!nombre.trim()) {
        alert("Escribe el nombre del menú");
        return;
    }
    const menuData = {
        nombre,
        opciones: opciones2,
        logo: imagenBase64,
        elementos: {
            busqueda,
            perfil,
            notificaciones,
            carrito
        }
    };
    console.log(menuData);
    localStorage.setItem("menuNavegacion", JSON.stringify(menuData));
    const selectDestino = document.getElementById("destino5");
    if (selectDestino) {
        selectDestino.innerHTML = `<option>Ningun destino</option>`;
        menuData.opciones.forEach(op => {
            const option = document.createElement("option");
            option.value = op.clave;
            option.textContent = op.nombre;
            selectDestino.appendChild(option);
        });
        guardarSelectDestino();
    }
    alert("Menú guardado correctamente ✅");
});
//-------------------------------------------//
//--|funcionalidad_formulario_del_carrusel|--//
//-------------------------------------------//
const uploadBox3 = document.getElementById("uploadBox3");
const input3 = document.getElementById("imagen3");
const previewContainer3 = document.getElementById("previewContainer3");
const placeholder3 = document.getElementById("placeholder3");
uploadBox3.addEventListener("click", () => {
    input3.click();
});
input3.addEventListener("change", () => {
    const files = input3.files;
    previewContainer3.innerHTML = "";
    if (files.length > 0) {
        placeholder3.style.display = "none";
        Array.from(files).forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = document.createElement("img");
                img.src = e.target.result;
                previewContainer3.appendChild(img);
            };
            reader.readAsDataURL(file);
        });
    } else {
        placeholder3.style.display = "block";
    }
});
document.getElementById("crearCarrusel3").addEventListener("click", () => {
    const files = input3.files;
    const controladores = document.getElementById("controladores3").checked;
    const indicadores = document.getElementById("indicadores3").checked;
    const automatico = document.getElementById("automatico3").checked;
    const tiempo = document.getElementById("tiempo3").value;
    if (!files || files.length === 0) {
        alert("No hay datos ingresados en el carrusel.");
        return;
    }
    const imagenes = [];
    let archivosProcesados = 0;
    Array.from(files).forEach(file => {
        if (!file.type.startsWith("image/")) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            imagenes.push(e.target.result);
            archivosProcesados++;
            if (archivosProcesados === files.length) {
                const datosCarrusel = {
                    imagenes,
                    controladores,
                    indicadores,
                    automatico,
                    tiempo
                };
                localStorage.setItem("carruselData", JSON.stringify(datosCarrusel));
                guardarCarrusel(); 
                console.log("Datos guardados:", datosCarrusel);
                alert("Carrusel guardado correctamente.");
                input3.value = "";
                previewContainer3.innerHTML = "";
                placeholder3.style.display = "block";
            }
        };
        reader.readAsDataURL(file);
    });
});
["controladores3", "indicadores3", "automatico3", "tiempo3"].forEach(id => {
    document.getElementById(id).addEventListener("change", guardarCarrusel);
});
function guardarCarrusel() {
    const imagenes = Array.from(previewContainer3.querySelectorAll("img"))
        .map(img => img.src);
    const datosCarrusel = {
        imagenes,
        controladores: document.getElementById("controladores3").checked,
        indicadores: document.getElementById("indicadores3").checked,
        automatico: document.getElementById("automatico3").checked,
        tiempo: document.getElementById("tiempo3").value
    };
    localStorage.setItem("carruselData", JSON.stringify(datosCarrusel));
}
function cargarCarrusel() {
    const data = JSON.parse(localStorage.getItem("carruselData"));
    if (!data) return;
    previewContainer3.innerHTML = "";
    placeholder3.style.display = "none";
    data.imagenes.forEach(src => {
        const img = document.createElement("img");
        img.src = src;
        previewContainer3.appendChild(img);
    });
    document.getElementById("controladores3").checked = data.controladores;
    document.getElementById("indicadores3").checked = data.indicadores;
    document.getElementById("automatico3").checked = data.automatico;
    document.getElementById("tiempo3").value = data.tiempo;
}
document.addEventListener("DOMContentLoaded", () => {
    cargarCarrusel();
});
//-----------------------------------------//
//--|funcionalidad_formulario_de_chatbot|--//
//-----------------------------------------//
let flujo = {};
let contadorOpciones = 0;
function guardarEnLocalStorage() {
    localStorage.setItem("flujoChatbot4", JSON.stringify(flujo));
}
function cargarDesdeLocalStorage() {
    const datos = localStorage.getItem("flujoChatbot4");
    if (datos) {
        flujo = JSON.parse(datos);
        mostrarJSON();
        actualizarSelects();
    }
}
function actualizarSelects() {
    const selects = document.querySelectorAll("#opciones-container4 select");
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
    localStorage.removeItem("flujoChatbot4");
    flujo = {};
    mostrarJSON();
}
function agregarOpcion() {
    const container = document.getElementById("opciones-container4");
    const div = document.createElement("div");
    div.classList.add("opcion4");
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
    const pregunta = document.getElementById("pregunta4").value.trim();
    const idNodo = document.getElementById("idNodo4").value.trim();
    if (!idNodo || !pregunta) {
        alert("Debes completar el ID y la pregunta");
        return;
    }
    const opcionesHTML = document.querySelectorAll("#opciones-container4 .opcion4");
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
    document.getElementById("pregunta4").value = "";
    document.getElementById("idNodo4").value = "";
    const inputs = document.querySelectorAll("#opciones-container4 input");
    const selects = document.querySelectorAll("#opciones-container4 select");
    inputs.forEach(input => input.value = "");
    selects.forEach(select => select.value = "");
}
function mostrarJSON() {
    document.getElementById("resultado4").textContent =
        JSON.stringify(flujo, null, 2);
}
function crearChatbot() {
    if (Object.keys(flujo).length === 0) {
        alert("No hay datos en el chatbot");
        return;
    }
    localStorage.setItem("chatbotFinal4", JSON.stringify(flujo));
    alert("Chatbot creado y guardado correctamente");
}
window.onload = function () {
    cargarDesdeLocalStorage();
};
//------------------------------------------------//
//--|funcionalidad_formulario_del_pie_de_pagina|--//
//------------------------------------------------//
const uploadBox8 = document.getElementById("uploadBox8");
const input8 = document.getElementById("imagen8");
const preview8 = document.getElementById("preview8");
const placeholder8 = document.getElementById("placeholder8");
uploadBox8.addEventListener("click", () => input8.click());
input8.addEventListener("change", () => {
    const file = input8.files[0];
    if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
            preview8.src = e.target.result;
            preview8.style.display = "block";
            placeholder8.style.display = "none";
            guardarFooter();
        };
        reader.readAsDataURL(file);
    }
});
const listaSubtitulos8 = document.getElementById("listaSubtitulos8");
const mensajeSubtitulos8 = document.getElementById("mensajeSubtitulos8");
const listaOpciones8 = document.getElementById("listaOpciones8");
const mensajeOpciones8 = document.getElementById("mensajeOpciones8");
document.getElementById("addSubtitulo8").addEventListener("click", () => {
    const input = document.getElementById("subtitulo8");
    const valor = input.value.trim();
    if (!valor) return;
    mensajeSubtitulos8.style.display = "none";
    const item = document.createElement("div");
    item.classList.add("subtitulo-item8");
    const texto = document.createElement("span");
    texto.classList.add("subtitulo-texto8");
    texto.textContent = valor;
    const btnEliminar = document.createElement("button");
    btnEliminar.classList.add("subtitulo-eliminar8");
    btnEliminar.textContent = "x";
    btnEliminar.addEventListener("click", () => {
        item.remove();
        if (listaSubtitulos8.querySelectorAll(".subtitulo-item8").length === 0) {
            mensajeSubtitulos8.style.display = "block";
        }
        guardarFooter();
    });
    item.appendChild(texto);
    item.appendChild(btnEliminar);
    listaSubtitulos8.appendChild(item);
    input.value = "";
    guardarFooter();
});
document.getElementById("addOpcion8").addEventListener("click", () => {
    const input = document.getElementById("opcion8");
    const valor = input.value.trim();
    if (!valor) return;
    mensajeOpciones8.style.display = "none";
    const item = document.createElement("div");
    item.classList.add("opcion-item8");
    const texto = document.createElement("span");
    texto.classList.add("opcion-texto8");
    texto.textContent = valor;
    const btnEliminar = document.createElement("button");
    btnEliminar.classList.add("opcion-eliminar8");
    btnEliminar.textContent = "x";
    btnEliminar.addEventListener("click", () => {
        item.remove();
        if (listaOpciones8.querySelectorAll(".opcion-item8").length === 0) {
            mensajeOpciones8.style.display = "block";
        }
        guardarFooter();
    });
    item.appendChild(texto);
    item.appendChild(btnEliminar);
    listaOpciones8.appendChild(item);
    input.value = "";
    guardarFooter();
});
function guardarFooter() {
    const titulo = document.getElementById("titulo8").value;
    const marca = document.getElementById("marca8").value;
    const subtitulos = [...listaSubtitulos8.querySelectorAll(".subtitulo-texto8")]
        .map(el => el.textContent);
    const opciones = [...listaOpciones8.querySelectorAll(".opcion-texto8")]
        .map(el => el.textContent);
    const imagen = preview8.style.display === "block" ? preview8.src : "";
    const data = {
        titulo,
        subtitulos,
        opciones,
        marca,
        imagen
    };
    localStorage.setItem("footerData", JSON.stringify(data));
}
document.getElementById("titulo8").addEventListener("input", guardarFooter);
document.getElementById("marca8").addEventListener("input", guardarFooter);
function cargarFooter() {
    const data = JSON.parse(localStorage.getItem("footerData"));
    if (!data) return;
    document.getElementById("titulo8").value = data.titulo || "";
    document.getElementById("marca8").value = data.marca || "";
    if (data.imagen) {
        preview8.src = data.imagen;
        preview8.style.display = "block";
        placeholder8.style.display = "none";
    }
    listaSubtitulos8.innerHTML = "";
    if (data.subtitulos.length === 0) {
        mensajeSubtitulos8.style.display = "block";
    } else {
        mensajeSubtitulos8.style.display = "none";
        data.subtitulos.forEach(texto => {
            const item = document.createElement("div");
            item.classList.add("subtitulo-item8");
            item.innerHTML = `
                <span class="subtitulo-texto8">${texto}</span>
                <button class="subtitulo-eliminar8">x</button>
            `;
            item.querySelector("button").addEventListener("click", () => {
                item.remove();
                guardarFooter();
            });
            listaSubtitulos8.appendChild(item);
        });
    }
    listaOpciones8.innerHTML = "";
    if (data.opciones.length === 0) {
        mensajeOpciones8.style.display = "block";
    } else {
        mensajeOpciones8.style.display = "none";
        data.opciones.forEach(texto => {
            const item = document.createElement("div");
            item.classList.add("opcion-item8");
            item.innerHTML = `
                <span class="opcion-texto8">${texto}</span>
                <button class="opcion-eliminar8">x</button>
            `;
            item.querySelector("button").addEventListener("click", () => {
                item.remove();
                guardarFooter();
            });
            listaOpciones8.appendChild(item);
        });
    }
}
document.addEventListener("DOMContentLoaded", () => {
    cargarFooter();
});
document.getElementById("crearFooter8").addEventListener("click", () => {
    guardarFooter();
    console.log("Footer guardado:", JSON.parse(localStorage.getItem("footerData")));
    alert("Pie de página creado correctamente");
});
//-------------------------------------------//
//--|funcionalidad_formulario_de_contenido|--//
//-------------------------------------------//
const editor5 = document.getElementById("editor5");
let empty5 = editor5.querySelector(".empty5");
let elementoActivo = null;
function guardarSelectDestino() {
    const select = document.getElementById("destino5");
    localStorage.setItem("destino5_opciones", select.innerHTML);
    localStorage.setItem("destino5_valor", select.value);
}
function agregarOpcionDestino(texto) {
    const select = document.getElementById("destino5");
    const option = document.createElement("option");
    option.textContent = texto;
    select.appendChild(option);
}
function guardarEditor() {
    localStorage.setItem("contenidoEditor5", editor5.innerHTML);
}
let timeout;
function guardarEditorDebounce() {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        guardarEditor();
    }, 500);
}
document.addEventListener("DOMContentLoaded", () => {
    const data = localStorage.getItem("contenidoEditor5");
    if (data) {
        editor5.innerHTML = data;
    }
    const select = document.getElementById("destino5");
    const opcionesGuardadas = localStorage.getItem("destino5_opciones");
    const valorGuardado = localStorage.getItem("destino5_valor");
    if (opcionesGuardadas && opcionesGuardadas.trim() !== "") {
        select.innerHTML = opcionesGuardadas;
    }
    if (valorGuardado) {
        select.value = valorGuardado;
    }
});
document.getElementById("destino5").addEventListener("change", () => {
    guardarSelectDestino();
});
//-------------------------------//
//--|deteccion_elemento_activo|--//
//-------------------------------//
editor5.addEventListener("focusin", (e) => {
    if (e.target.matches("input, textarea")) {
        elementoActivo = e.target;
    }
});
editor5.setAttribute("contenteditable", "false");
editor5.addEventListener("input", () => {
    if (editor5.innerText.trim() === "") {
        if (empty5) empty5.style.display = "block";
    } else {
        if (empty5) empty5.style.display = "none";
    }
    guardarEditorDebounce();
});
editor5.addEventListener("click", () => {
    setTimeout(guardarEditor, 100);
});
//----------------------//
//--|cambiar_posicion|--//
//----------------------//
document.getElementById("posicion5").addEventListener("change", (e) => {
    if (!elementoActivo) return;
    const valor = e.target.value;
    switch (valor) {
        case "Izquierda":
            elementoActivo.style.textAlign = "left";
            break;
        case "Derecha":
            elementoActivo.style.textAlign = "right";
            break;
        case "centro":
            elementoActivo.style.textAlign = "center";
            break;
        case "Justificado":
            elementoActivo.style.textAlign = "justify";
            break;
        default:
            elementoActivo.style.textAlign = "left";
    }
    guardarEditor();
});
//-------------------//
//--|tipo_de_texto|--//
//-------------------//
document.getElementById("tipo5").addEventListener("change", (e) => {
    if (!elementoActivo) return;
    const valor = e.target.value;
    switch (valor) {
        case "Titulo":
            elementoActivo.style.fontSize = "28px";
            elementoActivo.style.fontWeight = "bold";
            break;
        case "Subtitulo":
            elementoActivo.style.fontSize = "20px";
            elementoActivo.style.fontWeight = "600";
            break;
        case "Parrafo":
            elementoActivo.style.fontSize = "14px";
            elementoActivo.style.fontWeight = "normal";
            break;
    }
    guardarEditor();
});
//-----------------------//
//--|formato_del_texto|--//
//-----------------------//
document.querySelectorAll("[data-type]").forEach(btn => {
    btn.addEventListener("click", () => {
        const type = btn.dataset.type;
        if (elementoActivo) {
            if (type === "bold") {
                elementoActivo.style.fontWeight =
                    elementoActivo.style.fontWeight === "bold" ? "normal" : "bold";
            }
            if (type === "italic") {
                elementoActivo.style.fontStyle =
                    elementoActivo.style.fontStyle === "italic" ? "normal" : "italic";
            }
            if (type === "underline") {
                elementoActivo.style.textDecoration =
                    elementoActivo.style.textDecoration === "underline" ? "none" : "underline";
            }
            return;
        }
        const seleccion = window.getSelection();
        if (!seleccion.rangeCount) return;
        editor5.setAttribute("contenteditable", "true");
        if (type === "bold") document.execCommand("bold");
        if (type === "italic") document.execCommand("italic");
        if (type === "underline") document.execCommand("underline");
        editor5.setAttribute("contenteditable", "false");
    });
});
//----------------------//
//--|tamaño_del_texto|--//
//----------------------//
document.getElementById("tamano5").addEventListener("change", (e) => {
    const size = e.target.value;
    if (elementoActivo) {
        elementoActivo.style.fontSize = size;
        return;
    }
    const seleccion = window.getSelection();
    if (!seleccion.rangeCount) return;
    const range = seleccion.getRangeAt(0);
    if (range.collapsed) return;
    editor5.setAttribute("contenteditable", "true");
    const span = document.createElement("span");
    span.style.fontSize = size;
    span.appendChild(range.extractContents());
    range.insertNode(span);
    seleccion.removeAllRanges();
    editor5.setAttribute("contenteditable", "false");
});
//----------------------//
//--|fuente_del_texto|--//
//----------------------//
document.getElementById("cambio5").addEventListener("change", (e) => {
    if (!elementoActivo) return;
    const fuente = e.target.value;
    if (fuente && fuente !== "Ninguna cambio") {
        elementoActivo.style.fontFamily = fuente;
    }
});
//----------------------------//
//--|seleccion_de_contenido|--//
//----------------------------//
document.getElementById("contenido5").addEventListener("change", (e) => {
    const valor = e.target.value;
    let html = "";
    switch (valor) {
        //-----------------//
        //--|contenido_1|--//
        //-----------------//
        case "contenido 1":
            html = `
                <div class="contenido1">
                    <div class="contenido1-header">
                        <input type="text" placeholder="Escribir el título..." class="titulo-input">
                        <button class="btn-ver-mas">Ver más</button>
                    </div>
                    <div class="contenido1-grid">
                        <div class="card">
                            <div class="imagen">
                                <i class="fas fa-image"></i>
                                <p>Ninguna imagen añadido</p>
                            </div>
                            <input type="text" placeholder="Escribir el subtítulo..." class="subtitulo">
                        </div>
                        <div class="card">
                            <div class="imagen">
                                <i class="fas fa-image"></i>
                                <p>Ninguna imagen añadido</p>
                            </div>
                            <input type="text" placeholder="Escribir el subtítulo..." class="subtitulo">
                        </div>
                        <div class="card">
                            <div class="imagen">
                                <i class="fas fa-image"></i>
                                <p>Ninguna imagen añadido</p>
                            </div>
                            <input type="text" placeholder="Escribir el subtítulo..." class="subtitulo">
                        </div>
                    </div>
                </div>
            `;
            break;
        //-----------------//
        //--|contenido_2|--//
        //-----------------//
        case "contenido 2":
            html = `
                <div class="contenido2">
                    <div class="contenido2-header">
                        <input type="text" placeholder="Escribir el título..." class="titulo-input">
                    </div>
                    <div class="contenido2-grid">
                        ${[1,2,3,4].map(() => `
                            <div class="card2">
                                <div class="imagen2">
                                    <i class="fas fa-image"></i>
                                    <p>Ninguna imagen añadido</p>
                                </div>
                                <input type="text" placeholder="Escribir el subtitulo..." class="subtitulo2">
                                <textarea placeholder="Añade una descripcion..." class="descripcion2"></textarea>
                            </div>
                        `).join("")}
                    </div>
                </div>
            `;
            break;
        //-----------------//
        //--|contenido_3|--//
        //-----------------//
        case "contenido 3":
            html = `
                <div class="contenido3">
                    <div class="contenido3-header">
                        <input type="text" placeholder="Escribir el título..." class="titulo-input">
                    </div>
                    <div class="contenido3-imagen">
                        <i class="fas fa-image"></i>
                        <p>Ninguna imagen añadido</p>
                    </div>
                </div>
            `;
            break;
        //-----------------//
        //--|contenido_4|--//
        //-----------------//
        case "contenido 4":
            html = `
                <div class="contenido4">
                    <div class="contenido4-header">
                        <input type="text" placeholder="Escribir el título..." class="titulo-input">
                    </div>
                    <div class="contenido4-body">
                        <div class="imagen4">
                            <i class="fas fa-image"></i>
                            <p>Ninguna imagen añadido</p>
                        </div>
                        <textarea class="descripcion4" placeholder="Añade una descripcion..."></textarea>
                    </div>
                </div>
            `;
            break;
        //-----------------//
        //--|contenido_5|--//
        //-----------------//
        case "contenido 5":
            html = `
                <div class="contenido5">
                    <div class="contenido5-header">
                        <input type="text" placeholder="Escribir el título..." class="titulo-input">
                    </div>
                    <div class="contenido5-grid">
                        ${[1,2,3].map(() => `
                            <div class="card5">
                                <div class="imagen5">
                                    <i class="fas fa-image"></i>
                                    <p>Ninguna imagen añadido</p>
                                </div>
                                <input type="text" placeholder="Escribir el subtitulo..." class="subtitulo5">
                            </div>
                        `).join("")}
                    </div>
                </div>
            `;
            break;
        //-----------------//
        //--|contenido_6|--//
        //-----------------//
        case "contenido 6":
            html = `
                <div class="contenido6">
                    <div class="contenido6-header">
                        <input type="text" placeholder="Escribir el título..." class="titulo-input">
                    </div>
                    <div class="contenido6-body">
                        <div class="contenido6-izquierda">
                            <div class="imagen6">
                                <i class="fas fa-image"></i>
                                <p>Ninguna imagen añadido</p>
                            </div>
                            <input type="text" placeholder="Escribir el subtitulo..." class="subtitulo6">
                        </div>
                        <div class="contenido6-derecha">
                            <textarea placeholder="Añade una descripcion..." class="descripcion6"></textarea>
                            <input type="text" placeholder="Escribir el subtitulo..." class="subtitulo6">
                            <div class="lista6">
                                ${[1,2,3,4].map(() => `
                                    <div class="item6">
                                        <button class="btn-mas">+</button>
                                        <input type="text" placeholder="Escribir el subtitulo..." class="input-lista6">
                                    </div>
                                `).join("")}
                            </div>
                        </div>
                    </div>
                </div>
            `;
            break;
        //-----------------//
        //--|contenido_7|--//
        //-----------------//
        case "contenido 7":
            html = `
                <div class="contenido7">
                    <div class="contenido7-header">
                        <input type="text" placeholder="Escribir el título..." class="titulo-input">
                    </div>
                    <div class="contenido7-body">
                        <textarea class="descripcion7" placeholder="Añade una descripcion..."></textarea>
                    </div>
                    <div class="contenido7-footer">
                        <input type="text" placeholder="Escribir el subtitulo..." class="subtitulo7">
                        <div class="acciones7">
                            ${[1,2,3,4].map(() => `
                                <button class="btn-mas7">+</button>
                            `).join("")}
                        </div>
                    </div>
                </div>
            `;
            break;
        //-----------------//
        //--|contenido_8|--//
        //-----------------//
        case "contenido 8":
            html = `
                <div class="contenido8">
                    <div class="contenido8-header">
                        <input type="text" placeholder="Escribir el título..." class="titulo-input">
                    </div>
                    <div class="contenido8-grid">
                        <div class="imagen8 img1">
                            <i class="fas fa-image"></i>
                            <p>Ninguna imagen añadido</p>
                        </div>
                        <div class="imagen8 img2">
                            <i class="fas fa-image"></i>
                            <p>Ninguna imagen añadido</p>
                        </div>
                        <div class="imagen8 img3">
                            <i class="fas fa-image"></i>
                            <p>Ninguna imagen añadido</p>
                        </div>
                        <div class="imagen8 img4">
                            <i class="fas fa-image"></i>
                            <p>Ninguna imagen añadido</p>
                        </div>
                        <div class="imagen8 img5">
                            <i class="fas fa-image"></i>
                            <p>Ninguna imagen añadido</p>
                        </div>
                        <div class="imagen8 img6">
                            <i class="fas fa-image"></i>
                            <p>Ninguna imagen añadido</p>
                        </div>
                        <div class="imagen8 img7">
                            <i class="fas fa-image"></i>
                            <p>Ninguna imagen añadido</p>
                        </div>
                    </div>
                </div>
            `;
            break;
        //-----------------//
        //--|contenido_9|--//
        //-----------------//
        case "contenido 9":
            html = `
                <div class="contenido9">
                    <div class="contenido9-header">
                        <input type="text" placeholder="Escribir el título..." class="titulo-input">
                    </div>
                    <div class="contenido9-imagen-principal">
                        <i class="fas fa-image"></i>
                        <p>Ninguna imagen añadido</p>
                    </div>
                    <div class="contenido9-grid">
                        <div class="imagen9">
                            <i class="fas fa-image"></i>
                            <p>Ninguna imagen añadido</p>
                        </div>
                        <div class="imagen9">
                            <i class="fas fa-image"></i>
                            <p>Ninguna imagen añadido</p>
                        </div>
                        <div class="imagen9">
                            <i class="fas fa-image"></i>
                            <p>Ninguna imagen añadido</p>
                        </div>
                    </div>
                    <div class="contenido9-subtitulos">
                        <input type="text" placeholder="Escribir el subtitulo..." class="subtitulo9">
                        <input type="text" placeholder="Escribir el subtitulo..." class="subtitulo9">
                        <input type="text" placeholder="Escribir el subtitulo..." class="subtitulo9">
                    </div>
                </div>
            `;
            break;
        //------------------//
        //--|contenido_10|--//
        //------------------//
        case "contenido 10":
            html = `
                <div class="contenido10">
                    <div class="contenido10-header">
                        <input type="text" placeholder="Escribir el título..." class="titulo-input">
                    </div>
                    <div class="contenido10-grid">
                        ${[1,2,3,4,5,6].map(() => `
                            <div class="card10">
                                <div class="imagen10">
                                    <i class="fas fa-image"></i>
                                    <p>Ninguna imagen añadido</p>
                                </div>
                                <input type="text" placeholder="Escribir el subtitulo..." class="subtitulo10">
                            </div>
                        `).join("")}
                    </div>
                </div>
            `;
            break;
        //------------------//
        //--|contenido_11|--//
        //------------------//
        case "contenido 11":
            html = `
                <div class="contenido11">
                    <div class="contenido11-body">
                        <div class="contenido11-izquierda">
                            <input type="text" placeholder="Escribir el título..." class="titulo-input">
                            <textarea placeholder="Añade una descripcion..." class="descripcion11"></textarea>
                        </div>
                        <div class="contenido11-derecha imagen11">
                            <i class="fas fa-image"></i>
                            <p class="texto11">Ninguna imagen añadida</p>
                        </div>
                    </div>
                </div>
            `;
            break;
        //------------------//
        //--|contenido_12|--//
        //------------------//
        case "contenido 12":
            html = `
                <div class="contenido12">
                    <div class="contenido12-body">
                        <!-- IZQUIERDA -->
                        <div class="contenido12-izquierda imagen12">
                            <i class="fas fa-image"></i>
                            <p>Ninguna imagen añadida</p>
                        </div>
                        <div class="contenido12-derecha">
                            <div class="contenido12-header">
                                <input type="text" placeholder="Escribir el título..." class="titulo-input">
                            </div>
                            <textarea placeholder="Añade una descripcion..." class="descripcion12"></textarea>
                            <div class="contenido12-cards">
                                ${[1,2,3].map(() => `
                                    <div class="card12">
                                        <div class="imagen12">
                                            <i class="fas fa-image"></i>
                                            <p class="texto12">Ninguna imagen añadida</p>
                                        </div>
                                        <input type="text" placeholder="Escribir el subtitulo..." class="subtitulo12">
                                        <textarea placeholder="Añade una descripcion..." class="descripcion-card12"></textarea>
                                    </div>
                                `).join("")}
                            </div>
                        </div>
                    </div>
                </div>
            `;
            break;
        //------------------//
        //--|contenido_13|--//
        //------------------//
        case "contenido 13":
            html = `
                <div class="contenido13">
                    <div class="contenido13-body">
                        <div class="contenido13-izquierda">
                            <div class="contenido13-header">
                                <input type="text" placeholder="Escribir el título..." class="titulo-input">
                            </div>
                            <textarea placeholder="Añade una descripcion..." class="descripcion13"></textarea>
                            <div class="contenido13-cards">
                                ${[1,2,3].map(() => `
                                    <div class="card13">
                                        <div class="imagen13">
                                            <i class="fas fa-image"></i>
                                            <p class="texto13">Ninguna imagen añadida</p>
                                        </div>
                                        <input type="text" placeholder="Escribir el subtitulo..." class="subtitulo13">
                                        <textarea placeholder="Añade una descripcion..." class="descripcion-card13"></textarea>
                                    </div>
                                `).join("")}
                            </div>
                        </div>
                        <div class="contenido13-derecha imagen13">
                            <i class="fas fa-image"></i>
                            <p>Ninguna imagen añadida</p>
                        </div>
                    </div>
                </div>
            `;
            break;
        //------------------//
        //--|contenido_14|--//
        //------------------//
        case "contenido 14":
            html = `
                <div class="contenido14">
                    <div class="contenido14-header">
                        <input type="text" placeholder="Aqui ira el titulo..." class="titulo-input">
                    </div>
                    <div class="contenido14-grid">
                        ${[1,2,3,4].map(() => `
                            <div class="card14">
                                <div class="imagen14">
                                    <i class="fas fa-image"></i>
                                    <p>Ninguna imagen añadido</p>
                                </div>
                                <textarea placeholder="Añade una descripcion..." class="descripcion14"></textarea>
                                <input type="text" placeholder="Escribir el subtitulo..." class="subtitulo14">
                            </div>
                        `).join("")}
                    </div>
                </div>
            `;
            break;
        //------------------//
        //--|contenido_15|--//
        //------------------//
        case "contenido 15":
            html = `
                <div class="contenido15">
                    <div class="contenido15-header">
                        <input type="text" placeholder="aqui ira el titulo..." class="titulo-input">
                    </div>
                    <div class="contenido15-grid">
                        ${[1,2,3,4].map(() => `
                            <div class="card15">
                                <div class="imagen15">
                                    <i class="fas fa-image"></i>
                                    <p>Ninguna imagen añadido</p>
                                </div>
                                <textarea
                                    placeholder="Añade una descripcion..." 
                                    class="descripcion15"
                                ></textarea>
                            </div>
                        `).join("")}
                    </div>
                </div>
            `;
            break;
        //------------------//
        //--|contenido_16|--//
        //------------------//
        case "contenido 16":
            html = `
                <div class="contenido16">
                    <div class="contenido16-grid">
                        ${[1,2,3,4].map(() => `
                            <div class="card16">
                                <div class="imagen16">
                                    <i class="fas fa-image"></i>
                                    <p>Ninguna imagen añadida</p>
                                </div>
                                <input type="text" placeholder="Escribir el subtitulo..." class="subtitulo16">
                                <button class="btn-ver16">Ver todo</button>
                            </div>
                        `).join("")}
                    </div>
                </div>
            `;
        break;
        //------------------//
        //--|contenido_17|--//
        //------------------//
        case "contenido 17":
            html = `
                <div class="contenido17">
                    <div class="contenido17-header">
                        <input type="text" placeholder="Aqui ira el titulo..." class="titulo-input">
                    </div>
                    <div class="contenido17-grid">
                        ${[1,2,3,4,5,6].map(() => `
                            <div class="card17">
                                <div class="imagen17">
                                    <i class="fas fa-image"></i>
                                    <p>Ninguna imagen añadida</p>
                                </div>
                                <input type="text" placeholder="Escribir el subtitulo..." class="subtitulo17">
                                <button class="btn-ver17">Ver categoria</button>
                            </div>
                        `).join("")}
                    </div>
                </div>
            `;
        break;
        default:
            html = `<p class="empty5">Ninguna contenido disponible</p>`;
    }
    editor5.innerHTML = html;
    empty5 = editor5.querySelector(".empty5");
    if (empty5) {
        empty5.style.display = editor5.innerText.trim() === "" ? "block" : "none";
    }
    guardarEditor();
});
//--------------------------------//
//--|sistema_global_de_imagenes|--//
//--------------------------------//
function activarSelectorImagen(contenedor) {
    const inputFile = document.createElement("input");
    inputFile.type = "file";
    inputFile.accept = "image/*";
    inputFile.click();
    inputFile.addEventListener("change", () => {
        const file = inputFile.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                contenedor.innerHTML = `
                    <img src="${event.target.result}" class="img-preview">
                `;
                guardarEditor();
            };
            reader.readAsDataURL(file);
        }
    });
}
editor5.addEventListener("click", (e) => {
    const isInput = e.target.closest("input, textarea");
    if (isInput) return;
    const img1 = e.target.closest(".imagen");
    const img2 = e.target.closest(".imagen2");
    const img3 = e.target.closest(".contenido3-imagen");
    const img4 = e.target.closest(".imagen4");
    const img5 = e.target.closest(".imagen5");
    const img6 = e.target.closest(".imagen6");
    const img8 = e.target.closest(".imagen8");
    const img9 = e.target.closest(".imagen9");
    const img9Principal = e.target.closest(".contenido9-imagen-principal");
    const img10 = e.target.closest(".imagen10");
    const img11 = e.target.closest(".imagen11");
    const img12 = e.target.closest(".imagen12");
    const img13 = e.target.closest(".imagen13");
    const img14 = e.target.closest(".imagen14");
    const img15 = e.target.closest(".imagen15");
    const img16 = e.target.closest(".imagen16");
    const img17 = e.target.closest(".imagen17");
    const img7 = e.target.closest(".contenido7-header");
    const img7b = e.target.closest(".contenido7-body");
    const btnMas6 = e.target.closest(".btn-mas");
    const btnMas7 = e.target.closest(".btn-mas7");
    if (img1) activarSelectorImagen(img1);
    if (img2) activarSelectorImagen(img2);
    if (img3) activarSelectorImagen(img3);
    if (img4) activarSelectorImagen(img4);
    if (img5) activarSelectorImagen(img5);
    if (img6) activarSelectorImagen(img6);
    if (img8) activarSelectorImagen(img8);
    if (img9) activarSelectorImagen(img9);
    if (img9Principal) activarSelectorImagen(img9Principal);
    if (img10) activarSelectorImagen(img10);
    if (img11) activarSelectorImagen(img11);
    if (img12) activarSelectorImagen(img12);
    if (img13) activarSelectorImagen(img13);
    if (img14) activarSelectorImagen(img14);
    if (img15) activarSelectorImagen(img15);
    if (img16) activarSelectorImagen(img16);
    if (img17) activarSelectorImagen(img17);
    if (img7) activarSelectorImagen(img7);
    if (img7b) activarSelectorImagen(img7b);
    if (btnMas6) {
        const contenedor = btnMas6.parentElement;
        const inputFile = document.createElement("input");
        inputFile.type = "file";
        inputFile.accept = "image/*";
        inputFile.click();
        inputFile.addEventListener("change", () => {
            const file = inputFile.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    contenedor.innerHTML = `
                        <img src="${event.target.result}" class="img-preview">
                        <input type="text" placeholder="Escribir el subtitulo..." class="input-lista6">
                    `;
                };
                reader.readAsDataURL(file);
            }
        });
    }
    if (btnMas7) {
        const contenedor = btnMas7.parentElement;
        const inputFile = document.createElement("input");
        inputFile.type = "file";
        inputFile.accept = "image/*";
        inputFile.click();
        inputFile.addEventListener("change", () => {
            const file = inputFile.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    contenedor.innerHTML = `
                        <img src="${event.target.result}" class="img-preview">
                    `;
                };
                reader.readAsDataURL(file);
            }
        });
    }
});
//------------------------------------//
//--|valicion_al_crear_el_contenido|--//
//------------------------------------//
document.getElementById("crearContenido5").addEventListener("click", () => {
    const editor = document.getElementById("editor5");
    const inputs = editor.querySelectorAll("input");
    const textareas = editor.querySelectorAll("textarea");
    let hayTexto = false;
    inputs.forEach(input => {
        if (input.value.trim() !== "") {
            hayTexto = true;
        }
    });
    textareas.forEach(textarea => {
        if (textarea.value.trim() !== "") {
            hayTexto = true;
        }
    });
    const imagenes = editor.querySelectorAll("img.img-preview");
    const hayImagenes = imagenes.length > 0;
    if (!hayTexto && !hayImagenes) {
        alert("Ningún dato agregado en contenido.");
        return;
    }
    //----------------------//
    //--|sistema_de_envio|--//
    //----------------------//
    const contenido = document.getElementById("contenido5").value;
    const destino = document.getElementById("destino5").value;
    const tituloInput = editor.querySelector(".titulo-input");
    const titulo = tituloInput ? tituloInput.value : "";
    //----------------------------------//
    //--|enviando_datos_a_contenido_1|--//
    //----------------------------------//
    if (contenido === "contenido 1") {
        const subtitulos = Array.from(editor.querySelectorAll(".subtitulo"))
            .map(el => el.value || "");
        const imagenesData = Array.from(editor.querySelectorAll(".imagen img"))
            .map(img => img.src || "");
        const data = {
            destino,
            titulo,
            tarjetas: [
                { imagen: imagenesData[0] || "", subtitulo: subtitulos[0] || "" },
                { imagen: imagenesData[1] || "", subtitulo: subtitulos[1] || "" },
                { imagen: imagenesData[2] || "", subtitulo: subtitulos[2] || "" }
            ]
        };
        localStorage.setItem(`contenido1_${destino}`, JSON.stringify(data));
        alert("Contenido 1 enviado correctamente");
    }
    //----------------------------------//
    //--|enviando_datos_a_contenido_3|--//
    //----------------------------------//
    if (contenido === "contenido 3") {
        const imgElement = editor.querySelector(".contenido3-imagen img");
        const imagen = imgElement ? imgElement.src : "";
        const data = {
            destino,
            titulo,
            imagen
        };
        localStorage.setItem(`contenido3_${destino}`, JSON.stringify(data));
        alert("Contenido 3 enviado correctamente");
    }
    //----------------------------------//
    //--|enviando_datos_a_contenido_8|--//
    //----------------------------------//
    if (contenido === "contenido 8") {
        const tituloInput = editor.querySelector(".titulo-input");
        const titulo = tituloInput ? tituloInput.value : "";
        const imagenesData = Array.from(editor.querySelectorAll(".imagen8 img"))
            .map(img => img.src || "");
        const data = {
            destino,
            titulo,
            imagenes: [
                imagenesData[0] || "",
                imagenesData[1] || "",
                imagenesData[2] || "",
                imagenesData[3] || "",
                imagenesData[4] || "",
                imagenesData[5] || "",
                imagenesData[6] || ""
            ]
        };
        localStorage.setItem("contenido8_principal", JSON.stringify(data));
        alert("Contenido 8 enviado correctamente");
    }
    //----------------------------------//
    //--|enviando_datos_a_contenido_9|--//
    //----------------------------------//
    if (contenido === "contenido 9") {
        const tituloInput = editor.querySelector(".titulo-input");
        const titulo = tituloInput ? tituloInput.value : "";
        const principalImg = editor.querySelector(".contenido9-imagen-principal img");
        const principal = principalImg ? principalImg.src : "";
        const imagenes = Array.from(editor.querySelectorAll(".imagen9 img"))
            .map(img => img.src || "");
        const subtitulos = Array.from(editor.querySelectorAll(".subtitulo9"))
            .map(el => el.value || "");
        const data = {
            destino,
            titulo,
            principal,
            imagenes: [
                imagenes[0] || "",
                imagenes[1] || "",
                imagenes[2] || ""
            ],
            subtitulos: [
                subtitulos[0] || "",
                subtitulos[1] || "",
                subtitulos[2] || ""
            ]
        };
        localStorage.setItem("contenido9_principal", JSON.stringify(data));
        alert("Contenido 9 enviado correctamente");
    }
    //-----------------------------------//
    //--|enviando_datos_a_contenido_10|--//
    //-----------------------------------//
    if (contenido === "contenido 10") {
        const tituloInput = editor.querySelector(".titulo-input");
        const titulo = tituloInput ? tituloInput.value : "";
        const imagenes = Array.from(editor.querySelectorAll(".imagen10 img"))
            .map(img => img.src || "");
        const subtitulos = Array.from(editor.querySelectorAll(".subtitulo10"))
            .map(el => el.value || "");
        const data = {
            destino,
            titulo,
            imagenes: imagenes.slice(0, 6),
            subtitulos: subtitulos.slice(0, 6)
        };
        localStorage.setItem(`contenido10_${destino}`, JSON.stringify(data));
        alert("Contenido 10 enviado correctamente");
    }
});
//------------------------------------------//
//--|funcionalidad_versiones_de_la_tienda|--//
//------------------------------------------//
document.getElementById("btnBuscar6").addEventListener("click", () => {
    const valor = document.getElementById("inputBusqueda6").value.toLowerCase();
    const filtradas = tiendas.filter(tienda =>
        tienda.nombre.toLowerCase().includes(valor)
    );
    renderTiendasFiltradas(filtradas);
});
function renderTiendasFiltradas(listaFiltrada) {
    lista.innerHTML = "";
    listaFiltrada.forEach(tienda => {
        const card = document.createElement("div");
        card.classList.add("tarjeta-sitio");
        card.innerHTML = `
            <div class="header-sitio">
                ${tienda.nombre}
            </div>
            <div class="imagen-sitio">
                ${tienda.imagen ? `<img src="${tienda.imagen}">` : "Sin imagen"}
            </div>
            <div class="acciones-sitio">
                <button class="eliminar" onclick="eliminarTienda(${tienda.id})">Eliminar</button>
                <button class="ver" onclick="window.open('tienda_de_ropa.html?id=${tienda.id}', '_blank')">Ver sitio web</button>
                <button class="editar" onclick="editarTienda(${tienda.id})">Editar</button>
            </div>
        `;
        lista.appendChild(card);
    });
}
document.getElementById("inputBusqueda6").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        document.getElementById("btnBuscar6").click();
    }
});
document.getElementById("btnFiltrar6").addEventListener("click", () => {
    alert("Aquí puedes abrir opciones de filtrado");
});
renderTiendas();