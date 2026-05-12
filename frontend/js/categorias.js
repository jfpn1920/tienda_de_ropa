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
    {
        nombre: "Opción 1",
        oculto: false
    },
    {
        nombre: "Opción 2",
        oculto: false
    },
    {
        nombre: "Opción 3",
        oculto: false
    },
    {
        nombre: "Opción 4",
        oculto: false
    }
];
const contenedorMenu =
    document.getElementById("opciones-menu");
function crearMenu(lista) {
    contenedorMenu.innerHTML = "";
    const paginas = [
        "tienda_de_ropa.html",
        "nosotros.html",
        "contactanos.html",
        "categorias.html"
    ];
    lista.forEach((opcion, index) => {
        if (opcion.oculto) return;
        const li =
            document.createElement("li");
        li.textContent =
            opcion.nombre || opcion;
        li.addEventListener("click", () => {
            window.location.href =
                paginas[index];
        });
        contenedorMenu.appendChild(li);
    });
}
let data = null;
try {
    data =
        JSON.parse(
            localStorage.getItem("menuNavegacion")
        );
} catch (error) {
    console.error(
        "Error leyendo localStorage:",
        error
    );
}
if (data) {
    document.getElementById("titulo-menu").textContent =
        data.nombre;
    if (
        data.logo &&
        data.logo.trim() !== ""
    ) {
        document.getElementById("logo-menu").src =
            data.logo;
    }
    crearMenu(
        data.opciones || opcionesMenu
    );
    if (data.elementos) {
        document.getElementById("busqueda-container").style.display =
            data.elementos.busqueda
                ? "flex"
                : "none";
        document.getElementById("icono-perfil").style.display =
            data.elementos.perfil
                ? "inline-block"
                : "none";
        document.getElementById("icono-notificaciones").style.display =
            data.elementos.notificaciones
                ? "inline-block"
                : "none";
        document.getElementById("icono-carrito").style.display =
            data.elementos.carrito
                ? "inline-block"
                : "none";
    }
} else {
    console.warn(
        "No hay datos del menú, usando menú por defecto"
    );
    crearMenu(opcionesMenu);
}
//----------------------------------------//
//--|funcionalidad_contenido_4_dinamica|--//
//----------------------------------------//
document.addEventListener("DOMContentLoaded", () => {
    function activarEditable(el) {
        el.addEventListener("click", () => {
            el.setAttribute(
                "contenteditable",
                "true"
            );
            el.focus();
        });
        el.addEventListener("blur", () => {
            el.removeAttribute(
                "contenteditable"
            );
        });
    }
    document
        .querySelectorAll(
            ".contenido_4-editable"
        )
        .forEach(
            activarEditable
        );
    const box =
        document.getElementById(
            "contenido_4_imagen_box"
        );
    const input =
        document.getElementById(
            "contenido_4_input_imagen"
        );
    if (!box || !input) return;
    box.addEventListener(
        "click",
        () => input.click()
    );
    input.addEventListener(
        "change",
        (e) => {
            const file =
                e.target.files[0];
            if (!file) return;
            const reader =
                new FileReader();
            reader.onload = (e) => {
                box.innerHTML = `
                    <img 
                        src="${e.target.result}" 
                        style="
                            width:100%;
                            height:100%;
                            object-fit:cover;
                        "
                    >
                `;
            };
            reader.readAsDataURL(file);
        }
    );
    const contenido =
        JSON.parse(
            localStorage.getItem(
                "contenido4_categorias"
            )
        );
    if (!contenido) {
        return;
    }
    const titulo =
        document.querySelector(
            ".contenido_4-titulo"
        );
    const descripcion =
        document.querySelector(
            ".contenido_4-descripcion"
        );
    if (titulo) {
        titulo.textContent =
            contenido.titulo.texto || "";
        Object.assign(
            titulo.style,
            contenido.titulo.estilos
        );
    }
    if (descripcion) {
        descripcion.textContent =
            contenido.descripcion.texto || "";
        Object.assign(
            descripcion.style,
            contenido.descripcion.estilos
        );
    }
    if (
        box &&
        contenido.imagen
    ) {
        box.innerHTML = `
            <img
                src="${contenido.imagen}"
                style="
                    width:100%;
                    height:100%;
                    object-fit:cover;
                "
            >
        `;
    }
});
//-----------------------------------------//
//--|funcionalidad_contenido_16_dinamica|--//
//-----------------------------------------//
document.addEventListener(
    "DOMContentLoaded",
    () => {
        document
            .querySelectorAll(
                ".contenido_16-imagen"
            )
            .forEach((imgBox) => {
                imgBox.addEventListener(
                    "click",
                    () => {
                        const url =
                            prompt(
                                "Ingresa la URL de la imagen:"
                            );
                        if (url) {
                            imgBox.style.backgroundImage =
                                `url(${url})`;
                            imgBox.style.backgroundSize =
                                "cover";
                            imgBox.style.backgroundPosition =
                                "center";
                            imgBox.innerHTML = "";
                        }
                    }
                );
            });
        document
            .querySelectorAll(
                ".contenido_16-btn"
            )
            .forEach((boton) => {
                boton.addEventListener(
                    "click",
                    () => {
                        window.location.href =
                            "hombres.html";
                    }
                );
            });
        const items =
            document.querySelectorAll(
                ".contenido_16-item"
            );
        const contenido =
            JSON.parse(
                localStorage.getItem(
                    "contenido16_categorias"
                )
            );
        if (!contenido) {
            return;
        }
        items.forEach(
            (item, index) => {
                const data =
                    contenido.tarjetas[index];
                if (!data) {
                    return;
                }
                const imagenBox =
                    item.querySelector(
                        ".contenido_16-imagen"
                    );
                const subtitulo =
                    item.querySelector(
                        ".contenido_16-subtitulo, .contenido_16-input"
                    );
                const boton =
                    item.querySelector(
                        ".contenido_16-btn"
                    );
                if (
                    imagenBox &&
                    data.imagen
                ) {
                    imagenBox.innerHTML = `
                        <img
                            src="${data.imagen}"
                            style="
                                width:100%;
                                height:100%;
                                object-fit:cover;
                            "
                        >
                    `;
                }
                if (subtitulo) {
                    if (
                        subtitulo.tagName ===
                        "INPUT"
                    ) {
                        subtitulo.value =
                            data.subtitulo.texto || "";
                    } else {
                        subtitulo.textContent =
                            data.subtitulo.texto || "";
                    }
                    Object.assign(
                        subtitulo.style,
                        data.subtitulo.estilos
                    );
                }
                if (boton) {
                    boton.textContent =
                        data.boton.texto || "";
                    Object.assign(
                        boton.style,
                        data.boton.estilos
                    );
                }
            }
        );
    }
);
//-----------------------------------------//
//--|funcionalidad_contenido_17_dinamica|--//
//-----------------------------------------//
document.querySelectorAll(
    ".btn_contenido_17"
).forEach((boton, index) => {
    boton.addEventListener("click", () => {
        alert(
            "Has hecho clic en la categoría " +
            (index + 1)
        );
    });
});
window.addEventListener("load", () => {
    const raw =
        localStorage.getItem(
            "contenido17_categorias"
        );
    console.log("RAW:", raw);
    if (!raw) {
        console.log(
            "No existe contenido17_categorias"
        );
        return;
    }
    const contenido =
        JSON.parse(raw);
    console.log(
        "CONTENIDO:",
        contenido
    );
    const titulo =
        document.getElementById(
            "titulo_contenido_17"
        );
    if (
        titulo &&
        contenido.titulo
    ) {
        titulo.textContent =
            contenido.titulo.texto || "";
        Object.assign(
            titulo.style,
            contenido.titulo.estilos
        );
    }
    const cards =
        document.querySelectorAll(
            ".card_contenido_17"
        );
    cards.forEach((card, index) => {
        const data =
            contenido.tarjetas[index];
        if (!data) return;
        const imagenBox =
            card.querySelector(
                ".marco_imagen_contenido_17"
            );
        if (
            imagenBox &&
            data.imagen
        ) {
            imagenBox.innerHTML = `
                <img
                    src="${data.imagen}"
                    style="
                        width:100%;
                        height:100%;
                        object-fit:cover;
                    "
                >
            `;
        }
        const subtitulo =
            card.querySelector(
                ".subtitulo_contenido_17"
            );
        if (
            subtitulo &&
            data.subtitulo
        ) {
            subtitulo.textContent =
                data.subtitulo.texto || "";
            Object.assign(
                subtitulo.style,
                data.subtitulo.estilos
            );
        }
    });
    console.log(
        "CONTENIDO 17 RENDERIZADO"
    );
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