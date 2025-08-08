import moment from "moment"

type Severity = "INFO" | "WARN" | "ERROR";

//Provides a stub for logging. In production this could be replaced with an actual logging library. 
// Using console.log for sake of the demo
class LoggingService {
    public log(message: string | Error, severity: Severity = 'INFO') {
        let stringMessage = "";
        if (message instanceof Error) {
            stringMessage = JSON.stringify({
                message: message.message,
                stack: message.stack
            }, null, 4);
        } else {
            stringMessage = message;
        }
        const loggingString = moment().format('DD.MM.yyyy HH:mm:ss') + ` [${severity}]: ${stringMessage}`;


        console.log(loggingString);
    }
}

export default new LoggingService();