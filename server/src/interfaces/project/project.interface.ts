import { ObjectId } from 'mongoose';

export interface projectI {
  _id: ObjectId;
  name: string;
  description: string;
  bgColor: string;
  dateDelivery: Date;
  client: string;
  creator: ObjectId;
  tasks: Array<ObjectId>;
  collaborators: Array<ObjectId>;
}
