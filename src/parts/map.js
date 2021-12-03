import React from 'react';
import {GoogleMap, withScriptjs,withGoogleMap,Marker} from "react-google-maps";

//this is map component
function Map(props) {
  
  return (
    <div>
    <GoogleMap 
      defaultZoom={10} 
      defaultCenter= {{lat:props.lat,lng:props.lng}} 
      >
      <Marker position={{lat:props.lat,lng:props.lng}}/>
    </GoogleMap>
    </div>
  );
}
const WrappedMap=withScriptjs(withGoogleMap(Map));

export default WrappedMap;