import { Document, model, Schema, Types } from "mongoose";
import { compareValue, hashValue } from "../utils/bcrypt";

export interface UserDocument extends Document<Types.ObjectId> {
  email: string;
  password: string;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(val: string): Promise<boolean>;
  omitPassword(): Omit<UserDocument, "password">;
}

const userSchema = new Schema<UserDocument>(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    verified: { type: Boolean, default: false, required: true },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  // skip hashing if pw has not been modified
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await hashValue(this.password);
});

userSchema.methods.comparePassword = function (val: string) {
  return compareValue(val, this.password);
};

userSchema.methods.omitPassword = function () {
  const user = this.toJSON();
  delete user.password;
  return user;
};

const UserModel = model<UserDocument>("User", userSchema);
export default UserModel;
