import { Schema, Model, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { userI, userMethodsI } from '../interfaces/project';

// SCHEMA
type userModel = Model<userI, {}, userMethodsI>;

const userSchema = new Schema<userI, userModel, userMethodsI>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: Number,
      required: true,
      trim: true,
      minLength: 9,
      maxLength: 10,
    },
    token: {
      type: String,
    },
    confirmed: {
      type: Boolean,
      default: false,
    },
    direction: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

// METHODS
// Security | Hash password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(this.password, salt);
});

// Security | Compare Password
userSchema.method('checkPasword', async function (formPassword: string) {
  return await bcrypt.compare(formPassword, this.password);
});

// MODEL
export const User = model<userI, userModel>('User', userSchema);
// export default User;
