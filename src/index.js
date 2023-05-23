import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

let p = {
  cost: 1,
  success: true,
  comment: "Successfully fetched details for 1 flights",
  flights: [
    {
      flightNumberIata: "BA142",
      flightNumberIcao: "BAW142",
      aircraftRegistration: "G-YMML",
      aircraftType: "B772",
      aircraftClasses: ["AIRLINER"],
      aircraftTypeDescription: "Boeing 777-236ER",
      airlineIata: "BA",
      airlineIcao: "BAW",
      airlineName: "British Airways",
      depAirportIcao: "VIDP",
      depAirportIata: "DEL",
      depAirportName: "Indira Gandhi International Airport",
      depAirportCity: "New Delhi",
      depAirportState: "Delhi",
      depAirportCountry: "India",
      depAirportCountryIso2: "IN",
      depAirportCountryIso3: "IND",
      depAirportLatitude: 28.5665,
      depAirportLongitude: 77.1031,
      depAirportTz: "IST",
      depAirportTzDiffUTC: "5.5",
      scheduledDeparture: "2023-05-23T20:05:00.000+00:00",
      estimatedDeparture: "2023-05-23T20:33:00.000+00:00",
      arrAirportIcao: "EGLL",
      arrAirportIata: "LHR",
      arrAirportName: "London Heathrow Airport",
      arrAirportCity: "London Heathrow",
      arrAirportState: "England",
      arrAirportCountry: "United Kingdom",
      arrAirportCountryIso2: "GB",
      arrAirportCountryIso3: "GBR",
      arrAirportLatitude: 51.4706,
      arrAirportLongitude: -0.461941,
      arrAirportTz: "BST",
      arrAirportTzDiffUTC: "1.0",
      scheduledArrival: "2023-05-24T05:50:00.000+00:00",
      estimatedArrival: "2023-05-24T06:18:00.000+00:00",
      departureStatus: "DY",
      departureDelayReason: "6",
      departureDelayDetail: "ETD",
      departureTerminal: "3",
      arrivalStatus: "DY",
      arrivalDelayReason: "6",
      arrivalDelayDetail: "ETA",
      arrivalTerminal: "5",
      source: "SCHE",
      created: "2023-05-22T01:30:49.000+00:00",
      updated: "2023-05-23T11:34:28.536+00:00",
      status: "SCHEDULED",
    },
  ],
};
