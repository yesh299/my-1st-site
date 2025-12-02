import React, { useEffect, useState } from "react";

import "./Map.css";

// Simple in-memory cache for geocoding results during the session
const geocodeCache = new Map();

const makeOsmEmbedSrc = (lat, lng, delta = 0.02) => {
  const minLat = lat - delta;
  const minLng = lng - delta;
  const maxLat = lat + delta;
  const maxLng = lng + delta;
  const bbox = `${minLng}%2C${minLat}%2C${maxLng}%2C${maxLat}`;
  const params = new URLSearchParams({ layer: "mapnik", marker: `${lat},${lng}` });
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&${params.toString()}`;
};

const PlaceMap = (props) => {
  const { center: propCenter, address, className = "", style } = props || {};
  // eslint-disable-next-line no-unused-vars
  const zoom = 14;
  const [center, setCenter] = useState(
    propCenter && typeof propCenter.lat === "number" && typeof propCenter.lng === "number" ? propCenter : null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    // Prefer geocoding the address when available so the map shows the address location exactly.
    if (address) {
      const key = address.trim();
      const cached = geocodeCache.get(key);
      if (cached) {
        setCenter(cached);
        setLoading(false);
        setError(null);
        return;
      }

      setLoading(true);
      setError(null);

      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`;

      fetch(url, { headers: { "Accept-Language": "en" } })
        .then((res) => res.json())
        .then((data) => {
          if (cancelled) return;
          if (data && data.length > 0) {
            const lat = parseFloat(data[0].lat);
            const lng = parseFloat(data[0].lon);
            const coords = { lat, lng };
            geocodeCache.set(key, coords);
            setCenter(coords);
          } else {
            setError("Location not found");
          }
        })
        .catch((err) => {
          if (cancelled) return;
          setError("Geocoding error");
        })
        .finally(() => {
          if (!cancelled) setLoading(false);
        });

      return () => {
        cancelled = true;
      };
    }

    // If no address provided, fall back to explicit coordinates if available
    if (propCenter && typeof propCenter.lat === "number" && typeof propCenter.lng === "number") {
      setCenter(propCenter);
      setLoading(false);
      setError(null);
    } else {
      setCenter(null);
    }

    return () => {
      cancelled = true;
    };
  }, [propCenter, address]);

  if (loading) {
    return (
      <div className={`map ${className}`} style={style}>
        <div className="map__empty">Loading map…</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`map ${className}`} style={style}>
        <div className="map__empty">{error}</div>
      </div>
    );
  }

  if (!center) {
    return (
      <div className={`map ${className}`} style={style}>
        <div className="map__empty">No coordinates provided</div>
      </div>
    );
  }

  const src = makeOsmEmbedSrc(center.lat, center.lng, 0.02);

  return (
    <div className={`map ${className}`} style={style}>
      <iframe
        title="place-map"
        src={src}
        width="100%"
        height="100%"
        frameBorder="0"
        style={{ border: 0 }}
        allowFullScreen
      />
    </div>
  );
};

export default PlaceMap;
