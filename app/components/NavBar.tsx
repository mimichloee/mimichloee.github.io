import { Link } from 'remix';
import { Menu, MenuButton } from '@reach/menu-button';

import MenuIcon from '~/images/icon_menu.svg';
import MobileMenuList from './MobileMenuList';

const NavBar: React.FC = () => {
  return (
    <nav className="sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 bg-white supports-backdrop-blur:bg-white/80 dark:bg-slate-900/75 border-b border-solid border-slate-200 dark:border-slate-700">
      <div className="flex mx-auto max-w-5xl items-center justify-between py-4 lg:py-6 px-8">
        <div className="mr-5">
          <Link
            to="/"
            className="text-primary underlined focus:outline-none block whitespace-nowrap text-2xl font-medium transition"
          >
            <h1 className="font-mono text-lg md:text-2xl">mimichloee.log</h1>
          </Link>
        </div>
        <ul className="hidden md:flex flex-auto justify-end">
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

        <div className="flex items-center justify-center">
          <div className="flex md:hidden">
            <Menu>
              <MenuButton className="text-primary focus:outline-none inline-flex items-center justify-center transition">
                <img src={MenuIcon} alt="menu" className="w-7 h-7" />
              </MenuButton>

              <MobileMenuList />
            </Menu>
          </div>
          <div className="block lg:hidden"></div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
