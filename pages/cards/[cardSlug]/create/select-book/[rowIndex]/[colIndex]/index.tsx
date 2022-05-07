import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import SearchForm from "components/book-search/search-form";
import { getCardDefinition } from "helpers/helpers";
import cards from "cards.json";
import { Book, Card, Square } from "models/card";
import { ParsedUrlQuery } from "querystring";
import { Button, Typography } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import BookSearchResults from "components/book-search/search-results";
import { ForwardedRef, forwardRef, ReactElement, useEffect, useRef, useState } from "react";
import { useUserSquareStore } from "hooks/useCardStore";
import { NextLinkComposed } from "components/link";

const SelectBookPage: NextPage<PageProps> = ({ card, square, row, column }) => {
    const [query, setQuery] = useState("");
    const [book, setBook] = useUserSquareStore(card.id, row, column);
    const selectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (book && selectionRef.current) {
            selectionRef.current.scrollIntoView();
        }
    }, [book, selectionRef]);

    return <>
        <Typography variant="h2">{card.name}</Typography>
        <Typography variant="h3" mt={3}>{square.title}</Typography>
        <Typography mb={3}>{square.description}</Typography>
        { book ? <CurrentBook book={book} ref={selectionRef} returnUrl={`/cards/${card.id}/create`}/> : <></> }
        <Typography variant="h4" mt={3}>Search for a book!</Typography>
        <SearchForm onSubmit={setQuery}/>
        <BookSearchResults queryText={query} onBookSelected={setBook}/>
    </>;
};

interface CurrentBookProps {
    book: Book;
    returnUrl: string;
}

const CurrentBook = forwardRef<HTMLElement, CurrentBookProps>(
    function CurrentBook({ book, returnUrl }: CurrentBookProps, ref: ForwardedRef<HTMLElement>): ReactElement {
        return <>
            <Typography variant="h4" ref={ref}>Current selection:</Typography>
            { /* eslint-disable-next-line @next/next/no-img-element */ }
            <img src={book.imageUrl} alt={`Cover image for ${book.imageUrl}`}/>
            <Typography>{book.title}</Typography>
            <Typography variant="body2">by <em>{book.author}</em></Typography>
            <Button startIcon={<CheckIcon/>} to={returnUrl} component={NextLinkComposed} variant="contained" sx={{mt: 1}}>Confirm</Button>
        </>;
    }
);

interface UrlParams {
    cardSlug: string;
    rowIndex: string;
    colIndex: string;
}

interface PageProps {
    card: Card;
    square: Square;
    row: number;
    column: number;
}

export const getStaticProps: GetStaticProps<PageProps, UrlParams & ParsedUrlQuery> = (context) => {
    const row = Number.parseInt(context.params?.rowIndex as string);
    const column = Number.parseInt(context.params?.colIndex as string);
    const card = getCardDefinition(context.params?.cardSlug as string);
    const square = card.squares[row][column];
    return Promise.resolve({ props: { card, square, row, column } });
};

export const getStaticPaths: GetStaticPaths = () => {
    const paths = cards.flatMap(card =>
        card.squares.flatMap((row, rowIndex) =>
            row.map((_, colIndex) => ({
                params: {
                    cardSlug: card.id,
                    rowIndex: rowIndex.toString(),
                    colIndex: colIndex.toString()
                }
            }))
        )
    );
    return {
        paths,
        fallback: false
    };
};

export default SelectBookPage;