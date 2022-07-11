import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';

import UserRepository from '../../../mongo/repository/UserRepository.mjs';
import EventRepository from '../../../mongo/repository/EventRepository.mjs';

import * as friendResolver from './user.friend.resolvers.mjs';
import * as passwordResolver from './user.password.resolvers.mjs';
import * as connectionResolver from './user.connection.resolvers.mjs';
import userModel from '../../../mongo/models/user.model.mjs';

import { getUserByCookieToken } from '../../../../utils/authUtils.mjs';

const userRepository = new UserRepository();
const eventRepository = new EventRepository();

export default {
  Query: {
    getUserById: (parent, { _id }) => userRepository.getById(_id),
    getUserByEmail: (parent, { email }, { res, req }) => userRepository.getByEmail(email),
    users: () => userRepository.getAll(),
    connectUser: connectionResolver.USER_CONNECTION,
    disconnectUser: connectionResolver.DISCONNECT_USER,
    checkToken: async (parent, args, ctx, info) => {
      const result = getUserByCookieToken(ctx.req);
      if (!result) {
        return new GraphQLError("Aucun token enregistré sur le navigateur pour l'auto connexion");
      }
      if (result) {
        const user = await userRepository.getById(result);
        if (user === null) {
          // Utilitaire de suppression de Cookie si l'utilisateur n'existe pas/plus (Bannissement / Suppression de compte etc...)
          const cookie_options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'PROD',
            maxAge: 1,
          };
          ctx.res.cookie('authorization', 'Bearer ' + result, cookie_options);
          return new GraphQLError('Utiliateur introuvable !');
        }
        return user;
      }
    },
  },

  Mutation: {
    createUser: async (parent, { input }, { res }, info) => {
      let email = input.email;

      const existingUser = await userRepository.getByEmail(email);
      if (existingUser) return new GraphQLError('Adresse email déjà utilisé !');

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(input.password, salt);

      const user = await userModel.create({ email: email, password: hash });

      jwt.sign({ _id: user._id, email }, process.env.JWT_TOKEN_SECRET, { expiresIn: 1000 * 60 * 60 * 24 * 7 });
      const cookie_options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'PROD',
        maxAge: 1000 * 60 * 60 * 24 * 7, //Store for 7 days
      };
      res.cookie('authorization', 'Bearer ' + token, cookie_options);

      return user;
    },
    modifyUser: (parent, { _id, input }) => userRepository.modifyUser(_id, input),
    removeUser: (parent, { _id }) => userRepository.removeUser(_id),
    bookEvent: async (parent, { _id, eventId, bookedAt }) => {
      const user = await userRepository.getById(_id);
      const bookedEvents = user.booked_events;

      const event = await eventRepository.getEventById(eventId);

      let isAlreadyBooked = false;
      bookedEvents.map((bookedEvent) => {
        if (bookedEvent._id.equals(event._id)) isAlreadyBooked = true;
      });

      if (isAlreadyBooked) {
        return userRepository.modifyUser({ _id }, { bookedEvent: bookedEvents.filter((e) => e._id !== event._id) });
      }

      bookedEvents.push({ event, booked_at: bookedAt });
      return userRepository.modifyUser({ _id }, { booked_events: bookedEvents });
    },
    pinnedEvent: async (parent, { _id, eventId, pinnedAt }) => {
      const user = await userRepository.getById(_id);
      const pinnedEvents = user.pinned_events;

      const event = await eventRepository.getEventById(eventId);

      let isAlreadyPinned = false;
      pinnedEvents.map((pinnedEvent) => {
        if (pinnedEvent._id.equals(event._id)) isAlreadyPinned = true;
      });

      if (isAlreadyPinned) {
        return userRepository.modifyUser({ _id }, { pinned_events: pinnedEvents.filter((e) => e._id !== event._id) });
      }

      pinnedEvents.push({ event, pinned_at: pinnedAt });
      return userRepository.modifyUser({ _id }, { pinned_events: pinnedEvents });
    },

    // Password system
    recoverPassword: passwordResolver.RECOVER_PASSWORD,
    resetPassword: passwordResolver.RESET_PASSWORD,

    // Friend system
    sendFriendRequest: friendResolver.SEND_FRIEND_REQUEST_SECTION,
  },
};
