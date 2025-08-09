import {Request, Response, NextFunction} from 'express';
import loggingService from '../logging/logging.service';

class ExpressErrorHandler {
  handleError(err: Error, req: Request, res: Response, next: NextFunction) {
    loggingService.log(`Error when processing request ${req.url}`, 'ERROR');
    loggingService.log(err, 'ERROR');
    if (err.message === "Gateway Timeout") {
      res.status(500).send({
        error: "Gateway Timeout",
        message: "Keine Antwort vom DB Server. Das kann an einer zu hohen Anzahl von Anfragen des Nutzers liegen. Bitte versuchen Sie es nach einer kurzen Pause erneut"
      });
      return;
    }

    res.status(500).send();
  }
}

export default new ExpressErrorHandler();
