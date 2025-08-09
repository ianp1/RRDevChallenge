import { Boolean, Literal, Null, Number, Object, Parsed, Static, String, Union, Optional } from "runtypes";
import { Line } from "./departure.model";


const ArrivalObj = Object({
    cancelled: Optional(Boolean),
    delay: Union(Number, Null),
    provenance: String,
    line: Line,
    platform: Union(String, Null),
    when: Union(String, Null).withParser(value => value ? new Date(value):null),
    plannedWhen: String.withParser(value => new Date(value))
});

export type ArrivalStatic = Static<typeof ArrivalObj>;
export type Arrival = Parsed<typeof ArrivalObj> ;


export {ArrivalObj as ArrivalValidator};