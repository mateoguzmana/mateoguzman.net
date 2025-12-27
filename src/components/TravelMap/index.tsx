import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";
import styles from "./styles.module.css";

// Use local geography data from static folder
const geoUrl = "/geo/countries-110m.json";

// Country names that match the world-atlas topology
// Some names differ from common names (e.g., "Czechia" vs "Czech Republic")
const visitedCountries = [
  "Colombia",
  "Peru", 
  "Brazil",
  "Panama",
  "Netherlands",
  "Germany",
  "France",
  "Belgium",
  "Spain",
  "Italy",
  "Vatican", // May be "Vatican City" or "Holy See"
  "Bulgaria",
  "Switzerland",
  "Czechia", // Also try "Czech Republic"
  "Czech Republic",
  "Austria",
  "Romania",
  "Hungary",
  "Slovakia",
  "Portugal",
  "Poland",
  "Slovenia",
  "Turkey",
  "Latvia",
  "Monaco",
  "Greece",
  "Qatar",
  "United Arab Emirates",
  "United Kingdom",
  "England", // UK subdivisions
  "Scotland",
  "Mexico",
  "India",
  "Sri Lanka",
  "Egypt",
  "Jordan",
  "Palestine",
  "Israel",
  "Malaysia",
  "Hong Kong", // May be part of China
  "China", // Include China for Hong Kong
  "Vietnam",
  "Norway",
  "Taiwan",
  "Montenegro",
  "Croatia",
  "South Korea",
  "Korea",
  "Republic of Korea",
  "Thailand",
  "Cambodia",
  "Singapore",
  "Kazakhstan",
  "Uzbekistan",
  "Laos",
];

const futureCountries = [
  "Argentina",
  "Dominican Republic",
  "Dominican Rep.",
  "Georgia",
  "Philippines",
];

export default function TravelMap(): JSX.Element {
  const [error, setError] = useState(false);

  return (
    <div className={styles.mapContainer}>
      {error && (
        <div className={styles.errorMessage}>
          Unable to load the map. The countries are still displayed below!
        </div>
      )}
      <ComposableMap
        projectionConfig={{
          scale: 147,
        }}
        width={800}
        height={400}
        className={styles.map}
      >
        <Geographies 
          geography={geoUrl}
          onError={() => setError(true)}
        >
          {({ geographies }) =>
            geographies.map((geo) => {
              const countryName = geo.properties?.name || "";
              const isVisited = visitedCountries.some(c => 
                countryName.toLowerCase().includes(c.toLowerCase()) ||
                c.toLowerCase().includes(countryName.toLowerCase())
              );
              const isFuture = futureCountries.some(c => 
                countryName.toLowerCase().includes(c.toLowerCase()) ||
                c.toLowerCase().includes(countryName.toLowerCase())
              );

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={
                    isVisited
                      ? "#4CAF50"
                      : isFuture
                      ? "#FFC107"
                      : "#E0E0E0"
                  }
                  stroke="#FFFFFF"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: "none" },
                    hover: {
                      fill: isVisited
                        ? "#45a049"
                        : isFuture
                        ? "#FFB300"
                        : "#BDBDBD",
                      outline: "none",
                    },
                    pressed: { outline: "none" },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <span className={styles.visitedColor}></span>
          <span>Visited Countries (49)</span>
        </div>
        <div className={styles.legendItem}>
          <span className={styles.futureColor}></span>
          <span>Future Plans (4)</span>
        </div>
      </div>
    </div>
  );
}
