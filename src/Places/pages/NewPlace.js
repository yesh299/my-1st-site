import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import Input from "../../user/components/FormElements/Input";
import Button from "../../user/components/FormElements/Button";
import Card from "../components/UIElements/Card";
import "./NewPlace.css";
import { AuthContext } from "../../context/AuthContext";

const NewPlace = (props) => {
  const history = useHistory();
  const authContext = useContext(AuthContext);
  const [formState, setFormState] = useState({
    title: "",
    description: "",
    address: "",
    imageUrl: "",
  });
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

  const placeInputHandler = (id, value, isValid) => {
    setFormState((prev) => ({ ...prev, [id]: value }));

    // Preview image as user types URL
    if (id === "imageUrl" && value) {
      setImagePreviewUrl(value);
    } else if (id === "imageUrl" && !value) {
      setImagePreviewUrl("");
    }
  };

  const placeSubmitHandler = (event) => {
    event.preventDefault();

    // Validate required fields
    if (!formState.title.trim() || !formState.address.trim()) {
      alert("Title and Address are required!");
      return;
    }

    const newPlace = {
      id: `p${Date.now()}`,
      title: formState.title,
      description: formState.description,
      imageUrl:
        formState.imageUrl ||
        "https://images.pexels.com/photos/1454496/pexels-photo-1454496.jpeg?auto=compress&cs=tinysrgb&w=600",
      address: formState.address,
      location: {
        lat: Math.random() * 180 - 90,
        lng: Math.random() * 360 - 180,
      },
      creator: authContext && authContext.user ? authContext.user.id : "u1",
    };

    if (props.onAddPlace) {
      props.onAddPlace(newPlace);
    }

    history.push(`/${newPlace.creator}/places`);
  };

  return (
    <form className="place-form" onSubmit={placeSubmitHandler}>
      <div className="form-section">
        <h2>Add a New Place</h2>

        <Input
          element="input"
          id="title"
          type="text"
          label="Place Title *"
          placeholder="e.g., Eiffel Tower"
          onInput={placeInputHandler}
        />

        <Input
          element="textarea"
          id="description"
          label="Description"
          placeholder="Describe the place..."
          rows={4}
          onInput={placeInputHandler}
        />

        <Input
          element="input"
          id="address"
          type="text"
          label="Address *"
          placeholder="e.g., Paris, France"
          onInput={placeInputHandler}
        />

        <Input
          element="input"
          id="imageUrl"
          type="url"
          label="Image URL"
          placeholder="https://example.com/image.jpg"
          onInput={placeInputHandler}
        />
      </div>

      {imagePreviewUrl && (
        <Card className="image-preview-card">
          <div className="image-preview">
            <img src={imagePreviewUrl} alt="Preview" />
          </div>
        </Card>
      )}

      <div className="form-actions">
        <Button type="submit" className="btn--primary">
          ADD PLACE
        </Button>
        <Button
          type="button"
          onClick={() => history.goBack()}
          className="btn--secondary"
        >
          CANCEL
        </Button>
      </div>
    </form>
  );
};

export default NewPlace;