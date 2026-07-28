import {NextRequest, NextResponse} from "next/server";
import {ApiResponse, ErrorResponse} from "@/app/_utils/functions/Apiresponse";
import VAULT from "@/app/_lib/models/vault/vault.schema";
import {UserModel} from "@/app/_lib/models/user/user.model";
import {AsyncHandler} from "@/app/_utils/functions/helper";

async function fetchById(req: NextRequest) {
    const params = req.nextUrl.searchParams;

    const vaultId = params.get("vault_id");
    const userId = params.get("user_id");

    if (!vaultId || !userId) {
        throw new ErrorResponse(400, "Invalid request parameter");
    }

    const vault = await VAULT.findById(vaultId);
    const user = await UserModel.findById(userId);


    if (!user) {
        throw new ErrorResponse(400, "Invalid request parameter");
    }

    if (!vault) {
        throw new ErrorResponse(404, "vault not found");
    }

    if (!vault.userId.equals(user._id)) {
        throw new ErrorResponse(400, "Invalid request parameter");
    }
    console.log(params)
    return NextResponse.json(new ApiResponse(200, "vault fetch successfully", undefined, vault));
}

export const GET = AsyncHandler(fetchById)