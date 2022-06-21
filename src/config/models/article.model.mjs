import mongoose from 'mongoose';

import constants from '../../utils/constant';
import commonSchema from './common.schema.mjs';

const objectID = mongoose.Schema.Types.ObjectId;
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
      enum: constants.STATUS_VALUES,
      default: 'DRAFTED',
    },

    author: { type: objectID, ref: constants.COLLECTION_NAME.user },
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
    comments: [commonSchema.COMMENT],
  },
  schemaOptions
);

export default mongoose.model('Article', ArticleSchema, 'Articles');
