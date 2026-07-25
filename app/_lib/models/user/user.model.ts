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
}, {
    timestamps: true
});

UserSchema.index({clerkId: 1, _id: 1});

export const UserModel: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
