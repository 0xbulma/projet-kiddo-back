import eventModel from '../models/event.model.mjs';

const POPULATE_EVENT =
  'main_owner co_owners group_participants categories restrictions signalments reactions';

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
    const event = await eventModel.create(eventInput);

    return await eventModel.findById(event._id).populate(POPULATE_EVENT).exec();
    //.select(fields).populate('Users', fields);
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
}
