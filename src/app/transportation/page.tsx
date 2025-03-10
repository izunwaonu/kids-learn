"use client";

import Head from "next/head";
import CountingBalloonGame from "@/app/components/CountingBalloonGame";

import Transportation from "../components/Transportation";

const TransportationPage = () => {
  return (
    <>
      <Head>
        <title>Guess the Mode of Transportation</title>
        <meta name="description" content="A fun counting game for kids using balloons!" />
      </Head>
      <main className="w-screen h-screen overflow-hidden">
       <Transportation/>
      </main>
    </>
  );
};

export default TransportationPage;
