import "src/styles/globals.css";
import React from "react";
import { SWRConfig } from "swr";
import axios from "axios";

const fetcher = async (url) => {
  const response = await axios
    .get(url)
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((e) => {
      return e;
    });
  console.log("response", response);
  return response;
};

function MyApp({ Component, pageProps }) {
  const getLayout =
    Component.getLayout ||
    ((page) => {
      return page;
    });

  return <SWRConfig value={{ fetcher }}>{getLayout(<Component {...pageProps} />)}</SWRConfig>;
}

export default MyApp;
