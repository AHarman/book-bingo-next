import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import cards from "cards.json";
import { Button, Typography } from "@mui/material";
import CardGrid from "components/card-grid";
import { useCardStore } from "hooks/useCardStore";
import { NextLinkComposed } from "components/link";
import ShareIcon from '@mui/icons-material/Share';
import EditableUserCardSquareContent from "components/card-squares/editable-card-square-content copy";
import { UserCard } from "models/card";

interface EditableBingoCardPageProps {
    cardId: string;
}

const EditableBingoCardPage: NextPage<EditableBingoCardPageProps> = ({ cardId }) => {
    const [ card ] = useCardStore(cardId);

    return <>
        <Typography variant="h2">{card?.name}</Typography>
        <CardGrid card={card} component={EditableUserCardSquareContent}/>
        <Button variant="contained" component={NextLinkComposed} to={GetUri(card)} endIcon={<ShareIcon/>}>Share</Button>
    </>;
};

function GetUri(card: UserCard): string {
    const data = card.squares.map(row => row.map(square => square.book));
    return `/share/${card.id}?squares=${encodeURIComponent(JSON.stringify(data))}`;
}

export const getStaticProps: GetStaticProps = (context) => {
    const cardId = context.params?.["cardSlug"] as string;
    return Promise.resolve({ props: { cardId } });
};

export const getStaticPaths: GetStaticPaths = () => ({
    paths: cards.map(card => ({ params: { cardSlug: card.id } })),
    fallback: false
});

export default EditableBingoCardPage;