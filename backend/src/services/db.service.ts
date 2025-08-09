// @ts-ignore
import {createClient, Location, Station, Stop} from 'db-vendo-client';
// @ts-ignore
import * as dbNavProfile from 'db-vendo-client/p/dbnav/index.js';
// @ts-ignore
import * as withCache from 'cached-hafas-client';
// @ts-ignore
import {createInMemoryStore} from 'cached-hafas-client/stores/in-memory'

const userAgent = 'https://github.com/ianp1/RRDevChallenge';

class DBService {
    dbClient = createClient(dbNavProfile.default.profile, userAgent);
    store = createInMemoryStore();
    cachedClient = withCache.default.createCachedHafasClient(this.dbClient, this.store);

    constructor() {
        
    }
    
    searchPlatforms(searchText:string): Promise<readonly (Station | Stop | Location)[]> {
        return this.dbClient.locations(searchText, undefined);
    }
}

export default new DBService();