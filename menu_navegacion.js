//------------------------------------//
//--|funcionalidad_menu_hamburguesa|--//
//------------------------------------//
const toggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');
toggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});
//--------------------------------------------//
//--|funcionalidad_almacenamiento_de_pagina|--//
//--------------------------------------------//
function cargarPaginasEnMenu() {
    const listaPaginasMenu = document.getElementById("listaPaginasMenu");
    listaPaginasMenu.innerHTML = ""; 
    const paginasGuardadas = JSON.parse(localStorage.getItem("paginas")) || [];
    const seleccionadas = JSON.parse(localStorage.getItem("paginasMenu")) || [];
    if (paginasGuardadas.length === 0) {
        listaPaginasMenu.innerHTML = "<p>No hay páginas creadas.</p>";
        return;
    }
    paginasGuardadas.forEach((pagina, index) => {
        const label = document.createElement("label");
        label.classList.add("page-item");
        const checked = seleccionadas.includes(index.toString()) ? "checked" : "";
        label.innerHTML = `
            <input type="checkbox" disabled data-index="${index}" ${checked}> ${pagina.titulo}
        `;
        listaPaginasMenu.appendChild(label);
        listaPaginasMenu.appendChild(document.createElement("br"));
    });
    if (seleccionadas.length >= 10) {
        const aviso = document.createElement("p");
        aviso.textContent = "⚠️ Ya has alcanzado el límite de páginas agregadas aquí.";
        aviso.style.color = "red";
        aviso.style.fontWeight = "bold";
        listaPaginasMenu.appendChild(aviso);
    }
}
function cargarAjustes() {
    const listaAjustes = document.getElementById("listaAjustes");
    if (!listaAjustes) return;
    listaAjustes.innerHTML = "";
    const paginasGuardadas = JSON.parse(localStorage.getItem("paginas")) || [];
    let seleccionadas = JSON.parse(localStorage.getItem("paginasMenu")) || [];
    if (seleccionadas.length === 0) {
        listaAjustes.innerHTML = "<p>No hay páginas agregadas al menú.</p>";
        return;
    }
    seleccionadas.forEach((index, posicion) => {
        const pagina = paginasGuardadas[index];
        if (pagina) {
            const div = document.createElement("div");
            div.classList.add("ajuste-item");
            div.innerHTML = `
                <span>${pagina.titulo}</span>
                <div class="ajuste-buttons">
                    <button class="btn-up" data-pos="${posicion}">⬆</button>
                    <button class="btn-down" data-pos="${posicion}">⬇</button>
                </div>
            `;
            listaAjustes.appendChild(div);
        }
    });
    document.querySelectorAll(".btn-up").forEach(btn => {
        btn.addEventListener("click", () => {
            const pos = parseInt(btn.getAttribute("data-pos"));
            if (pos > 0) {
                [seleccionadas[pos - 1], seleccionadas[pos]] = [seleccionadas[pos], seleccionadas[pos - 1]];
                localStorage.setItem("paginasMenu", JSON.stringify(seleccionadas));
                cargarAjustes();
            }
        });
    });
    document.querySelectorAll(".btn-down").forEach(btn => {
        btn.addEventListener("click", () => {
            const pos = parseInt(btn.getAttribute("data-pos"));
            if (pos < seleccionadas.length - 1) {
                [seleccionadas[pos + 1], seleccionadas[pos]] = [seleccionadas[pos], seleccionadas[pos + 1]];
                localStorage.setItem("paginasMenu", JSON.stringify(seleccionadas));
                cargarAjustes();
            }
        });
    });
}
function guardarPaginasMenu() {
    const seleccionadas = [];
    document.querySelectorAll("#listaPaginasMenu input[type='checkbox']:checked")
        .forEach(chk => {
            const index = chk.getAttribute("data-index");
            seleccionadas.push(index);
        });
    localStorage.setItem("paginasMenu", JSON.stringify(seleccionadas));
}
document.getElementById("btnSeleccionar").addEventListener("click", () => {
    document.querySelectorAll("#listaPaginasMenu input[type='checkbox']")
        .forEach(chk => chk.disabled = false);
    document.getElementById("btnAñadir").disabled = false;
    alert("✅ Ahora puedes seleccionar páginas para el menú.");
});
document.getElementById("btnBorrar").addEventListener("click", () => {
    if (confirm("⚠️ ¿Seguro que quieres borrar todas las páginas?")) {
        localStorage.removeItem("paginas");
        localStorage.removeItem("paginasMenu"); 
        cargarPaginasEnMenu();
        cargarAjustes();
        document.getElementById("btnAñadir").disabled = true;
        alert("❌ Todas las páginas fueron borradas.");
    }
});
document.getElementById("btnAñadir").addEventListener("click", () => {
    const seleccionadas = [];
    document.querySelectorAll("#listaPaginasMenu input[type='checkbox']:checked")
        .forEach(chk => {
            const index = chk.getAttribute("data-index");
            seleccionadas.push(index);
        });
    if (seleccionadas.length === 0) {
        alert("⚠️ No seleccionaste ninguna página.");
        return;
    }
    localStorage.setItem("paginasMenu", JSON.stringify(seleccionadas));
    alert("🌐 Páginas añadidas al menú: " + seleccionadas.length);
    cargarPaginasEnMenu();
    cargarAjustes();
});
window.addEventListener("load", () => {
    cargarPaginasEnMenu();
    cargarAjustes();
});
function showTab(event, tabId) {
    event.preventDefault();
    document.querySelectorAll(".tabs a").forEach(tab => tab.classList.remove("active"));
    event.target.classList.add("active");
    document.querySelectorAll(".page-list").forEach(list => list.style.display = "none");
    document.getElementById(tabId).style.display = "block";
}
//------------------------------------//
//--|funcionalidad_agregar_imagenes|--//
//------------------------------------//
const inputImagen = document.getElementById("inputImagen");
const btnGuardar = document.getElementById("btnGuardar");
let imagenBase64 = "";
inputImagen.addEventListener("change", () => {
    const file = inputImagen.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            imagenBase64 = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});
btnGuardar.addEventListener("click", () => {
    if (!imagenBase64) {
        alert("⚠️ Primero selecciona una imagen.");
        return;
    }
    localStorage.setItem("imagenGuardada", imagenBase64);
    const opcionesHTML = "<button>Editar</button> <button>Eliminar</button>";
    const submenuHTML = "Aquí va el submenú";
    agregarFila(imagenBase64, opcionesHTML, submenuHTML);
    alert("✅ Imagen guardada y añadida a la tabla.");
});
//------------------------------------//
//--|funcionalidad_ajustar_opciones|--//
//------------------------------------//
function cargarAjustes() {
    const listaAjustes = document.getElementById("listaAjustes");
    listaAjustes.innerHTML = "";
    const paginasGuardadas = JSON.parse(localStorage.getItem("paginas")) || [];
    let seleccionadas = JSON.parse(localStorage.getItem("paginasMenu")) || [];
    if (seleccionadas.length === 0) {
        listaAjustes.innerHTML = "<p>No hay páginas agregadas al menú.</p>";
        return;
    }
    seleccionadas.forEach((index, posicion) => {
        const pagina = paginasGuardadas[index];
        if (pagina) {
            const div = document.createElement("div");
            div.classList.add("ajuste-item");
            div.innerHTML = `
                <span>${pagina.titulo}</span>
                <div class="ajuste-buttons">
                    <button class="btn-up" data-pos="${posicion}">⬆</button>
                    <button class="btn-down" data-pos="${posicion}">⬇</button>
                </div>
            `;
            listaAjustes.appendChild(div);
        }
    });
    document.querySelectorAll(".btn-up").forEach(btn => {
        btn.addEventListener("click", () => {
            const pos = parseInt(btn.getAttribute("data-pos"));
            if (pos > 0) {
                [seleccionadas[pos - 1], seleccionadas[pos]] = [seleccionadas[pos], seleccionadas[pos - 1]];
                localStorage.setItem("paginasMenu", JSON.stringify(seleccionadas));
                cargarAjustes();
            }
        });
    });
    document.querySelectorAll(".btn-down").forEach(btn => {
        btn.addEventListener("click", () => {
            const pos = parseInt(btn.getAttribute("data-pos"));
            if (pos < seleccionadas.length - 1) {
                [seleccionadas[pos + 1], seleccionadas[pos]] = [seleccionadas[pos], seleccionadas[pos + 1]];
                localStorage.setItem("paginasMenu", JSON.stringify(seleccionadas));
                cargarAjustes();
            }
        });
    });
}
window.addEventListener("load", cargarAjustes);
//---------------------------//
//--|funcionalidad_submenu|--//
//---------------------------//
const paginaPrincipalSelect = document.getElementById("paginaPrincipal");
const contenedorSubpaginas = document.getElementById("contenedorSubpaginas");
const listaSubmenus = document.getElementById("listaSubmenus");
function getPaginasEnMenuStorage() {
    const rawMenu = JSON.parse(localStorage.getItem("paginasMenu"))
        || JSON.parse(localStorage.getItem("paginas_menu"))
        || [];
    const paginasAll = JSON.parse(localStorage.getItem("paginas")) || [];
    const result = [];
    rawMenu.forEach(item => {
        if (item == null) return;
        if (typeof item === "string" || typeof item === "number") {
            const idx = parseInt(item);
            const pageObj = paginasAll[idx];
            if (pageObj && (pageObj.titulo || pageObj.nombre)) {
                result.push({ nombre: pageObj.titulo || pageObj.nombre });
            }
        } else if (typeof item === "object") {
            const nombre = item.nombre || item.titulo;
            if (nombre) result.push({ nombre: String(nombre) });
        }
    });
    return result;
}
function cargarPaginasEnSelector() {
    paginaPrincipalSelect.innerHTML = '<option disabled selected>Selecciona una página del menú</option>';
    const paginasEnMenu = getPaginasEnMenuStorage();
    if (paginasEnMenu.length === 0) {
        paginaPrincipalSelect.innerHTML = '<option disabled selected>No hay páginas en el menú</option>';
        return;
    }
    paginasEnMenu.forEach(pagina => {
        const option = document.createElement("option");
        option.value = pagina.nombre;
        option.textContent = pagina.nombre;
        paginaPrincipalSelect.appendChild(option);
    });
}
function actualizarCheckboxes() {
    contenedorSubpaginas.innerHTML = "";
    const paginaPrincipal = paginaPrincipalSelect.value;
    const paginasEnMenu = getPaginasEnMenuStorage();
    const subpaginas = paginasEnMenu
        .filter(p => p.nombre !== paginaPrincipal)
        .map(p => p.nombre);
    if (subpaginas.length === 0) {
        contenedorSubpaginas.innerHTML = "<p style='color:#666;'>No hay otras páginas en el menú</p>";
        return;
    }
    subpaginas.forEach(nombre => {
        const label = document.createElement("label");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.value = nombre;
        label.appendChild(checkbox);
        label.append(" " + nombre);
        contenedorSubpaginas.appendChild(label);
        contenedorSubpaginas.appendChild(document.createElement("br"));
    });
}
function crearSubmenu() {
    const paginaPrincipal = paginaPrincipalSelect.value;
    if (!paginaPrincipal || paginaPrincipal === "Selecciona una página del menú") {
        alert("Selecciona una página principal.");
        return;
    }
    const checkboxes = contenedorSubpaginas.querySelectorAll("input[type=checkbox]:checked");
    const subpaginasSeleccionadas = Array.from(checkboxes).map(cb => cb.value);
    if (subpaginasSeleccionadas.length === 0) {
        alert("Selecciona al menos una subpágina.");
        return;
    }
    const yaExiste = Array.from(listaSubmenus.children).some(item =>
        item.textContent.includes(paginaPrincipal)
    );
    if (yaExiste) {
        alert("Ya existe un submenú para esta página.");
        return;
    }
    const item = document.createElement("li");
    item.textContent = `${paginaPrincipal} ➝ Submenú: ${subpaginasSeleccionadas.join(", ")}`;
    listaSubmenus.appendChild(item);
    const submenuData = {
        principal: paginaPrincipal,
        subpaginas: subpaginasSeleccionadas
    };
    localStorage.setItem("submenuTabla", JSON.stringify(submenuData));
    cargarTablaDesdePaginas();
    paginaPrincipalSelect.selectedIndex = 0;
    contenedorSubpaginas.innerHTML = "";
}
document.addEventListener("DOMContentLoaded", () => {
    cargarPaginasEnSelector();
    paginaPrincipalSelect.addEventListener("change", actualizarCheckboxes);
    document.getElementById("btnCrearSubmenu").addEventListener("click", crearSubmenu);
});
window.addEventListener("load", () => {
    cargarTablaDesdePaginas();
});
//---------------------------------------//
//--|funcionalidad_despliegue_de_tabla|--//
//---------------------------------------//
function agregarFila(imagenURL, opcionesHTML, submenuHTML) {
    const tabla = document.getElementById("tabla-contenido");
    tabla.innerHTML = ""; 
    const fila = document.createElement("tr");
    const celdaImagen = document.createElement("td");
    if (imagenURL) {
        const img = document.createElement("img");
        img.src = imagenURL;
        img.style.maxWidth = "120px";
        img.style.height = "auto";
        celdaImagen.appendChild(img);
    }
    fila.appendChild(celdaImagen);
    const celdaOpciones = document.createElement("td");
    celdaOpciones.innerHTML = opcionesHTML || "";
    fila.appendChild(celdaOpciones);
    const celdaSubmenu = document.createElement("td");
    celdaSubmenu.innerHTML = submenuHTML || "";
    fila.appendChild(celdaSubmenu);
    tabla.appendChild(fila);
}
function cargarTablaDesdePaginas() {
    const paginasGuardadas = JSON.parse(localStorage.getItem("paginas")) || [];
    const tablaIndices = JSON.parse(localStorage.getItem("tablaPaginas")) || [];
    const imagenGuardada = localStorage.getItem("imagenTabla") || "";
    const submenuGuardadoRaw = localStorage.getItem("submenuTabla");
    if (tablaIndices.length === 0 && !imagenGuardada && !submenuGuardadoRaw) {
        document.getElementById("tabla-contenido").innerHTML = "";
        return;
    }
    let opcionesHTML = `<div class="opciones-bloque">`;
    tablaIndices.forEach(rawIdx => {
        const index = parseInt(rawIdx);
        const pagina = paginasGuardadas[index];
        if (!pagina) return;
        opcionesHTML += `<span class="opcion-item" data-idx="${index}">${pagina.titulo}</span>`;
    });
    opcionesHTML += `</div>`;
    let submenuHTML = "";
    if (submenuGuardadoRaw) {
        const submenuData = JSON.parse(submenuGuardadoRaw);
        submenuHTML = `<a href="#" class="submenu-link submenu-clickable">${submenuData.principal}</a>`;
    }
    agregarFila(imagenGuardada, opcionesHTML, submenuHTML);
}
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("submenu-clickable")) {
        e.preventDefault();
        const submenuGuardadoRaw = localStorage.getItem("submenuTabla");
        if (submenuGuardadoRaw) {
            const submenuData = JSON.parse(submenuGuardadoRaw);
            alert(
                `Submenú: ${submenuData.principal}\nOpciones:\n- ${submenuData.subpaginas.join("\n- ")}`
            );
        }
    }
});
document.querySelectorAll(".btn-add2").forEach(btn => {
    btn.addEventListener("click", () => {
        const seleccionadas = JSON.parse(localStorage.getItem("paginasMenu")) || [];
        if (seleccionadas.length === 0) {
            alert("⚠️ No hay páginas seleccionadas en el menú para añadir.");
            return;
        }
        let tablaIndices = JSON.parse(localStorage.getItem("tablaPaginas")) || [];
        if (tablaIndices.length >= 1) {
            alert("❌ Solo se permite un contenido en la tabla.");
            return;
        }
        tablaIndices = seleccionadas.map(i => String(i));
        localStorage.setItem("tablaPaginas", JSON.stringify(tablaIndices));
        cargarTablaDesdePaginas();
        alert("✅ Página añadida a la tabla.");
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const inputImagen = document.getElementById("inputImagen");
    const btnGuardar = document.getElementById("btnGuardar");
    let imagenBase64 = "";
    if (inputImagen) {
        inputImagen.addEventListener("change", () => {
            const file = inputImagen.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    imagenBase64 = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }
    if (btnGuardar) {
        btnGuardar.addEventListener("click", () => {
            if (!imagenBase64) {
                alert("⚠️ Primero selecciona una imagen.");
                return;
            }
            localStorage.setItem("imagenTabla", imagenBase64);
            cargarTablaDesdePaginas();
            alert("✅ Imagen guardada y aplicada a la tabla.");
        });
    }
});
document.addEventListener("click", (e) => {
    if (e.target && e.target.id === "btnClearTabla") {
        localStorage.removeItem("tablaPaginas");
        localStorage.removeItem("imagenTabla");
        localStorage.removeItem("submenuTabla");
        cargarTablaDesdePaginas();
        alert("🗑 Tabla vaciada.");
    }
});