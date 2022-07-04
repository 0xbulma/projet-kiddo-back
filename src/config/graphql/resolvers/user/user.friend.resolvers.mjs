import { GraphQLError } from 'graphql';

import UserRepository from '../../../mongo/repository/UserRepository.mjs';
const userRepository = new UserRepository();

export const SEND_FRIEND_REQUEST_SECTION = async (parent, { senderEmail, targetEmail }) => {
  const sender = await userRepository.getByEmail(senderEmail);
  if (sender === null) return Error('Sender not found!');

  const target = await userRepository.getByEmail(targetEmail);
  if (target === null) return Error('Target not found!');

  if (!alreadyHavePendingRequest(sender, target) && !isAlreadyFriend(sender, target)) {
    sender.friends_send_request.push({ user: target._id, invited_at: Date.now() });
    target.friends_receive_request.push({ user: sender._id, invited_at: Date.now() });

    userRepository.modifyUser(sender._id, { friends_send_request: sender.friends_send_request });
    userRepository.modifyUser(target._id, { friends_receive_request: target.friends_receive_request });

    return target;
  } else {
    return alreadyHavePendingRequest(sender, target)
      ? new GraphQLError('Already have pending request')
      : isAlreadyFriend(sender, target)
      ? new GraphQLError('Already have this target in friend')
      : new GraphQLError('Error during the process of sending request');
  }
};

function alreadyHavePendingRequest(sender, target) {
  const senderPendingRequest = sender.friends_send_request;
  const senderExistingRequest = senderPendingRequest.find((data) => data.user._id.equals(target._id));

  const targetPendingRequest = sender.friends_receive_request;
  const targetExistingRequest = targetPendingRequest.find((data) => data.user._id === sender._id);

  if (targetExistingRequest !== undefined || senderExistingRequest !== undefined) return true;
  else return false;
}

function isAlreadyFriend(sender, target) {
  const actualFriend = sender.friends;
  const existingFriend = actualFriend.find((data) => data.user._id === target._id);

  return existingFriend !== undefined;
}
