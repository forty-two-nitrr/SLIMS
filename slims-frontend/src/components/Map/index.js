import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import LeftSide from "./LeftSide";
import axios from "axios";
import "./Map.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoicHJhbWlsMDEiLCJhIjoiY2wwY3MzaGxrMDI2aDNqcDlxcTY2ZHhjZCJ9.tBxkMn02CfdKVlWFVWm51Q";

const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(81.6049);
  const [lat, setLat] = useState(21.2494);
  const [zoom, setZoom] = useState(18);
  const [locations, setLocations] = useState([]);
  const [id, setId] = useState(0);

  useEffect(() => {
    axios
      .get("http://192.168.172.97:8000/tracker/lights/")
      .then((res) => setLocations(res.data.data))
      .catch((err) => console.log(err.response));
  }, []);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });
    map.current.scrollZoom.disable();
  });

  useEffect(() => {
    if (locations.size === 0) return;
    locations.forEach((location) => {
      const marker = new mapboxgl.Marker({
        color: location.status ? "blue" : "grey",
      })
        .setLngLat([location.longitude, location.latitude])
        .setPopup(
          new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false,
          }).setHTML(`<h1 style="color:black">${location.id}</h1>`)
        )
        .addTo(map.current);
      marker.getElement().addEventListener("mouseenter", () => {
        marker.togglePopup();
      });
      marker.getElement().addEventListener("mouseleave", () => {
        marker.togglePopup();
      });
      marker.getElement().addEventListener("click", () => {
        setId(location.id);
      });
    });
  }, [locations]);

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  return (
    <div className="map-container">
      <div className="map-inner-container">
        <div>
          <div className="sidebar">
            Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
          </div>
          <div ref={mapContainer} className="map" />
        </div>
      </div>
      <div className="details-container">
        <LeftSide id={id} />
      </div>
    </div>
  );
};

export default Map;
