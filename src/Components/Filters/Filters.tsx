import { Launch } from '../../Interfaces';
import './Filters.css';
type Props = {
  onChangeValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setSearchKey: (event: React.ChangeEvent<HTMLInputElement>) => void;
  loadNextOffset: (onSearch: boolean) => void;
  compare: () => void;
  searchBasedOn: string;
  searchString: string;
  compareLaunchList: Launch[];
};

const Filters = ({
  onChangeValue,
  setSearchKey,
  loadNextOffset,
  compare,
  searchBasedOn,
  searchString,
  compareLaunchList,
}: Props) => {
  console.log('Inside filters :', compareLaunchList);
  return (
    <div className='filterContainer'>
      <div className='searchOptions' onChange={onChangeValue}>
        <input
          type='checkbox'
          value='Mission'
          name='Mission'
          readOnly
          checked={searchBasedOn === 'Mission' ? true : false}
        />{' '}
        Search by Mission Name
        <input
          type='checkbox'
          value='Rocket'
          name='Rocket'
          readOnly
          checked={searchBasedOn === 'Mission' ? false : true}
        />{' '}
        Search by Rocket Name
      </div>
      <div className='searchOptions'>
        <input
          type='search'
          value={searchString}
          onChange={setSearchKey}
          className='input'
          placeholder='Enter a search keyword'
        />
        <button onClick={() => loadNextOffset(true)} className='LoadMoreButton'>
          Search
        </button>
      </div>
      {compareLaunchList.length === 2 && (
        <div className='compareButtonContainer'>
          <button onClick={() => compare()} className='LoadMoreButton'>
            Compare
          </button>
        </div>
      )}
    </div>
  );
};

export default Filters;
