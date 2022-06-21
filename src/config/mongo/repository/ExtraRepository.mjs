import * as extraSchema from "../models/extra.model.mjs";

export default class ExtraRepository {
  async createBadge(badgeInput) {
    // console.log("extraRepo ===>", badgeInput);
    return await extraSchema.badgeSchema.create(badgeInput);
  }
  async createCategory(name) {
    console.log("extraRepoCategory ===>", name);
    return await extraSchema.categorySchema.create(name);
  }
}
