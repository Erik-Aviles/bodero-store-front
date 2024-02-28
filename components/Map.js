import { GoogleMapsEmbed } from "@next/third-parties/google";
import { css } from "styled-components";
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

export default function Page() {
  const center = {
    lat: -1.037497, // Latitud
    lng: -79.474484, // Longitud
  };
  const containerStyle = css`
    width: 100%;
    height: 350px;
  `;

  return (
    <GoogleMapsEmbed
      apiKey={API_KEY}
      style={containerStyle}
      mode="view"
      center="-1.037497,-79.474484"
      zoom={19}
    />
  );
}
