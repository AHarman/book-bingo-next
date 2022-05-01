/* eslint-disable @next/next/no-img-element */
import { ReactElement } from "react";
import { UserSquare } from "models/card";
import { Button, Typography } from "@mui/material";
import { NextLinkComposed } from "components//link";
import { SquareContentsProps } from "components/card-grid";
import { useRouter } from "next/router";

export default function UserCardSquareContent({ square, rowIndex, columnIndex }: SquareContentsProps<UserSquare>): ReactElement {
    const buttonText = square.book ? "Change selection" : "Select book";
    const router = useRouter();
    return <>
        <Typography variant="h5" component="h3">{ square.title }</Typography>
        <Typography variant="h6" component="h4">{ square.book?.title }</Typography>
        { square.book ?
            <img src={square.book.imageUrl} alt={`Cover image for ${square.book.title}`}/> :
            <Typography variant="body1">{ square.description }</Typography>
        }
        <Button to={`${router.asPath}/select-book/${rowIndex}/${columnIndex}`} component={NextLinkComposed}>{buttonText}</Button>
    </>;
}