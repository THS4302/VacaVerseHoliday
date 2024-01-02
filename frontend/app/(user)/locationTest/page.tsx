// pages/index.tsx
"use client";
import { useEffect, useState } from 'react';
import haversine from 'haversine-distance';

interface Place {
  place_name: string;
  latitude: number;
  longitude: number;
}

const IndexPage: React.FC = () => {
  const [userLatitude, setUserLatitude] = useState<number | null>(null);
  const [userLongitude, setUserLongitude] = useState<number | null>(null);
  const [closestPlace, setClosestPlace] = useState<string | null>(null);

  useEffect(() => {
    const successHandler = (position: GeolocationPosition) => {
      setUserLatitude(position.coords.latitude);
      setUserLongitude(position.coords.longitude);
    };

    const errorHandler = (error: GeolocationPositionError) => {
      console.error('Error getting geolocation:', error.message);
    };

    navigator.geolocation.getCurrentPosition(successHandler, errorHandler);
  }, []);

  useEffect(() => {
    const fetchClosestPlace = async () => {
      if (userLatitude !== null && userLongitude !== null) {
        // Fetch places from your API
        const response = await fetch('http://localhost:8081/api/allPlacesHome');
        const places: Place[] = await response.json();

       const placesArray = Array.isArray(places) ? places : [];
const closest = placesArray.reduce((prev, current) => {
 

          const distance = haversine(
            { latitude: userLatitude, longitude: userLongitude },
            { latitude: current.latitude, longitude: current.longitude }
          );

          return distance < prev.distance ? { name: current.place_name, distance } : prev;
        }, { name: '', distance: Infinity } as { name: string, distance: number });

        setClosestPlace(closest.name);
      }
    };

    fetchClosestPlace();
  }, [userLatitude, userLongitude]);

  return (
    <div>
      <h1>User's Location</h1>
      {userLatitude !== null && userLongitude !== null ? (
        <div>
          <p>Latitude: {userLatitude}</p>
          <p>Longitude: {userLongitude}</p>
          {closestPlace !== null && <p>Closest Place: {closestPlace}</p>}
        </div>
      ) : (
        <p>Loading location...</p>
      )}
    </div>
  );
};

export default IndexPage;
