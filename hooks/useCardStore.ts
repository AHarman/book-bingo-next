import cards from "cards.json";
import { throwError } from "helpers/helpers";
import { Book, UserCard } from "models/card";
import { Dispatch, SetStateAction } from "react";
import { applyAction, usePersistentState } from "./usePersistentState";

export function useCardStore(cardId: string): [UserCard, Dispatch<SetStateAction<UserCard>>] {
    const card = cards.find(card => card.id === cardId) as UserCard ?? throwError(`Unable to find card with ID ${cardId}`);
    return usePersistentState(`card:${cardId}`, card);
}

export function useSquareBookStore(cardId: string, row: number, column: number): [Book | undefined, Dispatch<SetStateAction<Book | undefined>>] {
    const [ card, setCard ] = useCardStore(cardId);
    const square = card.squares[row][column];

    function setBookState(action: SetStateAction<Book | undefined>): void {
        const newBook = applyAction(action, square.book);
        card.squares[row][column].book = newBook;
        setCard({...card});
    }

    return [square.book, setBookState];
}