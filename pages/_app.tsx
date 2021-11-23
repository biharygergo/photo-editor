import "tailwindcss/tailwind.css";
import "../styles/slider.css";
import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import Head from "next/head";
import { store } from "../store/store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Head>
        <title>Photo Editor</title>
        <meta name="description" content="Cool photo editor with canvas API" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
