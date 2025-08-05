import mongoose, { Document, Schema, Model } from 'mongoose';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';
export type Password = {
    password: string;
    iv: string;
}
export interface IPassword extends Document {
    user_id: mongoose.Types.ObjectId;
    username: string;
    password_obj: Password;
    application_link: string;
}

const PasswordSchema: Schema<IPassword> = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    username: { type: String, required: true },
    password_obj: {
        password: { type: String, required: true },
        iv: { type: String, required: true }
    },
    application_link: { type: String, required: true }
});

PasswordSchema.plugin(aggregatePaginate);

export const PasswordModel: Model<IPassword> = mongoose.models.Password || mongoose.model<IPassword>('Password', PasswordSchema);