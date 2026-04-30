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
const contenedorPrincipal = document.getElementById("contenido-principal");
document.addEventListener("DOMContentLoaded", () => {
    contenedorPrincipal.innerHTML = "";
});
const seccionesEstaticas = document.querySelectorAll(".seccion-estatica");
function ocultarEstaticos() {
    seccionesEstaticas.forEach(el => el.style.display = "none");
}
function mostrarEstaticos() {
    seccionesEstaticas.forEach(el => el.style.display = "block");
}
const mapaVistas = {
    "opción 1": "opcion1",
    "opción 2": "opcion2",
    "opción 3": "opcion3",
    "opción 4": "opcion4"
};
const vistas = {
    opcion1: `
        <!------------------------------->
        <!--|este espacio estara vacio|-->
        <!------------------------------->
    `,
    opcion2: `
        <section class="vista">
            <h1>Contenido Opción 2</h1>
            <p>Este es el contenido que antes era "Nosotros".</p>
        </section>
    `,
    opcion3: `
        <section class="vista">
            <h1>Contenido Opción 3</h1>
            <p>Este es el contenido que antes era "Categorías".</p>
        </section>
    `,
    opcion4: `
        <section class="vista">
            <h1>Contenido Opción 4</h1>
            <p>Este es el contenido que antes era "Contacto".</p>
        </section>
    `
};
function cargarVista(nombre) {
    const claveRaw = nombre.trim().toLowerCase();
    const clave = mapaVistas[claveRaw] || claveRaw;
    if (vistas[clave]) {
        contenedorPrincipal.style.opacity = 0;
        setTimeout(() => {
            contenedorPrincipal.innerHTML = vistas[clave];
            contenedorPrincipal.style.opacity = 1;
        }, 150);
        if (clave === "opcion1") {
            mostrarEstaticos();
        } else {
            ocultarEstaticos();
        }
        history.pushState({}, "", "#" + clave);
    } else {
        console.warn("No existe vista para:", clave);
        contenedorPrincipal.innerHTML = "<h1>Sección no encontrada</h1>";
    }
}
function crearMenu(lista) {
    contenedorMenu.innerHTML = "";
    const clavesBase = ["opcion1", "opcion2", "opcion3", "opcion4"];
    lista.forEach((opcion, index) => {
        const li = document.createElement("li");
        let nombre = opcion.nombre || opcion;
        const clave = clavesBase[index] || "opcion1";
        li.textContent = nombre;
        li.addEventListener("click", () => {
            cargarVista(clave);
        });
        contenedorMenu.appendChild(li);
    });
}
window.addEventListener("popstate", () => {
    const vista = location.hash.replace("#", "").trim().toLowerCase() || "opcion1";
    cargarVista(vista);
});
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
const vistaInicial = location.hash.replace("#", "").trim().toLowerCase() || "opcion1";
cargarVista(vistaInicial);
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
        <div class="subtitulo1">${texto}</div>
    `;
    contenedorTarjetas1.appendChild(tarjeta);
}

cambiarTituloContenido1("Productos destacados");
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
//----------------------------------------//
//--|funcionalidad_contenido_8_dinamica|--//
//----------------------------------------//
const contenedor8 = document.getElementById("contenido8");
const imagenes8 = document.querySelectorAll(".imagen8");
function cambiarTextoImagen8(index, texto) {
    if (imagenes8[index]) {
        imagenes8[index].innerHTML = `
            <i class="fas fa-image"></i>
            <p>${texto}</p>
        `;
    }
}
function cargarContenido8(datos) {
    datos.forEach((texto, i) => {
        cambiarTextoImagen8(i, texto);
    });
}
imagenes8.forEach((img, index) => {
    img.addEventListener("click", () => {
        alert("Hiciste click en la imagen " + (index + 1));
    });
});
cargarContenido8([
    "Imagen 1 dinámica",
    "Imagen 2 dinámica",
    "Imagen 3 dinámica",
    "Imagen 4 dinámica",
    "Imagen 5 dinámica",
    "Imagen 6 dinámica",
    "Imagen 7 dinámica"
]);
//----------------------------------------//
//--|funcionalidad_contenido_9_dinamica|--//
//----------------------------------------//
const contenedor9 = document.getElementById("contenido9");
const imagenPrincipal9 = document.querySelector(".contenido9-imagen-principal");
const imagenes9 = document.querySelectorAll(".imagen9");
const subtitulos9 = document.querySelectorAll(".subtitulo9");
function cambiarImagenPrincipal9(texto) {
    imagenPrincipal9.innerHTML = `
        <i class="fas fa-image"></i>
        <p>${texto}</p>
    `;
}
function cambiarImagenes9(datos) {
    datos.forEach((texto, i) => {
        if (imagenes9[i]) {
            imagenes9[i].innerHTML = `
                <i class="fas fa-image"></i>
                <p>${texto}</p>
            `;
        }
    });
}
function cambiarSubtitulos9(datos) {
    datos.forEach((texto, i) => {
        if (subtitulos9[i]) {
            subtitulos9[i].textContent = texto;
        }
    });
}
imagenes9.forEach((img, index) => {
    img.addEventListener("click", () => {
        alert("Click en imagen secundaria " + (index + 1));
    });
});
imagenPrincipal9.addEventListener("click", () => {
    alert("Click en imagen principal");
});
function cargarContenido9(data) {
    if (!data) return;
    cambiarImagenPrincipal9(data.principal);
    cambiarImagenes9(data.imagenes);
    cambiarSubtitulos9(data.subtitulos);
}
const dataEjemplo9 = {
    principal: "Imagen principal dinámica",
    imagenes: [
        "Imagen 1",
        "Imagen 2",
        "Imagen 3"
    ],
    subtitulos: [
        "Subtítulo 1",
        "Subtítulo 2",
        "Subtítulo 3"
    ]
};
cargarContenido9(dataEjemplo9);
//-----------------------------------------//
//--|funcionalidad_contenido_10_dinamica|--//
//-----------------------------------------//
const tituloContenido10 = document.getElementById("titulo10");
tituloContenido10.addEventListener("input", () => { 
    console.log("Título:", tituloContenido10.value);
});
for (let i = 1; i <= 6; i++) {
    const card = document.getElementById("card" + i + "10");
    card.addEventListener("click", () => { 
        alert("Hiciste click en la card " + i);
    });
}
//------------------------------------//
//--|funcionalidad_chatbot_dinamica|--//
//------------------------------------//
const preguntasPorDefecto9 = {
    inicio: {
        texto: "¿En qué podemos ayudarte?",
        opciones: []
    }
};
const datos = localStorage.getItem("chatbotFinal");
let preguntas9 = {};
if (datos) {
    try {
        preguntas9 = JSON.parse(datos);
    } catch (error) {
        console.error("Error al parsear datos:", error);
        preguntas9 = preguntasPorDefecto9;
    }
} else {
    console.warn("No hay datos del chatbot, usando fallback");
    preguntas9 = preguntasPorDefecto9;
}
const chatToggle9 = document.getElementById("chatToggle9");
const chatbot9 = document.getElementById("chatbot9");
const preguntaElemento9 = document.getElementById("pregunta9");
const respuestasContenedor9 = document.getElementById("respuestas9");
chatToggle9.addEventListener("click", () => {
    chatbot9.classList.toggle("hidden9");
});
function obtenerNodoInicial(flujo) {
    const claves = Object.keys(flujo);
    if (claves.length === 0) return null;
    if (flujo["inicio"]) return "inicio";
    return claves[0];
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
    if (!pregunta.opciones || pregunta.opciones.length === 0) {
        return;
    }
    pregunta.opciones.forEach(opcion => {
        const btn = document.createElement("button");
        btn.textContent = opcion.texto || "Opción";
        btn.addEventListener("click", () => {
            cargarPregunta9(opcion.siguiente);
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
const opciones = document.querySelectorAll(".opcion");
opciones.forEach(opcion => {
    opcion.addEventListener("click", () => {
        alert("Has hecho clic en: " + opcion.textContent);
    });
});
function cambiarTitulo(texto) {
    document.getElementById("texto-titulo").textContent = texto;
}
function cambiarMarca(texto) {
    document.getElementById("texto-marca").textContent = texto;
}
document.addEventListener("DOMContentLoaded", () => {
    const data = JSON.parse(localStorage.getItem("footerData"));
    if (!data) return;
    cambiarTitulo(data.titulo);
    cambiarMarca(data.marca);
    if (data.imagen) {
        document.getElementById("img-footer").src = data.imagen;
        document.getElementById("texto-imagen").style.display = "none";
    }
    data.subtitulos.forEach((sub, i) => {
        const elemento = document.getElementById(`subtitulo-${i + 1}`);
        if (elemento) {
            elemento.textContent = sub;
        }
    });
    const columnas = document.querySelectorAll(".footer-columna");
    let indexOpcion = 0;
    columnas.forEach(columna => {
        columna.querySelectorAll(".opcion").forEach(op => {
            if (data.opciones[indexOpcion]) {
                op.textContent = data.opciones[indexOpcion];
                indexOpcion++;
            } else {
                op.style.display = "none";
            }
        });
    });
});