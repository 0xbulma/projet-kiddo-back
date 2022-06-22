import mongoose from 'mongoose';
import { default as check } from 'validator';

import * as constants from '../../../utils/constant.mjs';
import * as commonSchema from './common.schema.mjs';

const schemaOptions = commonSchema.SCHEMA_OPTIONS(true);

const CommentSchema = new mongoose.Schema(
  {
    parent_id: commonSchema.OBJECT_ID_REF_COMMENT,
    child_id: commonSchema.OBJECT_ID_REF_COMMENT,
    sender_id: commonSchema.OBJECT_ID_REF_USER,
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
    reactions: [commonSchema.REACTION],
    pinned: { type: Boolean, default: false },
    signalments: [commonSchema.REACTION],
  },
  schemaOptions
);

export default mongoose.model('Comment', CommentSchema, 'Comments');
