import { Typography } from "@mui/material";
import { ReactElement } from "react";
import { SquareContentsProps } from "./card-grid";

export default function BlankCardSquareContent({ square }: SquareContentsProps): ReactElement {
    return <>
        <Typography variant="h5" component="h3">{ square.title }</Typography>
        <Typography variant="body1">{ square.description }</Typography>
    </>;
}