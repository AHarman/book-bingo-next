import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import SearchForm from "components/book-search/search-form";
import { throwError } from "helpers/helpers";
import cards from "cards.json";
import { Book, Card, Square } from "models/card";
import { ParsedUrlQuery } from "querystring";
import { Button, Typography } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import BookSearchResults from "components/book-search/search-results";
import { ReactElement, useState } from "react";
import { useSquareBookStore } from "hooks/useCardStore";
import { NextLinkComposed } from "components/link";

const SelectBookPage: NextPage<PageProps> = ({ card, square, row, column }) => {
    const [query, setQuery] = useState("");
    const [book, setBook] = useSquareBookStore(card.id, row, column);

    return <>
        <Typography variant="h2">{card.name}</Typography>
        <Typography variant="h3">{square.title}</Typography>
        <Typography>{square.description}</Typography>
        { book ? <CurrentBook book={book} returnUrl={`/cards/${card.id}/create`}/> : <></> }
        <Typography variant="h4">Search for a book!</Typography>
        <SearchForm onSubmit={setQuery}/>
        <BookSearchResults queryText={query} onBookSelected={setBook}/>
    </>;
};

interface CurrentBookProps {
    book: Book;
    returnUrl: string;
}

function CurrentBook({ book, returnUrl }: CurrentBookProps): ReactElement {
    return <>
        <Typography variant="h4">Current selection:</Typography>
        { /* eslint-disable-next-line @next/next/no-img-element */ }
        <img src={book.imageUrl} alt={`Cover image for ${book.imageUrl}`}/>
        <Typography>{book.title}</Typography>
        <Typography variant="body2">by <em>{book.author}</em></Typography>
        <Button startIcon={<CheckIcon/>} to={returnUrl} component={NextLinkComposed}>Confirm</Button>
    </>;
}

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
    const cardId = context.params?.cardSlug as string;
    const row = Number.parseInt(context.params?.rowIndex as string);
    const column = Number.parseInt(context.params?.colIndex as string);
    const card = cards.find(it => it.id === cardId) ?? throwError(`Unable to find card with id ${cardId}`);
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