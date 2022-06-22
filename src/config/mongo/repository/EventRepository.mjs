import eventModel from '../models/event.model.mjs';

const POPULATE_EVENT = 'main_owner co_owners group_participants categories restrictions signalments reactions comments';

export default class EventRepository {
  // Récupération des données liées à l'évènement
  async getEvents(fields) {
    return await eventModel.find().select(fields);
  }

  async getEventById(eventId) {
    return await eventModel.findOne(eventId).populate(POPULATE_EVENT).exec();
  }

  // Création et modification de l'évènement
  async createEvent(eventInput, fields) {
    const event = await eventModel.create(eventInput);

    return await eventModel.findOne(event._id).populate(POPULATE_EVENT).exec();
  }

  async modifyEvent(eventId, eventInput, fields) {
    return await eventModel.findOneAndUpdate(eventId, eventInput, { new: true }).populate(POPULATE_EVENT).exec();
  }

  async removeEvent(eventId) {
    return await eventModel.findOneAndRemove(eventId);
  }
}
