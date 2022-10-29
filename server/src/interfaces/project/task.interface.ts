import { ObjectId } from 'mongoose';

type state = 'to-do' | 'in-progress' | 'done';
type priority = 'low' | 'medium' | 'high';

export interface taskI {
  _id: ObjectId;
  name: string;
  description: string;
  state: state;
  dateDelivery: Date;
  priority: priority;
  project: ObjectId;
  takedBy: ObjectId | null;
  completedBy: ObjectId | null;
}
