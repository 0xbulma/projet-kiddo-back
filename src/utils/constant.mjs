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
  USER: 'USER',
  CONFIRMED_USER: 'CONFIRMED_USER',
  MODERATOR: 'MODERATOR',
  ADMINISTRATOR: 'ADMINISTRATOR',
};

export const GENDER_VALUES = {
  Male: 'Male',
  Female: 'Female',
  UNKNOWN: 'UNKNOWN',
};

export const STATUS_VALUES = {
  DRAFTED: 'DRAFTED',
  PUBLISHED: 'PUBLISHED',
  UNLISTED: 'UNLISTED',
  PUBLIC: 'PUBLIC',
  CANCELED: 'CANCELED',
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
