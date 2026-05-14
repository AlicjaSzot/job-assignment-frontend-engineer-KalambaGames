import React from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "api/auth/useAuth";

const Navbar = (): JSX.Element => {
  const { user, loading } = useAuth();
  const { pathname } = useLocation();

  const navLink = (href: string, label: React.ReactNode) => (
    <li className="nav-item">
      <a className={`nav-link${pathname === href ? " active" : ""}`} href={`/#${href}`}>
        {label}
      </a>
    </li>
  );

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <a className="navbar-brand" href="/#">
          conduit
        </a>
        <ul className="nav navbar-nav pull-xs-right">
          {navLink("/", "Home")}
          {!loading && user ? (
            <>
              {navLink(
                "/editor",
                <>
                  <i className="ion-compose" />
                  &nbsp;New Article
                </>
              )}
              {navLink(
                "/settings",
                <>
                  <i className="ion-gear-a" />
                  &nbsp;Settings
                </>
              )}
              {navLink(
                `/profile/${user.username}`,
                <>
                  {user.image && <img src={user.image} className="user-pic" alt={user.username} />}
                  &nbsp;Profile
                </>
              )}
              {navLink("/logout", "Sign out")}
            </>
          ) : (
            !loading && (
              <>
                {navLink("/login", "Sign in")}
                {navLink("/register", "Sign up")}
              </>
            )
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
