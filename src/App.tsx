import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import LaunchList from './Components/Launches/LaunchList';
import Logo from './spacex.png';
import Compare from './Components/Compare/Compare';
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
          <Route exact path='/' component={LaunchList} />
          <Route path='/compare' component={Compare} />
        </BrowserRouter>
      </ApolloProvider>
    </div>
  );
};

export default App;
