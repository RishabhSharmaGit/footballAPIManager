
/**
 * Base class for Errors
 * All Error class should extend this class
 */
abstract class BaseError extends Error {

    protected abstract code: number;
    protected abstract errorName: string;

    constructor(message: string) {
        super(message);
        Error.captureStackTrace(this);
    }

    public getCode(): number {
        return this.code;
    }

    public getErrorName(): string {
        return this.errorName;
    }
}

export default BaseError;