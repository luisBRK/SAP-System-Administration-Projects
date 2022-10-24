import { ObjectId } from 'mongoose';

export interface taskI {
  _id: ObjectId;
  name: string;
  description: string;
  state: string;
  dateDelivery: Date;
  priority: string;
  project: ObjectId;
  takedBy: ObjectId;
  completedBy: ObjectId;
}
