import MismatchParametersError from '../errors/mismatchParametersError';
import NotFoundError from '../errors/notFoundError';
import NothingToUpdateError from '../errors/nothingToUpdateError';
import { HTTP_STATUS } from '../static/apiConstants';
import ErrorUtil from './errorUtil';

describe("Error Utility functions", () => {
  
    const mockResponse = () => {
        const res: any = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
    };
    
    test('to validate if proper function is passed, it will execute that function without any errors', () => {
        const mockFunc: Function = jest.fn();
        const res = mockResponse();
        const func: Function = () => {
            ErrorUtil.httpErrorHandler(mockFunc, res, false);
        };
        expect(func).not.toThrowError();
        expect(mockFunc).toBeCalled();
    })

    test('to validate if the passed function throw NotFoundError, it will populate response with same error', () => {
        const mockFunc: Function = jest.fn(() => {
            throw new NotFoundError('NFError');
        });
        const res = mockResponse();
        ErrorUtil.httpErrorHandler(mockFunc, res, false);
        
        expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.NOT_FOUND);
        expect(res.json).toHaveBeenCalledWith({ code: 1004, errorMessage: 'No results found: NFError' });
    })

    test('to validate if the passed function throw NothingToUpdateError, it will populate response with same error', () => {
        const mockFunc: Function = jest.fn(() => {
            throw new NothingToUpdateError('NTUError');
        });
        const res = mockResponse();
        ErrorUtil.httpErrorHandler(mockFunc, res, false);
        
        expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.NOT_MODIFIED);
        expect(res.json).toHaveBeenCalledWith({ code: 1005, errorMessage: 'Nothing modified: NTUError' });
    })

    test('to validate if the passed function throw MismatchParametersError, it will populate response with same error', () => {
        const mockFunc: Function = jest.fn(() => {
            throw new MismatchParametersError('MPError');
        });
        const res = mockResponse();
        ErrorUtil.httpErrorHandler(mockFunc, res, false);
        
        expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
        expect(res.json).toHaveBeenCalledWith({ code: 1003, errorMessage: 'Malformed request: MPError' });
    })

    test('to validate if the passed function throw any other Error, it will populate response with same error', () => {
        const mockFunc: Function = jest.fn(() => {
            throw new RangeError('RError');
        });
        const res = mockResponse();
        ErrorUtil.httpErrorHandler(mockFunc, res, false);
        
        expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.INTERNAL_SERVER_ERROR);
        expect(res.json).toHaveBeenCalledWith({ errorMessage: 'An error occured while serving request with cause: RError' });
    })
})
