import React from "react";

import UsersList from "../components/UserList";

const Users = () => {
  const USERS = [
    {
      id: "u1",
      name: "yesh",
      image:
        "https://c.ekstatic.net/shared/images/destination/v1/airports/LON/480x480.jpg",
      places: 3,
    },
  ];

  return <UsersList items={USERS} />;       
};

export default Users;
