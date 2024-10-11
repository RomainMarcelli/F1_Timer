import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ITimer extends Document {
  userId: Types.ObjectId; 
  timer: number;        
}

const TimerSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true },
  timer: { type: Number, required: true }
});

export const Timer = mongoose.model<ITimer>('Timer', TimerSchema);