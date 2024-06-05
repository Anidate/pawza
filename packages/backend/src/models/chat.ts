import mongoose, { type InferSchemaType } from 'mongoose';

const chatSchema = new mongoose.Schema({
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  latestMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message',
  },
});

export type ChatDoc = InferSchemaType<typeof chatSchema> & { _id: mongoose.Types.ObjectId };

export const ChatModel = mongoose.model('Chat', chatSchema);
