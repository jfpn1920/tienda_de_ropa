//--------------------------------------------------//
//--|funcionalidad_titular_del_sitio_web_dinamica|--//
//--------------------------------------------------//
const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const tiendas = JSON.parse(localStorage.getItem("tiendas")) || [];
const tienda = tiendas.find(t => t.id == id);
if (tienda) {
    document.title = tienda.nombre;
    const favicon = document.getElementById("favicon");
    if (favicon && tienda.imagen) {
        favicon.href = tienda.imagen;
    }
}
//-----------------------------------------------//
//--|funcionalidad_menu_de_navegacion_dinamica|--//
//-----------------------------------------------//
const opcionesMenu = [
    { nombre: "Opción 1" },
    { nombre: "Opción 2" },
    { nombre: "Opción 3" },
    { nombre: "Opción 4" }
];
const contenedorMenu = document.getElementById("opciones-menu");
function crearMenu(lista) {
    contenedorMenu.innerHTML = "";
    const paginas = [
        "tienda_de_ropa.html",
        "nosotros.html",
        "contactanos.html",
        "categorias.html"
    ];
    lista.forEach((opcion, index) => {
        const li = document.createElement("li");
        li.textContent = opcion.nombre || opcion;
        li.addEventListener("click", () => {
            window.location.href = paginas[index];
        });
        contenedorMenu.appendChild(li);
    });
}
let data = null;
try {
    data = JSON.parse(localStorage.getItem("menuNavegacion"));
} catch (error) {
    console.error("Error leyendo localStorage:", error);
}
if (data) {
    document.getElementById("titulo-menu").textContent = data.nombre;
    if (data.logo && data.logo.trim() !== "") {
        document.getElementById("logo-menu").src = data.logo;
    }
    crearMenu(data.opciones || opcionesMenu);
    if (data.elementos) {
        document.getElementById("busqueda-container").style.display =
            data.elementos.busqueda ? "flex" : "none";
        document.getElementById("icono-perfil").style.display =
            data.elementos.perfil ? "inline-block" : "none";
        document.getElementById("icono-notificaciones").style.display =
            data.elementos.notificaciones ? "inline-block" : "none";
        document.getElementById("icono-carrito").style.display =
            data.elementos.carrito ? "inline-block" : "none";
    }
} else {
    console.warn("No hay datos del menú, usando menú por defecto");
    crearMenu(opcionesMenu);
}
//-----------------------------------------//
//--|funcionalidad_contenido_13_dinamica|--//
//-----------------------------------------//
document.addEventListener("DOMContentLoaded", () => {
    const zonaImagenPrincipal_contenido_13 = document.getElementById("zona_imagen_principal_contenido_13");
    const inputImagenPrincipal_contenido_13 = document.getElementById("input_imagen_principal_contenido_13");
    const iconoImagenPrincipal_contenido_13 = document.getElementById("icono_imagen_principal_contenido_13");
    const textoImagenPrincipal_contenido_13 = document.getElementById("texto_imagen_principal_contenido_13");
    const previewImagenPrincipal_contenido_13 = document.getElementById("preview_imagen_principal_contenido_13");
    if(zonaImagenPrincipal_contenido_13 && inputImagenPrincipal_contenido_13){
        zonaImagenPrincipal_contenido_13.addEventListener("click", () => {
            inputImagenPrincipal_contenido_13.click();
        });
        inputImagenPrincipal_contenido_13.addEventListener("change", (e) => {
            const archivo_contenido_13 = e.target.files[0];
            if(!archivo_contenido_13) return;
            const lector_contenido_13 = new FileReader();
            lector_contenido_13.onload = function(event){
                previewImagenPrincipal_contenido_13.src = event.target.result;
                previewImagenPrincipal_contenido_13.style.display = "block";
                iconoImagenPrincipal_contenido_13.style.display = "none";
                textoImagenPrincipal_contenido_13.style.display = "none";
            };
            lector_contenido_13.readAsDataURL(archivo_contenido_13);
        });
    }
    function activarImagen_contenido_13(
        zonaId,
        inputId,
        previewId
    ){
        const zona_contenido_13 = document.getElementById(zonaId);
        const input_contenido_13 = document.getElementById(inputId);
        const preview_contenido_13 = document.getElementById(previewId);
        if(!zona_contenido_13 || !input_contenido_13 || !preview_contenido_13) return;
        const icono_contenido_13 = zona_contenido_13.querySelector("i");
        const texto_contenido_13 = zona_contenido_13.querySelector("p");
        zona_contenido_13.addEventListener("click", () => {
            input_contenido_13.click();
        });
        input_contenido_13.addEventListener("change", (e) => {
            const archivo_contenido_13 = e.target.files[0];
            if(!archivo_contenido_13) return;
            const lector_contenido_13 = new FileReader();
            lector_contenido_13.onload = function(event){
                preview_contenido_13.src = event.target.result;
                preview_contenido_13.style.display = "block";
                icono_contenido_13.style.display = "none";
                texto_contenido_13.style.display = "none";
            };
            lector_contenido_13.readAsDataURL(archivo_contenido_13);
        });
    }
    activarImagen_contenido_13(
        "zona_imagen_1_contenido_13",
        "input_imagen_1_contenido_13",
        "preview_imagen_1_contenido_13"
    );
    activarImagen_contenido_13(
        "zona_imagen_2_contenido_13",
        "input_imagen_2_contenido_13",
        "preview_imagen_2_contenido_13"
    );
    activarImagen_contenido_13(
        "zona_imagen_3_contenido_13",
        "input_imagen_3_contenido_13",
        "preview_imagen_3_contenido_13"
    );
});
//-----------------------------------------//
//--|funcionalidad_contenido_14_dinamica|--//
//-----------------------------------------//
function activarImagen_contenido_14(
    zonaId,
    inputId
){
    const zona_contenido_14 = document.getElementById(zonaId);
    const input_contenido_14 = document.getElementById(inputId);
    if(!zona_contenido_14 || !input_contenido_14) return;
    const icono_contenido_14 = zona_contenido_14.querySelector("i");
    const texto_contenido_14 = zona_contenido_14.querySelector("p");
    zona_contenido_14.addEventListener("click", () => {
        input_contenido_14.click();
    });
    input_contenido_14.addEventListener("change", (e) => {
        const archivo_contenido_14 = e.target.files[0];
        if(!archivo_contenido_14) return;
        const lector_contenido_14 = new FileReader();
        lector_contenido_14.onload = function(event){
            zona_contenido_14.style.backgroundImage = `url(${event.target.result})`;
            if(icono_contenido_14) icono_contenido_14.style.display = "none";
            if(texto_contenido_14) texto_contenido_14.style.display = "none";
        };
        lector_contenido_14.readAsDataURL(archivo_contenido_14);
    });
}
activarImagen_contenido_14(
    "zona_imagen_1_contenido_14",
    "input_imagen_1_contenido_14"
);
activarImagen_contenido_14(
    "zona_imagen_2_contenido_14",
    "input_imagen_2_contenido_14"
);
activarImagen_contenido_14(
    "zona_imagen_3_contenido_14",
    "input_imagen_3_contenido_14"
);
activarImagen_contenido_14(
    "zona_imagen_4_contenido_14",
    "input_imagen_4_contenido_14"
);
//---------------------------------------//
//--|funcionalidad_envianos_un_mensaje|--//
//---------------------------------------//
const formulario_contacto = document.getElementById("formulario_contacto");
if(formulario_contacto){
    formulario_contacto.addEventListener("submit", (e) => {
        e.preventDefault();
        const nombre = document.getElementById("nombre_formulario_contacto").value;
        const correo = document.getElementById("correo_formulario_contacto").value;
        const asunto = document.getElementById("asunto_formulario_contacto").value;
        const mensaje = document.getElementById("mensaje_formulario_contacto").value;
        if(
            nombre.trim() === "" ||
            correo.trim() === "" ||
            asunto.trim() === "" ||
            mensaje.trim() === ""
        ){
            alert("Por favor completa todos los campos.");
            return;
        }
        alert("Mensaje enviado correctamente.");
        formulario_contacto.reset();
    });
}
//----------------------------------------//
//--|funcionalidad_contenido_6_dinamica|--//
//----------------------------------------//
document.addEventListener("DOMContentLoaded", () => {
    function activarEditable(el) {
        el.addEventListener("click", () => {
            el.setAttribute("contenteditable", "true");
            el.focus();
        });
        el.addEventListener("blur", () => {
            el.removeAttribute("contenteditable");
        });
    }
    function crearItem() {
        const item = document.createElement("div");
        item.classList.add("contenido_6-item");
        item.innerHTML = `
            <button class="contenido_6-btn">+</button>
            <div class="contenido_6-campo contenido_6-editable" data-placeholder="aqui ira el subtitulo"></div>
        `;
        const btn = item.querySelector(".contenido_6-btn");
        const campo = item.querySelector(".contenido_6-editable");
        activarEditable(campo);
        btn.addEventListener("click", manejarClickBoton);
        return item;
    }
    function manejarClickBoton(e) {
        const itemActual = e.target.closest(".contenido_6-item");
        const nuevoItem = crearItem();
        itemActual.after(nuevoItem);
    }
    document.querySelectorAll(".contenido_6-btn").forEach(btn => {
        btn.addEventListener("click", manejarClickBoton);
    });
    const box = document.getElementById("contenido_6_imagen_box");
    const input = document.getElementById("contenido_6_input_imagen");
    if (!box || !input) return;
    box.addEventListener("click", () => input.click());
    input.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = document.createElement("img");
            img.src = e.target.result;
            img.style.width = "100%";
            img.style.height = "100%";
            img.style.objectFit = "cover";
            box.innerHTML = "";
            box.appendChild(img);
        };
        reader.readAsDataURL(file);
    });
});
//------------------------------------//
//--|funcionalidad_chatbot_dinamica|--//
//------------------------------------//
const preguntasPorDefecto9 = {
    inicio: {
        texto: "¿En qué podemos ayudarte?",
        opciones: []
    }
};
function obtenerDatosChatbot() {
    const datos = localStorage.getItem("chatbotFinal4");
    if (!datos) {
        console.warn("No hay datos del chatbot, usando fallback");
        return preguntasPorDefecto9;
    }
    try {
        const parsed = JSON.parse(datos);
        if (!parsed || typeof parsed !== "object" || Object.keys(parsed).length === 0) {
            console.warn("Chatbot vacío, usando fallback");
            return preguntasPorDefecto9;
        }
        return parsed;
    } catch (error) {
        console.error("Error al parsear chatbot:", error);
        return preguntasPorDefecto9;
    }
}
let preguntas9 = obtenerDatosChatbot();
const chatToggle9 = document.getElementById("chatToggle9");
const chatbot9 = document.getElementById("chatbot9");
const preguntaElemento9 = document.getElementById("pregunta9");
const respuestasContenedor9 = document.getElementById("respuestas9");
if (chatToggle9 && chatbot9) {
    chatToggle9.addEventListener("click", () => {
        chatbot9.classList.toggle("hidden9");
    });
}
function obtenerNodoInicial(flujo) {
    if (!flujo || typeof flujo !== "object") return null;
    if (flujo.inicio) return "inicio";
    const claves = Object.keys(flujo);
    return claves.length ? claves[0] : null;
}
function cargarPregunta9(clave) {
    const pregunta = preguntas9[clave];
    if (!pregunta) {
        preguntaElemento9.textContent = "⚠️ Nodo no encontrado";
        respuestasContenedor9.innerHTML = "";
        return;
    }
    preguntaElemento9.textContent = pregunta.texto || "Sin texto";
    respuestasContenedor9.innerHTML = "";
    if (!Array.isArray(pregunta.opciones) || pregunta.opciones.length === 0) {
        return;
    }
    pregunta.opciones.forEach(opcion => {
        const btn = document.createElement("button");
        btn.textContent = opcion.texto || "Opción";
        btn.addEventListener("click", () => {
            if (opcion.siguiente && preguntas9[opcion.siguiente]) {
                cargarPregunta9(opcion.siguiente);
            } else {
                preguntaElemento9.textContent = "Fin del flujo";
                respuestasContenedor9.innerHTML = "";
            }
        });
        respuestasContenedor9.appendChild(btn);
    });
}
const nodoInicial = obtenerNodoInicial(preguntas9);
if (nodoInicial) {
    cargarPregunta9(nodoInicial);
} else {
    preguntaElemento9.textContent = "No hay flujo disponible";
}
//-----------------------------------------//
//--|funcionalidad_pie_de_pagia_dinamica|--//
//-----------------------------------------//
document.addEventListener("DOMContentLoaded", () => {
    const opciones = document.querySelectorAll(".opcion");
    opciones.forEach(opcion => {
        opcion.addEventListener("click", () => {
            alert("Has hecho clic en: " + opcion.textContent);
        });
    });
    function cambiarTitulo(texto) {
        const el = document.getElementById("texto-titulo");
        if (el) el.textContent = texto;
    }
    function cambiarMarca(texto) {
        const el = document.getElementById("texto-marca");
        if (el) el.textContent = texto;
    }
    const data = JSON.parse(localStorage.getItem("footerData"));
    if (!data) return;
    cambiarTitulo(data.titulo);
    cambiarMarca(data.marca);
    if (data.imagen) {
        const img = document.getElementById("img-footer");
        const txt = document.getElementById("texto-imagen");
        if (img) img.src = data.imagen;
        if (txt) txt.style.display = "none";
    }
    const columnas = document.querySelectorAll(".footer-columna");
    if (Array.isArray(data.subtitulos)) {
        data.subtitulos.forEach((sub, i) => {
            const columna = columnas[i];
            if (columna) {
                const titulo = columna.querySelector("h3");
                if (titulo) {
                    titulo.textContent = sub;
                }
            }
        });
    }
    let indexOpcion = 0;
    columnas.forEach(columna => {
        columna.querySelectorAll(".opcion").forEach(op => {
            if (data.opciones && data.opciones[indexOpcion]) {
                op.textContent = data.opciones[indexOpcion];
                indexOpcion++;
            } else {
                op.style.display = "none";
            }
        });
    });
});