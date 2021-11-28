import Head from "next/head";
import Header from "../components/Header";
import Feed from "../components/Feed";
import Modal from "../components/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import Scroll from "../components/scroll";
import { useState } from "react";
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import Posts from "../components/Posts";

export default function Home() {
  const options = {
    timeout: 5000,
  };
  return (
    <div>
      <Head>
        <title>Query</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Scroll showBelow={250} />
      {/*Section 1 of the app*/}
      <Provider template={AlertTemplate} {...options}>
        <Header />

        {/*Section 2 of the app*/}
        <Feed />
        {/*Section 3 of the app*/}
        <Modal />
      </Provider>
    </div>
  );
}
