import { Request, Response } from "express";

class PlatformController {
    getPlatforms(req: Request, res: Response) {
        res.status(200).json([]);
    }
}

export default new PlatformController();