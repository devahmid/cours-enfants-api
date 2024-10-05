import mongoose, { Document, Schema } from 'mongoose';

export interface ILecon extends Document {
  titre: string;
  contenu: string;
  niveauId: mongoose.Schema.Types.ObjectId;
  urlVideo: string;
}

const LeconSchema: Schema = new Schema({
  titre: { type: String, required: true },
  contenu: { type: String, required: true },
  niveauId: { type: mongoose.Schema.Types.ObjectId, ref: 'Niveau', required: true },
  urlVideo: { type: String },
});

export const Lecon = mongoose.model<ILecon>('Lecon', LeconSchema);