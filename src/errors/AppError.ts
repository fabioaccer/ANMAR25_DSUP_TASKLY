class AppError extends Error {
    public readonly statusCode: number;
    public readonly errorCode?: string;

    constructor(message: string, statusCode = 400, errorCode?: string) {
        super(message);
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        Object.setPrototypeOf(this, AppError.prototype);
    }
}

export default AppError;