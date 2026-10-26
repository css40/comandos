// Base de datos de comandos por Sistema Operativo (actualizada con Extras)
const database = {
    fedora: [
        { title: "Actualizar sistema", cmd: "sudo dnf upgrade", category: "packages", desc: "Actualiza todos los paquetes instalados en el sistema a su última versión." },
        { title: "Instalar un programa", cmd: "sudo dnf install <paquete>", category: "packages", desc: "Descarga e instala una nueva aplicación desde los repositorios de Fedora." },
        { title: "Desinstalar programa", cmd: "sudo dnf remove <paquete>", category: "packages", desc: "Elimina una aplicación y opcionalmente sus dependencias huérfanas." },
        { title: "Buscar un paquete", cmd: "sudo dnf search <nombre>", category: "packages", desc: "Busca programas disponibles en los repositorios oficiales y Flatpaks." },
        
        { title: "Ver procesos con btop", cmd: "sudo dnf install btop", category: "extras", desc: "Instala btop, un monitor de recursos moderno, visual y colorido para la terminal." },
        { title: "Información del sistema (Fastfetch)", cmd: "sudo dnf install fastfetch", category: "extras", desc: "Muestra el logo de Fedora y las especificaciones de tu equipo con estilo." },
        { title: "Buscador borroso (FZF)", cmd: "sudo dnf install fzf", category: "extras", desc: "Instala fzf para buscar archivos y comandos interactivamente en la terminal." },
        { title: "Listar archivos moderno (Eza)", cmd: "sudo dnf install eza", category: "extras", desc: "Una alternativa moderna, colorida y con iconos al clásico comando ls." },

        { title: "Ver procesos activos", cmd: "htop", category: "system", desc: "Muestra una tabla interactiva en tiempo real con el uso de CPU, RAM y procesos." },
        { title: "Ver espacio en disco", cmd: "df -h", category: "system", desc: "Muestra el espacio disponible y utilizado en las particiones de almacenamiento." },
        { title: "Listar archivos detallados", cmd: "ls -la", category: "files", desc: "Muestra todos los archivos (incluyendo ocultos) con permisos, tamaño y fecha." },
        { title: "Crear carpeta y subcarpetas", cmd: "mkdir -p <ruta/carpeta>", category: "files", desc: "Crea un directorio nuevo y cualquier carpeta intermedia necesaria." },
        { title: "Ver IP local", cmd: "ip a", category: "network", desc: "Muestra las interfaces de red activas y las direcciones IP asignadas." },
        { title: "Verificar puertos abiertos", cmd: "ss -tuln", category: "network", desc: "Lista los puertos de red que están escuchando conexiones entrantes." }
    ],
    ubuntu: [
        { title: "Actualizar sistema", cmd: "sudo apt update && sudo apt upgrade -y", category: "packages", desc: "Refresca la lista de repositorios y actualiza todo el sistema operativo." },
        { title: "Instalar un programa", cmd: "sudo apt install <paquete>", category: "packages", desc: "Instala aplicaciones desde los repositorios oficiales de Ubuntu/Debian." },
        { title: "Desinstalar programa", cmd: "sudo apt remove <paquete>", category: "packages", desc: "Elimina el paquete indicado conservando archivos de configuración." },
        { title: "Buscar un paquete", cmd: "apt search <nombre>", category: "packages", desc: "Busca paquetes disponibles en la base de datos de APT." },
        
        { title: "Ver procesos con btop", cmd: "sudo apt install btop", category: "extras", desc: "Instala btop para monitorear CPU, memoria y red con una interfaz gráfica en terminal." },
        { title: "Información del sistema (Fastfetch)", cmd: "sudo apt install fastfetch", category: "extras", desc: "Muestra el logotipo de Ubuntu y el resumen de hardware de forma elegante." },
        { title: "Buscador borroso (FZF)", cmd: "sudo apt install fzf", category: "extras", desc: "Potente buscador interactivo de líneas de comandos y archivos." },
        { title: "Listar archivos moderno (Eza)", cmd: "sudo apt install eza", category: "extras", desc: "Reemplazo moderno para ls con colores y vista estructurada." },

        { title: "Ver procesos activos", cmd: "top", category: "system", desc: "Monitor nativo del sistema para ver el rendimiento de CPU y memoria." },
        { title: "Ver espacio en disco", cmd: "df -h", category: "system", desc: "Muestra el uso de almacenamiento en formato legible para humanos." },
        { title: "Listar archivos detallados", cmd: "ls -la", category: "files", desc: "Muestra todos los archivos en detalle, ordenados por permisos y tamaño." },
        { title: "Crear carpeta y subcarpetas", cmd: "mkdir -p <ruta/carpeta>", category: "files", desc: "Crea directorios recursivamente sin arrojar errores si ya existen." },
        { title: "Ver IP local", cmd: "ip a", category: "network", desc: "Muestra la configuración de red y direcciones IP de la máquina." },
        { title: "Comprobar conexión (Ping)", cmd: "ping -c 4 google.com", category: "network", desc: "Envía 4 paquetes de prueba para verificar conectividad con internet." }
    ],
    windows: [
        { title: "Actualizar programas (Winget)", cmd: "winget upgrade --all", category: "packages", desc: "Actualiza todas las aplicaciones instaladas mediante el gestor oficial de Windows." },
        { title: "Instalar programa (Winget)", cmd: "winget install <nombre>", category: "packages", desc: "Busca e instala software de forma automatizada en Windows 10/11." },
        
        { title: "Instalar btop en Windows", cmd: "winget install aristocratos.btop", category: "extras", desc: "Instala el monitor de recursos btop en PowerShell a través de Winget." },
        { title: "Instalar Neofetch/Fastfetch", cmd: "winget install Fastfetch-cli.Fastfetch", category: "extras", desc: "Muestra las especificaciones del sistema con arte ASCII en Windows." },
        
        { title: "Ver configuración de red", cmd: "ipconfig", category: "network", desc: "Muestra la dirección IP local, máscara de subred y puerta de enlace predeterminada." },
        { title: "Ver procesos activos", cmd: "tasklist", category: "system", desc: "Muestra una lista de todos los procesos que se están ejecutando en el equipo." },
        { title: "Cerrar un proceso por nombre", cmd: "taskkill /im <nombre.exe> /f", category: "system", desc: "Forzar el cierre de una aplicación que no responde." },
        { title: "Comprobar archivos de sistema", cmd: "sfc /scannow", category: "system", desc: "Escanea y repara archivos corruptos del sistema operativo Windows." },
        { title: "Ver espacio en disco", cmd: "wmic logicaldisk get size,freespace,caption", category: "system", desc: "Muestra el espacio libre y total de las unidades de disco." },
        { title: "Listar archivos (PowerShell)", cmd: "Get-ChildItem", category: "files", desc: "Muestra los archivos y carpetas del directorio actual." },
        { title: "Crear carpeta", cmd: "mkdir <nombre_carpeta>", category: "files", desc: "Crea un nuevo directorio en la ruta actual." },
        { title: "Probar conexión (Ping)", cmd: "ping google.com", category: "network", desc: "Verifica la latencia y conexión con un servidor externo." }
    ]
};

let currentOS = 'fedora';
let currentCategory = 'all';

// Cambiar de Sistema Operativo
function setOS(os) {
    currentOS = os;
    document.querySelectorAll('.os-selector .os-btn').forEach(btn => {
        if (btn.textContent.toLowerCase().includes(os)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    renderCommands();
}

// Filtrar por categoría
function filterCategory(category) {
    currentCategory = category;
    document.querySelectorAll('.cat-btn').forEach(btn => {
        if (btn.getAttribute('onclick').includes(`'${category}'`)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    renderCommands();
}

// Renderizar comandos en el DOM
function renderCommands() {
    const container = document.getElementById('commandList');
    const searchInput = document.getElementById('searchInput');
    if (!container) return;

    const query = searchInput ? searchInput.value.toLowerCase() : '';
    let items = database[currentOS] || [];

    // Filtrar por categoría si no es 'all'
    if (currentCategory !== 'all') {
        items = items.filter(item => item.category === currentCategory);
    }

    // Filtrar por texto de búsqueda
    if (query.trim() !== '') {
        items = items.filter(item => 
            item.title.toLowerCase().includes(query) || 
            item.cmd.toLowerCase().includes(query) || 
            item.desc.toLowerCase().includes(query)
        );
    }

    container.innerHTML = '';

    if (items.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-muted);">
                <i class="fa-regular fa-face-grimace" style="font-size: 2rem; margin-bottom: 0.5rem;"></i>
                <p>No se encontraron comandos para esta búsqueda.</p>
            </div>
        `;
        return;
    }

    items.forEach(item => {
        const card = document.createElement('div');
        card.className = "command-card";
        
        card.innerHTML = `
            <div>
                <div class="card-header">
                    <span class="badge-category">${item.category}</span>
                    <span style="font-size: 0.65rem; color: var(--text-muted);">${currentOS}</span>
                </div>
                <h3 class="card-title">${item.title}</h3>
                <p class="card-desc">${item.desc}</p>
            </div>
            <div class="terminal-box">
                <span class="terminal-code">${item.cmd}</span>
                <button class="copy-btn" onclick="copyCommand(this, \`${item.cmd}\`)" title="Copiar comando">
                    <i class="fa-regular fa-copy"></i>
                </button>
            </div>
        `;
        container.appendChild(card);
    });
}

// Evento de búsqueda en tiempo real
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', renderCommands);
    }
    renderCommands();
});

// Función para copiar comandos al portapapeles
function copyCommand(btn, text) {
    navigator.clipboard.writeText(text).then(() => {
        const icon = btn.querySelector('i');
        icon.className = "fa-solid fa-check";
        btn.style.background = "var(--accent-green)";
        btn.style.color = "var(--bg-deep)";
        
        setTimeout(() => {
            icon.className = "fa-regular fa-copy";
            btn.style.background = "";
            btn.style.color = "";
        }, 1500);
    });
}