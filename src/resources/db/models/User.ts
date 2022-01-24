import { Schema, model } from "mongoose";


interface IUser {
  name: string;
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  name: String,
  email: String,
  password: String,
})

const UserModel = model<IUser>('User', userSchema)

export default UserModel;