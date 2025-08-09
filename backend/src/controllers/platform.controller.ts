import { Request, Response } from "express";
import dbService from "../services/db.service";

class PlatformController {
    async searchPlatforms(req: Request, res: Response) {
        const stations = await dbService.searchPlatforms(req.params['searchText']);
        res.status(200).json(stations);
    }
}

export default new PlatformController();