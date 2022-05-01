import { List, ListItemButton, Typography } from "@mui/material";
import type { NextPage } from "next";
import cards from "cards.json";
import { Card } from "models/card";
import { ReactElement } from "react";
import { useRouter } from "next/router";
import { NextLinkComposed } from "components/link";

const Home: NextPage = () => {
    return <>
        <Typography variant="h2">Select a card to fill in:</Typography>
        <List>
            { cards.map(card => <CardListItem card={card} key={card.id}/>) }
        </List>
    </>;
};

function CardListItem({ card }: { card: Card }): ReactElement {
    return <ListItemButton to={`/cards/${card.id}`} component={NextLinkComposed}>
        <Typography>{card.name}</Typography>
    </ListItemButton>;
}

export default Home;
