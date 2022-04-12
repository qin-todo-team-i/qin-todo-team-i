import "src/styles/globals.css";
import React from "react";
import { SWRConfig } from "swr";
import axios from "axios";
import { RecoilRoot } from "recoil";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const fetcher = async (url) => {
  const response = await axios
    .get(url)
    .then((res) => {
      // console.log(res);
      return res.data;
    })
    .catch((e) => {
      return e;
    });
  // console.log("response", response);
  return response;
};

function MyApp({ Component, pageProps }) {
  const getLayout =
    Component.getLayout ||
    ((page) => {
      return page;
    });

  return (
    <RecoilRoot>
      <SWRConfig value={{ fetcher }}>
        <DndProvider backend={HTML5Backend}>{getLayout(<Component {...pageProps} />)}</DndProvider>
      </SWRConfig>
    </RecoilRoot>
  );
}

export default MyApp;
