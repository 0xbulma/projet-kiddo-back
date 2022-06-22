import mongoose from 'mongoose';
import { default as check } from 'validator';

import * as constants from '../../../utils/constant.mjs';
import * as commonSchema from './common.schema.mjs';

const ERROR_MESSAGE = {
  title: 'Title is required',
};

const schemaOptions = commonSchema.SCHEMA_OPTIONS(true);

const EventSchema = new mongoose.Schema(
  {
    drafted_at: { type: Date, default: Date.now },
    published_at: { type: Date, default: Date.now },
    main_owner: commonSchema.OBJECT_ID_REF_USER,
    co_owners: [commonSchema.OBJECT_ID_REF_USER],
    content: {
      title: { type: String, required: [true, ERROR_MESSAGE.title] },
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
    group_participants: [
      {
        user_id: commonSchema.OBJECT_ID_REF_USER,
        booked_at: { type: Date, default: Date.now },
        group_detail: [
          {
            isChild: { type: Boolean, default: false },
            name: { type: String },
            age: { type: Number, default: 0, min: [0, 'Age invalide'] },
          },
        ],
      },
    ],
    price: { type: Number, default: 0 },
    event_date: {
      start: { type: Date, default: Date.now },
      end: { type: Date, default: Date.now },
    },
    status: { type: String, enum: constants.STATUS_VALUES, default: constants.STATUS_VALUES.DRAFTED },
    address: {
      city: { type: String },
      zip_code: {
        type: String,
        validate: {
          validator: (value) => check.isPostalCode(value, any),
          message: (props) => `${props.value} n'est pas un code postal valide!`,
        },
      },
      address_line: { type: String },
      address_line_2: { type: String },
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
    filters: [{ type: String }],
    categories: [{ _id: commonSchema.OBJECT_ID_REF_CATEGORY }],
    restrictions: [{ _id: commonSchema.OBJECT_ID_REF_RESTRICTION }],

    highlighted: { type: Boolean, default: false },

    signalments: [commonSchema.SIGNALMENT],
    reactions: [commonSchema.REACTION],
    comments: [commonSchema.OBJECT_ID_REF_COMMENT],
  },
  schemaOptions
);

export default mongoose.model('Event', EventSchema, 'Events');
