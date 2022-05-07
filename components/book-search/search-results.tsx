/* eslint-disable @next/next/no-img-element */
import { List, ListItem, ListItemButton, ListItemText, Pagination, Skeleton, Typography } from "@mui/material";
import { Key, ReactElement, useEffect, useRef, useState } from "react";
import { SearchResult, SearchResultBook } from "services/goodreads/search";
import styles from "styles/search-results.module.scss";

interface BookSearchResultsProps {
    queryText: string;
    onBookSelected: (book: SearchResultBook) => void;
}

export default function BookSearchResults({ queryText, onBookSelected }: BookSearchResultsProps): ReactElement {
    const [page, setPage] = useState(1);
    const [results, setResults] = useState(null as (SearchResult | null));
    const [isPending, setIsPending] = useState(false);
    const resultsRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        if (resultsRef.current && !isPending && results)
            resultsRef.current.scrollIntoView();
    }, [resultsRef, isPending, results]);

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
        results?.results.map(book => <Result key={book.id} book={book} onBookSelected={onBookSelected} />);

    return <>
        <List ref={resultsRef}> { items } </List>
        {results && <ResultsFooter page={page} results={results} setPage={setPage}/>}
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
        {
            results.totalResults > 0 &&
            <Pagination
                count={Math.ceil(results.totalResults / results.results.length) || 0}
                page={page}
                onChange={(_: unknown, page: number) => setPage(page)} />
        }
    </>;
}

interface ResultProps {
    book: SearchResultBook;
    onBookSelected: (book: SearchResultBook) => void;
}

function Result({ book, onBookSelected }: ResultProps): ReactElement {
    return <ListItemButton key={book.id} onClick={() => onBookSelected(book)}>
        <img src={book.imageUrl} alt={`cover for ${book.title}`} className={styles.resultImg}/>
        <ListItemText sx={{ ml: 1 }}><i>{book.title}</i> by {book.author}</ListItemText>
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