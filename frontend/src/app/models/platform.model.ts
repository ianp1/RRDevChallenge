import { Boolean, Literal, Number, Object, Static, String } from "runtypes";

const Location = Object({
    type: Literal('location'),
    id: String,
    latitude: Number,
    longitude: Number
});

const Products = Object({
    nationalExpress:Boolean,
    national:Boolean,
    regionalExpress:Boolean,
    regional:Boolean,
    suburban:Boolean,
    bus:Boolean,
    ferry:Boolean,
    subway:Boolean,
    tram:Boolean,
    taxi:Boolean
});

const PlatformObj = Object({
    type: Literal('station'),
    location: Location,
    name: String,
    id: String,
    products: Products
});

export type Platform = Static<typeof PlatformObj> ;

export {PlatformObj as PlatformValidator};