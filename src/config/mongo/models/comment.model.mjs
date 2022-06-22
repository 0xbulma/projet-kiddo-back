import mongoose from 'mongoose';
import { default as check } from 'validator';

import * as constants from '../../../utils/constant.mjs';
import * as commonSchema from './common.schema.mjs';

const schemaOptions = commonSchema.SCHEMA_OPTIONS(true);

const CommentSchema = new mongoose.Schema(
  {
    child_id: { type: String },
    sender_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: constants.COLLECTION_NAME.USER,
    },
    deleted_at: { type: Date, default: Date.now },
    content: {
      title: { type: String },
      message: { type: String },
      photos_url: [
        {
          type: String,
          validate: {
            validator: (value) => check.isURL(value),
            message: (props) => `${props.value} n'est pas une URL valide!`,
          },
        },
      ],
    },
    reactions: [REACTION],
    pinned: { type: Boolean, default: false },
    signalments: [SIGNALMENT],
  },
  schemaOptions
);

export default mongoose.model('Comment', CommentSchema, 'Comments');
