//--------------------------------------//
//--|funcionalidad_menu_de_navegacion|--//
//--------------------------------------//
const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");
const contents = document.querySelectorAll(
    ".main-content, .main-content-2, .main-content-3, .main-content-4, .main-content-5, .main-content-6, .main-content-7"
);
menuToggle.addEventListener("click", () => {
    sidebar.classList.toggle("active");
    contents.forEach(content => {
        content.classList.toggle("active");
    });
});
//-------------------------------------//
//--|funcionalidad_grafica_de_tienda|--//
//-------------------------------------//
document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById('miGrafica');
    if (!canvas) {
        console.error("Canvas no encontrado");
        return;
    }
    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['productos', 'vendidos', 'registrados', 'total'],
            datasets: [
                {
                    data: [24, 16, 12, 15],
                    backgroundColor: '#5b7bd5'
                },
                {
                    data: [15, 14, 10, 10],
                    backgroundColor: '#9b83d4'
                },
                {
                    data: [8, 10, 8, 0],
                    backgroundColor: '#e6b26d'
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    stacked: true,
                    ticks: { color: '#000' }
                },
                y: {
                    stacked: true,
                    beginAtZero: true,
                    ticks: { color: '#000' }
                }
            }
        }
    });
});
//----------------------------------------//
//--|funcionalidad_tarjetas_de_progreso|--//
//----------------------------------------//
document.addEventListener("DOMContentLoaded", () => {
    let totalProductos = 0;
    let productosVendidos = 0;
    let usuariosRegistrados = 0;
    document.getElementById("totalProductos").textContent = totalProductos;
    document.getElementById("productosVendidos").textContent = productosVendidos;
    document.getElementById("usuariosRegistrados").textContent = usuariosRegistrados;
});
//---------------------------------//
//--|funcionalidad_acceso_rapido|--//
//---------------------------------//
document.querySelectorAll(".btn-acceso").forEach(btn => {
    btn.addEventListener("click", () => {
        const opcion = btn.textContent;
        console.log("Accediendo a:", opcion);
        switch(opcion) {
            case "Tienda":
                window.location.href = "tienda.html";
                break;
            case "Productos":
                window.location.href = "productos.html";
                break;
            case "Inventario":
                window.location.href = "inventario.html";
                break;
            case "Configuración":
                window.location.href = "configuracion.html";
                break;
            default:
                alert("Sección en construcción: " + opcion);
        }
    });
});
//-------------------------------//
//--|funcionalidad_mis_aliados|--//
//-------------------------------//
document.querySelectorAll(".btn-aliado").forEach(btn => {
    btn.addEventListener("click", () => {                
        const aliado = btn.textContent;                  
        console.log("Entrando al aliado:", aliado);      
        alert("Perfil del " + aliado);                   
    });                                                  
});                                                   
//----------------------------------//
//--|funcionalidad_mis_categorias|--//
//----------------------------------//
document.addEventListener("DOMContentLoaded", () => {                  
    const contenedor = document.getElementById("contenedorCategorias");
    let categorias = [                                                 
        "Camisas",                                                     
        "Pantalones",                                                  
        "Zapatos",                                                     
        "Accesorios",                                                  
        "Deportiva",                                                   
        "Formal"                                                       
    ];                                                                 
    function mostrarCategorias() {                                     
        contenedor.innerHTML = "";                                     
        categorias.forEach(categoria => {                              
            const div = document.createElement("div");                 
            div.classList.add("categoria");                            
            div.textContent = categoria;                               
            div.addEventListener("click", () => {
                console.log("Categoría seleccionada:", categoria);
            });
            contenedor.appendChild(div);                               
        });                                                            
    }                                                                  
    mostrarCategorias();                                               
});
//-----------------------------//
//--|funcionalidad_mi_tienda|--//
//-----------------------------//
document.querySelectorAll(".btn-ingresar").forEach(btn => {
    btn.addEventListener("click", () => {
        console.log("Entrando a la tienda...");
        window.location.href = "tienda.html";
    });
});                                                                      
//----------------------------------------//
//--|funcionalidad_resumen_de_historial|--//
//----------------------------------------//
document.addEventListener("DOMContentLoaded", () => {                            
    const contenedor = document.getElementById("contenedorMovimientos");         
    const buscador = document.getElementById("buscarHistorial");                 
    const filtro = document.getElementById("filtrarHistorial");                  
    let movimientos = [                                                          
        { texto: "Se agregó producto Camisa Azul", tipo: "producto" },           
        { texto: "Se vendió producto Zapatos Nike", tipo: "venta" },             
        { texto: "Nuevo usuario registrado", tipo: "usuario" },                  
        { texto: "Se agregó producto Pantalón", tipo: "producto" },              
        { texto: "Se vendió producto Gorra", tipo: "venta" },                    
        { texto: "Se agregó producto Camisa Azul", tipo: "producto" },           
        { texto: "Se vendió producto Zapatos Nike", tipo: "venta" },             
        { texto: "Nuevo usuario registrado", tipo: "usuario" },                  
        { texto: "Se agregó producto Pantalón", tipo: "producto" },              
        { texto: "Se vendió producto Gorra", tipo: "venta" }                     
    ];                                                                           
    function obtenerFecha() {                                                    
        return new Date().toLocaleString();                                      
    }                                                                            
    function mostrarMovimientos(lista) {                                         
        contenedor.innerHTML = "";                                               
        lista.slice().reverse().forEach(mov => {                                 
            const div = document.createElement("div");                           
            div.classList.add("movimiento");                                     
            div.innerHTML = `                                                    
                <span>${mov.texto}</span>                                        
                <small>${obtenerFecha()}</small>                                 
            `;                                                                   
            contenedor.appendChild(div);                                         
        });                                                                      
    }                                                                            
    function filtrarMovimientos() {                                              
        const textoBusqueda = buscador.value.toLowerCase();                      
        const tipoFiltro = filtro.value;                                         
        let filtrados = movimientos.filter(mov => {                              
            let coincideTexto = mov.texto.toLowerCase().includes(textoBusqueda); 
            let coincideTipo = tipoFiltro === "todos" || mov.tipo === tipoFiltro;
            return coincideTexto && coincideTipo;                                
        });                                                                      
        mostrarMovimientos(filtrados);                                           
    }                                                                            
    buscador.addEventListener("input", filtrarMovimientos);                      
    filtro.addEventListener("change", filtrarMovimientos);       
    mostrarMovimientos(movimientos);
});