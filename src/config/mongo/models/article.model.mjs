import mongoose from 'mongoose';

import * as constants from '../../../utils/constant';
import * as commonSchema from './common.schema';

// Liste des messages d'erreurs
const ERROR_MESSAGE = {
  name: 'Le titre est requis !',
  categories: 'Une catégorie est requise !',
};

// Options du schema
const schemaOptions = commonSchema.SCHEMA_OPTIONS(true);

const ArticleSchema = new mongoose.Schema(
  {
    name: String,
    drafted_at: Date,
    visibility: {
      type: String,
      enum: constants.ENUM_STATUS,
      default: constants.ENUM_STATUS[0],
    },

    author: commonSchema.OBJECT_ID_REF_USER,
    content: {
      title: String,
      subtitle: String,
      description: String,
      message: String,
    },
    content_media: commonSchema.CONTENT_MEDIA,
    filters: [String],
    highlighted: { type: Boolean, default: false },
    reactions: [commonSchema.REACTION],
    comments: [commonSchema.OBJECT_ID_REF_COMMENT],
  },
  schemaOptions
);

export default mongoose.model('Article', ArticleSchema, 'Articles');
