/* =====================================================================
   UBUNTU — comandos propios (APT, dpkg, Snap, UFW, netplan…)
   Se suman a los comandos Linux comunes de linux-core.js.
   ===================================================================== */
window.PT = window.PT || {};

PT.ubuntu = [

/* ───────────────────────── PAQUETES (APT / dpkg / Snap) ───────────────────────── */
{ c: 'packages', t: 'Actualizar la lista de paquetes', cmd: 'sudo apt update',
  d: 'Descarga la información más reciente de los repositorios (no instala nada todavía).',
  s: ['Abre la terminal.', 'Ejecuta `sudo apt update` e ingresa tu contraseña.', 'Al final verás cuántos paquetes se pueden actualizar.', 'Continúa con `sudo apt upgrade`.'],
  ex: 'sudo apt update',
  out: `Obj:1 http://archive.ubuntu.com/ubuntu noble InRelease
Obj:2 http://security.ubuntu.com/ubuntu noble-security InRelease
Leyendo lista de paquetes... Hecho
Se pueden actualizar 12 paquetes. Ejecute «apt list --upgradable» para verlos.`,
  n: ['Hazlo siempre antes de instalar algo nuevo.', 'Combina ambos pasos: `sudo apt update && sudo apt upgrade -y`.'] },

{ c: 'packages', t: 'Actualizar los paquetes instalados', cmd: 'sudo apt upgrade',
  d: 'Instala las versiones nuevas de los paquetes ya instalados, sin eliminar nada.',
  s: ['Ejecuta primero `sudo apt update`.', 'Ejecuta `sudo apt upgrade`.', 'Confirma con `S` (o `y`).', 'Si pide reinicio, hazlo cuando termines.'],
  ex: 'sudo apt upgrade',
  out: `Se actualizarán los siguientes paquetes:
  firefox libssl3t64 openssh-client
3 actualizados, 0 nuevos se instalarán, 0 para eliminar y 0 no actualizados.
¿Desea continuar? [S/n] s`,
  n: ['`apt list --upgradable` muestra qué se actualizará.', 'Con `-y` se acepta todo sin preguntar.'] },

{ c: 'packages', t: 'Actualización completa (full-upgrade)', cmd: 'sudo apt full-upgrade',
  d: 'Actualiza permitiendo instalar o quitar paquetes si hace falta (cambios de kernel, dependencias nuevas).',
  s: ['Ejecuta `sudo apt update`.', 'Ejecuta `sudo apt full-upgrade`.', 'Lee con atención qué paquetes se quitarán antes de confirmar.'],
  ex: 'sudo apt full-upgrade',
  n: ['Úsalo cuando `upgrade` diga "paquetes retenidos" (kept back).'] },

{ c: 'packages', t: 'Instalar un programa', cmd: 'sudo apt install <paquete>',
  d: 'Descarga e instala una aplicación y sus dependencias desde los repositorios de Ubuntu.',
  s: ['Reemplaza `<paquete>` por el nombre, p. ej. `vlc`.', 'Ejecuta el comando con `sudo`.', 'Confirma con `S`.', 'Instala varios a la vez separándolos con espacios.'],
  ex: 'sudo apt install htop vlc',
  out: `Se instalarán los siguientes paquetes NUEVOS:
  htop vlc vlc-plugin-base
0 actualizados, 3 nuevos se instalarán`,
  n: ['`apt install --reinstall <paquete>` reinstala uno dañado.'] },

{ c: 'packages', t: 'Instalar un archivo .deb', cmd: 'sudo apt install ./<archivo>.deb',
  d: 'Instala un .deb descargado resolviendo las dependencias automáticamente.',
  s: ['Ve a la carpeta del archivo (`cd ~/Descargas`).', 'Ejecuta `sudo apt install ./archivo.deb` (el `./` es importante).', 'Confirma.'],
  ex: 'cd ~/Descargas\nsudo apt install ./google-chrome-stable_current_amd64.deb',
  n: ['Mejor que `dpkg -i`, que no resuelve dependencias.', '! Instala .deb solo de fuentes de confianza.'] },

{ c: 'packages', t: 'Desinstalar un programa', cmd: 'sudo apt remove <paquete>',
  d: 'Elimina el programa pero conserva sus archivos de configuración.',
  s: ['Ejecuta `sudo apt remove nombre`.', 'Confirma.', 'Si además quieres borrar la configuración, usa `purge` (siguiente comando).'],
  ex: 'sudo apt remove vlc',
  n: ['Después ejecuta `sudo apt autoremove` para limpiar dependencias.'] },

{ c: 'packages', t: 'Desinstalar y borrar configuración', cmd: 'sudo apt purge <paquete>',
  d: 'Elimina el programa y también sus archivos de configuración del sistema.',
  s: ['Ejecuta `sudo apt purge nombre`.', 'Confirma.', 'Limpia dependencias con `sudo apt autoremove --purge`.'],
  ex: 'sudo apt purge apache2',
  n: ['! La configuración borrada no se puede recuperar. Respalda `/etc/<programa>` si la necesitas.'] },

{ c: 'packages', t: 'Eliminar dependencias huérfanas', cmd: 'sudo apt autoremove',
  d: 'Quita paquetes que se instalaron como dependencia y ya no se necesitan.',
  s: ['Ejecuta `sudo apt autoremove`.', 'Revisa la lista.', 'Confirma con `S`.'],
  ex: 'sudo apt autoremove',
  out: `Los siguientes paquetes se ELIMINARÁN:
  libfoo1 linux-image-6.8.0-31-generic
Se liberarán 312 MB después de esta operación.`,
  n: ['También elimina kernels antiguos y libera espacio en `/boot`.'] },

{ c: 'packages', t: 'Buscar un paquete', cmd: 'apt search <término>',
  d: 'Busca paquetes por nombre o descripción.',
  s: ['Ejecuta `apt search editor`.', 'Lee los nombres: son los que usarás con `install`.', 'Para detalles: `apt show <paquete>`.'],
  ex: 'apt search "video player" 2>/dev/null | head -n 4',
  out: `vlc/noble 3.0.20-3build6 amd64
  multimedia player and streamer`,
  n: ['`apt-cache policy <paquete>` muestra versiones disponibles y de dónde vienen.'] },

{ c: 'packages', t: 'Información de un paquete', cmd: 'apt show <paquete>',
  d: 'Muestra versión, tamaño, dependencias y descripción.',
  s: ['Ejecuta `apt show nombre`.', 'Revisa `Version`, `Depends` y `Description`.', 'Compruébalo antes de instalar si dudas.'],
  ex: 'apt show git | head -n 6',
  out: `Package: git
Version: 1:2.43.0-1ubuntu7.3
Priority: optional
Section: vcs
Installed-Size: 21,5 MB`,
  n: ['Si no existe, actualiza con `sudo apt update`.'] },

{ c: 'packages', t: 'Listar instalados y actualizables', cmd: 'apt list --installed',
  d: 'Muestra los paquetes instalados; con `--upgradable` solo los que tienen actualización.',
  s: ['`apt list --installed` lista todo lo instalado.', '`apt list --upgradable` muestra qué se puede actualizar.', 'Filtra con `| grep nombre`.'],
  ex: 'apt list --upgradable 2>/dev/null',
  out: `firefox/noble-updates 143.0+build1-0ubuntu0.24.04.1 amd64 [upgradable from: 142.0…]`,
  n: ['`dpkg -l | grep nombre` también funciona.'] },

{ c: 'packages', t: 'Reparar dependencias rotas', cmd: 'sudo apt --fix-broken install',
  d: 'Intenta arreglar instalaciones interrumpidas o dependencias que faltan.',
  s: ['Ejecuta `sudo apt --fix-broken install`.', 'Si sigue fallando: `sudo dpkg --configure -a`.', 'Termina con `sudo apt update && sudo apt upgrade`.'],
  ex: 'sudo dpkg --configure -a\nsudo apt --fix-broken install',
  n: ['Primer recurso cuando APT dice "dependencias no satisfechas".', 'Si hay bloqueo (`lock`), espera a que termine otra actualización antes de borrar nada.'] },

{ c: 'packages', t: 'Retener un paquete (no actualizar)', cmd: 'sudo apt-mark hold <paquete>',
  d: 'Evita que un paquete se actualice automáticamente.',
  s: ['Ejecuta `sudo apt-mark hold nombre`.', 'Compruébalo con `apt-mark showhold`.', 'Revierte con `sudo apt-mark unhold nombre`.'],
  ex: 'sudo apt-mark hold nvidia-driver-550',
  out: 'nvidia-driver-550 set on hold.',
  n: ['Útil para mantener un driver o versión que sabes que funciona.'] },

{ c: 'packages', t: 'Limpiar la caché de APT', cmd: 'sudo apt clean',
  d: 'Borra los .deb descargados que quedan en la caché para liberar espacio.',
  s: ['Ejecuta `sudo apt clean`.', '`sudo apt autoclean` solo borra los que ya no se pueden descargar.', 'Comprueba el espacio con `df -h`.'],
  ex: 'sudo apt clean',
  n: ['Es seguro: los paquetes se descargan otra vez si hacen falta.'] },

{ c: 'packages', t: 'Consultar con dpkg', cmd: 'dpkg -l | grep <nombre>',
  d: 'Comprueba si un paquete está instalado y qué versión tiene.',
  s: ['Ejecuta `dpkg -l | grep nombre`.', 'Una `ii` al inicio indica "instalado correctamente".', 'Para ver sus archivos: `dpkg -L <paquete>`; para saber a qué paquete pertenece un archivo: `dpkg -S /ruta`.'],
  ex: 'dpkg -S /usr/bin/ssh',
  out: 'openssh-client: /usr/bin/ssh',
  n: ['`dpkg -i` instala un .deb local sin resolver dependencias.'] },

{ c: 'packages', t: 'Añadir un repositorio PPA', cmd: 'sudo add-apt-repository ppa:<usuario>/<ppa>',
  d: 'Agrega un repositorio adicional de Launchpad para obtener versiones más nuevas o software extra.',
  s: ['Ejecuta `sudo add-apt-repository ppa:usuario/ppa`.', 'Pulsa Enter para confirmar.', 'Actualiza con `sudo apt update` y luego instala el paquete.'],
  ex: 'sudo add-apt-repository ppa:ondrej/php\nsudo apt update',
  n: ['Quítalo con `sudo add-apt-repository --remove ppa:usuario/ppa`.', '! Un PPA es de terceros: usa solo los que conozcas.'] },

{ c: 'packages', t: 'Instalar apps con Snap', cmd: 'sudo snap install <app>',
  d: 'Instala aplicaciones empaquetadas con Snap (aisladas y con actualización automática).',
  s: ['Busca: `snap find spotify`.', 'Instala: `sudo snap install spotify`.', 'Algunas apps requieren `--classic`, p. ej. `sudo snap install code --classic`.'],
  ex: 'sudo snap install code --classic',
  out: 'code 1.105.0 from Visual Studio Code (vscode✓) installed',
  n: ['Lista con `snap list`, actualiza con `sudo snap refresh` y elimina con `sudo snap remove <app>`.'] },

{ c: 'packages', t: 'Actualizar a la nueva versión de Ubuntu', cmd: 'sudo do-release-upgrade',
  d: 'Actualiza todo el sistema a la siguiente versión de Ubuntu disponible.',
  s: ['Actualiza todo antes: `sudo apt update && sudo apt full-upgrade`.', 'Reinicia el equipo.', 'Ejecuta `sudo do-release-upgrade` y sigue las instrucciones.'],
  ex: 'sudo do-release-upgrade',
  n: ['! Haz un respaldo antes: es una actualización mayor.', 'Las versiones LTS solo ofrecen saltar a otra LTS (con `-d` se fuerzan las de desarrollo, no lo uses).'] },

/* ───────────────────────── SISTEMA ───────────────────────── */
{ c: 'system', t: 'Versión de Ubuntu', cmd: 'lsb_release -a',
  d: 'Muestra la versión y el nombre en clave de tu Ubuntu.',
  s: ['Ejecuta `lsb_release -a`.', 'Revisa `Description` y `Release`.', 'Alternativa: `cat /etc/os-release`.'],
  ex: 'lsb_release -a',
  out: `Distributor ID: Ubuntu
Description:    Ubuntu 24.04.3 LTS
Release:        24.04
Codename:       noble`,
  n: ['`uname -r` muestra la versión del kernel.'] },

{ c: 'system', t: 'Instalar drivers privativos', cmd: 'sudo ubuntu-drivers autoinstall',
  d: 'Detecta tu hardware (por ejemplo NVIDIA) e instala los drivers recomendados.',
  s: ['Mira qué detecta: `ubuntu-drivers devices`.', 'Ejecuta `sudo ubuntu-drivers autoinstall`.', 'Reinicia el equipo.'],
  ex: 'ubuntu-drivers devices',
  out: `== /sys/devices/pci0000:00/0000:00:01.0/0000:01:00.0 ==
vendor   : NVIDIA Corporation
driver   : nvidia-driver-550 - distro non-free recommended`,
  n: ['También se puede desde "Software y actualizaciones" → Drivers adicionales.', 'Si usas Secure Boot, te pedirá crear una clave (MOK) en el reinicio.'] },

{ c: 'system', t: '¿Hace falta reiniciar?', cmd: 'cat /var/run/reboot-required',
  d: 'Si el archivo existe, el sistema necesita reiniciarse tras una actualización.',
  s: ['Ejecuta `cat /var/run/reboot-required`.', 'Si dice "*** System restart required ***", reinicia.', 'Si no existe el archivo, no hace falta.'],
  ex: 'cat /var/run/reboot-required',
  out: '*** System restart required ***',
  n: ['`cat /var/run/reboot-required.pkgs` indica qué paquetes lo piden.'] },

{ c: 'system', t: 'Regenerar GRUB', cmd: 'sudo update-grub',
  d: 'Reconstruye el menú de arranque tras instalar otro sistema o cambiar opciones.',
  s: ['Edita `/etc/default/grub` si necesitas cambiar opciones.', 'Ejecuta `sudo update-grub`.', 'Reinicia y comprueba el menú.'],
  ex: 'sudo update-grub',
  out: `Sourcing file '/etc/default/grub'
Found linux image: /boot/vmlinuz-6.8.0-45-generic
Found Windows Boot Manager on /dev/nvme0n1p1
done`,
  n: ['Para detectar Windows puede ser necesario activar `os-prober`.'] },

{ c: 'system', t: 'Reconfigurar la zona horaria', cmd: 'sudo dpkg-reconfigure tzdata',
  d: 'Abre un asistente en texto para elegir la zona horaria.',
  s: ['Ejecuta el comando.', 'Elige tu región y ciudad con las flechas y Enter.', 'Verifica con `timedatectl`.'],
  ex: 'sudo dpkg-reconfigure tzdata',
  n: ['También funciona `sudo timedatectl set-timezone America/Managua`.'] },

/* ───────────────────────── RED (UFW / netplan) ───────────────────────── */
{ c: 'network', t: 'Estado del firewall (UFW)', cmd: 'sudo ufw status verbose',
  d: 'Muestra si el firewall está activo y qué reglas tiene.',
  s: ['Ejecuta `sudo ufw status verbose`.', 'Si dice `inactive`, está apagado.', 'Revisa las reglas de entrada y salida.'],
  ex: 'sudo ufw status verbose',
  out: `Estado: activo
Predeterminado: deny (entrantes), allow (salientes)
Hasta                      Acción      Desde
22/tcp                     ALLOW IN    Anywhere`,
  n: ['Con `numbered` (`sudo ufw status numbered`) ves el número de cada regla.'] },

{ c: 'network', t: 'Activar el firewall', cmd: 'sudo ufw enable',
  d: 'Enciende UFW con la política por defecto: bloquear lo entrante y permitir lo saliente.',
  s: ['Permite SSH primero si usas conexión remota: `sudo ufw allow ssh`.', 'Ejecuta `sudo ufw enable`.', 'Confirma con `y`.'],
  ex: 'sudo ufw allow ssh\nsudo ufw enable',
  out: `Rule added
Firewall is active and enabled on system startup`,
  n: ['! Si trabajas por SSH, permite el puerto 22 ANTES de activarlo o perderás el acceso.', 'Apágalo con `sudo ufw disable`.'] },

{ c: 'network', t: 'Permitir o bloquear un puerto', cmd: 'sudo ufw allow <puerto>/tcp',
  d: 'Abre un puerto en el firewall; con `deny` lo bloquea.',
  s: ['Para abrir: `sudo ufw allow 8080/tcp`.', 'Para bloquear: `sudo ufw deny 23/tcp`.', 'Para borrar una regla: `sudo ufw delete allow 8080/tcp`.'],
  ex: 'sudo ufw allow 8080/tcp\nsudo ufw status',
  out: `Rule added
Rule added (v6)`,
  n: ['También permite aplicaciones por nombre: `sudo ufw allow "Nginx Full"`.', 'Limita intentos de fuerza bruta: `sudo ufw limit ssh`.'] },

{ c: 'network', t: 'Aplicar configuración de red (netplan)', cmd: 'sudo netplan try',
  d: 'Prueba un cambio en `/etc/netplan/*.yaml` y lo revierte solo si no confirmas.',
  s: ['Edita el archivo en `/etc/netplan/` (con `sudo nano`).', 'Ejecuta `sudo netplan try`: si todo va bien, pulsa Enter para confirmar.', 'Para aplicar sin prueba: `sudo netplan apply`.'],
  ex: 'sudo netplan try',
  out: `Do you want to keep these settings?
Press ENTER before the timeout to accept the new configuration`,
  n: ['El YAML es sensible a la indentación (solo espacios).', 'En escritorio la red suele gestionarla NetworkManager; netplan aplica sobre todo en servidores.'] },

{ c: 'network', t: 'Consultar DNS (dig)', cmd: 'dig <dominio>',
  d: 'Consulta registros DNS: IP, correo, servidores de nombres.',
  s: ['Instala la herramienta: `sudo apt install dnsutils`.', 'Ejecuta `dig example.com`.', 'Para solo la IP: `dig +short example.com`.'],
  ex: 'dig +short example.com',
  out: '93.184.215.14',
  n: ['`nslookup` y `host` son alternativas más simples.'] },

/* ───────────────────────── EXTRAS ───────────────────────── */
{ c: 'extras', t: 'Herramientas de compilación', cmd: 'sudo apt install build-essential',
  d: 'Instala gcc, g++ y make para compilar programas.',
  s: ['Ejecuta el comando.', 'Confirma con `S`.', 'Comprueba con `gcc --version`.'],
  ex: 'sudo apt install build-essential\ngcc --version',
  out: 'gcc (Ubuntu 13.3.0-6ubuntu2~24.04) 13.3.0',
  n: ['Necesario para compilar muchos módulos de Python o Node.'] },

{ c: 'extras', t: 'Códecs y fuentes multimedia', cmd: 'sudo apt install ubuntu-restricted-extras',
  d: 'Instala códecs de audio y vídeo, fuentes de Microsoft y soporte para formatos comunes.',
  s: ['Ejecuta el comando.', 'Acepta la licencia (EULA) que aparece con Tab y Enter.', 'Espera a que termine.'],
  ex: 'sudo apt install ubuntu-restricted-extras',
  n: ['Resuelve vídeos o MP3 que no se reproducen.'] },

{ c: 'extras', t: 'Instalar Docker', cmd: 'sudo apt install docker.io',
  d: 'Instala Docker desde los repositorios de Ubuntu para ejecutar contenedores.',
  s: ['Ejecuta `sudo apt install docker.io`.', 'Para usarlo sin `sudo`: `sudo usermod -aG docker $USER` y reinicia la sesión.', 'Prueba con `docker run hello-world`.'],
  ex: 'docker run hello-world',
  out: `Hello from Docker!
This message shows that your installation appears to be working correctly.`,
  n: ['Docker oficial (más reciente): sigue la guía de docs.docker.com.', '! Estar en el grupo `docker` equivale a tener permisos de root.'] },

{ c: 'extras', t: 'Información del sistema bonita', cmd: 'sudo apt install fastfetch && fastfetch',
  d: 'Muestra un resumen visual del sistema con el logo de la distro.',
  s: ['Instálalo con `sudo apt install fastfetch` (Ubuntu 24.10 o superior).', 'Ejecuta `fastfetch`.', 'Verás SO, kernel, CPU, RAM, tema y más.'],
  ex: 'fastfetch',
  n: ['En Ubuntu 24.04 no está en los repositorios oficiales; ahí puedes usar `sudo apt install neofetch` (funciona igual, aunque ya no se mantiene).'] }

];
