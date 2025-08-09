import express from 'express';
import platformController from '../controllers/platform.controller';

class PlatformRoutes {
  readonly router = express.Router();

  constructor() {
    this.setupRoutes();
  }

  private setupRoutes() {
    this.router.get('/ByName/:searchText', platformController.searchPlatforms);

    this.router.get(
      '/:platformId/Departures',
      platformController.getDepartures,
    );

    this.router.get('/:platformId/Arrivals', platformController.getArrivals);
  }
}

export default new PlatformRoutes();
