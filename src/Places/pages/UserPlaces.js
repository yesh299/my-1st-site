import React from "react";
import {useParams} from "react-router-dom";

import PlaceList from "../components/PlacesList";

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

const UserPlaces = (props) => {
  const userId = useParams().userId;
  const items = props.items || DUMMY_PLACES;
  const loadedPlaces = items.filter((place) => place.creator === userId);
  return <PlaceList items={loadedPlaces} onDeletePlace={props.onDeletePlace} />;
};

export default UserPlaces;