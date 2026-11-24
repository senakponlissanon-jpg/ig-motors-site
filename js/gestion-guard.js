/* Barrière de connexion pour les outils locaux de factures/contrats. Ces documents
   restent stockés dans ce navigateur ; cette barrière ne remplace pas un coffre-fort. */
(() => {
  document.body.style.visibility='hidden';
  const lock=()=>{
    document.body.innerHTML='<main style="max-width:560px;margin:12vh auto;padding:28px;font:16px/1.6 system-ui;color:#17202b"><h1>Accès réservé</h1><p>Connectez-vous avec un compte administrateur autorisé pour ouvrir cet outil.</p><p><a href="admin.html">Aller à la connexion IG-MOTORS</a></p></main>';
    document.body.style.visibility='visible';
  };
  const cfg=window.IGMOTORS_SUPABASE_CONFIG||{};
  if(!cfg.url||!cfg.anonKey||!window.supabase?.createClient){lock();return;}
  const db=window.supabase.createClient(cfg.url,cfg.anonKey,{auth:{persistSession:true,autoRefreshToken:true}});
  db.auth.getSession().then(async({data})=>{
    if(!data.session){lock();return;}
    const {data:member,error}=await db.from('admin_users').select('user_id').eq('user_id',data.session.user.id).maybeSingle();
    if(error||!member){lock();return;}
    document.body.style.visibility='visible';
  }).catch(lock);
})();
