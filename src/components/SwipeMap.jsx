import React, { useEffect, useRef } from 'react';
import '@arcgis/core/assets/esri/themes/light/main.css';
import Map from '@arcgis/core/Map.js';
import MapView from '@arcgis/core/views/MapView.js';
import ImageryTileLayer from '@arcgis/core/layers/ImageryTileLayer.js';
import Swipe from '@arcgis/core/widgets/Swipe.js';

const SwipeMap = () => {
  const viewDivRef = useRef(null); // Ref to the div that will hold the map

  useEffect(() => {
    // Initialize the map and view when the component mounts
    const kangaroo_nbr_2019 = new ImageryTileLayer({
      portalItem: {
        id: 'fde69ba15056401285eb629e58f4deda',
      },
    });

    const kangaroo_nbr_2020 = new ImageryTileLayer({
      portalItem: {
        id: 'dc688f3dff0b42778c04d49859d3fc66',
      },
    });

    const map = new Map({
      basemap: 'satellite',
      layers: [kangaroo_nbr_2019, kangaroo_nbr_2020],
    });

    const view = new MapView({
      container: viewDivRef.current, // Use the ref to attach the view
      map: map,
      zoom: 9,
      center: [137.2142, -35.7752], // Longitude, latitude
      constraints: {
        maxZoom: 12,
        minZoom: 8,
        geometry: {
          type: 'extent',
          xmin: 136.5,
          ymin: -36.5,
          xmax: 138.5,
          ymax: -34.5,
          spatialReference: {
            wkid: 4326,
          },
        },
      },
    });

    // Create a new Swipe widget
    const swipe = new Swipe({
      leadingLayers: [kangaroo_nbr_2019],
      trailingLayers: [kangaroo_nbr_2020],
      position: 10,
      view: view,
    });

    // Add the widget to the view
    view.ui.add(swipe);

    // Cleanup function to destroy the map view when the component is unmounted
    return () => {
      if (view) {
        view.destroy();
      }
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <div>
      <div
        id="viewDiv"
        ref={viewDivRef}
        style={{ height: '50vh', width: '100%' }}
      ></div>
    </div>
  );
};

export default SwipeMap;
