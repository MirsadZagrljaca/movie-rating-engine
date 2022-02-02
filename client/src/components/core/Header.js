import React, { useState, useEffect } from "react";
import authHelper from "../../helpers/auth-helper";
import { signout } from "../../services/user/api-auth";

export default function Header() {
  const [log, setLog] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setLog(true);
    } else {
      setLog(false);
    }
  }, []);

  const logout = () => {
    signout().then((response) => {
      authHelper.clearToken(() => {
        window.location.reload();
      });
    });
  };

  return (
    <div className="header">
      <div className="header-left">
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="currentColor"
              className="bi bi-list"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
              />
            </svg>
          </button>
          <div className="dropdown-menu">
            <a className="dropdown-item" href="/">
              Top 10
            </a>
            <a className="dropdown-item" href="/all">
              All Movies
            </a>
          </div>
        </div>
      </div>

      <div className="header-middle">
        <h2>Movie Rating Engine</h2>
      </div>

      <div className="header-right">
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="currentColor"
              className="bi bi-person-square"
              viewBox="0 0 16 16"
            >
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
              <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12z" />
            </svg>
          </button>
          {log && (
            <div className="dropdown-menu">
              <a className="dropdown-item" href="#" onClick={logout}>
                Logout
              </a>
            </div>
          )}

          {!log && (
            <div className="dropdown-menu">
              <a className="dropdown-item" href="/register">
                Create an Account
              </a>

              <a className="dropdown-item" href="/login">
                Login
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
