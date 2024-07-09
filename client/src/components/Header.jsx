import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "../global.css";

function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="header gradient shadow">
      <div className="max-w-6xl flex items-center justify-between mx-auto p-3">
        <Link to="/">
          <img
            className="w-[100px] h-[95px]"
            src="/thai-admin-svg.png"
            alt="thai rest logo"
          />
        </Link>
        <ul className="flex text-xl font-semibold gap-4 items-center">
          <Link to="/">
            <li>Home</li>
          </Link>
          {currentUser ? (
            <>
              <Link to="/dashboard">
                <li>Dashboard</li>
              </Link>
              <Link to="/profile">
                <img
                  src={currentUser.profilePicture}
                  alt="profile picture"
                  className="h-12 m-12 rounded-full object-cover"
                />
              </Link>
            </>
          ) : (
            <li>Sign In</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Header;
