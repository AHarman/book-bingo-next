import "styles/globals.scss";
import type { AppProps } from "next/app";
import { ReactElement } from "react";
import Head from "next/head";
import { Container, Typography } from "@mui/material";

function MyApp({ Component, pageProps }: AppProps): ReactElement {

  return <Container sx={{pb: 3}}>
    <Head>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
    </Head>
    <Typography variant="h1">Book bingo!</Typography>
    <Component {...pageProps} />
  </Container>;
}

export default MyApp;
