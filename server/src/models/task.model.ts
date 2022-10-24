import { Model, model, Schema } from 'mongoose';
import { taskI } from '../interfaces/project';

type taskModel = Model<taskI, {}>;

const taskSchema = new Schema<taskI, taskModel>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      enum: {
        values: ['to-do', 'in-progress', 'done'],
        message: '{VALUE} is not a permited state',
      },
      default: 'to-do',
    },
    priority: {
      type: String,
      required: true,
      enum: {
        values: ['low', 'medium', 'high'],
        message: '{VALUE} is not a permited priority',
      },
    },
    dateDelivery: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    takedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    completedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
    },
  },
  { timestamps: true }
);

export const Task = model<taskI, taskModel>('Task', taskSchema);
