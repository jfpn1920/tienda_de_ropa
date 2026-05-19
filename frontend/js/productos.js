//--------------------------------------//
//--|funcionalidad_menu_de_navegacion|--//
//--------------------------------------//
const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");
const contents = document.querySelectorAll(
    ".main-content-15, .main-content-16, .main-content-17"
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

        //--------------------------------//
        //--|validacion_del_formulario|--//
        //--------------------------------//
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

        //-----------------------------------//
        //--|obtener_tallas_seleccionadas|--//
        //-----------------------------------//
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

        //--------------------------------//
        //--|obtener_imagenes_producto|--//
        //--------------------------------//
        const archivos =
            Array.from(
                inputImagen.files
            );

        const imagenesProducto =
            [];

        //--------------------------------//
        //--|si_hay_imagenes|--//
        //--------------------------------//
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

                            //--------------------------------//
                            //--|cuando_termine_todas|--//
                            //--------------------------------//
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

                                //--------------------------------//
                                //--|guardar_en_localstorage|--//
                                //--------------------------------//
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

            //--------------------------------//
            //--|si_no_hay_imagenes|--//
            //--------------------------------//
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
                        class="boton_accion editar"
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
//--------------------------------//
//--|eliminar_producto_tablero|--//
//--------------------------------//
document.addEventListener(
    "click",
    function (evento) {

        //--------------------------------//
        //--|boton_eliminar_producto|--//
        //--------------------------------//
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

            //--------------------------------//
            //--|alert_confirmacion|--//
            //--------------------------------//
            const confirmarEliminar =
                confirm(
                    "¿Deseas eliminar este producto?"
                );

            //--------------------------------//
            //--|si_cancela|--//
            //--------------------------------//
            if (
                !confirmarEliminar
            ) {

                return;

            }

            //--------------------------------//
            //--|obtener_productos_guardados|--//
            //--------------------------------//
            const productosGuardados =
                JSON.parse(
                    localStorage.getItem(
                        CLAVE_PRODUCTOS
                    )
                ) || [];

            //--------------------------------//
            //--|eliminar_producto|--//
            //--------------------------------//
            productosGuardados.splice(
                index,
                1
            );

            //--------------------------------//
            //--|guardar_cambios|--//
            //--------------------------------//
            localStorage.setItem(
                CLAVE_PRODUCTOS,
                JSON.stringify(
                    productosGuardados
                )
            );

            //--------------------------------//
            //--|actualizar_tablero|--//
            //--------------------------------//
            mostrarProductosTablero();

        }

    }
);
window.addEventListener(
    "DOMContentLoaded",
    mostrarProductosTablero
);