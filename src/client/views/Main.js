import React from 'react';
import Search from '../components/Search';
import Map from '../components/Map';
import LoadingModal from '../components/LoadingModal';
import './style.scss';

const MainView = () => {
  return (
    <div className='main-view'>
      <Search />
      <Map />
      <LoadingModal />
    </div>
  );
};

export default MainView;
