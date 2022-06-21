import { DateTime } from "graphql-scalars/mocks";
import mongoose, { Mongoose } from "mongoose";
import * as check from "validator";

const schemaOptions = {
  versionKey: false,
  timestamps: { created_at: "created_at", updated_at: "updtaed_at" },
};

const EventSchema = new mongoose.Schema(
  {
    rank_id: { type: Number },
    connection_history: [
      {
        ip: {
          type: String,
          required: [true, "IP address required"],
          validate: {
            validator: function (v) {
              return /^(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
                v
              );
            },
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
        validator: function (value) {
          return check.isEmail(value);
        },
      },
      message: (props) => `${props.value} n'est pas un email valide`,
    },

    password: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return check.isHash(value);
        },
      },
      // message: props => `${props.value}`
      message: "le mot de passe n'est pas valable",
    },
    oAuth_link: [
      // A check nature du Oauth (link ou id)
      {
        type: String,
        validate: {
          validator: function (value) {
            return check.isURL(value);
          },
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
        validator: function (value) {
          return check.isMobilePhone(value);
        },
      },
      message: (props) =>
        `${props.value} n'est pas un numéro de téléphone valable`,
    },

    adress: {
      city: { type: String },
      zip_code: {
        type: Number,
        validate: {
          validator: function (value) {
            return check.isPostalCode(value);
          },
        },
        message: (props) => `${props.value} n'est pas un code postal valable`,
      },
      adress_line: { type: String },
      adress_line_2: { type: String },
    },
    gps: {
      lat: {
        type: Number,
        validate: {
          validator: function (value) {
            return check.isLatLong(value);
          },
          message: (props) => `${props.value} n'est pas une latitude valide!`,
        },
      },
      lng: {
        type: Number,
        validate: {
          validator: function (value) {
            return check.isLatLong(value);
          },
          message: (props) => `${props.value} n'est pas une longitude valide!`,
        },
      },
    },
    profil_picture: {
      hd: [
        {
          type: String,
          validate: {
            validator: function (value) {
              return check.isURL(value);
            },
            message: (props) => `${props.value} n'est pas une URL valide!`,
          },
        },
      ],
      thumbnail: [
        {
          type: String,
          validate: {
            validator: function (value) {
              return check.isURL(value);
            },
            message: (props) => `${props.value} n'est pas une URL valide!`,
          },
        },
      ],
    },

    description: { type: String },
    children: [
      {
        name: { type: String },
        // ____TODO  ajouter la constante gender enum
        gender: { type: String, enum: ["toto"] },
        age: { type: Number, default: 0, min: [0, "doit être supérieur à 0"] },
      },
    ],
    is_available: { type: Boolean },

    friends_send_request: [
      {
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        invited_at: { type: Date, default: Date.now },
      },
    ],

    friends_receive_request: [
      {
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        invited_at: { type: Date, default: Date.now },
      },
    ],

    friends: [
      {
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        accepted_at: { type: Date, default: Date.now },
      },
    ],

    badges: [
      {
        badge_id: { type: mongoose.Schema.Types.ObjectId, ref: "Badge" },
        unlocked_at: { type: Date, default: Date.now },
      },
    ],

    pinned_events: [
      {
        event_id: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
        pinned_at: { type: Date, default: Date.now },
      },
    ],

    booked_events: [
      {
        event_id: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
        booked_at: { type: Date, default: Date.now },
      },
    ],

    finished_events: [
      {
        event_id: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
        booked_at: { type: Date, default: Date.now },
        canceled_at: { type: Date, default: Date.now },
        started_at: { type: Date, default: Date.now },
        finished_at: { type: Date, default: Date.now },
      },
    ],

    // ____TODO  appliquer les constante aux trois dernières
    signalments: [Signaled],
    reactions: [Reaction],

    comments: [Comment],
  },
  schemaOptions
);

export default mongoose.model("User", EventSchema, "Users");
