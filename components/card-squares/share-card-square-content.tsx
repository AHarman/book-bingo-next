/* eslint-disable @next/next/no-img-element */
import { ReactElement } from "react";
import { Book, UserSquare } from "models/card";
import { Typography } from "@mui/material";
import { SquareContentsProps } from "components/card-grid";

export default function ShareCardSquareContent({ square }: SquareContentsProps<UserSquare>): ReactElement {
    return <>
        <Typography variant="h5" component="h3">{ square.title }</Typography>
        { square.book ?
            <BookInfo book={square.book}/> :
            <Typography variant="body1">{ square.description }</Typography>
        }
    </>;
}

function BookInfo({ book }: { book: Book }): ReactElement {
    return <>
        <Typography variant="h6" component="h4">{ book.title }</Typography>
        <Typography>by <em>{ book.author }</em></Typography>
        <img src={book.imageUrl} alt={`Cover image for ${book.title}`}/>
    </>;
}