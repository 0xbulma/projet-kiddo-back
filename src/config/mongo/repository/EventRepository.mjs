import eventModel from '../models/event.model.mjs';

const POPULATE_EVENT =
  'main_owner co_owners group_participants categories restrictions';

export default class EventRepository {
  // Récupération des données liées à l'évènement
  async getEvents(fields) {
    return await eventModel.find().select(fields);
  }

  async getEventById(eventId) {
    return await eventModel.findById(eventId).populate(POPULATE_EVENT).exec();
  }

  // Création et modification de l'évènement
  async createEvent(eventInput, fields) {
    return await eventModel.create(eventInput);
  }

  async modifyEvent(eventId, eventInput, fields) {
    return await eventModel
      .findByIdAndUpdate(eventId, eventInput, { new: true })
      .populate(POPULATE_EVENT)
      .exec();
    //.select(fields).populate('Users', fields);
  }

  async removeEvent(eventId) {
    return await eventModel.findByIdAndRemove(eventId);
  }

  async removeEvents(idsArray) {
    // EN CONSTRUCTION A VERIFIER LA STRUCTURE DES ARGUMENTS DE IDSARRAY
    return await eventModel.deleteMany(idsArray);
  }
}
