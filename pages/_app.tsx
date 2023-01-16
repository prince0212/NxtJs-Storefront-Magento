import "../styles/globals.css";
import Layout from "./Components/Layout";
import type { AppProps } from "next/app";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { SessionProvider } from "next-auth/react";

const client = new ApolloClient({
  uri: process.env.domain + "graphql/",
  cache: new InMemoryCache(),
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <ApolloProvider client={client}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </SessionProvider>
  );
}
