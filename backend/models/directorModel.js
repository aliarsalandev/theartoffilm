import mongoose from "mongoose";

export const directorSchema = new mongoose.Schema(
 {
  name: { type: String, required: true },
 },
 {
  timestamps: true,
 }
);

const Director = mongoose.model('Director', directorSchema);

export default Director;

