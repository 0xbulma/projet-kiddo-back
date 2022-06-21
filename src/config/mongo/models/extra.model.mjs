import mongoose from 'mongoose';

import * as commonSchema from './common.schema';

// Liste des messages d'erreurs
const ERROR_MESSAGE = {
  name: 'Name is required',
};

// Options du schema
const schemaOptions = commonSchema.SCHEMA_OPTIONS();

// Section : Catégories
const CategorySchema = new mongoose.Schema(
  { name: { type: String, required: [true, ERROR_MESSAGE.name] } },
  schemaOptions
);

// Section : Restriction
const RestrictionSchema = new mongoose.Schema(
  { name: { type: String, required: [true, ERROR_MESSAGE.name] } },
  schemaOptions
);

// Section : Badge
const BadgeSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, ERROR_MESSAGE.name] },
    description: { type: String },
    icon_url: { type: String },
  },
  schemaOptions
);

export const categorySchema = mongoose.model('Category', CategorySchema, 'Categories');
export const restrictionSchema = mongoose.model('Restriction', RestrictionSchema, 'Restrictions');
export const badgeSchema = mongoose.model('Badge', BadgeSchema, 'Badges');
