import { NextResponse } from 'next/server';
import { ErrorResponse } from './Apiresponse';

type AsyncHandlerFunction = (req: Request) => Promise<NextResponse>;

export const AsyncHandler = (fn: AsyncHandlerFunction) => {
    return async (req: Request): Promise<NextResponse> => {
        try {
            return await fn(req);
        } catch (error) {
            console.error('AsyncHandler caught error:', error);
            const err = error as ErrorResponse;
            return NextResponse.json({ error: err.message }, { status: err.statusCode || 500 });
        }
    };
};
