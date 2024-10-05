// models/Quiz.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IQuiz extends Document {
  titre: string;
  questions: string[];
  leconId: mongoose.Schema.Types.ObjectId;
}

const QuizSchema: Schema = new Schema({
  titre: { type: String, required: true },
  questions: { type: [String], required: true },
  leconId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lecon', required: true },
});

export const Quiz = mongoose.model<IQuiz>('Quiz', QuizSchema);