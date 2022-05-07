import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import cards from "cards.json";
import { Button, Typography } from "@mui/material";
import CardGrid from "components/card-grid";
import { useUserCardStore } from "hooks/useCardStore";
import { NextLinkComposed } from "components/link";
import ShareIcon from '@mui/icons-material/Share';
import EditableUserCardSquareContent from "components/card-squares/editable-card-square-content copy";
import { Card, UserCard } from "models/card";
import { getCardDefinition, getUserChoices } from "helpers/helpers";

interface EditableBingoCardPageProps {
    card: Card;
}

const EditableBingoCardPage: NextPage<EditableBingoCardPageProps> = ({ card }) => {
    const [ userCard ] = useUserCardStore(card);

    return <>
        <Typography variant="h2">{userCard?.name}</Typography>
        <Button sx={{ mt: 2, mb:2 }} variant="contained" component={NextLinkComposed} to={GetUri(userCard)} endIcon={<ShareIcon/>}>Share your card</Button>
        <CardGrid card={userCard} component={EditableUserCardSquareContent}/>
    </>;
};

function GetUri(card: UserCard): string {
    const data = getUserChoices(card);
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