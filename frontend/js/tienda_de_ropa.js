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
//-------------------------------------//
//--|funcionalidad_carrusel_dinamica|--//
//-------------------------------------//
document.addEventListener("DOMContentLoaded", () => {
    const slider = document.getElementById("slider");
    const btnNext = document.getElementById("next-slide");
    const btnPrev = document.getElementById("prev-slide");
    const indicatorsContainer = document.getElementById("indicators");
    let index = 0;
    const data = JSON.parse(localStorage.getItem("carruselData"));
    if (data) {
        slider.innerHTML = "";
        indicatorsContainer.innerHTML = "";
        data.imagenes.forEach((imgSrc, i) => {
            const slide = document.createElement("div");
            slide.classList.add("slide");
            if (i === 0) slide.classList.add("active");
            const img = document.createElement("img");
            img.src = imgSrc;
            slide.appendChild(img);
            slider.appendChild(slide);
            if (data.indicadores) {
                const dot = document.createElement("span");
                dot.classList.add("indicator");
                if (i === 0) dot.classList.add("active");
                dot.addEventListener("click", () => {
                    index = i;
                    actualizarCarrusel();
                });
                indicatorsContainer.appendChild(dot);
            }
        });
        if (!data.controladores) {
            btnNext.style.display = "none";
            btnPrev.style.display = "none";
        }
    }
    let slides = document.querySelectorAll(".slide");
    function actualizarCarrusel() {
        slider.style.transform = `translateX(-${index * 100}%)`;
        const dots = document.querySelectorAll(".indicator");
        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === index);
        });
    }
    btnNext.addEventListener("click", () => {
        index++;
        if (index >= slides.length) index = 0;
        actualizarCarrusel();
    });
    btnPrev.addEventListener("click", () => {
        index--;
        if (index < 0) index = slides.length - 1;
        actualizarCarrusel();
    });
    let tiempo = 4000;
    let automatico = true;
    if (data) {
        tiempo = data.tiempo;
        automatico = data.automatico;
    }
    if (automatico) {
        setInterval(() => {
            index++;
            if (index >= slides.length) index = 0;
            actualizarCarrusel();
        }, tiempo);
    }
});
//----------------------------------------//
//--|funcionalidad_contenido_1_dinamica|--//
//----------------------------------------//
const tituloContenido1 = document.getElementById("tituloContenido1");
const btnVerMas1 = document.getElementById("btnVerMas1");
const contenedorTarjetas1 = document.getElementById("contenedorTarjetas1");
function cambiarTituloContenido1(nuevoTitulo) {
    tituloContenido1.textContent = nuevoTitulo;
}
btnVerMas1.addEventListener("click", () => {
    alert("Botón 'Ver más' funcionando");
});
function crearTarjeta1(texto) { 
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("tarjeta1");
    tarjeta.innerHTML = `
        <div class="imagen1">
            <span>Imagen dinámica</span>
        </div>
        <div class="subtitulo1">
            ${texto}
        </div>
    `;
    contenedorTarjetas1.appendChild(tarjeta);
}
cambiarTituloContenido1("Productos destacados");
window.addEventListener("DOMContentLoaded", () => {
    function aplicarEstilos(el, estilos) {
        if (!estilos) return;
        el.style.fontSize = estilos.fontSize || "";
        el.style.textAlign = estilos.textAlign || "";
        el.style.fontFamily = estilos.fontFamily || "";
        el.style.fontWeight = estilos.fontWeight || "";
        el.style.fontStyle = estilos.fontStyle || "";
        el.style.textDecoration = estilos.textDecoration || "";
    }
    const keys = Object.keys(localStorage)
        .filter(k => k.startsWith("contenido1_"));
    keys.forEach(key => {
        const data = JSON.parse(localStorage.getItem(key));
        if (!data) return;
        if (data.titulo && tituloContenido1) {
            cambiarTituloContenido1(data.titulo.texto || "");
            aplicarEstilos(
                tituloContenido1,
                data.titulo.estilos
            );
        }
        if (data.tarjetas && contenedorTarjetas1) {
            contenedorTarjetas1.innerHTML = "";
            data.tarjetas.forEach(item => {
                const tarjeta = document.createElement("div");
                tarjeta.classList.add("tarjeta1");
                const subtituloHTML = document.createElement("div");
                subtituloHTML.classList.add("subtitulo1");
                subtituloHTML.textContent =
                    item.subtitulo?.texto || "Sin subtítulo";
                aplicarEstilos(
                    subtituloHTML,
                    item.subtitulo?.estilos
                );
                tarjeta.innerHTML = `
                    <div class="imagen1">
                        ${
                            item.imagen
                            ? `
                                <img 
                                    src="${item.imagen}" 
                                    style="
                                        width:100%;
                                        height:100%;
                                        object-fit:cover;
                                    "
                                >
                            `
                            : `<span>Imagen dinámica</span>`
                        }
                    </div>
                `;
                tarjeta.appendChild(subtituloHTML);
                contenedorTarjetas1.appendChild(tarjeta);
            });
        }
    });
});
//----------------------------------------//
//--|funcionalidad_contenido_3_dinamica|--//
//----------------------------------------//
const tituloContenido3 = document.getElementById("tituloContenido3"); 
const imagenContenido3 = document.querySelector(".imagen3");
function cambiarTituloContenido3(texto) { 
    tituloContenido3.textContent = texto;
}
function cambiarImagenTexto3(texto) { 
    imagenContenido3.innerHTML = `<span>${texto}</span>`;
}
cambiarTituloContenido3("Producto destacado"); 
cambiarImagenTexto3("Nueva imagen dinámica");
window.addEventListener("DOMContentLoaded", () => {
    function aplicarEstilos(el, estilos) {
        if (!estilos) return;
        el.style.fontSize = estilos.fontSize || "";
        el.style.textAlign = estilos.textAlign || "";
        el.style.fontFamily = estilos.fontFamily || "";
        el.style.fontWeight = estilos.fontWeight || "";
        el.style.fontStyle = estilos.fontStyle || "";
        el.style.textDecoration = estilos.textDecoration || "";
    }
    const keys = Object.keys(localStorage)
        .filter(k => k.startsWith("contenido3_"));
    keys.forEach(key => {
        const data = JSON.parse(localStorage.getItem(key));
        if (!data) return;
        if (tituloContenido3 && data.titulo) {
            cambiarTituloContenido3(
                data.titulo.texto || ""
            );
            aplicarEstilos(
                tituloContenido3,
                data.titulo.estilos
            );
        }
        const contenedorImagen =
            document.querySelector(".imagen3");
        if (contenedorImagen && data.imagen) {
            contenedorImagen.innerHTML = `
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
        else if (contenedorImagen) {
            cambiarImagenTexto3(
                "Sin imagen disponible"
            );
        }
    });
});
//----------------------------------------//
//--|funcionalidad_contenido_8_dinamica|--//
//----------------------------------------//
const contenedor8 = document.getElementById("contenido8");
const imagenes8 = document.querySelectorAll(".imagen8");
function aplicarEstilos(el, estilos) {
    if (!estilos) return;
    el.style.fontSize = estilos.fontSize || "";
    el.style.textAlign = estilos.textAlign || "";
    el.style.fontFamily = estilos.fontFamily || "";
    el.style.fontWeight = estilos.fontWeight || "";
    el.style.fontStyle = estilos.fontStyle || "";
    el.style.textDecoration = estilos.textDecoration || "";
}
function cargarContenido8() {
    const data = JSON.parse(
        localStorage.getItem("contenido8_principal")
    );
    if (!data) return;
    const titulo =
        document.getElementById("tituloContenido8");
    if (titulo && data.titulo) {
        titulo.textContent =
            data.titulo.texto || "";
        aplicarEstilos(
            titulo,
            data.titulo.estilos
        );
    }
    const imagenes = [
        document.getElementById("img8_1"),
        document.getElementById("img8_2"),
        document.getElementById("img8_3"),
        document.getElementById("img8_4"),
        document.getElementById("img8_5"),
        document.getElementById("img8_6"),
        document.getElementById("img8_7")
    ];
    data.imagenes.forEach((src, i) => {
        if (imagenes[i] && src) {
            imagenes[i].innerHTML = `
                <img 
                    src="${src}" 
                    style="
                        width:100%;
                        height:100%;
                        object-fit:cover;
                    "
                >
            `;
        }
    });
}
imagenes8.forEach((img, index) => {
    img.addEventListener("click", () => {
        alert(
            "Hiciste click en la imagen " +
            (index + 1)
        );
    });
});
document.addEventListener("DOMContentLoaded", () => {
    cargarContenido8();
});
//----------------------------------------//
//--|funcionalidad_contenido_9_dinamica|--//
//----------------------------------------//
const contenedor9 = document.getElementById("contenido9");
const imagenPrincipal9 = document.querySelector(".contenido9-imagen-principal");
const imagenes9 = document.querySelectorAll(".imagen9");
const subtitulos9 = document.querySelectorAll(".subtitulo9");
function aplicarEstilos(el, estilos) {
    if (!estilos) return;
    el.style.fontSize =
        estilos.fontSize || "";
    el.style.textAlign =
        estilos.textAlign || "";
    el.style.fontFamily =
        estilos.fontFamily || "";
    el.style.fontWeight =
        estilos.fontWeight || "";
    el.style.fontStyle =
        estilos.fontStyle || "";
    el.style.textDecoration =
        estilos.textDecoration || "";
}
function cargarContenido9() {
    const data = JSON.parse(
        localStorage.getItem(
            "contenido9_principal"
        )
    );
    if (!data) return;
    const titulo = document.querySelector(".titulo-9");
    if (titulo && data.titulo) {
        titulo.textContent =
            data.titulo.texto || "";
        aplicarEstilos(
            titulo,
            data.titulo.estilos
        );
    }
    if (data.principal) {
        imagenPrincipal9.innerHTML = `
            <img 
                src="${data.principal}" 
                style="
                    width:100%;
                    height:100%;
                    object-fit:cover;
                "
            >
        `;
    }
    data.imagenes.forEach((src, i) => {
        if (imagenes9[i] && src) {
            imagenes9[i].innerHTML = `
                <img 
                    src="${src}" 
                    style="
                        width:100%;
                        height:100%;
                        object-fit:cover;
                    "
                >
            `;
        }
    });
    data.subtitulos.forEach((item, i) => {
        if (subtitulos9[i]) {
            subtitulos9[i].textContent =
                item.texto || "";
            aplicarEstilos(
                subtitulos9[i],
                item.estilos
            );
        }
    });
}
imagenes9.forEach((img, index) => {
    img.addEventListener("click", () => {
        alert(
            "Click en imagen secundaria " +
            (index + 1)
        );
    });
});
imagenPrincipal9.addEventListener("click", () => {
    alert("Click en imagen principal");
});
document.addEventListener("DOMContentLoaded", () => {
    cargarContenido9();
});
//-----------------------------------------//
//--|funcionalidad_contenido_10_dinamica|--//
//-----------------------------------------//
const tituloContenido10 = document.getElementById("titulo10");
if (tituloContenido10) {
    tituloContenido10.addEventListener("click", () => { 
        alert("Título clickeado");
    });
}
for (let i = 1; i <= 6; i++) {
    const card = document.getElementById(
        "card" + i + "10"
    );
    if (card) {
        card.addEventListener("click", () => { 
            alert(
                "Hiciste click en la card " + i
            );
        });
    }
}
function aplicarEstilos(el, estilos) {
    if (!estilos) return;
    el.style.fontSize = estilos.fontSize || "";
    el.style.textAlign = estilos.textAlign || "";
    el.style.fontFamily = estilos.fontFamily || "";
    el.style.fontWeight = estilos.fontWeight || "";
    el.style.fontStyle = estilos.fontStyle || "";
    el.style.textDecoration =
        estilos.textDecoration || "";
}
function cargarContenido10() {
    const destino =
        localStorage.getItem("destino5_valor")
        || "default";
    const data = JSON.parse(
        localStorage.getItem(
            `contenido10_${destino}`
        )
    );
    if (!data) return;
    const titulo =
        document.getElementById("titulo10");
    if (titulo && data.titulo) {
        titulo.textContent =
            data.titulo.texto || "";
        aplicarEstilos(
            titulo,
            data.titulo.estilos
        );
    }
    const cards = [
        "card110","card210","card310",
        "card410","card510","card610"
    ];
    if (data.imagenes) {
        data.imagenes.forEach((src, i) => {
            const card =
                document.getElementById(cards[i]);
            if (card && src) {
                card.innerHTML = `
                    <div class="imagen1010">
                        <img 
                            src="${src}" 
                            style="
                                width:100%;
                                height:100%;
                                object-fit:cover;
                            "
                        >
                    </div>
                `;
            }
        });
    }
    const subtitulos = [
        "sub110","sub210","sub310",
        "sub410","sub510","sub610"
    ];
    if (data.subtitulos) {
        data.subtitulos.forEach((txt, i) => {
            const sub =
                document.getElementById(
                    subtitulos[i]
                );
            if (sub) {
                sub.textContent =
                    txt.texto || "";
                aplicarEstilos(
                    sub,
                    txt.estilos
                );
            }
        });
    }
}
document.addEventListener(
    "DOMContentLoaded",
    () => {
        cargarContenido10();
    }
);
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