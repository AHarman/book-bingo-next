export interface Card<S extends Square = Square> {
    id: string;
    name: string;
    description: string;
    squares: S[][];
}

export interface Square {
    title: string;
    description: string;
}

export interface Book {
    id: string;
    title: string;
    imageUrl: string;
    author: string;
}

export interface UserSquare extends Square {
    book?: Book;
}

export type UserCard = Card<UserSquare>;

export type UserCardChoices = (Book | undefined)[][];
