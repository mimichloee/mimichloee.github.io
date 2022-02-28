import { Link } from 'remix';

const Header: React.FC = () => {
  return (
    <header>
      <ul>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/posts">Posts</Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
