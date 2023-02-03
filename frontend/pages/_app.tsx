import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
import "../styles/globals.css";

import type { AppProps } from "next/app";
import Head from "next/head";
import { ToastContainer } from "react-toastify";

import { ContextProvider } from "../wallet/store/walletStore";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ContextProvider>
      <Head>
        <title>Flow FT ShowCase</title>
        <meta name="description" content="A showcase for flow ft" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastContainer position="top-center" autoClose={3000} />
      <Component {...pageProps} />
    </ContextProvider>
  );
}
