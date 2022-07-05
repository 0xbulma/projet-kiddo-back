import mongoose from 'mongoose';
import { default as check } from 'validator';

import CommentRepository from '../repository/CommentRepository.mjs';
import UserRepository from '../repository/UserRepository.mjs';

import * as constants from '../../../utils/constant.mjs';
import * as commonSchema from './common.schema.mjs';

const ERROR_MESSAGE = {
  title: 'Title is required',
};

const schemaOptions = commonSchema.SCHEMA_OPTIONS(true);

const EventSchema = new mongoose.Schema(
  {
    drafted_at: { type: Number, default: Date.now() },
    published_at: { type: Number },
    main_owner: commonSchema.OBJECT_ID_REF_USER,
    co_owners: [commonSchema.OBJECT_ID_REF_USER],
    content: {
      title: {
        type: String,
        required: [true, ERROR_MESSAGE.title],
      },
      subtitle: { type: String },
      description: { type: String },
      highlighted_message: [
        {
          title: { type: String },
          message: { type: String },
        },
      ],
    },
    content_media: commonSchema.CONTENT_MEDIA,
    group_size: { type: Number, default: 0 },
    minChildAge: {
      type: Number,
      min: [0, "L'âge de l'enfant ne peut être inférieur à 0"],
    },
    maxChildAge: {
      type: Number,
      max: [12, "l'âge de l'enfant ne peut être supérieur à 12ans"],
    },
    group_participants: [
      {
        user: commonSchema.OBJECT_ID_REF_USER,
        booked_at: { type: Number, default: Date.now() },
        group_detail: [
          {
            isChild: { type: Boolean, default: false },
            name: { type: String },
            age: { type: Number, default: 0, min: [0, 'Age invalide'] },
          },
        ],
      },
    ],
    price: {
      child: { type: Number, default: 0 },
      adult: { type: Number, default: 0 },
    },
    event_date: {
      start: { type: Number },
      end: { type: Number },
    },
    status: {
      type: String,
      enum: constants.STATUS_VALUES,
      default: constants.STATUS_VALUES.DRAFTED,
      index: 'text',
    },
    adress: {
      city: { type: String },
      zip_code: {
        type: String,
        validate: {
          validator: (value) => check.isPostalCode(value, any),
          message: (props) => `${props.value} n'est pas un code postal valide!`,
        },
      },
      adress_line: { type: String },
      adress_line_2: { type: String },
    },
    gps: {
      type: [Number],
      default: [0, 0],
      index: '2dsphere',
    },
    filters: [{ type: String, index: 'text' }],
    categories: commonSchema.OBJECT_ID_REF_CATEGORY,
    restrictions: [commonSchema.OBJECT_ID_REF_RESTRICTION],

    highlighted: { type: Boolean, default: false },

    signalments: [commonSchema.SIGNALMENT],
    reactions: [commonSchema.REACTION],
    comments: [commonSchema.OBJECT_ID_REF_COMMENT],
  },
  schemaOptions
);

//2Dindex
EventSchema.index({
  gps: '2dsphere',
  filters: 'text',
  status: 'text',
});

// TODO: CASCADE SUR LES ARTICLES

// CASCADE A LA SUPPRESSION D'UN EVENT //
EventSchema.post('findOneAndRemove', async (doc, next) => {
  const userRepository = new UserRepository();

  const modifyUserEvent = async (user) => {
    await user.modifyUser(
      { _id: user._id },
      {
        booked_events: user.booked_events.filter((obj) => obj.event_id !== doc._id),
        finished_events: user.finished_events.filter((obj) => obj.event_id !== doc._id),
        pinned_events: user.pinned_events.filter((obj) => obj.event_id !== doc._id),
      }
    );
  };

  // CASCADE SUR LES USERS
  if (doc.main_owner) {
    const user = await userRepository.getbyId({ _id: doc.main_owner });
    if (user) {
      await modifyUserEvent(user);
    }
  }

  if (doc.co_owners) {
    const users = await userRepository.getAllbyIds(doc.co_owners);
    if (users) {
      for (const user of users) {
        await modifyUserEvent(user);
      }
    }
  }

  if (doc.group_participants) {
    const users = await userRepository.getAllbyIds(doc.group_participants.map((obj) => obj.user_id));
    if (users) {
      for (const user of users) {
        await modifyUserEvent(user);
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

  // CASCADE SUR LES COMMENTS
  if (doc.comments) {
    await new CommentRepository().removeComments(doc.comments);
  }

  next();
});

export default mongoose.model('Event', EventSchema, 'Events');
