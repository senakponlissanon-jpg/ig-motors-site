/* IG-MOTORS — administration distante Supabase.
   La sécurité des écritures est imposée par RLS dans supabase-setup.sql,
   pas seulement par cette interface. */
(() => {
  const $ = (s) => document.querySelector(s);
  const esc = (v) => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const money = (v) => new Intl.NumberFormat('fr-FR').format(Number(v) || 0);
  const cfg = window.IGMOTORS_SUPABASE_CONFIG || {};
  const setup = $('#setup-needed'), login = $('#login-card'), dashboard = $('#dashboard');
  const show = (el) => el?.classList.remove('adm-hidden');
  const hide = (el) => el?.classList.add('adm-hidden');
  const msg = (el, text, kind='') => { if (!el) return; el.textContent=text; el.className='adm-msg'+(kind?' '+kind:''); show(el); };
  const loginMsg = $('#login-msg'), dashMsg = $('#dash-msg');
  if (!cfg.url || !cfg.anonKey || !window.supabase) { show(setup); return; }
  const db = window.supabase.createClient(cfg.url, cfg.anonKey, {auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
  show(login);
  let user=null, currentId=null, records=[];

  function setSignedOut(text='') {
    user=null; hide(dashboard); show(login);
    if (text) msg(loginMsg,text,'error');
  }
  async function verifyAdmin(session) {
    const candidate=session?.user;
    if (!candidate) { setSignedOut(); return false; }
    const {data,error}=await db.from('admin_users').select('user_id').eq('user_id',candidate.id).maybeSingle();
    if (error || !data) {
      await db.auth.signOut(); setSignedOut('Ce compte n’est pas autorisé à administrer IG-MOTORS. Contactez le propriétaire.'); return false;
    }
    user=candidate; $('#user-email').textContent=candidate.email||''; hide(login); show(dashboard); hide(loginMsg);
    await loadVehicles(); subscribeAdmin(); return true;
  }
  $('#login-form')?.addEventListener('submit',async e=>{
    e.preventDefault();const button=e.currentTarget.querySelector('button[type=submit]');
    const email=$('#email').value.trim();button.disabled=true;hide(loginMsg);
    try {
      const {error}=await db.auth.signInWithOtp({
        email,
        options:{emailRedirectTo:new URL('admin.html',location.href).href,shouldCreateUser:false}
      });
      if(error)throw error;
      msg(loginMsg,'Si cette adresse correspond à un compte autorisé, un lien de connexion a été envoyé. Ouvrez-le depuis votre boîte e-mail.','ok');
    } catch {
      msg(loginMsg,'Impossible d’envoyer le lien de connexion. Vérifiez le service e-mail Supabase et réessayez plus tard.','error');
    } finally {button.disabled=false;}
  });
  $('#logout')?.addEventListener('click',async()=>{await db.auth.signOut();setSignedOut();});
  db.auth.onAuthStateChange((event)=>{
    if(event==='SIGNED_OUT')setSignedOut();
  });
  db.auth.getSession().then(({data})=>verifyAdmin(data.session))
    .catch(()=>setSignedOut('Impossible de vérifier la session. Rechargez la page et réessayez.'));

  function renderList(){
    const list=$('#vehicle-list'); $('#vehicle-count').textContent=`(${records.length})`;
    if(!records.length){list.innerHTML='<p class="adm-muted">Aucune annonce. Utilisez « Ajouter » pour créer la première.</p>';return;}
    list.innerHTML=records.map(row=>{const v=row.payload||{};return `<button class="adm-row${row.id===currentId?' active':''}" data-id="${esc(row.id)}" type="button"><img src="${esc(v.image||'assets/img/hero.jpg')}" alt="" onerror="this.style.opacity='.2'"><span><b>${esc(v.brand)} ${esc(v.model)}</b><small>${money(v.price)} FCFA · ${esc(v.year||'')}</small></span><span class="adm-status">${row.published?'Publiée':'Brouillon'}</span></button>`;}).join('');
  }
  async function loadVehicles(){
    const {data,error}=await db.from('vehicles').select('id,payload,published,updated_at').order('updated_at',{ascending:false});
    if(error){msg(dashMsg,'Impossible de charger les annonces. Vérifiez le schéma Supabase et les politiques RLS.','error');return;}
    records=data||[]; renderList();
  }
  function newEditor(v=null){
    currentId=v?.id||null; $('#editor-title').textContent=v?'Modifier l’annonce':'Nouvelle annonce';
    const form=$('#vehicle-form'); form.reset();
    const p=v?.payload||{};
    for(const name of ['brand','model','version','year','type','fuel','gearbox','mileage','power','seats','color','price','badge','status','image','description']){
      const field=form.elements.namedItem(name); if(field) field.value=p[name]??(name==='year'?new Date().getFullYear():name==='seats'?5:name==='type'?'SUV':name==='fuel'?'Essence':name==='gearbox'?'Automatique':name==='status'?'disponible':'');
    }
    form.elements.namedItem('features').value=Array.isArray(p.features)?p.features.join('\n'):'';
    form.elements.namedItem('featured').checked=!!p.featured;
    form.elements.namedItem('published').checked=!!v?.published;
    $('#photo-file').value=''; show(form); hide($('#editor-empty')); show($('#cancel-edit'));
    currentId ? show($('#delete-vehicle')) : hide($('#delete-vehicle'));
    $('#vehicle-list').querySelectorAll('.adm-row').forEach(x=>x.classList.toggle('active',x.dataset.id===currentId));
  }
  $('#new-vehicle')?.addEventListener('click',()=>newEditor());
  $('#cancel-edit')?.addEventListener('click',()=>{currentId=null;hide($('#vehicle-form'));hide($('#cancel-edit'));hide($('#delete-vehicle'));show($('#editor-empty'));renderList();});
  $('#vehicle-list')?.addEventListener('click',e=>{const b=e.target.closest('[data-id]');if(!b)return;const row=records.find(x=>x.id===b.dataset.id);if(row)newEditor(row);});
  async function uploadPhoto(file, slug){
    if(!file)return null;
    if(!['image/jpeg','image/png','image/webp'].includes(file.type)||file.size>5*1024*1024)throw new Error('Choisissez une image JPG, PNG ou WebP de 5 Mo maximum.');
    const ext=file.type==='image/png'?'png':file.type==='image/webp'?'webp':'jpg';
    const path=`${user.id}/${slug}-${Date.now()}.${ext}`;
    const {error}=await db.storage.from('vehicle-photos').upload(path,file,{cacheControl:'3600',upsert:false,contentType:file.type});
    if(error)throw error;
    return db.storage.from('vehicle-photos').getPublicUrl(path).data.publicUrl;
  }
  $('#vehicle-form')?.addEventListener('submit',async e=>{
    e.preventDefault(); const form=e.currentTarget, button=form.querySelector('[type=submit]'); button.disabled=true; hide(dashMsg);
    try {
      const fd=new FormData(form), brand=String(fd.get('brand')).trim(), model=String(fd.get('model')).trim();
      const slug=(brand+'-'+model).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,54);
      const id=currentId||`${slug||'vehicule'}-${crypto.randomUUID().slice(0,8)}`;
      let image=String(fd.get('image')||'').trim();
      const uploaded=await uploadPhoto($('#photo-file').files[0],slug||id); if(uploaded)image=uploaded;
      const payload={id,brand,model,version:String(fd.get('version')||'').trim(),year:Number(fd.get('year')),type:String(fd.get('type')),fuel:String(fd.get('fuel')),gearbox:String(fd.get('gearbox')),mileage:String(fd.get('mileage')||'').trim(),power:String(fd.get('power')||'').trim(),seats:Number(fd.get('seats'))||5,color:String(fd.get('color')||'').trim(),price:Number(fd.get('price')),image,badge:String(fd.get('badge')||''),featured:fd.get('featured')==='on',status:String(fd.get('status')),description:String(fd.get('description')||'').trim(),features:String(fd.get('features')||'').split('\n').map(x=>x.trim()).filter(Boolean)};
      const row={id,payload,published:fd.get('published')==='on',updated_at:new Date().toISOString()};
      const {error}=await db.from('vehicles').upsert(row,{onConflict:'id'}); if(error)throw error;
      currentId=id; await loadVehicles(); const saved=records.find(x=>x.id===id); if(saved)newEditor(saved); msg(dashMsg,'Annonce enregistrée. La publication et les mises à jour sont synchronisées avec le catalogue.','ok');
    } catch(err) { msg(dashMsg,err.message||'Enregistrement impossible. Vérifiez les autorisations Supabase.','error'); }
    finally {button.disabled=false;}
  });
  $('#delete-vehicle')?.addEventListener('click',async()=>{
    if(!currentId||!confirm('Supprimer définitivement cette annonce ?'))return;
    const {error}=await db.from('vehicles').delete().eq('id',currentId);
    if(error){msg(dashMsg,'Suppression impossible. Vérifiez les autorisations.','error');return;}
    currentId=null;hide($('#vehicle-form'));hide($('#delete-vehicle'));hide($('#cancel-edit'));show($('#editor-empty'));await loadVehicles();msg(dashMsg,'Annonce supprimée.','ok');
  });
  let channel;
  function subscribeAdmin(){
    if(channel)return;
    channel=db.channel('igmotors-admin-vehicles').on('postgres_changes',{event:'*',schema:'public',table:'vehicles'},()=>loadVehicles()).subscribe();
  }
})();
