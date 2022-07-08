import mongoose from 'mongoose';
import { default as check } from 'validator';

import CommentRepository from '../repository/CommentRepository.mjs';
import UserRepository from '../repository/UserRepository.mjs';
import EventRepository from '../repository/EventRepository.mjs';

import * as constants from '../../../utils/constant.mjs';
import * as commonSchema from './common.schema.mjs';

const schemaOptions = commonSchema.SCHEMA_OPTIONS(true);

export const UserSchema = new mongoose.Schema(
  {
    rank: {
      type: String,
      enum: constants.RANKS_VALUES,
      default: constants.RANKS_VALUES.USER,
    },
    connection_history: [
      {
        ip: {
          type: String,
          required: [true, 'IP adress required'],
          validate: {
            validator: (value) => check.isIP(value),
            message: (props) => `${props.value} is not a valid IP adress!`,
          },
        },
        date: { type: Date, default: Date.now },
      },
    ],
    token: { type: String },
    email: {
      type: String,
      required: true,
      validate: {
        validator: (value) => check.isEmail(value),
        message: (props) => `${props.value} n'est pas un email valide`,
      },
    },

    password: {
      type: String,
      required: true,
      // validate: {
      //   validator: (value) => check.isHash(value),
      //   message: "le mot de passe n'est pas valable",
      // },
    },
    reset_password_token: { token: { type: String }, created_at: { type: Date, default: Date.now } },
    oAuth_link: [
      // A check nature du Oauth (link ou id)
      {
        type: String,
        validate: {
          validator: (value) => check.isURL(value),
          message: (props) => `${props.value} n'est pas une URL valide!`,
        },
      },
    ],

    pseudo: { type: String },
    first_name: { type: String },
    last_name: { type: String },
    birthdate: { type: Date },

    phone: {
      type: Number,
      validate: {
        validator: (value) => check.isMobilePhone(value),
        message: (props) => `${props.value} n'est pas un numéro de téléphone valable`,
      },
    },

    adress: {
      city: { type: String },
      zip_code: {
        type: Number,
        validate: {
          validator: (value) => check.isPostalCode(value),
          message: (props) => `${props.value} n'est pas un code postal valable`,
        },
      },
      adress_line: { type: String },
      adress_line_2: { type: String },
    },
    gps: {
      lat: {
        type: Number,
        validate: {
          validator: (value) => check.isLatLong(value),
          message: (props) => `${props.value} n'est pas une latitude valide!`,
        },
      },
      lng: {
        type: Number,
        validate: {
          validator: (value) => check.isLatLong(value),
          message: (props) => `${props.value} n'est pas une longitude valide!`,
        },
      },
    },
    profil_picture: {
      hd: [
        {
          type: String,
          // validate: {
          //   validator: (value) => check.isURL(value),
          //   message: (props) => `${props.value} n'est pas une URL valide!`,
          // },
        },
      ],
      thumbnail: [
        {
          type: String,
          // validate: {
          //   validator: (value) => check.isURL(value),
          //   message: (props) => `${props.value} n'est pas une URL valide!`,
          // },
        },
      ],
    },

    description: { type: String },
    children: [
      {
        name: { type: String },
        gender: { type: String },
        age: { type: Date },
      },
    ],
    is_available: { type: Boolean },

    friends_send_request: [
      {
        user: commonSchema.OBJECT_ID_REF_USER,
        invited_at: { type: Date, default: Date.now },
      },
    ],

    friends_receive_request: [
      {
        user: commonSchema.OBJECT_ID_REF_USER,
        invited_at: { type: Date, default: Date.now },
      },
    ],

    friends: [
      {
        user: commonSchema.OBJECT_ID_REF_USER,
        accepted_at: { type: Date, default: Date.now },
      },
    ],

    badges: [
      {
        badge_id: commonSchema.OBJECT_ID_REF_BADGE,
        unlocked_at: { type: Date, default: Date.now },
      },
    ],

    pinned_events: [
      {
        event_id: commonSchema.OBJECT_ID_REF_EVENT,
        pinned_at: { type: Date, default: Date.now },
      },
    ],

    booked_events: [
      {
        event_id: commonSchema.OBJECT_ID_REF_EVENT,
        booked_at: { type: Date, default: Date.now },
      },
    ],

    finished_events: [
      {
        event_id: commonSchema.OBJECT_ID_REF_EVENT,
        booked_at: { type: Date, default: Date.now },
        canceled_at: { type: Date, default: Date.now },
        started_at: { type: Date, default: Date.now },
        finished_at: { type: Date, default: Date.now },
      },
    ],

    signalments: [commonSchema.SIGNALMENT],
    reactions: [commonSchema.REACTION],

    comments: [commonSchema.OBJECT_ID_REF_COMMENT],
  },
  schemaOptions
);

// TODO: CASCADE SUR LES ARTICLES

// CASCADE A LA SUPPRESSION D'UN UTILISATEUR //
UserSchema.post('findOneAndRemove', async (doc, next) => {
  const userRepository = new UserRepository();
  const eventRepository = new EventRepository();

  // CASCADE SUR LE SYSTEME D'AMIS
  if (doc.friends_send_request) {
    const otherUsers = await userRepository.getAllbyIds(doc.friends_send_request.map((obj) => obj.user_id));

    if (otherUsers) {
      for (const user of otherUsers) {
        await user.modifyUser(
          { _id: user._id },
          {
            friends_receive_request: user.friends_receive_request.filter((obj) => obj.user_id !== doc._id),
          }
        );
      }
    }
  }

  if (doc.friends_receive_request) {
    const otherUsers = await userRepository.getAllbyIds(doc.friends_receive_request.map((obj) => obj.user_id));

    if (otherUsers) {
      for (const user of otherUsers) {
        await user.modifyUser(
          { _id: user._id },
          {
            friends_send_request: user.friends_send_request.filter((obj) => obj.user_id !== doc._id),
          }
        );
      }
    }
  }

  if (doc.friends) {
    const otherUsers = await userRepository.getAllbyIds(doc.friends.map((obj) => obj.user_id));

    if (otherUsers) {
      for (const user of otherUsers) {
        await user.modifyUser(
          { _id: user._id },
          {
            friends: user.friends.filter((obj) => obj.user_id !== doc._id),
          }
        );
      }
    }
  }

  // CASCADE SUR LES EVENTS
  if (doc.booked_events) {
    const events = await eventRepository.getAllbyIds(doc.booked_events.map((obj) => obj.event_id));

    if (events) {
      for (const event of events) {
        if (event.main_owner === doc._id) {
          await event.removeEvent({ _id: doc._id });
        } else {
          await event.modifyEvent(
            { _id: event._id },
            {
              group_participants: event.group_participants.filter((obj) => obj.user_id !== doc._id),
              co_owners: event.co_owners.filter((obj) => obj.user_id !== doc._id),
            }
          );
        }
      }
    }
  }

  if (doc.finished_events) {
    const events = await eventRepository.getAllbyIds(doc.finished_events.map((obj) => obj.event_id));

    if (events) {
      for (const event of events) {
        await event.modifyEvent(
          { _id: event._id },
          {
            group_participants: event.group_participants.filter((obj) => obj.user_id !== doc._id),
            co_owners: event.co_owners.filter((obj) => obj.user_id !== doc._id),
          }
        );
      }
    }
  }

  // CASCADE SUR LES COMMENTS
  if (doc.comments) {
    await new CommentRepository().removeComments(doc.comments);
  }

  next();
});

export default mongoose.model('User', UserSchema, 'Users');
