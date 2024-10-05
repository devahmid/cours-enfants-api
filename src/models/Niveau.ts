// models/Niveau.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface INiveau extends Document {
  niveau: string;
  matiereId: mongoose.Schema.Types.ObjectId;
}

const NiveauSchema: Schema = new Schema({
  niveau: { type: String, required: true },
  matiereId: { type: mongoose.Schema.Types.ObjectId, ref: 'Matiere', required: true },
});

export const Niveau = mongoose.model<INiveau>('Niveau', NiveauSchema);