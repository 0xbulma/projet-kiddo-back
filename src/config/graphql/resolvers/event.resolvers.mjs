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
      return eventRepository.getEventById(id, fields);
    },
  },

  Mutation: {
    createEvent: (parent, { input }, ctx, info) => {
      const fields = getFields(info);
      return eventRepository.createEvent(input, fields);
    },

    modifyEvent: (parent, { id, input }, ctx, info) => {
      const fields = getFields(info);
      return eventRepository.modifyEvent(id, input, fields);
    },

    removeEvent: (parent, { id }, ctx, info) => {
      return eventRepository.removeEvent(id);
    },
  },
};
