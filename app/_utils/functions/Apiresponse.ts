
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