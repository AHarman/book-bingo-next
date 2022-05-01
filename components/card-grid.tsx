import { ComponentType, ReactElement, ReactNode } from "react";
import { Card as CardModel, Square } from "models/card";
import { Card, CardContent, Grid } from "@mui/material";

export interface SquareContentsProps<S extends Square = Square> {
    square: S;
    rowIndex: number;
    columnIndex: number;
}

interface CardGridProps<S extends Square = Square, C extends CardModel<S> = CardModel<S>> {
    card: C;
    component: ComponentType<SquareContentsProps>;
}

export default function CardGrid({ card, component: Component }: CardGridProps): ReactElement {
    const rowLength = card.squares[0].length;
    const squares = card.squares.flatMap((row, rowIndex) => row.map((square, colIndex) =>
        <CardSquare key={rowIndex * row.length + colIndex}>
            <Component square={square} rowIndex={rowIndex} columnIndex={colIndex} />
        </CardSquare>
    ));

    return <Grid container alignItems="stretch" spacing={2} columns={{xs: 1, md: rowLength}}>
        { squares }
    </Grid>;
}

function CardSquare({ children }: { children: ReactNode }): ReactElement {
    return <Grid item xs={1}>
        <Card sx={{ height: "100%"}}>
            <CardContent>
                { children }
            </CardContent>
        </Card>
    </Grid>;
}