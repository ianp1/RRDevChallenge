import { Literal, Number, Object, Static, String } from "runtypes";

const Location = Object({
    type: Literal('location'),
    id: String,
    latitude: Number,
    longitude: Number
});

const PlatformObj = Object({
    type: Literal('station'),
    location: Location,
    name: String,
    id: String
});

export type Platform = Static<typeof PlatformObj> ;

export {PlatformObj as PlatformValidator};