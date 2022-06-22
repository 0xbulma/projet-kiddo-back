import * as extraSchema from '../models/extra.model.mjs';

export const EXTRA_TYPES = {
  CATEGORY: 0,
  RESTRICTION: 1,
  SIGNALMENT: 2,
  REACTION: 3,
};

export default class ExtraRepository {
  //========
  // Badges
  //========
  async getBadges() {
    return await extraSchema.badgeSchema.find();
  }

  async getBadgeById(_id) {
    return await extraSchema.badgeSchema.findOne(_id);
  }

  async createBadge(badgeInput) {
    return await extraSchema.badgeSchema.create(badgeInput);
  }

  async modifyBadge(_id, modifyBadgeInput) {
    return await extraSchema.badgeSchema.findOneAndUpdate(_id, modifyBadgeInput, { new: true });
  }

  async removeBadge(_id) {
    return await extraSchema.badgeSchema.findOneAndRemove({ _id });
  }

  //=================
  //  Generic getter
  //=================
  async getAll(type) {
    switch (type) {
      case EXTRA_TYPES.CATEGORY:
        return await extraSchema.categorySchema.find();
      case EXTRA_TYPES.RESTRICTION:
        return await extraSchema.restrictionSchema.find();
      case EXTRA_TYPES.SIGNALMENT:
        return await extraSchema.signalmentSchema.find();
      case EXTRA_TYPES.REACTION:
        return await extraSchema.reactionSchema.find();

      default:
        throw new Error('Wrong ', type, ' not defined in EXTRA_TYPES');
    }
  }

  async getById(type, _id) {
    switch (type) {
      case EXTRA_TYPES.CATEGORY:
        return await extraSchema.categorySchema.findOne(_id);
      case EXTRA_TYPES.RESTRICTION:
        return await extraSchema.restrictionSchema.findOne(_id);
      case EXTRA_TYPES.SIGNALMENT:
        return await extraSchema.signalmentSchema.findOne(_id);
      case EXTRA_TYPES.REACTION:
        return await extraSchema.reactionSchema.findOne(_id);

      default:
        throw new Error('Wrong ', type, ' not defined in EXTRA_TYPES');
    }
  }

  //==================
  //  Generic maanger
  //==================
  async create(type, value) {
    switch (type) {
      case EXTRA_TYPES.CATEGORY:
        return await extraSchema.categorySchema.create({ value });
      case EXTRA_TYPES.RESTRICTION:
        return await extraSchema.restrictionSchema.create({ value });
      case EXTRA_TYPES.SIGNALMENT:
        return await extraSchema.signalmentSchema.create({ value });
      case EXTRA_TYPES.REACTION:
        return await extraSchema.reactionSchema.create({ value });

      default:
        throw new Error('Wrong ', type, ' not defined in EXTRA_TYPES');
    }
  }

  async modify(type, _id, value) {
    switch (type) {
      case EXTRA_TYPES.CATEGORY:
        return await extraSchema.categorySchema.findOneAndUpdate(_id, { value }, { new: true });
      case EXTRA_TYPES.RESTRICTION:
        return await extraSchema.restrictionSchema.findOneAndUpdate(_id, { value }, { new: true });
      case EXTRA_TYPES.SIGNALMENT:
        return await extraSchema.signalmentSchema.findOneAndUpdate(_id, { value }, { new: true });
      case EXTRA_TYPES.REACTION:
        return await extraSchema.reactionSchema.findOneAndUpdate(_id, { value }, { new: true });

      default:
        throw new Error('Wrong ', type, ' not defined in EXTRA_TYPES');
    }
  }

  async remove(type, _id) {
    switch (type) {
      case EXTRA_TYPES.CATEGORY:
        return await extraSchema.categorySchema.findOneAndRemove({ _id });
      case EXTRA_TYPES.RESTRICTION:
        return await extraSchema.restrictionSchema.findOneAndRemove({ _id });
      case EXTRA_TYPES.SIGNALMENT:
        return await extraSchema.signalmentSchema.findOneAndRemove({ _id });
      case EXTRA_TYPES.REACTION:
        return await extraSchema.reactionSchema.findOneAndRemove({ _id });

      default:
        throw new Error('Wrong ', type, ' not defined in EXTRA_TYPES');
    }
  }
}
