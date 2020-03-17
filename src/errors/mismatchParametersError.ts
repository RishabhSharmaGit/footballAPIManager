import BaseError from "./baseError";

class MismatchParametersError extends BaseError {
    
    protected code: number = 1003;
    protected errorName: string = "MISMATCH_PARAMETERS_ERROR";

    constructor(message: string) {
        super(message);
    }
    
}

export default MismatchParametersError;