import React, { useCallback, useEffect, useState } from "react";
import "./LeftNav.css";

const PORTFOLIO_HOME = "https://koroknay.tech";

export default function LeftNav(props) {
  const { links, location: { pathname } = {}, history: { push } = {} } = props;

  const [collapsed, setCollapsed] = useState(false);
  const [thinMode, setThinMode] = useState(false);

  const toggleLeftNav = useCallback(() => {
    setCollapsed(prevState => {
      setCollapsed(!prevState);
    });
  }, []);

  const navigate = useCallback(
    event => {
      const url = event.target.attributes.getNamedItem("data-key").value;
      url.startsWith("http") ? window.location.assign(url) : push(url);

      if (thinMode) setCollapsed(true);
    },
    [push, thinMode]
  );

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth < 850) {
        setCollapsed(true);
        setThinMode(true);
      } else {
        setCollapsed(false);
        setThinMode(false);
      }
    };

    window.addEventListener("resize", onResize);
    onResize();
  }, []);

  return (
    <>
      <div id="left-nav" className={collapsed ? "hidden" : ""}>
        <div className="nav-title">UI Framework</div>
        <div className="nav-subtitle-container">
          <div className="nav-spacer"></div>
          <div className="nav-subtitle">Demo</div>
          <div className="nav-spacer"></div>
        </div>
        <ul>
          {links.map(({ url, title }) => (
            <li key={url} className={url === pathname ? "current" : ""}>
              <span data-key={url} onClick={navigate}>
                {title}
              </span>
            </li>
          ))}
          <li>
            <span data-key={PORTFOLIO_HOME} onClick={navigate}>
              {"> Back to Portfolio Main Page <"}
            </span>
          </li>
        </ul>
      </div>
      <div id="left-nav-button-bar">
        <span onClick={toggleLeftNav}>{collapsed ? ">" : "<"}</span>
      </div>
    </>
  );
}
