import mongoose, {model, Model, Schema} from "mongoose";
import {IVault} from "@/app/_utils/type";

const vaultSchema = new Schema<IVault>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    wrappedVaultKey: {
        type: String,
        required: true,
    },
    salt: {
        type: String,
        required: true,
    },
    wrapIv: {
        type: String,
        required: true,
    },
    version: {
        type: String,
    }
}, {timestamps: true});

vaultSchema.index({userId: 1, _id:1});

const VAULT = mongoose.models.Vault as Model<IVault> || model("Vault", vaultSchema);

export default VAULT;