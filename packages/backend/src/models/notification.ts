import mongoose, { type InferSchemaType } from 'mongoose';

export enum NotificationType {
  YouWereLiked = 'you-were-liked',
}

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: Object.values(NotificationType),
      required: true,
    },
    likedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: (doc: any) => doc.type === NotificationType.YouWereLiked,
    },
    seen: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true },
);

export type NotificationDoc = InferSchemaType<typeof notificationSchema> & { _id: mongoose.Types.ObjectId };

export const NotificationModel = mongoose.model('Notification', notificationSchema);
