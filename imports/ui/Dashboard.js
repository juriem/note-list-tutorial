import React from 'react';
import PrivateHeader from './PrivateHeader';
import NoteList from './NoteList';
import Editor  from "./Editor";


const Dashboard = () => {
  return (
    <div>
      <PrivateHeader title="Dashboard"/>
      <div className="page-content">
        <NoteList />
        <Editor />
      </div>
    </div>
  );
};


export default Dashboard;