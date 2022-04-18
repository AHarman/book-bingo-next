import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import cards from "cards.json";
import CardGrid from "components/card-grid";
import { throwError } from "helpers/helpers";
import { Card } from "models/card";
import { Button, Typography } from "@mui/material";
import { NextLinkComposed } from "components/link";

interface BingoCardProps {
    card: Card;
}

const BingoCard: NextPage<BingoCardProps> = ({ card }) => {
    return <>
        <Typography variant="h2">{card?.name}</Typography>
        <Typography variant="body1">{card?.description}</Typography>
        <Button component={NextLinkComposed} to={`${card.id}/create`}>Fill in your card here!</Button>
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