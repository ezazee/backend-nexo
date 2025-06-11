import mongoose, { Schema, Document } from "mongoose";

interface IWeb extends Document {
  title: string;
  category: string;
  client: string;
  duration: string;
  description: string;
  image: string;
  github: string;
  webUrl: string;
  embedCode: string;
}

const WebSchema: Schema = new Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  client: { type: String, required: true },
  duration: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  github: { type: String, required: true },
  webUrl: { type: String, required: true },
  embedCode: { type: String, required: true },
});

const Web = mongoose.model<IWeb>(
  "Web",
  WebSchema
);

export { Web, IWeb };
