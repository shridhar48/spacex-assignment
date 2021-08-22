import { useState, useEffect } from 'react';

import './LaunchItem.css';

import { Launch } from '../../Interfaces';

type Props = {
  launch: Launch;
  compareLaunchList: Launch[];
  updateAtLaunchList: (launches: Launch[]) => void;
};

let checkBoxList: Launch[] = [];

const LaunchItem = ({
  launch,
  compareLaunchList,
  updateAtLaunchList,
}: Props): JSX.Element => {
  const [checkListUpdated, setCheckListUpdated] = useState<boolean>(false);

  const updateCompareList = (launchid: string) => {
    if (checkBoxList.some((launch) => launch.id === launchid)) {
      checkBoxList.splice(
        checkBoxList.findIndex((launch) => launch.id === launchid),
        1
      );
      setCheckListUpdated(!checkListUpdated);
      updateAtLaunchList(checkBoxList);
    } else {
      if (checkBoxList.length === 2) {
        alert('Please remove one selected Launch');
      } else {
        checkBoxList = [...checkBoxList, ...[launch]];
        setCheckListUpdated(!checkListUpdated);
        updateAtLaunchList(checkBoxList);
      }
    }
  };

  return (
    <div className='launch'>
      <div className='listLeftColumn'>
        <div>Mission : {launch.mission_name}</div>
        <div>Rocket : {launch.rocket.rocket_name}</div>
        <div>Date : {launch.launch_date_local}</div>
      </div>
      <div className='lustRightColumn'>
        <input
          type='checkbox'
          id={launch.id}
          name='Add to Copare'
          disabled={
            checkBoxList.length < 2
              ? false
              : checkBoxList.includes(launch)
              ? false
              : true
          }
          value={launch.id}
          onChange={() => {
            updateCompareList(launch.id);
          }}
        />{' '}
        Add To Compare
      </div>
    </div>
  );
};

export default LaunchItem;
