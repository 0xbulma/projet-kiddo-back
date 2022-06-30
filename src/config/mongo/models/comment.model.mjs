import mongoose from 'mongoose';
import { default as check } from 'validator';

import CommentRepository from '../repository/CommentRepository.mjs';
import UserRepository from '../repository/UserRepository.mjs';
import EventRepository from '../repository/EventRepository.mjs';

import * as constants from '../../../utils/constant.mjs';
import * as commonSchema from './common.schema.mjs';

const schemaOptions = commonSchema.SCHEMA_OPTIONS(true);

const CommentSchema = new mongoose.Schema(
  {
    parent: commonSchema.OBJECT_ID_REF_COMMENT,
    child: [commonSchema.OBJECT_ID_REF_COMMENT],
    target_user: commonSchema.OBJECT_ID_REF_USER,
    target_event: commonSchema.OBJECT_ID_REF_EVENT,
    target_article: commonSchema.OBJECT_ID_REF_ARTICLE,
    sender: commonSchema.OBJECT_ID_REF_USER,
    deleted_at: { type: Date, default: Date.now },
    content: {
      title: { type: String },
      message: { type: String },
      photos_url: [
        {
          type: String,
          validate: {
            validator: (value) => check.isURL(value),
            message: (props) => `${props.value} n'est pas une URL valide!`,
          },
        },
      ],
    },
    reactions: [commonSchema.REACTION],
    pinned: { type: Boolean, default: false },
    signalments: [commonSchema.SIGNALMENT],
  },
  schemaOptions
);

// CASCADE A LA SUPPRESSION D'UN COMMENT //
// TODO: CASCADE SUR LES ARTICLES

CommentSchema.post('findOneAndRemove', async (doc, next) => {
  const userRepository = new UserRepository();
  const eventRepository = new EventRepository();
  const commentRepository = new CommentRepository();

  // CASCADE SUR LES EVENTS
  if (doc.target_event_id) {
    const event = await eventRepository.getbyId({ _id: doc.target_event_id });

    if (event) {
      event.modifyEvent({ _id: doc.target_event_id }, { comments: doc.comments.filter((id) => id !== doc._id) });
    }
  }

  // CASCADE SUR LES USERS
  if (doc.target_user_id) {
    const user = await userRepository.getbyId({ _id: doc.target_user_id });

    if (user) {
      user.modifyUser({ _id: doc.target_user_id }, { comments: doc.comments.filter((id) => id !== doc._id) });
    }
  }

  // CASCADE SUR LES CHILDS EVENTS
  if (doc.child_id) {
    commentRepository.removeComments(doc.child_id);
  }

  // CASCADE SUR LES PARENTS EVENTS
  if (doc.parent_id) {
    const comments = await commentRepository.getAllByIds(doc.parent_id);

    if (comments) {
      for (const comment of comments) {
        await comment.modifyComment(
          {
            _id: comment._id,
          },
          {
            child_id: comment.child_id.filter((obj) => obj._id !== doc._id),
          }
        );
      }
    }
  }
  next();
});

export default mongoose.model('Comment', CommentSchema, 'Comments');
