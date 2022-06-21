//Mongoose : Nom des tables pour les liaisons entre les schémas.
export const COLLECTION_NAME = {
  user: 'User',
  event: 'Event',
  article: 'Article',
  category: 'Category',
  restriction: 'Restriction',
  badge: 'Badge',
};

//Enumération des valeurs pré définis.
export const RANKS_VALUES = ['USER', 'CONFIRMED_USER', 'MODERATOR', 'ADMINISTRATOR'];
export const STATUS_VALUES = ['DRAFTED', 'UNLISTED', 'PUBLIC', 'DELETED'];
export const REACTIONS_VALUES = ['LIKE', 'LOVE'];
export const GENDER_VALUES = ['MALE', 'FEMALE', 'UNKNOWN'];
export const SIGNALMENTS_VALUES = [
  'Sexuellement suggestif',
  'Violence',
  'Harcélement',
  'Fausses informations',
  'Contenu indésirable',
  'Ventes non autorisées',
  'Discours haineux',
  'Autre chose',
];
