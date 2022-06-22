//Mongoose : Nom des tables pour les liaisons entre les schémas.
export const COLLECTION_NAME = {
  user: 'User',
  event: 'Event',
  article: 'Article',
  category: 'Category',
  restriction: 'Restriction',
  badge: 'Badge',
  signalment: 'Signalment',
  reaction: 'Reaction',
};

//Enumération des valeurs pré définis.
export const ENUM_RANKS = ['USER', 'CONFIRMED_USER', 'MODERATOR', 'ADMINISTRATOR'];

export const ENUM_STATUS = ['DRAFTED', 'UNLISTED', 'PUBLIC', 'DELETED'];

export const ENUM_REACTIONS = ['LIKE', 'LOVE'];

export const ENUM_GENDER = ['MALE', 'FEMALE', 'UNKNOWN'];

export const ENUM_SIGNALMENTS = ['NUDITY', 'VIOLENCE', 'HARASSMENT', 'WRONG_NEWS', 'SPAM', 'ILLEGAL_SALE', 'HATE_SPEECH', 'OTHER'];

export const ENUM_COMMENT_TYPE = [
  'USER',
  'EVENT' 
]
 
// Valeurs des énumerations
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
