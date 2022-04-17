import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import SearchForm from "components/search-form";
import { throwError } from "helpers/helpers";
import cards from "cards.json";
import { Card, Square } from "models/card";
import { ParsedUrlQuery } from "querystring";

const SelectBook: NextPage<PageProps> = ({ card, square }) => {
    return <>
        <h2>{card.name}</h2>
        <h3>{square.title}</h3>
        <p>{square.description}</p>
        <h4>Search for a book!</h4>
        <SearchForm></SearchForm>
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
    const card = cards.find(it => it.id == cardId) ?? throwError(`Unable to find card with id ${cardId}`);
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