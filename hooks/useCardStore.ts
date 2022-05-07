import { getCardDefinition, getUserCard } from "helpers/helpers";
import { Book, Card, UserCard, UserCardChoices } from "models/card";
import { Dispatch, SetStateAction } from "react";
import { applyAction, usePersistentState } from "./usePersistentState";

function getUserChoices(card: UserCard): UserCardChoices {
    return card.squares.map(rows => rows.map(square => square.book));
}

function getInitialChoices(cardId: string): UserCardChoices {
    const card = getCardDefinition(cardId);
    return [...Array(card.rows) as never[]].map(() => Array(card.columns).fill(undefined) as undefined[]);
}

function useUserCardChoicesStore(cardId: string): [UserCardChoices, Dispatch<SetStateAction<UserCardChoices>>] {
    return usePersistentState(`card:${cardId}`, () => getInitialChoices(cardId));
}

export function useUserCardStore(card: Card): [UserCard, Dispatch<SetStateAction<UserCard>>] {
    const [choices, setChoices] = useUserCardChoicesStore(card.id);

    function setUserCard(action: SetStateAction<UserCard>): void {
        setChoices(getUserChoices(applyAction(action, card)));
    }

    return [getUserCard(card, choices), setUserCard];
}

export function useUserSquareStore(cardId: string, row: number, column: number): [Book | undefined, Dispatch<SetStateAction<Book | undefined>>] {
    const [ choices, setChoices ] = useUserCardChoicesStore(cardId);
    const choice = choices[row][column];

    function setBookState(action: SetStateAction<Book | undefined>): void {
        const newBook = applyAction(action, choice);
        choices[row][column] = newBook;
        setChoices([...choices]);
    }

    return [choice, setBookState];
}