import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
  name: string;
  address: string;
  phone: string;
  email: string;
  password: string;
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true }); 

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
