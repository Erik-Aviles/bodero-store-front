"use client";
const baseURL = process.env.NEXT_PUBLIC_URL;

export default function localLoader({ src, width, quality }) {
  const url = new URL(`${baseURL}/${src}`);
  url.searchParams.set("format", "auto");
  url.searchParams.set("width", width.toString());
  url.searchParams.set("quality", (quality || 75).toString());
  return url.href;
}
/*  export default function localLoader({ src, width, quality }){
  return `https://example.com/${src}?w=${width}&q=${quality || 75}`
}

export default function localLoader({ src, width, quality }) {
  const params = [`w_${width}`, `q_${quality || "auto"}`];
  return `${baseURL}/${src}/${params.join(",")}`;
}
 */
