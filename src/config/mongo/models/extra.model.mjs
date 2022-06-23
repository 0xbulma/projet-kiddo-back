import mongoose from 'mongoose';

import CommentRepository from '../repository/CommentRepository.mjs';
import UserRepository from '../repository/UserRepository.mjs';
import EventRepository from '../repository/EventRepository.mjs';

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

const CategorySchema = new mongoose.Schema(
  { name: { type: String, required: [true, ERROR_MESSAGE.name] } },
  schemaOptions
);
const RestrictionSchema = new mongoose.Schema(
  { name: { type: String, required: [true, ERROR_MESSAGE.name] } },
  schemaOptions
);
const SignalmentSchema = new mongoose.Schema(
  { name: { type: String, required: [true, ERROR_MESSAGE.name] } },
  schemaOptions
);
const ReactionSchema = new mongoose.Schema(
  { name: { type: String, required: [true, ERROR_MESSAGE.name] } },
  schemaOptions
);

// CASCADE A LA SUPPRESSION
BadgeSchema.post('findOneAndRemove', async (doc, next) => {
  const userRepository = new UserRepository();
  const users = await userRepository.getAllByFilter('badges', [doc._id]);
  if (!users) return next();

  for (const user of users) {
   await user.modifyUser(
      { _id: user._id },
      { badges: user.badges.filter(obj => obj.badge_id !== doc._id) }
    );
  }

  next();
});

CategorySchema.post('findOneAndRemove', async (doc, next) => {
  const eventRepository = new EventRepository();
  const events = await eventRepository.getAllByFilter('categories', [doc._id]);
  if (!events) return next();

  for (const event of events) {
   await event.modifyEvent(
      { _id: event._id },
      { categories: event.categories.filter(id => id !== doc._id) }
    );
  }

  next();
});

RestrictionSchema.post('findOneAndRemove', async (doc, next) => {
  const eventRepository = new EventRepository();
  const events = await eventRepository.getAllByFilter('restrictions', [doc._id]);
  if (!events) return next();
  
  for (const event of events) {
    await event.modifyEvent(
      { _id: event._id },
      { categories: event.restrictions.filter(id => id !== doc._id) }
    );
  }

  next();
});

SignalmentSchema.post('findOneAndRemove', async (doc, next) => {
  const eventRepository = new EventRepository();
  const events = await eventRepository.getAllByFilter('signalements', [doc._id]);
  if (events) {
    for (const event of events) {
      await event.modifyEvent(
        { _id: event._id },
        { categories: event.signalements.filter(id => id !== doc._id) }
      );
    }
  }

  const userRepository = new UserRepository();
  const users = await userRepository.getAllByFilter('signalements', [doc._id]);
  if (users) {
    for (const user of users) {
      await user.modifyEvent(
        { _id: user._id },
        { categories: user.signalements.filter(id => id !== doc._id) }
      );
    }
  } 
  next();
});

ReactionSchema.post('findOneAndRemove', async (doc, next) => {
  const eventRepository = new EventRepository();
  const events = await eventRepository.getAllByFilter('restrictions', [doc._id]);
  if (events) {
    for (const event of events) {
      await event.modifyEvent(
        { _id: event._id },
        { categories: event.restrictions.filter(id => id !== doc._id) }
      );
    }
  }
  
  const userRepository = new UserRepository();
  const users = await userRepository.getAllByFilter('restrictions', [doc._id]);
  if (users) {
    for (const user of users) {
      await user.modifyEvent(
        { _id: user._id },
        { categories: user.restrictions.filter(id => id !== doc._id) }
      );
    }
  }
 
  next();
});

export const badgeSchema = mongoose.model('Badge', BadgeSchema, 'Badges');
export const categorySchema = mongoose.model(
  'Category',
  CategorySchema,
  'Categories'
);
export const restrictionSchema = mongoose.model(
  'Restriction',
  RestrictionSchema,
  'Restrictions'
);
export const signalmentSchema = mongoose.model(
  'Signalment',
  SignalmentSchema,
  'Signalments'
);
export const reactionSchema = mongoose.model(
  'Reaction',
  ReactionSchema,
  'Reactions'
);
