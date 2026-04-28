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
    { nombre: "Inicio" },
    { nombre: "Nosotros" },
    { nombre: "Categorias" },
    { nombre: "Contacto" }
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
    inicio: "inicio",
    nosotros: "nosotros",
    categorias: "categorias",
    contacto: "contacto",
    contactanos: "contacto"
};
const vistas = {
    inicio: `
        <!------------------------------->
        <!--|este espacio estara vacio|-->
        <!------------------------------->
    `,
    nosotros: `
        <section class="vista nosotros">
            <h1>Sobre Nosotros</h1>
            <p>Somos una tienda moderna enfocada en calidad y estilo.</p>
        </section>
    `,
    categorias: `
        <section class="vista categorias">
            <h1>Categorías</h1>
            <p>Aquí puedes explorar todas nuestras categorías disponibles.</p>
        </section>
    `,
    contacto: `
        <section class="vista contacto">
            <h1>📞 Contáctanos</h1>
            <form>
                <input type="text" placeholder="Nombre">
                <input type="email" placeholder="Correo">
                <button>Enviar</button>
            </form>
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
        if (clave === "inicio") {
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
    const clavesBase = ["inicio", "nosotros", "categorias", "contacto"];
    lista.forEach((opcion, index) => {
        const li = document.createElement("li");
        let nombre = opcion.nombre || opcion;
        const clave = clavesBase[index] || "inicio";
        li.textContent = nombre;
        li.addEventListener("click", () => {
            cargarVista(clave);
        });
        contenedorMenu.appendChild(li);
    });
}
window.addEventListener("popstate", () => {
    const vista = location.hash.replace("#", "").trim().toLowerCase() || "inicio";
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
const vistaInicial = location.hash.replace("#", "").trim().toLowerCase() || "inicio";
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
const titulo = document.getElementById("tituloContenido");
const btnVerMas = document.getElementById("btnVerMas");
const contenedorTarjetas = document.getElementById("contenedorTarjetas");
function cambiarTitulo(nuevoTitulo) {
    titulo.textContent = nuevoTitulo;
}
btnVerMas.addEventListener("click", () => {
    alert("Botón 'Ver más' funcionando");
});
function crearTarjeta(texto) {
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("tarjeta");
    tarjeta.innerHTML = `
        <div class="imagen">
            <span>Imagen dinámica</span>
        </div>
        <div class="subtitulo">${texto}</div>
    `;
    contenedorTarjetas.appendChild(tarjeta);
}
cambiarTitulo("Productos destacados");
//----------------------------------------//
//--|funcionalidad_contenido_2_dinamica|--//
//----------------------------------------//
const titulo2 = document.getElementById("tituloContenido2");
const imagen2 = document.querySelector(".imagen2");
function cambiarTitulo2(texto) {
    titulo2.textContent = texto;
}
function cambiarImagenTexto(texto) {
    imagen2.innerHTML = `<span>${texto}</span>`;
}
cambiarTitulo2("Producto destacado");
cambiarImagenTexto("Nueva imagen dinámica");
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