import { Literal, Number, Object, Static, String } from "runtypes";

const Location = Object({
    type: Literal('location'),
    id: String,
    latitude: Number,
    longitude: Number
});

const Platform = Object({
    type: Literal('station'),
    location: Location,
    name: String,
    id: String
});

export type PlatformType = Static<typeof Platform>;

export {Platform as PlatformValidator};