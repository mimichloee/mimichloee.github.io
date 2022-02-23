import { Links, LiveReload, Meta, Scripts, ScrollRestoration, Outlet } from '@remix-run/react';
import { MetaFunction } from '@remix-run/react/routeModules';

export const meta: MetaFunction = () => {
  return { title: 'Chloe tech blog' };
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
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
