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
}

export default new PlatformController();