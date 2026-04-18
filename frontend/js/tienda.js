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
    const nombre = document.getElementById("nombre").value;
    const pestanas = document.getElementById("pestanas").value;
    if (nombre === "") {
        alert("Por favor escribe el nombre del sitio");
        return;
    }
    alert(`Sitio creado:\nNombre: ${nombre}\nPestañas: ${pestanas}`);
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
            <button onclick="eliminar2(${index})">x</button>
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
    const controladores = document.getElementById("controladores3").checked;
    const indicadores = document.getElementById("indicadores3").checked;
    const automatico = document.getElementById("automatico3").checked;
    const tiempo = document.getElementById("tiempo3").value;
    console.log({
        controladores,
        indicadores,
        automatico,
        tiempo
    });
    alert("Carrusel creado correctamente");
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
    preguntas4.forEach((p, i) => {
        const div = document.createElement("div");
        div.classList.add("item4");
        div.innerHTML = `
            <span>${p}</span>
            <button onclick="eliminarPregunta4(${i})">x</button>
        `;
        listaPreguntas4.appendChild(div);
    });
}
function renderRespuestas4() {
    listaRespuestas4.innerHTML = "";
    if (respuestas4.length === 0) {
        listaRespuestas4.innerHTML = `<p class="empty4">Ninguna respuesta añadida</p>`;
        return;
    }
    respuestas4.forEach((r, i) => {
        const div = document.createElement("div");
        div.classList.add("item4");
        div.innerHTML = `
            <span>${r}</span>
            <button onclick="eliminarRespuesta4(${i})">x</button>
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
const empty5 = editor5.querySelector(".empty5");
editor5.addEventListener("input", () => {
    if (editor5.innerText.trim() === "") {
        empty5.style.display = "block";
    } else {
        empty5.style.display = "none";
    }
});
document.querySelectorAll(".btn-format5").forEach(btn => {
    btn.addEventListener("click", () => {
        const type = btn.dataset.type;
        if (type === "bold") document.execCommand("bold");
        if (type === "italic") document.execCommand("italic");
        if (type === "underline") document.execCommand("underline");
        editor5.focus();
    });
});
document.getElementById("tamano5").addEventListener("change", (e) => {
    document.execCommand("fontSize", false, "7");
    const fontElements = document.getElementsByTagName("font");
    for (let i = 0; i < fontElements.length; i++) {
        if (fontElements[i].size == "7") {
            fontElements[i].removeAttribute("size");
            fontElements[i].style.fontSize = e.target.value;
        }
    }
});