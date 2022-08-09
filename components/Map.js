import { useDispatch, useSelector } from "react-redux";
import {
  selectDestination,
  selectOrigin,
  selectTravelDistance,
  selectTravelTime,
  setTravelDistance,
  setTravelTime,
} from "../slices/navSlice";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useRef } from "react";
import { useEffect } from "react";

const Map = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const mapRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!origin || !destination) return;
    mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
    });
  }, [origin, destination]);

  // comment it out - code duplication as mapviewdirection generate both distamce and time
  useEffect(() => {
    async function getTravelTime() {
      if (!origin || !destination) return;
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin.description}&destinations=${destination.description}&units=imperial&key=${GOOGLE_MAPS_APIKEY}`
      );
      const data = await response.json();
      console.log("data by google distance api is", data);
    }

    //getTravelTime();
  }, [origin, destination]);

  return (
    <MapView
      ref={mapRef}
      className="flex-1"
      mapType="mutedStandard"
      region={{
        latitude: origin?.location?.lat,
        longitude: origin?.location?.lng,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}
    >
      {origin?.location && (
        <Marker
          coordinate={{
            latitude: origin?.location?.lat,
            longitude: origin?.location?.lng,
          }}
          title="Origin"
          description={origin?.description}
          identifier="origin"
        />
      )}
      {destination?.location && (
        <Marker
          coordinate={{
            latitude: destination?.location?.lat,
            longitude: destination?.location?.lng,
          }}
          title="Destination"
          description={destination?.description}
          identifier="destination"
        />
      )}
      {destination?.location && (
        <MapViewDirections
          origin={{
            latitude: origin?.location?.lat,
            longitude: origin?.location?.lng,
          }}
          destination={{
            latitude: destination?.location?.lat,
            longitude: destination?.location?.lng,
          }}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor="hotpink"
          onReady={(result) => {
            //setDirectionResult(result);
            console.log(`Distance: ${result?.distance} km`);
            result.distance && dispatch(setTravelDistance(result?.distance));
            console.log(`Duration: ${result?.duration} min.`);
            result.duration && dispatch(setTravelTime(result?.duration));
            // Should probably do this in useEffect
            //mapRef.current.fitToCoordinates(result.coordinates);
          }}
        />
      )}
    </MapView>
  );
};
export default Map;
