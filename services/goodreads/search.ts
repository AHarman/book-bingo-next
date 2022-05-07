import { isArray } from "util";
import { makeRequest, baseUrl } from "./shared";

interface GoodreadsSearch {
    // For some reason these fields don't have "type='integer'" set so we can't auto-convert
    "results-start": string;
    "results-end": string;
    "total-results": string;
    results: {
        work?: GoodreadsSearchWork[] | GoodreadsSearchWork;
    };
}

interface GoodreadsSearchAuthor {
    id: string;
    name: string;
}

interface GoodreadsSearchBook {
    id: string;
    title: string;
    author: GoodreadsSearchAuthor;
    image_url: string;
    small_image_url: string;
}

interface GoodreadsSearchWork {
    id: string;
    best_book: GoodreadsSearchBook;
    // For some reason these fields don't have "type='integer'" set so we can't auto-convert
    original_publication_year: string;
    original_publication_month: string;
    original_publication_day: string;
}

interface GoodreadsSearchResponse {
    search: GoodreadsSearch;
}

export interface SearchResult {
    resultsStart: number;
    resultsEnd: number;
    totalResults: number;
    currentPage: number;
    results: SearchResultBook[];
}

export interface SearchResultBook {
    id: string;
    title: string;
    publicationYear: number;
    publicationMonth: number;
    publicationDay: number;
    author: string;
    imageUrl: string;
    smallImageUrl: string;
}

function convertWorkToBook(work: GoodreadsSearchWork): SearchResultBook {
    return {
        id: work.id,
        title: work.best_book.title,
        author: work.best_book.author.name,
        imageUrl: work.best_book.image_url,
        smallImageUrl: work.best_book.small_image_url,
        publicationDay: Number.parseInt(work.original_publication_day),
        publicationMonth: Number.parseInt(work.original_publication_month),
        publicationYear: Number.parseInt(work.original_publication_year),
    };
}

function convertToSearchResult(response: GoodreadsSearchResponse, page: number): SearchResult {
    const works = response.search.results.work;
    let results: SearchResultBook[];
    if (Array.isArray(works)) {
        results = works.map(convertWorkToBook);
    } else if (works) {
        results = [convertWorkToBook(works)];
    } else {
        results = [];
    }
    return {
        currentPage: page,
        resultsStart: Number.parseInt(response.search["results-start"]),
        resultsEnd: Number.parseInt(response.search["results-end"]),
        totalResults: Number.parseInt(response.search["total-results"]),
        results
    };
}

export async function searchBooks(query: string, page = 1): Promise<SearchResult> {
    const response = await makeRequest<GoodreadsSearchResponse>(`${baseUrl}/search/index.xml?q=${query}&page=${page}`);
    return convertToSearchResult(response, page);
}
