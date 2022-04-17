import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { throwError } from "helpers/helpers";
import { Card } from "models/card";
import cards from "cards.json";
import UserCardGrid from "components/user-card-grid";
import { useRouter } from "next/router";

interface FilledCardProps {
    card: Card;
}

const FilledBingoCard: NextPage<FilledCardProps> = ({ card }) => {
    const router = useRouter();
    return <>
        <h2>{card?.name}</h2>
        <UserCardGrid card={card} getPath={(row, col) => `${router.asPath}/select-book/${row}/${col}`}/>
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

export default FilledBingoCard;