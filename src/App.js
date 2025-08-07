import React, { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import { getPlacesData } from './api/index';
import './App.css';

const App = () => {
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});
  const [childClicked, setChildClicked] = useState(0);
  const [isloading, setIsLoading] = useState(false);
  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState("All");


  // Get user location once on mount
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        console.log("User coords:", latitude, longitude);
        setCoordinates({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error("Geolocation error:", error);
        setCoordinates({ lat: 43.65107, lng: -79.347015 }); // fallback Toronto
      }
    );
  }, []);

  // Sorting places by rating whenever rating changes
  useEffect(() => {
    const filteredPlaces = places.filter((place) => place.rating >= rating);
    setFilteredPlaces(filteredPlaces);
  }, [rating]);

  // Fetch places whenever coordinates and bounds change
  useEffect(() => {
    setIsLoading(true);
    if (bounds.sw && bounds.ne) {
      console.log("Fetching places with bounds:", bounds);
      getPlacesData(type, bounds.sw, bounds.ne)
        .then((data) => {
          console.log("Places data received:", data);
          setPlaces(data.filter((place) => place.name && place.num_reviews > 0));
          setFilteredPlaces([]);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching places:", error);
        });
    }
  }, [type, bounds]);

  return (
    <>
      <Header setCoordinates = {setCoordinates}/>
      <div
        style={{
          display: "flex",
          height: "calc(100vh - 64px)",
          width: "100vw",
          overflowX: "hidden",
        }}
        className="app-container"
      >
        <div
          style={{
            flex: 1,
            overflowY: "hidden",
            borderRight: "1px solid #ddd",
          }}
          className="list-container"
        >
          <List 
            places={filteredPlaces.length ? filteredPlaces: places}
            childClicked = {childClicked}
            isloading={isloading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          
          />
        </div>
        <div
          style={{
            flex: 1,
            height: "100%",
            overflow: "hidden",
          }}
          className="map-container"
        >
          {coordinates ? (
            <Map
              setCoordinates={setCoordinates}
              setBounds={setBounds}
              coordinates={coordinates}
              places={filteredPlaces.length ? filteredPlaces: places}
              setChildClicked={setChildClicked}
            />
          ) : (
            <div style={{ padding: 20 }}>Loading map...</div>
          )}
        </div>
      </div>
    </>
  );
};

export default App;
