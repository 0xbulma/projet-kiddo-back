import * as extraSchema from "../models/extra.model.mjs";

export default class ExtraRepository {
  async createBadge(badgeInput) {
    return await extraSchema.badgeSchema.create(badgeInput);
  }
  
  async createCategory(name) {
    return await extraSchema.categorySchema.create(name);
  }
}
