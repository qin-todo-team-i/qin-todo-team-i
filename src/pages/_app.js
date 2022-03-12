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
  return (
    <SWRConfig value={{ fetcher }}>
      <Component {...pageProps} />
    </SWRConfig>
  );
}

export default MyApp;
