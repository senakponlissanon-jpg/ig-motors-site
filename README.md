# IG-MOTORS — Site web & guide

Site vitrine français en HTML/CSS/JavaScript statique, sans installation. Société propriétaire : **LISSANON Igor**.

## Accès rapides

- Site public : `index.html`
- **Proposer un véhicule à la reprise : `vendre.html`**
- Modifier le stock et les coordonnées : `admin.html`
- Factures, contrats de location et archives : `gestion.html`
- Guide : ce fichier

Pour lancer en local : `python3 -m http.server 8000`, puis ouvrir `http://localhost:8000`.

## Coordonnées communiquées

- Adresse : **Godomey, non loin du CEG Godomey, Bénin**
- WhatsApp principal : **+229 01 67 64 86 84** → `https://wa.me/2290167648684`
- WhatsApp secondaire : **+229 01 97 57 35 70** → `https://wa.me/2290197573570`

Les liens des numéros visibles sur le site ouvrent WhatsApp. La position précise n’étant pas fournie, le lien de carte lance une recherche pour l’adresse textuelle ; vérifiez l’emplacement exact avant publication.

## Propriétaires souhaitant vendre leur véhicule

Dans `vendre.html`, le vendeur peut transmettre ses coordonnées (dont son e-mail facultatif), le lien de propriété, les caractéristiques du véhicule, son état mécanique et carrosserie, les documents disponibles, les défauts et historiques connus, le prix souhaité et la raison de la vente. Les contacts WhatsApp principal et secondaire sont proposés. La sélection de photos et de PDF est disponible ; sur les appareils compatibles, le menu de partage permet d’envoyer les pièces vers WhatsApp ou une application e-mail, puis l’utilisateur choisit le destinataire.

Une fiche de déclaration peut être imprimée en PDF ou téléchargée en HTML. Elle ne constitue pas une offre ferme ni un contrat de cession ; l’offre et la vente définitives supposent une inspection, la vérification des pièces et un document signé par les parties. La signature dessinée sur la fiche est une signature électronique simple, pas une signature qualifiée.

Le formulaire ne stocke pas les données dans une base. Il ouvre WhatsApp avec un résumé prérempli. Les photos et PDF peuvent être sélectionnés ; sur les navigateurs mobiles compatibles, le menu natif permet de partager les fichiers vers WhatsApp ou une application e-mail. Il faut sélectionner le destinataire dans l’application. Le navigateur ne peut pas préchoisir le contact WhatsApp ni envoyer les fichiers en arrière-plan.

## Stock, couleurs et coordonnées

Le nouveau panneau `admin.html` est connecté au projet Supabase : connexion des comptes autorisés, création/modification/suppression d’annonces, brouillon/publication, téléversement d’une photo et synchronisation temps réel du catalogue. Le projet, le schéma RLS, la configuration publique et les deux comptes administrateurs autorisés sont en place. Consulte `SUPABASE_SETUP.md` pour les réglages après publication. `js/data.js` reste la configuration locale de base de l’entreprise.

Dans le catalogue et sur chaque fiche, le bouton **Envoyer photo sur WhatsApp** utilise le partage natif du téléphone/navigateur pour joindre l’image au texte de demande. Le visiteur doit choisir WhatsApp puis confirmer l’envoi. Si le partage de fichiers ou l’accès à l’image n’est pas pris en charge, WhatsApp s’ouvre avec le message, la fiche et un lien vers la photo ; l’image ne peut pas être jointe automatiquement par un simple lien `wa.me`.

Les coordonnées principales utilisées par le site sont `SITE` dans `js/data.js`. Les liens WhatsApp utilisent le numéro principal par défaut et le numéro secondaire pour les liens correspondants. Le site indique des offres à partir de **1 500 000 FCFA**, selon modèle, état et disponibilité. Toyota Venza, Corolla, Avensis, Nissan Almera et les différentes catégories Lexus sont proposés comme exemples de recherche ; cela ne garantit pas leur présence immédiate en stock.

## Factures et contrats de location

Dans `gestion.html`, les factures reçoivent un numéro local, sont archivées sur le navigateur courant et peuvent être imprimées/enregistrées en PDF. Les contrats de location proposent les occasions anniversaire, mariage, baptême, première communion, baptême et première communion, ou autre. Les deux parties peuvent signer à l’écran ; le contrat s’archive avec ses signatures.

Avant les factures officielles, renseignez les identifiants réels (IFU, RCCM) et vérifiez les obligations fiscales avec un comptable au Bénin. Faites vérifier le contrat de location et le modèle de cession par un professionnel du droit local. Les signatures dessinées ne sont pas certifiées.

## Limites importantes

- L’adresse publique de réception est `igmotors6@gmail.com`. Une adresse secondaire désignée par le propriétaire recevra les mêmes droits administrateur Supabase ; elle n’est pas affichée ni écrite en clair dans les fichiers publics du site. Le formulaire vendeur propose aussi un e-mail facultatif du propriétaire. Le partage natif peut ouvrir WhatsApp ou une application e-mail avec les pièces jointes ; le visiteur vérifie le destinataire et confirme l’envoi. Cela ne déclenche pas d’envoi automatique depuis le site. L’automatisation des e-mails nécessitera encore une fonction serveur et un fournisseur d’e-mail configuré avec ses secrets. Un lien wa.me ne peut pas envoyer les pièces en arrière-plan ni préchoisir un contact.
- Il n’y a pas de compte vendeur ou de boîte de réception centralisée. Pour cela, il faut un serveur sécurisé et une base de données.
- Factures, contrats et paramètres sont stockés dans le navigateur ; ils ne sont pas synchronisés et peuvent être perdus si les données locales sont effacées. Exportez régulièrement les archives JSON.
- `admin.html` requiert une session Supabase et une autorisation RLS. Les deux comptes autorisés sont maintenant inscrits ; leur connexion devra être testée après publication du site. `gestion.html` exige aussi un compte autorisé, mais les documents qu’il crée restent locaux au navigateur et ne sont pas chiffrés ni synchronisés.
- Confirmez avant lancement les horaires, l’email, l’adresse cartographique exacte, les réseaux sociaux et les affirmations commerciales (garantie, financement, délais, ancienneté et statistiques). Les contenus non fournis par le propriétaire sont à vérifier.
