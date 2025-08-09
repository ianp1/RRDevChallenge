import { Request, Response } from "express";
import dbService from "../services/db.service";

class PlatformController {
    async searchPlatforms(req: Request, res: Response) {
        let stations = await dbService.searchPlatforms(req.params['searchText']);
        stations = stations.filter(station => {
            if ((typeof station.id) !== 'string' || station.id === '') {
                return false;
            }
            if (station.type !== 'station') {
                return false;
            }

            return true;
        });
        res.status(200).json(stations);
    }

    async getDepartures(req: Request, res: Response) {
        let platformId = req.params['platformId'];

        let startTime = new Date();
        if (req.query['startTime'] && typeof req.query['startTime'] === 'string') {
            startTime = new Date(1000 * Number.parseInt(req.query['startTime']));
        }
        
        let duration = 30;
        if (req.query['duration'] && typeof req.query['duration'] === 'string') {
            duration = Number.parseInt(req.query['duration']);
        }
        if (duration > 720 || duration < 0) {
            res.status(400).json({
                error: "Invalid duration",
                message: "Please provide a value between 0 and 720"
            });
            return;
        }

        let departures = await dbService.getDepartures(platformId, startTime, duration);

        res.status(200).json(departures);
    }

    async getArrivals(req: Request, res: Response) {
        let platformId = req.params['platformId'];

        let startTime = new Date();
        if (req.query['startTime'] && typeof req.query['startTime'] === 'string') {
            startTime = new Date(1000 * Number.parseInt(req.query['startTime']));
        }
        
        let duration = 30;
        if (req.query['duration'] && typeof req.query['duration'] === 'string') {
            duration = Number.parseInt(req.query['duration']);
        }
        if (duration > 720 || duration < 0) {
            res.status(400).json({
                error: "Invalid duration",
                message: "Please provide a value between 0 and 720"
            });
            return;
        }

        let arrivals = await dbService.getArrivals(platformId, startTime, duration);

        res.status(200).json(arrivals);
    }
}

export default new PlatformController();