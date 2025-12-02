import React, { useState, useEffect, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";

import Input from "../../user/components/FormElements/Input";
import Button from "../../user/components/FormElements/Button";
import Card from "../components/UIElements/Card";
import "./NewPlace.css";
import { AuthContext } from "../../context/AuthContext";

const EditPlace = (props) => {
  const { placeId } = useParams();
  const history = useHistory();
  const auth = useContext(AuthContext);

  const allPlaces = props.items || [];
  const place = allPlaces.find((p) => p.id === placeId);

  const [formState, setFormState] = useState({
    title: "",
    description: "",
    address: "",
    imageUrl: "",
  });

  useEffect(() => {
    if (place) {
      setFormState({
        title: place.title || "",
        description: place.description || "",
        address: place.address || "",
        imageUrl: place.imageUrl || "",
      });
    }
  }, [place]);

  if (!place) {
    return (
      <div className="place-form">
        <Card>
          <h2>Place not found.</h2>
        </Card>
      </div>
    );
  }

  const inputHandler = (id, value) => {
    setFormState((prev) => ({ ...prev, [id]: value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    // Only creator can edit
    if (!auth.user || auth.user.id !== place.creator) {
      alert("You are not allowed to edit this place.");
      return;
    }

    const updated = {
      title: formState.title,
      description: formState.description,
      address: formState.address,
      imageUrl: formState.imageUrl,
    };

    if (props.onUpdatePlace) {
      props.onUpdatePlace(placeId, updated);
    }

    history.push(`/${place.creator}/places`);
  };

  return (
    <form className="place-form" onSubmit={submitHandler}>
      <div className="form-section">
        <h2>Edit Place</h2>

        <Input element="input" id="title" type="text" label="Place Title *" placeholder="Title" onInput={inputHandler} value={formState.title} />

        <Input element="textarea" id="description" label="Description" placeholder="Describe..." rows={4} onInput={inputHandler} value={formState.description} />

        <Input element="input" id="address" type="text" label="Address *" placeholder="Address" onInput={inputHandler} value={formState.address} />

        <Input element="input" id="imageUrl" type="url" label="Image URL" placeholder="https://example.com/image.jpg" onInput={inputHandler} value={formState.imageUrl} />
      </div>

      <div className="form-actions">
        <Button type="submit" className="btn--primary">UPDATE PLACE</Button>
        <Button type="button" onClick={() => history.goBack()} className="btn--secondary">CANCEL</Button>
      </div>
    </form>
  );
};

export default EditPlace;
