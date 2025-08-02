import { databaseConnection } from "@/app/_lib/db/database";
import { PasswordModel } from "@/app/_lib/models/password/password.model";
import { ApiResponse, ErrorResponse } from "@/app/_utils/functions/Apiresponse";
import { AsyncHandler } from "@/app/_utils/functions/helper";
import { NextRequest, NextResponse } from "next/server";

async function createPassword(req: NextRequest) {
    await databaseConnection();
    const { user_id, username, password_obj, application_link } = await req.json();

    if (!user_id || !username || !password_obj || !application_link) {
        throw new ErrorResponse(400, "All fields are required");
    }

    

    const newPassword = await PasswordModel.create({
        user_id,
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