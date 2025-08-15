//------------------------------------//
//--|funcionalidad_menu_hamburguesa|--//
//------------------------------------//
const toggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');
toggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});
//--------------------------------------//
//--|funcionalidad_gestion_de_paginas|--//
//--------------------------------------//
let paginas = [];
let papelera = [];
const listaPaginas = document.getElementById("listaPaginas");
const papeleraPaginas = document.getElementById("papeleraPaginas");
const busqueda = document.getElementById("busqueda");
const btnNueva = document.getElementById("btnNueva");
const btnGuardar = document.getElementById("btnGuardar"); 
const LIMITE_PAGINAS = 10;
const modal = document.getElementById("modal-crear");
const cerrar = document.querySelector(".cerrar");
const formCrear = document.getElementById("form-crear");
btnNueva.addEventListener("click", () => {
    modal.style.display = "flex";
});
cerrar.onclick = () => modal.style.display = "none";
window.onclick = (e) => { if (e.target === modal) modal.style.display = "none"; }
function guardarEnLocalStorage() {
    localStorage.setItem("paginas", JSON.stringify(paginas));
    localStorage.setItem("papelera", JSON.stringify(papelera));
}
formCrear.addEventListener("submit", (e) => {
    e.preventDefault();
    if (paginas.length >= LIMITE_PAGINAS) {
        alert("⚠️ Has cruzado el límite de páginas permitido.");
        return;
    }
    const nombre = document.getElementById("nombre").value.trim();
    const estado = document.getElementById("estado").value;
    const fecha = new Date().toISOString().split("T")[0];
    if (nombre) {
        const estadoPagina = (estado === "publico") ? "Publicada" : "Privada";
        paginas.push({ 
            titulo: nombre, 
            fecha, 
            estado: estadoPagina,
            favorito: false,
            pendiente: false,
            inicio: false 
        });
        renderPaginas();
        guardarEnLocalStorage();
        modal.style.display = "none";
        formCrear.reset();
        alert("✅ Se creó una página exitosamente.");
    } else {
        alert("Por favor ingrese un nombre para la página.");
    }
});
function renderPaginas(filtro = "todas") {
    listaPaginas.innerHTML = "";
    const existeInicio = paginas.some(p => p.inicio);
    paginas
        .filter(p => {
            if (!busqueda.value || p.titulo.toLowerCase().includes(busqueda.value.toLowerCase())) {
                if (filtro === "todas") return true;
                if (filtro === "publicadas") return p.estado === "Publicada";
                if (filtro === "privadas") return p.estado === "Privada";
            }
            return false;
        })
        .forEach((p, i) => {
            listaPaginas.innerHTML += `
                <tr>
                    <td>
                        ${p.titulo}
                        ${p.inicio ? ' <span style="color:green;"></span>' : ''}
                    </td>
                    <td style="text-align:center;">${p.fecha}</td>
                    <td style="text-align:center;">${p.estado}</td>
                    <td style="text-align:center;">
                        <button class="btn-accion" onclick="editarPagina(${i})"><i class="fas fa-edit"></i></button>
                        <button class="btn-accion" onclick="verPagina(${i})"><i class="fas fa-eye"></i></button>
                        <button class="btn-accion" onclick="eliminarPagina(${i})"><i class="fas fa-trash"></i></button>
                        <button class="btn-accion" onclick="marcarFavorito(${i})">
                            <i class="${p.favorito ? 'fas fa-star' : 'far fa-star'}"></i>
                        </button>
                        <button class="btn-accion" onclick="marcarPendiente(${i})">
                            <i class="${p.pendiente ? 'fas fa-clock' : 'far fa-clock'}"></i>
                        </button>
                        ${
                            p.inicio
                            ?   `<button class="btn-accion" disabled>
                                    <i class="fas fa-home" style="color:green"></i>
                                </button>`
                            : (!existeInicio
                                ?   `<button class="btn-accion" onclick="marcarComoInicio(${i})">
                                        <i class="fas fa-home" style="color:gray"></i>
                                    </button>`
                                : "")
                        }
                    </td>
                </tr>
            `;
        });
}
function renderPapelera() {
    papeleraPaginas.innerHTML = "";
    papelera.forEach((p, i) => {
        papeleraPaginas.innerHTML += `
            <tr>
                <td>${p.titulo}</td>
                <td style="text-align:center;">${p.fecha}</td>
                <td style="text-align:center;">
                    <button class="btn-accion" onclick="restaurarPagina(${i})"><i class="fas fa-undo"></i></button>
                    <button class="btn-accion" onclick="borrarDefinitivo(${i})"><i class="fas fa-times"></i></button>
                </td>
            </tr>
        `;
    });
}
function editarPagina(i) {
    const nuevoTitulo = prompt("Editar título de la página:", paginas[i].titulo);
    if (nuevoTitulo) {
        paginas[i].titulo = nuevoTitulo;
        renderPaginas();
        guardarEnLocalStorage();
    }
}
function verPagina(i) {
    alert(`Vista previa de la página: ${paginas[i].titulo}`);
}
function eliminarPagina(i) {
    const nombrePagina = paginas[i].titulo;
    papelera.push(paginas[i]);
    paginas.splice(i, 1);
    renderPaginas();
    renderPapelera();
    guardarEnLocalStorage();
    alert(`🗑️ La página "${nombrePagina}" ha sido eliminada.`);
}
function restaurarPagina(i) {
    const nombrePagina = papelera[i].titulo;
    paginas.push(papelera[i]);
    papelera.splice(i, 1);
    renderPaginas();
    renderPapelera();
    guardarEnLocalStorage();
    alert(`♻️ La página "${nombrePagina}" ha sido recuperada.`);
}
function borrarDefinitivo(i) {
    const nombrePagina = papelera[i].titulo;
    papelera.splice(i, 1);
    renderPapelera();
    guardarEnLocalStorage();
    alert(`❌ La página "${nombrePagina}" ha sido eliminada definitivamente.`);
}
function marcarFavorito(i) {
    paginas[i].favorito = !paginas[i].favorito;
    renderPaginas();
    guardarEnLocalStorage();
    if (paginas[i].favorito) {
        alert(`⭐ La página "${paginas[i].titulo}" se ha marcado como favorito.`);
    } else {
        alert(`⚪ La página "${paginas[i].titulo}" se ha quitado de favoritos.`);
    }
}
function marcarPendiente(i) {
    paginas[i].pendiente = !paginas[i].pendiente;
    renderPaginas();
    guardarEnLocalStorage();
    if (paginas[i].pendiente) {
        alert(`⏰ La página "${paginas[i].titulo}" se ha marcado como pendiente.`);
    } else {
        alert(`✅ La página "${paginas[i].titulo}" se ha quitado de pendientes.`);
    }
}
function marcarComoInicio(i) {
    paginas.forEach((p, index) => {
        p.inicio = (index === i);
    });
    renderPaginas();
    guardarEnLocalStorage();
    alert(`La página "${paginas[i].titulo}" se ha establecido como la página de inicio.`);
}
busqueda.addEventListener("input", () => renderPaginas());
function mostrarSeccion(seccion) {
    const tablaPaginas = document.getElementById("tablaPaginas");
    const tablaPapelera = document.getElementById("tablaPapelera");
    const botones = document.querySelectorAll(".filtros button");
    botones.forEach(btn => btn.classList.remove("activo"));
    document.querySelector(`.filtros button[onclick="mostrarSeccion('${seccion}')"]`)
        .classList.add("activo");
    if (seccion === "papelera") {
        tablaPaginas.style.display = "none";
        tablaPapelera.style.display = "table";
    } else {
        tablaPaginas.style.display = "table";
        tablaPapelera.style.display = "none";
        renderPaginas(seccion);
    }
}
btnGuardar.addEventListener("click", () => {
    guardarEnLocalStorage();
    let nombresPaginas = paginas.map(p => p.titulo);
    localStorage.setItem("paginasGuardadas", JSON.stringify(nombresPaginas));
    alert("Contenido guardado correctamente ✅");
});
window.addEventListener("load", () => {
    const paginasGuardadas = localStorage.getItem("paginas");
    const papeleraGuardada = localStorage.getItem("papelera");
    if (paginasGuardadas) paginas = JSON.parse(paginasGuardadas);
    if (papeleraGuardada) papelera = JSON.parse(papeleraGuardada);
    renderPaginas();
    renderPapelera();
    const paginaInicio = paginas.find(p => p.inicio);
    if (paginaInicio) {
        alert(`🌐 Página de inicio actual: "${paginaInicio.titulo}"`);
    }
});