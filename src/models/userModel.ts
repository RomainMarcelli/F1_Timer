import mongoose, { Schema, Document } from 'mongoose';

// Interface TypeScript pour l'utilisateur
export interface IUser extends Document {
    email: string;
    password: string;
    role: boolean;
}

// Schéma Mongoose
const UserSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Boolean,
        required: true
    }
});

// Modèle Mongoose
export const User = mongoose.model<IUser>('User', UserSchema);
