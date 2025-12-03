import React, { useState } from "react";

import Card from "./UIElements/Card";
import Button from "../../user/components/FormElements/Button";
import Modal from "./UIElements/Modal";
import PlaceMap from "./UIElements/Map";
import "./PlaceItem.css";

const PlaceItem = (props) => {
  const [showMap, setShowMap] = useState(false);
  const [showImage, setShowImage] = useState(false);

  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);
  const openImageHandler = () => setShowImage(true);
  const closeImageHandler = () => setShowImage(false);

  const confirmDeleteHandler = () => {
    if (window.confirm("Are you sure you want to delete this place?")) {
     
      try {
        console.log('[PlaceItem] delete requested for id=', props.id, 'onDelete exists=', !!props.onDelete);
      } catch (err) {
      }
      props.onDelete && props.onDelete(props.id);
    }
  };

  return (
    <React.Fragment>
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
      >
        <div className="map-container">
          <PlaceMap center={props.coordinates} address={props.address} />
        </div>
      </Modal>

      <Modal
        show={showImage}
        onCancel={closeImageHandler}
        header={props.title}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeImageHandler}>CLOSE</Button>}
      >
        <div className="image-container">
          <img src={props.image} alt={props.title} />
        </div>
      </Modal>

      <li className="place-item">
        <Card className="place-item__content">
          <div className="place-item__main">
            <div className="place-item__image">
            <img
              src={props.image}
              alt={props.title}
              onClick={openImageHandler}
              style={{ cursor: "pointer" }}
              title="Click to view full image"
            />
            </div>
            <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
            </div>
          </div>
          <div className="place-item__actions">
            <Button size="small" inverse onClick={openMapHandler} aria-label={`View ${props.title} on map`} title="View on map">
              VIEW ON MAP
            </Button>
            <Button size="small" to={`/places/${props.id}`} aria-label={`Edit ${props.title}`} title="Edit place">
              EDIT
            </Button>
            <Button size="small" danger onClick={confirmDeleteHandler} disabled={!props.onDelete} aria-label={`Delete ${props.title}`} title={props.onDelete ? "Delete place" : "Delete disabled"}>
              DELETE
            </Button>
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default PlaceItem;
