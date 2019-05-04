import React from 'react';
import PrivateHeader from './PrivateHeader';
import NoteList from './NoteList';



const Dashboard = () => {
  return (
    <div>
      <PrivateHeader title="Dashboard"/>
      <div className="page-content">
        <NoteList />
      </div>
    </div>
  );
};


export default Dashboard;