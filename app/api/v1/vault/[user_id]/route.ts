import {NextRequest, NextResponse} from "next/server";
import {ApiResponse, ErrorResponse} from "@/app/_utils/functions/Apiresponse";
import VAULT from "@/app/_lib/models/vault/vault.schema";
import {AsyncHandler} from "@/app/_utils/functions/helper";

async function getVaults (req:NextRequest, ctx: RouteContext<"/api/v1/vault/[user_id]">) {
    const {user_id} = await ctx.params;

    if (!user_id) {
        throw new  ErrorResponse(400, "Invalid Request ")
    }

    const vaults = await VAULT.find({
        userId: user_id,
    });

    if (vaults.length === 0) {
        return NextResponse.json(new ApiResponse(200, "create your first vault", undefined, []));
    }

    return NextResponse.json(new ApiResponse(200, "Vault fetched successfully.", undefined, vaults));
}

export const GET = AsyncHandler(getVaults)