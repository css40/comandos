/* =====================================================================
   FEDORA — comandos propios (DNF, RPM, Flatpak, SELinux, firewalld…)
   Se suman a los comandos Linux comunes de linux-core.js.
   ===================================================================== */
window.PT = window.PT || {};

PT.fedora = [

/* ───────────────────────── PAQUETES (DNF / RPM / Flatpak) ───────────────────────── */
{ c: 'packages', t: 'Actualizar todo el sistema', cmd: 'sudo dnf upgrade --refresh',
  d: 'Refresca los repositorios y actualiza todos los paquetes instalados a su última versión.',
  s: ['Abre una terminal.', 'Ejecuta `sudo dnf upgrade --refresh` e ingresa tu contraseña.', 'Revisa la lista de paquetes y confirma con `y`.', 'Si se actualizó el kernel o systemd, reinicia el equipo.'],
  ex: 'sudo dnf upgrade --refresh',
  out: `Dependencias resueltas.
 Paquete        Arquitectura  Versión          Repositorio   Tam.
Actualizando:
 firefox        x86_64        143.0-1.fc43     updates      68 M
Resumen de la transacción
Actualizar  1 Paquete
¿Está de acuerdo [s/N]? s`,
  n: ['`dnf check-update` solo lista lo pendiente, sin instalar nada.', 'Para aceptar todo automáticamente: `sudo dnf upgrade -y`.'] },

{ c: 'packages', t: 'Instalar un programa', cmd: 'sudo dnf install <paquete>',
  d: 'Descarga e instala una aplicación (y sus dependencias) desde los repositorios de Fedora.',
  s: ['Reemplaza `<paquete>` por el nombre del programa, p. ej. `vlc`.', 'Ejecuta el comando con `sudo`.', 'Confirma con `y` cuando muestre el resumen.', 'Instala varios a la vez separándolos con espacios.'],
  ex: 'sudo dnf install htop vim',
  out: `Instalando:
 htop   x86_64  3.4.1-1.fc43  fedora  222 k
 vim    x86_64  9.1.1    fedora  1.9 M`,
  n: ['Si no recuerdas el nombre exacto, búscalo con `dnf search`.', 'Con `-y` se omite la confirmación.'] },

{ c: 'packages', t: 'Instalar un archivo .rpm local', cmd: 'sudo dnf install ./<archivo>.rpm',
  d: 'Instala un paquete .rpm descargado, resolviendo dependencias automáticamente.',
  s: ['Ve a la carpeta donde descargaste el .rpm (`cd ~/Descargas`).', 'Ejecuta `sudo dnf install ./nombre.rpm` (el `./` es importante).', 'Confirma la instalación.'],
  ex: 'cd ~/Descargas\nsudo dnf install ./google-chrome-stable_current_x86_64.rpm',
  n: ['Es preferible a `rpm -i` porque DNF resuelve dependencias.', '! Instala .rpm solo de fuentes de confianza.'] },

{ c: 'packages', t: 'Desinstalar un programa', cmd: 'sudo dnf remove <paquete>',
  d: 'Elimina una aplicación del sistema.',
  s: ['Escribe `sudo dnf remove` y el nombre del paquete.', 'Revisa qué otros paquetes se eliminarán con él.', 'Confirma con `y`.'],
  ex: 'sudo dnf remove htop',
  n: ['Después ejecuta `sudo dnf autoremove` para limpiar dependencias sobrantes.', '! Cuidado al borrar paquetes del sistema (p. ej. `gnome-shell`): DNF te avisa con una lista larga.'] },

{ c: 'packages', t: 'Eliminar dependencias huérfanas', cmd: 'sudo dnf autoremove',
  d: 'Elimina paquetes que se instalaron como dependencia y ya nadie necesita.',
  s: ['Ejecuta `sudo dnf autoremove`.', 'Lee con calma la lista de paquetes que se eliminarán.', 'Confirma con `y` si todo es correcto.'],
  ex: 'sudo dnf autoremove',
  out: `Eliminando:
 libfoo   x86_64  1.2.3  @updates  1.1 M
Resumen: Eliminar 1 Paquete`,
  n: ['Es seguro hacerlo cada cierto tiempo para liberar espacio.'] },

{ c: 'packages', t: 'Buscar un paquete', cmd: 'dnf search <término>',
  d: 'Busca programas disponibles en los repositorios por nombre o descripción.',
  s: ['Ejecuta `dnf search editor`.', 'Lee los nombres a la izquierda; esos son los que usarás con `install`.', 'Para detalles: `dnf info <paquete>`.'],
  ex: 'dnf search "video player"',
  out: `vlc.x86_64 : The cross-platform open-source multimedia framework
mpv.x86_64 : Movie player playing most video formats`,
  n: ['Con varias palabras usa comillas.'] },

{ c: 'packages', t: 'Información de un paquete', cmd: 'dnf info <paquete>',
  d: 'Muestra versión, tamaño, repositorio, licencia y descripción de un paquete.',
  s: ['Ejecuta `dnf info nombre`.', 'Revisa `Versión`, `Tamaño` y `Repositorio`.', 'Si está instalado verás "Instalados" arriba.'],
  ex: 'dnf info git',
  out: `Nombre        : git
Versión       : 2.51.0
Tamaño        : 54 k
Repositorio   : updates
Resumen       : Fast Version Control System`,
  n: ['Para un paquete ya instalado también sirve `rpm -qi <paquete>`.'] },

{ c: 'packages', t: 'Listar paquetes instalados', cmd: 'dnf list --installed',
  d: 'Muestra todos los paquetes instalados en el sistema.',
  s: ['Ejecuta `dnf list --installed`.', 'Filtra con `dnf list --installed | grep python`.', 'Para contarlos: `dnf list --installed | wc -l`.'],
  ex: 'dnf list --installed | grep -i firefox',
  out: 'firefox.x86_64   143.0-1.fc43   @updates',
  n: ['`rpm -qa` entrega una lista parecida directamente desde la base RPM.'] },

{ c: 'packages', t: '¿Qué paquete trae este archivo o comando?', cmd: 'dnf provides <comando-o-ruta>',
  d: 'Averigua qué paquete instalar para obtener un comando o archivo que te falta.',
  s: ['Cuando veas "command not found", ejecuta `dnf provides */bin/<comando>`.', 'Lee el nombre del paquete que aparece.', 'Instálalo con `sudo dnf install <paquete>`.'],
  ex: 'dnf provides */bin/dig',
  out: 'bind-utils-32:9.18.41-1.fc43.x86_64 : Utilities for querying DNS name servers',
  n: ['Fedora también te lo sugiere automáticamente al escribir un comando inexistente.'] },

{ c: 'packages', t: 'Historial de transacciones', cmd: 'dnf history',
  d: 'Muestra un registro de todo lo instalado, actualizado o eliminado con DNF.',
  s: ['Ejecuta `dnf history`.', 'Anota el `ID` de la transacción que te interesa.', 'Detalla con `dnf history info <ID>`.'],
  ex: 'dnf history',
  out: `ID | Línea de comando       | Fecha y hora        | Acciones
42 | install vlc            | 2026-10-27 18:02    | Install
41 | upgrade --refresh      | 2026-10-25 09:14    | Upgrade`,
  n: ['Es tu "bitácora" para saber qué cambió cuando algo deja de funcionar.'] },

{ c: 'packages', t: 'Deshacer una transacción', cmd: 'sudo dnf history undo <ID>',
  d: 'Revierte por completo una transacción anterior de DNF.',
  s: ['Consulta los ID con `dnf history`.', 'Ejecuta `sudo dnf history undo <ID>`.', 'Confirma la reversión.'],
  ex: 'sudo dnf history undo 42',
  n: ['Útil para quitar una instalación que rompió algo o volver a una versión anterior.', '! No funciona si los paquetes originales ya no están en los repositorios.'] },

{ c: 'packages', t: 'Limpiar la caché de DNF', cmd: 'sudo dnf clean all',
  d: 'Borra la caché local de paquetes y metadatos para liberar espacio o corregir errores.',
  s: ['Ejecuta `sudo dnf clean all`.', 'Luego refresca con `sudo dnf makecache`.', 'Reintenta la operación que fallaba.'],
  ex: 'sudo dnf clean all\nsudo dnf makecache',
  n: ['Primera solución cuando aparecen errores de "metadata" o repositorios.'] },

{ c: 'packages', t: 'Ver repositorios activos', cmd: 'dnf repolist',
  d: 'Lista los repositorios habilitados.',
  s: ['Ejecuta `dnf repolist`.', 'Para incluir los desactivados: `dnf repolist --all`.', 'Verifica que aparezcan `fedora` y `updates`.'],
  ex: 'dnf repolist',
  out: `id de repositorio       nombre del repositorio
fedora                  Fedora 43 - x86_64
updates                 Fedora 43 - x86_64 - Updates`,
  n: ['Aquí verás también RPM Fusion si lo habilitaste.'] },

{ c: 'packages', t: 'Instalar un grupo de herramientas', cmd: 'sudo dnf group install development-tools',
  d: 'Instala de una vez compiladores y herramientas de desarrollo (gcc, make, etc.).',
  s: ['Ejecuta el comando.', 'Revisa los paquetes que se añaden y confirma.', 'Comprueba con `gcc --version`.'],
  ex: 'sudo dnf group install development-tools\ngcc --version',
  out: 'gcc (GCC) 15.2.1 20250808 (Red Hat 15.2.1-1)',
  n: ['Lista los grupos disponibles con `dnf group list`.'] },

{ c: 'packages', t: 'Habilitar RPM Fusion', cmd: 'sudo dnf install https://mirrors.rpmfusion.org/free/fedora/rpmfusion-free-release-$(rpm -E %fedora).noarch.rpm',
  d: 'Añade el repositorio comunitario con códecs y software que Fedora no incluye por licencias.',
  s: ['Ejecuta el comando para el repositorio "free".', 'Repite con la URL "nonfree" (cambia `free` por `nonfree` en ambas partes).', 'Actualiza con `sudo dnf upgrade --refresh`.'],
  ex: 'sudo dnf install https://mirrors.rpmfusion.org/nonfree/fedora/rpmfusion-nonfree-release-$(rpm -E %fedora).noarch.rpm',
  n: ['`$(rpm -E %fedora)` inserta automáticamente tu versión de Fedora.', 'Necesario para códecs multimedia y drivers NVIDIA.'] },

{ c: 'packages', t: 'Información de un paquete instalado (RPM)', cmd: 'rpm -qi <paquete>',
  d: 'Consulta los datos de un paquete ya instalado directamente en la base de datos RPM.',
  s: ['Ejecuta `rpm -qi nombre`.', 'Para ver los archivos que instaló: `rpm -ql nombre`.', 'Para saber qué paquete posee un archivo: `rpm -qf /ruta/archivo`.'],
  ex: 'rpm -qf /usr/bin/ssh',
  out: 'openssh-clients-10.0p1-3.fc43.x86_64',
  n: ['`rpm -qa | grep nombre` busca entre todos los instalados.'] },

{ c: 'packages', t: 'Instalar apps con Flatpak', cmd: 'flatpak install flathub <app-id>',
  d: 'Instala aplicaciones en un entorno aislado desde Flathub.',
  s: ['Busca la app: `flatpak search spotify`.', 'Instálala con su ID: `flatpak install flathub com.spotify.Client`.', 'Ejecútala con `flatpak run com.spotify.Client` o desde el menú de aplicaciones.'],
  ex: 'flatpak install flathub org.videolan.VLC',
  n: ['Actualiza con `flatpak update` y desinstala con `flatpak uninstall <app-id>`.', 'Lista lo instalado con `flatpak list`.'] },

{ c: 'packages', t: 'Actualizar a la siguiente versión de Fedora', cmd: 'sudo dnf system-upgrade download --releasever=<N>',
  d: 'Descarga la nueva versión de Fedora para actualizar el sistema completo de forma segura.',
  s: ['Primero actualiza todo: `sudo dnf upgrade --refresh` y reinicia.', 'Instala el plugin si no lo tienes: `sudo dnf install dnf-plugin-system-upgrade`.', 'Descarga: `sudo dnf system-upgrade download --releasever=<N>` (el número de versión).', 'Aplica con `sudo dnf system-upgrade reboot`.'],
  ex: 'sudo dnf system-upgrade download --releasever=44\nsudo dnf system-upgrade reboot',
  n: ['! Haz un respaldo antes: es una actualización mayor.', 'Revisa en la web de Fedora cuál es la última versión estable.'] },

{ c: 'packages', t: '¿Hace falta reiniciar?', cmd: 'sudo dnf needs-restarting -r',
  d: 'Indica si tras las actualizaciones es necesario reiniciar el equipo.',
  s: ['Ejecuta el comando después de actualizar.', 'Si dice "Reboot is required", reinicia.', 'Si no, puedes seguir trabajando.'],
  ex: 'sudo dnf needs-restarting -r',
  out: `Core libraries or services have been updated since boot-up:
  * kernel
Reboot is required to fully utilize these updates.`,
  n: ['Con `-s` lista los servicios que necesitan reiniciarse.'] },

/* ───────────────────────── SISTEMA ───────────────────────── */
{ c: 'system', t: 'Versión de Fedora', cmd: 'cat /etc/fedora-release',
  d: 'Muestra qué versión de Fedora tienes instalada.',
  s: ['Ejecuta `cat /etc/fedora-release`.', 'Para más detalles: `cat /etc/os-release`.', 'La versión del kernel se ve con `uname -r`.'],
  ex: 'cat /etc/fedora-release',
  out: 'Fedora release 43 (Forty Three)',
  n: ['El mismo dato está en `hostnamectl`.'] },

{ c: 'system', t: 'Estado de SELinux', cmd: 'sestatus',
  d: 'Muestra si SELinux está activo y en qué modo (enforcing, permissive o disabled).',
  s: ['Ejecuta `sestatus` o la versión corta `getenforce`.', 'Lee `Current mode`.', 'En Fedora debería estar en `enforcing`.'],
  ex: 'getenforce',
  out: 'Enforcing',
  n: ['SELinux es una capa de seguridad: no lo desactives sin motivo.', 'Si un servicio falla por SELinux, revisa `sudo ausearch -m avc -ts recent`.'] },

{ c: 'system', t: 'SELinux en modo permisivo (temporal)', cmd: 'sudo setenforce 0',
  d: 'Pasa SELinux a modo permisivo hasta el próximo reinicio, útil para diagnosticar.',
  s: ['Ejecuta `sudo setenforce 0`.', 'Prueba si el problema desaparece.', 'Vuelve a activarlo con `sudo setenforce 1`.'],
  ex: 'sudo setenforce 0\ngetenforce',
  out: 'Permissive',
  n: ['! Es solo para diagnóstico. Si así se arregla, corrige el contexto con `restorecon` o un booleano en lugar de dejarlo apagado.'] },

{ c: 'system', t: 'Restaurar contextos SELinux', cmd: 'sudo restorecon -Rv <ruta>',
  d: 'Restablece las etiquetas de seguridad de archivos; resuelve muchos errores de "permiso denegado".',
  s: ['Indica la carpeta afectada, p. ej. `/var/www/html`.', 'Ejecuta el comando.', 'Reintenta la acción.'],
  ex: 'sudo restorecon -Rv /var/www/html',
  out: `Relabeled /var/www/html/index.html from unconfined_u:object_r:user_home_t:s0 to unconfined_u:object_r:httpd_sys_content_t:s0`,
  n: ['Con `ls -Z` ves el contexto de cada archivo (el punto tras los permisos también lo indica).'] },

{ c: 'system', t: 'Cambiar el nombre del equipo', cmd: 'sudo hostnamectl set-hostname <nombre>',
  d: 'Establece el nombre (hostname) de tu máquina.',
  s: ['Elige un nombre sin espacios.', 'Ejecuta el comando.', 'Verifica con `hostnamectl`.'],
  ex: 'sudo hostnamectl set-hostname pixel-fedora',
  n: ['Cierra y abre la terminal para ver el cambio en el prompt.'] },

{ c: 'system', t: 'Actualizar firmware', cmd: 'sudo fwupdmgr refresh && sudo fwupdmgr get-updates',
  d: 'Busca actualizaciones de firmware (BIOS, SSD, periféricos) compatibles con LVFS.',
  s: ['Ejecuta el comando para refrescar y listar actualizaciones.', 'Si hay alguna, aplícala con `sudo fwupdmgr update`.', 'Reinicia cuando lo pida.'],
  ex: 'sudo fwupdmgr get-updates',
  n: ['! No apagues el equipo durante una actualización de firmware.'] },

{ c: 'system', t: 'Regenerar la configuración de GRUB', cmd: 'sudo grub2-mkconfig -o /boot/grub2/grub.cfg',
  d: 'Reconstruye el menú de arranque tras cambiar opciones o instalar otro sistema.',
  s: ['Edita las opciones en `/etc/default/grub` si lo necesitas.', 'Ejecuta el comando.', 'Reinicia para comprobar el menú.'],
  ex: 'sudo grub2-mkconfig -o /boot/grub2/grub.cfg',
  out: `Generating grub configuration file ...
Adding boot menu entry for UEFI Firmware Settings ...
done`,
  n: ['En Fedora moderna la ruta `/boot/grub2/grub.cfg` es la misma en UEFI y BIOS.', '! Un error aquí puede impedir el arranque: ten un USB de rescate.'] },

/* ───────────────────────── RED (firewalld) ───────────────────────── */
{ c: 'network', t: 'Ver reglas del firewall', cmd: 'sudo firewall-cmd --list-all',
  d: 'Muestra la zona activa de firewalld con servicios, puertos y reglas abiertas.',
  s: ['Ejecuta `sudo firewall-cmd --list-all`.', 'Revisa `services:` y `ports:`.', 'Para ver el estado del servicio: `sudo firewall-cmd --state`.'],
  ex: 'sudo firewall-cmd --list-all',
  out: `FedoraWorkstation (default, active)
  interfaces: wlp2s0
  services: dhcpv6-client mdns samba-client ssh
  ports: 1025-65535/tcp 1025-65535/udp`,
  n: ['La zona "FedoraWorkstation" es bastante abierta en puertos altos.'] },

{ c: 'network', t: 'Abrir un puerto', cmd: 'sudo firewall-cmd --permanent --add-port=<puerto>/tcp',
  d: 'Permite tráfico entrante por un puerto de forma permanente.',
  s: ['Ejecuta `sudo firewall-cmd --permanent --add-port=8080/tcp`.', 'Aplica los cambios con `sudo firewall-cmd --reload`.', 'Comprueba con `sudo firewall-cmd --list-ports`.'],
  ex: 'sudo firewall-cmd --permanent --add-port=8080/tcp\nsudo firewall-cmd --reload',
  out: `success
success`,
  n: ['Sin `--permanent` la regla se pierde al reiniciar.', 'Para cerrar: `--remove-port=8080/tcp`.'] },

{ c: 'network', t: 'Permitir un servicio', cmd: 'sudo firewall-cmd --permanent --add-service=<servicio>',
  d: 'Abre los puertos de un servicio conocido (http, https, ssh, samba…) por su nombre.',
  s: ['Ejecuta `sudo firewall-cmd --permanent --add-service=http`.', 'Recarga con `sudo firewall-cmd --reload`.', 'Lista servicios disponibles con `firewall-cmd --get-services`.'],
  ex: 'sudo firewall-cmd --permanent --add-service=https\nsudo firewall-cmd --reload',
  n: ['Es más legible que recordar puertos.'] },

{ c: 'network', t: 'Consultar DNS (dig)', cmd: 'dig <dominio>',
  d: 'Consulta registros DNS: IP, correo, servidores de nombres.',
  s: ['Instala la herramienta: `sudo dnf install bind-utils`.', 'Ejecuta `dig example.com`.', 'Para solo la IP: `dig +short example.com`; para correo: `dig MX example.com`.'],
  ex: 'dig +short example.com',
  out: `93.184.215.14`,
  n: ['`nslookup` y `host` son alternativas más simples.'] },

/* ───────────────────────── EXTRAS ───────────────────────── */
{ c: 'extras', t: 'Contenedores con Podman', cmd: 'podman run --rm -it <imagen>',
  d: 'Ejecuta un contenedor sin necesidad de un demonio (alternativa nativa a Docker).',
  s: ['Ejecuta `podman run --rm -it fedora bash` para abrir una Fedora limpia.', 'Un servicio web: `podman run -d -p 8080:80 docker.io/library/nginx`.', 'Lista con `podman ps` y detén con `podman stop <id>`.'],
  ex: 'podman run -d --name web -p 8080:80 docker.io/library/nginx\npodman ps',
  out: `CONTAINER ID  IMAGE                           COMMAND  STATUS      PORTS
a1b2c3d4e5f6  docker.io/library/nginx:latest  nginx    Up 3 secs   0.0.0.0:8080->80/tcp`,
  n: ['Los comandos son casi idénticos a los de Docker (`alias docker=podman`).', 'Funciona sin root (rootless).'] },

{ c: 'extras', t: 'Entorno aislado con Toolbx', cmd: 'toolbox create && toolbox enter',
  d: 'Crea un contenedor de desarrollo integrado con tu usuario, ideal para probar paquetes sin tocar el sistema.',
  s: ['Crea el entorno: `toolbox create`.', 'Entra con `toolbox enter`.', 'Dentro, instala lo que quieras con `sudo dnf install`; sal con `exit`.'],
  ex: 'toolbox create\ntoolbox enter',
  n: ['Es la herramienta recomendada en Fedora Silverblue/Kinoite.'] }

];
