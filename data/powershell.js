/* =====================================================================
   WINDOWS · POWERSHELL
   Comandos (cmdlets) de PowerShell. Los de CMD están en cmd.js.
   a: 1  →  requiere abrir PowerShell como Administrador.
   Nota: en cadenas JS las barras invertidas de rutas van dobles (\\).
   ===================================================================== */
window.PT = window.PT || {};

PT.powershell = [

/* ───────────────────────── PAQUETES (winget / Appx) ───────────────────────── */
{ c: 'packages', t: 'Buscar un programa (winget)', cmd: 'winget search <nombre>',
  d: 'Busca aplicaciones en el repositorio de winget, el gestor de paquetes oficial de Windows.',
  s: ['Abre PowerShell (menú Inicio → escribe "PowerShell").', 'Ejecuta `winget search vlc`.', 'Anota el `Id` de la aplicación (p. ej. `VideoLAN.VLC`): lo usarás para instalar.'],
  ex: 'winget search vlc',
  out: `Nombre           Id               Versión  Origen
VLC media player VideoLAN.VLC     3.0.21   winget`,
  n: ['`winget` viene incluido en Windows 10 (reciente) y Windows 11.', 'También funciona en CMD.'] },

{ c: 'packages', t: 'Instalar un programa (winget)', cmd: 'winget install <Id>',
  d: 'Descarga e instala un programa automáticamente, sin asistentes ni anuncios.',
  s: ['Busca el Id con `winget search`.', 'Ejecuta `winget install VideoLAN.VLC`.', 'Acepta los términos con `Y` si los muestra.', 'Espera: el programa queda instalado y en el menú Inicio.'],
  ex: 'winget install --id VideoLAN.VLC -e',
  out: `Se encontró VLC media player [VideoLAN.VLC] Versión 3.0.21
Descargando https://get.videolan.org/…
Instalado correctamente`,
  n: ['`-e` (exacto) evita coincidencias parciales.', 'Algunos instaladores piden permisos de administrador (aparece el aviso UAC).'] },

{ c: 'packages', t: 'Actualizar todos los programas', cmd: 'winget upgrade --all',
  d: 'Actualiza todas las aplicaciones instaladas que tengan una versión nueva.',
  s: ['Mira qué hay pendiente: `winget upgrade`.', 'Ejecuta `winget upgrade --all`.', 'Acepta los avisos de UAC cuando salgan.'],
  ex: 'winget upgrade',
  out: `Nombre            Id                Versión  Disponible  Origen
Git               Git.Git           2.50.0   2.51.1      winget
7-Zip             7zip.7zip         24.08    25.00       winget`,
  n: ['Excluye alguno con `winget pin add <Id>`.'] },

{ c: 'packages', t: 'Listar programas instalados', cmd: 'winget list',
  d: 'Muestra los programas instalados y si tienen actualización.',
  s: ['Ejecuta `winget list`.', 'Filtra por nombre: `winget list chrome`.', 'Usa el Id para desinstalar o actualizar.'],
  ex: 'winget list git',
  out: `Nombre Id       Versión Origen
Git    Git.Git  2.51.1  winget`,
  n: ['Incluye programas que no se instalaron con winget.'] },

{ c: 'packages', t: 'Desinstalar un programa', cmd: 'winget uninstall <Id>',
  d: 'Quita un programa del sistema.',
  s: ['Obtén el Id con `winget list`.', 'Ejecuta `winget uninstall VideoLAN.VLC`.', 'Sigue los avisos si los hay.'],
  ex: 'winget uninstall --id VideoLAN.VLC',
  n: ['También puedes hacerlo desde Configuración → Aplicaciones.'] },

{ c: 'packages', t: 'Exportar e importar tu lista de programas', cmd: 'winget export -o <archivo.json>',
  d: 'Guarda la lista de tus programas para reinstalarlos en otro equipo.',
  s: ['Ejecuta `winget export -o apps.json`.', 'Copia el archivo al otro equipo.', 'Allí ejecuta `winget import -i apps.json`.'],
  ex: 'winget export -o $HOME\\Desktop\\apps.json',
  n: ['Perfecto antes de formatear Windows.'] },

{ c: 'packages', t: 'Listar apps de la Tienda (Appx)', cmd: 'Get-AppxPackage | Select-Object Name, Version',
  d: 'Muestra las aplicaciones de la Microsoft Store instaladas para tu usuario.',
  s: ['Ejecuta el comando.', 'Filtra con `-Name "*xbox*"`.', 'Para quitar una: `Get-AppxPackage *nombre* | Remove-AppxPackage`.'],
  ex: 'Get-AppxPackage -Name "*Calculator*" | Select-Object Name, Version',
  out: `Name                               Version
Microsoft.WindowsCalculator        11.2508.4.0`,
  n: ['! No elimines apps del sistema sin saber qué hacen.'] },

{ c: 'packages', t: 'Instalar un módulo de PowerShell', cmd: 'Install-Module -Name <módulo> -Scope CurrentUser',
  d: 'Instala módulos de la PowerShell Gallery que añaden nuevos comandos.',
  s: ['Busca: `Find-Module -Name PSReadLine`.', 'Instala: `Install-Module -Name Terminal-Icons -Scope CurrentUser`.', 'Cárgalo: `Import-Module Terminal-Icons`.'],
  ex: 'Install-Module -Name Terminal-Icons -Scope CurrentUser',
  n: ['`-Scope CurrentUser` evita pedir permisos de administrador.', 'Lista los instalados con `Get-InstalledModule`.'] },

/* ───────────────────────── ARCHIVOS ───────────────────────── */
{ c: 'files', t: 'Listar archivos y carpetas', cmd: 'Get-ChildItem',
  d: 'Muestra el contenido de la carpeta actual (alias: `ls`, `dir`, `gci`).',
  s: ['Ejecuta `Get-ChildItem`.', 'Añade `-Force` para incluir archivos ocultos.', 'Con `-Recurse` recorre también las subcarpetas.'],
  ex: 'Get-ChildItem -Force',
  out: `    Directorio: C:\\Users\\Pixel\\Documentos

Mode      LastWriteTime        Length Name
d-----    28/10/2026 10:12            proyectos
-a----    27/10/2026 18:40     12288  informe.pdf`,
  n: ['Solo carpetas: `Get-ChildItem -Directory`.', 'Ordena con `| Sort-Object LastWriteTime -Descending`.'] },

{ c: 'files', t: 'Cambiar de carpeta', cmd: 'Set-Location <ruta>',
  d: 'Cambia el directorio actual (alias: `cd`, `sl`).',
  s: ['Ejecuta `Set-Location C:\\Users\\Pixel\\Documentos` (o `cd ...`).', 'Para subir un nivel: `cd ..`.', 'Para cambiar de unidad escribe su letra: `D:`.'],
  ex: 'Set-Location "C:\\Users\\Pixel\\Mis Documentos"',
  n: ['Si la ruta tiene espacios, ponla entre comillas.', 'Usa Tab para autocompletar.'] },

{ c: 'files', t: 'Ver la carpeta actual', cmd: 'Get-Location',
  d: 'Muestra la ruta actual (alias: `pwd`).',
  s: ['Ejecuta `Get-Location` o `pwd`.', 'Lee la ruta mostrada.', 'Para usarla en un script: `(Get-Location).Path`.'],
  ex: 'Get-Location',
  out: `Path
----
C:\\Users\\Pixel\\Documentos`,
  n: ['El prompt de PowerShell ya la muestra, pero es útil dentro de scripts.'] },

{ c: 'files', t: 'Crear carpeta o archivo', cmd: 'New-Item -ItemType Directory -Name <nombre>',
  d: 'Crea carpetas o archivos nuevos (alias: `mkdir`, `ni`).',
  s: ['Para una carpeta: `New-Item -ItemType Directory -Name proyectos`.', 'Para un archivo: `New-Item -ItemType File -Name notas.txt`.', 'Comprueba con `Get-ChildItem`.'],
  ex: 'New-Item -ItemType File -Name notas.txt',
  out: `Mode   LastWriteTime      Length Name
-a---- 28/10/2026 10:30        0 notas.txt`,
  n: ['`mkdir a\\b\\c` crea toda la ruta de una vez.'] },

{ c: 'files', t: 'Copiar archivos y carpetas', cmd: 'Copy-Item <origen> -Destination <destino> -Recurse',
  d: 'Copia archivos o carpetas (alias: `cp`, `copy`).',
  s: ['Indica el origen y `-Destination`.', 'Para carpetas añade `-Recurse`.', 'Verifica en el destino.'],
  ex: 'Copy-Item .\\proyectos -Destination D:\\Respaldo -Recurse',
  n: ['Sobrescribe con `-Force`.', 'Para respaldos grandes, `robocopy` (CMD) es más robusto.'] },

{ c: 'files', t: 'Mover o renombrar', cmd: 'Move-Item <origen> -Destination <destino>',
  d: 'Mueve archivos o carpetas (alias: `mv`, `move`). Para renombrar usa `Rename-Item`.',
  s: ['Mover: `Move-Item informe.pdf -Destination D:\\Docs`.', 'Renombrar: `Rename-Item informe.pdf informe-final.pdf`.', 'Comprueba con `Get-ChildItem`.'],
  ex: 'Rename-Item borrador.txt informe-final.txt',
  n: ['Si el destino existe, `Move-Item` pide `-Force` para sobrescribir.'] },

{ c: 'files', t: 'Eliminar archivos y carpetas', cmd: 'Remove-Item <ruta> -Recurse',
  d: 'Borra archivos o carpetas (alias: `rm`, `del`).',
  s: ['Para un archivo: `Remove-Item archivo.txt`.', 'Para una carpeta con contenido: `Remove-Item carpeta -Recurse`.', 'Añade `-Confirm` para que pregunte.'],
  ex: 'Remove-Item .\\temp -Recurse -Confirm',
  n: ['! Borra de forma permanente, no pasa por la Papelera.', 'Prueba antes con `-WhatIf` para ver qué haría sin borrar.'] },

{ c: 'files', t: 'Leer el contenido de un archivo', cmd: 'Get-Content <archivo>',
  d: 'Muestra el texto de un archivo (alias: `cat`, `type`).',
  s: ['Ejecuta `Get-Content archivo.txt`.', 'Solo las últimas líneas: `Get-Content archivo.log -Tail 20`.', 'Seguir en vivo (como `tail -f`): añade `-Wait`.'],
  ex: 'Get-Content app.log -Tail 3 -Wait',
  n: ['Sal con `Ctrl + C`.'] },

{ c: 'files', t: 'Escribir en un archivo', cmd: 'Set-Content -Path <archivo> -Value "<texto>"',
  d: 'Crea o reemplaza el contenido de un archivo; `Add-Content` agrega al final.',
  s: ['Reemplazar: `Set-Content -Path nota.txt -Value "Hola"`.', 'Añadir: `Add-Content -Path nota.txt -Value "Otra línea"`.', 'Compruébalo con `Get-Content nota.txt`.'],
  ex: 'Set-Content nota.txt "Hola Pixel"\nAdd-Content nota.txt "Segunda línea"\nGet-Content nota.txt',
  out: `Hola Pixel
Segunda línea`,
  n: ['También puedes redirigir salida: `Get-Date > fecha.txt`.'] },

{ c: 'files', t: 'Buscar archivos', cmd: 'Get-ChildItem -Path <carpeta> -Recurse -Filter "<patrón>"',
  d: 'Busca archivos por nombre en toda una carpeta y subcarpetas.',
  s: ['Ejecuta `Get-ChildItem -Path C:\\Users\\Pixel -Recurse -Filter "*.pdf"`.', 'Añade `-ErrorAction SilentlyContinue` para ocultar errores de permisos.', 'Filtra más con `| Where-Object Length -gt 10MB`.'],
  ex: 'Get-ChildItem -Path $HOME\\Documentos -Recurse -Filter "*.pdf" -ErrorAction SilentlyContinue',
  out: `Mode   LastWriteTime        Length Name
-a---- 27/10/2026 18:40     12288 informe.pdf`,
  n: ['`-Filter` es más rápido que `-Include`.'] },

{ c: 'files', t: 'Buscar texto dentro de archivos', cmd: 'Select-String -Path <ruta> -Pattern "<texto>"',
  d: 'Equivalente a `grep`: encuentra líneas que contienen un texto.',
  s: ['Ejecuta `Select-String -Path .\\*.log -Pattern "error"`.', 'Con `-Recurse` (junto a `Get-ChildItem`) recorres carpetas.', 'Añade `-CaseSensitive` si te importan las mayúsculas.'],
  ex: 'Select-String -Path .\\*.log -Pattern "error"',
  out: `app.log:42:2026-10-28 09:12 error al conectar
app.log:57:2026-10-28 09:30 error de tiempo de espera`,
  n: ['Admite expresiones regulares.'] },

{ c: 'files', t: 'Comprimir y extraer ZIP', cmd: 'Compress-Archive -Path <ruta> -DestinationPath <archivo.zip>',
  d: 'Crea un .zip o extrae uno con `Expand-Archive`.',
  s: ['Comprimir: `Compress-Archive -Path .\\proyectos -DestinationPath respaldo.zip`.', 'Extraer: `Expand-Archive -Path respaldo.zip -DestinationPath .\\salida`.', 'Añade `-Force` para sobrescribir.'],
  ex: 'Compress-Archive -Path .\\proyectos -DestinationPath respaldo.zip',
  n: ['Para .rar o .7z usa `7z` (instálalo con `winget install 7zip.7zip`).'] },

{ c: 'files', t: 'Tamaño de una carpeta', cmd: '(Get-ChildItem <carpeta> -Recurse | Measure-Object Length -Sum).Sum / 1GB',
  d: 'Calcula cuánto ocupa una carpeta (en GB).',
  s: ['Reemplaza `<carpeta>` por la ruta.', 'El resultado aparece en GB (divide entre `1MB` para MB).', 'Redondea con `[math]::Round(valor, 2)`.'],
  ex: '[math]::Round((Get-ChildItem $HOME\\Videos -Recurse | Measure-Object Length -Sum).Sum / 1GB, 2)',
  out: '3.41',
  n: ['Puede tardar en carpetas muy grandes.'] },

{ c: 'files', t: 'Comprobar si existe y calcular un hash', cmd: 'Get-FileHash <archivo> -Algorithm SHA256',
  d: 'Verifica la integridad de un archivo descargado (ISO, instaladores).',
  s: ['Ejecuta `Get-FileHash archivo.iso`.', 'Compara el valor con el que publica el sitio oficial.', 'Si no coincide, vuelve a descargar.'],
  ex: 'Get-FileHash .\\ubuntu-24.04.iso -Algorithm SHA256',
  out: `Algorithm  Hash                 Path
SHA256     3A7F…C91E            C:\\Users\\Pixel\\ubuntu-24.04.iso`,
  n: ['`Test-Path <ruta>` devuelve `True` o `False` si existe.'] },

/* ───────────────────────── SISTEMA ───────────────────────── */
{ c: 'system', t: 'Listar procesos', cmd: 'Get-Process',
  d: 'Muestra los procesos en ejecución con CPU y memoria.',
  s: ['Ejecuta `Get-Process`.', 'Ordena por memoria: `Get-Process | Sort-Object WS -Descending | Select-Object -First 5`.', 'Para uno concreto: `Get-Process chrome`.'],
  ex: 'Get-Process | Sort-Object CPU -Descending | Select-Object -First 3',
  out: `Handles  NPM(K)  PM(K)   WS(K)   CPU(s)  Id  ProcessName
   1821     112  412200  498120  210.53  4821  chrome
    964      68  198300  224100   88.12  1210  Code`,
  n: ['Alias: `ps`, `gps`.'] },

{ c: 'system', t: 'Cerrar un proceso', cmd: 'Stop-Process -Name <nombre> -Force',
  d: 'Termina un proceso por nombre o por ID (alias: `kill`).',
  s: ['Encuentra el proceso con `Get-Process`.', 'Ejecuta `Stop-Process -Name notepad` (o `-Id <PID>`).', 'Añade `-Force` si no responde.'],
  ex: 'Stop-Process -Name notepad -Force',
  n: ['! Cerrar procesos del sistema puede inestabilizar Windows.', 'Prueba con `-WhatIf` primero.'] },

{ c: 'system', t: 'Iniciar un programa', cmd: 'Start-Process <programa>',
  d: 'Abre una aplicación o archivo; con `-Verb RunAs` la abre como administrador.',
  s: ['Ejecuta `Start-Process notepad`.', 'Para abrir como administrador: `Start-Process powershell -Verb RunAs`.', 'Con un archivo usa su ruta: `Start-Process .\\informe.pdf`.'],
  ex: 'Start-Process powershell -Verb RunAs',
  n: ['Es la forma más rápida de abrir una consola con permisos de administrador.'] },

{ c: 'system', t: 'Ver servicios', cmd: 'Get-Service',
  d: 'Lista los servicios de Windows y su estado.',
  s: ['Ejecuta `Get-Service`.', 'Filtra: `Get-Service | Where-Object Status -eq "Running"`.', 'Para uno: `Get-Service wuauserv`.'],
  ex: 'Get-Service -Name wuauserv',
  out: `Status   Name      DisplayName
Running  wuauserv  Windows Update`,
  n: ['`wuauserv` es Windows Update.'] },

{ c: 'system', t: 'Reiniciar un servicio', cmd: 'Restart-Service -Name <servicio>', a: 1,
  d: 'Detiene y vuelve a iniciar un servicio (también existen `Start-Service` y `Stop-Service`).',
  s: ['Abre PowerShell como administrador.', 'Ejecuta `Restart-Service -Name Spooler`.', 'Comprueba con `Get-Service Spooler`.'],
  ex: 'Restart-Service -Name Spooler',
  n: ['Reiniciar el servicio `Spooler` suele arreglar impresoras atascadas.'] },

{ c: 'system', t: 'Cambiar el inicio de un servicio', cmd: 'Set-Service -Name <servicio> -StartupType Manual', a: 1,
  d: 'Cambia si un servicio arranca automáticamente, manual o deshabilitado.',
  s: ['Abre PowerShell como administrador.', 'Ejecuta `Set-Service -Name <servicio> -StartupType Manual`.', 'Valores válidos: `Automatic`, `Manual`, `Disabled`.'],
  ex: 'Set-Service -Name Fax -StartupType Disabled',
  n: ['! No deshabilites servicios que no conozcas.'] },

{ c: 'system', t: 'Información completa del equipo', cmd: 'Get-ComputerInfo',
  d: 'Muestra versión de Windows, BIOS, CPU, RAM y más.',
  s: ['Ejecuta `Get-ComputerInfo`.', 'Para campos concretos: `Get-ComputerInfo -Property OsName, OsVersion, CsTotalPhysicalMemory`.', 'La primera vez tarda unos segundos.'],
  ex: 'Get-ComputerInfo -Property OsName, OsVersion',
  out: `OsName    : Microsoft Windows 11 Pro
OsVersion : 10.0.26100`,
  n: ['`systeminfo` (CMD) da algo parecido.'] },

{ c: 'system', t: 'Uso de memoria RAM', cmd: 'Get-CimInstance Win32_OperatingSystem',
  d: 'Muestra memoria total y libre (en KB), versión del sistema y último arranque.',
  s: ['Ejecuta el comando.', 'Revisa `TotalVisibleMemorySize` y `FreePhysicalMemory`.', 'Para verlo en GB: `[math]::Round($os.FreePhysicalMemory/1MB,1)`.'],
  ex: '$os = Get-CimInstance Win32_OperatingSystem\n[math]::Round($os.FreePhysicalMemory/1MB,1)',
  out: '6.2',
  n: ['Reemplaza al antiguo `Get-WmiObject`.'] },

{ c: 'system', t: 'Discos y volúmenes', cmd: 'Get-Volume',
  d: 'Muestra unidades, sistema de archivos y espacio libre.',
  s: ['Ejecuta `Get-Volume`.', 'Revisa `SizeRemaining` y `Size`.', 'Para discos físicos: `Get-Disk`.'],
  ex: 'Get-Volume',
  out: `DriveLetter FileSystem  HealthStatus  SizeRemaining  Size
C           NTFS        Healthy       118.2 GB       237.9 GB`,
  n: ['`Get-PhysicalDisk` muestra el estado de salud de los discos.'] },

{ c: 'system', t: 'Eventos y errores del sistema', cmd: 'Get-WinEvent -LogName System -MaxEvents 20',
  d: 'Lee el registro de eventos de Windows para diagnosticar fallos.',
  s: ['Ejecuta el comando.', 'Solo errores: `Get-WinEvent -FilterHashtable @{LogName="System"; Level=2} -MaxEvents 10`.', 'Revisa `Message` y `ProviderName`.'],
  ex: 'Get-WinEvent -FilterHashtable @{LogName="System"; Level=2} -MaxEvents 3',
  n: ['Nivel 1 = crítico, 2 = error, 3 = advertencia.'] },

{ c: 'system', t: 'Permitir scripts (.ps1)', cmd: 'Set-ExecutionPolicy RemoteSigned -Scope CurrentUser',
  d: 'Permite ejecutar scripts locales de PowerShell manteniendo la seguridad.',
  s: ['Abre PowerShell.', 'Ejecuta el comando y confirma con `S`.', 'Ya puedes ejecutar tus scripts con `.\\script.ps1`.'],
  ex: 'Get-ExecutionPolicy\nSet-ExecutionPolicy RemoteSigned -Scope CurrentUser',
  out: 'Restricted',
  n: ['`Restricted` impide cualquier script; `RemoteSigned` permite los locales y exige firma a los descargados.', '! Evita `Unrestricted`.'] },

{ c: 'system', t: 'Reiniciar o apagar el equipo', cmd: 'Restart-Computer',
  d: 'Reinicia Windows; `Stop-Computer` lo apaga.',
  s: ['Guarda tu trabajo.', 'Ejecuta `Restart-Computer` (o `Stop-Computer`).', 'Añade `-Force` para forzar el cierre de apps.'],
  ex: 'Restart-Computer',
  n: ['! Con `-Force` pierdes trabajo no guardado.'] },

{ c: 'system', t: 'Programas que arrancan con Windows', cmd: 'Get-CimInstance Win32_StartupCommand | Select-Object Name, Command',
  d: 'Lista las aplicaciones que se inician al encender el equipo.',
  s: ['Ejecuta el comando.', 'Identifica las que no necesitas.', 'Desactívalas en Administrador de tareas → Inicio.'],
  ex: 'Get-CimInstance Win32_StartupCommand | Select-Object Name, Command',
  n: ['Reducir programas de inicio acelera el arranque.'] },

{ c: 'system', t: 'Variables de entorno', cmd: 'Get-ChildItem Env:',
  d: 'Muestra todas las variables de entorno; `$env:NOMBRE` lee una concreta.',
  s: ['Ejecuta `Get-ChildItem Env:`.', 'Para una: `$env:USERPROFILE`.', 'Para modificarla solo en esta sesión: `$env:MI_VAR = "valor"`.'],
  ex: '$env:USERPROFILE',
  out: 'C:\\Users\\Pixel',
  n: ['Para hacerla permanente usa `[Environment]::SetEnvironmentVariable("MI_VAR","valor","User")`.'] },

/* ───────────────────────── RED ───────────────────────── */
{ c: 'network', t: 'Ver direcciones IP', cmd: 'Get-NetIPConfiguration',
  d: 'Muestra interfaces con su IP, puerta de enlace y DNS de forma ordenada.',
  s: ['Ejecuta `Get-NetIPConfiguration`.', 'Busca tu adaptador activo (Wi-Fi o Ethernet).', 'Para solo direcciones: `Get-NetIPAddress -AddressFamily IPv4`.'],
  ex: 'Get-NetIPConfiguration',
  out: `InterfaceAlias       : Wi-Fi
IPv4Address          : 192.168.1.34
IPv4DefaultGateway   : 192.168.1.1
DNSServer            : 192.168.1.1`,
  n: ['Equivale a `ipconfig` en CMD.'] },

{ c: 'network', t: 'Probar conexión (ping)', cmd: 'Test-Connection <host> -Count 4',
  d: 'Envía paquetes de prueba para comprobar si un equipo responde.',
  s: ['Ejecuta `Test-Connection google.com -Count 4`.', 'Revisa el tiempo de respuesta.', 'Si falla con nombre pero no con IP, es un problema de DNS.'],
  ex: 'Test-Connection 1.1.1.1 -Count 2',
  out: `Source  Destination  IPV4Address  Bytes  Time(ms)
PIXEL   1.1.1.1      1.1.1.1      32     14`,
  n: ['`ping` clásico también funciona en PowerShell.'] },

{ c: 'network', t: 'Probar un puerto remoto', cmd: 'Test-NetConnection -ComputerName <host> -Port <puerto>',
  d: 'Comprueba si un puerto TCP de un equipo está abierto (ping + prueba de puerto).',
  s: ['Ejecuta `Test-NetConnection -ComputerName google.com -Port 443`.', 'Mira `TcpTestSucceeded`: `True` = abierto.', 'Sin `-Port` hace un ping detallado.'],
  ex: 'Test-NetConnection -ComputerName google.com -Port 443',
  out: `ComputerName     : google.com
RemotePort       : 443
TcpTestSucceeded : True`,
  n: ['Reemplaza a `telnet` para probar puertos.'] },

{ c: 'network', t: 'Conexiones TCP activas', cmd: 'Get-NetTCPConnection -State Established',
  d: 'Lista las conexiones abiertas y qué proceso (PID) las usa.',
  s: ['Ejecuta el comando.', 'Para un puerto en escucha: `Get-NetTCPConnection -State Listen`.', 'Identifica el proceso con `Get-Process -Id <PID>`.'],
  ex: 'Get-NetTCPConnection -LocalPort 80 -State Listen',
  out: `LocalAddress LocalPort RemoteAddress RemotePort State  OwningProcess
0.0.0.0      80        0.0.0.0       0          Listen 4`,
  n: ['Equivale a `netstat -ano`.'] },

{ c: 'network', t: 'Consultar DNS', cmd: 'Resolve-DnsName <dominio>',
  d: 'Averigua la IP de un dominio y otros registros DNS.',
  s: ['Ejecuta `Resolve-DnsName example.com`.', 'Para correo: `Resolve-DnsName example.com -Type MX`.', 'Para usar otro servidor: `-Server 1.1.1.1`.'],
  ex: 'Resolve-DnsName example.com -Server 1.1.1.1',
  n: ['Equivale a `nslookup`.'] },

{ c: 'network', t: 'Limpiar la caché DNS', cmd: 'Clear-DnsClientCache',
  d: 'Borra la caché de resolución de nombres de Windows.',
  s: ['Ejecuta `Clear-DnsClientCache`.', 'Comprueba con `Get-DnsClientCache` (debería estar casi vacía).', 'Vuelve a abrir el sitio.'],
  ex: 'Clear-DnsClientCache',
  n: ['Útil cuando un sitio cambió de IP y sigue sin cargar.'] },

{ c: 'network', t: 'Adaptadores de red', cmd: 'Get-NetAdapter',
  d: 'Lista los adaptadores (Wi-Fi, Ethernet, VPN) y su estado.',
  s: ['Ejecuta `Get-NetAdapter`.', 'Revisa `Status` y `LinkSpeed`.', 'Para reiniciar uno (admin): `Restart-NetAdapter -Name "Wi-Fi"`.'],
  ex: 'Get-NetAdapter',
  out: `Name   InterfaceDescription     Status  LinkSpeed
Wi-Fi  Intel(R) Wi-Fi 6 AX201   Up      866 Mbps`,
  n: ['Reiniciar el adaptador resuelve muchos cortes de red.'] },

{ c: 'network', t: 'Descargar un archivo', cmd: 'Invoke-WebRequest -Uri <url> -OutFile <archivo>',
  d: 'Descarga archivos desde la web (alias: `iwr`, `curl`, `wget`).',
  s: ['Ejecuta `Invoke-WebRequest -Uri https://sitio.com/archivo.zip -OutFile archivo.zip`.', 'Espera a que termine.', 'Verifica con `Get-ChildItem archivo.zip`.'],
  ex: 'Invoke-WebRequest -Uri https://example.com/archivo.zip -OutFile archivo.zip',
  n: ['Para consumir APIs JSON usa `Invoke-RestMethod`.', '! Nunca ejecutes scripts descargados sin revisarlos.'] },

{ c: 'network', t: 'Abrir un puerto en el firewall', cmd: 'New-NetFirewallRule -DisplayName "<nombre>" -Direction Inbound -LocalPort <puerto> -Protocol TCP -Action Allow', a: 1,
  d: 'Crea una regla del Firewall de Windows para permitir tráfico entrante.',
  s: ['Abre PowerShell como administrador.', 'Ejecuta el comando con tu nombre y puerto.', 'Compruébalo con `Get-NetFirewallRule -DisplayName "<nombre>"`.'],
  ex: 'New-NetFirewallRule -DisplayName "Web 8080" -Direction Inbound -LocalPort 8080 -Protocol TCP -Action Allow',
  n: ['Elimínala con `Remove-NetFirewallRule -DisplayName "Web 8080"`.'] },

/* ───────────────────────── EXTRAS ───────────────────────── */
{ c: 'extras', t: 'Ayuda de un comando', cmd: 'Get-Help <comando> -Examples',
  d: 'Muestra la documentación y ejemplos de cualquier cmdlet.',
  s: ['Actualiza la ayuda una vez (admin): `Update-Help`.', 'Ejecuta `Get-Help Get-Process -Examples`.', 'Para la ayuda completa: `-Full`.'],
  ex: 'Get-Help Get-Process -Examples',
  n: ['`Get-Command *net*` busca comandos por nombre.'] },

{ c: 'extras', t: 'Buscar comandos disponibles', cmd: 'Get-Command *<texto>*',
  d: 'Encuentra cmdlets y programas cuyo nombre contenga un texto.',
  s: ['Ejecuta `Get-Command *service*`.', 'Lee el nombre y el módulo.', 'Usa `Get-Help <comando>` para saber cómo se usa.'],
  ex: 'Get-Command *netadapter*',
  n: ['Con `Get-Verb` ves los verbos oficiales (Get, Set, New, Remove…).'] },

{ c: 'extras', t: 'Filtrar y ordenar resultados', cmd: '<comando> | Where-Object { <condición> } | Sort-Object <propiedad>',
  d: 'Encadena comandos con `|` para filtrar, ordenar y seleccionar columnas.',
  s: ['`Where-Object` filtra filas.', '`Sort-Object` ordena y `Select-Object` elige columnas.', '`Format-Table -AutoSize` mejora la vista.'],
  ex: 'Get-Service | Where-Object Status -eq "Running" | Select-Object -First 3 Name, Status',
  out: `Name         Status
----         ------
Appinfo     Running
AudioEndpointBuilder Running`,
  n: ['Con `| Get-Member` descubres qué propiedades tiene un objeto.'] },

{ c: 'extras', t: 'Exportar resultados a CSV o JSON', cmd: '<comando> | Export-Csv -Path <archivo.csv> -NoTypeInformation',
  d: 'Guarda el resultado de un comando en un archivo que se abre en Excel.',
  s: ['Ejecuta tu comando y añade `| Export-Csv`.', 'Abre el archivo con Excel.', 'Para JSON usa `| ConvertTo-Json > datos.json`.'],
  ex: 'Get-Process | Select-Object Name, CPU | Export-Csv procesos.csv -NoTypeInformation',
  n: ['`Out-GridView` muestra una tabla filtrable en una ventana.'] },

{ c: 'extras', t: 'Copiar y pegar desde PowerShell', cmd: 'Get-Content <archivo> | Set-Clipboard',
  d: 'Envía texto al portapapeles; `Get-Clipboard` lo lee.',
  s: ['Ejecuta `Get-Content notas.txt | Set-Clipboard`.', 'Pega con `Ctrl + V` donde quieras.', 'Para leer lo copiado: `Get-Clipboard`.'],
  ex: '"Hola Pixel" | Set-Clipboard',
  n: ['También sirve con la salida de cualquier comando.'] },

{ c: 'extras', t: 'Perfil de PowerShell (configuración)', cmd: 'notepad $PROFILE',
  d: 'Abre el script que se ejecuta cada vez que inicias PowerShell: ideal para alias y ajustes.',
  s: ['Si no existe, créalo: `New-Item -Path $PROFILE -Force`.', 'Ejecuta `notepad $PROFILE`.', 'Añade, por ejemplo, `Set-Alias ll Get-ChildItem` y reinicia la consola.'],
  ex: 'Set-Alias ll Get-ChildItem',
  n: ['`$PROFILE` muestra la ruta del archivo.'] },

{ c: 'extras', t: 'Instalar Linux con WSL', cmd: 'wsl --install', a: 1,
  d: 'Instala el Subsistema de Windows para Linux con Ubuntu por defecto.',
  s: ['Abre PowerShell como administrador.', 'Ejecuta `wsl --install` y reinicia.', 'Al volver, crea tu usuario y contraseña de Linux.', 'Para otra distro: `wsl --list --online` y `wsl --install -d <nombre>`.'],
  ex: 'wsl --list --online',
  out: `NAME            FRIENDLY NAME
Ubuntu          Ubuntu
Debian          Debian GNU/Linux
FedoraLinux-42  Fedora Linux 42`,
  n: ['Entra a Linux en cualquier momento escribiendo `wsl`.', 'Ideal para practicar los comandos de Fedora y Ubuntu de esta guía.'] },

{ c: 'extras', t: 'Limpiar pantalla y ver historial', cmd: 'Clear-Host',
  d: 'Limpia la consola (alias: `cls`, `clear`); `Get-History` muestra tus comandos recientes.',
  s: ['Ejecuta `Clear-Host` o presiona `Ctrl + L`.', 'Para ver lo que escribiste: `Get-History`.', 'Repite uno con `Invoke-History <Id>`.'],
  ex: 'Get-History -Count 3',
  n: ['Con la flecha ↑ recorres comandos anteriores; `F7` muestra una lista.'] }

];
