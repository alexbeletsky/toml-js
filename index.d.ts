type JsonValue = boolean | number | string | JsonMap | JsonArray | Date;
type JsonArray = JsonValue[];
type AnyJson =
    | boolean
    | number
    | string
    | JsonMap
    | Date
    | JsonArray
    | JsonArray[];

interface JsonMap {
    [key: string]: AnyJson;
}
export const dump: (value: any, context?: string[]) => string;
export const parse: (str: string) => JsonMap;
