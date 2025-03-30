import React, { useState, useEffect, useRef } from 'react';

const containerStyle = {
  width: '100%',
  height: '100vh', // Use full screen height
};

const LiveTracking = () => {
  const mapContainerRef = useRef(null);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [currentPosition, setCurrentPosition] = useState({
    lat: 0, 
    lng: 0, 
  });

  // Initialize Ola Maps once the script is loaded
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://api.olamaps.io/js/api/v1/maps?api_key=${import.meta.env.VITE_OLA_MAPS_API_KEY}`;
    script.async = true;
    script.onload = initializeMap;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Initialize the map and marker
  const initializeMap = () => {
    if (window.OlaMaps) {
      const mapInstance = new window.OlaMaps.Map(mapContainerRef.current, {
        center: currentPosition,
        zoom: 15,
      });

      const markerInstance = new window.OlaMaps.Marker({
        position: currentPosition,
        map: mapInstance,
        icon: {
          url: '/car-icon.png', // You can replace with your own icon
          scaledSize: new window.OlaMaps.Size(32, 32),
        },
      });

      setMap(mapInstance);
      setMarker(markerInstance);

      // Start tracking position when map is initialized
      trackUserPosition(mapInstance, markerInstance);
    }
  };

  // Track the user's location and update the map accordingly
  const trackUserPosition = (mapInstance, markerInstance) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          updatePositionOnMap(latitude, longitude, mapInstance, markerInstance);
        },
        (error) => {
          console.error("Error getting location", error);
        }
      );

      // Watch position changes and update the map accordingly
      const watchId = navigator.geolocation.watchPosition((position) => {
        const { latitude, longitude } = position.coords;
        updatePositionOnMap(latitude, longitude, mapInstance, markerInstance);
      });

      // Cleanup the position watch on unmount
      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  // Update the map's position and marker
  const updatePositionOnMap = (latitude, longitude, mapInstance, markerInstance) => {
    const newPosition = { lat: latitude, lng: longitude };
    setCurrentPosition(newPosition);

    if (mapInstance && markerInstance) {
      mapInstance.setCenter(newPosition);
      markerInstance.setPosition(newPosition);
    }
  };

  return (
    <div
      ref={mapContainerRef}
      style={containerStyle}
      id="ola-map-container"
    />
  );
};

export default LiveTracking;
