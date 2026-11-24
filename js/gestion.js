/* IG-MOTORS — factures, contrats et archives locales */
(() => {
  'use strict';
  const KEY = 'igmotors_documents_v1';
  const BIZ_KEY = 'igmotors_billing_business_v1';
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => [...r.querySelectorAll(s)];
  const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const money = v => (Math.round(Number(v)||0)).toLocaleString('fr-FR') + ' FCFA';
  const day = v => v ? new Date(v).toLocaleDateString('fr-FR') : '—';
  const dateTime = v => v ? new Date(v).toLocaleString('fr-FR') : '—';
  const safeDate = () => new Date().toISOString().slice(0,10);
  let store;
  try { store = JSON.parse(localStorage.getItem(KEY) || 'null') || {sequence:0,documents:[]}; }
  catch { store = {sequence:0,documents:[]}; }
  if (!Array.isArray(store.documents)) store.documents = [];
  let business;
  try { business = JSON.parse(localStorage.getItem(BIZ_KEY) || 'null'); } catch { business = null; }
  business = Object.assign({
    name: SITE.name, owner: SITE.owner || 'LISSANON Igor', phone: SITE.phone, phone2: SITE.phone2 || '',
    address: SITE.addressFull, email: SITE.email, ifu: '', rccm: '', paymentDetails: ''
  }, business || {});
  if (business.address === 'Cotonou, Bénin' || business.address === 'Avenue de la Marina, Cotonou, Bénin') business.address = SITE.addressFull;
  if (business.phone === '+229 01 00 00 00') business.phone = SITE.phone;
  if (!business.phone2) business.phone2 = SITE.phone2 || '';
  if (!business.owner) business.owner = SITE.owner || 'LISSANON Igor';
  function saveStore(){ localStorage.setItem(KEY, JSON.stringify(store)); }
  function businessInfo(){ return business; }
  function applyColor(){
    const c=SITE.accentColor;
    if(!/^#[\da-f]{6}$/i.test(c||''))return;
    document.documentElement.style.setProperty('--gold',c);
  }
  applyColor();
  $('#inv-date').value = safeDate();

  // Onglets gestion
  $('#gestion-tabs').addEventListener('click', e=>{
    const b=e.target.closest('[data-view]'); if(!b)return;
    $$('.g-navbtn').forEach(x=>x.classList.toggle('on',x===b));
    ['invoice','contract','archive','settings'].forEach(id=>$('#view-'+id).hidden=id!==b.dataset.view);
    if(b.dataset.view==='archive') renderArchive();
    if(b.dataset.view==='contract') requestAnimationFrame(()=>{if(!pads['sig-owner'])initPad('sig-owner');if(!pads['sig-client'])initPad('sig-client');});
  });

  // Palette/signature: canvas compatible souris et tactile.
  const pads = {};
  function initPad(id){
    const canvas=$('#'+id), box=canvas.getBoundingClientRect();
    if (box.width < 20) return; // le formulaire est dans un onglet masqué ; initialiser au premier affichage
    const dpr=window.devicePixelRatio||1;
    canvas.width=Math.max(1,Math.round(box.width*dpr)); canvas.height=Math.round(140*dpr);
    const ctx=canvas.getContext('2d');ctx.scale(dpr,dpr);ctx.strokeStyle='#18202c';ctx.lineWidth=2.4;ctx.lineCap='round';ctx.lineJoin='round';
    pads[id]={canvas,ctx,drawing:false,empty:true};
    const point=e=>{const r=canvas.getBoundingClientRect();return {x:e.clientX-r.left,y:e.clientY-r.top};};
    canvas.addEventListener('pointerdown',e=>{e.preventDefault();canvas.setPointerCapture(e.pointerId);const p=point(e);ctx.beginPath();ctx.moveTo(p.x,p.y);pads[id].drawing=true;pads[id].empty=false;});
    canvas.addEventListener('pointermove',e=>{if(!pads[id].drawing)return;e.preventDefault();const p=point(e);ctx.lineTo(p.x,p.y);ctx.stroke();});
    const end=()=>{pads[id].drawing=false;};canvas.addEventListener('pointerup',end);canvas.addEventListener('pointercancel',end);canvas.addEventListener('pointerleave',end);
  }
  initPad('sig-owner');initPad('sig-client');
  function clearPad(id){const p=pads[id];if(!p)return;p.ctx.clearRect(0,0,p.canvas.width,p.canvas.height);p.empty=true;}
  $$('[data-clear]').forEach(b=>b.addEventListener('click',()=>clearPad(b.dataset.clear)));
  $('#contract-form').addEventListener('reset',()=>setTimeout(()=>{clearPad('sig-owner');clearPad('sig-client');},0));
  function signature(id){return pads[id]&&!pads[id].empty?pads[id].canvas.toDataURL('image/png'):'';}

  function nextNumber(prefix){
    const yy=new Date().getFullYear();store.sequence=(Number(store.sequence)||0)+1;
    saveStore();return `${prefix}-${yy}-${String(store.sequence).padStart(4,'0')}`;
  }
  function readForm(form){return Object.fromEntries(new FormData(form).entries());}
  function archive(doc){store.documents.unshift(doc);saveStore();renderArchive();}
  function line(label,value){return value?`<div class="line"><b>${esc(label)}</b><span>${esc(value)}</span></div>`:'';}
  function docShell(title,doc,body){
    const b=businessInfo();
    const ids=[b.ifu&&`IFU : ${b.ifu}`,b.rccm&&`RCCM : ${b.rccm}`].filter(Boolean).join(' · ');
    return `<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)} ${esc(doc.number)}</title>
<style>
@page{size:A4;margin:17mm}*{box-sizing:border-box}body{font:14px Arial,sans-serif;color:#171b22;margin:0;line-height:1.55}.doc{max-width:850px;margin:25px auto;padding:28px;border:1px solid #dfe3e8}.top{display:flex;justify-content:space-between;gap:20px;border-bottom:3px solid ${esc(SITE.accentColor||'#d9a94a')};padding-bottom:18px}.brand{font-size:24px;font-weight:800;letter-spacing:.02em}.muted{color:#626b78;font-size:12px}.title{margin:25px 0 15px;font-size:24px}.two{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin:18px 0}.box{border:1px solid #dce1e7;border-radius:8px;padding:13px}.box h3{font-size:13px;margin:0 0 7px}.line{display:flex;justify-content:space-between;gap:14px;border-bottom:1px solid #edf0f3;padding:7px 0}.line span{text-align:right}.total{font-size:19px;font-weight:800;background:#f5f6f7;padding:12px;margin-top:14px}.signatures{display:grid;grid-template-columns:1fr 1fr;gap:25px;margin-top:50px}.sign{border-top:1px solid #222;padding-top:8px;min-height:90px}.sign img{display:block;max-width:230px;height:80px;object-fit:contain;object-position:left center}.foot{border-top:1px solid #ddd;margin-top:30px;padding-top:10px;color:#69717c;font-size:11px}.terms{white-space:pre-wrap;margin-top:10px}@media print{.doc{margin:0;padding:0;border:0}}
</style></head><body><article class="doc"><div class="top"><div><div class="brand">${esc(b.name)}</div><div class="muted">${esc(b.owner||'')} · ${esc(b.address||'')}<br>${esc(b.phone||'')}${b.phone2?' · '+esc(b.phone2):''}<br>${esc(b.email||'')}<br>${esc(ids)}</div></div><div style="text-align:right"><b>${esc(title)}</b><br>N° ${esc(doc.number)}<br>${esc(day(doc.date||doc.createdAt))}</div></div>${body}<div class="foot">Document établi par ${esc(b.owner||b.name)} pour ${esc(b.name)}. Conservez une copie. Les champs d’identification fiscale doivent être vérifiés avant émission officielle.</div></article></body></html>`;
  }
  function invoiceHTML(d){
    const b=businessInfo(), remainder=Math.max(0,Number(d.total)-Number(d.paid||0));
    const body=`<h1 class="title">FACTURE</h1><div class="two"><section class="box"><h3>CLIENT</h3>${line('Nom',d.client)}${line('Téléphone',d.phone)}${line('Email',d.email)}</section><section class="box"><h3>DÉTAIL</h3>${line('Nature',d.kind)}${line('Véhicule / objet',d.vehicle)}${line('Paiement',d.method)}${line('Échéance',d.due)}</section></div><div class="box"><h3>DÉSIGNATION</h3><p>${esc(d.description||d.vehicle||d.kind)}</p></div><div class="total">Total : ${money(d.total)}</div><div class="two"><div class="box">Déjà réglé : <b>${money(d.paid||0)}</b></div><div class="box">Solde dû : <b>${money(remainder)}</b></div></div>${b.paymentDetails?`<p class="muted">Informations de paiement : ${esc(b.paymentDetails)}</p>`:''}<div style="margin-top:42px;text-align:right">Cachet et signature<br><br><br>____________________________</div>`;
    return docShell('Facture',d,body);
  }
  function contractHTML(d){
    const sigA=d.signatureOwner?`<img src="${d.signatureOwner}" alt="Signature IG-MOTORS">`:'';
    const sigC=d.signatureClient?`<img src="${d.signatureClient}" alt="Signature du locataire">`:'';
    const body=`<h1 class="title">CONTRAT DE LOCATION DE VÉHICULE</h1><p><b>Événement / motif :</b> ${esc(d.occasion)}${d.purpose?' — '+esc(d.purpose):''}</p><div class="two"><section class="box"><h3>LOUEUR</h3>${line('Société',businessInfo().name)}${line('Représentant',businessInfo().owner)}${line('Téléphone',businessInfo().phone)}${line('Adresse',businessInfo().address)}</section><section class="box"><h3>LOCATAIRE</h3>${line('Nom complet',d.client)}${line('Téléphone',d.phone)}${line('Pièce d’identité',d.identity)}${line('Adresse',d.address)}</section></div><section class="box"><h3>VÉHICULE ET PÉRIODE</h3>${line('Véhicule',d.vehicle)}${line('Immatriculation',d.plate)}${line('Départ',dateTime(d.start))}${line('Retour prévu',dateTime(d.end))}${line('Lieu / zone',d.place)}${line('Kilométrage au départ',d.mileage?d.mileage+' km':'')}</section><section class="box" style="margin-top:15px"><h3>PRIX ET GARANTIE</h3>${line('Prix convenu',money(d.price))}${line('Caution / dépôt',money(d.deposit||0))}</section><h3 style="margin-top:22px">Conditions à compléter et vérifier</h3><p>1. Le locataire reconnaît avoir reçu le véhicule et ses accessoires selon l’état des lieux contradictoire à annexer au présent contrat.<br>2. Le véhicule est utilisé uniquement pour l’occasion et la période convenues. Toute prolongation doit être autorisée par écrit par le loueur.<br>3. Le locataire s’engage à conduire prudemment, respecter le code de la route et ne pas sous-louer ni confier le véhicule à un conducteur non autorisé.<br>4. Les modalités d’assurance, carburant, entretien, panne, accident, dommages, retard de restitution et restitution de la caution doivent être précisées et acceptées avant signature.<br>5. Les parties déclarent avoir lu le contrat et ses annexes et en conserver chacune un exemplaire.</p>${d.terms?`<div class="box terms"><b>Conditions particulières</b><br>${esc(d.terms)}</div>`:''}<p style="margin-top:20px">Fait à ${esc(d.place||businessInfo().address||'________________')}, le ${esc(day(d.createdAt))}.</p><div class="signatures"><div class="sign">Le loueur — ${esc(businessInfo().owner||businessInfo().name)}${sigA}</div><div class="sign">Le locataire — ${esc(d.client)}${sigC}</div></div>`;
    return docShell('Contrat de location',d,body);
  }
  function download(name,content,type='text/html;charset=utf-8'){
    const blob=new Blob([content],{type}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  function openPrint(doc){
    const html=doc.type==='invoice'?invoiceHTML(doc):contractHTML(doc);
    const w=window.open('','_blank');
    if(!w){download(`${doc.number}.html`,html);alert('La fenêtre d’impression a été bloquée. Une copie HTML est téléchargée; ouvrez-la puis choisissez Imprimer → Enregistrer en PDF.');return;}
    w.document.open();w.document.write(html);w.document.close();w.onload=()=>setTimeout(()=>{w.focus();w.print();},350);
  }

  $('#make-invoice').addEventListener('click',e=>{
    e.preventDefault();const f=$('#invoice-form');if(!f.reportValidity())return;
    const d=readForm(f);d.type='invoice';d.number=nextNumber('IGM-FAC');d.createdAt=new Date().toISOString();d.total=Number(d.total)||0;d.paid=Number(d.paid)||0;
    if(d.paid>d.total&&!confirm('Le montant payé dépasse le total. Continuer ?'))return;
    archive(d);openPrint(d);
  });
  $('#make-contract').addEventListener('click',e=>{
    e.preventDefault();const f=$('#contract-form');if(!f.reportValidity())return;
    const d=readForm(f);if(new Date(d.end)<new Date(d.start)){alert('La fin de location doit être après le début.');return;}
    d.type='contract';d.number=nextNumber('IGM-LOC');d.createdAt=new Date().toISOString();d.signatureOwner=signature('sig-owner');d.signatureClient=signature('sig-client');
    archive(d);openPrint(d);
  });

  // Archives
  function renderArchive(){
    const host=$('#archive-list');if(!host)return;
    if(!store.documents.length){host.innerHTML='<div class="empty">Aucun document archivé sur cet appareil pour le moment.</div>';return;}
    host.innerHTML=store.documents.map(d=>`<article class="docitem"><div class="doctype">${d.type==='invoice'?'FACT.':'LOC.'}</div><div class="docmeta"><b>${esc(d.number)} · ${esc(d.client||'Sans nom')}</b><small>${d.type==='invoice'?'Facture':'Contrat location'} · ${esc(d.vehicle||d.occasion||'')} · ${esc(day(d.date||d.createdAt))}${d.type==='invoice'?' · '+esc(money(d.total)):''}</small></div><div class="docacts"><button data-action="print" data-id="${esc(d.number)}">Imprimer / PDF</button><button data-action="html" data-id="${esc(d.number)}">HTML</button><button data-action="delete" data-id="${esc(d.number)}">Supprimer</button></div></article>`).join('');
  }
  $('#archive-list').addEventListener('click',e=>{
    const b=e.target.closest('[data-action]');if(!b)return;const d=store.documents.find(x=>x.number===b.dataset.id);if(!d)return;
    if(b.dataset.action==='delete'){if(confirm(`Supprimer ${d.number} de cette archive ?`)){store.documents=store.documents.filter(x=>x.number!==d.number);saveStore();renderArchive();}return;}
    const html=d.type==='invoice'?invoiceHTML(d):contractHTML(d);
    if(b.dataset.action==='html')download(`${d.number}.html`,html);else openPrint(d);
  });
  $('#export-archive').addEventListener('click',()=>download('ig-motors-archives.json',JSON.stringify({version:1,exportedAt:new Date().toISOString(),sequence:store.sequence,documents:store.documents},null,2),'application/json'));
  $('#import-archive').addEventListener('change',async e=>{
    const f=e.target.files[0];if(!f)return;
    try{const data=JSON.parse(await f.text());if(!Array.isArray(data.documents))throw new Error('format');
      const map=new Map(store.documents.map(d=>[d.number,d]));data.documents.forEach(d=>{if(d&&d.number&&['invoice','contract'].includes(d.type))map.set(d.number,d);});
      store.documents=[...map.values()].sort((a,b)=>String(b.createdAt).localeCompare(String(a.createdAt)));store.sequence=Math.max(Number(store.sequence)||0,Number(data.sequence)||0);saveStore();renderArchive();alert('Sauvegarde restaurée.');
    }catch{alert('Fichier de sauvegarde invalide.');}e.target.value='';
  });

  // Paramètres vendeur des documents
  const bf=$('#business-form');
  function loadBusiness(){Object.keys(business).forEach(k=>{const i=bf.elements.namedItem(k);if(i)i.value=business[k]||'';});}
  loadBusiness();
  $('#save-business').addEventListener('click',()=>{Object.keys(business).forEach(k=>{const i=bf.elements.namedItem(k);if(i)business[k]=i.value.trim();});localStorage.setItem(BIZ_KEY,JSON.stringify(business));alert('Informations vendeur enregistrées sur cet appareil.');});
})();
