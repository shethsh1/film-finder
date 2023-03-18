import { ThemeProvider } from './context/Theme/ThemeProvider';
import RouteComponent from './RouteComponent';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const App = () => {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'http://localhost:4000/graphql',
  });
  return (
    <ThemeProvider>
      <ApolloProvider client={client}>
        <RouteComponent />
      </ApolloProvider>
    </ThemeProvider>
  );
};

export default App;
