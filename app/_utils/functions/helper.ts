import { NextRequest, NextResponse } from 'next/server';
import { ErrorResponse } from './Apiresponse';

type AsyncHandlerFunction = (req: NextRequest) => Promise<NextResponse>;

export const AsyncHandler = (fn: AsyncHandlerFunction) => {
    return async (req: NextRequest): Promise<NextResponse> => {
        try {
            return await fn(req);
        } catch (error) {
            const err = error as ErrorResponse;
            console.error('AsyncHandler caught error:', err.message);
            return NextResponse.json({ error: err.message }, { status: err.statusCode || 500 });
        }
    };
};
