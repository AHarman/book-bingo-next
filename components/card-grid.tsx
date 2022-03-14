import { Key, ReactElement } from "react";
import { Card, Square } from "models/card";
import styles from "styles/card-grid.module.scss";

interface CardGridProps {
    card: Card;
}

export default function CardGrid({ card }: CardGridProps): ReactElement {
    return <div className={styles.grid}>
        { card.squares.map((row, rowIndex) => row.map((square, colIndex) => CardSquare(square, rowIndex * row.length + colIndex))) }
    </div>;
}

function CardSquare(square: Square, key: Key): ReactElement {
    return <div className={styles.square} key={key}>
        <h3>{ square.title }</h3>
        <p>{ square.description }</p>
    </div>;
}