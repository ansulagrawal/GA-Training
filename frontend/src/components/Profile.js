import React from 'react';

const Profile = ({ userDetails }) => {
  return (
    <div>Name: {userDetails.first_name + ' ' + userDetails.last_name}</div>
  );
};

export default Profile;
