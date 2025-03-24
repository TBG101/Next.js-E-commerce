import mongoose, { InferSchemaType } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String },
    role: { type: String, default: "user" },
  },
  { timestamps: true },
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
    
  }
  next();
});

export type userType = InferSchemaType<typeof userSchema>;

export const userModel: mongoose.Model<userType> =
  mongoose.models.User || mongoose.model<userType>("User", userSchema);