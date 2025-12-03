import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import Users from "./user/pages/Users";
import NewPlace from "./Places/pages/NewPlace";
import UserPlaces from './Places/pages/UserPlaces';
import Auth from "./user/pages/Auth";
import MainNavigation from "./Places/components/Navigation/MainNavigation";
import EditPlace from "./Places/pages/EditPlace";
import { AuthProvider } from "./context/AuthContext";
import Toast from "./components/Toast";

const DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Empire State Building',
    description: 'one of the most famous sky scrapers in the world!',
    imageUrl:
      'https://images.ctfassets.net/1aemqu6a6t65/6iCC1vCYS1Br0sfIVbVBAH/13cc013e2e3f76bb247452bcfa4eb6d6/empire-state-building-observatory-ctc-7009-3000x2000?w=1200&h=800&q=75',
    address: '20 W 34th St., New York, NY 10001',
    location: {
      lat: 23.3338552,
      lng: 85.2590592,
    },
    creator: 'u1',
  },
  {
    id: 'p2',
    title: 'Golden Temple',
    description: 'one of the most famous temple in Amritsar that is golden tample! ',
    imageUrl:
      'https://www.tallengestore.com/cdn/shop/products/Golden_Temple_Amritsar_Sri_Harmandir_Sahib_-_Sikh_Holiest_Shrine_aa044168-d68c-4329-9c1b-febf3ce6478d.jpg?v=1570240235',
    address: 'JV9G+XH Amritsar, Punjab',
    location: {
      lat: 31.6199848,
      lng: 74.87391,
    },
    creator: 'u2',
  },
  {
    id: 'p3',
    title: 'Burj khalifa',
    description: 'one of the most famous hotel in dubai Burj khalifa! ',
    imageUrl:
      'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/07/02/fb/f1.jpg',
    address: ' 57WF+VQ Dubai - United Arab Emirates',
    location: {
      lat: 25.1972018,
      lng: 55.2718015,
    },
    creator: 'u3',
  },
];

const App = () => {
  const [places, setPlaces] = useState(DUMMY_PLACES);
  // toast state (simple global toast)
  const [toastMessage, setToastMessage] = useState("");
  const clearToast = () => setToastMessage("");

  const addPlaceHandler = (placeData) => {
    setPlaces((prev) => [placeData, ...prev]);
    setToastMessage("Place added");
  };

  const updatePlaceHandler = (placeId, updatedData) => {
    setPlaces((prev) => prev.map((p) => (p.id === placeId ? { ...p, ...updatedData } : p)));
    setToastMessage("Place updated");
  };

  const deletePlaceHandler = (placeId) => {
    setPlaces((prev) => prev.filter((p) => p.id !== placeId));
    setToastMessage("Place deleted");
  };

  

  return (
    <AuthProvider>
      <Router>
        <MainNavigation />
        <Toast message={toastMessage} onClose={clearToast} />
        <main style={{ marginTop: "4.5rem" }}>
          <div style={{ width: "90%", maxWidth: 1100, margin: "0 auto", padding: "2rem 0" }}>
            <Switch>
              <Route path="/" exact>
                <Users items={places} onDeletePlace={deletePlaceHandler} />
              </Route>
              <Route path="/:userId/places" exact>
                <UserPlaces items={places} onDeletePlace={deletePlaceHandler} />
              </Route>
              <Route path="/places/new" exact>
                <NewPlace onAddPlace={addPlaceHandler} />
              </Route>
              <Route path="/places/:placeId" exact>
                <EditPlace items={places} onUpdatePlace={updatePlaceHandler} />
              </Route>
              <Route path="/auth" exact>
                <Auth />
              </Route>
              <Redirect to="/" />
            </Switch>
          </div>
        </main>
      </Router>
    </AuthProvider>
  );
};

export default App;
