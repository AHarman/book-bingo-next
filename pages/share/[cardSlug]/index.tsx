import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import cards from "cards.json";
import { Typography } from "@mui/material";
import CardGrid from "components/card-grid";
import { Card } from "models/card";
import ShareCardSquareContent from "components/card-squares/share-card-square-content";
import { getCardDefinition } from "helpers/helpers";
import { useSharedUserCard } from "hooks/useSharedUserCard";

interface SharedCardPageProps {
    card: Card;
}

const SharedBingoCardPage: NextPage<SharedCardPageProps> = ({ card }) => {
    const userCard = useSharedUserCard(card);

    return <>
        <Typography variant="h2">{userCard?.name}</Typography>
        <CardGrid card={userCard} component={ShareCardSquareContent}/>
    </>;
};

export const getStaticProps: GetStaticProps = (context) => {
    const cardId = context.params?.["cardSlug"] as string;
    const card = getCardDefinition(cardId);
    return Promise.resolve({ props: { card } });
};

export const getStaticPaths: GetStaticPaths = () => ({
    paths: cards.map(card => ({ params: { cardSlug: card.id } })),
    fallback: false
});

export default SharedBingoCardPage;