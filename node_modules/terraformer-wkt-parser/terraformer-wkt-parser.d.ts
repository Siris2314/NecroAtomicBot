import "geojson";
export = WKT;
declare namespace WKT {
    export function parse(wkt: string): GeoJSON.GeometryObject;
    export function convert(geoJSON: GeoJSON.GeometryObject): string;
}
