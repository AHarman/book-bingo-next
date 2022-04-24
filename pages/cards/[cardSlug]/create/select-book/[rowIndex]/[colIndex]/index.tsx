import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import SearchForm from "components/create-card/book-search/search-form";
import { throwError } from "helpers/helpers";
import cards from "cards.json";
import { Card, Square } from "models/card";
import { ParsedUrlQuery } from "querystring";
import { Typography } from "@mui/material";
import BookSearchResults from "components/create-card/book-search/search-results";
import { useState } from "react";

const SelectBook: NextPage<PageProps> = ({ card, square }) => {
    const [query, setQuery] = useState("");

    return <>
        <Typography variant="h2">{card.name}</Typography>
        <Typography variant="h3">{square.title}</Typography>
        <Typography>{square.description}</Typography>
        <Typography variant="h4">Search for a book!</Typography>
        <SearchForm onSubmit={setQuery}/>
        <BookSearchResults queryText={query}/>
    </>;
};

interface UrlParams {
    cardSlug: string;
    rowIndex: string;
    colIndex: string;
}

interface PageProps {
    card: Card;
    square: Square;
}

export const getStaticProps: GetStaticProps<PageProps, UrlParams & ParsedUrlQuery> = (context) => {
    const cardId = context.params?.cardSlug as string;
    const row = Number.parseInt(context.params?.rowIndex as string);
    const col = Number.parseInt(context.params?.colIndex as string);
    const card = cards.find(it => it.id === cardId) ?? throwError(`Unable to find card with id ${cardId}`);
    const square = card.squares[row][col];
    return Promise.resolve({ props: { card, square } });
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

export default SelectBook;