import { Boolean, Literal, Null, Number, Object, Parsed, Static, String, Union, Optional } from "runtypes";


const Line = Object({
    fahrtNr: Optional(String),
    id: String,
    type: Literal('line'),
    name: String,
    productName: String,
    mode: Optional(String),
    product: Optional(String)
});

const DepartureObj = Object({
    cancelled: Optional(Boolean),
    delay: Union(Number, Null),
    direction: String,
    line: Line,
    platform: Union(String, Null),
    when: Union(String, Null).withParser(value => value ? new Date(value):null),
    plannedWhen: String.withParser(value => new Date(value))
});

export type DepartureStatic = Static<typeof DepartureObj>;
export type Departure = Parsed<typeof DepartureObj> ;


export {DepartureObj as DepartureValidator};
export {Line};