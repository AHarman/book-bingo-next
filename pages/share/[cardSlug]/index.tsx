import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import cards from "cards.json";
import { Typography } from "@mui/material";
import CardGrid from "components/card-grid";
import { useRouter } from "next/router";
import { UserCard, UserCardChoices } from "models/card";
import ShareCardSquareContent from "components/card-squares/share-card-square-content";
import { throwError } from "helpers/helpers";

interface SharedCardPageProps {
    cardId: string;
}

const SharedBingoCardPage: NextPage<SharedCardPageProps> = ({ cardId }) => {
    let card: UserCard = cards.find(card => card.id === cardId) ?? throwError("Unable to find card");
    const router = useRouter();
    const cardString = router.query["squares"] as string;

    if (cardString) {
        const userChoices = JSON.parse(cardString) as UserCardChoices;
        const combinedSquares = card.squares.map((row, rowIndex) => row.map((square, colIndex) => ({...square, book: userChoices[rowIndex][colIndex]})));
        card = {...card, squares: combinedSquares};
    }

    return <>
        <Typography variant="h2">{card?.name}</Typography>
        <CardGrid card={card} component={ShareCardSquareContent}/>
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

export default SharedBingoCardPage;