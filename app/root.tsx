import {
  Links,
  LinksFunction,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'remix';
import type { MetaFunction } from 'remix';
import globalStyle from '~/styles/global.css';

export const meta: MetaFunction = () => {
  return { title: 'New Remix App' };
};

export const links: LinksFunction = () => {
  return [
    {
      rel: 'styleshee',
      href: globalStyle,
    },
  ];
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-white transition duration-500 dark:bg-gray-900">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
