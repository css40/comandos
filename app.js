/* =====================================================================
   PIXEL TERMINAL · v2.0  —  lógica de la aplicación
   Los comandos viven en /data (un archivo por sistema). Aquí solo está
   la interfaz: filtros, búsqueda, modal, tema claro/oscuro y copiado.
   ===================================================================== */
(function () {
    'use strict';

    var PT = window.PT || {};

    /* ------------------------------------------------------------------
       Configuración de categorías y sistemas
       ------------------------------------------------------------------ */
    var CAT_ORDER = ['packages', 'files', 'system', 'network', 'extras'];

    var CATS = {
        all:      { label: 'Todos',                icon: 'fa-border-all',        mascot: 'saludando',
                    bubble: '¡Hola! Soy Mr. Pixel. Elige un sistema y toca cualquier comando para ver cómo se usa.' },
        packages: { label: 'Paquetes',             icon: 'fa-box-open',          mascot: 'sentado',
                    bubble: 'Instalar, actualizar y limpiar programas: aquí empieza todo.' },
        files:    { label: 'Archivos',             icon: 'fa-folder-open',       mascot: 'saludando',
                    bubble: 'Moverte, copiar y buscar archivos es el pan de cada día.' },
        system:   { label: 'Sistema',              icon: 'fa-microchip',         mascot: 'soporte',
                    bubble: '¿Algo va lento o raro? Revisa procesos, servicios y disco.' },
        network:  { label: 'Red',                  icon: 'fa-network-wired',     mascot: 'comentarios-publiacaiones',
                    bubble: '¿Sin internet? Vamos a diagnosticar la red paso a paso.' },
        extras:   { label: 'Utilidades & Extras',  icon: 'fa-wand-magic-sparkles', mascot: 'dudas',
                    bubble: 'Trucos, atajos y utilidades que te ahorran muchísimo tiempo.' }
    };

    var OSES = {
        fedora: {
            name: 'Fedora', host: 'fedora@pixel:~$',
            lead: 'Fedora Linux: DNF, RPM, Flatpak, SELinux y firewalld. Todo lo esencial, explicado paso a paso.',
            manager: 'DNF', shellName: 'bash',
            tokens: { INSTALL: 'sudo dnf install', ADMINGROUP: 'wheel', OSNAME: 'Fedora' },
            term: { title: 'bash — fedora', prompt: '$ ' }
        },
        ubuntu: {
            name: 'Ubuntu', host: 'ubuntu@pixel:~$',
            lead: 'Ubuntu: APT, dpkg, Snap, UFW y netplan. Todo lo esencial, explicado paso a paso.',
            manager: 'APT', shellName: 'bash',
            tokens: { INSTALL: 'sudo apt install', ADMINGROUP: 'sudo', OSNAME: 'Ubuntu' },
            term: { title: 'bash — ubuntu', prompt: '$ ' }
        },
        windows: {
            name: 'Windows', host: 'PS C:\\Users\\Pixel>',
            lead: 'Windows 10/11: PowerShell y CMD completamente separados, para que nunca los mezcles.',
            manager: 'winget', shellName: 'PowerShell / CMD',
            shells: {
                powershell: { label: 'PowerShell', shellName: 'PowerShell', term: { title: 'Windows PowerShell', prompt: 'PS C:\\Users\\Pixel> ' } },
                cmd:        { label: 'CMD',        shellName: 'CMD',        term: { title: 'Símbolo del sistema', prompt: 'C:\\Users\\Pixel> ' } }
            }
        }
    };

    var SHELL_NOTES = {
        powershell: '<strong>PowerShell</strong> (<code>powershell.exe</code> / <code>pwsh</code>): comandos tipo <em>Verbo-Sustantivo</em> que trabajan con objetos. Es la consola moderna de Windows y la más potente.',
        cmd: '<strong>CMD</strong> (<code>cmd.exe</code>, Símbolo del sistema): comandos clásicos heredados de MS-DOS, más simples y universales. Muchos funcionan también en PowerShell.'
    };

    /* ------------------------------------------------------------------
       Estado
       ------------------------------------------------------------------ */
    var state = { os: 'fedora', shell: 'powershell', cat: 'all', q: '' };
    var DB = {};          // base de datos ya procesada: DB.fedora, DB.ubuntu, DB['windows:powershell'], DB['windows:cmd']
    var view = [];        // lista filtrada actualmente visible
    var modalIndex = -1;
    var lastFocus = null;

    /* ------------------------------------------------------------------
       Utilidades
       ------------------------------------------------------------------ */
    function $(id) { return document.getElementById(id); }

    function esc(s) {
        return String(s == null ? '' : s)
            .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    }

    // Escapa y resalta <marcadores> como parte editable del comando.
    function hl(cmd) {
        return esc(cmd).replace(/&lt;([^&]+?)&gt;/g, '<span class="ph">&lt;$1&gt;</span>');
    }

    // Texto de pasos/notas: escapa y convierte `código` en <code>.
    function rich(s) {
        return esc(s).replace(/`([^`]+)`/g, '<code>$1</code>');
    }

    function norm(s) {
        return String(s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }

    function store(key, val) { try { localStorage.setItem(key, val); } catch (e) {} }
    function load(key) { try { return localStorage.getItem(key); } catch (e) { return null; } }

    function expandTokens(value, tokens) {
        if (typeof value === 'string') {
            return value.replace(/%([A-Z]+)%/g, function (m, k) { return tokens[k] != null ? tokens[k] : m; });
        }
        if (Array.isArray(value)) return value.map(function (v) { return expandTokens(v, tokens); });
        return value;
    }

    function prepare(list, ctx) {
        var out = list.map(function (e) {
            var copy = {};
            Object.keys(e).forEach(function (k) { copy[k] = ctx.tokens ? expandTokens(e[k], ctx.tokens) : e[k]; });
            copy.os = ctx.os; copy.shell = ctx.shell; copy.term = ctx.term;
            copy.admin = !!copy.a || (ctx.os !== 'windows' && /(^|\s|\|)sudo\s/.test(copy.cmd));
            return copy;
        });
        // Orden estable por categoría
        out = out.map(function (e, i) { return { e: e, i: i }; })
            .sort(function (a, b) {
                var d = CAT_ORDER.indexOf(a.e.c) - CAT_ORDER.indexOf(b.e.c);
                return d || (a.i - b.i);
            })
            .map(function (x) { return x.e; });
        out.forEach(function (e, i) { e.id = ctx.key + '-' + i; e.hay = norm([e.t, e.cmd, e.d, (e.k || '')].join(' ')); });
        return out;
    }

    function buildDB() {
        var core = PT.linuxCore || [];
        ['fedora', 'ubuntu'].forEach(function (os) {
            var o = OSES[os];
            DB[os] = prepare(core.concat(PT[os] || []), { os: os, key: os, tokens: o.tokens, term: o.term });
        });
        DB['windows:powershell'] = prepare(PT.powershell || [], { os: 'windows', shell: 'powershell', key: 'ps', term: OSES.windows.shells.powershell.term });
        DB['windows:cmd'] = prepare(PT.cmd || [], { os: 'windows', shell: 'cmd', key: 'cmd', term: OSES.windows.shells.cmd.term });
    }

    function currentList() {
        return state.os === 'windows' ? DB['windows:' + state.shell] : DB[state.os];
    }

    /* ------------------------------------------------------------------
       Filtrado
       ------------------------------------------------------------------ */
    function matches(e, q) {
        if (!q) return true;
        var words = q.split(/\s+/).filter(Boolean);
        return words.every(function (w) { return e.hay.indexOf(w) !== -1; });
    }

    function computeView() {
        var q = norm(state.q).trim();
        return currentList().filter(function (e) {
            return (state.cat === 'all' || e.c === state.cat) && matches(e, q);
        });
    }

    /* ------------------------------------------------------------------
       Render: chips, stats, tarjetas
       ------------------------------------------------------------------ */
    function renderChips() {
        var q = norm(state.q).trim();
        var list = currentList().filter(function (e) { return matches(e, q); });
        var counts = { all: list.length };
        CAT_ORDER.forEach(function (c) { counts[c] = 0; });
        list.forEach(function (e) { counts[e.c]++; });

        var html = ['all'].concat(CAT_ORDER).map(function (c) {
            var cat = CATS[c];
            var color = c === 'all' ? 'var(--accent)' : 'var(--cat-' + c + ')';
            var active = state.cat === c;
            return '<button class="chip' + (active ? ' is-active' : '') + (counts[c] === 0 ? ' is-dim' : '') +
                '" data-cat="' + c + '" style="--c:' + color + '" aria-pressed="' + active + '">' +
                '<i class="fa-solid ' + cat.icon + '" aria-hidden="true"></i>' + esc(cat.label) +
                '<span class="count">' + counts[c] + '</span></button>';
        }).join('');
        $('chips').innerHTML = html;
    }

    function renderStats() {
        var o = OSES[state.os];
        var total = currentList().length;
        var shellName = state.os === 'windows' ? o.shells[state.shell].shellName : o.shellName;
        $('stats').innerHTML =
            '<li><i class="fa-solid fa-hashtag" aria-hidden="true"></i><strong>' + total + '</strong> comandos</li>' +
            '<li><i class="fa-solid fa-layer-group" aria-hidden="true"></i><strong>5</strong> categorías</li>' +
            '<li><i class="fa-solid fa-terminal" aria-hidden="true"></i>Consola: <strong>' + esc(shellName) + '</strong></li>' +
            '<li><i class="fa-solid fa-box" aria-hidden="true"></i>Paquetes: <strong>' + esc(o.manager) + '</strong></li>';
    }

    function cardHTML(e, i) {
        var catColor = 'var(--cat-' + e.c + ')';
        var tags = '';
        if (e.os === 'windows') {
            tags += e.shell === 'powershell' ? '<span class="badge badge-ps">PowerShell</span>' : '<span class="badge badge-cmd">CMD</span>';
        }
        if (e.admin) {
            tags += '<span class="badge badge-admin" title="Requiere privilegios de administrador"><i class="fa-solid fa-shield-halved" aria-hidden="true"></i>' +
                (e.os === 'windows' ? 'Admin' : 'sudo') + '</span>';
        }
        var delay = Math.min(i, 14) * 28;
        return '<article class="card" role="button" tabindex="0" data-i="' + i + '" style="--c:' + catColor + ';animation-delay:' + delay + 'ms" ' +
            'aria-label="' + esc(e.t) + ': ver detalles">' +
            '<div class="card-top">' +
                '<span class="badge" style="--c:' + catColor + '"><i class="fa-solid ' + CATS[e.c].icon + '" aria-hidden="true"></i>' + esc(CATS[e.c].label.replace(' & Extras', '')) + '</span>' +
                '<span class="spacer"></span>' + tags +
            '</div>' +
            '<h3 class="card-title">' + esc(e.t) + '</h3>' +
            '<p class="card-desc">' + esc(e.d) + '</p>' +
            '<div class="card-bottom">' +
                '<div class="console"><span class="prompt" aria-hidden="true">' + (e.os === 'windows' ? '&gt;' : '$') + '</span>' +
                    '<code>' + hl(e.cmd) + '</code>' +
                    '<button class="copy-btn" data-copy="' + e.id + '" aria-label="Copiar comando: ' + esc(e.cmd) + '" title="Copiar comando"><i class="fa-regular fa-copy" aria-hidden="true"></i></button>' +
                '</div>' +
                '<span class="card-more">Ver paso a paso <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></span>' +
            '</div>' +
        '</article>';
    }

    function renderCommands() {
        view = computeView();
        var list = $('commandList');
        $('empty').hidden = view.length !== 0;
        list.hidden = view.length === 0;
        list.innerHTML = view.map(cardHTML).join('');
        renderChips();
    }

    function renderOSChrome() {
        var o = OSES[state.os];
        document.querySelectorAll('.os-tab').forEach(function (b) {
            var on = b.dataset.os === state.os;
            b.classList.toggle('is-active', on);
            b.setAttribute('aria-pressed', on);
        });
        $('osLead').textContent = o.lead;
        $('osLine').textContent = state.os === 'windows'
            ? (state.shell === 'powershell' ? 'PS C:\\Users\\Pixel>' : 'C:\\Users\\Pixel>')
            : o.host;

        var isWin = state.os === 'windows';
        $('shellSwitch').hidden = !isWin;
        $('shellNote').hidden = !isWin;
        if (isWin) {
            $('shellNote').innerHTML = '<i class="fa-solid fa-circle-info" aria-hidden="true"></i><span>' + SHELL_NOTES[state.shell] + '</span>';
            document.querySelectorAll('.seg').forEach(function (b) {
                var on = b.dataset.shell === state.shell;
                b.classList.toggle('is-active', on);
                b.setAttribute('aria-pressed', on);
            });
        }
        renderStats();
        updateMascot();
    }

    function updateMascot() {
        var c = CATS[state.cat];
        var img = $('heroImg');
        var next = 'img/' + c.mascot + '.png';
        if (img.getAttribute('src') !== next) {
            img.setAttribute('src', next);
            img.classList.remove('swap'); void img.offsetWidth; img.classList.add('swap');
        }
        $('bubble').textContent = c.bubble;
    }

    /* ------------------------------------------------------------------
       Acciones: cambiar SO, shell, categoría
       ------------------------------------------------------------------ */
    function setOS(os) {
        if (!OSES[os]) return;
        state.os = os;
        store('pt-os', os);
        renderOSChrome();
        renderCommands();
    }

    function setShell(sh) {
        state.shell = sh;
        store('pt-shell', sh);
        renderOSChrome();
        renderCommands();
    }

    function setCat(cat) {
        state.cat = cat;
        updateMascot();
        renderCommands();
    }

    /* ------------------------------------------------------------------
       Portapapeles + toast
       ------------------------------------------------------------------ */
    var toastTimer;
    function toast(msg) {
        var t = $('toast');
        t.innerHTML = '<i class="fa-solid fa-circle-check" aria-hidden="true"></i>' + esc(msg);
        t.classList.add('is-show');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(function () { t.classList.remove('is-show'); }, 1800);
    }

    function fallbackCopy(text) {
        var ta = document.createElement('textarea');
        ta.value = text; ta.setAttribute('readonly', '');
        ta.style.cssText = 'position:fixed;top:-1000px;opacity:0';
        document.body.appendChild(ta); ta.select();
        var ok = false;
        try { ok = document.execCommand('copy'); } catch (e) {}
        document.body.removeChild(ta);
        return ok;
    }

    function copyText(text, btn) {
        function done(ok) {
            if (!ok) { toast('No se pudo copiar'); return; }
            toast('Comando copiado');
            if (btn) {
                var icon = btn.querySelector('i');
                var label = btn.querySelector('span');
                btn.classList.add('is-done');
                if (icon) icon.className = 'fa-solid fa-check';
                if (label) label.textContent = '¡Copiado!';
                setTimeout(function () {
                    btn.classList.remove('is-done');
                    if (icon) icon.className = 'fa-regular fa-copy';
                    if (label) label.textContent = 'Copiar';
                }, 1500);
            }
        }
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(text).then(function () { done(true); }, function () { done(fallbackCopy(text)); });
        } else {
            done(fallbackCopy(text));
        }
    }

    /* ------------------------------------------------------------------
       Modal de detalle
       ------------------------------------------------------------------ */
    function openModal(i, trigger) {
        if (!view[i]) return;
        var dlg = $('cmdModal');
        if (trigger) lastFocus = trigger;
        modalIndex = i;
        fillModal(view[i]);
        if (!dlg.open) {
            dlg.showModal();
            document.body.classList.add('modal-open');
        }
        $('mBody').scrollTop = 0;
    }

    function closeModal() {
        var dlg = $('cmdModal');
        if (dlg.open) dlg.close();
    }

    function fillModal(e) {
        var cat = CATS[e.c];
        var color = 'var(--cat-' + e.c + ')';
        document.querySelector('.modal-shell').style.setProperty('--c', color);

        $('mImg').setAttribute('src', 'img/' + cat.mascot + '.png');

        var badges = '<span class="badge" style="--c:' + color + '"><i class="fa-solid ' + cat.icon + '" aria-hidden="true"></i>' + esc(cat.label) + '</span>';
        badges += '<span class="badge badge-neutral"><i class="fa-brands fa-' + (e.os === 'windows' ? 'windows' : e.os) + '" aria-hidden="true"></i>' + esc(OSES[e.os].name) + '</span>';
        if (e.os === 'windows') badges += e.shell === 'powershell' ? '<span class="badge badge-ps">PowerShell</span>' : '<span class="badge badge-cmd">CMD</span>';
        if (e.admin) badges += '<span class="badge badge-admin"><i class="fa-solid fa-shield-halved" aria-hidden="true"></i>' + (e.os === 'windows' ? 'Requiere Administrador' : 'Requiere sudo') + '</span>';
        $('mBadges').innerHTML = badges;

        $('mTitle').textContent = e.t;
        $('mCmd').innerHTML = hl(e.cmd);
        $('mDesc').innerHTML = rich(e.d);

        $('mSteps').innerHTML = (e.s && e.s.length ? e.s : ['Escribe el comando en la terminal y presiona Enter.'])
            .map(function (s) { return '<li>' + rich(s) + '</li>'; }).join('');

        // Ejemplo: cada línea de "ex" es un comando con su prompt; "out" es la salida.
        var exLines = (e.ex || e.cmd).split('\n');
        var html = exLines.map(function (l) {
            return '<span class="t-prompt">' + esc(e.term.prompt) + '</span><span class="t-cmd">' + esc(l) + '</span>';
        }).join('\n');
        if (e.out) html += '\n<span class="t-out">' + esc(e.out) + '</span>';
        $('mExample').innerHTML = html;
        $('mTermTitle').textContent = e.term.title;

        var notes = e.n || [];
        $('mNotesSection').hidden = notes.length === 0;
        $('mNotes').innerHTML = notes.map(function (n) {
            var warn = n.charAt(0) === '!';
            var text = warn ? n.slice(1).trim() : n;
            return '<li class="' + (warn ? 'is-warn' : '') + '"><i class="fa-solid ' + (warn ? 'fa-triangle-exclamation' : 'fa-circle-check') + '" aria-hidden="true"></i><span>' + rich(text) + '</span></li>';
        }).join('');

        $('mCounter').textContent = (modalIndex + 1) + ' / ' + view.length;
        $('mPrev').disabled = modalIndex <= 0;
        $('mNext').disabled = modalIndex >= view.length - 1;
    }

    function step(delta) {
        var n = modalIndex + delta;
        if (n >= 0 && n < view.length) openModal(n);
    }

    function currentExample() {
        var e = view[modalIndex];
        return e ? (e.ex || e.cmd) : '';
    }

    /* ------------------------------------------------------------------
       Tema claro / oscuro
       ------------------------------------------------------------------ */
    function applyTheme(t, persist) {
        document.documentElement.setAttribute('data-theme', t);
        var dark = t === 'dark';
        $('themeToggle').setAttribute('aria-checked', String(dark));
        $('themeLabel').textContent = dark ? 'Modo oscuro' : 'Modo blanco';
        var meta = document.querySelector('meta[name="theme-color"]');
        if (meta) meta.setAttribute('content', dark ? '#090e13' : '#f2f6f8');
        if (persist) store('pt-theme', t);
    }

    function toggleTheme() {
        var cur = document.documentElement.getAttribute('data-theme');
        applyTheme(cur === 'dark' ? 'light' : 'dark', true);
    }

    /* ------------------------------------------------------------------
       Eventos
       ------------------------------------------------------------------ */
    function bind() {
        document.querySelectorAll('.os-tab').forEach(function (b) {
            b.addEventListener('click', function () { setOS(b.dataset.os); });
        });
        document.querySelectorAll('.seg').forEach(function (b) {
            b.addEventListener('click', function () { setShell(b.dataset.shell); });
        });
        $('chips').addEventListener('click', function (ev) {
            var chip = ev.target.closest('.chip');
            if (chip) setCat(chip.dataset.cat);
        });

        var input = $('searchInput');
        input.addEventListener('input', function () { state.q = input.value; renderCommands(); });
        input.addEventListener('keydown', function (ev) {
            if (ev.key === 'Escape' && input.value) { input.value = ''; state.q = ''; renderCommands(); }
        });

        $('clearFilters').addEventListener('click', function () {
            input.value = ''; state.q = ''; state.cat = 'all';
            updateMascot(); renderCommands(); input.focus();
        });

        // Delegación en la lista de tarjetas
        var list = $('commandList');
        list.addEventListener('click', function (ev) {
            var cp = ev.target.closest('.copy-btn');
            if (cp) {
                ev.stopPropagation();
                var item = view.filter(function (x) { return x.id === cp.dataset.copy; })[0];
                if (item) copyText(item.cmd, null);
                return;
            }
            var card = ev.target.closest('.card');
            if (card) openModal(Number(card.dataset.i), card);
        });
        list.addEventListener('keydown', function (ev) {
            if ((ev.key === 'Enter' || ev.key === ' ') && ev.target.classList.contains('card')) {
                ev.preventDefault();
                openModal(Number(ev.target.dataset.i), ev.target);
            }
        });

        // Modal
        var dlg = $('cmdModal');
        $('mClose').addEventListener('click', closeModal);
        $('mPrev').addEventListener('click', function () { step(-1); });
        $('mNext').addEventListener('click', function () { step(1); });
        $('mCopy').addEventListener('click', function () { var e = view[modalIndex]; if (e) copyText(e.cmd, $('mCopy')); });
        $('mCopyEx').addEventListener('click', function () { copyText(currentExample(), null); });
        dlg.addEventListener('click', function (ev) { if (ev.target === dlg) closeModal(); });   // clic en el fondo
        dlg.addEventListener('close', function () {
            document.body.classList.remove('modal-open');
            if (lastFocus && document.body.contains(lastFocus)) lastFocus.focus({ preventScroll: true });
        });

        // Teclado global
        document.addEventListener('keydown', function (ev) {
            var tag = (ev.target.tagName || '').toLowerCase();
            var typing = tag === 'input' || tag === 'textarea';
            if (dlg.open) {
                if (ev.key === 'ArrowRight') { ev.preventDefault(); step(1); }
                else if (ev.key === 'ArrowLeft') { ev.preventDefault(); step(-1); }
                return;
            }
            if (ev.key === '/' && !typing && !ev.ctrlKey && !ev.metaKey) {
                ev.preventDefault(); input.focus(); input.select();
            }
        });

        $('themeToggle').addEventListener('click', toggleTheme);

        // Si el usuario no eligió tema manualmente, seguir al sistema
        if (window.matchMedia) {
            var mq = window.matchMedia('(prefers-color-scheme: light)');
            var onChange = function (m) { if (!load('pt-theme')) applyTheme(m.matches ? 'light' : 'dark', false); };
            if (mq.addEventListener) mq.addEventListener('change', onChange);
        }
    }

    /* ------------------------------------------------------------------
       Inicio
       ------------------------------------------------------------------ */
    function init() {
        buildDB();
        applyTheme(document.documentElement.getAttribute('data-theme') || 'dark', false);

        var savedOS = load('pt-os');
        if (savedOS && OSES[savedOS]) state.os = savedOS;
        var savedShell = load('pt-shell');
        if (savedShell === 'cmd' || savedShell === 'powershell') state.shell = savedShell;

        bind();
        renderOSChrome();
        renderCommands();
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();
