import { Response } from "express";
import MismatchParametersError from "../errors/mismatchParametersError";
import NotFoundError from "../errors/notFoundError";
import NothingToUpdateError from "../errors/nothingToUpdateError";
import { HTTP_STATUS } from "../static/apiConstants";

class ErrorUtil {

    public static httpErrorHandler(func: Function, res: Response, debugLog = true): void {
		try {
			// execute passed function
			func();
		}
		catch(e) {
			if(e instanceof NotFoundError) {
                if(debugLog) console.error("Type: " + e.getErrorName() + " stackTrace: "+ e.stack);
				res.status(HTTP_STATUS.NOT_FOUND)
					.json({
                        code: e.getCode(),
						errorMessage: `No results found: ${e.message}`,
					});
			}
			else if(e instanceof NothingToUpdateError) {
				if(debugLog) console.error("Type: " + e.getErrorName() + " stackTrace: "+ e.stack);
				res.status(HTTP_STATUS.NOT_MODIFIED)
					.json({
                        code: e.getCode(),
						errorMessage: `Nothing modified: ${e.message}`,
					});
			}
			else if(e instanceof MismatchParametersError) {
				if(debugLog) console.error("Type: " + e.getErrorName() + " stackTrace: "+ e.stack);
				res.status(HTTP_STATUS.BAD_REQUEST)
					.json({
                        code: e.getCode(),
						errorMessage: `Malformed request: ${e.message}`,
					});
			}
			else {
                // Generic error case
                if(debugLog) console.error("Type: " + e.message + " stackTrace: "+ e.stack);
				res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
					.json({
						errorMessage: `An error occured while serving request with cause: ${e.message}`
					})
			}
		}
	}

}

export default ErrorUtil;