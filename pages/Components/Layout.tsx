import Header from "./Header";
import Head from "next/head";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <Head>
        <title>Deloitte B2C</title>
        <meta name="description" content="Deloitte B2C" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
      <Footer />
    </>
  );
}
