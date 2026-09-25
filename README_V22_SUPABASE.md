# Suivi Wagons FRET — V22 Supabase

Cette version remplace le stockage opérationnel local par Supabase.

## 1. Configuration
1. Ouvrir `supabase-config.js`.
2. Remplacer uniquement `REMPLACER_PAR_TA_SB_PUBLISHABLE_KEY` par la clé **Publishable** `sb_publishable_...` du projet Supabase.
3. Ne jamais mettre de `sb_secret_...` ou `service_role` dans ce fichier.

## 2. Base de données
La table `public.wagons` et ses règles RLS existent déjà dans le projet de test.
Exécuter une seule fois `SUPABASE_V22_MIGRATION.sql` pour ajouter les colonnes nécessaires à l'historique et activer Realtime.

## 3. Utilisateurs
Créer les utilisateurs dans Supabase → Authentication → Users. Le premier compte de test peut être utilisé pour vérifier la connexion.
Pour déclarer un compte Contrôleur dans l'interface, ajouter son adresse e-mail dans `controllerEmails` dans `supabase-config.js`.

## 4. Comportement
- Les visiteurs authentifiés consultent les trois périmètres : Beni Ansar, Selouane, Hassi Blal.
- Les saisies sont enregistrées dans la base centrale.
- Les téléphones rechargent les données depuis la base et écoutent les changements Realtime.
- Le stockage local ne sert qu'à conserver une sauvegarde JSON facultative ; il n'est plus la source de vérité.

## 5. Test à 2 téléphones
1. Déployer cette version.
2. Se connecter sur téléphone 1 avec le compte visiteur01.
3. Saisir un wagon de test.
4. Ouvrir l'application sur téléphone 2 et se connecter avec un second compte.
5. Vérifier que le wagon apparaît dans Situation.
