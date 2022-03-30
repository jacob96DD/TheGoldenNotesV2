import {
  Links,
  Link,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "remix";
import styles from "~/tailwind.css";
import globalStyles from "~/style/globalStyle.css";

export const links = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
  {
    rel: "stylesheet",
    href: globalStyles,
  },
];

export function meta() {
  return {
    charset: "utf-8",
    title: "Remix + MongoDB",
    viewport: "width=device-width,initial-scale=1",
  };
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
       
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
