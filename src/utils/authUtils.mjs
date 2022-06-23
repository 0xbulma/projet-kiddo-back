import * as constants from './constant.mjs';
import UserRepository from '../config/mongo/repository/UserRepository.mjs';

export function isConfirmedUser(id, req) {
  const user = new UserRepository().getById(id);
  const userToken = user.token;

  return getCookieToken(req) === userToken && user.rank === constants.RANKS_VALUES.CONFIRMED_USER;
}

export function isModerator(id, req) {
  const user = new UserRepository().getById(id);
  const userToken = user.token;

  return getCookieToken(req) === userToken && user.rank === constants.RANKS_VALUES.MODERATOR;
}

export function isAdmin(id, req) {
  const user = new UserRepository().getById(id);
  const userToken = user.token;

  return getCookieToken(req) === userToken && user.rank === constants.RANKS_VALUES.ADMINISTRATOR;
}

export function getCookieToken(req) {
  const cookieToken = constants.getRequestCookies(req)['authorization'];
  const authCookieToken = cookieToken && cookieToken.split(' ')[1];

  if (authCookieToken == null) return 'THROW ERROR';

  jwt.verify(authCookieToken, process.env.JWT_TOKEN_SECRET, (err, result) => {
    if (err) return null;
    else return authCookieToken;
  });
}
