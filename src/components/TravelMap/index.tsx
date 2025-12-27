import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";
import styles from "./styles.module.css";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Country codes extracted from the flag emojis on the travelling.md page
const visitedCountries = [
  "COL", // 🇨🇴 Colombia
  "PER", // 🇵🇪 Peru
  "BRA", // 🇧🇷 Brazil
  "PAN", // 🇵🇦 Panama
  "NLD", // 🇳🇱 Netherlands
  "DEU", // 🇩🇪 Germany
  "FRA", // 🇫🇷 France
  "BEL", // 🇧🇪 Belgium
  "ESP", // 🇪🇸 Spain
  "ITA", // 🇮🇹 Italy
  "VAT", // 🇻🇦 Vatican
  "BGR", // 🇧🇬 Bulgaria
  "CHE", // 🇨🇭 Switzerland
  "CZE", // 🇨🇿 Czech Republic
  "AUT", // 🇦🇹 Austria
  "ROU", // 🇷🇴 Romania
  "HUN", // 🇭🇺 Hungary
  "SVK", // 🇸🇰 Slovakia
  "PRT", // 🇵🇹 Portugal
  "POL", // 🇵🇱 Poland
  "SVN", // 🇸🇮 Slovenia
  "TUR", // 🇹🇷 Turkey
  "LVA", // 🇱🇻 Latvia
  "MCO", // 🇲🇨 Monaco
  "GRC", // 🇬🇷 Greece
  "QAT", // 🇶🇦 Qatar
  "ARE", // 🇦🇪 UAE
  "GBR", // 🏴󠁧󠁢󠁥󠁮󠁧󠁿 England (UK)
  "MEX", // 🇲🇽 Mexico
  "IND", // 🇮🇳 India
  "LKA", // 🇱🇰 Sri Lanka
  "EGY", // 🇪🇬 Egypt
  "JOR", // 🇯🇴 Jordan
  "PSE", // 🇵🇸 Palestine
  "ISR", // 🇮🇱 Israel
  "MYS", // 🇲🇾 Malaysia
  "HKG", // 🇭🇰 Hong Kong
  "VNM", // 🇻🇳 Vietnam
  "NOR", // 🇳🇴 Norway
  "TWN", // 🇹🇼 Taiwan
  "MNE", // 🇲🇪 Montenegro
  "HRV", // 🇭🇷 Croatia
  "KOR", // 🇰🇷 South Korea
  "THA", // 🇹🇭 Thailand
  "KHM", // 🇰🇭 Cambodia
  "SGP", // 🇸🇬 Singapore
  "KAZ", // 🇰🇿 Kazakhstan
  "UZB", // 🇺🇿 Uzbekistan
  "LAO", // 🇱🇦 Laos
];

const futureCountries = [
  "ARG", // 🇦🇷 Argentina
  "DOM", // 🇩🇴 Dominican Republic
  "GEO", // 🇬🇪 Georgia
  "PHL", // 🇵🇭 Philippines
];

export default function TravelMap(): JSX.Element {
  const [error, setError] = useState(false);

  // Get CSS custom property values for colors
  const getCSSVariable = (varName: string) => {
    if (typeof window !== 'undefined') {
      return getComputedStyle(document.documentElement).getPropertyValue(varName).trim() || varName;
    }
    // Fallback values for SSR
    const fallbacks: Record<string, string> = {
      '--visited-color': '#4CAF50',
      '--visited-hover-color': '#45a049',
      '--future-color': '#FFC107',
      '--future-hover-color': '#FFB300',
      '--unvisited-color': '#E0E0E0',
      '--unvisited-hover-color': '#BDBDBD',
      '--map-stroke-color': '#FFFFFF',
    };
    return fallbacks[varName] || varName;
  };

  const colors = {
    visited: getCSSVariable('--visited-color'),
    visitedHover: getCSSVariable('--visited-hover-color'),
    future: getCSSVariable('--future-color'),
    futureHover: getCSSVariable('--future-hover-color'),
    unvisited: getCSSVariable('--unvisited-color'),
    unvisitedHover: getCSSVariable('--unvisited-hover-color'),
    stroke: getCSSVariable('--map-stroke-color'),
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
              const countryCode = geo.id;
              const isVisited = visitedCountries.includes(countryCode);
              const isFuture = futureCountries.includes(countryCode);

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={
                    isVisited
                      ? colors.visited
                      : isFuture
                      ? colors.future
                      : colors.unvisited
                  }
                  stroke={colors.stroke}
                  strokeWidth={0.5}
                  style={{
                    default: { outline: "none" },
                    hover: {
                      fill: isVisited
                        ? colors.visitedHover
                        : isFuture
                        ? colors.futureHover
                        : colors.unvisitedHover,
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
          <span>Visited Countries ({visitedCountries.length})</span>
        </div>
        <div className={styles.legendItem}>
          <span className={styles.futureColor}></span>
          <span>Future Plans ({futureCountries.length})</span>
        </div>
      </div>
    </div>
  );
}
