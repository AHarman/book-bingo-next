import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import cards from "cards.json";
import { Typography } from "@mui/material";
import CardGrid from "components/card-grid";
import UserCardSquareContent from "components/editable-card-square-content";
import { useCardStore } from "hooks/useCardStore";

interface FilledCardProps {
    cardId: string;
}

const FilledBingoCard: NextPage<FilledCardProps> = ({ cardId }) => {
    const [ card ] = useCardStore(cardId);

    return <>
        <Typography variant="h2">{card?.name}</Typography>
        <CardGrid card={card} component={UserCardSquareContent}/>
    </>;
};

export const getStaticProps: GetStaticProps = (context) => {
    const cardId = context.params?.["cardSlug"] as string;
    return Promise.resolve({ props: { cardId } });
};

export const getStaticPaths: GetStaticPaths = () => ({
    paths: cards.map(card => ({ params: { cardSlug: card.id } })),
    fallback: false
});

export default FilledBingoCard;