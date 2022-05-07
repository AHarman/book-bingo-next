import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import cards from "cards.json";
import { Button, Typography } from "@mui/material";
import CardGrid from "components/card-grid";
import { useUserCardStore } from "hooks/useCardStore";
import { NextLinkComposed } from "components/link";
import ShareIcon from '@mui/icons-material/Share';
import EditableUserCardSquareContent from "components/card-squares/editable-card-square-content copy";
import { Card, UserCard } from "models/card";
import { getCardDefinition } from "helpers/helpers";

interface EditableBingoCardPageProps {
    card: Card;
}

const EditableBingoCardPage: NextPage<EditableBingoCardPageProps> = ({ card }) => {
    const [ userCard ] = useUserCardStore(card);

    return <>
        <Typography variant="h2">{userCard?.name}</Typography>
        <CardGrid card={userCard} component={EditableUserCardSquareContent}/>
        <Button variant="contained" component={NextLinkComposed} to={GetUri(userCard)} endIcon={<ShareIcon/>}>Share</Button>
    </>;
};

function GetUri(card: UserCard): string {
    const data = card.squares.map(row => row.map(square => square.book));
    return `/share/${card.id}?squares=${encodeURIComponent(JSON.stringify(data))}`;
}

export const getStaticProps: GetStaticProps<EditableBingoCardPageProps> = (context) => {
    const card = getCardDefinition(context.params?.["cardSlug"] as string);
    return Promise.resolve({ props: { card } });
};

export const getStaticPaths: GetStaticPaths = () => ({
    paths: cards.map(card => ({ params: { cardSlug: card.id } })),
    fallback: false
});

export default EditableBingoCardPage;