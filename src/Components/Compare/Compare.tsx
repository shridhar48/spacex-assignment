import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Launch, LocationState } from '../../Interfaces';
import './Compare.css';

const Compare = () => {
  const location = useLocation<LocationState>();
  const launch1: Launch = location.state.detail[0];
  const launch2: Launch = location.state.detail[1];
  useEffect(() => {
    console.log('Location ', location.state.detail);
  }, [location]);

  const getTitles = (key: string) => {
    return (
      <div className='titleRow'>
        <div className='leftColumn'>{key}</div>
        <div className='middleColumn'>{launch1.mission_name}</div>
        <div className='rightColumn'>{launch2.mission_name}</div>
      </div>
    );
  };

  const getRemainingRows = (
    key: string,
    v1: string | number | null,
    v2: string | number | null,
    isValueALink: boolean,
    link1: string | null,
    link2: string | null
  ) => {
    return (
      <div className='valueRow'>
        <div className='leftColumn'>{key}</div>
        {isValueALink && link1 != null ? (
          <a href={link1} className='middleColumn'>
            {v1}
          </a>
        ) : (
          <div className='middleColumn'>{v1}</div>
        )}
        {isValueALink && link2 !== null ? (
          <a href={link2} className='rightColumn'>
            {v2}
          </a>
        ) : (
          <div className='rightColumn'>{v2}</div>
        )}
      </div>
    );
  };

  return (
    <div className='compareContainer'>
      {getTitles('Details')}
      {getRemainingRows(
        'Launch Date',
        launch1.launch_date_local,
        launch2.launch_date_local,
        false,
        '',
        ''
      )}
      {getRemainingRows(
        'Launch Site',
        launch1.launch_site.site_name_long,
        launch2.launch_site.site_name_long,
        false,
        '',
        ''
      )}
      {getRemainingRows(
        'Article Link',
        launch1.links.article_link,
        launch2.links.article_link,
        true,
        launch1.links.article_link,
        launch2.links.article_link
      )}
      {getRemainingRows(
        'Video Link',
        launch1.links.video_link,
        launch2.links.video_link,
        true,
        launch1.links.video_link,
        launch2.links.video_link
      )}
      {getRemainingRows(
        'Rocket',
        launch1.rocket.rocket_name,
        launch2.rocket.rocket_name,
        false,
        '',
        ''
      )}
      {getRemainingRows(
        'Rreuse Count',
        launch1.rocket.first_stage.cores[0].core.reuse_count,
        launch2.rocket.first_stage.cores[0].core.reuse_count,
        false,
        '',
        ''
      )}
      {getRemainingRows(
        'Status',
        launch1.rocket.first_stage.cores[0].core.status,
        launch2.rocket.first_stage.cores[0].core.status,
        false,
        '',
        ''
      )}
      {getRemainingRows(
        'Payload Mass',
        launch1.rocket.second_stage.payloads[0].payload_mass_kg,
        launch2.rocket.second_stage.payloads[0].payload_mass_kg,
        false,
        '',
        ''
      )}
      {getRemainingRows(
        'Payload Type',
        launch1.rocket.second_stage.payloads[0].payload_type,
        launch2.rocket.second_stage.payloads[0].payload_type,
        false,
        '',
        ''
      )}
    </div>
  );
};

export default Compare;
