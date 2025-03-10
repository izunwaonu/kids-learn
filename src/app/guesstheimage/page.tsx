"use client";

import Head from "next/head";
import CountingBalloonGame from "@/app/components/CountingBalloonGame";
import  GuessTheImage from "@/app/components/GuessTheImage";

const BalloonGamePage = () => {
  return (
    <>
      <Head>
        <title>Balloon Counting Game</title>
        <meta name="description" content="A fun counting game for kids using balloons!" />
      </Head>
      <main className="w-screen h-screen overflow-hidden">
       < GuessTheImage/>
      </main>
    </>
  );
};

export default BalloonGamePage;
