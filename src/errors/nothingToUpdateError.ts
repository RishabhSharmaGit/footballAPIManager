import BaseError from "./baseError";

class NothingToUpdateError extends BaseError {
    
    protected code: number = 1005;
    protected errorName: string = "NOTHING_TO_UPDATE_ERROR";

    constructor(message: string) {
        super(message);
    }
    
}

export default NothingToUpdateError;