import { ThemeProvider } from './context/Theme/ThemeProvider';
import RouteComponent from './RouteComponent';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const App = () => {
  const httpLink = createHttpLink({
    uri: `${process.env.REACT_APP_BACKEND_API_URL}/graphql`,
  });

  const authLink = setContext((_, { headers }) => {
    // Retrieve the token from wherever it's stored
    const token = localStorage.getItem('authToken');
    // Add the token to the headers
    return {
      headers: {
        ...headers,
        'x-auth-token': token || '',
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
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
