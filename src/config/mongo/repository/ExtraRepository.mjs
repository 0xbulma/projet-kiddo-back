import * as extraSchema from '../models/extra.model.mjs';

const EXTRA_TYPES = {
  CATEGORY: 0,
  RESTRICTION: 1,
  SIGNALMENT: 2,
  REACTION: 3,
};

export default class ExtraRepository {
  //========
  // Badges
  //========
  async getAllBadges() {
    return await extraSchema.badgeSchema.find();
  }

  async createBadge(badgeInput) {
    return await extraSchema.badgeSchema.create(badgeInput);
  }

  async modifyBadge(_id, modifyBadgeInput) {
    return await extraSchema.badgeSchema.findByIdAndUpdate(_id, modifyBadgeInput, { new: true });
  }

  async removeBadge(_id) {
    return await extraSchema.badgeSchema.findByIdAndRemove({ _id });
  }

  //============
  //  Categorie
  //============
  async getAllCategory() {
    return await extraSchema.categorySchema.find();
  }

  async createCategory(name) {
    return await extraSchema.categorySchema.create({ name });
  }

  async modifyCategory(_id, name) {
    return await extraSchema.categorySchema.findByIdAndUpdate(_id, { name }, { new: true });
  }
  async removeCategory(_id) {
    return await extraSchema.categorySchema.findByIdAndRemove({ _id });
  }

  //==============
  //  Restriction
  //==============
  async getAllRestriction() {
    return await extraSchema.restrictionSchema.find();
  }

  async createRestriction(name) {
    return await extraSchema.restrictionSchema.create({ name });
  }

  async modifyRestriction(_id, name) {
    return await extraSchema.restrictionSchema.findByIdAndUpdate(_id, { name }, { new: true });
  }

  async removeRestriction(_id) {
    return await extraSchema.restrictionSchema.findByIdAndRemove({ _id });
  }

  //==============
  //  Signalement
  //==============
  async createSignalment(name) {
    return await extraSchema.signalmentSchema.create({ name });
  }

  async modifySignalment(_id, name) {
    return await extraSchema.signalmentSchema.findByIdAndUpdate(_id, { name }, { new: true });
  }

  async removeSignalment(_id) {
    return await extraSchema.signalmentSchema.findByIdAndRemove({ _id });
  }

  //==============
  //  Réaction
  //==============
  async createReaction(name) {
    return await extraSchema.reactionSchema.create({ name });
  }

  async modifyReaction(_id, name) {
    return await extraSchema.reactionSchema.findByIdAndUpdate(_id, { name }, { new: true });
  }

  async removeReaction(_id) {
    return await extraSchema.reactionSchema.findByIdAndRemove({ _id });
  }

  //====================
  async createExtra(type, value) {
    switch (type) {
      case EXTRA_TYPES.CATEGORY:
        break;
      case EXTRA_TYPES.RESTRICTION:
        return await extraSchema.restrictionSchema.create({ name });
        break;
      case EXTRA_TYPES.SIGNALMENT:
        break;
      case EXTRA_TYPES.REACTION:
        break;
      default:
        throw new Error('Wrong ', type, ' not defined in EXTRA_TYPES');
    }
  }
}
