import "styles/globals.scss";
import type { AppProps } from "next/app";
import { ReactElement } from "react";

function MyApp({ Component, pageProps }: AppProps): ReactElement {

  return <div id="container">
    <h1>Book bingo!</h1>
    <Component {...pageProps} />
  </div>;
}

export default MyApp;
