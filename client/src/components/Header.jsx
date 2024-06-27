import { Link } from "react-router-dom";
import "../global.css";

function Header() {
  return (
    <div className="bg-slate-50 shadow">
      <div className="max-w-6xl flex items-center justify-between mx-auto p-3">
        <Link to="/">
          <img
            className="w-[100px] h-[95px]"
            src="/thai-admin-svg.png"
            alt="thai rest logo"
          />
        </Link>
        <ul className="flex gap-4">
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/controls">
            <li>Controls</li>
          </Link>
          <Link to="/siginin">
            <li>Sigin In</li>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default Header;
