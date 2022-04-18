import { makeRequest, baseUrl } from "./shared";

interface GoodreadsSearch {
    // For some reason these fields don't have "type='integer'" set so we can't auto-convert
    "results-start": string;
    "results-end": string;
    "total-results": string;
    results: {
        work: GoodreadsSearchWork[];
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

function convertToSearchResult(response: GoodreadsSearchResponse, page: number): SearchResult {
    return {
        currentPage: page,
        resultsStart: Number.parseInt(response.search["results-start"]),
        resultsEnd: Number.parseInt(response.search["results-end"]),
        totalResults: Number.parseInt(response.search["total-results"]),
        results: response.search.results.work?.map(result => ({
            id: result.id,
            title: result.best_book.title,
            author: result.best_book.author.name,
            imageUrl: result.best_book.image_url,
            smallImageUrl: result.best_book.small_image_url,
            publicationDay: Number.parseInt(result.original_publication_day),
            publicationMonth: Number.parseInt(result.original_publication_month),
            publicationYear: Number.parseInt(result.original_publication_year),
        })) ?? []
    };
}

export async function searchBooks(query: string, page = 1): Promise<SearchResult> {
    const response = await makeRequest<GoodreadsSearchResponse>(`${baseUrl}/search/index.xml?q=${query}&page=${page}`);
    return convertToSearchResult(response, page);
}
