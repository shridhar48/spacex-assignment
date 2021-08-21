import './LaunchItem.css';

import { Launch } from '../../Interfaces';

type Props = {
  launch: Launch;
  addToCompare: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const LaunchItem = ({ launch, addToCompare }: Props): JSX.Element => {
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
          value={launch.id}
          onChange={addToCompare}
        />{' '}
        Add To Compare
      </div>
    </div>
  );
};

export default LaunchItem;
