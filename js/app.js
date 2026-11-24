/* ============================================================================
   IG-MOTORS — MOTEUR DU SITE
   Ce fichier gère l'affichage. En principe, vous n'avez pas à le modifier :
   tout le contenu se règle dans js/data.js
   ========================================================================== */

/* ---------- Icônes SVG ---------- */
const ICONS = {
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.9z"/>',
  arrowRight: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  arrowUpRight: '<path d="M7 17 17 7M8 7h9v9"/>',
  search: '<circle cx="11" cy="11" r="7.5"/><path d="m20.5 20.5-4.3-4.3"/>',
  calendar: '<rect x="3" y="4.5" width="18" height="17" rx="2.5"/><path d="M8 2.5v4M16 2.5v4M3 10h18"/>',
  gauge: '<path d="M4 18a9 9 0 1 1 16 0"/><path d="M12 14 16 9"/><circle cx="12" cy="14" r="1.4"/>',
  fuel: '<path d="M4 21V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v15"/><path d="M4 11h8"/><path d="M12 16h3a2 2 0 0 0 2-2V9.5a2 2 0 0 1 2-2"/><path d="M12 21h8"/>',
  gearbox: '<circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l2.8 2.8M16.2 16.2 19 19M19 5l-2.8 2.8M7.8 16.2 5 19"/>',
  shield: '<path d="M12 22s8-4 8-10V5.5L12 2 4 5.5V12c0 6 8 10 8 10z"/><path d="m9 11.5 2 2 4-4.5"/>',
  doc: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/>',
  cash: '<rect x="2" y="6" width="20" height="13" rx="2.5"/><circle cx="12" cy="12.5" r="2.8"/><path d="M6 6V4.5M18 6V4.5"/>',
  key: '<circle cx="7.5" cy="15.5" r="4.5"/><path d="m10.8 12.2 9.2-9.2M16 4l3 3M18 8l2-2"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5.5l3.5 2"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2.5"/><path d="m3 6 9 7 9-7"/>',
  chevronRight: '<path d="m9 5 7 7-7 7"/>',
  star: '<path d="m12 2.5 3.1 6.3 6.9 1-5 4.9 1.2 6.9L12 18.3l-6.2 3.3 1.2-6.9-5-4.9 6.9-1z"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
  trash: '<path d="M3 6h18M8 6V4h8v2M19 6l-1 15H6L5 6M10 11v6M14 11v6"/>',
  download: '<path d="M12 3v12M7 11l5 5 5-5M4 21h16"/>',
  eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>',
  alert: '<path d="M12 3 2 21h20z"/><path d="M12 9v5M12 17.5v.5"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
  whatsapp: '<path fill="currentColor" stroke="none" d="M17.5 14.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49 0 1.47 1.07 2.89 1.22 3.09.15.2 2.11 3.22 5.1 4.51.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.57-.09 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.78-1.31l-.34-.2-3.56.93.95-3.47-.22-.36a9.4 9.4 0 0 1-1.44-5.01c0-5.2 4.23-9.43 9.44-9.43a9.37 9.37 0 0 1 6.67 2.77 9.37 9.37 0 0 1 2.76 6.68c0 5.2-4.24 9.43-9.44 9.43m8.02-17.45A11.3 11.3 0 0 0 12.04.75C5.8.75.7 5.84.7 12.08c0 2 .52 3.95 1.51 5.67L.6 23.63l5.99-1.57a11.3 11.3 0 0 0 5.44 1.38h.01c6.24 0 11.34-5.09 11.34-11.34 0-3.03-1.18-5.87-3.32-8.01"/>',
  facebook: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
  instagram: '<rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8"/>',
  tiktok: '<path d="M9 12a4 4 0 1 0 4 4V4c.6 2.4 2.2 4.3 5 4.7"/>',
  car: '<path d="M4 17h16M3.2 12.2 5 7.4A2 2 0 0 1 6.9 6h10.2A2 2 0 0 1 19 7.4l1.8 4.8"/><path d="M3 12.2h18v4.3a1.2 1.2 0 0 1-1.2 1.2h-1.1a2.1 2.1 0 0 1-4.2 0H9.5a2.1 2.1 0 0 1-4.2 0H4.2A1.2 1.2 0 0 1 3 16.5z"/>'
};

function icon(name, cls) {
  const p = ICONS[name] || ICONS.arrowRight;
  return `<svg class="${cls || ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
}

/* ---------- Helpers ---------- */
const $ = (s, c) => (c || document).querySelector(s);
const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));

function fmtPrice(n) {
  return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}
function fmtPriceShort(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(n % 1000000 ? 1 : 0).replace('.', ',') + ' M';
  return fmtPrice(n) + ' k';
}
const STATUS_LABEL = {
  disponible: { txt: 'Disponible', cls: 'badge--ok' },
  reserve:    { txt: 'Réservé',    cls: 'badge--warn' },
  vendu:      { txt: 'Vendu',      cls: 'badge--out' }
};
const BADGE_LABEL = {
  'Nouveauté': 'Nouveauté',
  'Coup de cœur': 'Coup de cœur',
  'Bon plan': 'Bon plan',
  'Petit budget': 'Petit budget'
};
function escapeHtml(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
}
function initials(name) {
  return String(name || '?').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}
function currentPage() {
  const p = location.pathname.split('/').pop() || 'index.html';
  return p;
}
function qs(name) {
  return new URLSearchParams(location.search).get(name) || '';
}

/* ---------- WhatsApp ---------- */
function waHref(phoneRaw) {
  const number = String(phoneRaw || '').replace(/\D/g, '');
  return `https://wa.me/${number || SITE.whatsapp}`;
}
function waLink(text) {
  const msg = encodeURIComponent(text || SITE.whatsappMessage);
  return `https://wa.me/${SITE.whatsapp}?text=${msg}`;
}
async function shareVehicleOnWhatsApp(vehicleId) {
  const v = VEHICLES.find(item => item.id === vehicleId);
  if (!v) return;
  const imageUrl = v.image ? new URL(v.image, location.href).href : '';
  const detailUrl = new URL(`vehicule.html?id=${encodeURIComponent(v.id)}`, location.href).href;
  const text = `Bonjour ${SITE.name}, je suis intéressé(e) par le ${v.brand} ${v.model} ${v.year}, affiché à ${fmtPrice(v.price)} FCFA (réf. ${v.id}). Voici la photo et la fiche du véhicule.`;
  const fallbackText = `${text}\nFiche : ${detailUrl}${imageUrl ? `\nPhoto : ${imageUrl}` : ''}`;
  try {
    if (imageUrl && navigator.share && navigator.canShare) {
      const response = await fetch(imageUrl);
      if (!response.ok) throw new Error('Photo inaccessible');
      const blob = await response.blob();
      if (!blob.type.startsWith('image/')) throw new Error('Le fichier n’est pas une image');
      const ext = blob.type.includes('png') ? 'png' : blob.type.includes('webp') ? 'webp' : 'jpg';
      const file = new File([blob], `${String(v.brand+'-'+v.model).toLowerCase().replace(/[^a-z0-9]+/g,'-')}.${ext}`, {type:blob.type});
      if (navigator.canShare({files:[file]})) {
        await navigator.share({files:[file], title:`${v.brand} ${v.model} — IG-MOTORS`, text});
        return;
      }
    }
  } catch (error) {
    if (error?.name === 'AbortError') return;
    console.warn('Partage de la photo indisponible ; ouverture WhatsApp avec le lien.', error);
  }
  location.href = waLink(fallbackText);
}

/* ============================================================
   HEADER + FOOTER
   ============================================================ */
function renderHeader() {
  const host = $('#site-header');
  if (!host) return;
  const page = currentPage();
  const isHome = page === '' || page === 'index.html';

  const links = NAV.map(n => {
    const on = page === n.href ? ' class="on"' : '';
    return `<a href="${n.href}"${on}>${n.label}</a>`;
  }).join('');

  const mobileLinks = NAV.map(n => `<a href="${n.href}">${n.label}${icon('chevronRight')}</a>`).join('');

  host.innerHTML = `
    <header class="hdr ${isHome ? '' : 'is-solid'}" id="hdr">
      <div class="wrap hdr__in">
        <a class="brand" href="index.html" aria-label="${SITE.name} — Accueil">
          <span class="brand__mark">IG</span>
          <span class="brand__txt">${SITE.name}<small>${SITE.tagline}</small></span>
        </a>
        <nav class="nav" aria-label="Navigation principale">${links}</nav>
        <div class="hdr__act">
          <a class="hdr__tel" href="${waHref(SITE.phoneRaw)}" target="_blank" rel="noopener" aria-label="Écrire sur WhatsApp au ${SITE.phone}">
            ${icon('whatsapp')}
            <span><em>WhatsApp</em>${SITE.phone}</span>
          </a>
          <a class="btn btn--gold btn--sm" href="catalogue.html">Voir le stock</a>
          <button class="burger" id="burger" aria-label="Ouvrir le menu" aria-expanded="false"><span></span></button>
        </div>
      </div>
    </header>
    <div class="mmenu" id="mmenu">
      ${mobileLinks}
      <div class="mmenu__foot">
        <a class="tel" href="${waHref(SITE.phoneRaw)}" target="_blank" rel="noopener">${icon('whatsapp')} ${SITE.phone}</a>
        <a class="btn btn--gold" href="${waLink()}">${icon('whatsapp')} Discuter sur WhatsApp</a>
      </div>
    </div>`;

  const hdr = $('#hdr');
  const burger = $('#burger');
  const menu = $('#mmenu');

  if (burger && menu) {
    const toggle = (force) => {
      const on = force !== undefined ? force : !menu.classList.contains('on');
      menu.classList.toggle('on', on);
      burger.classList.toggle('on', on);
      burger.setAttribute('aria-expanded', String(on));
      document.body.style.overflow = on ? 'hidden' : '';
    };
    burger.addEventListener('click', () => toggle());
    menu.addEventListener('click', e => { if (e.target.closest('a')) toggle(false); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') toggle(false); });
  }

  if (isHome) {
    const onScroll = () => hdr.classList.toggle('is-solid', window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }
}

function renderFooter() {
  const host = $('#site-footer');
  if (!host) return;
  const y = new Date().getFullYear();
  host.innerHTML = `
    <footer class="footer">
      <div class="wrap">
        <div class="footer__grid">
          <div class="footer__brand">
            <a class="brand" href="index.html">
              <span class="brand__mark">IG</span>
              <span class="brand__txt">${SITE.name}<small>${SITE.tagline}</small></span>
            </a>
            <p>IG-MOTORS à ${SITE.addressFull}. Parcourez les annonces, proposez votre véhicule à la reprise ou contactez l’équipe pour confirmer les informations.</p>
            <div class="footer__social">
              ${SITE.social.facebook ? `<a href="${SITE.social.facebook}" aria-label="Facebook" target="_blank" rel="noopener">${icon('facebook')}</a>` : ''}
              ${SITE.social.instagram ? `<a href="${SITE.social.instagram}" aria-label="Instagram" target="_blank" rel="noopener">${icon('instagram')}</a>` : ''}
              ${SITE.social.tiktok ? `<a href="${SITE.social.tiktok}" aria-label="TikTok" target="_blank" rel="noopener">${icon('tiktok')}</a>` : ''}
              ${SITE.social.whatsapp ? `<a href="${SITE.social.whatsapp}" aria-label="WhatsApp" target="_blank" rel="noopener">${icon('whatsapp')}</a>` : ''}
            </div>
          </div>
          <div>
            <h5>Navigation</h5>
            <ul>${NAV.map(n => `<li><a href="${n.href}">${n.label}</a></li>`).join('')}</ul>
          </div>
          <div>
            <h5>Véhicules</h5>
            <ul>${TYPES.map(t => `<li><a href="catalogue.html?type=${encodeURIComponent(t.key)}">${t.label}</a></li>`).join('')}</ul>
          </div>
          <div>
            <h5>Contact · ${SITE.owner || SITE.name}</h5>
            <ul class="footer__contact">
              <li>${icon('pin')}<span>${SITE.addressFull}</span></li>
              <li>${icon('whatsapp')}<a href="${waHref(SITE.phoneRaw)}" target="_blank" rel="noopener">${SITE.phone}</a></li>
              ${SITE.phone2 ? `<li>${icon('whatsapp')}<a href="${waHref(SITE.phone2Raw || SITE.phone2)}" target="_blank" rel="noopener">${SITE.phone2}</a></li>` : ''}
              ${SITE.email ? `<li>${icon('mail')}<a href="mailto:${SITE.email}">${SITE.email}</a></li>` : ''}
              <li>${icon('clock')}<span>${SITE.hours}</span></li>
            </ul>
          </div>
        </div>
        <div class="footer__bar">
          <span>© ${y} ${SITE.name} — Tous droits réservés.</span>
          <span>Conçu pour rouler serein · ${SITE.city}, ${SITE.country}</span>
        </div>
      </div>
    </footer>`;
}

/* ============================================================
   CARTES VÉHICULES
   ============================================================ */
function vehicleCard(v) {
  const st = STATUS_LABEL[v.status] || STATUS_LABEL.disponible;
  const badges = [];
  if (v.badge) badges.push(`<span class="badge">${escapeHtml(v.badge)}</span>`);
  if (v.status && v.status !== 'disponible') badges.push(`<span class="badge ${st.cls}">${st.txt}</span>`);

  return `
  <article class="vcard">
    <a class="vcard__media" href="vehicule.html?id=${encodeURIComponent(v.id)}" aria-label="${escapeHtml(v.brand + ' ' + v.model)}">
      <img src="${v.image}" alt="${escapeHtml(v.brand + ' ' + v.model + ' ' + v.year)}" loading="lazy">
      <div class="vcard__badges">${badges.join('')}</div>
    </a>
    <div class="vcard__body">
      <div>
        <div class="vcard__title"><b>${escapeHtml(v.brand)} ${escapeHtml(v.model)}</b><span>${v.year}</span></div>
        <div class="vcard__version">${escapeHtml(v.version || '')}</div>
      </div>
      <div class="specs">
        <span class="spec">${icon('gauge')}${escapeHtml(v.mileage)}</span>
        <span class="spec">${icon('fuel')}${escapeHtml(v.fuel)}</span>
        <span class="spec">${icon('gearbox')}${escapeHtml(v.gearbox)}</span>
      </div>
      <div class="vcard__foot">
        <div class="price">${fmtPrice(v.price)} <small>FCFA</small></div>
        <a class="vcard__go" href="vehicule.html?id=${encodeURIComponent(v.id)}" aria-label="Voir la fiche">${icon('arrowRight')}</a>
      </div>
      <button class="vcard__share" type="button" data-share-vehicle="${escapeHtml(v.id)}">${icon('whatsapp')} Envoyer photo sur WhatsApp</button>
    </div>
  </article>`;
}

/* ============================================================
   BLOCS COMMUNS À TOUTES LES PAGES
   ============================================================ */
function renderStats() {
  const stats = $('#stats');
  if (stats) stats.innerHTML = STATS.map(s => `<div class="stat"><b>${s.value}</b><span>${s.label}</span></div>`).join('');
}

function renderMarquee() {
  const mq = $('#marquee');
  if (!mq) return;
  const items = BRANDS.map(b => `<span>${escapeHtml(b)}</span>`).join('');
  mq.innerHTML = `<div class="marquee__track">${items}${items}</div>`;
}

/* ============================================================
   PAGE D'ACCUEIL
   ============================================================ */
function renderHome() {
  const body = document.body;
  if (!body.dataset.page || body.dataset.page !== 'home') return;

  /* --- engagements --- */
  const feats = $('#feats');
  if (feats) {
    feats.innerHTML = SERVICES.map(s => `
      <div class="feat">
        <div class="feat__ico">${icon(s.icon)}</div>
        <h3>${escapeHtml(s.title)}</h3>
        <p>${escapeHtml(s.text)}</p>
      </div>`).join('');
  }

  /* --- véhicules à la une --- */
  const featsGrid = $('#featured');
  if (featsGrid) {
    const list = VEHICLES.filter(v => v.featured).slice(0, 6);
    featsGrid.innerHTML = (list.length ? list : VEHICLES.slice(0, 6)).map(vehicleCard).join('');
  }

  /* --- types --- */
  const types = $('#types');
  if (types) {
    types.innerHTML = TYPES.map(t => {
      const sample = VEHICLES.find(v => v.type === t.key);
      const count = VEHICLES.filter(v => v.type === t.key).length;
      const bg = sample ? sample.image : 'assets/img/hero.jpg';
      return `
        <a class="type" href="catalogue.html?type=${encodeURIComponent(t.key)}">
          <div class="type__bg" style="background-image:url('${bg}')"></div>
          <div class="type__veil"></div>
          <span class="type__arrow">${icon('arrowRight')}</span>
          <div class="type__in">
            <b>${t.label}</b>
            <span>${count} véhicule${count > 1 ? 's' : ''} · ${t.desc}</span>
          </div>
        </a>`;
    }).join('');
  }

  /* --- témoignages --- */
  const quotes = $('#quotes');
  if (quotes) {
    quotes.innerHTML = TESTIMONIALS.map(t => `
      <figure class="quote">
        <div class="quote__stars">${icon('star').repeat(5)}</div>
        <p>« ${escapeHtml(t.text)} »</p>
        <figcaption class="quote__who">
          <span class="quote__av">${initials(t.name)}</span>
          <div><b>${escapeHtml(t.name)}</b><span>${escapeHtml(t.role)}</span></div>
        </figcaption>
      </figure>`).join('');
  }

  /* --- recherche rapide --- */
  const form = $('#quicksearch');
  if (form) {
    const brandSel = form.querySelector('[name=brand]');
    if (brandSel) {
      const stockBrands = VEHICLES.map(v => v.brand);
      const requestedBrands = ['Toyota', 'Nissan', 'Lexus', 'Mercedes-Benz', 'BMW', 'Honda', 'Hyundai', 'Kia', 'Ford', 'Peugeot', 'Audi', 'Volkswagen'];
      const brands = [...new Set([...stockBrands, ...requestedBrands])].sort((a, b) => a.localeCompare(b, 'fr'));
      const models = ['Venza', 'Nissan Almera', 'Corolla', 'Avensis'];
      const previousChoice = brandSel.value;
      brandSel.innerHTML = `<option value="">Toutes les marques / modèles</option>` +
        `<optgroup label="Marques">${brands.map(b => `<option value="brand:${escapeHtml(b)}">${escapeHtml(b === 'Lexus' ? 'Lexus — toutes catégories' : b)}</option>`).join('')}</optgroup>` +
        `<optgroup label="Modèles recherchés">${models.map(m => `<option value="model:${escapeHtml(m)}">${escapeHtml(m)}</option>`).join('')}</optgroup>`;
      brandSel.value = previousChoice;
    }
    if (!form.dataset.quicksearchBound) {
      form.dataset.quicksearchBound = '1';
      form.addEventListener('submit', e => {
        e.preventDefault();
        const d = new FormData(form);
        const p = new URLSearchParams();
        if (d.get('type')) p.set('type', d.get('type'));
        const choice = d.get('brand') || '';
        if (choice.startsWith('brand:')) p.set('brand', choice.slice(6));
        else if (choice.startsWith('model:')) p.set('q', choice.slice(6));
        const budget = form.querySelector('[name=budget]');
        const selectedBudget = budget && budget.selectedOptions[0];
        if (selectedBudget && selectedBudget.value) {
          const min = selectedBudget.dataset.min;
          if (min) p.set('min', min);
          if (!selectedBudget.value.endsWith('+')) p.set('max', selectedBudget.value);
        }
        location.href = 'catalogue.html' + (p.toString() ? '?' + p.toString() : '');
      });
    }
  }
}

/* ============================================================
   CATALOGUE
   ============================================================ */
function renderCatalogue() {
  const grid = $('#grid');
  if (!grid) return;

  /* --- selects --- */
  const brandSel = $('#f-brand');
  const typeSel = $('#f-type');
  const fuelSel = $('#f-fuel');
  const maxSel = $('#f-max');
  const sortSel = $('#f-sort');
  const search = $('#f-search');

  const brands = [...new Set([...VEHICLES.map(v => v.brand), 'Toyota', 'Nissan', 'Lexus', 'Mercedes-Benz', 'BMW', 'Honda', 'Hyundai', 'Kia', 'Ford', 'Peugeot', 'Audi', 'Volkswagen'])].sort((a, b) => a.localeCompare(b, 'fr'));
  const types = TYPES.map(t => t.key);
  const fuels = [...new Set(VEHICLES.map(v => v.fuel))];

  if (brandSel) brandSel.innerHTML = `<option value="">Toutes marques</option>` + brands.map(b => `<option>${escapeHtml(b)}</option>`).join('');
  if (typeSel) typeSel.innerHTML = `<option value="">Tous types</option>` + types.map(t => `<option>${escapeHtml(t)}</option>`).join('');
  if (fuelSel) fuelSel.innerHTML = `<option value="">Tous carburants</option>` + fuels.map(f => `<option>${escapeHtml(f)}</option>`).join('');
  if (maxSel) maxSel.innerHTML = `
    <option value="">Tous budgets · dès 1,5 M</option>
    <option value="5000000" data-min="1500000">1,5 à 5 M FCFA</option>
    <option value="10000000" data-min="5000000">5 à 10 M FCFA</option>
    <option value="15000000" data-min="10000000">10 à 15 M FCFA</option>
    <option value="25000000" data-min="15000000">15 à 25 M FCFA</option>
    <option value="40000000" data-min="25000000">25 à 40 M FCFA</option>
    <option value="60000000" data-min="40000000">40 à 60 M FCFA</option>
    <option value="60000000+" data-min="60000000">60 M FCFA et plus</option>`;

  /* --- état initial depuis l'URL --- */
  const state = window.__IG_CATALOGUE_STATE || (window.__IG_CATALOGUE_STATE = {
    type: qs('type') || '',
    brand: qs('brand') || '',
    fuel: qs('fuel') || '',
    min: qs('min') || '',
    max: qs('max') || '',
    q: qs('q') || '',
    sort: qs('sort') || 'featured'
  });
  if (brandSel) brandSel.value = state.brand;
  if (typeSel) typeSel.value = state.type;
  if (fuelSel) fuelSel.value = state.fuel;
  if (maxSel) maxSel.value = state.min === '60000000' && !state.max ? '60000000+' : state.max;
  if (search) search.value = state.q;
  if (sortSel) sortSel.value = state.sort;

  /* --- chips de type --- */
  const chipWrap = $('#chips');
  function renderChips() {
    if (!chipWrap) return;
    const items = [{ key: '', label: 'Tout' }].concat(TYPES.map(t => ({ key: t.key, label: t.label })));
    chipWrap.innerHTML = items.map(t => {
      const count = t.key ? VEHICLES.filter(v => v.type === t.key).length : VEHICLES.length;
      const on = state.type === t.key ? ' on' : '';
      return `<button class="chip${on}" data-type="${t.key}">${t.label}<small>${count}</small></button>`;
    }).join('');
  }
  renderChips();

  if (chipWrap && !chipWrap.dataset.bound) {
    chipWrap.dataset.bound = '1';
    chipWrap.addEventListener('click', e => {
      const b = e.target.closest('.chip');
      if (!b) return;
      state.type = b.dataset.type;
      renderChips();
      renderGrid();
    });
  }

  /* --- tri / filtres --- */
  [brandSel, typeSel, fuelSel, maxSel, sortSel].forEach(el => {
    if (!el || el.dataset.filterBound) return;
    el.dataset.filterBound = '1';
    el.addEventListener('change', () => {
      state.brand = brandSel ? brandSel.value : '';
      state.type = typeSel ? typeSel.value : state.type;
      state.fuel = fuelSel ? fuelSel.value : '';
      if (maxSel) {
        const selectedBudget = maxSel.selectedOptions[0];
        state.min = selectedBudget?.dataset.min || '';
        state.max = selectedBudget && !selectedBudget.value.endsWith('+') ? selectedBudget.value : '';
      }
      state.sort = sortSel ? sortSel.value : 'featured';
      renderChips();
      renderGrid();
    });
  });

  if (search && !search.dataset.filterBound) {
    search.dataset.filterBound = '1';
    let t;
    search.addEventListener('input', () => {
      clearTimeout(t);
      t = setTimeout(() => { state.q = search.value.trim(); renderGrid(); }, 180);
    });
  }

  /* --- affichage --- */
  const countEl = $('#count');

  function renderGrid() {
    let list = VEHICLES.slice();

    if (state.type) list = list.filter(v => v.type === state.type);
    if (state.brand) list = list.filter(v => v.brand === state.brand);
    if (state.fuel) list = list.filter(v => v.fuel === state.fuel);
    if (state.min) list = list.filter(v => v.price >= Number(state.min));
    if (state.max) list = list.filter(v => v.price <= Number(state.max));
    if (state.q) {
      const q = state.q.toLowerCase();
      list = list.filter(v =>
        [v.brand, v.model, v.version, v.year, v.type, v.color].join(' ').toLowerCase().includes(q));
    }

    const sorters = {
      featured: (a, b) => (b.featured - a.featured) || (b.year - a.year),
      priceAsc: (a, b) => a.price - b.price,
      priceDesc: (a, b) => b.price - a.price,
      yearDesc: (a, b) => b.year - a.year,
      mileage: (a, b) => parseInt(a.mileage) - parseInt(b.mileage)
    };
    list.sort(sorters[state.sort] || sorters.featured);

    if (countEl) {
      countEl.innerHTML = `<b>${list.length}</b> véhicule${list.length > 1 ? 's' : ''} trouvé${list.length > 1 ? 's' : ''}`;
    }

    if (!list.length) {
      grid.innerHTML = `
        <div class="empty">
          ${icon('search')}
          <h3>Aucun véhicule ne correspond</h3>
          <p>Essayez d'élargir vos critères ou contactez-nous : nous trouvons le véhicule pour vous.</p>
          <a class="btn btn--gold" href="${waLink('Bonjour IG-MOTORS, je recherche un véhicule précis.')}">${icon('whatsapp')} Faire une demande</a>
        </div>`;
      return;
    }
    grid.innerHTML = list.map(vehicleCard).join('');
  }

  renderGrid();

  /* --- bouton reset --- */
  const reset = $('#f-reset');
  reset && reset.addEventListener('click', () => {
    state.type = state.brand = state.fuel = state.min = state.max = state.q = '';
    if (brandSel) brandSel.value = '';
    if (typeSel) typeSel.value = '';
    if (fuelSel) fuelSel.value = '';
    if (maxSel) maxSel.value = '';
    if (search) search.value = '';
    renderChips();
    renderGrid();
  });
}

/* ============================================================
   FICHE VÉHICULE
   ============================================================ */
function renderVehicle() {
  const wrap = $('#vehicle');
  if (!wrap) return;

  const v = VEHICLES.find(x => x.id === qs('id'));
  if (!v) {
    wrap.innerHTML = `
      <div class="wrap" style="padding:160px 24px 80px">
        <div class="empty">
          ${icon('alert')}
          <h3>Véhicule introuvable</h3>
          <p>Ce véhicule n'est plus disponible ou le lien est incorrect.</p>
          <a class="btn btn--gold" href="catalogue.html">Voir tout le stock</a>
        </div>
      </div>`;
    return;
  }

  document.title = `${v.brand} ${v.model} ${v.year} — ${SITE.name}`;

  const st = STATUS_LABEL[v.status] || STATUS_LABEL.disponible;
  const badges = [];
  if (v.badge) badges.push(`<span class="badge">${escapeHtml(v.badge)}</span>`);
  badges.push(`<span class="badge ${st.cls}">${st.txt}</span>`);

  const gallery = (GALLERIES[v.id] && GALLERIES[v.id].length ? GALLERIES[v.id] : [v.image]);
  const thumbs = gallery.length > 1
    ? `<div class="thumbs">${gallery.map((g, i) => `<button data-src="${g}" class="${i === 0 ? 'on' : ''}"><img src="${g}" alt="" loading="lazy"></button>`).join('')}</div>`
    : '';

  let similar = VEHICLES.filter(x => x.id !== v.id && x.type === v.type).slice(0, 3);
  if (!similar.length) similar = VEHICLES.filter(x => x.id !== v.id).slice(0, 3);
  const similarHtml = similar.length ? similar.map(vehicleCard).join('') : '';

  wrap.innerHTML = `
    <div class="wrap">
      <div class="vhead">
        <div class="gallery">
          <div class="gallery__main">
            <img id="gal-main" src="${gallery[0]}" alt="${escapeHtml(v.brand + ' ' + v.model)}">
            <div class="gallery__badges">${badges.join('')}</div>
            <div class="gallery__count">${gallery.length} photo${gallery.length > 1 ? 's' : ''}</div>
          </div>
          ${thumbs}
        </div>

        <div class="vinfo">
          <div class="vinfo__card">
            <span class="eyebrow">${escapeHtml(v.type)} · ${escapeHtml(v.fuel)}</span>
            <h1>${escapeHtml(v.brand)} ${escapeHtml(v.model)}</h1>
            <div class="vinfo__sub">${escapeHtml(v.version)} · ${v.year} · ${escapeHtml(v.color)}</div>
            <div class="vinfo__price">
              <b>${fmtPrice(v.price)}</b><span>FCFA</span>
            </div>
            <div class="vinfo__note">Annonce de présentation · Confirmez le prix, l’état, les documents et la disponibilité</div>

            <div class="vinfo__actions">
              <button class="btn btn--gold btn--block" type="button" data-share-vehicle="${escapeHtml(v.id)}">
                ${icon('whatsapp')} Envoyer la photo et le message
              </button>
              <a class="btn btn--line btn--block" href="${waLink(`Bonjour IG-MOTORS, je souhaite des informations sur ${v.brand} ${v.model}.`)}" target="_blank" rel="noopener">
                ${icon('whatsapp')} Écrire sans la photo
              </a>
            </div>
          </div>

          <div class="vinfo__card vinfo__card--dark">
            <h4>À confirmer avant achat</h4>
            <div style="display:grid;gap:11px;margin-top:12px">
              <div class="contactrow">${icon('shield')} État détaillé du véhicule</div>
              <div class="contactrow">${icon('doc')} Pièces et historique disponibles</div>
              <div class="contactrow">${icon('cash')} Prix final et modalités</div>
              <div class="contactrow">${icon('pin')} Rendez-vous à Godomey</div>
            </div>
            <a class="btn btn--ghost btn--sm btn--block" style="margin-top:18px" href="contact.html">Poser une question</a>
          </div>
        </div>
      </div>

      <div class="vsection">
        <div class="vsection__in">
          <div>
            <h2>Caractéristiques</h2>
            <div class="specgrid">
              <div class="specitem">${icon('calendar')}<div><span>Année-modèle</span><b>${v.year}</b></div></div>
              <div class="specitem">${icon('gauge')}<div><span>Kilométrage</span><b>${escapeHtml(v.mileage)}</b></div></div>
              <div class="specitem">${icon('fuel')}<div><span>Carburant</span><b>${escapeHtml(v.fuel)}</b></div></div>
              <div class="specitem">${icon('gearbox')}<div><span>Boîte</span><b>${escapeHtml(v.gearbox)}</b></div></div>
              <div class="specitem">${icon('gauge')}<div><span>Puissance</span><b>${escapeHtml(v.power)}</b></div></div>
              <div class="specitem">${icon('doc')}<div><span>Places</span><b>${v.seats} places</b></div></div>
              <div class="specitem">${icon('pin')}<div><span>Couleur</span><b>${escapeHtml(v.color)}</b></div></div>
              <div class="specitem">${icon('shield')}<div><span>Statut</span><b>${st.txt}</b></div></div>
            </div>
          </div>
          <aside class="asidecard">
            <h4>Organisez une visite</h4>
            <p>Contactez IG-MOTORS pour confirmer la disponibilité, l’adresse et l’horaire de visite à ${SITE.addressFull}.</p>
            <a class="btn btn--gold btn--block" href="${waLink('Bonjour, je souhaite réserver un essai pour ' + v.brand + ' ' + v.model + '.')}">${icon('whatsapp')} Réserver un essai</a>
            <hr>
            <div class="hours"><span>Visite</span><b>Sur confirmation</b></div>
          </aside>
        </div>
      </div>

      <div class="vsection">
        <div class="vsection__in">
          <div>
            <h2>Présentation</h2>
            <p>${escapeHtml(v.description)}</p>
            <div class="tags">${(v.features || []).map(f => `<span class="tag">${escapeHtml(f)}</span>`).join('')}</div>
          </div>
          <aside class="asidecard">
            <h4>Prix et modalités</h4>
            <p>Confirmez le prix final et les modalités de paiement directement avec IG-MOTORS avant de vous engager.</p>
            <a class="btn btn--light btn--block" href="services.html">Voir les étapes d’achat</a>
          </aside>
        </div>
      </div>

      ${similarHtml ? `
      <div class="vsection">
        <div class="section-head">
          <div>
            <span class="eyebrow">Dans la même catégorie</span>
            <h2 class="h2">Véhicules similaires</h2>
          </div>
          <a class="link-arrow" href="catalogue.html${similar.length && similar[0].type === v.type ? '?type=' + encodeURIComponent(v.type) : ''}">Tout voir ${icon('arrowRight')}</a>
        </div>
        <div class="cards">${similarHtml}</div>
      </div>` : ''}
    </div>`;

  /* --- galerie --- */
  const main = $('#gal-main');
  $$('.thumbs button', wrap).forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.thumbs button', wrap).forEach(b => b.classList.remove('on'));
      btn.classList.add('on');
      main.src = btn.dataset.src;
      main.alt = v.brand + ' ' + v.model;
    });
  });
}

/* ============================================================
   PAGE SERVICES
   ============================================================ */
function renderServices() {
  const svc = $('#service-list');
  if (svc) {
    const list = (typeof SERVICES_PAGE !== 'undefined' && SERVICES_PAGE.length) ? SERVICES_PAGE : SERVICES;
    svc.innerHTML = list.map(s => `
      <div class="feat">
        <div class="feat__ico">${icon(s.icon)}</div>
        <h3>${escapeHtml(s.title)}</h3>
        <p>${escapeHtml(s.text)}</p>
      </div>`).join('');
  }

  const steps = $('#steps');
  if (steps) {
    steps.innerHTML = STEPS.map((s, i) => `
      <div class="step">
        <span class="step__num">ÉTAPE 0${i + 1}</span>
        <h4>${escapeHtml(s.title)}</h4>
        <p>${escapeHtml(s.text)}</p>
      </div>`).join('');
  }

  const faq = $('#faq');
  if (faq) {
    faq.innerHTML = FAQ.map(f => `
      <details style="border-bottom:1px solid rgba(10,14,20,.1);padding:18px 0">
        <summary style="cursor:pointer;font-weight:800;font-size:15.5px;list-style:none;display:flex;justify-content:space-between;gap:16px;align-items:center">
          ${escapeHtml(f.q)}<span style="color:var(--gold-3)">${icon('chevronRight')}</span>
        </summary>
        <p style="color:var(--muted);font-size:14px;line-height:1.8;margin-top:12px;max-width:75ch">${escapeHtml(f.a)}</p>
      </details>`).join('');
  }

  const svcCount = $('#svc-count');
  if (svcCount) svcCount.textContent = SERVICES.length;
}

/* ============================================================
   FORMULAIRES → WHATSAPP
   ============================================================ */
function bindForm(formId, buildMessage) {
  const form = document.getElementById(formId);
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const msg = buildMessage(new FormData(form));
    if (!msg) return;
    window.open(waLink(msg), '_blank');
    toast('Message prêt — vous allez être redirigé vers WhatsApp');
    form.reset();
  });
}

function toast(text) {
  let el = document.querySelector('.toast');
  if (!el) {
    el = document.createElement('div');
    el.className = 'toast';
    document.body.appendChild(el);
  }
  el.innerHTML = icon('check') + `<span>${escapeHtml(text)}</span>`;
  requestAnimationFrame(() => el.classList.add('on'));
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove('on'), 4200);
}

/* ============================================================
   CONTACT
   ============================================================ */
function renderContact() {
  const cards = $('#contact-cards');
  if (cards) {
    const items = [
      { icon: 'whatsapp', title: 'WhatsApp principal', text: SITE.phone, href: waHref(SITE.phoneRaw) },
      ...(SITE.email ? [{ icon: 'mail', title: 'E-mail', text: SITE.email, href: 'mailto:' + SITE.email }] : []),
      { icon: 'pin', title: 'Showroom · Godomey', text: SITE.addressFull, href: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(SITE.addressFull) }
    ];
    cards.innerHTML = items.map(i => `
      <div class="infocard">
        <div class="infocard__ico">${icon(i.icon)}</div>
        <h3>${i.title}</h3>
        ${i.href ? `<a href="${i.href}" ${i.href.indexOf('http') === 0 ? 'target="_blank" rel="noopener"' : ''}>${escapeHtml(i.text)}</a>` : `<p>${escapeHtml(i.text)}</p>`}
      </div>`).join('');
  }

  const addr = $('#address-line');
  if (addr) addr.textContent = SITE.addressFull;
  const owner = $('#owner-line');
  if (owner) owner.textContent = 'Propriétaire : ' + (SITE.owner || 'IG-MOTORS');

  // Contact secondaire, s'il est renseigné.
  if (cards && SITE.phone2) {
    const extra = document.createElement('div');
    extra.className = 'infocard';
    extra.innerHTML = `<div class="infocard__ico">${icon('whatsapp')}</div><h3>WhatsApp secondaire</h3><a href="${waHref(SITE.phone2Raw || SITE.phone2)}" target="_blank" rel="noopener">${escapeHtml(SITE.phone2)}</a>`;
    cards.appendChild(extra);
  }

  $$('a[href="https://wa.me/2290167648684"]').forEach(a => a.href = SITE.social.whatsapp);

  bindForm('contact-form', fd => {
    const nom = (fd.get('name') || '').trim();
    const tel = (fd.get('phone') || '').trim();
    const sujet = fd.get('subject') || 'Demande d\'information';
    const msg = (fd.get('message') || '').trim();
    if (!nom || !tel) { toast('Merci d\'indiquer votre nom et votre téléphone'); return null; }
    return `Bonjour ${SITE.name},\n\nNom : ${nom}\nTéléphone : ${tel}\nSujet : ${sujet}\n\nMessage :\n${msg}`;
  });

  bindForm('reprise-form', fd => {
    const nom = (fd.get('name') || '').trim();
    const tel = (fd.get('phone') || '').trim();
    const veh = (fd.get('vehicle') || '').trim();
    const annee = fd.get('year') || '';
    if (!nom || !tel || !veh) { toast('Merci de remplir les champs obligatoires'); return null; }
    return `Bonjour ${SITE.name}, je souhaite faire estimer mon véhicule.\n\n${veh} ${annee}\nNom : ${nom}\nTéléphone : ${tel}`;
  });
}

/* ============================================================
   PRÉVISUALISATION DES MODIFICATIONS FAITES DANS admin.html
   (les changements sont stockés dans le navigateur)
   ============================================================ */
function applyLocalOverride() {
  let raw;
  try { raw = localStorage.getItem('igmotors_admin_v1'); } catch (e) { return; }
  if (!raw) return;
  let s;
  try { s = JSON.parse(raw); } catch (e) { return; }

  if (s.site && typeof s.site === 'object') Object.assign(SITE, s.site);
  if (!SITE.email) SITE.email = 'igmotors6@gmail.com';
  // Migration depuis les anciennes coordonnées temporaires.
  if (SITE.phoneRaw === '+22901000000') { SITE.phone = '+229 01 67 64 86 84'; SITE.phoneRaw = '+2290167648684'; SITE.whatsapp = '2290167648684'; }
  if (!SITE.owner) SITE.owner = 'LISSANON Igor';
  if (!SITE.phone2) { SITE.phone2 = '+229 01 97 57 35 70'; SITE.phone2Raw = '+2290197573570'; }
  if (SITE.email === 'contact@ig-motors.bj') SITE.email = '';
  if (['Avenue de la Marina, Cotonou, Bénin','Cotonou, Bénin'].includes(SITE.addressFull)) SITE.addressFull = 'Godomey, non loin du CEG Godomey, Bénin';
  if (SITE.address === 'Cotonou, Bénin') SITE.address = 'Godomey, Bénin';
  if (SITE.city === 'Cotonou') SITE.city = 'Godomey';
  if (SITE.hours === 'Lundi – Samedi : 8h00 – 18h00') SITE.hours = 'Horaires à confirmer par WhatsApp';
  if (SITE.hoursShort === 'Lun – Sam · 8h – 18h') SITE.hoursShort = 'Visites sur confirmation';
  if (SITE.social) {
    if (SITE.social.whatsapp === 'https://wa.me/22901000000') SITE.social.whatsapp = 'https://wa.me/2290167648684';
    if (SITE.social.facebook === 'https://facebook.com/') SITE.social.facebook = '';
    if (SITE.social.instagram === 'https://instagram.com/') SITE.social.instagram = '';
    if (SITE.social.tiktok === 'https://tiktok.com/') SITE.social.tiktok = '';
  }
  if (Array.isArray(s.vehicles)) VEHICLES.splice(0, VEHICLES.length, ...s.vehicles);
  if (Array.isArray(s.stats)) {
    const oldFakeStats = s.stats.some(x => ['12+','850','40+','100%'].includes(x.value));
    if (!oldFakeStats) STATS.splice(0, STATS.length, ...s.stats);
  }
  if (Array.isArray(s.services) && !s.services.some(x => /120 points|paiement immédiat|garantie/i.test(x.title+' '+x.text))) SERVICES.splice(0, SERVICES.length, ...s.services);
  if (Array.isArray(s.testimonials) && !s.testimonials.some(x => ['Kossi A.','Nadège H.','Ibrahim S.'].includes(x.name))) TESTIMONIALS.splice(0, TESTIMONIALS.length, ...s.testimonials);
  if (Array.isArray(s.steps) && !s.steps.some(x => /disponibles immédiatement|validation sous 48 h/i.test(x.text))) STEPS.splice(0, STEPS.length, ...s.steps);
  if (Array.isArray(s.brands)) BRANDS.splice(0, BRANDS.length, ...s.brands);
  if (Array.isArray(s.faq) && !s.faq.some(x => /3 à 12 mois|30 à 50 %/i.test(x.a))) FAQ.splice(0, FAQ.length, ...s.faq);
}

/* ============================================================
   COULEUR DE MARQUE (sélectionnable dans l'administration)
   ============================================================ */
function applyBrandColor() {
  const c = SITE.accentColor;
  if (!/^#[0-9a-f]{6}$/i.test(c || '')) return;
  const rgb = [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16));
  const mix = (v, target, amount) => Math.round(v * (1 - amount) + target * amount);
  const hex = a => '#' + a.map(v => v.toString(16).padStart(2, '0')).join('');
  document.documentElement.style.setProperty('--gold', c);
  document.documentElement.style.setProperty('--gold-2', hex(rgb.map(v => mix(v, 255, .28))));
  document.documentElement.style.setProperty('--gold-3', hex(rgb.map(v => mix(v, 0, .2))));
}

/* ============================================================
   CATALOGUE DISTANT EN TEMPS RÉEL (Supabase optionnel)
   ============================================================ */
let remoteVehicleChannel = null;
function loadSupabaseSdk() {
  if (window.supabase?.createClient) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
    script.onload = () => window.supabase?.createClient ? resolve() : reject(new Error('SDK Supabase indisponible'));
    script.onerror = () => reject(new Error('Chargement Supabase impossible'));
    document.head.appendChild(script);
  });
}
async function connectRemoteCatalog() {
  const cfg = window.IGMOTORS_SUPABASE_CONFIG || {};
  if (!cfg.url || !cfg.anonKey) return;
  try {
    await loadSupabaseSdk();
    const db = window.supabase.createClient(cfg.url, cfg.anonKey, {auth:{persistSession:false,autoRefreshToken:false}});
    const refresh = async () => {
      const {data,error} = await db.from('vehicles').select('payload').eq('published', true);
      if (error) throw error;
      VEHICLES.splice(0, VEHICLES.length, ...(data || []).map(row => row.payload).filter(v => v && v.id));
      renderHome(); renderCatalogue(); renderVehicle();
    };
    await refresh();
    remoteVehicleChannel = db.channel('igmotors-public-catalog')
      .on('postgres_changes', {event:'*',schema:'public',table:'vehicles'}, () => { refresh().catch(err => console.warn('Actualisation du catalogue impossible',err)); })
      .subscribe();
  } catch (err) {
    console.warn('Catalogue Supabase indisponible ; affichage du catalogue local.', err);
  }
}

/* ============================================================
   DÉMARRAGE
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  applyLocalOverride();
  applyBrandColor();
  if (STATS[0] && STATS[0].label === 'FCFA · budget de départ') STATS[0].value = fmtPriceShort(Number(SITE.startingPrice) || 1500000);
  $$('[data-starting-price]').forEach(el => { el.textContent = fmtPrice(Number(SITE.startingPrice) || 1500000); });
  renderHeader();
  renderFooter();
  renderStats();
  renderMarquee();
  renderHome();
  renderCatalogue();
  renderVehicle();
  renderServices();
  renderContact();
  document.addEventListener('click', e => {
    const button = e.target.closest('[data-share-vehicle]');
    if (!button) return;
    button.disabled = true;
    shareVehicleOnWhatsApp(button.dataset.shareVehicle).finally(() => { button.disabled = false; });
  });
  connectRemoteCatalog();
});
