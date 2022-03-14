export interface Card {
    id: string;
    name: string;
    description: string;
    squares: Square[][];
}

export interface Square {
    title: string;
    description: string;
}