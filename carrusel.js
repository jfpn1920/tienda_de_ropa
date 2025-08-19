//------------------------------------//
//--|funcionalidad_menu_hamburguesa|--//
//------------------------------------//
const toggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');
toggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});
//---------------------------------------//
//--|funcionalidad_seleccion_de_imagen|--//
//---------------------------------------//
document.addEventListener("DOMContentLoaded", () => {
    const inputImagen = document.getElementById("inputImagen");
    const btnGuardar = document.getElementById("guardarImagen");
    const listaImagenes = document.getElementById("listaImagenes");
    const btnEliminarTodo = document.getElementById("btnEliminarTodo");
    const btnAgregar = document.getElementById("btnAgregar"); 
    const imagenesGuardadas = JSON.parse(localStorage.getItem("imagenes")) || [];
    if (imagenesGuardadas.length > 0) {
        listaImagenes.innerHTML = "";
        imagenesGuardadas.forEach(src => mostrarImagen(src));
    }
    if (btnGuardar && inputImagen) {
        btnGuardar.addEventListener("click", () => {
            const archivo = inputImagen.files[0];
            if (archivo) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    const src = e.target.result;
                    if (listaImagenes.querySelector("p")) {
                        listaImagenes.innerHTML = "";
                    }
                    mostrarImagen(src);
                    const imagenesGuardadas = JSON.parse(localStorage.getItem("imagenes")) || [];
                    imagenesGuardadas.push(src);
                    localStorage.setItem("imagenes", JSON.stringify(imagenesGuardadas));
                };
                reader.readAsDataURL(archivo);
                inputImagen.value = "";
            } else {
                alert("Por favor selecciona una imagen antes de guardar.");
            }
        });
    }
    if (btnEliminarTodo) {
        btnEliminarTodo.addEventListener("click", function () {
            localStorage.removeItem("imagenes");
            listaImagenes.innerHTML = "<p>(Aquí aparecerán las imágenes)</p>";
            document.querySelector(".carrusel3 .carrusel-imagenes").innerHTML = "";
            alert("Todas las imágenes han sido eliminadas.");
        });
    }
    if (btnAgregar) {
        btnAgregar.addEventListener("click", () => {
            const imagenes = JSON.parse(localStorage.getItem("imagenes")) || [];
            const carruselInner = document.querySelector(".carrusel3 .carrusel-imagenes");
            carruselInner.innerHTML = "";
            imagenes.forEach((src, index) => {
                const img = document.createElement("img");
                img.src = src;
                img.classList.add("imagen-carrusel");
                if (index === 0) img.classList.add("active");
                carruselInner.appendChild(img);
            });
            alert("✅ Imágenes agregadas al carrusel.");
        });
    }
    function mostrarImagen(src) {
        const img = document.createElement("img");
        img.src = src;
        img.style.width = "100px";
        img.style.height = "100px";
        img.style.margin = "10px";
        img.style.objectFit = "cover";
        img.style.border = "1px solid #333";
        img.style.borderRadius = "5px";
        listaImagenes.appendChild(img);
    }
});
//----------------------------------------//
//--|funcionalidad_gestion_de_controles|--//
//----------------------------------------//
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".form-controles");
    const checkFlechas = document.getElementById("check-flechas");
    const btnIzq = document.querySelector(".btn-izq3");
    const btnDer = document.querySelector(".btn-der3");
    const savedConfig = JSON.parse(localStorage.getItem("configControles"));
    if (savedConfig) {
        form.flechas.checked = savedConfig.flechas;
        form.puntos.checked = savedConfig.puntos;
        form.autoplay.checked = savedConfig.autoplay;
        form.intervalo.value = savedConfig.intervalo;
        form.transicion.value = savedConfig.transicion;
        form.velocidad.value = savedConfig.velocidad;
        btnIzq.style.display = savedConfig.flechas ? "block" : "none";
        btnDer.style.display = savedConfig.flechas ? "block" : "none";
    }
    form.addEventListener("submit", (e) => {
        e.preventDefault(); 
        const config = {
            flechas: form.flechas.checked,
            puntos: form.puntos.checked,
            autoplay: form.autoplay.checked,
            intervalo: Number(form.intervalo.value),
            transicion: form.transicion.value,
            velocidad: Number(form.velocidad.value)
        };
        localStorage.setItem("configControles", JSON.stringify(config));
        btnIzq.style.display = config.flechas ? "block" : "none";
        btnDer.style.display = config.flechas ? "block" : "none";
        alert("✅ Configuración guardada con éxito");
    });
});
//---------------------------------//
//--|funcionalidad_agregar_texto|--//
//---------------------------------//
document.addEventListener("DOMContentLoaded", function() {
    const btnAgregar = document.querySelector(".btn-agregar");
    const inputTitulo = document.getElementById("titulo");
    const inputParrafo = document.getElementById("parrafo");
    btnAgregar.addEventListener("click", function() {
        const titulo = inputTitulo.value.trim();
        const parrafo = inputParrafo.value.trim();
        if (titulo && parrafo) {
            alert("✅ Se ha agregado con éxito el título y el párrafo.");
            inputTitulo.value = "";
            inputParrafo.value = "";
        } else {
            alert("⚠️ Debes llenar tanto el título como el párrafo.");
        }
    });
});
//---------------------------------------------//
//--|funcionalidad_visualizacion_de_carrusel|--//
//---------------------------------------------//
const btnCrear = document.querySelector(".botones3 button:nth-child(2)");
const btnEliminar = document.querySelector(".botones3 button:nth-child(1)");
const btnIzq = document.querySelector(".btn-izq3");
const btnDer = document.querySelector(".btn-der3");
const btnInferior = document.querySelector(".btn-inferior3");
const carruselInner = document.querySelector(".carrusel3 .carrusel-imagenes");
const formControles = document.getElementById("form-controles");
const guardarConfig = document.getElementById("guardar-config");
const carrusel = document.querySelector(".carrusel3");
let indice = 0;
let indicadoresContainer = document.createElement("div");
indicadoresContainer.classList.add("indicadores3");
carrusel.appendChild(indicadoresContainer);
btnCrear.addEventListener("click", () => {
    alert("✅ Carrusel creado con éxito");
    aplicarConfiguracion();
});
btnEliminar.addEventListener("click", () => {
    carruselInner.innerHTML = "";
    indicadoresContainer.innerHTML = "";
    alert("🗑️ Carrusel eliminado con éxito");
});
btnIzq.addEventListener("click", () => {
    moverCarrusel(-1);
});
btnDer.addEventListener("click", () => {
    moverCarrusel(1);
});
btnInferior.addEventListener("click", () => {
    alert("⬇️ Navegaste hacia la parte inferior del carrusel");
});
function moverCarrusel(direccion) {
    const imagenes = carruselInner.querySelectorAll(".imagen-carrusel");
    if (imagenes.length === 0) return;
    imagenes[indice].classList.remove("active");
    indice = (indice + direccion + imagenes.length) % imagenes.length;
    imagenes[indice].classList.add("active");
    actualizarIndicadores();
}
if (formControles) {
    formControles.addEventListener("submit", (e) => {
        e.preventDefault();
        const mostrarFlechas = document.getElementById("check-flechas").checked;
        const mostrarPuntos = formControles.querySelector("input[name='puntos']").checked;
        localStorage.setItem("configCarrusel", JSON.stringify({
            mostrarFlechas,
            mostrarPuntos
        }));
        aplicarConfiguracion();
    });
}
function aplicarConfiguracion() {
    const config = JSON.parse(localStorage.getItem("configCarrusel")) || {};
    if (config.mostrarFlechas) {
        btnIzq.style.display = "flex";
        btnDer.style.display = "flex";
    } else {
        btnIzq.style.display = "none";
        btnDer.style.display = "none";
    }
    if (config.mostrarPuntos) {
        generarIndicadores();
    } else {
        indicadoresContainer.innerHTML = "";
    }
}
function generarIndicadores() {
    const imagenes = carruselInner.querySelectorAll(".imagen-carrusel");
    indicadoresContainer.innerHTML = "";
    imagenes.forEach((_, index) => {
        const punto = document.createElement("span");
        punto.classList.add("punto-indicador");
        if (index === indice) punto.classList.add("activo");
        punto.addEventListener("click", () => {
            cambiarImagen(index);
        });
        indicadoresContainer.appendChild(punto);
    });
}
function actualizarIndicadores() {
    const puntos = indicadoresContainer.querySelectorAll(".punto-indicador");
    puntos.forEach((p, i) => {
        p.classList.toggle("activo", i === indice);
    });
}
function cambiarImagen(nuevoIndice) {
    const imagenes = carruselInner.querySelectorAll(".imagen-carrusel");
    if (imagenes.length === 0) return;
    imagenes[indice].classList.remove("active");
    indice = nuevoIndice;
    imagenes[indice].classList.add("active");
    actualizarIndicadores();
}
aplicarConfiguracion();