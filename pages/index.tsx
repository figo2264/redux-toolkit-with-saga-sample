import Head from "next/head";
import { Layout } from "@/components/layout";

export default function Home() {
  return (
    <>
      <Head>
        <title>CONTROL - 관리 시스템</title>
        <meta name="description" content="CONTROL 관리 시스템" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        {/* Main content goes here */}
      </Layout>
    </>
  );
}
