import bcrypt from 'bcryptjs';

import UserRepository from '../../../mongo/repository/UserRepository.mjs';
import sendEmail from '../../../../utils/sendEmail.mjs';

import * as constants from '../../../../utils/constant.mjs';

const userRepository = new UserRepository();

export const RECOVER_PASSWORD = async (parent, { email }, ctx) => {
  const resetPasswordToken = {
    token: constants.GENERATE_UUID,
    created_at: Date.now(),
  };

  const user = await userRepository.getByEmail(email);
  if (user === null) return Error('User not found!');

  const modifiedUser = await userRepository.modifyUser(user._id, {
    reset_password_token: resetPasswordToken,
  });

  //Envoi d'un mail avec lien de récupération
  try {
    await sendEmail(resetPasswordToken.token, 'test@email.com');
  } catch (err) {
    console.log(err);
  }

  // Fin de l'envoi d'email

  return modifiedUser;
};

export const RESET_PASSWORD = async (
  parent,
  { _id, email, token, password }
) => {
  const user = await userRepository.getById(_id);
  if (user === null) return Error('User not found!');

  if (user.reset_password_token.token === token && user.email === email) {
    const tokenCreatedAt = new Date(
      user.reset_password_token.created_at
    ).getTime();
    const tokenValidity = Date.now() - tokenCreatedAt;

    if (tokenValidity > constants.TOKEN_VALIDITY_TIME) {
      user.reset_password_token = null;
      return Error('Token invalide !');
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    user.password = hash;
    user.reset_password_token = [];

    const modifiedUser = await userRepository.modifyUser(_id, user);
    return modifiedUser;
  } else {
    return Error('Token incorrecte !');
  }
};
