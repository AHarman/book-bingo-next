import cards from "cards.json";
import { Card, UserCard, UserCardChoices } from "models/card";

export function throwError(message: string): never {
    throw new Error(message);
}
export function getCardDefinition(cardId: string): Card {
    return cards.find(card => card.id === cardId) as UserCard ?? throwError(`Unable to find card with ID ${cardId}`);
}

export function getUserCard(card: Card, choices: UserCardChoices): UserCard {
    const combinedSquares = card.squares.map((row, rowIndex) => row.map((square, colIndex) => ({...square, book: choices[rowIndex][colIndex]})));
    return {...card, squares: combinedSquares};
}

