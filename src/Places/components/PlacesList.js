import React from "react";

import Card from "./UIElements/Card";
import "./PlacesList.css";
import PlaceItem from "./PlaceItem";

const PlaceList = (props) => {
  if (props.Item.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No places found. Maybe create one?</h2>
          <button>share place</button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="place-list">
      {props.Item.map((place) => (
        <PlaceItem
          key={place.id}
          id={place.id}
          image={place.imageUrl}
          title={place.title}
          description={place.description}
          address={place.address}
          creatorId={place.creator}
          coordinates={place.location}
        />
      ))}
    </ul>
  );
};
export default PlaceList;
