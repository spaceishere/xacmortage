"use client";

import { ApolloLink, concat, HttpLink, split } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { ApolloNextAppProvider, NextSSRInMemoryCache, NextSSRApolloClient, SSRMultipartLink } from "@apollo/experimental-nextjs-app-support/ssr";
import { getMainDefinition } from "@apollo/client/utilities";

function makeClient() {
  const wsLink = new GraphQLWsLink(
    createClient({
      url: process.env.WSS_ERXES_API_URL!,
    })
  );

  const authLink = new ApolloLink((operation, forward) => {
    const cookie = `pos-config-token=${process.env.NEXT_PUBLIC_POS_TOKEN}`;

    operation.setContext({
      headers: {
        "erxes-app-token": process.env.NEXT_PUBLIC_ERXES_APP_TOKEN,
        cookie,
      },
    });
    return forward(operation);
  });

  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_ERXES_API_URL,
    credentials: "include",
  });

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return definition.kind === "OperationDefinition" && definition.operation === "subscription";
    },
    wsLink,
    httpLink
  );

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache({
      typePolicies: {},
    }),
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            concat(authLink, splitLink),
          ])
        : concat(authLink, splitLink),
  });
}

export const ApolloProvider = ({ children }: React.PropsWithChildren) => {
  return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>;
};
