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
        };
        reader.readAsDataURL(file);
    }
});
document.getElementById("crear").addEventListener("click", () => {
    const nombre = document.getElementById("nombre").value.trim();
    const pestanas = document.getElementById("pestanas").value;
    const imagen = preview.src;
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
    renderTiendas();
});
function renderTiendas() {
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
        };
        reader.readAsDataURL(file);
    }
});
const btnAdd2 = document.getElementById("addOption2");
const inputOption2 = document.getElementById("opcionInput2");
const lista2 = document.getElementById("listaOpciones2");
let opciones2 = [];
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
        };
        reader.readAsDataURL(file);
    }
});
const listaSubtitulos8 = document.getElementById("listaSubtitulos8");
const mensajeSubtitulos8 = document.getElementById("mensajeSubtitulos8");
document.getElementById("addSubtitulo8").addEventListener("click", () => {
    const input = document.getElementById("subtitulo8");
    const valor = input.value.trim();
    if (!valor) return;
    if (mensajeSubtitulos8) {
        mensajeSubtitulos8.style.display = "none";
    }
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
            if (mensajeSubtitulos8) {
                mensajeSubtitulos8.style.display = "block";
            }
        }
    });
    item.appendChild(texto);
    item.appendChild(btnEliminar);
    listaSubtitulos8.appendChild(item);
    input.value = "";
});
const listaOpciones8 = document.getElementById("listaOpciones8");
const mensajeOpciones8 = document.getElementById("mensajeOpciones8");
document.getElementById("addOpcion8").addEventListener("click", () => {
    const input = document.getElementById("opcion8");
    const valor = input.value.trim();
    if (!valor) return;
    if (mensajeOpciones8) {
        mensajeOpciones8.style.display = "none";
    }
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
            if (mensajeOpciones8) {
                mensajeOpciones8.style.display = "block";
            }
        }
    });
    item.appendChild(texto);
    item.appendChild(btnEliminar);
    listaOpciones8.appendChild(item);
    input.value = "";
});
document.getElementById("crearFooter8").addEventListener("click", () => {
    const titulo = document.getElementById("titulo8").value;
    const marca = document.getElementById("marca8").value;
    const subtitulos = [...listaSubtitulos8.querySelectorAll(".subtitulo-texto8")]
        .map(el => el.textContent);
    const opciones = [...listaOpciones8.querySelectorAll(".opcion-texto8")]
        .map(el => el.textContent);
    const imagen = preview8.src || "";
    const data = {
        titulo,
        subtitulos,
        opciones,
        marca,
        imagen
    };
    localStorage.setItem("footerData", JSON.stringify(data));
    console.log("Footer guardado:", data);
    alert("Pie de página creado correctamente");
});
//-------------------------------------------//
//--|funcionalidad_formulario_de_contenido|--//
//-------------------------------------------//
const editor5 = document.getElementById("editor5");
let empty5 = editor5.querySelector(".empty5");
let elementoActivo = null;
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
        default:
            elementoActivo.style.fontSize = "";
            elementoActivo.style.fontWeight = "";
    }
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
        default:
            html = `<p class="empty5">Ninguna contenido disponible</p>`;
    }
    editor5.innerHTML = html;
    empty5 = editor5.querySelector(".empty5");
    if (empty5) {
        empty5.style.display = editor5.innerText.trim() === "" ? "block" : "none";
    }
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
    const img7 = e.target.closest(".contenido7-header");
    const img7b = e.target.closest(".contenido7-body");
    const img7c = null;
    const btnMas6 = e.target.closest(".btn-mas");
    const btnMas7 = e.target.closest(".btn-mas7");
    if (img1) activarSelectorImagen(img1);
    if (img2) activarSelectorImagen(img2);
    if (img3) activarSelectorImagen(img3);
    if (img4) activarSelectorImagen(img4);
    if (img5) activarSelectorImagen(img5);
    if (img6) activarSelectorImagen(img6);
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
    alert("Se ha creado el contenido correctamente.");
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