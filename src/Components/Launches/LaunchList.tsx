/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';

import { LAUNCHES_PAST } from './LaunchQuery';
import LaunchItem from './LaunchItem';
import Filters from '../Filters/Filters';
import { Launch, Launches, LaunchesVars } from '../../Interfaces';

import './LaunchList.css';
import { QUERY_LIMIT } from '../../constants';
import { useHistory } from 'react-router-dom';

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

  const history = useHistory();

  const onChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchBasedOn(event.target.value);
  };

  const setSearchKey = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(event.target.value);
  };

  const updateAtLaunchList = (launches: Launch[]) => {
    setCompareLaunchList([...launches]);
  };

  const compare = () => {
    history.push({
      pathname: '/compare',
      state: {
        detail: compareLaunchList,
      },
    });
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

  const getBottomButton = () => {
    if (loading && variables && variables.offset !== 0 && launches.length > 0) {
      return <div className='loader'></div>;
    } else if (loadMoreAvailable) {
      return (
        <button
          onClick={() => loadNextOffset(false)}
          className='LoadMoreButton'
        >
          Load More
        </button>
      );
    }
  };

  if (loading && (!variables || (variables && variables.offset === 0))) {
    return (
      <div className='mainLoader'>
        {' '}
        <div className='loader'></div>;
      </div>
    );
  }

  if (launches && launches.length > 0) {
    return (
      <div className='listContainer'>
        <Filters
          onChangeValue={onChangeValue}
          setSearchKey={setSearchKey}
          loadNextOffset={loadNextOffset}
          compare={compare}
          compareLaunchList={compareLaunchList}
          searchBasedOn={searchBasedOn}
          searchString={searchString}
        />
        <div className='launchList'>
          {launches.map((launch: Launch) => {
            return (
              <LaunchItem
                key={launch.id}
                launch={launch}
                compareLaunchList={compareLaunchList}
                updateAtLaunchList={updateAtLaunchList}
              />
            );
          })}
        </div>
        {getBottomButton()}
      </div>
    );
  }

  return (
    <div className='mainLoader'>
      <div>No Results Found!!!</div>
    </div>
  );
};

export default LaunchList;
