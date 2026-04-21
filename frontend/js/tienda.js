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
    if (nombre === "" && pestanas === "0") {
        alert("No hay ningún sitio web creado.");
        return;
    }
    if (nombre !== "" && pestanas !== "0") {
        alert(`Has creado la tienda "${nombre}" con éxito.`);
    } else {
        alert("Completa todos los campos para crear la tienda.");
    }
});
//----------------------------------------------------//
//--|funcionalidad_formulario_de_menu_de_navegacion|--//
//----------------------------------------------------//
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
            previewMenu2.src = e.target.result;
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
    opciones2.push(valor);
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
            <span>${op}</span>
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
    if (!nombre) {
        alert("Escribe el nombre del menú");
        return;
    }
    console.log({ nombre, opciones2, busqueda });
    alert("Menú creado correctamente");
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
    console.log({
        controladores,
        indicadores,
        automatico,
        tiempo,
        cantidadImagenes: files.length
    });
    alert("Carrusel creado correctamente.");
});
//-----------------------------------------//
//--|funcionalidad_formulario_de_chatbot|--//
//-----------------------------------------//
let preguntas4 = [];
let respuestas4 = [];
const listaPreguntas4 = document.getElementById("listaPreguntas4");
const listaRespuestas4 = document.getElementById("listaRespuestas4");
document.getElementById("addPregunta4").addEventListener("click", () => {
    const input = document.getElementById("preguntaInput4");
    const valor = input.value.trim();
    if (!valor) return;
    preguntas4.push(valor);
    input.value = "";
    renderPreguntas4();
});
document.getElementById("addRespuesta4").addEventListener("click", () => {
    const input = document.getElementById("respuestaInput4");
    const valor = input.value.trim();
    if (!valor) return;
    respuestas4.push(valor);
    input.value = "";
    renderRespuestas4();
});
function renderPreguntas4() {
    listaPreguntas4.innerHTML = "";
    if (preguntas4.length === 0) {
        listaPreguntas4.innerHTML = `<p class="empty4">Ninguna pregunta añadida</p>`;
        return;
    }
    preguntas4.forEach((p) => {
        const div = document.createElement("div");
        div.classList.add("item4");
        div.innerHTML = `
            <span>${p}</span>
        `;
        listaPreguntas4.appendChild(div);
    });
}
function renderRespuestas4() {
    listaRespuestas4.innerHTML = "";
    if (respuestas4.length === 0) {
        listaRespuestas4.innerHTML = `<p class="empty5">Ninguna respuesta añadida</p>`;
        return;
    }
    respuestas4.forEach((r) => {
        const div = document.createElement("div");
        div.classList.add("item5");
        div.innerHTML = `
            <span>${r}</span>
        `;
        listaRespuestas4.appendChild(div);
    });
}
function eliminarPregunta4(i) {
    preguntas4.splice(i, 1);
    renderPreguntas4();
}
function eliminarRespuesta4(i) {
    respuestas4.splice(i, 1);
    renderRespuestas4();
}
document.getElementById("crearChatbot4").addEventListener("click", () => {
    const nombre = document.getElementById("nombreChatbot4").value;
    const tiempo = document.getElementById("tiempoChatbot4").value;
    if (!nombre) {
        alert("Escribe el nombre del chatbot");
        return;
    }
    console.log({
        nombre,
        preguntas4,
        respuestas4,
        tiempo
    });
    alert("Chatbot creado correctamente");
});
//-------------------------------------------//
//--|funcionalidad_formulario_de_contenido|--//
//-------------------------------------------//
const editor5 = document.getElementById("editor5");
let empty5 = editor5.querySelector(".empty5");
editor5.setAttribute("contenteditable", "false");
editor5.addEventListener("input", () => {
    if (editor5.innerText.trim() === "") {
        if (empty5) empty5.style.display = "block";
    } else {
        if (empty5) empty5.style.display = "none";
    }
});
//-----------------------//
//--|formato_del_texto|--//
//-----------------------//
document.querySelectorAll("[data-type]").forEach(btn => {
    btn.addEventListener("click", () => {
        const type = btn.dataset.type;
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
    editor5.setAttribute("contenteditable", "true");
    document.execCommand("fontSize", false, "7");
    const fontElements = document.getElementsByTagName("font");
    for (let i = 0; i < fontElements.length; i++) {
        if (fontElements[i].size == "7") {
            fontElements[i].removeAttribute("size");
            fontElements[i].style.fontSize = e.target.value;
        }
    }
    editor5.setAttribute("contenteditable", "false");
});
//----------------------//
//--|fuente_del_texto|--//
//----------------------//
document.getElementById("cambio5").addEventListener("change", (e) => {
    const fuente = e.target.value;
    if (fuente) {
        editor5.setAttribute("contenteditable", "true");
        document.execCommand("fontName", false, fuente);
        editor5.setAttribute("contenteditable", "false");
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
    const valor = document.getElementById("inputBusqueda6").value;
    console.log("Buscando:", valor);
});
document.getElementById("btnFiltrar6").addEventListener("click", () => {
    alert("Aquí puedes abrir opciones de filtrado");
});
document.getElementById("inputBusqueda6").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        document.getElementById("btnBuscar6").click();
    }
});