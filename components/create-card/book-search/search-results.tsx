import { List, ListItem, ListItemButton, ListItemText, Pagination, Skeleton, Typography } from "@mui/material";
import { Key, ReactElement, useEffect, useState } from "react";
import { SearchResult, SearchResultBook } from "services/goodreads/search";


export default function BookSearchResults({ queryText }: { queryText: string }): ReactElement {
    const [page, setPage] = useState(1);
    const [results, setResults] = useState(null as (SearchResult | null));
    const [isPending, setIsPending] = useState(false);

    useEffect(() => {
        async function makeSearch(searchText: string, resultsPage: number): Promise<void> {
            const response = await fetch(`/api/search?query=${searchText}&page=${resultsPage}`);
            const result = await response.json() as SearchResult;
            setResults(result);
            setIsPending(false);
        }

        if (queryText) {
            setIsPending(true);
            makeSearch(queryText, page).catch(console.error);
        }
    }, [queryText, page]);

    if (results == null && !isPending) {
        return <></>;
    }

    const items = isPending ?
        Array.from({ length: 20 }, (_, i) => ResultSkeleton(i)) :
        results?.results.map(Result);

    return <>
        <List> { items } </List>
        {results &&  <ResultsFooter page={page} results={results} setPage={setPage}/>}
    </>;
}

interface ResultsFooterProps {
    results: SearchResult;
    page: number;
    setPage: (page: number) => void;
}

function ResultsFooter({ results, page, setPage }: ResultsFooterProps): ReactElement {
    return <>
        <Typography variant="body2">{getResultCountText(results)}</Typography>
        <Pagination
            count={Math.ceil(results.totalResults / results.results.length) || 0}
            page={page}
            onChange={(_: unknown, page: number) => setPage(page)} />
    </>;
}

function Result(result: SearchResultBook): ReactElement {
    return <ListItemButton key={result.id}>
        <img src={result.imageUrl} alt={`cover for ${result.title}`} />
        <ListItemText><i>{result.title}</i> by {result.author}</ListItemText>
    </ListItemButton>;
}

function ResultSkeleton(key: Key): ReactElement {
    return <ListItem key={key}>
        <Skeleton variant="rectangular" height="150px" width="100px"></Skeleton>
        <Skeleton variant="text" width="100%"><ListItemText >.</ListItemText></Skeleton>
    </ListItem>;
}

function getResultCountText(result: SearchResult): string {
    if (result.totalResults === 0)
        return "No results found";
    return `Showing ${result.resultsStart}-${result.resultsEnd} of ${result.totalResults} results`;
}