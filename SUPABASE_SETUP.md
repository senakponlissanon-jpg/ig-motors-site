# Mise en service Supabase — IG-MOTORS

Le backend Supabase est maintenant créé et relié au code local du site. Le dépôt GitHub attend encore les fichiers.

## État effectué

- Projet `ig-motors-site` (`bhgiuyfiyjtzsfibvczh`), région Paris (`eu-west-3`), offre Free.
- Schéma créé et vérifié : `vehicles`, `admin_users`, règles RLS, bucket photo `vehicle-photos`, Realtime actif.
- Les visiteurs anonymes peuvent lire les annonces publiées seulement ; les modifications sont réservées aux comptes dont l’UUID est dans `admin_users`.
- Inscription libre désactivée. URL d’authentification préconfigurée pour `https://senakponlissanon-jpg.github.io/ig-motors-site/` et sa page `admin.html`.
- `js/supabase-config.js` est déjà renseigné avec l’URL du projet et une clé **publishable**. Cette clé publique est destinée au navigateur. Aucune clé `secret`/`service_role` n’est incluse dans le site.
- La base est vide pour éviter d’afficher comme réels les véhicules de démonstration.
- Le mot de passe de base utilisé au provisionnement n’est pas intégré au site. Pour un accès DB direct ultérieur, réinitialisez-le dans les paramètres Database et conservez-le dans un gestionnaire de mots de passe.

## Comptes administrateurs

Les deux comptes désignés par le propriétaire sont maintenant présents, e-mails confirmés, et autorisés dans `admin_users` avec les mêmes droits. Leur appartenance a été vérifiée dans Supabase. L’auto-inscription libre reste désactivée ; chaque titulaire doit garder son propre mot de passe.

Pour autoriser un autre compte plus tard : crée/invite l’utilisateur dans **Authentication → Users**, puis ajoute son UUID à `public.admin_users` depuis le SQL Editor. Ne partage pas de mots de passe. L’adresse secondaire n’est volontairement pas écrite en clair dans les fichiers destinés au dépôt public.

## Après publication GitHub Pages

Vérifier dans **Authentication → URL Configuration** que **Site URL** et **Redirect URLs** correspondent à l’adresse Pages réelle. L’adresse préconfigurée est `https://senakponlissanon-jpg.github.io/ig-motors-site/`; si le nom ou le chemin du dépôt change, corriger ces valeurs ici et dans le code.

Puis tester : connexion à `admin.html`, création d’un brouillon, publication, modification, dépublication et suppression. Le catalogue public doit afficher les annonces publiées en temps réel.

## E-mails et fichiers vendeurs

L’e-mail public `igmotors6@gmail.com` est affiché comme contact. Le formulaire permet de partager les pièces choisies vers WhatsApp ou une application e-mail depuis un appareil compatible ; l’utilisateur sélectionne le destinataire et confirme l’envoi. L’envoi automatique des dossiers par e-mail n’est pas configuré : il faudra ajouter un fournisseur e-mail et une fonction serveur avec secrets protégés.

## Fichiers utiles

- `js/supabase-config.js` — URL et clé publishable du projet.
- `admin.html`, `js/admin.js` — connexion et gestion des annonces.
- `supabase-setup.sql` — copie source du schéma appliqué au projet.
