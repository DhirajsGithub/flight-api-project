import React, { useEffect, useState } from "react";
import Map, { NavigationControl, Marker } from "react-map-gl";
import Navbar from "./components/navbar.js";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "./App.css";
import planeImg from "./assets/Images/Prognosticz_Plane.png";
import { Tooltip } from "antd";

function App() {
  // NOTE: we are only fetching for airline BAW and Aircraft type A319
  const headers = {
    Authorization: "Bearer a86afcfe8d09c9f9317ce87c720af3c955bc946f",
    "Content-Type": "application/json",
  };
  const bodyForAircrafts = {
    pageSize: 10,
    page: 1,
    registrations: [
      "G-YMML",
      "G-ZZZA",
      "G-VIIA",
      "G-VIIB",
      "G-VIIC",
      "G-VIID",
      "G-VIIE",
      "G-VIIF",
      "G-VIIG",
      "G-VIIH",
      "G-RAES",
      "G-VIIJ",
      "G-VIIK",
      "G-VIIL",
      "G-VIIM",
      "G-VIIN",
      "G-VIIO",
      "G-VIIP",
      "G-VIIR",
      "G-VIIS",
    ],
    flightIds: [""],
    airlines: ["BAW"],
    aircraftTypes: ["B772"],
    incLastKnownPos: true,
    minLatitude: 0.431234,
    maxLatitude: 51.509776,
    minLongitude: -2.962865,
    maxLongitude: -0.372603,
    fromAirports: [""],
    toAirports: [""],
    toOrFromAirports: [""],
  };
  const [airlinesStatistics, setAirlinesStatistics] = useState([]);
  const [airlinesName, setAilinesName] = useState([]);
  const [aircraftTypesStatics, setAircraftTypesStatics] = useState([]);
  const [aircraftTypesName, setAircraftTypesName] = useState([]);
  const [registrationNames, setRegistrationNames] = useState([]);
  const [aircraftsDetails, setAircraftDetails] = useState([]);
  const fetchAirlines = async () => {
    let res = await fetch("https://api.radarbox.com/v2/statistics/airlines", {
      headers,
    });
    res = await res.json();
    let temp = [];
    // fetching available airline for latest "day": "2023-05-21", on may 23
    for (let item of res.airlineStatistics[0].statistics) {
      temp.push(item.icaoCode);
    }
    setAilinesName(temp);
    setAirlinesStatistics(res.airlineStatistics[0].statistics);
  };
  const fetchAircraftTypes = async () => {
    let res = await fetch(
      "https://api.radarbox.com/v2/statistics/airline/BAW",
      {
        headers,
      }
    );
    res = await res.json();
    let temp = [];
    // this is completly based on airline type
    for (let item of res.airlineStatistics[0].aircraftUtilization) {
      temp.push(item.aircraftType);
    }
    setAircraftTypesName(temp);
  };
  const fetchRegistrationNames = async () => {
    let res = await fetch(
      "https://api.radarbox.com/v2/aircraft/search?aircraftType=B772&airline=BAW",
      {
        headers,
      }
    );
    res = await res.json();
    let temp = [];
    for (let item of res.aircraft) {
      temp.push(item.registration);
    }

    setRegistrationNames(temp);
  };

  const fetchAircraftsDetails = async () => {
    let res = await fetch("https://api.radarbox.com/v2/flights/live", {
      method: "POST",
      headers,
      body: JSON.stringify(bodyForAircrafts),
    });
    res = await res.json();
    let temp = [];
    for (let item of res.flights) {
      temp.push({
        latitude: item.latitude,
        longitude: item.longitude,
        airlineName: item.airlineName,
        depAirportName: item.depAirportName,
        depAirportCity: item.depAirportCity,
        depAirportState: item.depAirportState,
        depAirportCountry: item.depAirportCountry,
        arrAirportCity: item.arrAirportCity,
        arrAirportState: item.arrAirportState,
        arrAirportCountry: item.arrAirportCountry,
      });
    }
    setAircraftDetails([...aircraftsDetails, ...temp]);
  };
  console.log(airlinesName);
  console.log(aircraftTypesName);
  console.log(registrationNames);
  console.log(aircraftsDetails);

  // let iteration = parseInt(registrationNames.length / 20);
  // // console.log(iteration, +" " + registrationNames.length);

  useEffect(() => {
    try {
      fetchAircraftTypes();
      fetchAirlines();
      fetchRegistrationNames();
      // if (registrationNames.length > 0) {
      fetchAircraftsDetails();
      // }
    } catch (error) {}
  }, []);
  return (
    <div className="App">
      {/* <Navbar /> */}
      <Map
        mapLib={maplibregl}
        initialViewState={{
          longitude: 16.62662018,
          latitude: 49.2125578,
          zoom: 1,
        }}
        style={{ width: "100%", height: "100vh" }}
        mapStyle="https://api.maptiler.com/maps/streets/style.json?key=QPnlVAUQb7gRPLYjPXjW	"
      >
        <NavigationControl position="top-left" />
        {aircraftsDetails?.map((item, index) => {
          if (item.latitude !== undefined && item.longitude !== undefined) {
            return (
              <Marker
                anchor="center"
                latitude={item.latitude}
                longitude={item.longitude}
                key={index + Math.random()}
              >
                <Tooltip
                  title={
                    <ul
                      style={{
                        textDecoration: "none",
                        padding: 0,
                        margin: 0,
                        listStyleType: "none",
                        textAlign: "center",
                      }}
                    >
                      <li>{item.airlineName}</li>
                      <li>
                        from {item.depAirportCity} to {item.arrAirportCity}
                      </li>
                    </ul>
                  }
                >
                  <img
                    style={{ width: "50px", height: "50px" }}
                    src={planeImg}
                  />
                </Tooltip>
              </Marker>
            );
          }
        })}
      </Map>
    </div>
  );
}

export default App;

// [
//   "G-EUPD",
//   "G-EUPE",
//   "G-EUPG",
//   "G-EUPJ",
//   "G-EUPK",
//   "G-EUPL",
//   "G-EUPM",
//   "G-EUPN",
//   "G-EUPO",
//   "G-EUPP",
//   "G-EUPR",
//   "G-EUPS",
//   "G-EUPT",
//   "G-EUPU",
//   "G-EUPW",
//   "G-EUPY",
//   "G-EUPZ",
//   "G-EUOA",
//   "G-EUOC",
//   "G-EUOD",
//   "G-EUOE",
//   "G-EUOG",
//   "G-EUOF",
//   "G-DBCA",
//   "G-DBCC",
//   "G-DBCB",
//   "G-DBCD",
//   "G-DBCE",
//   "G-DBCF",
//   "G-DBCG",
//   "G-DBCH",
//   "G-DBCJ",
//   "G-DBCK",
// ];

// [
//   "G-ZZZA",
//   "G-VIIA",
//   "G-VIIB",
//   "G-VIIC",
//   "G-VIID",
//   "G-VIIE",
//   "G-VIIF",
//   "G-VIIG",
//   "G-VIIH",
//   "G-RAES",
//   "G-VIIJ",
//   "G-VIIK",
//   "G-VIIL",
//   "G-VIIM",
//   "G-VIIN",
//   "G-VIIO",
//   "G-VIIP",
//   "G-VIIR",
//   "G-VIIS",
//   "G-VIIT",
//   "G-VIIU",
//   "G-VIIV",
//   "G-VIIW",
//   "G-VIIX",
//   "G-VIIY",
//   "G-YMMA",
//   "G-YMMB",
//   "G-YMMC",
//   "G-YMMD",
//   "G-YMME",
//   "G-YMMF",
//   "G-YMMG",
//   "G-YMMH",
//   "G-YMMI",
//   "G-YMMJ",
//   "G-YMMK",
//   "G-YMML",
//   "G-YMMN",
//   "G-YMMO",
//   "G-YMMP",
//   "G-YMMR",
//   "G-YMMS",
//   "G-YMMT",
//   "G-YMMU"
// ]
