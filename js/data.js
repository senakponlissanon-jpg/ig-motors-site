/* ============================================================================
   IG-MOTORS — DONNÉES DU SITE
   ----------------------------------------------------------------------------
   C'EST LE SEUL FICHIER À MODIFIER POUR CHANGER LE CONTENU DU SITE.
   Aucune connaissance en HTML n'est nécessaire.

   ➜ Pour modifier le stock         : éditez le tableau `VEHICLES` (bas de page)
   ➜ Pour modifier le téléphone     : éditez `SITE` ci-dessous
   ➜ Pour changer une image         : déposez-la dans /assets/img/vehicles/
                                      puis mettez son nom dans le champ "image"

   ⚠ N'oubliez pas les guillemets "..." autour des textes,
     et la virgule , à la fin de chaque ligne.
   ========================================================================== */

/* ----------------------------------------------------------------------------
   1. INFORMATIONS DE L'ENTREPRISE
   -------------------------------------------------------------------------- */
const SITE = {
  name:        "IG-MOTORS",
  baseline:    "Revendeur de véhicules toutes marques",
  tagline:     "Revendeur de véhicules",   // texte court affiché sous le logo
  owner:       "LISSANON Igor",
  accentColor: "#d9a94a",
  startingPrice: 1500000,
  phone:       "+229 01 67 64 86 84",   // contact principal fourni par le propriétaire
  phoneRaw:    "+2290167648684",
  phone2:      "+229 01 97 57 35 70",   // deuxième contact fourni
  phone2Raw:   "+2290197573570",
  whatsapp:    "2290167648684",          // WhatsApp du contact principal (à confirmer)
  email:       "igmotors6@gmail.com",             // e-mail public de réception IG-MOTORS
  address:     "Godomey, Bénin",
  addressFull: "Godomey, non loin du CEG Godomey, Bénin",
  hours:       "Horaires à confirmer par WhatsApp",
  hoursShort:  "Visites sur confirmation",
  city:        "Godomey",
  country:     "Bénin",
  whatsappMessage: "Bonjour IG-MOTORS, je suis intéressé(e) par un véhicule de votre stock.",
  social: {
    facebook:  "",
    instagram: "",
    tiktok:    "",
    whatsapp:  "https://wa.me/2290167648684"
  }
};

/* ----------------------------------------------------------------------------
   2. MENU DE NAVIGATION
   -------------------------------------------------------------------------- */
const NAV = [
  { label: "Accueil",   href: "index.html" },
  { label: "Véhicules", href: "catalogue.html" },
  { label: "Services",  href: "services.html" },
  { label: "À propos",  href: "a-propos.html" },
  { label: "Vendre",    href: "vendre.html" },
  { label: "Contact",   href: "contact.html" }
];

/* ----------------------------------------------------------------------------
   3. CHIFFRES CLÉS (affichés sous la bannière d'accueil)
   -------------------------------------------------------------------------- */
const STATS = [
  { value: "1,5 M", label: "FCFA · budget de départ" },
  { value: "Toutes", label: "marques sur demande" },
  { value: "WhatsApp", label: "contact direct" },
  { value: "Godomey", label: "près du CEG Godomey" }
];

/* ----------------------------------------------------------------------------
   4. NOS ENGAGEMENTS (4 blocs de la page d'accueil)
   "icon" accepte : shield / doc / wheel / cash / key / pin / tools / clock
   -------------------------------------------------------------------------- */
const SERVICES = [
  {
    icon: "car",
    title: "Recherche multimarque",
    text: "Indiquez le modèle et le budget recherchés. Toyota Venza, Nissan Almera, Corolla, Avensis et Lexus toutes catégories peuvent être demandés, selon disponibilité."
  },
  {
    icon: "doc",
    title: "Reprise de votre véhicule",
    text: "Décrivez votre véhicule, son état, ses documents et le prix souhaité dans notre fiche vendeur. Toute offre dépendra d’une inspection et de la vérification des pièces."
  },
  {
    icon: "cash",
    title: "Prix et paiement à confirmer",
    text: "Les annonces indiquent un prix de présentation. Confirmez la disponibilité, le prix final et les modalités de paiement directement avec IG-MOTORS."
  },
  {
    icon: "pin",
    title: "Rendez-vous à Godomey",
    text: "Le showroom est situé non loin du CEG Godomey. Contactez l’équipe sur WhatsApp pour organiser une visite ou discuter d’un véhicule."
  }
];

/* ----------------------------------------------------------------------------
   4b. SERVICES DÉTAILLÉS (page Services)
   -------------------------------------------------------------------------- */
const SERVICES_PAGE = [
  { icon: "car", title: "Vente multimarque", text: "Parcourez les annonces et demandez les informations disponibles. Prix, état et disponibilité sont à confirmer avant tout déplacement." },
  { icon: "cash", title: "Proposer une reprise", text: "Décrivez votre véhicule, son historique connu, ses documents et votre prix souhaité via la fiche vendeur. Une estimation initiale ne vaut pas offre ferme." },
  { icon: "doc", title: "Modalités de paiement", text: "Contactez IG-MOTORS pour connaître les modalités applicables au véhicule choisi. Toute condition doit être confirmée par écrit avant accord." },
  { icon: "pin", title: "Recherche sur demande", text: "Vous cherchez un modèle absent du catalogue ? Indiquez votre marque, modèle et budget. La disponibilité et les délais seront confirmés au cas par cas." },
  { icon: "shield", title: "État et documents", text: "Demandez les renseignements et pièces disponibles sur le véhicule. Vérifiez les originaux et faites inspecter le véhicule avant la transaction." },
  { icon: "key", title: "Visite à Godomey", text: "Le showroom se trouve à Godomey, non loin du CEG Godomey. Écrivez sur WhatsApp pour convenir d’une visite et confirmer l’adresse." }
];

/* ----------------------------------------------------------------------------
   5. TÉMOIGNAGES (page d'accueil)
   -------------------------------------------------------------------------- */
const TESTIMONIALS = []; // Ajoutez ici de vrais avis clients avec leur autorisation.

/* ----------------------------------------------------------------------------
   6. MARQUES (bandeau défilant)
   -------------------------------------------------------------------------- */
const BRANDS = [
  "Toyota","Mercedes-Benz","BMW","Land Rover","Ford","Honda",
  "Hyundai","Kia","Nissan","Peugeot","Lexus","Audi"
];

/* ----------------------------------------------------------------------------
   7. TYPES DE VÉHICULES (page d'accueil + filtres du catalogue)
   -------------------------------------------------------------------------- */
const TYPES = [
  { key: "SUV",      label: "SUV",      desc: "Familiaux & polyvalents" },
  { key: "Berline",  label: "Berlines", desc: "Confort & élégance" },
  { key: "Pick-up",  label: "Pick-ups", desc: "Travail & aventure" },
  { key: "4x4",      label: "4x4",      desc: "Tout-terrain & prestige" }
];

/* ----------------------------------------------------------------------------
   8. ÉTAPES D'ACHAT (page Services)
   -------------------------------------------------------------------------- */
const STEPS = [
  { title: "Parcourez", text: "Consultez les fiches de présentation ou indiquez-nous le modèle que vous recherchez." },
  { title: "Contactez-nous", text: "Demandez le prix actuel, l’état, les documents disponibles et la disponibilité du véhicule." },
  { title: "Inspectez", text: "Convenez d’un rendez-vous à Godomey pour voir le véhicule et vérifier les documents." },
  { title: "Concluez", text: "Les conditions de paiement, de cession et de remise sont confirmées par écrit avec IG-MOTORS." }
];

/* ============================================================================
   9. STOCK DE VÉHICULES
   ----------------------------------------------------------------------------
   Chaque véhicule est un bloc { ... } — copiez-collez un bloc pour en ajouter.

   Champs :
   id          : nom unique sans espace ni accent (ex: "toyota-land-cruiser")
   brand/model : marque et modèle
   version     : finition (ex: "VX Twin Turbo")
   year        : année-modèle
   type        : "SUV" | "Berline" | "Pick-up" | "4x4" | "Utilitaire"
   fuel        : "Essence" | "Diesel" | "Hybride"
   gearbox     : "Automatique" | "Manuelle" | "CVT"
   mileage     : kilométrage affiché
   power       : puissance
   seats       : nombre de places
   color       : couleur
   price       : prix en FCFA (chiffres uniquement, sans espace)
   image       : photo principale
   badge       : "Nouveauté" | "Coup de cœur" | "Bon plan" | "Réservé" | null
   featured    : true = affiché sur la page d'accueil
   status      : "disponible" | "reserve" | "vendu"
   description : paragraphe de présentation
   features    : liste des équipements
   ========================================================================== */

const VEHICLES = [
  {
    id: "toyota-land-cruiser-300",
    brand: "Toyota",
    model: "Land Cruiser 300",
    version: "VX Twin Turbo · 7 places",
    year: 2024,
    type: "4x4",
    fuel: "Essence",
    gearbox: "Automatique",
    mileage: "12 000 km",
    power: "415 ch",
    seats: 7,
    color: "Blanc Nacré",
    price: 68000000,
    image: "assets/img/vehicles/land-cruiser.webp",
    badge: "Nouveauté",
    featured: true,
    status: "disponible",
    description:
      "Le Land Cruiser 300 VX est la référence absolue du tout-terrain de prestige. " +
      "Motorisation V6 bi-turbo de 415 ch, intérieur cuir pleine fleur, toit ouvrant, " +
      "et une capacité de remorquage hors pair. Ce véhicule est livré avec son carnet " +
      "d'entretien complet et ses documents douaniers en règle.",
    features: [
      "Cuir pleine fleur", "Toit ouvrant électrique", "Caméras 360°",
      "Régulateur adaptatif", "Sièges ventilés", "Attelage renforcé",
      "Suspensions pneumatiques", "Écran tactile 12,3\""
    ]
  },
  {
    id: "range-rover-sport-hse",
    brand: "Land Rover",
    model: "Range Rover Sport",
    version: "HSE Dynamic · 5 places",
    year: 2023,
    type: "SUV",
    fuel: "Essence",
    gearbox: "Automatique",
    mileage: "25 000 km",
    power: "400 ch",
    seats: 5,
    color: "Noir Santorini",
    price: 78000000,
    image: "assets/img/vehicles/range-rover-sport.png",
    badge: "Coup de cœur",
    featured: true,
    status: "disponible",
    description:
      "Alliance parfaite entre luxe britannique et sportivité. Le Range Rover Sport HSE Dynamic " +
      "offre un V8 suralimenté de 400 ch, des suspensions adaptatives et un habitacle d'exception. " +
      "Entretien réalisé en maison, pneus neufs.",
    features: [
      "V8 4.4L suralimenté", "Suspensions adaptatives", "Cuir semi-aniline",
      "Audio Meridian 3D", "Toit panoramique", "Affichage tête haute",
      "Régulateur adaptatif", "Ouverture sans clé"
    ]
  },
  {
    id: "mercedes-gle-450",
    brand: "Mercedes-Benz",
    model: "GLE 450",
    version: "4MATIC AMG Line · 7 places",
    year: 2023,
    type: "SUV",
    fuel: "Diesel",
    gearbox: "Automatique",
    mileage: "38 000 km",
    power: "367 ch",
    seats: 7,
    color: "Gris Sélénite",
    price: 52000000,
    image: "assets/img/vehicles/gle.jpg",
    badge: "Bon plan",
    featured: true,
    status: "disponible",
    description:
      "Le GLE 450 4MATIC conjugue raffinement allemand et capacités familiales avec ses 7 places. " +
      "Un seul propriétaire, entretien réseau Mercedes, intérieur quasi neuf. " +
      "Idéal pour les trajets quotidiens comme pour les longs parcours.",
    features: [
      "7 places configurables", "Transmission intégrale 4MATIC", "Cuir ARTICO",
      "Caméra 360°", "Régulateur adaptatif", "Éclairage Full LED",
      "Toit ouvrant", "2ᵉ rangée électrique"
    ]
  },
  {
    id: "bmw-x5-40i",
    brand: "BMW",
    model: "X5",
    version: "xDrive40i M Sport",
    year: 2023,
    type: "SUV",
    fuel: "Essence",
    gearbox: "Automatique",
    mileage: "22 000 km",
    power: "380 ch",
    seats: 5,
    color: "Blanc Minéral",
    price: 58000000,
    image: "assets/img/vehicles/bmw-x5.jpg",
    badge: "Nouveauté",
    featured: true,
    status: "disponible",
    description:
      "Le BMW X5 xDrive40i propose le meilleur compromis entre conduite sportive et confort quotidien. " +
      "Pack M, suspension pneumatique et sellerie cuir. Révision complète effectuée.",
    features: [
      "Pack M Sport", "Transmission intégrale", "Suspension pneumatique",
      "Cuir Vernasca", "Écran curved 14,9\"", "Harman Kardon",
      "Vitre teintée", "Caméras 360°"
    ]
  },
  {
    id: "toyota-camry-xse",
    brand: "Toyota",
    model: "Camry",
    version: "XSE V6 · 5 places",
    year: 2023,
    type: "Berline",
    fuel: "Essence",
    gearbox: "Automatique",
    mileage: "41 000 km",
    power: "301 ch",
    seats: 5,
    color: "Blanc Nacré",
    price: 24500000,
    image: "assets/img/vehicles/camry.jpg",
    badge: "Bon plan",
    featured: true,
    status: "disponible",
    description:
      "Berline américaine très recherchée au Bénin pour sa fiabilité et son confort. " +
      "Camry XSE V6, 301 ch, intérieur deux tons, équipement complet. " +
      "Carrosserie sans accident, historique d'entretien disponible.",
    features: [
      "V6 3.5L", "Intérieur deux tons", "Toit ouvrant",
      "Sièges chauffants", "Caméra de recul", "Régulateur adaptatif",
      "Apple CarPlay / Android Auto", "Jantes alliage 19\""
    ]
  },
  {
    id: "mercedes-classe-c-200",
    brand: "Mercedes-Benz",
    model: "Classe C",
    version: "200 Avantgarde",
    year: 2023,
    type: "Berline",
    fuel: "Essence",
    gearbox: "Automatique",
    mileage: "19 000 km",
    power: "204 ch",
    seats: 5,
    color: "Blanc Polaire",
    price: 32000000,
    image: "assets/img/vehicles/classe-c.jpg",
    badge: null,
    featured: false,
    status: "disponible",
    description:
      "La Classe C 200 Avantgarde dans sa dernière génération : habitacle numérique MBUX, " +
      "finitions irréprochables et consommation maîtrisée. Véhicule de direction, " +
      "entretien exclusif en réseau Mercedes-Benz.",
    features: [
      "Écran MBUX 11,9\"", "Pack Amg Line extérieur", "Cuir synthétique",
      "Caméra 360°", "Sièges à mémoire", "Régulateur adaptatif",
      "LED High Performance", "2ᵉ rangée rabattable"
    ]
  },
  {
    id: "toyota-corolla-lounge",
    brand: "Toyota",
    model: "Corolla",
    version: "1.8 Lounge",
    year: 2023,
    type: "Berline",
    fuel: "Essence",
    gearbox: "CVT",
    mileage: "45 000 km",
    power: "140 ch",
    seats: 5,
    color: "Gris Métallisé",
    price: 17500000,
    image: "assets/img/vehicles/corolla.jpg",
    badge: "Bon plan",
    featured: false,
    status: "disponible",
    description:
      "La Corolla 1.8 Lounge est le choix de la raison : consommation faible, entretien économique " +
      "et fiabilité légendaire. Parfaite pour un premier achat ou une utilisation professionnelle. " +
      "Véhicule non fumeur, pneus à 90 %.",
    features: [
      "Boîte CVT", "Caméra de recul", "Régulateur de vitesse",
      "Climatisation bi-zone", "Écran tactile 8\"", "Bluetooth / USB",
      "4 vitres électriques", "ABS + ESP"
    ]
  },
  {
    id: "honda-cr-v-hybrid",
    brand: "Honda",
    model: "CR-V",
    version: "e:HEV Executive · Hybride",
    year: 2023,
    type: "SUV",
    fuel: "Hybride",
    gearbox: "Automatique",
    mileage: "33 000 km",
    power: "184 ch",
    seats: 5,
    color: "Bleu Métallisé",
    price: 27000000,
    image: "assets/img/vehicles/cr-v.jpg",
    badge: "Nouveauté",
    featured: false,
    status: "disponible",
    description:
      "Le Honda CR-V e:HEV est un SUV hybride rechargeable à la conduite souple et silencieuse. " +
      "Consommation record en ville, habitacle spacieux et coffre généreux. " +
      "État et historique de batterie à confirmer lors de la visite.",
    features: [
      "Hybride e:HEV", "Boîte automatique", "Cuir / tissu",
      "Ouverture électrique du coffre", "Caméras 360°", "Régulateur adaptatif",
      "Apple CarPlay sans fil", "2ᵉ rangée coulissante"
    ]
  },
  {
    id: "kia-sportage-ex",
    brand: "Kia",
    model: "Sportage",
    version: "EX · 5 places",
    year: 2023,
    type: "SUV",
    fuel: "Essence",
    gearbox: "Automatique",
    mileage: "28 000 km",
    power: "180 ch",
    seats: 5,
    color: "Noir Ebène",
    price: 22000000,
    image: "assets/img/vehicles/sportage.jpg",
    badge: null,
    featured: false,
    status: "disponible",
    description:
      "Le Kia Sportage EX séduit par son design affirmé et son équipement généreux pour le prix. " +
      "Écran double incurvé et aides à la conduite ; équipements et éventuelles garanties à confirmer. " +
      "Excellente affaire sur le segment des SUV compacts.",
    features: [
      "Écran double 12,3\"", "Aide à la conduite", "Sièges chauffants",
      "Caméra 360°", "Régulateur adaptatif", "Hayon mains libres",
      "Apple CarPlay / Android Auto", "Jantes alliage 17\""
    ]
  },
  {
    id: "hyundai-ix35",
    brand: "Hyundai",
    model: "ix35",
    version: "1.7 CRDi · 5 places",
    year: 2016,
    type: "SUV",
    fuel: "Essence",
    gearbox: "Manuelle",
    mileage: "98 000 km",
    power: "165 ch",
    seats: 5,
    color: "Blanc",
    price: 12500000,
    image: "assets/img/vehicles/ix35.jpg",
    badge: "Petit budget",
    featured: false,
    status: "disponible",
    description:
      "Un SUV compact fiable à petit budget. Entretien suivi, distribution remplacée, " +
      "pneus récents. Ideal pour un premier véhicule ou une activité professionnelle. " +
      "Disponibilité et localisation à confirmer avec IG-MOTORS.",
    features: [
      "Boîte manuelle", "Climatisation", "Régulateur de vitesse",
      "Bluetooth / USB", "4 vitres électriques", "ABS + ESP",
      "Radar de recul", "Jantes alliage"
    ]
  },
  {
    id: "ford-ranger-wildtrak",
    brand: "Ford",
    model: "Ranger",
    version: "Wildtrak 3.0 V6 · 5 places",
    year: 2023,
    type: "Pick-up",
    fuel: "Diesel",
    gearbox: "Automatique",
    mileage: "26 000 km",
    power: "205 ch",
    seats: 5,
    color: "Orange Wildtrak",
    price: 38000000,
    image: "assets/img/vehicles/ranger.jpg",
    badge: "Coup de cœur",
    featured: true,
    status: "disponible",
    description:
      "Le Ford Ranger Wildtrak est le Pick-up de référence pour le travail et l'aventure. " +
      "V6 diesel 3.0 L, boîte automatique 10 rapports, quatre roues motrices et " +
      "benne renforcée. Véhicule de première main, contrôle complet effectué.",
    features: [
      "V6 3.0L Diesel", "Boîte automatique 10 rapports", "Transmission 4x4",
      "Différentiel arrière verrouillable", "Benne renforcée", "Attelage 3 500 kg",
      "Caméras 360°", "Écran tactile 12\""
    ]
  },
  {
    id: "toyota-hilux-gr-sport",
    brand: "Toyota",
    model: "Hilux",
    version: "GR Sport 2.8 · 5 places",
    year: 2023,
    type: "Pick-up",
    fuel: "Diesel",
    gearbox: "Automatique",
    mileage: "30 000 km",
    power: "204 ch",
    seats: 5,
    color: "Blanc",
    price: 26000000,
    image: "assets/img/vehicles/hilux.jpg",
    badge: null,
    featured: false,
    status: "reserve",
    description:
      "La Hilux GR Sport : robustesse légendaire et look sportif affirmé. " +
      "Diesel 2.8 L, 204 ch, transmission intégrale et intérieur amélioré. " +
      "Ce véhicule est actuellement réservé — contactez-nous pour un modèle équivalent.",
    features: [
      "Diesel 2.8L", "4x4 avec réducteur", "Boîte automatique",
      "Suspensions renforcées", "Attelage", "Caméra de recul",
      "Régulateur de vitesse", "Kit GR Sport"
    ]
  }
];

/* ============================================================================
   10. GALERIE PHOTOS PAR VÉHICULE (optionnel)
   Ajoutez ici des vues supplémentaires : { "id-du-vehicule": ["img1.jpg", ...] }
   Si rien n'est renseigné, seule la photo principale est affichée.
   ========================================================================== */
const GALLERIES = {
  // "toyota-land-cruiser-300": ["assets/img/vehicles/land-cruiser.webp"],
};

/* ============================================================================
   11. FAQ (page Services)
   ========================================================================== */
const FAQ = [
  { q: "Les annonces sont-elles toutes disponibles ?", a: "Les annonces et prix affichés sont à confirmer avec IG-MOTORS avant déplacement ou décision d’achat. Écrivez-nous sur WhatsApp pour vérifier le stock actuel." },
  { q: "Puis-je faire une demande pour un autre modèle ?", a: "Oui. Indiquez la marque, le modèle et votre budget dans le formulaire de contact ou par WhatsApp. La disponibilité et le délai seront confirmés au cas par cas." },
  { q: "Puis-je visiter ou inspecter un véhicule ?", a: "Contactez IG-MOTORS pour confirmer l’adresse précise et convenir d’un rendez-vous à Godomey. Vérifiez l’état du véhicule et les documents originaux avant la transaction." },
  { q: "IG-MOTORS reprend-il mon véhicule ?", a: "Vous pouvez transmettre les renseignements, l’état déclaré, les documents disponibles et le prix souhaité via la page « Vendre ». Toute proposition dépendra de l’inspection et de la vérification des pièces." }
];
