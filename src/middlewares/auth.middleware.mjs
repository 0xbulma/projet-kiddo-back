export function requireAuth(req, res, next) {
  if (getCookieToken(req, res) != null) next();
  else return 'ERROR';
}

export function isConfirmedUser(id, req, res) {
  const user = getById(id);
  const userToken = user.token;

  if (getCookieToken(req, res) === userToken && user.rank === constant.RANKS_VALUES.CONFIRMED_USER) {
    return true;
  }

  return false;
}

export function isModerator(id, req, res) {
  const user = getById(id);
  const userToken = user.token;

  if (getCookieToken(req, res) === userToken && user.rank === constant.RANKS_VALUES.MODERATOR) {
    return true;
  }

  return false;
}

export function isAdmin(id, req, res) {
  const user = getById(id);
  const userToken = user.token;

  if (getCookieToken(req, res) === userToken && user.rank === constant.RANKS_VALUES.ADMINISTRATOR) {
    return true;
  }

  return false;
}

export function getCookieToken(req, res) {
  const cookieToken = constant.getRequestCookies(req)['authorization'];
  const authCookieToken = cookieToken && cookieToken.split(' ')[1];

  if (authCookieToken == null) return null;

  jwt.verify(authCookieToken, process.env.JWT_TOKEN_SECRET, (err, result) => {
    if (err) return null;
    else return authCookieToken;
  });
}
