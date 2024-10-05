// models/Matiere.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IMatiere extends Document {
  nom: string;
}

const MatiereSchema: Schema = new Schema({
  nom: { type: String, required: true },
});

export const Matiere = mongoose.model<IMatiere>('Matiere', MatiereSchema);