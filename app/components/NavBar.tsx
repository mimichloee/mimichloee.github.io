import { Link } from 'remix';

const NavBar: React.FC = () => {
  return (
    <nav className="sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 bg-white supports-backdrop-blur:bg-white/80 dark:bg-slate-900/75 border-b border-solid border-slate-200 dark:border-slate-700">
      <div className="flex max-w-5xl m-auto items-center justify-between py-6 px-8">
        <div className="mr-5">
          <Link
            to="/"
            className="text-primary underlined focus:outline-none block whitespace-nowrap text-2xl font-medium transition"
          >
            <h1 className="font-mono text-lg md:text-2xl">mimichloee.log</h1>
          </Link>
        </div>
        <ul className="hidden lg:flex flex-row">
          <li className="px-5 py-2">
            <Link to="/about">About</Link>
          </li>
          <li className="px-5 py-2">
            <Link to="/posts">Posts</Link>
          </li>
          <li className="px-5 py-2">github</li>
          <li className="px-5 py-2">facebook</li>
          <li className="px-5 py-2">twitter</li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
