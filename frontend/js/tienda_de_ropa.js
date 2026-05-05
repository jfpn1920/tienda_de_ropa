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
        <!--|este_espacio_estara_vacio|-->
        <!------------------------------->
    `,
    opcion2: `
        <!-------------------------------------->
        <!--|estructura_contenido_11_dinamica|-->
        <!-------------------------------------->
        <div id="contenedor_contenido_11">
            <div id="panel_texto_contenido_11">
                <div id="titulo_contenido_11">
                    aqui ira el titulo
                </div>
                <div id="linea_contenido_11"></div>
                <div id="descripcion_contenido_11">
                    aqui se añadira la descripcion
                </div>
            </div>
            <div id="panel_imagen_contenido_11">
                <input type="file" id="input_imagen_contenido_11" accept="image/*" hidden>
                <div id="zona_imagen_contenido_11">
                    <i class="fa-regular fa-image" id="icono_imagen_contenido_11"></i>
                    <p id="texto_imagen_contenido_11">aqui ira la imagen</p>
                    <img id="preview_imagen_contenido_11" src="" alt="">
                </div>
            </div>
        </div>
        <!-------------------------------------->
        <!--|estructura_contenido_12_dinamica|-->
        <!-------------------------------------->
        <div id="contenedor_contenido_12">
            <div id="panel_izquierdo_contenido_12">
                <input type="file"id="input_imagen_principal_contenido_12"accept="image/*"hidden>
                <div id="zona_imagen_principal_contenido_12">
                    <i class="fa-regular fa-image" id="icono_imagen_principal_contenido_12"></i>
                    <p id="texto_imagen_principal_contenido_12">
                        aqui ira la imagen
                    </p>
                    <img id="preview_imagen_principal_contenido_12" src="" alt="">
                </div>
            </div>
            <div id="panel_derecho_contenido_12">
                <div id="titulo_contenido_12">
                    aqui ira el titulo
                </div>
                <div id="linea_contenido_12"></div>
                <div id="descripcion_contenido_12">
                    aqui ira la descripcion
                </div>
                <div id="contenedor_tarjetas_contenido_12">
                    <div class="tarjeta_contenido_12">
                        <input type="file" id="input_imagen_1_contenido_12" accept="image/*" hidden>
                        <div class="zona_imagen_secundaria_contenido_12"id="zona_imagen_1_contenido_12">
                            <i class="fa-regular fa-image icono_secundario_contenido_12"></i>
                            <p class="texto_secundario_contenido_12">
                                aqui ira la imagen
                            </p>
                            <img class="preview_secundario_contenido_12" id="preview_imagen_1_contenido_12" src="" alt="">
                        </div>
                        <div class="subtitulo_contenido_12">
                            aqui ira el subtitulo
                        </div>
                        <div class="descripcion_secundaria_contenido_12">
                            aqui se añadira la descripcion
                        </div>
                    </div>
                    <div class="tarjeta_contenido_12">
                        <input type="file" id="input_imagen_2_contenido_12" accept="image/*" hidden>
                        <div class="zona_imagen_secundaria_contenido_12" id="zona_imagen_2_contenido_12">
                            <i class="fa-regular fa-image icono_secundario_contenido_12"></i>
                            <p class="texto_secundario_contenido_12">
                                aqui ira la imagen
                            </p>
                            <img class="preview_secundario_contenido_12" id="preview_imagen_2_contenido_12" src="" alt="">
                        </div>
                        <div class="subtitulo_contenido_12">
                            aqui ira el subtitulo
                        </div>
                        <div class="descripcion_secundaria_contenido_12">
                            aqui se añadira la descripcion
                        </div>
                    </div>
                    <div class="tarjeta_contenido_12">
                        <input type="file" id="input_imagen_3_contenido_12" accept="image/*" hidden>
                        <div class="zona_imagen_secundaria_contenido_12" id="zona_imagen_3_contenido_12">
                            <i class="fa-regular fa-image icono_secundario_contenido_12"></i>
                            <p class="texto_secundario_contenido_12">
                                aqui ira la imagen
                            </p>
                            <img class="preview_secundario_contenido_12" id="preview_imagen_3_contenido_12" src="" alt="">
                        </div>
                        <div class="subtitulo_contenido_12">
                            aqui ira el subtitulo
                        </div>
                        <div class="descripcion_secundaria_contenido_12">
                            aqui se añadira la descripcion
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!------------------------------------->
        <!--|estructura_contenido_2_dinamica|-->
        <!------------------------------------->
        <div id="contenedor_contenido_2">
            <div id="titulo_contenido_2">
                aqui ira el titulo
            </div>
            <div id="linea_contenido_2"></div>
            <div id="contenedor_tarjetas_contenido_2">
                <div class="tarjeta_contenido_2">
                    <input type="file" id="input_imagen_1_contenido_2" accept="image/*" hidden>
                    <div class="zona_imagen_contenido_2" id="zona_imagen_1_contenido_2">
                        <i class="fa-regular fa-image icono_imagen_contenido_2"></i>
                        <p class="texto_imagen_contenido_2">
                            aqui ira la imagen
                        </p>
                        <img class="preview_imagen_contenido_2" id="preview_imagen_1_contenido_2" src="" alt="">
                    </div>
                    <div class="subtitulo_contenido_2">
                        aqui ira el subtitulo
                    </div>
                    <div class="descripcion_contenido_2">
                        aqui ira la descripcion
                    </div>
                </div>
                <div class="tarjeta_contenido_2">
                    <input type="file" id="input_imagen_2_contenido_2" accept="image/*" hidden>
                    <div class="zona_imagen_contenido_2" id="zona_imagen_2_contenido_2">
                        <i class="fa-regular fa-image icono_imagen_contenido_2"></i>
                        <p class="texto_imagen_contenido_2">
                            aqui ira la imagen
                        </p>
                        <img class="preview_imagen_contenido_2" id="preview_imagen_2_contenido_2" src="" alt="">
                    </div>
                    <div class="subtitulo_contenido_2">
                        aqui ira el subtitulo
                    </div>
                    <div class="descripcion_contenido_2">
                        aqui ira la descripcion
                    </div>
                </div>
                <div class="tarjeta_contenido_2">
                    <input type="file" id="input_imagen_3_contenido_2" accept="image/*" hidden>
                    <div class="zona_imagen_contenido_2" id="zona_imagen_3_contenido_2">
                        <i class="fa-regular fa-image icono_imagen_contenido_2"></i>
                        <p class="texto_imagen_contenido_2">
                            aqui ira la imagen
                        </p>
                        <img class="preview_imagen_contenido_2" id="preview_imagen_3_contenido_2" src="" alt="">
                    </div>
                    <div class="subtitulo_contenido_2">
                        aqui ira el subtitulo
                    </div>
                    <div class="descripcion_contenido_2">
                        aqui ira la descripcion
                    </div>
                </div>
                <div class="tarjeta_contenido_2">
                    <input type="file" id="input_imagen_4_contenido_2" accept="image/*" hidden>
                    <div class="zona_imagen_contenido_2" id="zona_imagen_4_contenido_2">
                        <i class="fa-regular fa-image icono_imagen_contenido_2"></i>
                        <p class="texto_imagen_contenido_2">
                            aqui ira la imagen
                        </p>
                        <img class="preview_imagen_contenido_2" id="preview_imagen_4_contenido_2" src="" alt="">
                    </div>
                    <div class="subtitulo_contenido_2">
                        aqui ira el subtitulo
                    </div>
                    <div class="descripcion_contenido_2">
                        aqui ira la descripcion
                    </div>
                </div>
            </div>
        </div>
    `,
    opcion3: `
        <!-------------------------------------->
        <!--|estructura_contenido_13_dinamica|-->
        <!-------------------------------------->
        <div id="contenedor_contenido_13">
            <div id="panel_izquierdo_contenido_13">
                <div id="titulo_contenido_13">
                    Escribir el titulo...
                </div>
                <div id="linea_contenido_13"></div>
                <div id="descripcion_principal_contenido_13">
                    Añade una descripcion...
                </div>
                <div id="contenedor_tarjetas_contenido_13">
                    <div class="tarjeta_contenido_13">
                        <input type="file" id="input_imagen_1_contenido_13" accept="image/*" hidden>
                        <div class="zona_imagen_contenido_13" id="zona_imagen_1_contenido_13">
                            <i class="fa-regular fa-image icono_imagen_contenido_13"></i>
                            <p class="texto_imagen_contenido_13"> Ninguna imagen añadido </p>
                            <img class="preview_imagen_contenido_13" id="preview_imagen_1_contenido_13" src="" alt="">
                        </div>
                        <div class="subtitulo_contenido_13">
                            Escribir el subtitulo...
                        </div>
                        <div class="descripcion_secundaria_contenido_13">
                            Añade una descripcion...
                        </div>
                    </div>
                    <div class="tarjeta_contenido_13">
                        <input type="file" id="input_imagen_2_contenido_13" accept="image/*" hidden>
                        <div class="zona_imagen_contenido_13" id="zona_imagen_2_contenido_13">
                            <i class="fa-regular fa-image icono_imagen_contenido_13"></i>
                            <p class="texto_imagen_contenido_13">Ninguna imagen añadido</p>
                            <img class="preview_imagen_contenido_13" id="preview_imagen_2_contenido_13" src="" alt="">
                        </div>
                        <div class="subtitulo_contenido_13">
                            Escribir el subtitulo...
                        </div>
                        <div class="descripcion_secundaria_contenido_13">
                            Añade una descripcion...
                        </div>
                    </div>
                    <div class="tarjeta_contenido_13">
                        <input type="file" id="input_imagen_3_contenido_13" accept="image/*" hidden>
                        <div class="zona_imagen_contenido_13" id="zona_imagen_3_contenido_13">
                            <i class="fa-regular fa-image icono_imagen_contenido_13"></i>
                            <p class="texto_imagen_contenido_13">Ninguna imagen añadido</p>
                            <img class="preview_imagen_contenido_13" id="preview_imagen_3_contenido_13" src="" alt="">
                        </div>
                        <div class="subtitulo_contenido_13">
                            Escribir el subtitulo...
                        </div>
                        <div class="descripcion_secundaria_contenido_13">
                            Añade una descripcion...
                        </div>
                    </div>
                </div>
            </div>
            <div id="panel_derecho_contenido_13">
                <input type="file" id="input_imagen_principal_contenido_13" accept="image/*" hidden>
                <div id="zona_imagen_principal_contenido_13">
                    <i class="fa-regular fa-image" id="icono_imagen_principal_contenido_13"></i>
                    <p id="texto_imagen_principal_contenido_13">Ninguna imagen añadido</p>
                    <img id="preview_imagen_principal_contenido_13" src="" alt="">
                </div>
            </div>
        </div>
        <!-------------------------------------->
        <!--|estructura_contenido_14_dinamica|-->
        <!-------------------------------------->
        <div id="contenedor_contenido_14">
            <div id="titulo_contenido_14">
                aqui ira el titulo...
            </div>
            <div id="linea_contenido_14"></div>
            <div id="contenedor_tarjetas_contenido_14">
                <div class="tarjeta_contenido_14">
                    <input type="file" id="input_imagen_1_contenido_14" accept="image/*" hidden>
                    <div class="zona_imagen_contenido_14" id="zona_imagen_1_contenido_14">
                        <i class="fa-regular fa-image icono_imagen_contenido_14"></i>
                        <p class="texto_imagen_contenido_14">
                            Ninguna imagen añadido
                        </p>
                    </div>
                    <div class="descripcion_contenido_14">
                        Añade una descripcion...
                    </div>
                    <div class="subtitulo_contenido_14">
                        Escribir el subtitulo...
                    </div>
                </div>
                <div class="tarjeta_contenido_14">
                    <input type="file" id="input_imagen_2_contenido_14" accept="image/*" hidden>
                    <div class="zona_imagen_contenido_14" id="zona_imagen_2_contenido_14">
                        <i class="fa-regular fa-image icono_imagen_contenido_14"></i>
                        <p class="texto_imagen_contenido_14">
                            Ninguna imagen añadido
                        </p>
                    </div>
                    <div class="descripcion_contenido_14">
                        Añade una descripcion...
                    </div>
                    <div class="subtitulo_contenido_14">
                        Escribir el subtitulo...
                    </div>
                </div>
                <div class="tarjeta_contenido_14">
                    <input type="file" id="input_imagen_3_contenido_14" accept="image/*" hidden>
                    <div class="zona_imagen_contenido_14" id="zona_imagen_3_contenido_14">
                        <i class="fa-regular fa-image icono_imagen_contenido_14"></i>
                        <p class="texto_imagen_contenido_14">
                            Ninguna imagen añadido
                        </p>
                    </div>
                    <div class="descripcion_contenido_14">
                        Añade una descripcion...
                    </div>
                    <div class="subtitulo_contenido_14">
                        Escribir el subtitulo...
                    </div>
                </div>
                <div class="tarjeta_contenido_14">
                    <input type="file" id="input_imagen_4_contenido_14" accept="image/*" hidden>
                    <div class="zona_imagen_contenido_14" id="zona_imagen_4_contenido_14">
                        <i class="fa-regular fa-image icono_imagen_contenido_14"></i>
                        <p class="texto_imagen_contenido_14">
                            Ninguna imagen añadido
                        </p>
                    </div>
                    <div class="descripcion_contenido_14">
                        Añade una descripcion...
                    </div>
                    <div class="subtitulo_contenido_14">
                        Escribir el subtitulo...
                    </div>
                </div>
            </div>
        </div>
        <!------------------------------------>
        <!--|estructura_envianos_un_mensaje|-->
        <!------------------------------------>
        <div class="contenedor_formulario_contacto">
            <h2 class="titulo_formulario_contacto">
                Envíanos un mensaje
            </h2>
            <form id="formulario_contacto">
                <div class="fila_formulario_contacto">
                    <div class="grupo_input_formulario_contacto">
                        <label>
                            Nombre completo
                        </label>
                        <input type="text" id="nombre_formulario_contacto" placeholder="Tu nombre">
                    </div>
                    <div class="grupo_input_formulario_contacto">
                        <label style="opacity: 0;">
                            correo
                        </label>
                        <input type="email" id="correo_formulario_contacto" placeholder="tu@email.com">
                    </div>
                </div>
                <div class="grupo_input_formulario_contacto">
                    <label>
                        Asunto
                    </label>
                    <div class="contenedor_select_formulario_contacto">
                        <select id="asunto_formulario_contacto">
                            <option value="">
                                ¿En qué podemos ayudarte?
                            </option>
                            <option>
                                Soporte técnico
                            </option>
                            <option>
                                Información
                            </option>
                            <option>
                                Diseño web
                            </option>
                            <option>
                                Otro
                            </option>
                        </select>
                        <i class="fa-solid fa-chevron-down"></i>
                    </div>
                </div>
                <div class="grupo_input_formulario_contacto">
                    <label>
                        Mensaje
                    </label>
                    <textarea id="mensaje_formulario_contacto" placeholder="Escribe tu mensaje aquí..."></textarea>
                </div>
                <button type="submit" id="boton_formulario_contacto">
                    <span>
                        ENVIAR MENSAJE
                    </span>
                    <i class="fa-regular fa-paper-plane"></i>
                </button>
            </form>
        </div>
        <!------------------------------------->
        <!--|estructura_contenido_6_dinamica|-->
        <!------------------------------------->
        <div id="contenido_6" class="contenido_6-container">
            <div class="contenido_6-titulo contenido_6-editable" data-placeholder="aqui ira el titulo"></div>
            <div class="contenido_6-linea"></div>
            <div class="contenido_6-grid">
                <div class="contenido_6-left">
                    <div class="contenido_6-imagen" id="contenido_6_imagen_box">
                        <div class="icono_img_contenido_6">
                            <i class="fa-solid fa-image"></i>
                        </div>
                        <span class="texto_img_contenido_6">aqui ira la imagen</span>
                        <input type="file" id="contenido_6_input_imagen" hidden>
                    </div>
                    <div class="contenido_6-item">
                        <div class="contenido_6-campo-parte-2 contenido_6-editable" data-placeholder="aqui ira el subtitulo"></div>
                    </div>
                </div>
                <div class="contenido_6-right">
                    <div class="contenido_6-descripcion contenido_6-editable" data-placeholder="aqui ira la descripcion"></div>
                    <div class="contenido_6-subtitulo contenido_6-editable" data-placeholder="aqui ira el subtitulo"></div>
                    <div id="contenido_6_lista">
                        <div class="contenido_6-item">
                            <button class="contenido_6-btn">+</button>
                            <div class="contenido_6-campo contenido_6-editable" data-placeholder="aqui ira el subtitulo"></div>
                        </div>
                        <div class="contenido_6-item">
                            <button class="contenido_6-btn">+</button>
                            <div class="contenido_6-campo contenido_6-editable" data-placeholder="aqui ira el subtitulo"></div>
                        </div>
                        <div class="contenido_6-item">
                            <button class="contenido_6-btn">+</button>
                            <div class="contenido_6-campo contenido_6-editable" data-placeholder="aqui ira el subtitulo"></div>
                        </div>
                        <div class="contenido_6-item">
                            <button class="contenido_6-btn">+</button>
                            <div class="contenido_6-campo contenido_6-editable" data-placeholder="aqui ira el subtitulo"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    opcion4: `
        <!------------------------------------->
        <!--|estructura_contenido_4_dinamica|-->
        <!------------------------------------->
        <div id="contenido_4" class="contenido_4-container">
            <div class="contenido_4-titulo contenido_4-editable" data-placeholder="aqui ira el titulo"></div>
            <div class="contenido_4-linea"></div>
            <div class="contenido_4-grid">
                <div class="contenido_4-imagen" id="contenido_4_imagen_box">
                    <div class="contenido_4-placeholder">
                        <i class="fa-solid fa-image"></i>
                        <span>aqui ira la imagen</span>
                    </div>
                    <input type="file" id="contenido_4_input_imagen" hidden>
                </div>
                <div class="contenido_4-descripcion contenido_4-editable" data-placeholder="aqui ira la descripcion"></div>
            </div>
        </div>
        <!-------------------------------------->
        <!--|estructura_contenido_16_dinamica|-->
        <!-------------------------------------->
        <section id="contenido_16">
            <div class="contenido_16-grid">
                <div class="contenido_16-item">
                    <div class="contenido_16-imagen">
                        <div class="icono_img_contenido_16">
                            <i class="fa-solid fa-image"></i>
                        </div>
                        <span class="texto_img_contenido_16">Aquí irá la imagen</span>
                    </div>
                    <div class="contenido_16-subtitulo">Aquí irá el subtítulo</div>
                    <button class="contenido_16-btn">Ver todo</button>
                </div>
                <div class="contenido_16-item">
                    <div class="contenido_16-imagen">
                        <div class="icono_img_contenido_16">
                            <i class="fa-solid fa-image"></i>
                        </div>
                        <span class="texto_img_contenido_16">Aquí irá la imagen</span>
                    </div>
                    <div class="contenido_16-subtitulo">Aquí irá el subtítulo</div>
                    <button class="contenido_16-btn">Ver todo</button>
                </div>
                <div class="contenido_16-item">
                    <div class="contenido_16-imagen">
                        <div class="icono_img_contenido_16">
                            <i class="fa-solid fa-image"></i>
                        </div>
                        <span class="texto_img_contenido_16">Aquí irá la imagen</span>
                    </div>
                    <div class="contenido_16-subtitulo">Aquí irá el subtítulo</div>
                    <button class="contenido_16-btn">Ver todo</button>
                </div>
                <div class="contenido_16-item contenido_16-item-full">
                    <div class="contenido_16-imagen">
                        <div class="icono_img_contenido_16">
                            <i class="fa-solid fa-image"></i>
                        </div>
                        <span class="texto_img_contenido_16">Aquí irá la imagen</span>
                    </div>
                    <input type="text" class="contenido_16-input" placeholder="Escribir el subtítulo...">
                    <button class="contenido_16-btn">Ver todo</button>
                </div>
            </div>
        </section>
        <!-------------------------------------->
        <!--|estructura_contenido_17_dinamica|-->
        <!-------------------------------------->
        <div id="titulo_contenido_17">
            aqui ira el titulo
        </div>
        <div class="linea17"></div>
        <div id="grid_contenido_17">
            <div class="card_contenido_17">
                <div class="marco_imagen_contenido_17">
                    <div class="icono_contenido_17">
                        <i class="fa-solid fa-image"></i>
                    </div>
                    <p>aqui ira la imagen</p>
                </div>
                <div class="subtitulo_contenido_17">
                    aqui ira el subtitulo
                </div>
                <button class="btn_contenido_17">Ver categoría</button>
            </div>
            <div class="card_contenido_17">
                <div class="marco_imagen_contenido_17">
                    <div class="icono_contenido_17">
                        <i class="fa-solid fa-image"></i>
                    </div>
                    <p>aqui ira la imagen</p>
                </div>
                <div class="subtitulo_contenido_17">
                    aqui ira el subtitulo
                </div>
                <button class="btn_contenido_17">Ver categoría</button>
            </div>
            <div class="card_contenido_17">
                <div class="marco_imagen_contenido_17">
                    <div class="icono_contenido_17">
                        <i class="fa-solid fa-image"></i>
                    </div>
                    <p>aqui ira la imagen</p>
                </div>
                <div class="subtitulo_contenido_17">
                    aqui ira el subtitulo
                </div>
                <button class="btn_contenido_17">Ver categoría</button>
            </div>
            <div class="card_contenido_17">
                <div class="marco_imagen_contenido_17">
                    <div class="icono_contenido_17">
                        <i class="fa-solid fa-image"></i>
                    </div>
                    <p>aqui ira la imagen</p>
                </div>
                <div class="subtitulo_contenido_17">
                    aqui ira el subtitulo
                </div>
                <button class="btn_contenido_17">Ver categoría</button>
            </div>
            <div class="card_contenido_17">
                <div class="marco_imagen_contenido_17">
                    <div class="icono_contenido_17">
                        <i class="fa-solid fa-image"></i>
                    </div>
                    <p>aqui ira la imagen</p>
                </div>
                <div class="subtitulo_contenido_17">
                    aqui ira el subtitulo
                </div>
                <button class="btn_contenido_17">Ver categoría</button>
            </div>
            <div class="card_contenido_17">
                <div class="marco_imagen_contenido_17">
                    <div class="icono_contenido_17">
                        <i class="fa-solid fa-image"></i>
                    </div>
                    <p>aqui ira la imagen</p>
                </div>
                <div class="subtitulo_contenido_17">
                    aqui ira el subtitulo
                </div>
                <button class="btn_contenido_17">Ver categoría</button>
            </div>
        </div>
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
//--|funcionalidad_contenido_2_dinamica|--//
//----------------------------------------//
function activarImagen_contenido_2(
    zonaId,
    inputId,
    previewId
){
    const zona_contenido_2 = document.getElementById(zonaId);
    const input_contenido_2 = document.getElementById(inputId);
    const preview_contenido_2 = document.getElementById(previewId);
    if(!zona_contenido_2 || !input_contenido_2 || !preview_contenido_2){
        console.warn("Elemento no encontrado:", zonaId, inputId, previewId);
        return;
    }
    const icono_contenido_2 = zona_contenido_2.querySelector("i");
    const texto_contenido_2 = zona_contenido_2.querySelector("p");
    zona_contenido_2.addEventListener("click", () => {
        input_contenido_2.click();
    });
    input_contenido_2.addEventListener("change", (e) => {
        const archivo_contenido_2 = e.target.files[0];
        if(!archivo_contenido_2) return;
        const lector_contenido_2 = new FileReader();
        lector_contenido_2.onload = function(event){
            preview_contenido_2.src = event.target.result;
            preview_contenido_2.style.display = "block";
            if(icono_contenido_2) icono_contenido_2.style.display = "none";
            if(texto_contenido_2) texto_contenido_2.style.display = "none";
        };
        lector_contenido_2.readAsDataURL(archivo_contenido_2);
    });
}
document.addEventListener("DOMContentLoaded", () => {
    const zonas = document.querySelectorAll(".zona_imagen_contenido_2");
    zonas.forEach((zona) => {
        const match = zona.id.match(/zona_imagen_(\d+)_contenido_2/);
        if(!match) return;
        const numero = match[1];
        activarImagen_contenido_2(
            `zona_imagen_${numero}_contenido_2`,
            `input_imagen_${numero}_contenido_2`,
            `preview_imagen_${numero}_contenido_2`
        );
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
//----------------------------------------//
//--|funcionalidad_contenido_4_dinamica|--//
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
    document.querySelectorAll(".contenido_4-editable").forEach(activarEditable);
    const box = document.getElementById("contenido_4_imagen_box");
    const input = document.getElementById("contenido_4_input_imagen");
    if (!box || !input) return;
    box.addEventListener("click", () => input.click());
    input.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            box.innerHTML = `
                <img src="${e.target.result}" 
                    style="width:100%;height:100%;object-fit:cover;">
            `;
        };
        reader.readAsDataURL(file);
    });
});
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
//-----------------------------------------//
//--|funcionalidad_contenido_11_dinamica|--//
//-----------------------------------------//
document.addEventListener("DOMContentLoaded", () => {
    const zonaImagen_contenido_11 = document.getElementById("zona_imagen_contenido_11");
    const inputImagen_contenido_11 = document.getElementById("input_imagen_contenido_11");
    const iconoImagen_contenido_11 = document.getElementById("icono_imagen_contenido_11");
    const textoImagen_contenido_11 = document.getElementById("texto_imagen_contenido_11");
    const previewImagen_contenido_11 = document.getElementById("preview_imagen_contenido_11");
    if (!zonaImagen_contenido_11 || !inputImagen_contenido_11) return;
    zonaImagen_contenido_11.addEventListener("click", () => {
        inputImagen_contenido_11.click();
    });
    inputImagen_contenido_11.addEventListener("change", (e) => {
        const archivo_contenido_11 = e.target.files[0];
        if (!archivo_contenido_11) return;
        const lector_contenido_11 = new FileReader();
        lector_contenido_11.onload = function(event){
            previewImagen_contenido_11.src = event.target.result;
            previewImagen_contenido_11.style.display = "block";
            iconoImagen_contenido_11.style.display = "none";
            textoImagen_contenido_11.style.display = "none";
        };
        lector_contenido_11.readAsDataURL(archivo_contenido_11);
    });
});
//-----------------------------------------//
//--|funcionalidad_contenido_12_dinamica|--//
//-----------------------------------------//
document.addEventListener("DOMContentLoaded", () => {
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
                if (icono_contenido_12) icono_contenido_12.style.display = "none";
                if (texto_contenido_12) texto_contenido_12.style.display = "none";
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
//-----------------------------------------//
//--|funcionalidad_contenido_16_dinamica|--//
//-----------------------------------------//
document.querySelectorAll(".contenido_16-imagen").forEach((imgBox) => {
    imgBox.addEventListener("click", () => {
        const url = prompt("Ingresa la URL de la imagen:");
        if (url) {
            imgBox.style.backgroundImage = `url(${url})`;
            imgBox.style.backgroundSize = "cover";
            imgBox.style.backgroundPosition = "center";
            imgBox.innerHTML = "";
        }
    });
});
//-----------------------------------------//
//--|funcionalidad_contenido_17_dinamica|--//
//-----------------------------------------//
document.querySelectorAll(".btn_categoria_contenido_17").forEach((boton, index) => {
    boton.addEventListener("click", () => {
        alert("Has hecho clic en la categoría " + (index + 1));
    });
});
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