/*
    Since the following libraries are not fully supported in Typescript, it is easier to import them in typescript ignoring their types
    In a production setting it would be better to create the corresponding types, but emitted due to time constraints
*/

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {createClient, Location, Station, Stop} from 'db-vendo-client';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as dbProfile from 'db-vendo-client/p/db/index.js';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as withCache from 'cached-hafas-client';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {createInMemoryStore} from 'cached-hafas-client/stores/in-memory';
import {Alternative, Arrivals, Departures} from 'hafas-client';

const userAgent = 'https://github.com/ianp1/RRDevChallenge';

class DBService {
  dbClient = createClient(dbProfile.default.profile, userAgent);
  store = createInMemoryStore();
  cachedClient = withCache.default.createCachedHafasClient(
    this.dbClient,
    this.store,
  );

  constructor() {}

  filterBusses(departure: Alternative) {
    if (departure.line) {
      if (departure.line.productName === 'Bus') {
        return false;
      }
      if (departure.line.product === 'bus') {
        return false;
      }
    }

    return true;
  }

  searchPlatforms(
    searchText: string,
  ): Promise<readonly (Station | Stop | Location)[]> {
    //We only search for platforms, ignoring pois, addresses and entrances since there should be no departures
    return this.dbClient.locations(searchText, {
      results: 20,
      stops: true,
      addresses: false,
      poi: false,
      entrances: false,
    });
  }

  getDepartures(
    platformId: string,
    startTime: Date,
    searchDurationMinutes: number,
  ): Promise<Departures[]> {
    const departures = this.dbClient.departures(platformId, {
      when: startTime,
      duration: searchDurationMinutes,
      products: {
        tram: false,
        suburban: false,
        bus: false,
        ferry: false,
        subway: false,
        taxi: false,
      },
    });

    //For some reason, the API still returns some Bus departures. We filter those here, before sending them to frontend
    return departures.then((departures: Departures) => {
      departures.departures = departures.departures.filter(this.filterBusses);

      return departures;
    });
  }

  getArrivals(
    platformId: string,
    startTime: Date,
    searchDurationMinutes: number,
  ) {
    const arrivals = this.dbClient.arrivals(platformId, {
      when: startTime,
      duration: searchDurationMinutes,
      products: {
        tram: false,
        suburban: false,
        bus: false,
        ferry: false,
        subway: false,
        taxi: false,
      },
    });

    return arrivals.then((arrivals: Arrivals) => {
      arrivals.arrivals = arrivals.arrivals.filter(this.filterBusses);

      return arrivals;
    });
  }
}

export default new DBService();
