
export class ApiResponse<T> {
    statusCode: number;
    message?: string;
    data?: T;
    status: string;
    constructor(statusCode: number, message?: string, status: string = "success", data?: T) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.status = status;
    }
}

export class ErrorResponse extends Error {
    statusCode: number;
    status: string;
    constructor(statusCode: number, message: string, status: string = "error") {
        super(message);
        this.statusCode = statusCode;
        this.status = status;
    }
}