//-----------------------------------------//
//--|funcionalidad_titular_del_sitio_web|--//
//-----------------------------------------//
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
//--|funcionalidad_dinamica_menu_de_navegacion|--//
//-----------------------------------------------//
const opcionesMenu = [
    { nombre: "Inicio", enlace: "#" },
    { nombre: "Hombre", enlace: "#" },
    { nombre: "Mujer", enlace: "#" },
    { nombre: "Niños", enlace: "#" },
    { nombre: "Ofertas", enlace: "#" },
    { nombre: "Contacto", enlace: "#" }
];
const contenedorMenu = document.getElementById("opciones-menu");
const data = JSON.parse(localStorage.getItem("menuNavegacion"));
function crearMenu(lista) {
    contenedorMenu.innerHTML = "";
    lista.forEach(opcion => {
        const li = document.createElement("li");
        li.textContent = opcion.nombre || opcion;
        li.addEventListener("click", () => {
            console.log("Click en:", opcion.nombre || opcion);
        });
        contenedorMenu.appendChild(li);
    });
}
if (data) {
    document.getElementById("titulo-menu").textContent = data.nombre;
    if (data.logo) {
        document.getElementById("logo-menu").src = data.logo;
    }
    crearMenu(data.opciones);
    document.getElementById("busqueda-container").style.display =
        data.elementos.busqueda ? "flex" : "none";
    document.getElementById("icono-perfil").style.display =
        data.elementos.perfil ? "inline-block" : "none";
    document.getElementById("icono-notificaciones").style.display =
        data.elementos.notificaciones ? "inline-block" : "none";
    document.getElementById("icono-carrito").style.display =
        data.elementos.carrito ? "inline-block" : "none";
} else {
    console.warn("No hay datos del menú, usando menú por defecto");
    crearMenu(opcionesMenu);
}
//-------------------------------------//
//--|funcionalidad_dinamica_carrusel|--//
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
//------------------------------------//
//--|funcionalidad_dinamica_chatbot|--//
//------------------------------------//
// 🔥 CHATBOT POR DEFECTO
const preguntasPorDefecto9 = {
    inicio: {
        texto: "¿En qué podemos ayudarte?",
        opciones: []
    }
};

//------------------------------------//
//--|CARGAR DATOS DESDE LOCALSTORAGE|--//
//------------------------------------//
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

//--------------------------------//
// ELEMENTOS
//--------------------------------//
const chatToggle9 = document.getElementById("chatToggle9");
const chatbot9 = document.getElementById("chatbot9");
const preguntaElemento9 = document.getElementById("pregunta9");
const respuestasContenedor9 = document.getElementById("respuestas9");

//--------------------------------//
// ABRIR / CERRAR
//--------------------------------//
chatToggle9.addEventListener("click", () => {
    chatbot9.classList.toggle("hidden9");
});

//--------------------------------//
// 🔥 DETECTAR NODO INICIAL AUTOMÁTICO
//--------------------------------//
function obtenerNodoInicial(flujo) {
    const claves = Object.keys(flujo);

    if (claves.length === 0) return null;

    // 1. Si existe "inicio", usarlo
    if (flujo["inicio"]) return "inicio";

    // 2. Si no, usar el primer nodo creado
    return claves[0];
}

//--------------------------------//
// 🔥 RENDER DINÁMICO ROBUSTO
//--------------------------------//
function cargarPregunta9(clave) {
    const pregunta = preguntas9[clave];

    if (!pregunta) {
        preguntaElemento9.textContent = "⚠️ Nodo no encontrado";
        respuestasContenedor9.innerHTML = "";
        return;
    }

    preguntaElemento9.textContent = pregunta.texto || "Sin texto";
    respuestasContenedor9.innerHTML = "";

    // si no hay opciones
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

//--------------------------------//
// 🔥 INICIAR CORRECTAMENTE
//--------------------------------//
const nodoInicial = obtenerNodoInicial(preguntas9);

if (nodoInicial) {
    cargarPregunta9(nodoInicial);
} else {
    preguntaElemento9.textContent = "No hay flujo disponible";
}