import React from "react";

import UsersList from "../components/UserList";
import PlaceList from "../../Places/components/PlacesList";

const Users = (props) => {
  const USERS = [
    {
      id: "u1",
      name: "yesh",
      image:
        "https://c.ekstatic.net/shared/images/destination/v1/airports/LON/480x480.jpg",
      places: 3,
    },
  ];

  return (
    <>
      <UsersList items={USERS} places={props.items} onDeletePlace={props.onDeletePlace} />
      {props.items && props.items.length > 0 && (
        <>
          <h2 style={{ textAlign: "center", marginTop: "2rem" }}>All Places</h2>
          <PlaceList items={props.items} onDeletePlace={props.onDeletePlace} />
        </>
      )}
    </>
  );       
};

export default Users;
