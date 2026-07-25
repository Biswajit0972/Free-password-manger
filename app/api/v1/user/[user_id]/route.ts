import { databaseConnection } from '@/app/_lib/db/database';
import { UserModel } from '@/app/_lib/models/user/user.model';
import { ApiResponse, ErrorResponse } from '@/app/_utils/functions/Apiresponse';
import { AsyncHandler } from '@/app/_utils/functions/helper';
import { NextRequest, NextResponse } from 'next/server';


async function getUser(req: NextRequest, ctx: RouteContext<"/api/v1/user/[user_id]">) {
    const {user_id} = await ctx.params;

    if (!user_id) {
        return NextResponse.json({ error: 'Missing [user_id]' }, { status: 400 });
    }

    const user = await UserModel.findOne({ clerkId: user_id }).select(['-email', '-firstName', '-lastName', '-imageUrl', '-lastSignInAt', '-createdAt']);

    if (!user) {
        throw new ErrorResponse(404, 'User not found');
    }

    return NextResponse.json(new ApiResponse(200, ``, 'success', user), { status: 200 });
}

export const GET = AsyncHandler(getUser);