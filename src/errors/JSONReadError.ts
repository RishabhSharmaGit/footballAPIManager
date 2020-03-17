import BaseError from "./baseError";

class JSONReadError extends BaseError {
    
    protected code: number = 1001;
    protected errorName: string = "JSON_READ_ERROR";

    constructor(message: string) {
        super(message);
    }
    
}

export default JSONReadError;