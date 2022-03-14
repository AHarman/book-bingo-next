import React, { FormEvent, ReactElement, useState } from "react";
import { SearchResult, SearchResultBook } from "services/goodreads/search";

export default function SearchForm(): ReactElement {
    function handleSubmit(e: FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        fetch(`/api/search?query=${searchText}`)
            .then(response => response.json())
            .then(result => setResults(result as SearchResult))
            .catch(console.error);
    }

    const [searchText, setSearchText] = useState("");
    const [results, setResults] = useState<SearchResult | undefined>(undefined);

    return <>
        <form onSubmit={handleSubmit}>
            <label>
                Enter search term:
                <input type="text" name="searchText" value={searchText} required onChange={e => setSearchText(e.target.value)}></input>
            </label>
        </form>
        { results?.results.map(Result) }
    </>;
}

function Result(result: SearchResultBook): ReactElement {
    // TODO: result.id is not as expected
    return <p key={result.id}><i>{result.title}</i> by {result.author}</p>;
}