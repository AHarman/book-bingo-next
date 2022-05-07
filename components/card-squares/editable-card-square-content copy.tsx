/* eslint-disable @next/next/no-img-element */
import { ReactElement } from "react";
import { Book, UserSquare } from "models/card";
import { Button, Typography } from "@mui/material";
import { NextLinkComposed } from "components//link";
import { SquareContentsProps } from "components/card-grid";
import { useRouter } from "next/router";

export default function EditableUserCardSquareContent({ square, rowIndex, columnIndex }: SquareContentsProps<UserSquare>): ReactElement {
    const buttonText = square.book ? "Change selection" : "Select book";
    const router = useRouter();
    return <>
        <Typography variant="h5" component="h3">{ square.title }</Typography>
        { square.book ?
            <BookInfo book={square.book}/> :
            <Typography variant="body1">{ square.description }</Typography>
        }
        <Button to={`${router.asPath}/select-book/${rowIndex}/${columnIndex}`} component={NextLinkComposed}>{buttonText}</Button>
    </>;
}

function BookInfo({ book }: { book: Book }): ReactElement {
    return <>
        <Typography variant="h6" component="h4">{ book.title }</Typography>
        <Typography>by <em>{ book.author }</em></Typography>
        <img src={book.imageUrl} alt={`Cover image for ${book.title}`}/>
    </>;
}