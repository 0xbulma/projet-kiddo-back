import EventRepository from '../../mongo/repository/EventRepository.mjs';
import UserRepository from '../../mongo/repository/EventRepository.mjs';
import getFields from '../../../utils/getFields.mjs';

const eventRepository = new EventRepository();
const userRepository = new UserRepository();

export default {
  Query: {
    comments: (parent, {isEvent}, context, info) => {
      switch()

      
      return eventRepository.getEvents(fields);
    },
    comment: (parent, { id }, context, info) => {
      
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