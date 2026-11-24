# Connexion administrateur sans mot de passe — IG-MOTORS

## Fonctionnement

L’écran admin remplace la saisie du mot de passe par un lien magique envoyé à l’adresse e-mail. Le titulaire doit pouvoir ouvrir sa boîte et cliquer le lien. Connaître une adresse seule ne donne jamais accès au tableau de bord. La connexion reste réservée aux identifiants présents dans `public.admin_users`; l’auto-inscription est désactivée.

Le code appelle `signInWithOtp` avec `shouldCreateUser: false` et redirige vers `admin.html`. L’URL de retour GitHub Pages est déjà dans la liste Supabase. L’envoi d’un e-mail n’a pas encore été confirmé de bout en bout.

## Publier les changements

1. Décompresser l’archive `ig-motors-admin-magic-link.zip`.
2. Dans le dépôt `senakponlissanon-jpg/ig-motors-site`, branche `main`, remplacer `admin.html` à la racine et `js/admin.js` dans `js/` par les versions de l’archive.
3. Valider les deux fichiers sur GitHub, puis attendre le redéploiement GitHub Pages.
4. Ouvrir `https://senakponlissanon-jpg.github.io/ig-motors-site/admin.html` et actualiser la page.

Ne téléversez pas l’archive ZIP elle-même dans le dépôt. Ne publiez aucune clé secrète ou mot de passe.

## Utilisation

1. Saisir l’une des adresses administrateur.
2. Cliquer sur **Recevoir mon lien de connexion**.
3. Si l’adresse correspond à un compte autorisé, un lien sera envoyé. Vérifier les courriers indésirables, puis cliquer le lien reçu.
4. La page vérifie ensuite l’autorisation `admin_users` avant d’afficher le tableau de bord.

Chaque administrateur doit garder l’accès à sa propre boîte e-mail. Les deux comptes ne partagent pas de session.

## E-mail Supabase

L’authentification e-mail et le lien magique sont activés dans Supabase. Aucun serveur SMTP personnalisé n’était configuré lors du dernier contrôle. Le service e-mail par défaut est limité et fonctionne au mieux ; pour une livraison fiable, configurer un fournisseur SMTP dans Supabase Auth. Si la demande échoue, ne pas répéter rapidement de nombreuses fois ; vérifier la connexion et les journaux Auth, puis la configuration SMTP.
