import { Key, ReactElement } from "react";
import { Card as CardModel, Square } from "models/card";
import styles from "styles/card-grid.module.scss";
import { Card, CardContent, Typography } from "@mui/material";

interface CardGridProps {
    card: CardModel;
}

export default function CardGrid({ card }: CardGridProps): ReactElement {
    return <div className={styles.grid}>
        { card.squares.map((row, rowIndex) => row.map((square, colIndex) => CardSquare(square, rowIndex * row.length + colIndex))) }
    </div>;
}

function CardSquare(square: Square, key: Key): ReactElement {
    return <Card key={key}>
        <CardContent>
            <Typography variant="h3">{ square.title }</Typography>
            <Typography variant="body1">{ square.description }</Typography>
        </CardContent>
    </Card>;
}