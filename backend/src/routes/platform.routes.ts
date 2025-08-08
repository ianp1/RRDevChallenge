import express from 'express';
import platformController from '../controllers/platform.controller';

class PlatformRoutes {
    readonly router = express.Router();

    constructor() {
        this.setupRoutes();
    }

    private setupRoutes() {
        
        this.router.get(
            '/',
            platformController.getPlatforms
        );
    }
}


export default new PlatformRoutes();