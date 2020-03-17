import BaseError from "./baseError";

class NotFoundError extends BaseError {
    
    protected code: number = 1004;
    protected errorName: string = "NOT_FOUND_ERROR";

    constructor(message: string) {
        super(message);
    }
    
}

export default NotFoundError;