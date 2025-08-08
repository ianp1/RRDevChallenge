import app from './app';
import config from './config/config';
import loggingService from './services/logging/logging.service';

app.listen(config.port, (error) => {
  if (error) {
    loggingService.log(error, "ERROR");
  }
  console.log(`Server running on port ${config.port}`);
});

