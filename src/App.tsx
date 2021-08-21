import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import LaunchList from './Components/Launches/LaunchList';
import Logo from './spacex.png';
const client = new ApolloClient({
  uri: 'https://api.spacex.land/graphql',
  cache: new InMemoryCache(),
});

const App = (): JSX.Element => {
  return (
    <div className='Appcontainer'>
      <ApolloProvider client={client}>
        <img className='logo' src={Logo} alt='SpaceX' />
        <BrowserRouter>
          <div>
            <Route exact path='/' component={LaunchList} />
          </div>
        </BrowserRouter>
      </ApolloProvider>
    </div>
  );
};

export default App;
