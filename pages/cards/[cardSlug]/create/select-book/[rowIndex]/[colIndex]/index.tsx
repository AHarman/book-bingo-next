import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import SearchForm from "components/search-form";
import { throwError } from "helpers/helpers";
import cards from "cards.json";

const SelectBook: NextPage = () => {
    return <>
        <h3>Search for a book!</h3>
        <SearchForm></SearchForm>
    </>;
};

export const getStaticProps: GetStaticProps = (context) => {
    const cardId = context.params?.["cardSlug"] as string;
    const card = cards.find(it => it.id == cardId) ?? throwError(`Unable to find card with id ${cardId}`);
    return Promise.resolve({ props: { card } });
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