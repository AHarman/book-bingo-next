import { getUserCard } from "helpers/helpers";
import { Card, UserCard, UserCardChoices } from "models/card";
import { useRouter } from "next/router";

export function useSharedUserCard(card: Card): UserCard {
    const router = useRouter();
    const cardString = router.query["squares"] as string;
    if (cardString) {
        const userChoices = JSON.parse(cardString) as UserCardChoices;
        return getUserCard(card, userChoices);
    }

    return card;
}