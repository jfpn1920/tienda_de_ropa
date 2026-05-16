//--------------------------------------------------//
//--|funcionalidad_titular_del_sitio_web_dinamica|--//
//--------------------------------------------------//
document.addEventListener(
    "DOMContentLoaded",
    () => {
        const tiendaActiva =
            localStorage.getItem(
                "tiendaActiva"
            );
        if (!tiendaActiva) {
            console.warn(
                "No hay tienda activa."
            );
            return;
        }
        const tiendas = JSON.parse(
            localStorage.getItem(
                "tiendas"
            )
        ) || [];
        const tienda = tiendas.find(
            t => t.id == tiendaActiva
        );
        if (!tienda) {
            console.warn(
                "La tienda no existe."
            );
            return;
        }
        document.title =
            tienda.nombre;
        const favicon =
            document.getElementById(
                "favicon"
            );
        if (
            favicon &&
            tienda.imagen
        ) {
            favicon.href =
                tienda.imagen;
        }
    }
);
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
//--|funcionalidad_contenido_2_dinamica|--//
//----------------------------------------//
function activarImagen_contenido_2(
    zonaId,
    inputId,
    previewId
){
    const zona_contenido_2 =
        document.getElementById(
            zonaId
        );
    const input_contenido_2 =
        document.getElementById(
            inputId
        );
    const preview_contenido_2 =
        document.getElementById(
            previewId
        );
    if(
        !zona_contenido_2 ||
        !input_contenido_2 ||
        !preview_contenido_2
    ){
        console.warn(
            "Elemento no encontrado:",
            zonaId,
            inputId,
            previewId
        );
        return;
    }
    const icono_contenido_2 =
        zona_contenido_2.querySelector("i");
    const texto_contenido_2 =
        zona_contenido_2.querySelector("p");
    zona_contenido_2.addEventListener(
        "click",
        () => {
            input_contenido_2.click();
        }
    );
    input_contenido_2.addEventListener(
        "change",
        (e) => {
            const archivo_contenido_2 =
                e.target.files[0];
            if(!archivo_contenido_2) return;
            const lector_contenido_2 =
                new FileReader();
            lector_contenido_2.onload =
                function(event){
                preview_contenido_2.src =
                    event.target.result;
                preview_contenido_2.style.display =
                    "block";
                if(icono_contenido_2){
                    icono_contenido_2.style.display =
                        "none";
                }
                if(texto_contenido_2){
                    texto_contenido_2.style.display =
                        "none";
                }
            };
            lector_contenido_2.readAsDataURL(
                archivo_contenido_2
            );
        }
    );
}
document.addEventListener(
    "DOMContentLoaded",
    () => {
    const data_contenido_2 =
        localStorage.getItem(
            "contenido2_nosotros"
        );
    console.log(
        "Datos contenido 2:",
        data_contenido_2
    );
    if (data_contenido_2) {
        const contenido2 =
            JSON.parse(
                data_contenido_2
            );
        const titulo_contenido_2 =
            document.getElementById(
                "titulo_contenido_2"
            );
        if (
            titulo_contenido_2 &&
            contenido2.titulo
        ) {
            titulo_contenido_2.textContent =
                contenido2.titulo.texto || "";
            Object.assign(
                titulo_contenido_2.style,
                contenido2.titulo.estilos
            );
        }
        const tarjetasHTML =
            document.querySelectorAll(
                ".tarjeta_contenido_2"
            );
        contenido2.tarjetas.forEach(
            (tarjeta, index) => {
                const tarjetaHTML =
                    tarjetasHTML[index];
                if (!tarjetaHTML) return;
                const preview =
                    tarjetaHTML.querySelector(
                        ".preview_imagen_contenido_2"
                    );
                const icono =
                    tarjetaHTML.querySelector(
                        ".icono_imagen_contenido_2"
                    );
                const texto =
                    tarjetaHTML.querySelector(
                        ".texto_imagen_contenido_2"
                    );
                if (
                    preview &&
                    tarjeta.imagen
                ) {
                    preview.src =
                        tarjeta.imagen;
                    preview.style.display =
                        "block";
                    if (icono) {
                        icono.style.display =
                            "none";
                    }
                    if (texto) {
                        texto.style.display =
                            "none";
                    }
                }
                const subtitulo =
                    tarjetaHTML.querySelector(
                        ".subtitulo_contenido_2"
                    );
                if (
                    subtitulo &&
                    tarjeta.subtitulo
                ) {
                    subtitulo.textContent =
                        tarjeta.subtitulo.texto || "";
                    Object.assign(
                        subtitulo.style,
                        tarjeta.subtitulo.estilos
                    );
                }
                const descripcion =
                    tarjetaHTML.querySelector(
                        ".descripcion_contenido_2"
                    );
                if (
                    descripcion &&
                    tarjeta.descripcion
                ) {
                    descripcion.textContent =
                        tarjeta.descripcion.texto || "";
                    Object.assign(
                        descripcion.style,
                        tarjeta.descripcion.estilos
                    );
                }
            }
        );
    }
    const zonas =
        document.querySelectorAll(
            ".zona_imagen_contenido_2"
        );
    zonas.forEach((zona) => {
        const match =
            zona.id.match(
                /zona_imagen_(\d+)_contenido_2/
            );
        if(!match) return;
        const numero = match[1];
        activarImagen_contenido_2(
            `zona_imagen_${numero}_contenido_2`,
            `input_imagen_${numero}_contenido_2`,
            `preview_imagen_${numero}_contenido_2`
        );
    });
});
//-----------------------------------------//
//--|funcionalidad_contenido_11_dinamica|--//
//-----------------------------------------//
document.addEventListener("DOMContentLoaded", () => {
    const zonaImagen_contenido_11 =
        document.getElementById(
            "zona_imagen_contenido_11"
        );
    const inputImagen_contenido_11 =
        document.getElementById(
            "input_imagen_contenido_11"
        );
    const iconoImagen_contenido_11 =
        document.getElementById(
            "icono_imagen_contenido_11"
        );
    const textoImagen_contenido_11 =
        document.getElementById(
            "texto_imagen_contenido_11"
        );
    const previewImagen_contenido_11 =
        document.getElementById(
            "preview_imagen_contenido_11"
        );
    const data = localStorage.getItem(
        "contenido11_nosotros"
    );
    console.log(
        "Datos recibidos:",
        data
    );
    if (data) {
        const contenido11 =
            JSON.parse(data);
        console.log(
            "Contenido parseado:",
            contenido11
        );
        const titulo_contenido_11 =
            document.getElementById(
                "titulo_contenido_11"
            );
        const descripcion_contenido_11 =
            document.getElementById(
                "descripcion_contenido_11"
            );
        if (
            titulo_contenido_11 &&
            contenido11.titulo
        ) {
            titulo_contenido_11.textContent =
                contenido11.titulo.texto || "";
            Object.assign(
                titulo_contenido_11.style,
                contenido11.titulo.estilos
            );
        }
        if (
            descripcion_contenido_11 &&
            contenido11.descripcion
        ) {
            descripcion_contenido_11.textContent =
                contenido11.descripcion.texto || "";
            Object.assign(
                descripcion_contenido_11.style,
                contenido11.descripcion.estilos
            );
        }
        if (
            previewImagen_contenido_11 &&
            contenido11.imagen
        ) {
            previewImagen_contenido_11.src =
                contenido11.imagen;
            previewImagen_contenido_11.style.display =
                "block";
            if (
                iconoImagen_contenido_11
            ) {
                iconoImagen_contenido_11.style.display =
                    "none";
            }
            if (
                textoImagen_contenido_11
            ) {
                textoImagen_contenido_11.style.display =
                    "none";
            }
        }
    }
    if (
        !zonaImagen_contenido_11 ||
        !inputImagen_contenido_11
    ) return;
    zonaImagen_contenido_11.addEventListener(
        "click",
        () => {
            inputImagen_contenido_11.click();
        }
    );
    inputImagen_contenido_11.addEventListener(
        "change",
        (e) => {
            const archivo_contenido_11 =
                e.target.files[0];
            if (
                !archivo_contenido_11
            ) return;
            const lector_contenido_11 =
                new FileReader();
            lector_contenido_11.onload =
                function(event){
                previewImagen_contenido_11.src =
                    event.target.result;
                previewImagen_contenido_11.style.display =
                    "block";
                iconoImagen_contenido_11.style.display =
                    "none";
                textoImagen_contenido_11.style.display =
                    "none";
            };
            lector_contenido_11.readAsDataURL(
                archivo_contenido_11
            );
        }
    );
});
//-----------------------------------------//
//--|funcionalidad_contenido_12_dinamica|--//
//-----------------------------------------//
document.addEventListener("DOMContentLoaded", () => {
    const data = localStorage.getItem(
        "contenido12_nosotros"
    );
    console.log(
        "Datos contenido 12:",
        data
    );
    if (data) {
        const contenido12 =
            JSON.parse(data);
        const titulo_contenido_12 =
            document.getElementById(
                "titulo_contenido_12"
            );
        const descripcion_contenido_12 =
            document.getElementById(
                "descripcion_contenido_12"
            );
        if (
            titulo_contenido_12 &&
            contenido12.titulo
        ) {
            titulo_contenido_12.textContent =
                contenido12.titulo.texto || "";
            Object.assign(
                titulo_contenido_12.style,
                contenido12.titulo.estilos
            );
        }
        if (
            descripcion_contenido_12 &&
            contenido12.descripcion
        ) {
            descripcion_contenido_12.textContent =
                contenido12.descripcion.texto || "";
            Object.assign(
                descripcion_contenido_12.style,
                contenido12.descripcion.estilos
            );
        }
        const previewImagenPrincipal_contenido_12 =
            document.getElementById(
                "preview_imagen_principal_contenido_12"
            );
        const iconoImagenPrincipal_contenido_12 =
            document.getElementById(
                "icono_imagen_principal_contenido_12"
            );
        const textoImagenPrincipal_contenido_12 =
            document.getElementById(
                "texto_imagen_principal_contenido_12"
            );
        if (
            previewImagenPrincipal_contenido_12 &&
            contenido12.imagenPrincipal
        ) {
            previewImagenPrincipal_contenido_12.src =
                contenido12.imagenPrincipal;
            previewImagenPrincipal_contenido_12.style.display =
                "block";
            if (
                iconoImagenPrincipal_contenido_12
            ) {
                iconoImagenPrincipal_contenido_12.style.display =
                    "none";
            }
            if (
                textoImagenPrincipal_contenido_12
            ) {
                textoImagenPrincipal_contenido_12.style.display =
                    "none";
            }
        }
        const tarjetas =
            document.querySelectorAll(
                ".tarjeta_contenido_12"
            );
        contenido12.tarjetas.forEach(
            (tarjeta, index) => {
                const tarjetaHTML =
                    tarjetas[index];
                if (!tarjetaHTML) return;
                const preview =
                    tarjetaHTML.querySelector(
                        ".preview_secundario_contenido_12"
                    );
                const icono =
                    tarjetaHTML.querySelector(
                        ".icono_secundario_contenido_12"
                    );
                const texto =
                    tarjetaHTML.querySelector(
                        ".texto_secundario_contenido_12"
                    );
                if (
                    preview &&
                    tarjeta.imagen
                ) {
                    preview.src =
                        tarjeta.imagen;
                    preview.style.display =
                        "block";
                    if (icono) {
                        icono.style.display =
                            "none";
                    }
                    if (texto) {
                        texto.style.display =
                            "none";
                    }
                }
                const subtitulo =
                    tarjetaHTML.querySelector(
                        ".subtitulo_contenido_12"
                    );
                if (
                    subtitulo &&
                    tarjeta.subtitulo
                ) {
                    subtitulo.textContent =
                        tarjeta.subtitulo.texto || "";
                    Object.assign(
                        subtitulo.style,
                        tarjeta.subtitulo.estilos
                    );
                }
                const descripcion =
                    tarjetaHTML.querySelector(
                        ".descripcion_secundaria_contenido_12"
                    );
                if (
                    descripcion &&
                    tarjeta.descripcion
                ) {
                    descripcion.textContent =
                        tarjeta.descripcion.texto || "";
                    Object.assign(
                        descripcion.style,
                        tarjeta.descripcion.estilos
                    );
                }
            }
        );
    }
    const zonaImagenPrincipal_contenido_12 = document.getElementById("zona_imagen_principal_contenido_12");
    const inputImagenPrincipal_contenido_12 = document.getElementById("input_imagen_principal_contenido_12");
    const iconoImagenPrincipal_contenido_12 = document.getElementById("icono_imagen_principal_contenido_12");
    const textoImagenPrincipal_contenido_12 = document.getElementById("texto_imagen_principal_contenido_12");
    const previewImagenPrincipal_contenido_12 = document.getElementById("preview_imagen_principal_contenido_12");
    if (!zonaImagenPrincipal_contenido_12 || !inputImagenPrincipal_contenido_12) return;
    zonaImagenPrincipal_contenido_12.addEventListener("click", () => {
        inputImagenPrincipal_contenido_12.click();
    });
    inputImagenPrincipal_contenido_12.addEventListener("change", (e) => {
        const archivo_contenido_12 = e.target.files[0];
        if (!archivo_contenido_12) return;
        const lector_contenido_12 = new FileReader();
        lector_contenido_12.onload = function (event) {
            previewImagenPrincipal_contenido_12.src = event.target.result;
            previewImagenPrincipal_contenido_12.style.display = "block";
            iconoImagenPrincipal_contenido_12.style.display = "none";
            textoImagenPrincipal_contenido_12.style.display = "none";
        };
        lector_contenido_12.readAsDataURL(archivo_contenido_12);
    });
    function activarImagenSecundaria_contenido_12(zonaId, inputId, previewId) {
        const zona_contenido_12 = document.getElementById(zonaId);
        const input_contenido_12 = document.getElementById(inputId);
        const preview_contenido_12 = document.getElementById(previewId);
        if (!zona_contenido_12 || !input_contenido_12 || !preview_contenido_12) return;
        const icono_contenido_12 = zona_contenido_12.querySelector("i");
        const texto_contenido_12 = zona_contenido_12.querySelector("p");
        zona_contenido_12.addEventListener("click", () => {
            input_contenido_12.click();
        });
        input_contenido_12.addEventListener("change", (e) => {
            const archivo_contenido_12 = e.target.files[0];
            if (!archivo_contenido_12) return;
            const lector_contenido_12 = new FileReader();
            lector_contenido_12.onload = function (event) {
                preview_contenido_12.src = event.target.result;
                preview_contenido_12.style.display = "block";
                if (icono_contenido_12) {
                    icono_contenido_12.style.display = "none";
                }
                if (texto_contenido_12) {
                    texto_contenido_12.style.display = "none";
                }
            };
            lector_contenido_12.readAsDataURL(archivo_contenido_12);
        });
    }
    activarImagenSecundaria_contenido_12(
        "zona_imagen_1_contenido_12",
        "input_imagen_1_contenido_12",
        "preview_imagen_1_contenido_12"
    );
    activarImagenSecundaria_contenido_12(
        "zona_imagen_2_contenido_12",
        "input_imagen_2_contenido_12",
        "preview_imagen_2_contenido_12"
    );
    activarImagenSecundaria_contenido_12(
        "zona_imagen_3_contenido_12",
        "input_imagen_3_contenido_12",
        "preview_imagen_3_contenido_12"
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