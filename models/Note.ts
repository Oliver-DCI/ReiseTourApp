import mongoose, { Schema, Document, Model } from "mongoose";

export interface INote extends Document {
  userId: mongoose.Types.ObjectId;
  city: string;
  text: string;
  done: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const NoteSchema = new Schema<INote>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    city: { type: String, required: true, index: true },
    text: { type: String, required: true },
    done: { type: Boolean, default: false },
  },
  { 
    timestamps: true,
    toJSON: { 
      transform: (doc, ret: any) => { 
        delete ret.__v; 
        return ret; 
      } 
    } 
  }
);

const Note: Model<INote> = mongoose.models.Note || mongoose.model<INote>("Note", NoteSchema);
export default Note;