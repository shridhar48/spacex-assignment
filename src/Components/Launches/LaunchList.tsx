/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';

import { LAUNCHES_PAST } from './LaunchQuery';
import LaunchItem from './LaunchItem';
import Filters from '../Filters/Filters';
import { Launch, Launches, LaunchesVars } from '../../Interfaces';

import './LaunchList.css';
import { QUERY_LIMIT } from '../../constants';

const LaunchList = () => {
  const [getLaunches, { loading, variables }] = useLazyQuery<
    Launches,
    LaunchesVars
  >(LAUNCHES_PAST, {
    fetchPolicy: 'no-cache',
    onCompleted: (data: Launches) => {
      data.launchesPast.length < QUERY_LIMIT
        ? setLoadMoreAvailable(false)
        : setLoadMoreAvailable(true);
      variables && variables.offset > 0
        ? setLaunches([...launches, ...data.launchesPast])
        : setLaunches([...data.launchesPast]);
      console.log('Current Data is :', data);
      console.log('Current Variables are :', variables);
    },
    onError: () => {
      console.log('Something went wrong');
    },
  });
  const [searchString, setSearchString] = useState('');
  const [searchBasedOn, setSearchBasedOn] = useState('Mission');
  const [loadMoreAvailable, setLoadMoreAvailable] = useState(false);
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [compareLaunchList, setCompareLaunchList] = useState<Launch[]>([]);

  const onChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchBasedOn(event.target.value);
  };

  const setSearchKey = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(event.target.value);
  };

  const addToCompare = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('New entry is :', event.target.value);
    if (compareLaunchList.some((launch) => launch.id === event.target.value)) {
      const currentList = compareLaunchList;
      currentList.splice(
        currentList.findIndex((launch) => launch.id === event.target.value),
        1
      );
      setCompareLaunchList(currentList);
      console.log('Object found inside the array so removed it .', currentList);
    } else {
      if (compareLaunchList.length === 2) {
        alert('Please remove one selected Launch');
      } else {
        const currentList = compareLaunchList;
        const requiredLaunch = launches.filter(function (launch: Launch) {
          return launch.id === event.target.value;
        });
        currentList.push(requiredLaunch[0]);
        setCompareLaunchList(currentList);
        console.log(
          'Object was not found inside the array so added it .',
          currentList
        );
      }
    }
  };

  useEffect(() => {
    getLaunches({
      variables: {
        limit: QUERY_LIMIT,
        offset: 0,
        mission_name: '',
        rocket_name: '',
      },
    });
  }, []);

  const loadNextOffset = (onSearch: boolean) => {
    getLaunches({
      variables: {
        limit: QUERY_LIMIT,
        offset: !onSearch && variables ? variables.offset + 10 : 0,
        mission_name: searchBasedOn === 'Mission' ? searchString : '',
        rocket_name: searchBasedOn !== 'Mission' ? searchString : '',
      },
    });
  };

  if (loading && (!variables || (variables && variables.offset === 0))) {
    return <h4>Loading...</h4>;
  }

  if (launches && launches.length > 0) {
    return (
      <div className='container'>
        <Filters
          onChangeValue={onChangeValue}
          setSearchKey={setSearchKey}
          loadNextOffset={loadNextOffset}
          searchBasedOn={searchBasedOn}
          searchString={searchString}
        />
        {launches.map((launch: Launch) => {
          return (
            <LaunchItem
              key={launch.id}
              launch={launch}
              addToCompare={addToCompare}
            />
          );
        })}
        {loadMoreAvailable && (
          <button
            onClick={() => loadNextOffset(false)}
            className='LoadMoreButton'
          >
            Load More
          </button>
        )}
      </div>
    );
  }

  return <div>Something went wrong</div>;
};

export default LaunchList;
