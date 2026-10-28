/* =====================================================================
   COMANDOS LINUX COMUNES (bash) — se muestran tanto en Fedora como en Ubuntu.
   Los comandos propios de cada distro están en fedora.js y ubuntu.js.

   Campos:  c = categoría   t = título   cmd = comando   d = descripción
            s = pasos       ex = ejemplo (una línea por comando)
            out = salida de ejemplo      n = notas ("!" al inicio = advertencia)
   Marcadores: %INSTALL% (sudo dnf install | sudo apt install)
               %ADMINGROUP% (wheel | sudo)   %OSNAME% (Fedora | Ubuntu)
   ===================================================================== */
window.PT = window.PT || {};

PT.linuxCore = [

/* ───────────────────────── ARCHIVOS ───────────────────────── */
{ c: 'files', t: 'Listar archivos y carpetas', cmd: 'ls -lah',
  d: 'Muestra el contenido de la carpeta actual con permisos, tamaño legible y archivos ocultos.',
  s: ['Abre la terminal en la carpeta que quieras revisar.',
      'Ejecuta `ls -lah`. La opción `-l` da formato largo, `-a` incluye archivos ocultos (los que empiezan con punto) y `-h` muestra tamaños legibles (K, M, G).',
      'Para ver otra carpeta sin moverte, añade la ruta: `ls -lah /etc`.'],
  ex: 'ls -lah ~/Documentos',
  out: `total 24K
drwxr-xr-x  3 pixel pixel 4.0K oct 28 10:12 .
drwx------ 28 pixel pixel 4.0K oct 28 09:58 ..
-rw-r--r--  1 pixel pixel  12K oct 27 18:40 informe.pdf
drwxr-xr-x  2 pixel pixel 4.0K oct 20 08:15 proyectos`,
  n: ['Ordena por fecha de modificación con `ls -laht` (lo más reciente primero).', 'Para ver solo carpetas: `ls -d */`.'] },

{ c: 'files', t: 'Moverse entre carpetas', cmd: 'cd <ruta>',
  d: 'Cambia el directorio de trabajo de la terminal.',
  s: ['Escribe `cd` seguido de la ruta, reemplazando `<ruta>` por la carpeta destino.',
      'Atajos útiles: `cd ..` sube un nivel, `cd ~` o solo `cd` va a tu carpeta personal y `cd -` regresa a la carpeta anterior.',
      'Confirma dónde estás con `pwd`.'],
  ex: 'cd ~/proyectos/web\npwd',
  out: '/home/pixel/proyectos/web',
  n: ['Presiona Tab para autocompletar nombres de carpetas.', 'Si el nombre tiene espacios, escríbelo entre comillas: `cd "Mis Documentos"`.'] },

{ c: 'files', t: 'Ver la carpeta actual', cmd: 'pwd',
  d: 'Imprime la ruta completa del directorio en el que estás.',
  s: ['Ejecuta `pwd` (print working directory).', 'Lee la ruta absoluta que aparece: es el punto de partida de los comandos relativos.'],
  ex: 'pwd', out: '/home/pixel/Descargas',
  n: ['Útil antes de ejecutar comandos destructivos como `rm`, para confirmar dónde estás.'] },

{ c: 'files', t: 'Crear carpetas', cmd: 'mkdir -p <ruta/carpeta>',
  d: 'Crea una o varias carpetas, incluyendo las intermedias que no existan.',
  s: ['Escribe `mkdir -p` y la ruta deseada.', 'La opción `-p` crea toda la jerarquía de una vez y no da error si ya existe.', 'Verifica con `ls`.'],
  ex: 'mkdir -p ~/proyectos/blog/imagenes\nls ~/proyectos/blog',
  out: 'imagenes',
  n: ['Con llaves puedes crear varias a la vez: `mkdir -p app/{src,docs,tests}`.'] },

{ c: 'files', t: 'Crear archivo vacío / actualizar fecha', cmd: 'touch <archivo>',
  d: 'Crea un archivo vacío o actualiza la fecha de modificación si ya existe.',
  s: ['Ejecuta `touch` con el nombre del archivo.', 'Si el archivo no existe se crea vacío; si existe, solo cambia su fecha.', 'Comprueba con `ls -l <archivo>`.'],
  ex: 'touch notas.txt\nls -l notas.txt',
  out: '-rw-r--r-- 1 pixel pixel 0 oct 28 10:30 notas.txt',
  n: ['Puedes crear varios: `touch a.txt b.txt c.txt`.'] },

{ c: 'files', t: 'Copiar archivos y carpetas', cmd: 'cp -r <origen> <destino>',
  d: 'Copia archivos o carpetas completas a otro lugar.',
  s: ['Indica el origen y el destino: `cp <origen> <destino>`.', 'Para carpetas añade `-r` (recursivo).', 'Usa `-i` si quieres que pregunte antes de sobrescribir.'],
  ex: 'cp -r ~/proyectos/web ~/respaldo/web-2026',
  n: ['`cp -a` conserva permisos, fechas y enlaces: ideal para respaldos.', '! Si el destino ya existe, `cp` lo sobrescribe sin avisar (a menos que uses `-i`).'] },

{ c: 'files', t: 'Mover o renombrar', cmd: 'mv <origen> <destino>',
  d: 'Mueve archivos o carpetas; también sirve para renombrar.',
  s: ['Para mover: `mv archivo.txt ~/Documentos/`.', 'Para renombrar: `mv nombre_viejo.txt nombre_nuevo.txt`.', 'Verifica el resultado con `ls`.'],
  ex: 'mv borrador.txt informe-final.txt\nls',
  out: 'informe-final.txt  proyectos',
  n: ['No necesita `-r` para carpetas.', '! Sobrescribe el destino si ya existe; usa `mv -i` para que pregunte.'] },

{ c: 'files', t: 'Eliminar archivos y carpetas', cmd: 'rm -r <ruta>',
  d: 'Borra archivos o carpetas de forma permanente (no hay papelera).',
  s: ['Para un archivo: `rm archivo.txt`.', 'Para una carpeta y su contenido: `rm -r carpeta`.', 'Añade `-i` para que pida confirmación por cada elemento.'],
  ex: 'rm -ri datos-viejos',
  out: 'rm: ¿descender al directorio «datos-viejos»? y',
  n: ['! Lo borrado NO se puede recuperar. Evita `rm -rf` con rutas con variables sin verificar.', 'Alternativa más segura: instala `trash-cli` y usa `trash-put`.'] },

{ c: 'files', t: 'Buscar archivos por nombre', cmd: 'find <carpeta> -name "<patrón>"',
  d: 'Busca archivos y carpetas dentro de un árbol de directorios.',
  s: ['Indica dónde empezar (`.` es la carpeta actual).', 'Añade `-name "*.pdf"` para buscar por nombre; usa `-iname` para ignorar mayúsculas.', 'Puedes filtrar por tipo (`-type f` archivos, `-type d` carpetas) o tamaño (`-size +100M`).'],
  ex: 'find ~/Documentos -iname "*.pdf" -type f',
  out: `/home/pixel/Documentos/informe.pdf
/home/pixel/Documentos/facturas/enero.pdf`,
  n: ['Buscar en `/` requiere `sudo` para evitar errores de permisos.', 'Para buscar por contenido usa `grep -rn`.'] },

{ c: 'files', t: 'Buscar texto dentro de archivos', cmd: 'grep -rn "<texto>" <carpeta>',
  d: 'Encuentra líneas que contienen un texto en uno o varios archivos.',
  s: ['Escribe `grep -rn "texto" carpeta/`.', '`-r` busca recursivamente y `-n` muestra el número de línea.', 'Añade `-i` para ignorar mayúsculas o `-l` para listar solo los nombres de archivo.'],
  ex: 'grep -rn "TODO" ~/proyectos/web',
  out: `/home/pixel/proyectos/web/app.js:42:// TODO: validar formulario
/home/pixel/proyectos/web/index.html:15:<!-- TODO: logo -->`,
  n: ['Excluye carpetas pesadas: `--exclude-dir=node_modules`.', 'También sirve en tuberías: `ps aux | grep firefox`.'] },

{ c: 'files', t: 'Ver el contenido de un archivo', cmd: 'less <archivo>',
  d: 'Lee archivos largos con desplazamiento, sin editarlos.',
  s: ['Ejecuta `less archivo.log`.', 'Navega con las flechas, `Espacio` (página abajo) y `b` (página arriba).', 'Busca con `/texto` y sal con `q`.'],
  ex: 'less /var/log/dnf.log',
  n: ['`cat archivo` imprime todo de golpe; va bien para archivos cortos.', '`head -n 20` y `tail -n 20` muestran el inicio o el final.'] },

{ c: 'files', t: 'Seguir un archivo en tiempo real', cmd: 'tail -f <archivo>',
  d: 'Muestra las últimas líneas y sigue imprimiendo lo nuevo (ideal para logs).',
  s: ['Ejecuta `tail -f archivo.log`.', 'Verás las líneas nuevas al instante conforme se escriben.', 'Presiona `Ctrl + C` para salir.'],
  ex: 'tail -f -n 5 /var/log/messages',
  n: ['Con `tail -n 100` ves las últimas 100 líneas sin seguir el archivo.', 'Para logs de servicios, `journalctl -f` suele ser mejor.'] },

{ c: 'files', t: 'Cambiar permisos', cmd: 'chmod <modo> <archivo>',
  d: 'Define quién puede leer, escribir o ejecutar un archivo.',
  s: ['Para hacer un script ejecutable: `chmod +x script.sh`.', 'En modo numérico: 4 = lectura, 2 = escritura, 1 = ejecución; se suman por dueño, grupo y otros (ej. `755`).', 'Revisa el resultado con `ls -l`.'],
  ex: 'chmod 755 instalar.sh\nls -l instalar.sh',
  out: '-rwxr-xr-x 1 pixel pixel 214 oct 28 10:41 instalar.sh',
  n: ['`644` es lo habitual para archivos y `755` para carpetas y scripts.', '! Evita `chmod 777`: da permisos totales a cualquier usuario.'] },

{ c: 'files', t: 'Cambiar dueño', cmd: 'sudo chown <usuario>:<grupo> <ruta>',
  d: 'Cambia el usuario y grupo propietarios de un archivo o carpeta.',
  s: ['Reemplaza `<usuario>:<grupo>` por los valores deseados.', 'Usa `-R` para aplicarlo a todo el contenido de una carpeta.', 'Verifica con `ls -l`.'],
  ex: 'sudo chown -R pixel:pixel /srv/mi-sitio',
  n: ['Útil cuando copiaste archivos con `sudo` y quedaron como `root`.'] },

{ c: 'files', t: 'Crear un enlace simbólico', cmd: 'ln -s <destino> <enlace>',
  d: 'Crea un acceso directo que apunta a otro archivo o carpeta.',
  s: ['Primero el archivo real y luego el nombre del enlace: `ln -s /ruta/real /ruta/enlace`.', 'Accede al enlace como si fuera el original.', 'Comprueba con `ls -l`: se ve una flecha `->`.'],
  ex: 'ln -s ~/proyectos/web/public /var/www/html/mi-sitio\nls -l /var/www/html',
  out: 'lrwxrwxrwx 1 root root 29 oct 28 10:50 mi-sitio -> /home/pixel/proyectos/web/public',
  n: ['Si borras el original, el enlace queda roto.'] },

{ c: 'files', t: 'Comprimir y descomprimir (tar)', cmd: 'tar -czvf <archivo.tar.gz> <carpeta>',
  d: 'Empaqueta y comprime carpetas en un único archivo .tar.gz.',
  s: ['Para comprimir: `tar -czvf respaldo.tar.gz carpeta/` (`c` crear, `z` gzip, `v` detalle, `f` archivo).', 'Para extraer: `tar -xzvf respaldo.tar.gz`.', 'Para extraer en otra carpeta añade `-C /ruta/destino`.'],
  ex: 'tar -czvf respaldo.tar.gz proyectos/\ntar -xzvf respaldo.tar.gz -C /tmp',
  n: ['Para ver el contenido sin extraer: `tar -tzf respaldo.tar.gz`.', 'Los `.zip` se manejan con `zip` y `unzip` (instálalos con `%INSTALL% zip unzip`).'] },

{ c: 'files', t: 'Tamaño de carpetas', cmd: 'du -sh <carpeta>',
  d: 'Calcula cuánto espacio ocupa una carpeta.',
  s: ['Ejecuta `du -sh carpeta`.', '`-s` da solo el total y `-h` lo muestra legible.', 'Para ver qué subcarpetas pesan más: `du -h --max-depth=1 | sort -h`.'],
  ex: 'du -h --max-depth=1 ~ | sort -h | tail -4',
  out: `1.2G	/home/pixel/.cache
3.4G	/home/pixel/Videos
8.9G	/home/pixel/proyectos
14G	/home/pixel`,
  n: ['Para una vista interactiva instala `ncdu`: `%INSTALL% ncdu`.'] },

{ c: 'files', t: 'Sincronizar y respaldar (rsync)', cmd: 'rsync -avh --progress <origen>/ <destino>/',
  d: 'Copia solo lo que cambió: perfecto para respaldos locales o por red.',
  s: ['Ejecuta `rsync -avh --progress origen/ destino/`.', 'La barra final en `origen/` significa "copiar el contenido".', 'Repite el comando cuando quieras: solo transfiere las diferencias.'],
  ex: 'rsync -avh --progress ~/Documentos/ /run/media/pixel/USB/respaldo/',
  n: ['Prueba primero con `--dry-run` para ver qué haría sin copiar nada.', 'Por SSH: `rsync -avz carpeta/ usuario@servidor:/ruta/`.'] },

/* ───────────────────────── SISTEMA ───────────────────────── */
{ c: 'system', t: 'Monitor de procesos', cmd: 'htop',
  d: 'Muestra en vivo el uso de CPU, memoria y los procesos activos.',
  s: ['Instálalo si hace falta: `%INSTALL% htop`.', 'Ejecuta `htop`.', 'Muévete con las flechas, usa `F6` para ordenar, `F9` para terminar un proceso y `q` para salir.'],
  ex: 'htop',
  n: ['`top` viene instalado por defecto si no quieres instalar nada.'] },

{ c: 'system', t: 'Listar procesos', cmd: 'ps aux',
  d: 'Muestra una instantánea de todos los procesos del sistema.',
  s: ['Ejecuta `ps aux`.', 'Filtra con una tubería: `ps aux | grep nombre`.', 'Anota el PID (segunda columna) para usarlo con `kill`.'],
  ex: 'ps aux | grep firefox',
  out: 'pixel   4821  3.1  4.2 3120456 342120 ?  Sl 09:58  1:12 /usr/lib/firefox/firefox',
  n: ['`pgrep -a firefox` devuelve directamente PID y comando.'] },

{ c: 'system', t: 'Cerrar un proceso', cmd: 'kill <PID>',
  d: 'Solicita a un proceso que termine; con `-9` lo fuerza.',
  s: ['Averigua el PID con `ps aux | grep nombre`.', 'Ejecuta `kill <PID>` para un cierre ordenado.', 'Si no responde, usa `kill -9 <PID>`.'],
  ex: 'kill 4821',
  n: ['`pkill nombre` termina por nombre; `killall` también.', '! `kill -9` no deja al programa guardar datos: úsalo solo como último recurso.'] },

{ c: 'system', t: 'Uso de memoria RAM', cmd: 'free -h',
  d: 'Muestra memoria total, usada y libre, y el swap.',
  s: ['Ejecuta `free -h` (tamaños legibles).', 'Revisa la columna `available`: es la memoria realmente disponible.', 'Repite cada 2 s con `watch -n 2 free -h`.'],
  ex: 'free -h',
  out: `               total   usado   libre  compart.  búf/caché  disponible
Mem:            15Gi   5.2Gi   6.1Gi     412Mi      4.0Gi        9.4Gi
Swap:          8.0Gi      0B   8.0Gi`,
  n: ['Linux usa RAM libre como caché; que `libre` sea bajo no es un problema si `disponible` es alto.'] },

{ c: 'system', t: 'Espacio en disco', cmd: 'df -h',
  d: 'Muestra el espacio usado y libre de cada partición.',
  s: ['Ejecuta `df -h`.', 'Mira la columna `Uso%` de `/` y `/home`.', 'Para ver solo un lugar: `df -h /home`.'],
  ex: 'df -h /',
  out: `S.ficheros     Tamaño Usados  Disp Uso% Montado en
/dev/nvme0n1p3   237G   112G  123G  48% /`,
  n: ['Si llega al 100 % el sistema puede dejar de funcionar bien.'] },

{ c: 'system', t: 'Discos y particiones', cmd: 'lsblk',
  d: 'Lista discos, particiones y puntos de montaje en forma de árbol.',
  s: ['Ejecuta `lsblk`.', 'Identifica tu disco (`sda`, `nvme0n1`…) y sus particiones.', 'Con `lsblk -f` ves también el sistema de archivos y el UUID.'],
  ex: 'lsblk -f',
  out: `NAME        FSTYPE FSVER LABEL  UUID                   MOUNTPOINTS
nvme0n1
├─nvme0n1p1 vfat   FAT32        7A3B-91C2              /boot/efi
├─nvme0n1p2 ext4   1.0          1d0f…                  /boot
└─nvme0n1p3 btrfs              e83a…                  /`,
  n: ['Es seguro: solo lee información. Úsalo antes de formatear o montar una USB.'] },

{ c: 'system', t: 'Información del sistema', cmd: 'hostnamectl',
  d: 'Muestra nombre del equipo, distribución, versión del kernel y arquitectura.',
  s: ['Ejecuta `hostnamectl`.', 'Revisa `Operating System`, `Kernel` y `Architecture`.', 'Para solo el kernel: `uname -r`.'],
  ex: 'hostnamectl',
  out: `   Static hostname: pixel-pc
  Operating System: %OSNAME% Linux
            Kernel: Linux 6.17.5-200
      Architecture: x86-64`,
  n: ['`uname -a` imprime todo en una sola línea.'] },

{ c: 'system', t: 'Información de la CPU', cmd: 'lscpu',
  d: 'Muestra modelo, núcleos, hilos y velocidad del procesador.',
  s: ['Ejecuta `lscpu`.', 'Fíjate en `Model name`, `CPU(s)` y `Thread(s) per core`.', 'Usa `nproc` si solo quieres el número de núcleos lógicos.'],
  ex: 'lscpu | head -n 6',
  out: `Arquitectura:      x86_64
modo(s) de operación de las CPUs: 32-bit, 64-bit
CPU(s):            8
Nombre del modelo: AMD Ryzen 5 5600H`,
  n: ['Para PCI/USB: `lspci` y `lsusb` listan tarjeta gráfica, red y dispositivos conectados.'] },

{ c: 'system', t: 'Estado de un servicio', cmd: 'systemctl status <servicio>',
  d: 'Consulta si un servicio está activo, desde cuándo y sus últimos mensajes.',
  s: ['Reemplaza `<servicio>` por su nombre, p. ej. `sshd` o `NetworkManager`.', 'Lee `Active:` (running, failed o inactive) y las últimas líneas de log.', 'Presiona `q` para salir.'],
  ex: 'systemctl status NetworkManager',
  out: `● NetworkManager.service - Network Manager
     Loaded: loaded (/usr/lib/systemd/system/NetworkManager.service; enabled)
     Active: active (running) since Tue 2026-10-28 08:41:12 CST; 1h 52min ago`,
  n: ['Ver todos los servicios: `systemctl list-units --type=service`.'] },

{ c: 'system', t: 'Iniciar, detener y habilitar servicios', cmd: 'sudo systemctl enable --now <servicio>',
  d: 'Inicia un servicio ahora y lo configura para arrancar con el sistema.',
  s: ['Para iniciarlo y activarlo al arranque: `sudo systemctl enable --now <servicio>`.', 'Para reiniciarlo: `sudo systemctl restart <servicio>`.', 'Para pararlo y quitarlo del arranque: `sudo systemctl disable --now <servicio>`.'],
  ex: 'sudo systemctl enable --now sshd',
  out: 'Created symlink /etc/systemd/system/multi-user.target.wants/sshd.service → /usr/lib/systemd/system/sshd.service.',
  n: ['En Ubuntu el servicio de SSH se llama `ssh`; en Fedora `sshd`.', '`reload` recarga la configuración sin cortar conexiones activas (si el servicio lo soporta).'] },

{ c: 'system', t: 'Ver logs del sistema', cmd: 'journalctl -u <servicio> -f',
  d: 'Lee los registros de systemd, filtrando por servicio y siguiéndolos en vivo.',
  s: ['`journalctl -u <servicio>` muestra los logs de ese servicio.', 'Añade `-f` para seguirlos en vivo y `-n 50` para limitar a 50 líneas.', 'Para errores del arranque actual: `journalctl -p err -b`.'],
  ex: 'journalctl -u sshd -n 5 --no-pager',
  out: `oct 28 09:12:44 pixel-pc sshd[1203]: Server listening on 0.0.0.0 port 22.
oct 28 09:30:02 pixel-pc sshd[2210]: Accepted publickey for pixel from 192.168.1.20`,
  n: ['`journalctl --since "1 hour ago"` filtra por tiempo.', 'Para limpiar logs antiguos: `sudo journalctl --vacuum-time=7d`.'] },

{ c: 'system', t: 'Reiniciar o apagar', cmd: 'sudo reboot',
  d: 'Reinicia el equipo de forma ordenada; `shutdown` lo apaga.',
  s: ['Guarda tu trabajo y cierra los programas.', 'Ejecuta `sudo reboot` para reiniciar o `sudo shutdown now` para apagar.', 'Para programarlo: `sudo shutdown +10` (en 10 minutos); cancela con `sudo shutdown -c`.'],
  ex: 'sudo shutdown +10 "Reinicio por mantenimiento"',
  n: ['! No reinicies mientras se actualiza el sistema: espera a que termine.'] },

{ c: 'system', t: 'Fecha, hora y zona horaria', cmd: 'timedatectl',
  d: 'Muestra y configura la hora, la zona horaria y la sincronización NTP.',
  s: ['Ejecuta `timedatectl` para ver el estado actual.', 'Lista zonas con `timedatectl list-timezones | grep America`.', 'Cámbiala con `sudo timedatectl set-timezone America/Managua`.'],
  ex: 'timedatectl set-ntp true\ntimedatectl',
  out: `               Local time: mié 2026-10-28 15:50:12 CST
           Universal time: mié 2026-10-28 21:50:12 UTC
                 Time zone: America/Managua (CST, -0600)
System clock synchronized: yes`,
  n: ['`date` solo imprime la fecha y hora actuales.'] },

{ c: 'system', t: 'Añadir usuario al grupo de administradores', cmd: 'sudo usermod -aG %ADMINGROUP% <usuario>',
  d: 'Da permisos de `sudo` a un usuario existente.',
  s: ['Reemplaza `<usuario>` por el nombre real.', 'Ejecuta el comando: `-aG` añade al grupo sin quitar los que ya tenía.', 'El usuario debe cerrar sesión y volver a entrar para que surta efecto.'],
  ex: 'sudo usermod -aG %ADMINGROUP% maria\nid maria',
  out: 'uid=1001(maria) gid=1001(maria) grupos=1001(maria),10(%ADMINGROUP%)',
  n: ['En %OSNAME% el grupo de administración se llama `%ADMINGROUP%`.', '! Olvidar el `-a` reemplaza todos los grupos del usuario.'] },

{ c: 'system', t: 'Programar tareas con cron', cmd: 'crontab -e',
  d: 'Edita las tareas programadas de tu usuario.',
  s: ['Ejecuta `crontab -e` (elige un editor si te lo pide).', 'Añade una línea con el formato `min hora día mes díaSemana comando`.', 'Guarda y sal; revisa con `crontab -l`.'],
  ex: 'crontab -l',
  out: '30 2 * * * rsync -a ~/Documentos/ /mnt/respaldo/   # cada día a las 2:30',
  n: ['`*/5 * * * *` significa "cada 5 minutos".', 'Usa rutas absolutas en los comandos; cron tiene un PATH muy reducido.'] },

{ c: 'system', t: 'Mensajes del kernel', cmd: 'sudo dmesg --level=err,warn',
  d: 'Muestra errores y advertencias del kernel: hardware, drivers y discos.',
  s: ['Ejecuta `sudo dmesg --level=err,warn`.', 'Revisa mensajes de USB, disco o tarjeta gráfica.', 'Añade `-w` para seguirlos en vivo al conectar un dispositivo.'],
  ex: 'sudo dmesg --level=err,warn | tail -n 3',
  out: `[    4.512] ACPI BIOS Error (bug): Could not resolve symbol [\\_SB.PCI0.GPP0]
[   12.309] usb 1-3: device descriptor read/64, error -71`,
  n: ['Muchos avisos de ACPI en portátiles son inofensivos.'] },

/* ───────────────────────── RED ───────────────────────── */
{ c: 'network', t: 'Ver direcciones IP', cmd: 'ip -br address',
  d: 'Muestra cada interfaz de red con su estado y dirección IP en formato resumido.',
  s: ['Ejecuta `ip -br address` (o `ip -br a`).', 'Busca tu interfaz (`wlp…` para Wi-Fi, `enp…` para cable) y su IP.', '`ip a` da la versión detallada.'],
  ex: 'ip -br address',
  out: `lo               UNKNOWN        127.0.0.1/8 ::1/128
wlp2s0           UP             192.168.1.34/24 fe80::5b1c…/64`,
  n: ['Tu IP local también sale con `hostname -I`.'] },

{ c: 'network', t: 'Probar conexión (ping)', cmd: 'ping -c 4 <host>',
  d: 'Comprueba si un equipo o sitio responde y mide la latencia.',
  s: ['Ejecuta `ping -c 4 google.com` (4 paquetes).', 'Si responde, hay conexión y resolución DNS.', 'Si falla con IP pero no con nombre, el problema es DNS: prueba `ping -c 4 1.1.1.1`.'],
  ex: 'ping -c 4 1.1.1.1',
  out: `64 bytes from 1.1.1.1: icmp_seq=1 ttl=57 time=14.2 ms
64 bytes from 1.1.1.1: icmp_seq=2 ttl=57 time=13.8 ms
--- 1.1.1.1 estadísticas ---
4 paquetes transmitidos, 4 recibidos, 0% pérdida`,
  n: ['Sin `-c`, ping corre sin parar hasta que presiones `Ctrl + C`.'] },

{ c: 'network', t: 'Ver puertos abiertos', cmd: 'sudo ss -tulpn',
  d: 'Lista los puertos TCP/UDP en escucha y qué programa los usa.',
  s: ['Ejecuta `sudo ss -tulpn`.', 'Revisa `Local Address:Port` y la columna del proceso.', 'Filtra un puerto con `sudo ss -tulpn | grep :8080`.'],
  ex: 'sudo ss -tulpn | grep :22',
  out: 'tcp LISTEN 0 128 0.0.0.0:22 0.0.0.0:* users:(("sshd",pid=1203,fd=3))',
  n: ['Reemplaza al antiguo `netstat`.'] },

{ c: 'network', t: 'Descargar archivos', cmd: 'wget <url>',
  d: 'Descarga un archivo desde la web directamente a la carpeta actual.',
  s: ['Ejecuta `wget` con la URL completa.', 'Con `-c` reanudas una descarga interrumpida.', 'Con `-O nombre` la guardas con otro nombre.'],
  ex: 'wget -c https://example.com/archivo.iso',
  n: ['`curl -LO <url>` hace lo mismo.'] },

{ c: 'network', t: 'Consultar una web (curl)', cmd: 'curl -I <url>',
  d: 'Muestra solo las cabeceras HTTP de una URL: estado, servidor, redirecciones.',
  s: ['Ejecuta `curl -I https://sitio.com`.', 'Lee el código (`200` OK, `301` redirección, `404` no existe).', 'Sin `-I` descargas el contenido; con `-L` sigues redirecciones.'],
  ex: 'curl -I https://example.com',
  out: `HTTP/2 200
content-type: text/html; charset=UTF-8
server: ECS (dcb/7F83)`,
  n: ['Para ver tu IP pública: `curl ifconfig.me`.'] },

{ c: 'network', t: 'Redes Wi-Fi y conexiones (nmcli)', cmd: 'nmcli device wifi list',
  d: 'Lista las redes Wi-Fi disponibles y gestiona conexiones con NetworkManager.',
  s: ['Ejecuta `nmcli device wifi list` para ver redes y señal.', 'Conéctate con `nmcli device wifi connect "<SSID>" password "<clave>"`.', 'Revisa conexiones guardadas con `nmcli connection show`.'],
  ex: 'nmcli device wifi list',
  out: `IN-USE  SSID        MODE   CHAN  RATE        SIGNAL  SECURITY
*       Casa-5G     Infra  44    540 Mbit/s  88      WPA2
        Vecino      Infra  6     130 Mbit/s  42      WPA2`,
  n: ['Para apagar y encender el Wi-Fi: `nmcli radio wifi off` / `on`.'] },

{ c: 'network', t: 'Conexión remota (SSH)', cmd: 'ssh <usuario>@<host>',
  d: 'Abre una sesión segura en otro equipo.',
  s: ['Ejecuta `ssh usuario@192.168.1.50` con los datos reales.', 'Acepta la huella la primera vez (`yes`) e ingresa la contraseña.', 'Escribe `exit` para cerrar la sesión.'],
  ex: 'ssh pixel@192.168.1.50',
  out: `The authenticity of host '192.168.1.50' can't be established.
Are you sure you want to continue connecting (yes/no)? yes`,
  n: ['Otro puerto: `ssh -p 2222 usuario@host`.', 'Con llaves SSH ya no necesitas contraseña (mira `ssh-keygen`).'] },

{ c: 'network', t: 'Copiar archivos por SSH (scp)', cmd: 'scp <archivo> <usuario>@<host>:<ruta>',
  d: 'Copia archivos entre equipos de forma cifrada.',
  s: ['Para subir: `scp archivo.txt usuario@host:/ruta/`.', 'Para bajar: `scp usuario@host:/ruta/archivo.txt .`.', 'Para carpetas añade `-r`.'],
  ex: 'scp informe.pdf pixel@192.168.1.50:~/Documentos/',
  n: ['Para grandes volúmenes `rsync` es más eficiente.'] },

{ c: 'network', t: 'Ruta de los paquetes (traceroute)', cmd: 'traceroute <dominio>',
  d: 'Muestra los saltos que da tu conexión hasta llegar a un destino.',
  s: ['Instálalo si hace falta: `%INSTALL% traceroute`.', 'Ejecuta `traceroute dominio.com`.', 'Los saltos con `* * *` suelen ser routers que no responden.'],
  ex: 'traceroute -m 5 1.1.1.1',
  out: ` 1  _gateway (192.168.1.1)  1.2 ms
 2  10.20.0.1  8.7 ms
 3  * * *`,
  n: ['`tracepath` viene instalado y no requiere root.'] },

{ c: 'network', t: 'Tabla de rutas y DNS', cmd: 'ip route',
  d: 'Muestra la puerta de enlace y las rutas de red; `resolvectl` muestra los DNS.',
  s: ['Ejecuta `ip route` y busca la línea `default via…`: esa es tu puerta de enlace.', 'Ejecuta `resolvectl status` para ver los servidores DNS.', 'Si no sale ninguna ruta por defecto, no hay salida a internet.'],
  ex: 'ip route',
  out: `default via 192.168.1.1 dev wlp2s0 proto dhcp metric 600
192.168.1.0/24 dev wlp2s0 proto kernel scope link src 192.168.1.34`,
  n: ['`resolvectl flush-caches` limpia la caché DNS.'] },

/* ───────────────────────── EXTRAS ───────────────────────── */
{ c: 'extras', t: 'Ayuda de un comando', cmd: 'man <comando>',
  d: 'Abre el manual de cualquier comando.',
  s: ['Ejecuta `man ls`.', 'Navega con las flechas, busca con `/palabra` y sal con `q`.', 'Para algo rápido usa `comando --help`.'],
  ex: 'tar --help | head -n 4',
  n: ['`man -k palabra` busca manuales por tema.'] },

{ c: 'extras', t: 'Dónde está un programa', cmd: 'which <comando>',
  d: 'Indica la ruta del ejecutable que se usaría al invocar un comando.',
  s: ['Ejecuta `which python3`.', 'Si no devuelve nada, no está instalado o no está en el `PATH`.', '`type -a comando` muestra además alias y funciones.'],
  ex: 'which python3',
  out: '/usr/bin/python3',
  n: ['`whereis` también muestra páginas de manual y código fuente.'] },

{ c: 'extras', t: 'Historial de comandos', cmd: 'history | grep <texto>',
  d: 'Busca entre los comandos que ya escribiste.',
  s: ['Ejecuta `history` para ver la lista numerada.', 'Filtra con `history | grep git`.', 'Repite uno con `!<número>`, o el anterior con `!!`.'],
  ex: 'history | grep docker',
  out: ` 812  docker ps
 840  docker compose up -d`,
  n: ['`Ctrl + R` busca en el historial mientras escribes.', '`sudo !!` repite el último comando con sudo.'] },

{ c: 'extras', t: 'Crear alias (atajos)', cmd: "alias <nombre>='<comando>'",
  d: 'Define un nombre corto para un comando largo.',
  s: ["Prueba un alias temporal: `alias ll='ls -lah'`.", 'Para hacerlo permanente, añade esa línea al final de `~/.bashrc`.', 'Recarga con `source ~/.bashrc`.'],
  ex: "echo \"alias ll='ls -lah'\" >> ~/.bashrc\nsource ~/.bashrc\nll",
  n: ['`alias` sin argumentos lista los definidos.', '`unalias nombre` lo quita.'] },

{ c: 'extras', t: 'Variables de entorno y PATH', cmd: 'export PATH="$PATH:<carpeta>"',
  d: 'Añade una carpeta a la lista donde el sistema busca ejecutables.',
  s: ['Mira el PATH actual con `echo $PATH`.', 'Añade tu carpeta: `export PATH="$PATH:$HOME/bin"`.', 'Para que sea permanente, escribe esa línea en `~/.bashrc`.'],
  ex: 'export PATH="$PATH:$HOME/bin"\necho $PATH',
  out: '/usr/local/bin:/usr/bin:/home/pixel/bin',
  n: ['`export` solo afecta a la terminal actual y a sus procesos hijos.'] },

{ c: 'extras', t: 'Ejecutar sin cerrarse (nohup)', cmd: 'nohup <comando> &',
  d: 'Mantiene un proceso corriendo aunque cierres la terminal.',
  s: ['Escribe `nohup <comando> &`.', 'La salida se guarda en `nohup.out`.', 'Consulta los trabajos con `jobs` o `ps aux | grep`.'],
  ex: 'nohup python3 servidor.py > log.txt 2>&1 &',
  out: '[1] 5321',
  n: ['Para sesiones interactivas persistentes usa `tmux`.'] },

{ c: 'extras', t: 'Repetir un comando (watch)', cmd: 'watch -n 2 <comando>',
  d: 'Ejecuta un comando cada pocos segundos y refresca la pantalla.',
  s: ['Ejecuta `watch -n 2 "df -h"`.', 'Usa `-d` para resaltar lo que cambia.', 'Sal con `Ctrl + C`.'],
  ex: 'watch -n 2 -d "free -h"',
  n: ['Ideal para vigilar descargas, memoria o colas.'] },

{ c: 'extras', t: 'Tuberías y filtros', cmd: '<comando> | sort | uniq -c | sort -nr',
  d: 'Encadena comandos: la salida de uno es la entrada del siguiente.',
  s: ['Usa `|` para pasar la salida al siguiente comando.', '`sort` ordena, `uniq -c` cuenta repetidos y `wc -l` cuenta líneas.', 'Guarda el resultado con `> archivo.txt` o añade con `>> archivo.txt`.'],
  ex: "cut -d' ' -f1 acceso.log | sort | uniq -c | sort -nr | head -n 3",
  out: `  214 192.168.1.20
   87 192.168.1.35
   12 10.0.0.4`,
  n: ['`>` reemplaza el archivo y `>>` agrega al final.'] },

{ c: 'extras', t: 'Crear llave SSH', cmd: 'ssh-keygen -t ed25519 -C "<tu-correo>"',
  d: 'Genera un par de llaves para conectarte sin contraseña a servidores o GitHub.',
  s: ['Ejecuta el comando con tu correo.', 'Acepta la ruta por defecto (`~/.ssh/id_ed25519`) y pon una frase de seguridad.', 'Copia la llave pública con `cat ~/.ssh/id_ed25519.pub` y regístrala en el servicio.'],
  ex: 'ssh-keygen -t ed25519 -C "pixel@ejemplo.com"',
  out: `Your public key has been saved in /home/pixel/.ssh/id_ed25519.pub`,
  n: ['! Nunca compartas el archivo sin `.pub` (la llave privada).', 'Para servidores: `ssh-copy-id usuario@host`.'] },

{ c: 'extras', t: 'Git: flujo básico', cmd: 'git status',
  d: 'Muestra el estado del repositorio; es el primer paso del flujo básico de Git.',
  s: ['Dentro de un repositorio, ejecuta `git status`.', 'Prepara cambios: `git add .`.', 'Guarda con `git commit -m "mensaje"` y sube con `git push`.'],
  ex: 'git status\ngit add .\ngit commit -m "Agrego modal de detalle"',
  out: `En la rama main
Cambios sin preparar para el commit:
	modificados:   app.js`,
  n: ['Instala Git con `%INSTALL% git`.', '`git log --oneline` muestra el historial resumido.'] },

{ c: 'extras', t: 'Sesiones persistentes (tmux)', cmd: 'tmux new -s <nombre>',
  d: 'Crea una sesión de terminal que sigue viva aunque pierdas la conexión.',
  s: ['Instálalo: `%INSTALL% tmux`.', 'Crea la sesión: `tmux new -s trabajo`.', 'Sal sin cerrarla con `Ctrl + B` y luego `D`; vuelve con `tmux attach -t trabajo`.'],
  ex: 'tmux new -s trabajo',
  n: ['`tmux ls` lista las sesiones.', 'Muy útil por SSH.'] },

{ c: 'extras', t: 'Abrir carpeta en el explorador', cmd: 'xdg-open .',
  d: 'Abre la carpeta actual (o un archivo) con la aplicación predeterminada.',
  s: ['Ejecuta `xdg-open .` para abrir la carpeta actual.', 'También funciona con archivos y URLs.', 'Para abrir un PDF: `xdg-open informe.pdf`.'],
  ex: 'xdg-open ~/Descargas',
  n: ['Solo funciona en sesiones con entorno gráfico.'] }

];
