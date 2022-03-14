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

export async function makeRequest<T>(url: string): Promise<T> {
    const parser = new Parser({ explicitArray: false });
    return await axios.get<string>(addToken(url))
        .then(response => parser.parseStringPromise(response.data))
        .then(result => (result as GoodreadsResponse<T>).GoodreadsResponse)
        .catch(err => {
            console.error(err);
            throw err;
        });
}
