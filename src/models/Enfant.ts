// models/Enfant.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IEnfant extends Document {
  nom: string;
  dateDeNaissance: Date;
  parentId: mongoose.Schema.Types.ObjectId;
}

const EnfantSchema: Schema = new Schema({
  nom: { type: String, required: true },
  dateDeNaissance: { type: Date, required: true },
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

export const Enfant = mongoose.model<IEnfant>('Enfant', EnfantSchema);
