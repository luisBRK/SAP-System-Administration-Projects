import { Schema, Model, model } from 'mongoose';
import { projectI } from '../interfaces/project';

type projectModel = Model<projectI, {}>;

const projectSchema = new Schema<projectI, projectModel>(
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
    bgColor: {
      type: String,
      required: true,
      trim: true,
    },
    dateDelivery: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    client: {
      type: String,
      required: true,
      trim: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    tasks: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Task',
      },
    ],
    collaboratos: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true }
);

export const Project = model<projectI, projectModel>('Project', projectSchema);
