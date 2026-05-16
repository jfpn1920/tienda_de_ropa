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
//-----------------------------------------//
//--|funcionalidad_contenido_13_dinamica|--//
//-----------------------------------------//
document.addEventListener("DOMContentLoaded", () => {
    const zonaImagenPrincipal_contenido_13 =
        document.getElementById(
            "zona_imagen_principal_contenido_13"
        );
    const inputImagenPrincipal_contenido_13 =
        document.getElementById(
            "input_imagen_principal_contenido_13"
        );
    const iconoImagenPrincipal_contenido_13 =
        document.getElementById(
            "icono_imagen_principal_contenido_13"
        );
    const textoImagenPrincipal_contenido_13 =
        document.getElementById(
            "texto_imagen_principal_contenido_13"
        );
    const previewImagenPrincipal_contenido_13 =
        document.getElementById(
            "preview_imagen_principal_contenido_13"
        );
    if (
        zonaImagenPrincipal_contenido_13 &&
        inputImagenPrincipal_contenido_13
    ) {
        zonaImagenPrincipal_contenido_13
        .addEventListener(
            "click",
            () => {
                inputImagenPrincipal_contenido_13.click();
            }
        );
        inputImagenPrincipal_contenido_13
        .addEventListener(
            "change",
            (e) => {
                const archivo_contenido_13 =
                    e.target.files[0];
                if (!archivo_contenido_13) return;
                const lector_contenido_13 =
                    new FileReader();
                lector_contenido_13.onload =
                    function(event){
                    previewImagenPrincipal_contenido_13.src =
                        event.target.result;
                    previewImagenPrincipal_contenido_13.style.display =
                        "block";
                    iconoImagenPrincipal_contenido_13.style.display =
                        "none";
                    textoImagenPrincipal_contenido_13.style.display =
                        "none";
                };
                lector_contenido_13.readAsDataURL(
                    archivo_contenido_13
                );
            }
        );
    }
    function activarImagen_contenido_13(
        zonaId,
        inputId,
        previewId
    ){
        const zona_contenido_13 =
            document.getElementById(
                zonaId
            );
        const input_contenido_13 =
            document.getElementById(
                inputId
            );
        const preview_contenido_13 =
            document.getElementById(
                previewId
            );
        if (
            !zona_contenido_13 ||
            !input_contenido_13 ||
            !preview_contenido_13
        ) return;
        const icono_contenido_13 =
            zona_contenido_13.querySelector(
                "i"
            );
        const texto_contenido_13 =
            zona_contenido_13.querySelector(
                "p"
            );
        zona_contenido_13.addEventListener(
            "click",
            () => {
                input_contenido_13.click();
            }
        );
        input_contenido_13.addEventListener(
            "change",
            (e) => {
                const archivo_contenido_13 =
                    e.target.files[0];
                if (!archivo_contenido_13) return;
                const lector_contenido_13 =
                    new FileReader();
                lector_contenido_13.onload =
                    function(event){
                    preview_contenido_13.src =
                        event.target.result;
                    preview_contenido_13.style.display =
                        "block";
                    icono_contenido_13.style.display =
                        "none";
                    texto_contenido_13.style.display =
                        "none";
                };
                lector_contenido_13.readAsDataURL(
                    archivo_contenido_13
                );
            }
        );
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
    const data_contenido_13 =
        localStorage.getItem(
            "contenido13_contactanos"
        );
    console.log(
        "Datos contenido 13:",
        data_contenido_13
    );
    if (data_contenido_13) {
        const contenido13 =
            JSON.parse(
                data_contenido_13
            );
        console.log(
            "Contenido 13 parseado:",
            contenido13
        );
        const titulo_contenido_13 =
            document.getElementById(
                "titulo_contenido_13"
            );
        if (
            titulo_contenido_13 &&
            contenido13.titulo
        ) {
            titulo_contenido_13.textContent =
                contenido13.titulo.texto || "";
            Object.assign(
                titulo_contenido_13.style,
                contenido13.titulo.estilos
            );
        }
        const descripcionPrincipal_contenido_13 =
            document.getElementById(
                "descripcion_principal_contenido_13"
            );
        if (
            descripcionPrincipal_contenido_13 &&
            contenido13.descripcionPrincipal
        ) {
            descripcionPrincipal_contenido_13.textContent =
                contenido13.descripcionPrincipal.texto || "";
            Object.assign(
                descripcionPrincipal_contenido_13.style,
                contenido13.descripcionPrincipal.estilos
            );
        }
        if (
            contenido13.imagenPrincipal
        ) {
            previewImagenPrincipal_contenido_13.src =
                contenido13.imagenPrincipal;
            previewImagenPrincipal_contenido_13.style.display =
                "block";
            iconoImagenPrincipal_contenido_13.style.display =
                "none";
            textoImagenPrincipal_contenido_13.style.display =
                "none";
        }
        const tarjetasHTML =
            document.querySelectorAll(
                ".tarjeta_contenido_13"
            );
        contenido13.tarjetas.forEach(
            (tarjeta, index) => {
                const tarjetaHTML =
                    tarjetasHTML[index];
                if (!tarjetaHTML) return;
                const preview =
                    tarjetaHTML.querySelector(
                        ".preview_imagen_contenido_13"
                    );
                const icono =
                    tarjetaHTML.querySelector(
                        ".icono_imagen_contenido_13"
                    );
                const texto =
                    tarjetaHTML.querySelector(
                        ".texto_imagen_contenido_13"
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
                        ".subtitulo_contenido_13"
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
                        ".descripcion_secundaria_contenido_13"
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
    if(
        !zona_contenido_14 ||
        !input_contenido_14
    ) return;
    const icono_contenido_14 =
        zona_contenido_14.querySelector("i");
    const texto_contenido_14 =
        zona_contenido_14.querySelector("p");
    zona_contenido_14.addEventListener(
        "click",
        () => {
            input_contenido_14.click();
        }
    );
    input_contenido_14.addEventListener(
        "change",
        (e) => {
            const archivo_contenido_14 =
                e.target.files[0];
            if (!archivo_contenido_14) return;
            const lector_contenido_14 =
                new FileReader();
            lector_contenido_14.onload =
                function(event){
                zona_contenido_14.style.backgroundImage =
                    `url(${event.target.result})`;
                zona_contenido_14.style.backgroundSize =
                    "cover";
                zona_contenido_14.style.backgroundPosition =
                    "center";
                zona_contenido_14.style.backgroundRepeat =
                    "no-repeat";
                if (icono_contenido_14) {
                    icono_contenido_14.style.display =
                        "none";
                }
                if (texto_contenido_14) {
                    texto_contenido_14.style.display =
                        "none";
                }
            };
            lector_contenido_14.readAsDataURL(
                archivo_contenido_14
            );
        }
    );
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
const data_contenido_14 =
    localStorage.getItem(
        "contenido14_contactanos"
    );
console.log(
    "Datos contenido 14:",
    data_contenido_14
);
if (data_contenido_14) {
    const contenido14 =
        JSON.parse(
            data_contenido_14
        );
    console.log(
        "Contenido 14 parseado:",
        contenido14
    );
    const titulo_contenido_14 =
        document.getElementById(
            "titulo_contenido_14"
        );
    if (
        titulo_contenido_14 &&
        contenido14.titulo
    ) {
        titulo_contenido_14.textContent =
            contenido14.titulo.texto || "";
        Object.assign(
            titulo_contenido_14.style,
            contenido14.titulo.estilos
        );
    }
    const tarjetasHTML =
        document.querySelectorAll(
            ".tarjeta_contenido_14"
        );
    contenido14.tarjetas.forEach(
        (tarjeta, index) => {
            const tarjetaHTML =
                tarjetasHTML[index];
            if (!tarjetaHTML) return;
            const zonaImagen =
                tarjetaHTML.querySelector(
                    ".zona_imagen_contenido_14"
                );
            const icono =
                tarjetaHTML.querySelector(
                    ".icono_imagen_contenido_14"
                );
            const texto =
                tarjetaHTML.querySelector(
                    ".texto_imagen_contenido_14"
                );
            if (
                zonaImagen &&
                tarjeta.imagen
            ) {
                zonaImagen.style.backgroundImage =
                    `url(${tarjeta.imagen})`;
                zonaImagen.style.backgroundSize =
                    "cover";
                zonaImagen.style.backgroundPosition =
                    "center";
                zonaImagen.style.backgroundRepeat =
                    "no-repeat";
                if (icono) {
                    icono.style.display =
                        "none";
                }
                if (texto) {
                    texto.style.display =
                        "none";
                }
            }
            const descripcion =
                tarjetaHTML.querySelector(
                    ".descripcion_contenido_14"
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
            const subtitulo =
                tarjetaHTML.querySelector(
                    ".subtitulo_contenido_14"
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
        }
    );
}
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
    const data =
        localStorage.getItem(
            "contenido6_contactanos"
        );
    if (!data) {
        return;
    }
    const contenido =
        JSON.parse(data);
    const titulo =
        document.querySelector(
            ".contenido_6-titulo"
        );
    if (
        titulo &&
        contenido.titulo
    ) {
        titulo.textContent =
            contenido.titulo.texto;
        Object.assign(
            titulo.style,
            contenido.titulo.estilos
        );
    }
    const boxImagen =
        document.getElementById(
            "contenido_6_imagen_box"
        );
    if (
        boxImagen &&
        contenido.imagen
    ) {
        boxImagen.innerHTML = `
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
    const subtituloIzq =
        document.querySelector(
            ".contenido_6-campo-parte-2"
        );
    if (
        subtituloIzq &&
        contenido.subtituloIzquierdo
    ) {
        subtituloIzq.textContent =
            contenido
            .subtituloIzquierdo
            .texto;
        Object.assign(
            subtituloIzq.style,
            contenido
            .subtituloIzquierdo
            .estilos
        );
    }
    const descripcion =
        document.querySelector(
            ".contenido_6-descripcion"
        );
    if (
        descripcion &&
        contenido.descripcion
    ) {
        descripcion.textContent =
            contenido
            .descripcion
            .texto;
        Object.assign(
            descripcion.style,
            contenido
            .descripcion
            .estilos
        );
    }
    const subtituloDer =
        document.querySelector(
            ".contenido_6-subtitulo"
        );
    if (
        subtituloDer &&
        contenido.subtituloDerecho
    ) {
        subtituloDer.textContent =
            contenido
            .subtituloDerecho
            .texto;
        Object.assign(
            subtituloDer.style,
            contenido
            .subtituloDerecho
            .estilos
        );
    }
    const items =
        document.querySelectorAll(
            "#contenido_6_lista .contenido_6-item"
        );
    if (
        contenido.lista
    ) {
        const items =
            document.querySelectorAll(
                "#contenido_6_lista .contenido_6-item"
            );
        contenido.lista.forEach(
            (item, index) => {
                const campo =
                    items[index]
                    ?.querySelector(
                        ".contenido_6-campo"
                    );
                if (campo) {
                    campo.textContent =
                        item.texto || "";
                    Object.assign(
                        campo.style,
                        item.estilos || {}
                    );
                }
            }
        );
    }
    console.log(
        "Contenido 6 cargado correctamente"
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