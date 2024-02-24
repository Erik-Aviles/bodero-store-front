import { white } from "@/lib/colors";
import * as React from "react";

export const HamburguerIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 24 24"
    width="2.2em"
    height="2.2em"
    className={`w-6 h-6 `}
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M3 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 5.25zm0 4.5A.75.75 0 0 1 3.75 9h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 9.75zm0 4.5a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75zm0 4.5a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75z"
      clipRule="evenodd"
    />
  </svg>
);

export const HomeIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    className="w-6 h-6"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m2.25 12 8.954-8.955a1.126 1.126 0 0 1 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
    />
  </svg>
);
export const SearchIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="2em"
    height="2em"
    viewBox="0 0 32 32"
    {...props}
  >
    <path d="M19 3C13.488 3 9 7.488 9 13c0 2.395.84 4.59 2.25 6.313L3.281 27.28 4.72 28.72l7.968-7.969A9.922 9.922 0 0 0 19 23c5.512 0 10-4.488 10-10S24.512 3 19 3Zm0 2c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8Z" />
  </svg>
);
export const AllDeleteIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    className="w-6 h-6"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18 18 6M6 6l12 12"
    />
  </svg>
);
export const DeleteIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    viewBox="0 0 40 40"
    width="1em"
    height="1em"
    {...props}
  >
    <path d="M28 40H11.8c-3.3 0-5.9-2.7-5.9-5.9V16c0-.6.4-1 1-1s1 .4 1 1v18.1c0 2.2 1.8 3.9 3.9 3.9H28c2.2 0 3.9-1.8 3.9-3.9V16c0-.6.4-1 1-1s1 .4 1 1v18.1c0 3.2-2.7 5.9-5.9 5.9zM33.3 4.9h-7.6C25.2 2.1 22.8 0 19.9 0s-5.3 2.1-5.8 4.9H6.5C4.2 4.9 2.4 6.7 2.4 9s1.8 4 4.1 4h26.9c2.3 0 4.1-1.8 4.1-4.1s-1.9-4-4.2-4zM19.9 2c1.8 0 3.3 1.2 3.7 2.9h-7.5c.5-1.7 2-2.9 3.8-2.9zm13.4 9H6.5c-1.1 0-2.1-.9-2.1-2.1 0-1.1.9-2.1 2.1-2.1h26.9c1.1 0 2.1.9 2.1 2.1-.1 1.2-1 2.1-2.2 2.1z" />
    <path d="M12.9 35.1c-.6 0-1-.4-1-1V17.4c0-.6.4-1 1-1s1 .4 1 1v16.7c0 .5-.5 1-1 1zM26.9 35.1c-.6 0-1-.4-1-1V17.4c0-.6.4-1 1-1s1 .4 1 1v16.7c0 .5-.5 1-1 1zM19.9 35.1c-.6 0-1-.4-1-1V17.4c0-.6.4-1 1-1s1 .4 1 1v16.7c0 .5-.5 1-1 1z" />
  </svg>
);

export const LocationIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    style={{
      enableBackground: "new 0 0 512 512",
    }}
    viewBox="0 0 512 512"
    width="3em"
    height="3em"
    {...props}
  >
    <path
      d="M290.61 375.83c81.2 4.67 142.41 25.54 142.41 50.57 0 28.45-79.23 51.54-177.02 51.54-97.76 0-177.02-23.09-177.02-51.54 0-24.74 59.8-45.39 139.57-50.41 14.51 23.1 27.37 43.69 35.88 59.03 8.8-15.88 21.72-36.41 36.18-59.19z"
      style={{
        fill: "#bdc3c7",
      }}
    />
    <path
      d="M254.43 34.06c76.61 0 138.72 62.11 138.72 138.74 0 43.25-58.45 133.59-102.54 203.03-14.46 22.78-27.38 43.31-36.18 59.19-8.51-15.34-21.37-35.93-35.88-59.03-43.86-69.79-102.86-162.57-102.86-203.19 0-76.63 62.11-138.74 138.74-138.74zm61.98 133.51c0-34.16-27.84-62.01-61.98-62.01-34.16 0-62 27.85-62 62.01 0 34.14 27.84 61.98 62 61.98 34.14 0 61.98-27.84 61.98-61.98z"
      style={{
        fill: "#e74c3c",
      }}
    />
    <path d="M256 487.94c-48.195 0-93.641-5.505-127.966-15.5C89.4 461.189 68.98 445.269 68.98 426.4c0-37.657 80.234-56.067 148.942-60.391 5.499-.356 10.262 3.84 10.608 9.353.347 5.512-3.84 10.262-9.353 10.608-38.04 2.394-72.477 8.52-96.969 17.249C97.683 411.961 88.98 421.17 88.98 426.4c0 5.139 9.403 16.574 44.646 26.837 32.558 9.481 76.018 14.703 122.374 14.703 46.367 0 89.831-5.222 122.385-14.703 35.234-10.262 44.635-21.697 44.635-26.837 0-13.463-47.356-35.662-132.984-40.587-5.514-.317-9.727-5.044-9.409-10.558.317-5.514 5.03-9.744 10.558-9.409 70.043 4.028 151.836 22.304 151.836 60.554 0 18.87-20.417 34.79-59.042 46.04-34.322 9.995-79.772 15.5-127.979 15.5z" />
    <path d="M254.43 445.019a10.002 10.002 0 0 1-8.745-5.148c-8.264-14.896-21.014-35.335-35.604-58.562l.001.002-3.384-5.384C161.697 304.348 105.69 215.266 105.69 172.8c0-82.016 66.725-148.74 148.74-148.74 82.004 0 148.72 66.724 148.72 148.74 0 44.584-52.718 127.539-99.231 200.729l-4.867 7.661c-14.474 22.802-27.164 42.956-35.875 58.676a9.998 9.998 0 0 1-8.744 5.153h-.003zm0-400.959c-70.988 0-128.74 57.752-128.74 128.74 0 36.702 56.607 126.74 97.94 192.483l3.386 5.386.001.002c10.663 16.975 19.905 31.758 27.414 44.363 7.845-13.144 17.339-28.185 27.735-44.563l4.872-7.669C327.6 298.977 383.15 211.566 383.15 172.8c0-70.988-57.744-128.74-128.72-128.74z" />
    <path d="M254.43 239.55c-39.701 0-72-32.29-72-71.98 0-39.707 32.299-72.01 72-72.01 39.69 0 71.98 32.303 71.98 72.01 0 39.69-32.29 71.98-71.98 71.98zm0-123.99c-28.673 0-52 23.332-52 52.01 0 28.662 23.327 51.98 52 51.98 28.662 0 51.98-23.318 51.98-51.98 0-28.679-23.318-52.01-51.98-52.01z" />
  </svg>
);
export const CardIcon = ({ className, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    {...rest}
    className={`w-6 h-6 ${className}`}
  >
    <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25zm1.5 18a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0zm12.75 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0z" />
  </svg>
);

export const ProductIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1.8em"
    height="1.8em"
    viewBox="0 0 22.578 22.578"
    {...props}
  >
    <path
      d="M12.314 275.392c-.443 0-.884.34-.884.688h-.838v1.377h3.44v-1.377h-.838c0-.36-.437-.688-.88-.688zm3.783 1.376v1.377h1.376c.19 0 .342.153.343.342v12.73c-.049.607-.437 1.03-1.03 1.03H13.69v2.064h3.71c.993 0 1.792-.84 1.792-1.85V278.62c0-1.011-.799-1.852-1.793-1.852zm-8.87 0c-.993 0-1.795.84-1.795 1.852v8.467H6.81v-8.6c0-.19.155-.343.345-.342H8.53v-1.377zm1.992 0v1.72c0 .193.148.345.342.345h5.505a.339.339 0 0 0 .343-.346v-1.719h-.688v1.031c0 .19-.153.345-.343.346H10.25a.344.344 0 0 1-.342-.346v-1.03zm-1.722 2.065v8.254h7.224c.597.012 1.017.305 1.359.749.266.402.34.858.36 1.316-.003.8 0 1.26 0 2.06 0 .179.122.346.344.346a.338.338 0 0 0 .344-.342v-12.383h-1.095a1.034 1.034 0 0 1-.967.688H9.561c-.444 0-.823-.29-.967-.688zm3.26 1.376h.554c.143 0 .272.089.322.223l.044.12h2.193c.226 0 .39.213.333.431l-.36 1.377a.344.344 0 0 1-.333.256h-1.666a.344.344 0 0 1-.33-.246c-.145-.492-.282-.986-.442-1.473h-.315a.344.344 0 0 1 0-.688zm1.143 1.03.203.689h1.14l.18-.688zm.233 1.578c.19 0 .343.153.343.342v.145a.344.344 0 0 1-.688 0v-.145c0-.19.155-.343.345-.342zm1.031 0c.19-.001.345.152.346.342v.145a.344.344 0 0 1-.688 0v-.145c0-.189.153-.342.342-.342zm-4.634 1.45h1.377c.19 0 .343.155.342.345v1.376a.344.344 0 0 1-.342.343H8.53a.344.344 0 0 1-.345-.343v-1.376c0-.191.154-.346.345-.346zm2.75.068h3.44a.344.344 0 1 1 0 .688h-3.44a.344.344 0 0 1 0-.688zm-2.407.62v.688h.688v-.688zm2.407.756h4.471a.344.344 0 1 1 0 .688H11.28a.344.344 0 0 1 0-.688zm3.44 2.063c-.691 0-1.03.738-1.03 1.376v2.409h2.13a.769.769 0 0 1-.069-.341v-2.067c0-.656-.338-1.377-1.03-1.377zm-9.554.001c-.576 0-1.107.599-1.107 1.422v4.768h6.19c.219 0 .338.142.343.346v.297c0 .82.526 1.418 1.092 1.422h.152c.29 0 .577-.136.803-.411.226-.276.363-.668.363-1.08v-5.388c0-.537.14-1.012.403-1.376zm-.076.688h1.376c.19.001.342.154.343.343v1.376c0 .19-.153.345-.343.346H5.09a.344.344 0 0 1-.343-.346v-1.376c.001-.189.154-.342.343-.343zm2.752 0h2.065a.344.344 0 0 1 0 .688H7.842a.344.344 0 1 1 0-.688zm-2.41.688v.688h.688v-.688zm2.41.688h.688a.344.344 0 0 1 0 .689h-.688a.344.344 0 1 1 0-.689zm2.065 0h2.061a.344.344 0 1 1 0 .689H9.907a.344.344 0 1 1 0-.689zm-4.817 1.377h1.376c.19 0 .342.153.343.342v1.377a.344.344 0 0 1-.343.342H5.09a.344.344 0 0 1-.343-.342v-1.377c.001-.189.154-.342.343-.342zm2.752 0h4.126a.344.344 0 1 1 0 .688H7.842a.344.344 0 1 1 0-.688zm-2.41.688v.686h.688v-.686zm2.41.686h2.065a.344.344 0 0 1 0 .687H7.842a.344.344 0 1 1 0-.687zm-4.456 2.063c.023.793.523 1.373 1.076 1.377h5.908a2.344 2.344 0 0 1-.463-1.377z"
      style={{
        color: "#9199a0",
        clipRule: "evenodd",
        display: "inline",
        fill: "#9199a0",
        fillRule: "evenodd",
        strokeWidth: 1,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeMiterlimit: 1.5,
        InkscapeStroke: "none",
      }}
      transform="translate(0 -274.422)"
    />
  </svg>
);

export const WhatsappIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="3em"
    height="3em"
    viewBox="0 0 105.885 105.885"
    {...props}
  >
    <defs>
      <linearGradient id="d">
        <stop
          offset={0}
          style={{
            stopColor: "#000",
            stopOpacity: 0.41666666,
          }}
        />
        <stop
          offset={1}
          style={{
            stopColor: "#000",
            stopOpacity: 0,
          }}
        />
      </linearGradient>
      <linearGradient id="a">
        <stop
          offset={0}
          style={{
            stopColor: "#006c00",
            stopOpacity: 1,
          }}
        />
        <stop
          offset={1}
          style={{
            stopColor: "#00c100",
            stopOpacity: 0,
          }}
        />
      </linearGradient>
      <linearGradient
        xlinkHref="#a"
        id="e"
        x1={79.186}
        x2={132.859}
        y1={116.516}
        y2={192.112}
        gradientUnits="userSpaceOnUse"
      />
      <linearGradient
        xlinkHref="#d"
        id="f"
        x1={397.456}
        x2={478.736}
        y1={600.332}
        y2={700.332}
        gradientUnits="userSpaceOnUse"
      />
      <path
        id="b"
        d="M11.113 6.085a.53.53 0 0 0 .529-.529v-3.44a.53.53 0 0 0-.53-.529h-1.058v4.498z"
        style={{
          strokeWidth: 0.26458332,
        }}
      />
      <path
        id="c"
        d="M11.113 6.085a.53.53 0 0 0 .529-.529v-3.44a.53.53 0 0 0-.53-.529h-1.058v4.498z"
        style={{
          strokeWidth: 0.26458332,
        }}
      />
    </defs>
    <g transform="translate(-47.365 -93.159) scale(.95064)">
      <ellipse
        cx={105.845}
        cy={154.125}
        rx={46.125}
        ry={47.625}
        style={{
          opacity: 1,
          fill: "#00c100",
          fillOpacity: 1,
          stroke: "none",
          strokeWidth: 0.8041358,
          strokeLinecap: "square",
          strokeLinejoin: "miter",
          strokeMiterlimit: 4,
          strokeDasharray: ".80413575,4.82481454",
          strokeDashoffset: 0,
          strokeOpacity: 1,
          paintOrder: "stroke fill markers",
        }}
      />
      <circle
        cx={105.515}
        cy={153.687}
        r={52.162}
        style={{
          opacity: 1,
          fill: "none",
          fillOpacity: 1,
          stroke: "#26e72b",
          strokeWidth: 1.56200004,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeMiterlimit: 4,
          strokeDasharray: "1.562,9.372",
          strokeDashoffset: 0,
          strokeOpacity: 1,
          paintOrder: "stroke fill markers",
        }}
      />
      <ellipse
        cx={105.845}
        cy={154.125}
        rx={46.125}
        ry={47.625}
        style={{
          opacity: 1,
          fill: "url(#e)",
          fillOpacity: 1,
          stroke: "none",
          strokeWidth: 0.8041358,
          strokeLinecap: "square",
          strokeLinejoin: "miter",
          strokeMiterlimit: 4,
          strokeDasharray: ".80413575,4.82481454",
          strokeDashoffset: 0,
          strokeOpacity: 1,
          paintOrder: "stroke fill markers",
        }}
      />
      <path
        d="M469.066 504.81 292.518 695.037l55.097 59.1a169.294 169.294 0 0 0 52.43 8.384c83.967-.06 155.962-61.915 171.283-147.157z"
        style={{
          fill: "url(#f)",
          fillOpacity: 1,
          stroke: "none",
          strokeWidth: ".99999994px",
          strokeLinecap: "butt",
          strokeLinejoin: "miter",
          strokeOpacity: 1,
        }}
        transform="scale(.26458)"
      />
      <path
        d="M106.196 128.976c-13.206 0-23.912 11.054-23.912 24.69.01 5.231 1.45 11.228 2.655 12.525v0l-3.975 14.151 14.242-3.633v0c2.882 1.608 6.007 1.638 10.99 1.646 13.206 0 23.912-11.054 23.912-24.69 0-13.635-10.706-24.689-23.912-24.689z"
        style={{
          opacity: 1,
          fill: "#00a400",
          fillOpacity: 1,
          stroke: "#fff",
          strokeWidth: 5.09299994,
          strokeLinecap: "square",
          strokeLinejoin: "miter",
          strokeMiterlimit: 4,
          strokeDasharray: "none",
          strokeDashoffset: 0,
          strokeOpacity: 1,
          paintOrder: "stroke fill markers",
        }}
      />
      <path
        d="M96.716 146.469c-.482 4.11 1.311 8.588 3.582 11.884 2.923 4.243 6.55 8.023 11.241 8.726.8.12 2.27-.862 2.27-.862l.02.02a4.104 4.104 0 0 0 1.059-5.706c-1.269-1.848-4.927-1.357-6.815-.106-1.472-1.487-2.891-3.03-3.8-4.31-.847-1.195-1.763-2.898-2.626-4.65 1.755-1.354 3.398-4.582 2.247-6.38-1.194-1.865-3.731-2.406-5.635-1.274l.656 1.605c-.403-.968-.656-1.605-.656-1.605s-1.424 1.64-1.543 2.658z"
        style={{
          opacity: 1,
          fill: "#fff",
          fillOpacity: 1,
          stroke: "none",
          strokeWidth: 0.92763442,
          strokeLinecap: "square",
          strokeLinejoin: "miter",
          strokeMiterlimit: 4,
          strokeDasharray: "none",
          strokeDashoffset: 0,
          strokeOpacity: 1,
          paintOrder: "stroke fill markers",
        }}
      />
    </g>
  </svg>
);

export const ShoppingIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    style={{
      enableBackground: "new 0 0 19.25 19.25",
    }}
    viewBox="0 0 19.25 19.25"
    width="1.8em"
    height="1.88em"
    {...props}
  >
    <path
      d="M19.006 2.97a1.003 1.003 0 0 0-.756-.345H4.431l-.195-1.164A1 1 0 0 0 3.25.625H1a1 1 0 1 0 0 2h1.403l1.86 11.164c.008.045.031.082.045.124.016.053.029.103.054.151a.982.982 0 0 0 .12.179c.031.039.059.078.095.112a.96.96 0 0 0 .193.13c.038.021.071.049.112.065a.97.97 0 0 0 .367.075H16.25a1 1 0 1 0 0-2H6.097l-.166-1H17.25a1 1 0 0 0 .99-.858l1-7a1.002 1.002 0 0 0-.234-.797zm-1.909 1.655-.285 2H13.25v-2h3.847zm-4.847 0v2h-3v-2h3zm0 3v2h-3v-2h3zm-4-3v2h-3a.481.481 0 0 0-.148.03l-.338-2.03H8.25zm-2.986 3H8.25v2H5.597l-.333-2zm7.986 2v-2h3.418l-.285 2H13.25z"
      style={{
        fill: "#9199a0",
      }}
    />
    <circle
      cx={6.75}
      cy={17.125}
      r={1.5}
      style={{
        fill: "#030104",
      }}
    />
    <circle
      cx={15.75}
      cy={17.125}
      r={1.5}
      style={{
        fill: "#030104",
      }}
    />
  </svg>
);

export const UserIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width="1.8em"
    height="1.8em"
    {...props}
  >
    <path
      fill="#9199a0"
      d="M9.645 13.881s-.336.863-.334.867l.533.758h1.178l.535-.758c-.004-.014-.334-.867-.334-.867-.039.006-1.539.006-1.578 0zM6.611 8.844c.688 2.01 1.98 3.538 3.822 3.538 1.775 0 3.088-1.506 3.797-3.513 1.434-1.445 1.096-2.525.766-3.041C15.773 2.102 13.395 0 10.299 0 4.75 0 5.717 6.08 5.717 6.08l.02.002c-.255.572-.329 1.534.874 2.762zM8.928 4.33l-.405 1.509c1.98-.604 2.246-.936 2.559-1.163.324-.235.598-.474.82-.691.102.184.23.352.379.504.146.154.363-1.397.363-1.397s.547.942.623 1.247c.055.216.4 1.09.586 1.17-.068 2.885-1.363 5.9-3.42 5.9-1.914 0-3.168-2.615-3.389-5.305.526-.032 1.884-1.774 1.884-1.774zm8.403 13.25a1.35 1.35 0 0 1-1.348-1.348v-3.746l-2.206-.813-.369.9.779.287-2.842 9.375-.357-6.295H9.881l-.354 6.18-2.811-9.273.748-.273-.373-.899-2.758 1.015-.035.015C4.263 12.722 1.634 13.972.484 17A8.137 8.137 0 0 0 0 19.076 13.486 13.486 0 0 0 10.426 24h.02c.227 0 .451-.006.676-.018h.014a13.487 13.487 0 0 0 9.734-4.908 8.039 8.039 0 0 0-.307-1.494h-3.232zm-.624 2.581c-1.154.463-2.34.545-3.023.545-.23 0-.402-.011-.5-.017v-.58c.031.002 1.994.232 3.523-.555v.607zm6.945-8.359h-.465v-1.545a2.91 2.91 0 0 0-.774-1.991 2.625 2.625 0 0 0-1.923-.846 2.626 2.626 0 0 0-1.921.846 2.906 2.906 0 0 0-.776 1.991v1.545h-.462a.346.346 0 0 0-.348.347v4.084c0 .191.154.348.348.348h6.321a.35.35 0 0 0 .348-.348v-4.084a.347.347 0 0 0-.348-.347zm-2.873 2.271v.76a.22.22 0 0 1-.219.22h-.14a.219.219 0 0 1-.218-.22v-.76a.55.55 0 0 1 .287-1.024c.306 0 .556.247.556.554a.544.544 0 0 1-.266.47zm1.127-2.271h-2.832v-1.545c0-.444.171-.838.43-1.118a1.35 1.35 0 0 1 .986-.439c.381 0 .723.162.986.439.262.28.43.674.43 1.118v1.545z"
    />
  </svg>
);
export const SuccessIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    className="w-50 h-50"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 0 1 1.04-.208z"
      clipRule="evenodd"
    />
  </svg>
);

export const InstagramIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1.2em"
    height="1.2em"
    fill={white}
    viewBox="0 0 32 32"
    {...props}
  >
    <rect width={28} height={28} x={2} y={2} fill="url(#a)" rx={6} />
    <rect width={28} height={28} x={2} y={2} fill="url(#b)" rx={6} />
    <rect width={28} height={28} x={2} y={2} fill="url(#c)" rx={6} />
    <path fill="#fff" d="M23 10.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M16 21a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
      clipRule="evenodd"
    />
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M6 15.6c0-3.36 0-5.04.654-6.324a6 6 0 0 1 2.622-2.622C10.56 6 12.24 6 15.6 6h.8c3.36 0 5.04 0 6.324.654a6 6 0 0 1 2.622 2.622C26 10.56 26 12.24 26 15.6v.8c0 3.36 0 5.04-.654 6.324a6 6 0 0 1-2.622 2.622C21.44 26 19.76 26 16.4 26h-.8c-3.36 0-5.04 0-6.324-.654a6 6 0 0 1-2.622-2.622C6 21.44 6 19.76 6 16.4v-.8ZM15.6 8h.8c1.713 0 2.878.002 3.778.075.877.072 1.325.202 1.638.361a4 4 0 0 1 1.748 1.748c.16.313.29.761.36 1.638.074.9.076 2.065.076 3.778v.8c0 1.713-.002 2.878-.075 3.778-.072.877-.202 1.325-.361 1.638a4 4 0 0 1-1.748 1.748c-.313.16-.761.29-1.638.36-.9.074-2.065.076-3.778.076h-.8c-1.713 0-2.878-.002-3.778-.075-.877-.072-1.325-.202-1.638-.361a4 4 0 0 1-1.748-1.748c-.16-.313-.29-.761-.36-1.638C8.001 19.278 8 18.113 8 16.4v-.8c0-1.713.002-2.878.075-3.778.072-.877.202-1.325.361-1.638a4 4 0 0 1 1.748-1.748c.313-.16.761-.29 1.638-.36.9-.074 2.065-.076 3.778-.076Z"
      clipRule="evenodd"
    />
    <defs>
      <radialGradient
        id="a"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="rotate(-55.376 27.916 .066) scale(25.5196)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#B13589" />
        <stop offset={0.793} stopColor="#C62F94" />
        <stop offset={1} stopColor="#8A3AC8" />
      </radialGradient>
      <radialGradient
        id="b"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="rotate(-65.136 29.766 6.89) scale(22.5942)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#E0E8B7" />
        <stop offset={0.445} stopColor="#FB8A2E" />
        <stop offset={0.715} stopColor="#E2425C" />
        <stop offset={1} stopColor="#E2425C" stopOpacity={0} />
      </radialGradient>
      <radialGradient
        id="c"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(38.50003 -5.5 1.1764 8.23476 .5 3)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset={0.157} stopColor="#406ADC" />
        <stop offset={0.468} stopColor="#6A45BE" />
        <stop offset={1} stopColor="#6A45BE" stopOpacity={0} />
      </radialGradient>
    </defs>
  </svg>
);
