import { List, ListItemButton, ListItemText, Pagination, Typography } from "@mui/material";
import { ReactElement, useEffect, useState, useTransition } from "react";
import { SearchResult, SearchResultBook } from "services/goodreads/search";


export default function BookSearchResults({ queryText }: { queryText: string }): ReactElement {
    const [page, setPage] = useState(1);
    const [result, setResult] = useState(null as (SearchResult | null));
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        async function makeSearch(searchText: string, resultsPage: number): Promise<void> {
            const response = await fetch(`/api/search?query=${searchText}&page=${resultsPage}`);
            const result = await response.json() as SearchResult;
            startTransition(() => setResult(result));
        }
        if (queryText)
            makeSearch(queryText, page).catch(console.error);
    }, [queryText, page]);

    if (isPending || !result) {
        return <></>;
    }

    return <>
        <List>{ result?.results.map(Result) }</List>
        <Typography variant="body2">{getResultCountText(result)}</Typography>
        <Pagination
            count={Math.ceil(result.totalResults / result.results.length) || 0}
            page={page}
            onChange={(_: unknown, page: number) => setPage(page)} />
    </>;
}

function Result(result: SearchResultBook): ReactElement {
    return <ListItemButton key={result.id}>
        <img src={result.imageUrl} alt={`cover for ${result.title}`}/>
        <ListItemText><i>{result.title}</i> by {result.author}</ListItemText >
    </ListItemButton>;
}

function getResultCountText(result: SearchResult): string {
    if (result.totalResults === 0)
        return "No results found";
    return `Showing ${result.resultsStart}-${result.resultsEnd} of ${result.totalResults} results`;
}