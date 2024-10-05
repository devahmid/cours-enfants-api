import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  nom: string;
  prenom: string;
  email: string;
  motDePasse: string;
  typeUtilisateur: 'parent' | 'admin';
}

const UserSchema: Schema = new Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  motDePasse: { type: String, required: true },
  typeUtilisateur: { type: String, enum: ['parent', 'admin'], required: true },
});

export const User = mongoose.model<IUser>('User', UserSchema);