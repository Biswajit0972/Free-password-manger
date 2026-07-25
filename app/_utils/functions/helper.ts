import {NextResponse} from "next/server";
import {ErrorResponse} from "@/app/_utils/functions/Apiresponse";
import {databaseConnection} from "@/app/_lib/db/database";

export const AsyncHandler = <
    T extends (...args: any[]) => Promise<NextResponse>
>(fn: T) => {
    return async (...args: Parameters<T>) => {
        try {
            await databaseConnection();
            return await fn(...args);
        } catch (err) {

            if (err instanceof ErrorResponse) {
                return NextResponse.json({error: err.message}, {status: err.statusCode});
            }

            const er = err as Error;
            return NextResponse.json({error: er.message}, {status: 500});
        }
    }
}