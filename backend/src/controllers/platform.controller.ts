import {Request, Response} from 'express';
import dbService from '../services/db.service';

class PlatformController {
  async searchPlatforms(req: Request, res: Response) {
    let stations = await dbService.searchPlatforms(req.params['searchText']);
    stations = stations.filter(station => {
      if (typeof station.id !== 'string' || station.id === '') {
        return false;
      }
      if (station.type !== 'station') {
        return false;
      }

      return true;
    });
    res.status(200).json(stations);
  }

  getArrivalDepartureQueryParams(req: Request, res: Response):{startTime:Date, duration:number} | undefined {
    let startTime = new Date();
    if (req.query['startTime'] && typeof req.query['startTime'] === 'string') {
      startTime = new Date(1000 * Number.parseInt(req.query['startTime']));
    }

    let duration = 60;
    if (req.query['duration'] && typeof req.query['duration'] === 'string') {
      duration = Number.parseInt(req.query['duration']);
    }
    if (duration > 720 || duration < 0) {
      res.status(400).json({
        error: 'Invalid duration',
        message: 'Please provide a value between 0 and 720',
      });
      return undefined;
    }
    return {
      startTime: new Date(),
      duration: 10
    };
  }

  async getDepartures(req: Request, res: Response) {
    const platformId = req.params['platformId'];

    let queryParams = this.getArrivalDepartureQueryParams(req, res);
    if (queryParams === undefined) {
      return;
    }

    const departures = await dbService.getDepartures(
      platformId,
      queryParams.startTime,
      queryParams.duration,
    );

    res.status(200).json(departures);
  }

  async getArrivals(req: Request, res: Response) {
    const platformId = req.params['platformId'];

    let queryParams = this.getArrivalDepartureQueryParams(req, res);
    if (queryParams === undefined) {
      return;
    }

    const arrivals = await dbService.getArrivals(
      platformId,
      queryParams.startTime,
      queryParams.duration,
    );

    res.status(200).json(arrivals);
  }
}

export default new PlatformController();
