"use client";

import Head from "next/head";
import CountingBalloonGame from "@/app/components/CountingBalloonGame";

const BalloonGamePage = () => {
  return (
    <>
      <Head>
        <title>Balloon Counting Game</title>
        <meta name="description" content="A fun counting game for kids using balloons!" />
      </Head>
      <main className="w-screen h-screen overflow-hidden">
        <CountingBalloonGame />
      </main>
    </>
  );
};

export default BalloonGamePage;
