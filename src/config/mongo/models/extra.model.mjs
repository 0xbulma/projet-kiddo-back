import mongoose from 'mongoose';

import * as commonSchema from './common.schema.mjs';

const ERROR_MESSAGE = {
  name: 'Name is required',
};

const schemaOptions = commonSchema.SCHEMA_OPTIONS();

const BadgeSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, ERROR_MESSAGE.name] },
    description: { type: String },
    icon_url: { type: String },
  },
  schemaOptions
);

const CategorySchema = new mongoose.Schema({ name: { type: String, required: [true, ERROR_MESSAGE.name] } }, schemaOptions);
const RestrictionSchema = new mongoose.Schema({ name: { type: String, required: [true, ERROR_MESSAGE.name] } }, schemaOptions);
const SignalmentSchema = new mongoose.Schema({ name: { type: String, required: [true, ERROR_MESSAGE.name] } }, schemaOptions);
const ReactionSchema = new mongoose.Schema({ name: { type: String, required: [true, ERROR_MESSAGE.name] } }, schemaOptions);

export const badgeSchema = mongoose.model('Badge', BadgeSchema, 'Badges');
export const categorySchema = mongoose.model('Category', CategorySchema, 'Categories');
export const restrictionSchema = mongoose.model('Restriction', RestrictionSchema, 'Restrictions');
export const signalmentSchema = mongoose.model('Signalment', SignalmentSchema, 'Signalments');
export const reactionSchema = mongoose.model('Reaction', ReactionSchema, 'Reactions');
