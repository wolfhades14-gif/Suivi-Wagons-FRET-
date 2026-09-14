# Suivi Wagons Charbon — V3 pilote TMN

Fichiers préparés pour publier l'application comme PWA puis la transformer en APK.

## Contenu
- index.html : application mobile
- manifest.json : configuration PWA
- sw.js : service worker / fonctionnement hors connexion
- icon-192.png : icône 192x192
- icon-512.png : icône 512x512
- icon-512-maskable.png : icône Android maskable

## Important
La version actuelle conserve les données dans le navigateur/appareil (localStorage). Elle ne synchronise pas les données entre téléphones. Pour l'essai TMN, ne publier que des données autorisées et valider le mode d'hébergement avant d'utiliser des données opérationnelles réelles.

## Étape suivante
1. Mettre ces fichiers dans un dépôt GitHub public ou privé selon les règles de l'organisation.
2. Activer GitHub Pages (HTTPS).
3. Ouvrir l'adresse Pages sur Android et tester l'installation PWA.
4. Une fois le site stable, utiliser PWABuilder pour générer le package Android/APK.
5. L'assetlinks.json sera à ajouter si la configuration Android/TWA retenue l'exige ; il doit être généré avec les informations du package Android et du certificat, donc il ne peut pas être correctement inventé à l'avance.
