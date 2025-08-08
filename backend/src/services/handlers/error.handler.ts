import { Request, Response, NextFunction } from "express";
import loggingService from "../logging/logging.service";

class ExpressErrorHandler {
    handleError(err:Error, req:Request, res:Response, next:NextFunction) {
        loggingService.log(`Error when processing request ${ req.url }`, "ERROR" );
        loggingService.log(err, "ERROR");

        res.status(500).send();
    }
}

export default new ExpressErrorHandler();