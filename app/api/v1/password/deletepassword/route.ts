//! password id and user_id check both are matched then delete

import { databaseConnection } from "@/app/_lib/db/database";
import { PasswordModel } from "@/app/_lib/models/password/password.model";
import { ApiResponse, ErrorResponse } from "@/app/_utils/functions/Apiresponse";
import { AsyncHandler } from "@/app/_utils/functions/helper";
import { NextRequest, NextResponse } from "next/server";

async function deletePassword(req: NextRequest) {
    await databaseConnection();

    const { user_id, password_id } = await req.json() as { user_id: string, password_id: string };

    if (!user_id || !password_id) throw new ErrorResponse(400, "all fields are required");

    const deletePassword = await PasswordModel.deleteOne({
        $and: [{ _id: password_id }, { user_id }]
    });

    if (deletePassword) throw new ErrorResponse(500, "something wents , please try again later");

    return NextResponse.json(new ApiResponse(200, "password deleted successfully"));
}

export const DELETE = AsyncHandler(deletePassword);