import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";
import styles from "./styles.module.css";

// Use local geography data from static folder
const geoUrl = "/geo/countries-110m.json";

// Country name mapping - handles variations in country names from world-atlas
const countryNameMap: Record<string, string[]> = {
  "colombia": ["Colombia"],
  "peru": ["Peru"],
  "brazil": ["Brazil"],
  "panama": ["Panama"],
  "netherlands": ["Netherlands"],
  "germany": ["Germany"],
  "france": ["France"],
  "belgium": ["Belgium"],
  "spain": ["Spain"],
  "italy": ["Italy"],
  "vatican": ["Vatican", "Vatican City", "Holy See"],
  "bulgaria": ["Bulgaria"],
  "switzerland": ["Switzerland"],
  "czechia": ["Czechia", "Czech Republic"],
  "austria": ["Austria"],
  "romania": ["Romania"],
  "hungary": ["Hungary"],
  "slovakia": ["Slovakia"],
  "portugal": ["Portugal"],
  "poland": ["Poland"],
  "slovenia": ["Slovenia"],
  "turkey": ["Turkey"],
  "latvia": ["Latvia"],
  "monaco": ["Monaco"],
  "greece": ["Greece"],
  "qatar": ["Qatar"],
  "uae": ["United Arab Emirates", "UAE"],
  "uk": ["United Kingdom", "England", "Scotland", "Wales", "Northern Ireland"],
  "mexico": ["Mexico"],
  "india": ["India"],
  "srilanka": ["Sri Lanka"],
  "egypt": ["Egypt"],
  "jordan": ["Jordan"],
  "palestine": ["Palestine", "West Bank"],
  "israel": ["Israel"],
  "malaysia": ["Malaysia"],
  "hongkong": ["Hong Kong"],
  "china": ["China"], // For Hong Kong SAR
  "vietnam": ["Vietnam"],
  "norway": ["Norway"],
  "taiwan": ["Taiwan"],
  "montenegro": ["Montenegro"],
  "croatia": ["Croatia"],
  "southkorea": ["South Korea", "Korea", "Republic of Korea"],
  "thailand": ["Thailand"],
  "cambodia": ["Cambodia"],
  "singapore": ["Singapore"],
  "kazakhstan": ["Kazakhstan"],
  "uzbekistan": ["Uzbekistan"],
  "laos": ["Laos"],
};

const futureCountryMap: Record<string, string[]> = {
  "argentina": ["Argentina"],
  "dominican": ["Dominican Republic", "Dominican Rep."],
  "georgia": ["Georgia"],
  "philippines": ["Philippines"],
};

// Get all country names from mapping
const visitedCountries = Object.values(countryNameMap).flat();
const futureCountries = Object.values(futureCountryMap).flat();

export default function TravelMap(): JSX.Element {
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState<"all" | "visited" | "future">("all");

  const handleFilterClick = (newFilter: "all" | "visited" | "future") => {
    setFilter(filter === newFilter ? "all" : newFilter);
  };

  return (
    <div className={styles.mapContainer}>
      {error && (
        <div className={styles.errorMessage}>
          Unable to load the map. The countries are still displayed below!
        </div>
      )}
      <ComposableMap
        projectionConfig={{
          scale: 180,
        }}
        width={1000}
        height={500}
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
                countryName.toLowerCase() === c.toLowerCase()
              );
              const isFuture = futureCountries.some(c => 
                countryName.toLowerCase() === c.toLowerCase()
              );

              // Apply filter logic
              let shouldHighlight = true;
              let fillColor = "#E0E0E0"; // Default unvisited color
              
              if (filter === "visited") {
                shouldHighlight = isVisited;
                fillColor = isVisited ? "#4CAF50" : "#2C2C2C"; // Dim non-visited
              } else if (filter === "future") {
                shouldHighlight = isFuture;
                fillColor = isFuture ? "#FFC107" : "#2C2C2C"; // Dim non-future
              } else {
                // "all" filter - show everything normally
                fillColor = isVisited ? "#4CAF50" : isFuture ? "#FFC107" : "#E0E0E0";
              }

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={fillColor}
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
        <button 
          className={`${styles.legendItem} ${filter === "visited" ? styles.active : ""}`}
          onClick={() => handleFilterClick("visited")}
          aria-pressed={filter === "visited"}
        >
          <span className={styles.visitedColor}></span>
          <span>Visited Countries ({Object.keys(countryNameMap).length})</span>
        </button>
        <button 
          className={`${styles.legendItem} ${filter === "future" ? styles.active : ""}`}
          onClick={() => handleFilterClick("future")}
          aria-pressed={filter === "future"}
        >
          <span className={styles.futureColor}></span>
          <span>Future Plans ({Object.keys(futureCountryMap).length})</span>
        </button>
      </div>
    </div>
  );
}
