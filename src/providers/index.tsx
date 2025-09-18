import { ApolloProvider } from "@/providers/apollo-provider";

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers = async ({ children }: ProvidersProps) => {
  return <ApolloProvider>{children}</ApolloProvider>;
};
