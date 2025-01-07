import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Chat from '../components/Chat.jsx'

const Home: NextPage = () => {
  return (
    <div  >
      <Head>
        <title>FamBOT</title>
        <meta name="description" content="An AI Chatbot designed to help you understand Access Bank's Credit Policy Guide (CPG) " />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Chat />
    </div>
  );
};

export default Home;
