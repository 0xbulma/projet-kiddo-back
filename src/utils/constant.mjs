//Mongoose : Nom des tables pour les liaisons entre les schémas.
export const COLLECTION_NAME = {
  USER: 'User',
  EVENT: 'Event',
  ARTICLE: 'Article',
  CATEGORY: 'Category',
  RESTRICTION: 'Restriction',
  BADGE: 'Badge',
  SIGNLAMENT: 'Signalment',
  REACTION: 'Reaction',
};

//Enumération des valeurs pré définis.
export const RANKS_VALUES = {
  USER: 'Utilisateur',
  CONFIRMED_USER: 'Utilisateur confirmé',
  MODERATOR: 'Modérateur',
  ADMINISTRATOR: 'Administrateur',
};

export const GENDER_VALUES = {
  MALE: 'Masculin',
  FEMALE: 'Féminin',
  UNKNOWN: 'Non renseigné',
};

export const STATUS_VALUES = {
  DRAFTED: 'Brouillon',
  PUBLISHED: 'Publié',
  UNLISTED: 'Non répertorié',
  PUBLIC: 'Publique',
};

export const COMMENT_TYPE = {
  USER: 'Utilisateur',
  EVENT: 'Événement',
};

export const SIGNALMENTS_VALUES = [
  { type: 'NUDITY', description: 'Sexuellement suggestif' },
  { type: 'VIOLENCE', description: 'Violence' },
  { type: 'HARASSMENT', description: 'Harcélement' },
  { type: 'WRONG_NEWS', description: 'Fausses informations' },
  { type: 'SPAM', description: 'Contenu indésirable' },
  { type: 'ILLEGAL_SALE', description: 'Ventes non autorisées' },
  { type: 'HATE_SPEECH', description: 'Discours haineux' },
  { type: 'OTHER', description: 'Autre chose' },
];
