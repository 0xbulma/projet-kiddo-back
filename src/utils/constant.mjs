import crypto from 'crypto';

//Mongoose : Nom des tables pour les liaisons entre les schémas.
export const COLLECTION_NAME = {
  USER: 'User',
  EVENT: 'Event',
  ARTICLE: 'Article',
  COMMENT: 'Comment',
  CATEGORY: 'Category',
  RESTRICTION: 'Restriction',
  BADGE: 'Badge',
  SIGNALEMENT: 'Signalment',
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
  CANCELED: 'Annulé',
};

// Tools
export const GENERATE_UUID = crypto.randomUUID();

export function getRequestCookies(req) {
  const list = [];
  const cookieHeader = req.headers?.cookie;
  if (!cookieHeader) return list;

  cookieHeader.split(`;`).forEach(function (cookie) {
    let [name, ...rest] = cookie.split(`=`);
    name = name?.trim();
    if (!name) return;
    const value = rest.join(`=`).trim();
    if (!value) return;
    list[name] = decodeURIComponent(value);
  });

  return list;
}

export const TOKEN_VALIDITY_TIME = 3000 * 60 * 1000;
