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
import tailwindStyle from './styles/tailwind.css';
import layoutStyle from './styles/layout.css';
import { NavBar } from './components';
import Footer from './components/Footer';

export const meta: MetaFunction = () => {
  return { title: 'Chloe Tech Blog' };
};

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap',
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap',
    },
    {
      rel: 'stylesheet',
      href: tailwindStyle,
    },
    {
      rel: 'stylesheet',
      href: layoutStyle,
    },
  ];
};

export default function App() {
  return (
    <html lang="en" className="dark">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="user-scalable=0, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, width=device-width, viewport-fit=cover"
        />
        <Meta />
        <Links />
      </head>
      <body className="flex flex-col min-h-screen transition transition-colors duration-500 text-gray-800 dark:text-gray-300 bg-white dark:bg-gray-900 font-sans font-serif">
        <NavBar />
        <main>
          <Outlet />
        </main>
        <Footer />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
