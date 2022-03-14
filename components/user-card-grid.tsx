import { Key, ReactElement } from "react";
import { Card, Square } from "models/card";
import styles from "styles/card-grid.module.scss";
import Link from "next/link";

interface CardGridProps {
    card: Card;
    getPath: (row: number, col: number) => string;
}

export default function UserCardGrid({ card, getPath }: CardGridProps): ReactElement {
    return <div className={styles.grid}>
        { card.squares.map((row, rowIndex) => row.map((square, colIndex) => CardSquare(square, getPath(rowIndex, colIndex), rowIndex * row.length + colIndex))) }
    </div>;
}

function CardSquare(square: Square, linkPath: string, key: Key): ReactElement {
    return <div className={styles.square} key={key}>
        <h3>{ square.title }</h3>
        <p>{ square.description }</p>
        <Link href={linkPath}>Select book</Link>
    </div>;
}