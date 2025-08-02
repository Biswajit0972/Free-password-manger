import { databaseConnection } from "@/app/_lib/db/database";
import { PasswordModel } from "@/app/_lib/models/password/password.model";
import { UserModel } from "@/app/_lib/models/user/user.model";
import { ApiResponse, ErrorResponse } from "@/app/_utils/functions/Apiresponse";
import { AsyncHandler } from "@/app/_utils/functions/helper";
import { NextRequest, NextResponse } from "next/server";

async function getAllPasswords(req: NextRequest) {
    await databaseConnection();

    const { searchParams } = new URL(req.url);
    const user_id = searchParams.get("user_id");

    if (!user_id) {
        throw new ErrorResponse(400, "user_id is required in query params");
    }

    const user = await UserModel.findOne({clerkId: user_id});

    if (!user) {
        throw new ErrorResponse(404, "User not found");
    }
     
    
    const passwords = await PasswordModel.find({ user_id: user._id });

    if (!passwords || passwords.length === 0) {
        throw new ErrorResponse(404, "No passwords found for this user");
    }

    return NextResponse.json(new ApiResponse(200, "Passwords retrieved successfully", "success", passwords), { status: 200 });
}

export const GET = AsyncHandler(getAllPasswords);
