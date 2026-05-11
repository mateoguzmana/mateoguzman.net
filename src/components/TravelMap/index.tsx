import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Annotation,
} from "react-simple-maps";
import { geoCentroid } from "d3-geo";
import styles from "./styles.module.css";

// Ensure React is available globally for react-simple-maps
if (typeof window !== "undefined") {
  (window as any).React = React;
}

// Use local geography data from static folder
const geoUrl = "/geo/countries-110m.json";

// Map dimensions tuned to the natural EqualEarth aspect ratio so the world
// fills the canvas without the stretched-looking horizontal padding.
const MAP_WIDTH = 880;
const MAP_HEIGHT = 460;
const MAP_SCALE = 152;

// Constants for label display
const MAX_COUNTRY_NAME_LENGTH = 12;
const BASE_LABEL_FONT_SIZE = 11;
const MIN_ZOOM_FOR_LABELS = 1.5;

// Country name mapping - handles variations in country names from world-atlas
const countryNameMap: Record<string, string[]> = {
  colombia: ["Colombia"],
  peru: ["Peru"],
  brazil: ["Brazil"],
  panama: ["Panama"],
  netherlands: ["Netherlands"],
  germany: ["Germany"],
  france: ["France"],
  belgium: ["Belgium"],
  spain: ["Spain"],
  italy: ["Italy"],
  vatican: ["Vatican", "Vatican City", "Holy See"],
  bulgaria: ["Bulgaria"],
  switzerland: ["Switzerland"],
  czechia: ["Czechia", "Czech Republic"],
  austria: ["Austria"],
  romania: ["Romania"],
  hungary: ["Hungary"],
  slovakia: ["Slovakia"],
  portugal: ["Portugal"],
  poland: ["Poland"],
  slovenia: ["Slovenia"],
  turkey: ["Turkey"],
  latvia: ["Latvia"],
  monaco: ["Monaco"],
  greece: ["Greece"],
  qatar: ["Qatar"],
  uae: ["United Arab Emirates", "UAE"],
  uk: ["United Kingdom", "England", "Scotland", "Wales", "Northern Ireland"],
  mexico: ["Mexico"],
  india: ["India"],
  srilanka: ["Sri Lanka"],
  egypt: ["Egypt"],
  jordan: ["Jordan"],
  palestine: ["Palestine", "West Bank"],
  israel: ["Israel"],
  malaysia: ["Malaysia"],
  hongkong: ["Hong Kong"],
  vietnam: ["Vietnam"],
  norway: ["Norway"],
  taiwan: ["Taiwan"],
  montenegro: ["Montenegro"],
  croatia: ["Croatia"],
  southkorea: ["South Korea", "Korea", "Republic of Korea"],
  thailand: ["Thailand"],
  cambodia: ["Cambodia"],
  singapore: ["Singapore"],
  kazakhstan: ["Kazakhstan"],
  uzbekistan: ["Uzbekistan"],
  laos: ["Laos"],
  argentina: ["Argentina"],
  uruguay: ["Uruguay"],
  dominican: ["Dominican Republic", "Dominican Rep."],
  bosnia: ["Bosnia and Herzegovina", "Bosnia and Herz."],
};

const futureCountryMap: Record<string, string[]> = {
  georgia: ["Georgia"],
  philippines: ["Philippines"],
};

// Get all country names from mapping
const visitedCountries = Object.values(countryNameMap).flat();
const futureCountries = Object.values(futureCountryMap).flat();

// Major countries that should have labels displayed
const majorCountries = [
  "United States of America",
  "USA",
  "United States",
  "China",
  "Russia",
  "Russian Federation",
  "Canada",
  "Brazil",
  "Australia",
  "India",
  "Argentina",
  "Kazakhstan",
  "Algeria",
  "Saudi Arabia",
  "Mexico",
  "Indonesia",
  "Libya",
  "Iran",
  "Mongolia",
  "Peru",
  "Chad",
  "Niger",
  "Angola",
  "Mali",
  "South Africa",
  "Colombia",
  "Ethiopia",
  "Bolivia",
  "Mauritania",
  "Egypt",
  "Tanzania",
  "Nigeria",
  "Venezuela",
  "Pakistan",
  "Turkey",
  "Chile",
];

type Filter = "all" | "visited" | "future";

export default function TravelMap(): React.JSX.Element {
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState<Filter>("all");
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [center, setCenter] = useState<[number, number]>([0, 20]);

  const handleFilterClick = (newFilter: Filter) => {
    setFilter(filter === newFilter ? "all" : newFilter);
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    setTooltipPosition({
      x: event.clientX,
      y: event.clientY,
    });
  };

  const handleZoomIn = () => {
    if (zoom < 4) {
      setZoom(zoom + 0.5);
    }
  };

  const handleZoomOut = () => {
    if (zoom > 1) {
      setZoom(zoom - 0.5);
    }
  };

  const handleResetZoom = () => {
    setZoom(1);
    setCenter([0, 20]);
  };

  return (
    <div className={styles.mapContainer} onMouseMove={handleMouseMove}>
      {error && (
        <div className={styles.errorMessage}>
          Unable to load the map. The countries are still displayed below!
        </div>
      )}
      {typeof window !== "undefined" && showTooltip && tooltipContent && (
        <div
          className={styles.tooltip}
          style={{
            left: `${tooltipPosition.x + 10}px`,
            top: `${tooltipPosition.y + 10}px`,
          }}
        >
          {tooltipContent}
        </div>
      )}
      <div className={styles.mapWrapper}>
        <div className={styles.zoomControls}>
          <button
            onClick={handleZoomIn}
            className={styles.zoomButton}
            disabled={zoom >= 4}
            aria-label="Zoom in"
            title="Zoom in"
          >
            +
          </button>
          <button
            onClick={handleZoomOut}
            className={styles.zoomButton}
            disabled={zoom <= 1}
            aria-label="Zoom out"
            title="Zoom out"
          >
            −
          </button>
          <button
            onClick={handleResetZoom}
            className={styles.zoomButton}
            aria-label="Reset zoom"
            title="Reset zoom"
          >
            ⟲
          </button>
        </div>
        <ComposableMap
          projectionConfig={{
            rotate: [-10, 0, 0],
            scale: MAP_SCALE,
          }}
          width={MAP_WIDTH}
          height={MAP_HEIGHT}
          className={styles.map}
        >
          <rect
            x={0}
            y={0}
            width={MAP_WIDTH}
            height={MAP_HEIGHT}
            className={styles.mapOcean}
          />
          <ZoomableGroup zoom={zoom} center={center}>
            <Geographies
              geography={geoUrl}
              onError={() => setError(true)}
            >
              {({ geographies }) => {
                const majorGeos = geographies.filter((geo) => {
                  const countryName = geo.properties?.name || "";
                  return majorCountries.some(
                    (c) =>
                      countryName.toLowerCase().includes(c.toLowerCase()) ||
                      c.toLowerCase().includes(countryName.toLowerCase())
                  );
                });

                return (
                  <>
                    {geographies.map((geo) => {
                      const countryName = geo.properties?.name || "";
                      const isVisited = visitedCountries.some(
                        (c) => countryName.toLowerCase() === c.toLowerCase()
                      );
                      const isFuture = futureCountries.some(
                        (c) => countryName.toLowerCase() === c.toLowerCase()
                      );

                      let fillColor = "var(--tm-unvisited)";
                      let hoverColor = "var(--tm-unvisited-hover)";

                      if (filter === "visited") {
                        if (isVisited) {
                          fillColor = "var(--tm-visited)";
                          hoverColor = "var(--tm-visited-hover)";
                        } else {
                          fillColor = "var(--tm-dimmed)";
                          hoverColor = "var(--tm-dimmed)";
                        }
                      } else if (filter === "future") {
                        if (isFuture) {
                          fillColor = "var(--tm-future)";
                          hoverColor = "var(--tm-future-hover)";
                        } else {
                          fillColor = "var(--tm-dimmed)";
                          hoverColor = "var(--tm-dimmed)";
                        }
                      } else if (isVisited) {
                        fillColor = "var(--tm-visited)";
                        hoverColor = "var(--tm-visited-hover)";
                      } else if (isFuture) {
                        fillColor = "var(--tm-future)";
                        hoverColor = "var(--tm-future-hover)";
                      }

                      const getStatusLabel = () => {
                        if (isVisited) return "✓ Visited";
                        if (isFuture) return "⭐ Future Plan";
                        return "";
                      };

                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          strokeWidth={0.5}
                          onMouseEnter={() => {
                            const status = getStatusLabel();
                            setTooltipContent(
                              `${countryName}${status ? ` — ${status}` : ""}`
                            );
                            setShowTooltip(true);
                          }}
                          onMouseLeave={() => {
                            setShowTooltip(false);
                          }}
                          style={{
                            default: {
                              fill: fillColor,
                              stroke: "var(--tm-stroke)",
                              outline: "none",
                              transition: "fill 0.3s ease",
                            },
                            hover: {
                              fill: hoverColor,
                              stroke: "var(--tm-stroke)",
                              outline: "none",
                              cursor: "pointer",
                            },
                            pressed: {
                              fill: hoverColor,
                              stroke: "var(--tm-stroke)",
                              outline: "none",
                            },
                          }}
                        />
                      );
                    })}
                    {zoom >= MIN_ZOOM_FOR_LABELS &&
                      majorGeos.map((geo) => {
                        const centroid = geoCentroid(geo);
                        const countryName = geo.properties?.name || "";
                        const shortName =
                          countryName.length > MAX_COUNTRY_NAME_LENGTH
                            ? countryName.substring(0, MAX_COUNTRY_NAME_LENGTH)
                            : countryName;

                        return (
                          <Annotation
                            key={`label-${geo.rsmKey}`}
                            subject={centroid}
                            dx={0}
                            dy={0}
                            connectorProps={{
                              stroke: "transparent",
                            }}
                          >
                            <text
                              textAnchor="middle"
                              alignmentBaseline="middle"
                              className={styles.countryLabel}
                              style={{
                                fontSize: `${BASE_LABEL_FONT_SIZE / zoom}px`,
                              }}
                            >
                              {shortName}
                            </text>
                          </Annotation>
                        );
                      })}
                  </>
                );
              }}
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>
      <div className={styles.legend}>
        <button
          className={`${styles.legendItem} ${
            filter === "visited" ? styles.active : ""
          }`}
          onClick={() => handleFilterClick("visited")}
          aria-pressed={filter === "visited"}
        >
          <span
            className={`${styles.legendSwatch} ${styles.visitedColor}`}
          ></span>
          <span>Visited Countries ({Object.keys(countryNameMap).length})</span>
        </button>
        <button
          className={`${styles.legendItem} ${
            filter === "future" ? styles.active : ""
          }`}
          onClick={() => handleFilterClick("future")}
          aria-pressed={filter === "future"}
        >
          <span
            className={`${styles.legendSwatch} ${styles.futureColor}`}
          ></span>
          <span>Future Plans ({Object.keys(futureCountryMap).length})</span>
        </button>
      </div>
    </div>
  );
}
