import React, { useContext } from 'react';
import User from './user';
import Suggestions from './suggestions';
import LoggedInUserContext from '../../context/logged-in-user';

export default function Sidebar() {
  // destructuring the function result to access data more easily
  const { user: { docId = '', fullName, username, userId, following, avatar } = {} } = useContext(
    LoggedInUserContext
  );

  return (
    <div className="p-4">
      <User username={username} fullName={fullName} avatar={avatar} />
      <Suggestions userId={userId} following={following} loggedInUserDocId={docId} />
    </div>
  );
}
