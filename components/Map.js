import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

export default function Map() {
  const containerStyle = {
    width: "100%",
    height: "350px",
  };
  const center = {
    lat: -1.037497, // Latitud
    lng: -79.474484, // Longitud
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyA1_gLpX5-gmo_TAz80hLxF64U97QtUzWg">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={18}>
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
}
