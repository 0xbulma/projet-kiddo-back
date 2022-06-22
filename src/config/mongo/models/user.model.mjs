import mongoose from 'mongoose';
import { default as check } from 'validator';

import * as constants from '../../../utils/constant.mjs';
import * as commonSchema from './common.schema.mjs';

const schemaOptions = commonSchema.SCHEMA_OPTIONS(true);

const EventSchema = new mongoose.Schema(
  {
    rank: { type: String, enum: constants.RANKS_VALUES, default: constants.RANKS_VALUES.USER },
    connection_history: [
      {
        ip: {
          type: String,
          required: [true, 'IP address required'],
          validate: {
            validator: (value) => check.isIP(value),
            message: (props) => `${props.value} is not a valid IP address!`,
          },
        },
        date: { type: Date, default: Date.now },
      },
    ],
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
          validate: {
            validator: (value) => check.isURL(value),
            message: (props) => `${props.value} n'est pas une URL valide!`,
          },
        },
      ],
      thumbnail: [
        {
          type: String,
          validate: {
            validator: (value) => check.isURL(value),
            message: (props) => `${props.value} n'est pas une URL valide!`,
          },
        },
      ],
    },

    description: { type: String },
    children: [
      {
        name: { type: String },
        gender: {
          type: String,
          enum: constants.GENDER_VALUES,
          default: constants.GENDER_VALUES.UNKNOWN,
        },
        age: { type: Number, default: 0, min: [0, 'doit être supérieur à 0'] },
      },
    ],
    is_available: { type: Boolean },

    friends_send_request: [
      {
        user_id: commonSchema.OBJECT_ID_REF_USER,
        invited_at: { type: Date, default: Date.now },
      },
    ],

    friends_receive_request: [
      {
        user_id: commonSchema.OBJECT_ID_REF_USER,
        invited_at: { type: Date, default: Date.now },
      },
    ],

    friends: [
      {
        user_id: commonSchema.OBJECT_ID_REF_USER,
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

    comments: [commonSchema.COMMENT],
  },
  schemaOptions
);

export default mongoose.model('User', EventSchema, 'Users');
