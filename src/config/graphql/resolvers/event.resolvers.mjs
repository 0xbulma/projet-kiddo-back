import EventRepository from '../../mongo/repository/EventRepository.mjs';
import getFields from '../../../utils/getFields.mjs';

const eventRepository = new EventRepository();

export default {
  Query: {
    events: (parent, args, context, info) => {
      const fields = getFields(info);
      return eventRepository.getEvents(fields);
    },
    event: (parent, { id }, context, info) => {
      const fields = getFields(info);
      return eventRepository.getEvent(id, fields);
    },
  },

  Mutation: {
    createEvent: (parent, { input }, ctx, info) => {
      const fields = getFields(info);
      return eventRepository.createEvent(input, fields);
    },

    updateEvent: (parent, { id, input }, ctx, info) => {
      const fields = getFields(info);
      return eventRepository.updateEvent(id, input, fields);
    },

    deleteEvent: (parent, { id }, ctx, info) => {
      return eventRepository.deleteEvent(id);
    },
  },
};
