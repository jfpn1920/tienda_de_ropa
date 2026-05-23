//--------------------------------------//
//--|funcionalidad_menu_de_navegacion|--//
//--------------------------------------//
const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");
const contents = document.querySelectorAll(
    ".main-content-15, .main-content-16, .main-content-17, .main-content-18, .main-content-19, .main-content-20, .boton-desplegar, .contenedor-desplegante-2, .desplegable-2, .desplegable-3"
);
menuToggle.addEventListener("click", () => {
    sidebar.classList.toggle("active");
    contents.forEach(content => {
        content.classList.toggle("active");
    });
});
//------------------------------------------//
//--|funcionalidad_fomulario_de_productos|--//
//------------------------------------------//
const CLAVE_PRODUCTO =
    "producto_temporal";
const inputsFormulario =
    document.querySelectorAll(
        ".input_texto, .input_texto_bloque_2"
    );
const selectsFormulario =
    document.querySelectorAll(
        ".select_formulario, .select_formulario_bloque_2"
    );
function guardarFormularioLocalStorage() {
    const datosProducto = {
        inputs: [],
        selects: [],
        tallas: [],
        imagenes: []
    };
    inputsFormulario.forEach(
        function (input) {
            datosProducto.inputs.push(
                input.value
            );
        }
    );
    selectsFormulario.forEach(
        function (select) {
            datosProducto.selects.push(
                select.value
            );
        }
    );
    botonesTallas.forEach(
        function (boton) {
            if (
                boton.classList.contains(
                    "activa_talla"
                )
            ) {
                datosProducto.tallas.push(
                    boton.textContent
                );
            }
        }
    );
    localStorage.setItem(
        CLAVE_PRODUCTO,
        JSON.stringify(datosProducto)
    );
}
function cargarFormularioLocalStorage() {
    const datosGuardados =
        JSON.parse(
            localStorage.getItem(
                CLAVE_PRODUCTO
            )
        );
    if (!datosGuardados) {
        return;
    }
    inputsFormulario.forEach(
        function (input, index) {
            if (
                datosGuardados.inputs[index]
            ) {
                input.value =
                    datosGuardados.inputs[index];
            }
        }
    );
    selectsFormulario.forEach(
        function (select, index) {
            if (
                datosGuardados.selects[index]
            ) {
                select.value =
                    datosGuardados.selects[index];
            }
        }
    );
    botonesTallas.forEach(
        function (boton) {
            if (
                datosGuardados.tallas.includes(
                    boton.textContent
                )
            ) {
                boton.classList.add(
                    "activa_talla"
                );
            }
        }
    );
}
inputsFormulario.forEach(
    function (input) {
        input.addEventListener(
            "input",
            guardarFormularioLocalStorage
        );
    }
);
selectsFormulario.forEach(
    function (select) {
        select.addEventListener(
            "change",
            guardarFormularioLocalStorage
        );
    }
);
//--------------------------------//
//--|generador_codigo_de_barras|--//
//--------------------------------//
const botonGenerar =
    document.querySelector(
        ".boton_generar"
    );
const inputCodigoBarras =
    document.querySelectorAll(
        ".input_texto"
    )[2];
botonGenerar.addEventListener(
    "click",
    function () {
        const codigoGenerado =
            Math.floor(
                100000000000 +
                Math.random() *
                900000000000
            );
        inputCodigoBarras.value =
            codigoGenerado;
        guardarFormularioLocalStorage();
    }
);
//----------------------------------//
//--|seleccion_talla_del_producto|--//
//----------------------------------//
const botonesTallas =
    document.querySelectorAll(
        ".boton_talla_bloque_2"
    );
botonesTallas.forEach(
    function (boton) {
        boton.addEventListener(
            "click",
            function () {
                boton.classList.toggle(
                    "activa_talla"
                );
                guardarFormularioLocalStorage();
            }
        );
    }
);
//---------------------//
//--|agregar_imagene|--//
//---------------------//
const contenedorImagen =
    document.querySelector(
        ".contenedor_imagen_producto_bloque_3"
    );
const inputImagen =
    document.querySelector(
        ".input_imagen_oculto"
    );
const textoImagen =
    document.querySelector(
        ".texto_imagen_bloque_3"
    );
contenedorImagen.addEventListener(
    "click",
    function () {
        inputImagen.click();
    }
);
inputImagen.addEventListener(
    "change",
    function () {
        const archivos =
            Array.from(
                inputImagen.files
            );
        if (
            archivos.length > 3
        ) {
            alert(
                "Solo puedes seleccionar 3 imágenes"
            );
            inputImagen.value = "";
            return;
        }
        contenedorImagen.innerHTML = "";
        const preview =
            document.createElement(
                "div"
            );
        preview.classList.add(
            "preview_imagenes"
        );
        archivos.forEach(
            function (archivo) {
                const imagen =
                    document.createElement(
                        "img"
                    );
                imagen.src =
                    URL.createObjectURL(
                        archivo
                    );
                preview.appendChild(
                    imagen
                );
            }
        );
        contenedorImagen.appendChild(
            preview
        );
    }
);
//--------------------------//
//--|boton_crear_producto|--//
//--------------------------//
const botonCrearProducto =
    document.querySelector(
        ".boton_crear_producto"
    );
botonCrearProducto.addEventListener(
    "click",
    function () {
        const inputs =
            document.querySelectorAll(
                ".input_texto"
            );
        const inputsBloque2 =
            document.querySelectorAll(
                ".input_texto_bloque_2"
            );
        const selects =
            document.querySelectorAll(
                ".select_formulario"
            );
        const selectsBloque2 =
            document.querySelectorAll(
                ".select_formulario_bloque_2"
            );
        let formularioLleno =
            false;
        inputs.forEach(
            function (input) {
                if (
                    input.value.trim() !== ""
                ) {
                    formularioLleno =
                        true;
                }
            }
        );
        selects.forEach(
            function (select) {
                if (
                    !select.value.includes(
                        "Ninguna"
                    )
                ) {
                    formularioLleno =
                        true;
                }
            }
        );
        if (
            !formularioLleno
        ) {
            alert(
                "No has creado ningún producto"
            );
            return;
        }
        const tallasSeleccionadas =
            [];
        botonesTallas.forEach(
            function (boton) {
                if (
                    boton.classList.contains(
                        "activa_talla"
                    )
                ) {
                    tallasSeleccionadas.push(
                        boton.textContent
                    );
                }
            }
        );
        const archivos =
            Array.from(
                inputImagen.files
            );
        const imagenesProducto =
            [];
        if (
            archivos.length > 0
        ) {
            let imagenesProcesadas =
                0;
            archivos.forEach(
                function (archivo) {
                    const lector =
                        new FileReader();
                    lector.readAsDataURL(
                        archivo
                    );
                    lector.onload =
                        function () {
                            imagenesProducto.push(
                                lector.result
                            );
                            imagenesProcesadas++;
                            if (
                                imagenesProcesadas ===
                                archivos.length
                            ) {
                                const nuevoProducto = {
                                    nombre:
                                        inputs[0].value,
                                    sku:
                                        inputs[1].value,
                                    codigo_barras:
                                        inputs[2].value,
                                    categoria:
                                        selects[0].value,
                                    marca:
                                        selects[1].value,
                                    temporada:
                                        inputs[3].value,
                                    descuento:
                                        selects[2].value,
                                    stock:
                                        inputs[4].value,
                                    stock_minimo:
                                        inputsBloque2[0].value,
                                    precio:
                                        "$" +
                                        inputsBloque2[1].value,
                                    estado:
                                        selectsBloque2[0].value,
                                    color:
                                        selectsBloque2[1].value,
                                    tallas:
                                        tallasSeleccionadas,
                                    imagenes:
                                        imagenesProducto
                                };
                                const productosGuardados =
                                    JSON.parse(
                                        localStorage.getItem(
                                            "lista_productos"
                                        )
                                    ) || [];
                                productosGuardados.push(
                                    nuevoProducto
                                );
                                localStorage.setItem(
                                    "lista_productos",
                                    JSON.stringify(
                                        productosGuardados
                                    )
                                );
                                alert(
                                    "Has creado el producto con éxito"
                                );
                                localStorage.removeItem(
                                    CLAVE_PRODUCTO
                                );
                                location.reload();
                            }
                        };
                }
            );
        } else {
            const nuevoProducto = {
                nombre:
                    inputs[0].value,
                sku:
                    inputs[1].value,
                codigo_barras:
                    inputs[2].value,
                categoria:
                    selects[0].value,
                marca:
                    selects[1].value,
                temporada:
                    inputs[3].value,
                descuento:
                    selects[2].value,
                stock:
                    inputs[4].value,
                stock_minimo:
                    inputsBloque2[0].value,
                precio:
                    "$" +
                    inputsBloque2[1].value,
                estado:
                    selectsBloque2[0].value,
                color:
                    selectsBloque2[1].value,
                tallas:
                    tallasSeleccionadas,
                imagenes:
                    []
            };
            const productosGuardados =
                JSON.parse(
                    localStorage.getItem(
                        "lista_productos"
                    )
                ) || [];
            productosGuardados.push(
                nuevoProducto
            );
            localStorage.setItem(
                "lista_productos",
                JSON.stringify(
                    productosGuardados
                )
            );
            alert(
                "Has creado el producto con éxito"
            );
            localStorage.removeItem(
                CLAVE_PRODUCTO
            );
            location.reload();
        }
    }
);
window.addEventListener(
    "DOMContentLoaded",
    cargarFormularioLocalStorage
);
//----------------------------------------------------//
//--|funcionalidad_formulario_de_productos_bloque_4|--//
//----------------------------------------------------//
let editorActivo = null;
let tipoActivo = null;
const inputTituloProductoBloque4 =
    document.getElementById("input_titulo_producto_bloque_4");
const inputSubtituloProductoBloque4 =
    document.getElementById("input_subtitulo_producto_bloque_4");
const textareaDescripcionProductoBloque4 =
    document.getElementById("textarea_descripcion_producto_bloque_4");
const inputCaracteristica1Bloque4 =
    document.getElementById("input_caracteristica_1_bloque_4");
const inputCaracteristica2Bloque4 =
    document.getElementById("input_caracteristica_2_bloque_4");
const inputCaracteristica3Bloque4 =
    document.getElementById("input_caracteristica_3_bloque_4");
const inputCaracteristica4Bloque4 =
    document.getElementById("input_caracteristica_4_bloque_4");
const botonCrearDescripcionBloque4 =
    document.getElementById("boton_crear_descripcion_bloque_4");
function aplicarEstiloPorTipo(el) {
    const tipo = el.dataset.tipo;
    el.style.fontWeight = "400";
    el.style.fontSize = "";
    el.style.lineHeight = "";
    if (tipo === "titulo") {
        el.style.fontSize = "26px";
        el.style.fontWeight = "bold";
        el.style.lineHeight = "1.2";
    }
    if (tipo === "subtitulo") {
        el.style.fontSize = "18px";
        el.style.fontWeight = "600";
        el.style.lineHeight = "1.3";
    }
    if (tipo === "parrafo") {
        el.style.fontSize = "14px";
        el.style.fontWeight = "400";
        el.style.lineHeight = "1.6";
    }
    if (tipo === "descripcion") {
        el.style.fontSize = "14px";
        el.style.fontWeight = "400";
        el.style.lineHeight = "1.5";
    }
    if (tipo === "caracteristica") {
        el.style.fontSize = "13px";
        el.style.fontWeight = "400";
        el.style.lineHeight = "1.4";
    }
}
const camposEditor =
    document.querySelectorAll(".editor_campo");
camposEditor.forEach((el) => {
    el.addEventListener("focus", () => {
        editorActivo = el;
        tipoActivo = el.dataset.tipo;
        aplicarEstiloPorTipo(el);
    });
});
botonCrearDescripcionBloque4.addEventListener(
    "click",
    () => {
        const titulo =
            inputTituloProductoBloque4.value.trim();
        const subtitulo =
            inputSubtituloProductoBloque4.value.trim();
        const descripcion =
            textareaDescripcionProductoBloque4.value.trim();
        const caracteristica1 =
            inputCaracteristica1Bloque4.value.trim();
        const caracteristica2 =
            inputCaracteristica2Bloque4.value.trim();
        const caracteristica3 =
            inputCaracteristica3Bloque4.value.trim();
        const caracteristica4 =
            inputCaracteristica4Bloque4.value.trim();
        console.log("Titulo:", titulo);
        console.log("Subtitulo:", subtitulo);
        console.log("Descripcion:", descripcion);
        console.log("Caracteristica 1:", caracteristica1);
        console.log("Caracteristica 2:", caracteristica2);
        console.log("Caracteristica 3:", caracteristica3);
        console.log("Caracteristica 4:", caracteristica4);
        if (
            titulo === "" ||
            subtitulo === "" ||
            descripcion === ""
        ) {
            alert("Debes completar los campos principales");
            return;
        }
        alert("Detalle creado correctamente");
    }
);
const selectPosicion =
    document.getElementById("select_posicion_bloque_4");
selectPosicion.addEventListener(
    "change",
    () => {
        if (!editorActivo) return;
        const valor = selectPosicion.value;
        if (valor === "Izquierda") {
            editorActivo.style.textAlign = "left";
        }
        if (valor === "Centro") {
            editorActivo.style.textAlign = "center";
        }
        if (valor === "Derecha") {
            editorActivo.style.textAlign = "right";
        }
        if (valor === "justificado") {
            editorActivo.style.textAlign = "justify";
        }
    }
);
const selectTipo =
    document.getElementById("select_tipo_bloque_4");
selectTipo.addEventListener(
    "change",
    () => {
        const valor = selectTipo.value;
        console.log("Tipo seleccionado:", valor);
        if (!editorActivo) return;
        editorActivo.dataset.tipo = valor.toLowerCase();
        aplicarEstiloPorTipo(editorActivo);
    }
);
const selectFuente =
    document.getElementById("select_cambio_bloque_4");
selectFuente.addEventListener(
    "change",
    () => {
        if (!editorActivo) return;
        editorActivo.style.fontFamily =
            selectFuente.value;
    }
);
const selectTamano =
    document.getElementById("tamano_fuente_bloque_4");
selectTamano.addEventListener(
    "change",
    () => {
        if (!editorActivo) return;
        editorActivo.style.fontSize =
            selectTamano.value;
    }
);
const botonNegrita =
    document.getElementById("boton_negrita_bloque_4");
botonNegrita.addEventListener("click", () => {
    if (!editorActivo) return;
    editorActivo.style.fontWeight =
        editorActivo.style.fontWeight === "bold"
            ? "400"
            : "bold";
});
const botonCursiva =
    document.getElementById("boton_cursiva_bloque_4");
botonCursiva.addEventListener("click", () => {
    if (!editorActivo) return;
    editorActivo.style.fontStyle =
        editorActivo.style.fontStyle === "italic"
            ? "normal"
            : "italic";
});
const botonSubrayado =
    document.getElementById("boton_subrayado_bloque_4");
botonSubrayado.addEventListener("click", () => {
    if (!editorActivo) return;
    editorActivo.style.textDecoration =
        editorActivo.style.textDecoration === "underline"
            ? "none"
            : "underline";
});
const inputImagenBloque4 =
    document.getElementById("input_imagen_bloque_4");
const contenedorPrincipal =
    document.getElementById("contenedor_imagen_principal_bloque_4");
const miniImagen1 =
    document.getElementById("mini_imagen_1_bloque_4");
const miniImagen2 =
    document.getElementById("mini_imagen_2_bloque_4");
let contenedorImagenActivo = null;
function abrirSelectorImagen(contenedor) {
    contenedorImagenActivo = contenedor;
    inputImagenBloque4.click();
}
contenedorPrincipal.addEventListener("click", () => {
    abrirSelectorImagen(contenedorPrincipal);
});
miniImagen1.addEventListener("click", () => {
    abrirSelectorImagen(miniImagen1);
});
miniImagen2.addEventListener("click", () => {
    abrirSelectorImagen(miniImagen2);
});
inputImagenBloque4.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (e) {
        const urlImagen = e.target.result;
        if (!contenedorImagenActivo) return;
        contenedorImagenActivo.innerHTML = `
            <img 
                src="${urlImagen}" 
                style="
                    width:100%;
                    height:100%;
                    object-fit:cover;
                    border-radius:10px;
                "
            >
        `;
    };
    reader.readAsDataURL(file);
});
//------------------------------------------------//
//--|funcionalidad_tablero_de_productos_creados|--//
//------------------------------------------------//
const contenedorFilasProductos =
    document.getElementById(
        "contenedorFilasProductos"
    );
const mensajeTableroVacio =
    document.getElementById(
        "mensajeTableroVacio"
    );
const CLAVE_PRODUCTOS =
    "lista_productos";
function mostrarProductosTablero() {
    const productosGuardados =
        JSON.parse(
            localStorage.getItem(
                CLAVE_PRODUCTOS
            )
        ) || [];
    contenedorFilasProductos.innerHTML = "";
    if (
        productosGuardados.length === 0
    ) {
        mensajeTableroVacio.style.display =
            "block";
        return;
    }
    mensajeTableroVacio.style.display =
        "none";
    productosGuardados.forEach(
        function (producto, index) {
            const fila =
                document.createElement(
                    "div"
                );
            fila.classList.add(
                "fila_producto_tablero"
            );
            fila.innerHTML = `
                <div class="celda_tablero">
                    ${producto.nombre}
                </div>
                <div class="celda_tablero">
                    <div class="contenedor_imagenes_tablero">
                        ${
                            producto.imagenes
                            .map(
                                function (imagen) {
                                    return `
                                        <img
                                            src="${imagen}"
                                            class="imagen_tablero_producto"
                                        >
                                    `;
                                }
                            )
                            .join("")
                        }
                    </div>
                </div>
                <div class="celda_tablero">
                    ${producto.sku}
                </div>
                <div class="celda_tablero">
                    ${producto.codigo_barras}
                </div>
                <div class="celda_tablero">
                    ${producto.categoria}
                </div>
                <div class="celda_tablero">
                    ${producto.marca}
                </div>
                <div class="celda_tablero">
                    ${producto.descuento}
                </div>
                <div class="celda_tablero">
                    ${producto.stock}
                </div>
                <div class="celda_tablero">
                    ${producto.stock_minimo}
                </div>
                <div class="celda_tablero">
                    ${producto.estado}
                </div>
                <div class="celda_tablero">
                    ${producto.color}
                </div>
                <div class="celda_tablero">
                    ${producto.tallas.join(", ")}
                </div>
                <div class="celda_tablero">
                    ${producto.precio}
                </div>
                <div class="celda_tablero">
                    <button
                        class="boton_accion agregar"
                        data-index="${index}"
                        title="Agregar producto"
                    >
                        <i class="fa-solid fa-plus"></i>
                    </button>
                    <button
                        class="boton_accion editar"
                        data-index="${index}"
                        title="Editar producto"
                    >
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button
                        class="boton_accion eliminar"
                        data-index="${index}"
                        title="Eliminar producto"
                    >
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            `;
            contenedorFilasProductos.appendChild(
                fila
            );
        }
    );
}
//-------------------------------------//
//--|boton_eliminar_producto_tablero|--//
//-------------------------------------//
document.addEventListener(
    "click",
    function (evento) {
        if (evento.target.closest(".agregar")) {
            const botonAgregar =
                evento.target.closest(".agregar");
            const index =
                botonAgregar.dataset.index;
            const productosGuardados =
                JSON.parse(localStorage.getItem(CLAVE_PRODUCTOS)) || [];
            const producto =
                productosGuardados[index];
            producto.en_inventario = true;
            localStorage.setItem(
                CLAVE_PRODUCTOS,
                JSON.stringify(productosGuardados)
            );
            alert("El producto fue agregado con éxito al sistema");
            return;
        }
        if (
            evento.target.closest(
                ".eliminar"
            )
        ) {
            const botonEliminar =
                evento.target.closest(
                    ".eliminar"
                );
            const index =
                botonEliminar.dataset.index;
            const confirmarEliminar =
                confirm(
                    "¿Deseas eliminar este producto?"
                );
            if (!confirmarEliminar) {
                return;
            }
            const productosGuardados =
                JSON.parse(
                    localStorage.getItem(
                        CLAVE_PRODUCTOS
                    )
                ) || [];
            productosGuardados.splice(index, 1);
            localStorage.setItem(
                CLAVE_PRODUCTOS,
                JSON.stringify(productosGuardados)
            );
            mostrarProductosTablero();
        }
    }
);
window.addEventListener(
    "DOMContentLoaded",
    mostrarProductosTablero
);
//-----------------------------------//
//--|boton_editar_producto_tablero|--//
//-----------------------------------//
const overlayEditarProducto =
    document.getElementById("overlayEditarProducto");
const botonCerrarEditar =
    document.getElementById("botonCerrarEditar");
const inputEditarNombre =
    document.getElementById("inputEditarNombre");
const inputEditarSku =
    document.getElementById("inputEditarSku");
const inputEditarCodigoBarra =
    document.getElementById("inputEditarCodigoBarra");
const selectEditarCategoria =
    document.getElementById("selectEditarCategoria");
const selectEditarMarca =
    document.getElementById("selectEditarMarca");
const inputEditarStock =
    document.getElementById("inputEditarStock");
const selectEditarEstado =
    document.getElementById("selectEditarEstado");
const selectEditarDescuento =
    document.getElementById("selectEditarDescuento");
const selectEditarColor =
    document.getElementById("selectEditarColor");
const inputEditarStockMinimo =
    document.getElementById("inputEditarStockMinimo");
const inputEditarPrecio =
    document.getElementById("inputEditarPrecio");
const previewImagenesEditar =
    document.getElementById("previewImagenesEditar");
const inputImagenEditar =
    document.getElementById("inputImagenEditar");
const contenedorImagenEditar =
    document.getElementById("contenedorImagenEditar");
const textoImagenEditar =
    document.getElementById("textoImagenEditar");
const iconoImagenEditar =
    document.querySelector(".contenedor_imagen_editar i");
const botonesTallasEditar =
    document.querySelectorAll(".boton_talla_bloque_2");
const botonEditarTodo =
    document.getElementById("botonEditarTodo");
let indexProductoEditando = null;
let nuevasImagenesEditar = [];
document.addEventListener("click", function (evento) {
    const botonEditar = evento.target.closest(".editar");
    if (!botonEditar) return;
    const index = botonEditar.dataset.index;
    indexProductoEditando = index;
    const productosGuardados =
        JSON.parse(localStorage.getItem(CLAVE_PRODUCTOS)) || [];
    const producto = productosGuardados[index];
    inputEditarNombre.value = producto.nombre;
    inputEditarSku.value = producto.sku;
    inputEditarCodigoBarra.value = producto.codigo_barras;
    selectEditarCategoria.value = producto.categoria;
    selectEditarMarca.value = producto.marca;
    inputEditarStock.value = producto.stock;
    selectEditarEstado.value = producto.estado;
    selectEditarDescuento.value = producto.descuento;
    selectEditarColor.value = producto.color;
    inputEditarStockMinimo.value = producto.stock_minimo;
    inputEditarPrecio.value = producto.precio;
    previewImagenesEditar.innerHTML = "";
    nuevasImagenesEditar = [];
    if (producto.imagenes && producto.imagenes.length > 0) {
        iconoImagenEditar.style.display = "none";
        textoImagenEditar.style.display = "none";
        producto.imagenes.forEach(function (imagen) {
            const img = document.createElement("img");
            img.src = imagen;
            previewImagenesEditar.appendChild(img);
        });
    } else {
        iconoImagenEditar.style.display = "block";
        textoImagenEditar.style.display = "block";
    }
    botonesTallasEditar.forEach(function (boton) {
        boton.classList.remove("talla_activa");
    });
    overlayEditarProducto.style.display = "flex";
});
botonCerrarEditar.addEventListener("click", function () {
    overlayEditarProducto.style.display = "none";
});
botonesTallasEditar.forEach(function (boton) {
    boton.addEventListener("click", function (evento) {
        evento.preventDefault();
        boton.classList.toggle("talla_activa");
    });
});
contenedorImagenEditar.addEventListener("click", function () {
    inputImagenEditar.click();
});
inputImagenEditar.addEventListener("change", function (evento) {
    const archivos = Array.from(evento.target.files);
    previewImagenesEditar.innerHTML = "";
    nuevasImagenesEditar = [];
    if (archivos.length > 0) {
        iconoImagenEditar.style.display = "none";
        textoImagenEditar.style.display = "none";
    }
    archivos.forEach(function (file) {
        const lector = new FileReader();
        lector.onload = function (e) {
            const base64 = e.target.result;
            nuevasImagenesEditar.push(base64);
            const img = document.createElement("img");
            img.src = base64;
            previewImagenesEditar.appendChild(img);
        };
        lector.readAsDataURL(file);
    });
});
botonEditarTodo.addEventListener("click", function () {
    const productosGuardados =
        JSON.parse(localStorage.getItem(CLAVE_PRODUCTOS)) || [];
    const producto =
        productosGuardados[indexProductoEditando];
    producto.nombre = inputEditarNombre.value;
    producto.sku = inputEditarSku.value;
    producto.codigo_barras = inputEditarCodigoBarra.value;
    producto.categoria = selectEditarCategoria.value;
    producto.marca = selectEditarMarca.value;
    producto.stock = inputEditarStock.value;
    producto.estado = selectEditarEstado.value;
    producto.descuento = selectEditarDescuento.value;
    producto.color = selectEditarColor.value;
    producto.stock_minimo = inputEditarStockMinimo.value;
    producto.precio = inputEditarPrecio.value;
    const tallasSeleccionadas = [];
    botonesTallasEditar.forEach(function (boton) {
        if (boton.classList.contains("talla_activa")) {
            tallasSeleccionadas.push(boton.textContent);
        }
    });
    producto.tallas = tallasSeleccionadas;
    if (nuevasImagenesEditar.length > 0) {
        producto.imagenes = nuevasImagenesEditar;
    }
    localStorage.setItem(
        CLAVE_PRODUCTOS,
        JSON.stringify(productosGuardados)
    );
    mostrarProductosTablero();
    overlayEditarProducto.style.display = "none";
});