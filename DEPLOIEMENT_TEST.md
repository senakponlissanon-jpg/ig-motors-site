# Premier test de déploiement — IG-MOTORS

## Contenu

Le site est statique : aucun build ni installation de dépendances n’est requis. Après extraction du paquet, téléversez le contenu du dossier `ig-motors` à la racine du site hébergé, là où `index.html` doit être servi.

## Contrôles à faire sur l’URL de test

1. Ouvrir la page d’accueil et naviguer vers **Catalogue**, **Vendre** et **Contact**.
2. Vérifier les fiches d’annonce, les filtres, les deux liens WhatsApp et l’adresse à Godomey.
3. Tester le formulaire vendeur avec des données fictives et ne pas envoyer de pièce d’identité réelle pendant le test.
4. Depuis un téléphone Android/iPhone en HTTPS, choisir une photo de test dans le formulaire vendeur puis essayer le menu de partage. L’utilisateur doit choisir WhatsApp ou son application e-mail et sélectionner le destinataire.
5. Depuis une carte du catalogue et une fiche véhicule, appuyer sur **Envoyer photo sur WhatsApp**. Vérifier que le menu de partage propose la photo et le texte, puis choisir WhatsApp et confirmer manuellement l’envoi. Sur un navigateur sans partage de fichiers, le message WhatsApp doit contenir le lien vers la photo.
6. Tester l’affichage mobile et le menu de navigation.

## Avant publication publique

- Le stock, les photos, les caractéristiques et les prix des annonces actuelles sont des **données de démonstration** : vérifiez-les et remplacez-les par le stock réel.
- Le site indique un prix de départ de **1 500 000 FCFA** selon l’information communiquée par le propriétaire ; confirmez les modèles concernés et leurs conditions.
- Confirmez horaires et épingle exacte de la carte.
- Le partage de fichiers natif fonctionne uniquement si le navigateur et l’appareil le prennent en charge ; sur un site public, activez HTTPS.
- L’adresse de réception publique est `igmotors6@gmail.com`. Une adresse secondaire désignée par le propriétaire recevra les mêmes droits après création/autorisation dans Supabase ; elle n’est pas publiée dans les fichiers publics. Le partage manuel des fichiers via l’application e-mail fonctionne sur appareil compatible ; l’envoi automatique par le site n’est pas configuré et nécessite une fonction serveur et un fournisseur d’e-mail. Les pièces ne sont pas téléversées sur IG-MOTORS par le formulaire vendeur.
- Le projet Supabase, son schéma RLS, la configuration publique et les deux comptes autorisés sont prêts. `admin.html` exige une session et un rôle autorisé ; tester les deux connexions après publication. Les archives de `gestion.html` restent locales et non chiffrées.
- Les factures, contrats et signatures sont conservés dans le navigateur local et ne constituent pas un système comptable/archivage centralisé.

## Fichiers principaux

- `index.html` : accueil
- `catalogue.html` : catalogue local de démonstration ou annonces Supabase publiées si la configuration est activée
- `vendre.html` : fiche propriétaire, état du véhicule, sélection et partage de pièces
- `gestion.html` : factures, locations et archives locales
- `admin.html` : édition du stock et réglages
- `js/data.js` : données de l’entreprise, prix de départ, stock et textes
