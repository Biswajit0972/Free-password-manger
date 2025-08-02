import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IUser extends Document {
    clerkId: string;
    email: string;
    firstName?: string;
    lastName?: string;
    imageUrl?: string;
    lastSignInAt?: Date;
    createdAt?: Date;
    saltDataKey: string;
    saltEnKey: string;
    EnIvKey: string;
    EnIvData: string;
}

const UserSchema: Schema<IUser> = new Schema({
    clerkId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    firstName: { type: String },
    lastName: { type: String },
    imageUrl: { type: String },
    lastSignInAt: { type: Date },
    createdAt: { type: Date },
    saltDataKey: { type: String, required: true }, // Key for data encryption
    saltEnKey: { type: String, required: true }, // for key encryption
    EnIvKey: { type: String, required: true }, // iv for encryption key
    EnIvData: { type: String, required: true },// iv for data  encryption
}, {
    timestamps: true
});


export const UserModel: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
