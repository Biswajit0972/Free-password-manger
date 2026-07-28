import {NextRequest, NextResponse} from "next/server";
import {databaseConnection} from "@/app/_lib/db/database";
import {ApiResponse, ErrorResponse} from "@/app/_utils/functions/Apiresponse";
import {UserModel} from "@/app/_lib/models/user/user.model";
import VAULT from "@/app/_lib/models/vault/vault.schema";
import {AsyncHandler} from "@/app/_utils/functions/helper";

type Vault = {
    user_id: string;
    vaultName: string;
    wrappedVaultKey: string;
    salt: string;
    version: string;
    wrapIv: string;
}

async  function createVault(req: NextRequest) {

    const {user_id, vaultName,  wrappedVaultKey, salt, version,  wrapIv} = await req.json() as Vault;

    if ([user_id, vaultName,  wrappedVaultKey, salt, version,  wrapIv].some(val => !val || typeof val !== "string" || !val.trim())) {
        throw new ErrorResponse(400, "All fields are required");
    }

    const user = await UserModel.findOne({ _id: user_id })

    if (!user) {
        throw new ErrorResponse(404, "User not found");
    }

    const vault = await VAULT.create({userId: user._id, vaultName,  wrappedVaultKey, salt, version,  wrapIv});

    if (!vault) {
        throw new ErrorResponse(500, "Internal server error, please try again");
    }

    return NextResponse.json(new ApiResponse(201, "vault created successfully.", undefined, {
        vaultId: vault._id,
        vaultName: vaultName,
    }));
}

export const POST = AsyncHandler(createVault);