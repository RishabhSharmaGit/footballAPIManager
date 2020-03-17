import BaseError from "./baseError";

class JSONWriteError extends BaseError {
    
    protected code: number = 1002;
    protected errorName: string = "JSON_WRITE_ERROR";

    constructor(message: string) {
        super(message);
    }
    
}

export default JSONWriteError;