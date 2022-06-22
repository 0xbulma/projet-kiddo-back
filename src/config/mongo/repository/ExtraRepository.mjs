import * as extraSchema from "../models/extra.model.mjs";

export default class ExtraRepository {
  //
  // Création de badges
  async createBadge(badgeInput) {
    return await extraSchema.badgeSchema.create(badgeInput);
  }
  async modifyBadge(_id, modifyBadgeInput) {
    return await extraSchema.badgeSchema.findByIdAndUpdate(
      _id,
      modifyBadgeInput,
      { new: true }
    );
  }
  async removeBadge(_id) {
    return await extraSchema.badgeSchema.findByIdAndRemove({ _id });
  }

  //  Création / modif / remove Category
  async createCategory(name) {
    return await extraSchema.categorySchema.create({ name });
  }
  async modifyCategory(_id, name) {
    return await extraSchema.categorySchema.findByIdAndUpdate(
      _id,
      { name },
      { new: true }
    );
  }
  async removeCategory(_id) {
    return await extraSchema.categorySchema.findByIdAndRemove({ _id });
  }

  //  Création / modif / remove restriction
  async createRestriction(name) {
    return await extraSchema.restrictionSchema.create({ name });
  }
  async modifyRestriction(_id, name) {
    return await extraSchema.restrictionSchema.findByIdAndUpdate(
      _id,
      { name },
      { new: true }
    );
  }
  async removeRestriction(_id) {
    return await extraSchema.restrictionSchema.findByIdAndRemove({ _id });
  }
}
