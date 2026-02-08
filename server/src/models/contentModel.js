import mongoose from "mongoose";

const { Schema, Types } = mongoose;

const contentSchema = new Schema({

  link: { type: String, required: true },

  contentType: { type: String, required: true },

  title: { type: String, required: true },

  tag: { type: String, required: true },

  userId: { type: Types.ObjectId, ref: "User", required: true }

});

const UserContent = mongoose.model("content", contentSchema);

export default UserContent
