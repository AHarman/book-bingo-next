import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import cards from "cards.json";
import CardGrid from "components/card-grid";
import { throwError } from "helpers/helpers";
import { Card } from "models/card";

interface BingoCardProps {
    card: Card;
}

const BingoCard: NextPage<BingoCardProps> = ({ card }) => {
    return <>
        <h2>{card?.name}</h2>
        <p>{card?.description}</p>
        <Link href={`${card.id}/create`}>Fill in your card here!</Link>
        <CardGrid card={card} />
    </>;
};

export const getStaticProps: GetStaticProps = (context) => {
    const cardId = context.params?.["cardSlug"] as string;
    const card = cards.find(it => it.id == cardId) ?? throwError(`Unable to find card with id ${cardId}`);
    return Promise.resolve({ props: { card } });
};

export const getStaticPaths: GetStaticPaths = () => ({
    paths: cards.map(card => ({ params: { cardSlug: card.id } })),
    fallback: false
});

export default BingoCard;