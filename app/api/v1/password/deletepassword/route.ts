//! password id and [user_id] check both are matched then delete

import {databaseConnection} from "@/app/_lib/db/database";
import {PasswordModel} from "@/app/_lib/models/password/password.model";
import {ApiResponse, ErrorResponse} from "@/app/_utils/functions/Apiresponse";
import {AsyncHandler} from "@/app/_utils/functions/helper";
import {NextRequest, NextResponse} from "next/server";
import {auth} from "@clerk/nextjs/server"
import {UserModel} from "@/app/_lib/models/user/user.model";
import VAULT from "@/app/_lib/models/vault/vault.schema";

async function deletePassword(req: NextRequest) {
    await databaseConnection();
    const {password_id, vault_id} = await req.json() as { password_id: string, vault_id: string };

    if (!password_id || !vault_id) throw new ErrorResponse(400, "password id required");

    const {isAuthenticated, userId} = await auth();

    if (!isAuthenticated) {
        throw new ErrorResponse(403, "User must be Authenticated first");
    }

    const updatedId = userId.split("_")[1];

    const isUserValid = await UserModel.findOne({clerkId: updatedId});

    if (!isUserValid || !isUserValid._id) throw new ErrorResponse(404, "User not found");

    const vault = await VAULT.findById(vault_id);

    if (!vault) throw new ErrorResponse(404, "vault not found");

    if (!vault.userId.equals(isUserValid._id)) {
        throw new ErrorResponse(400, "Bad request, you are not authorized");
    }

    const deletePassword = await PasswordModel.deleteOne({
        $and: [{_id: password_id}, {vaultId: vault._id}]
    });

    if (!deletePassword) throw new ErrorResponse(500, "something wents , please try again later");

    return NextResponse.json(new ApiResponse(200, "password deleted successfully"));
}

export const DELETE = AsyncHandler(deletePassword);