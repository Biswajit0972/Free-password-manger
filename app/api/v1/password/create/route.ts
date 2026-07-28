import { databaseConnection } from "@/app/_lib/db/database";
import { PasswordModel } from "@/app/_lib/models/password/password.model";
import { UserModel } from "@/app/_lib/models/user/user.model";
import { ApiResponse, ErrorResponse } from "@/app/_utils/functions/Apiresponse";
import { AsyncHandler } from "@/app/_utils/functions/helper";

import { NextRequest, NextResponse } from "next/server";
import VAULT from "@/app/_lib/models/vault/vault.schema";

async function createPassword(req: NextRequest) {
    await databaseConnection();

    const {vaultId, user_id, username, password_obj, application_link } = await req.json();

    if (!vaultId || !username || !password_obj || !application_link || !user_id) {
        throw new ErrorResponse(400, "All fields are required");
    }


    const vault = await VAULT.findById(vaultId);
    
    if (!vault) {
        throw new ErrorResponse(404, "iVault not found");
    }

    const user = await UserModel.findById(user_id);

    if (!user) {
        throw new ErrorResponse(404, "User not found");
    }

    if (!vault.userId.equals(user._id)) {
        throw new ErrorResponse(401, "User not authorized");
    }

    const newPassword = await PasswordModel.create({
        vaultId: vault._id,
        username,
        password_obj,
        application_link,
    });

    if (!newPassword._id) {
        throw new ErrorResponse(500, "Failed to create new password");
    }

    return NextResponse.json(new ApiResponse(201, "Password created successfully"), { status: 201 });
}

export const POST = AsyncHandler(createPassword);