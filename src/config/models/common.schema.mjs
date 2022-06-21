import * as check from 'validator';

import constants from '../../utils/constant';

export const SCHEMA_OPTIONS = (withTimestamp) => {
  return withTimestamp
    ? { versionKey: false, timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
    : { versionKey: false };
};

export const REACTION = {
  reaction_type: { type: String, enum: constants.REACTIONS_VALUES },
  sender_id: { type: objectID, ref: constants.COLLECTION_NAME.user },
};

export const SIGNALMENT = {
  type: { type: String, enum: constants.SIGNALMENTS_VALUES },
  sender_id: { type: mongoose.Schema.Types.ObjectId, ref: constants.COLLECTION_NAME.user },
  signaled_at: { type: Date, default: Date.now },
};

export const CONTENT_MEDIA = {
  banner_url: {
    type: String,
    validate: {
      validator: function (value) {
        return check.isURL(value);
      },
      message: (props) => `${props.value} n'est pas une url valide!`,
    },
  },
  photo_url: [
    {
      type: String,
      validate: {
        validator: function (value) {
          return check.isURL(value);
        },
        message: (props) => `${props.value} n'est pas une url valide!`,
      },
    },
  ],
  photo_main_url: {
    type: String,
    validate: {
      validator: function (value) {
        return check.isURL(value);
      },
      message: (props) => `${props.value} n'est pas une url valide!`,
    },
  },
  video_url: {
    type: String,
    validate: {
      validator: function (value) {
        return check.isURL(value);
      },
      message: (props) => `${props.value} n'est pas une url valide!`,
    },
  },
};

export const COMMENT = {
  _id: { type: String },
  child_id: { type: String },
  sender_id: { type: mongoose.Schema.Types.ObjectId, ref: constants.COLLECTION_NAME.user },
  created_at: { type: Date, default: Date.now },
  modified_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: Date.now },
  event_review: { type: Boolean, default: false },
  content: {
    title: { type: String },
    message: { type: String },
    photos_url: [
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
  reactions: [REACTION],
  pinned: { type: Boolean, default: false },
  signalments: [SIGNALMENT],
};
