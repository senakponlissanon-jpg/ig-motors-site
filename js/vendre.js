/* IG-MOTORS — fiche de proposition de vente et état déclaratif */
(() => {
  'use strict';
  const $=s=>document.querySelector(s);
  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const form=$('#sell-form'), canvas=$('#seller-signature');
  const primary=String(SITE.whatsapp||SITE.phoneRaw||'').replace(/\D/g,'');
  const secondary=String(SITE.phone2Raw||SITE.phone2||'').replace(/\D/g,'');
  document.querySelectorAll('[data-wa-contact]').forEach(a=>{
    const which=a.dataset.waContact, number=which==='secondary'?secondary:primary, label=which==='secondary'?SITE.phone2:SITE.phone;
    if(number)a.href='https://wa.me/'+number;
    if(a.closest('li')&&label)a.textContent=label+' · WhatsApp';
    else if(a.classList.contains('btn')&&label)a.textContent='WhatsApp · '+label;
  });
  document.querySelectorAll('[data-sell-address]').forEach((el,i)=>el.textContent=i===0?(SITE.city||'Godomey'):(SITE.addressFull||'Godomey, non loin du CEG Godomey'));
  const ctx=canvas.getContext('2d');let signed=false,drawing=false;
  const fileInput=$('#s-files'),filePreview=$('#s-files-preview');
  const MAX_FILES=8,MAX_BYTES=10*1024*1024;
  function selectedFiles(){return fileInput?[...fileInput.files]:[];}
  function validateFiles(files){
    if(files.length>MAX_FILES){alert(`Choisissez au maximum ${MAX_FILES} fichiers.`);return false;}
    const bad=files.find(f=>f.size>MAX_BYTES);
    if(bad){alert(`Le fichier « ${bad.name} » dépasse 10 Mo. Réduisez sa taille avant de le partager.`);return false;}
    return true;
  }
  function showFiles(){
    const files=selectedFiles();
    if(!files.length){filePreview.textContent='Formats : JPG, PNG, WEBP ou PDF. Maximum 8 fichiers, 10 Mo par fichier.';return;}
    const total=files.reduce((n,f)=>n+f.size,0);
    filePreview.innerHTML=`<b>${files.length} fichier(s) sélectionné(s) · ${(total/1024/1024).toFixed(1)} Mo au total</b><br>${files.map(f=>esc(f.name)+' ('+(f.size/1024/1024).toFixed(1)+' Mo)').join('<br>')}`;
  }
  fileInput.addEventListener('change',showFiles);
  function shareFiles(files,text){
    if(!files.length){alert('Sélectionnez au moins une photo ou un document.');return false;}
    if(!validateFiles(files))return false;
    let supported=false;
    try{supported=!!(navigator.share&&navigator.canShare&&navigator.canShare({files}));}catch{supported=false;}
    if(!supported)return false;
    try{
      navigator.share({title:'Dossier de véhicule · IG-MOTORS',text,files}).catch(err=>{if(err.name!=='AbortError')alert('Le partage a échoué. Essayez depuis l’application WhatsApp ou e-mail, ou réduisez le nombre ou la taille des fichiers.');});
      return true;
    }catch{return false;}
  }
  $('#share-files').addEventListener('click',()=>{
    const files=selectedFiles();
    const details=whatsappMessage(formData());
    const text=`Dossier vendeur destiné à IG-MOTORS. E-mail de réception : ${SITE.email||'à confirmer'}. WhatsApp : ${SITE.phone} ou ${SITE.phone2}. Choisissez le canal et le destinataire puis confirmez l’envoi.\n\n${details}`;
    if(!shareFiles(files,text))alert('Le partage de fichiers natif n’est pas disponible dans ce navigateur. Utilisez un téléphone compatible ou joignez les fichiers manuellement dans WhatsApp / votre e-mail.');
  });
  function resizeCanvas(){ 
    const old=signed?canvas.toDataURL('image/png'):'';
    const r=canvas.getBoundingClientRect(),dpr=window.devicePixelRatio||1;
    if(r.width<20)return;
    canvas.width=Math.round(r.width*dpr);canvas.height=Math.round(130*dpr);
    ctx.setTransform(dpr,0,0,dpr,0,0);ctx.strokeStyle='#18202c';ctx.lineWidth=2.3;ctx.lineCap='round';ctx.lineJoin='round';
    if(old){const img=new Image();img.onload=()=>ctx.drawImage(img,0,0,r.width,130);img.src=old;}
  }
  resizeCanvas();window.addEventListener('resize',resizeCanvas);
  const pos=e=>{const r=canvas.getBoundingClientRect();return{x:e.clientX-r.left,y:e.clientY-r.top};};
  canvas.addEventListener('pointerdown',e=>{e.preventDefault();canvas.setPointerCapture(e.pointerId);const p=pos(e);ctx.beginPath();ctx.moveTo(p.x,p.y);drawing=true;signed=true;});
  canvas.addEventListener('pointermove',e=>{if(!drawing)return;const p=pos(e);ctx.lineTo(p.x,p.y);ctx.stroke();});
  ['pointerup','pointercancel','pointerleave'].forEach(t=>canvas.addEventListener(t,()=>drawing=false));
  $('#clear-signature').addEventListener('click',()=>{ctx.clearRect(0,0,canvas.width,canvas.height);signed=false;});
  function formData(){
    const fd=new FormData(form),out={};
    for(const [k,v] of fd.entries()){if(k==='docs')continue;if(k==='declaration')continue;if(String(v).trim())out[k]=String(v).trim();}
    out.docs=fd.getAll('docs');out.signature=signed?canvas.toDataURL('image/png'):'';
    return out;
  }
  const labels={owner:'Propriétaire',phone:'Téléphone / WhatsApp',email:'E-mail du propriétaire',town:'Commune / quartier',role:'Lien avec le véhicule',identity:'Pièce (type / référence)',brand:'Marque',model:'Modèle / finition',year:'Année',type:'Type',plate:'Immatriculation',mileage:'Kilométrage',fuel:'Carburant',gear:'Boîte',color:'Couleur',location:'Lieu du véhicule',engine:'Moteur / démarrage',gearbox:'Transmission',body:'Carrosserie',interior:'Habitacle',tires:'Pneus',ac:'Climatisation',accident:'Accident / choc connu',warning:'Voyants',loan:'Crédit / gage',maintenance:'Entretien / réparations',defects:'Défauts et autres détails',price:'Prix demandé FCFA',negotiable:'Négociable',reason:'Raison de vente',timing:'Délai souhaité',reasonDetails:'Précisions'};
  function whatsappMessage(d){
    const rows=Object.entries(labels).filter(([key])=>d[key]).map(([key,label])=>`${label} : ${d[key]}`);
    if(d.docs&&d.docs.length)rows.push('Documents : '+d.docs.join(', '));
    rows.push('', 'Je peux joindre des photos récentes du véhicule dans cette conversation WhatsApp. Merci de me contacter pour organiser une inspection et une estimation.');
    return `Bonjour IG-MOTORS, je souhaite proposer mon véhicule à la reprise / achat.\n\n${rows.join('\n')}`;
  }
  form.addEventListener('submit',e=>{
    e.preventDefault();
    if(!form.reportValidity())return;
    const d=formData(),target=e.submitter&&e.submitter.dataset.send;
    const number=target==='secondary'?secondary:primary;
    const message=whatsappMessage(d);
    const files=selectedFiles();
    if(files.length&&!validateFiles(files))return;
    // Avec des pièces sélectionnées, le partage natif joint réellement les fichiers.
    // Le navigateur ne permet pas de préchoisir le contact WhatsApp/e-mail.
    if(files.length&&shareFiles(files,`Envoi pour IG-MOTORS (destinataire WhatsApp souhaité : ${target==='secondary'?SITE.phone2:SITE.phone}).\n\n${message}`))return;
    const url=`https://wa.me/${number||'2290167648684'}?text=${encodeURIComponent(message)}`;
    window.open(url,'_blank','noopener');
    const notice=document.createElement('div');notice.className='toast on';notice.textContent=files.length?'WhatsApp est ouvert avec le résumé. Ce navigateur ne sait pas joindre automatiquement les pièces : partagez-les depuis l’application.':'Votre résumé est prêt dans WhatsApp. Vérifiez-le puis envoyez-le.';document.body.appendChild(notice);setTimeout(()=>notice.remove(),5000);
  });
  function fichaHTML(d){
    const rows=Object.entries(labels).filter(([k])=>d[k]).map(([k,l])=>`<tr><th>${esc(l)}</th><td>${esc(d[k])}</td></tr>`).join('');
    const docs=(d.docs||[]).map(x=>`<li>${esc(x)}</li>`).join('')||'<li>Aucun document coché</li>';
    const sig=d.signature?`<img src="${d.signature}" alt="Signature du propriétaire">`:'';
    const date=new Date().toLocaleDateString('fr-FR');
    const mainNo=String(SITE.phoneRaw||'').replace(/\D/g,'');
    const secondNo=String(SITE.phone2Raw||'').replace(/\D/g,'');
    const address=SITE.addressFull||'Godomey, non loin du CEG Godomey, Bénin';
    const ownerName=SITE.owner||'LISSANON Igor';
    return `<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>Fiche de proposition ${esc(d.brand)} ${esc(d.model)}</title><style>@page{size:A4;margin:16mm}*{box-sizing:border-box}body{font:14px Arial,sans-serif;line-height:1.55;color:#171b22}.sheet{max-width:850px;margin:20px auto}.head{border-bottom:3px solid ${esc(SITE.accentColor||'#d9a94a')};padding-bottom:14px;display:flex;justify-content:space-between}.title{font-size:24px;font-weight:800}.small{font-size:12px;color:#606b78}.warn{padding:12px;background:#fff4df;border:1px solid #efd49e;margin:18px 0}.section{font-size:16px;margin:19px 0 7px}table{width:100%;border-collapse:collapse}th,td{text-align:left;vertical-align:top;border-bottom:1px solid #e5e8eb;padding:8px}th{width:34%;color:#515b67}li{margin:5px 0}.sign{border-top:1px solid #333;margin-top:44px;padding-top:8px;min-height:110px}.sign img{display:block;height:75px;max-width:260px;object-fit:contain;object-position:left}footer{border-top:1px solid #ddd;margin-top:24px;padding-top:12px;font-size:11px;color:#667}@media print{.sheet{margin:0}}</style></head><body><main class="sheet"><header class="head"><div><div class="title">IG-MOTORS</div><div class="small">Proposition de vente · ${esc(address)}</div><div class="small"><a href="https://wa.me/${mainNo}">${esc(SITE.phone)}</a> · <a href="https://wa.me/${secondNo}">${esc(SITE.phone2)}</a></div></div><div style="text-align:right"><b>FICHE DE DÉCLARATION</b><br><span class="small">Établie le ${date}</span></div></header><div class="warn"><b>Document préliminaire :</b> cette fiche décrit une demande d’estimation et l’état déclaré par le vendeur. Elle ne constitue ni une offre ferme ni un contrat de cession. Toute vente nécessite inspection, vérification des pièces et accord écrit signé par les parties.</div><h2 class="section">Propriétaire et véhicule</h2><table>${rows}</table><h2 class="section">Documents déclarés disponibles</h2><ul>${docs}</ul><div class="sign">Signature du propriétaire (facultative pour la demande)${sig}</div><footer>Propriétaire : ${esc(ownerName)} · IG-MOTORS · ${esc(address)}. Vérifier les documents originaux et l’état mécanique avant toute cession.</footer></main></body></html>`;
  }
  function output(print){
    if(!form.reportValidity())return;
    const html=fichaHTML(formData());
    if(!print){const blob=new Blob([html],{type:'text/html;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='fiche-proposition-vente-IG-MOTORS.html';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);return;}
    const w=window.open('','_blank');if(!w){alert('Autorisez les fenêtres contextuelles ou utilisez le téléchargement HTML.');return;}
    w.document.open();w.document.write(html);w.document.close();w.onload=()=>setTimeout(()=>{w.focus();w.print();},250);
  }
  $('#print-sheet').addEventListener('click',()=>output(true));
  $('#download-sheet').addEventListener('click',()=>output(false));
})();
