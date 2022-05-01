/* eslint-disable @next/next/no-img-element */
import { ReactElement } from "react";
import { Book, UserSquare } from "models/card";
import styles from "styles/card-grid.module.scss";
import { Card, CardContent, Button, Typography } from "@mui/material";
import { NextLinkComposed } from "../link";
import { useCardStore } from "hooks/useCardStore";

interface CardGridProps {
    cardId: string;
    getPath: (row: number, col: number) => string;
}

export default function UserCardGrid({ cardId, getPath }: CardGridProps): ReactElement {
    const [ card ] = useCardStore(cardId);

    const squares = card.squares.flatMap((row, rowIndex) => row.map((square, colIndex) =>
        <CardSquare
            square={square}
            linkPath={getPath(rowIndex, colIndex)}
            key={rowIndex * row.length + colIndex}
            book={card.squares[rowIndex][colIndex].book}/>
    ));

    return <div className={styles.grid}>
        { squares }
    </div>;
}

interface CardSquareProps {
    square: UserSquare;
    linkPath: string;
    book?: Book;
}

function CardSquare({ square, linkPath, book }: CardSquareProps): ReactElement {
    const buttonText = book ? "Change selection" : "Select book";
    return <Card>
        <CardContent>
            <Typography variant="h5" component="h3">{ square.title }</Typography>
            <Typography variant="h6" component="h4">{book?.title}</Typography>
            { book ?
                <img src={book.imageUrl} alt={`Cover image for ${book.title}`}/> :
                <Typography variant="body1">{ square.description }</Typography>
            }
            <Button to={linkPath} component={NextLinkComposed}>{buttonText}</Button>
        </CardContent>
    </Card>;
}