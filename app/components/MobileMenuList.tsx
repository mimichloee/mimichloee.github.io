import {
  MenuItems,
  MenuLink,
  MenuPopover,
  useMenuButtonContext,
} from '@reach/menu-button';
import { Link } from 'remix';

const MobileMenuList: React.FC = () => {
  const { isExpanded } = useMenuButtonContext();

  if (!isExpanded) {
    return null;
  }

  return (
    <MenuPopover
      position={(r) => ({
        top: `calc(${Number(r?.top) + Number(r?.height)}px + 1.05rem)`, // 2.25 rem = py-9 from navbar
        left: 0,
        bottom: 0,
        right: 0,
      })}
      style={{ display: 'block' }}
      className="z-50"
    >
      <div className="bg-primary flex w-full h-full flex-col overflow-y-scroll pb-12 dark:border-gray-600 bg-white dark:bg-gray-900">
        <MenuItems className="border-none bg-transparent p-0">
          <MenuLink
            className="block text-primary px-8 py-9 border-b border-solid border-slate-200 dark:border-slate-700 bg-white dark:bg-gray-900"
            as={Link}
            to="/about"
          >
            About
          </MenuLink>
          <MenuLink
            className="block text-primary px-8 py-9 border-b border-solid border-slate-200 dark:border-slate-700 bg-white dark:bg-gray-900"
            as={Link}
            to="/posts"
          >
            Posts
          </MenuLink>
        </MenuItems>
      </div>
    </MenuPopover>
  );
};

export default MobileMenuList;
