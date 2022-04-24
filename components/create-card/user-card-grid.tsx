import { Key, ReactElement } from "react";
import { Card as CardModel, Square } from "models/card";
import styles from "styles/card-grid.module.scss";
import { Card, CardContent, Button, Typography } from "@mui/material";
import { NextLinkComposed } from "../link";

interface CardGridProps {
    card: CardModel;
    getPath: (row: number, col: number) => string;
}

export default function UserCardGrid({ card, getPath }: CardGridProps): ReactElement {
    return <div className={styles.grid}>
        { card.squares.map((row, rowIndex) => row.map((square, colIndex) => CardSquare(square, getPath(rowIndex, colIndex), rowIndex * row.length + colIndex))) }
    </div>;
}

function CardSquare(square: Square, linkPath: string, key: Key): ReactElement {
    return <Card key={key}>
        <CardContent>
            <Typography variant="h3">{ square.title }</Typography>
            <Typography variant="body1">{ square.description }</Typography>
            <Button to={linkPath} component={NextLinkComposed}>Select book</Button>
        </CardContent>
    </Card>;
}