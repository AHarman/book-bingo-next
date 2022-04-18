import axios from "axios";
import { Parser } from "xml2js";
// TODO: Figure out how to write absolute paths.
import { throwError } from "helpers/helpers";

const token = process.env.GOODREADS_TOKEN ?? throwError("Goodreads token not found");
const addToken = (url: string): string => `${url}${url.includes("?") ? "&" : "?"}key=${token}`;

export interface GoodreadsResponse<T> {
    GoodreadsResponse: T;
}

export const baseUrl = "https://www.goodreads.com";

interface DefaultNodeType {
    $?: {[key: string]: string};
    _?: string;
}

// Abuse the validator functionality to manipulate during parsing.
// Not ideal but I've raised the following:
// https://github.com/Leonidas-from-XIV/node-xml2js/pull/642
// https://github.com/Leonidas-from-XIV/node-xml2js/pull/643
function validator(_: string, __: unknown, newValue: unknown): unknown {
    let value = integerConverter(newValue);
    value = whitespaceOnlyConverter(value);
    return value;
}

function whitespaceOnlyConverter(newValue: unknown): unknown {
    if (typeof newValue == "string" && /^\s+$/.test(newValue)) {
        return "";
    }
    return newValue;
}

function integerConverter(newValue: unknown): unknown {
    const newValueTyped = newValue as DefaultNodeType;
    if (newValueTyped?.$?.type === "integer") {
        return newValueTyped._ ? Number.parseInt(newValueTyped._) : undefined;
    }
    return newValue;
}

export async function makeRequest<T>(url: string): Promise<T> {
    const parser = new Parser({ explicitArray: false, validator, trim: true });
    return await axios.get<string>(addToken(url))
        .then(response => parser.parseStringPromise(response.data))
        .then(result => (result as GoodreadsResponse<T>).GoodreadsResponse)
        .catch(err => {
            console.error(err);
            throw err;
        });
}
