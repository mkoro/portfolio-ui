import React, { useCallback, useEffect, useState } from "react";
import "./LeftNav.css";

export default function LeftNav(props) {
  const { links, location: { pathname } = {}, history: { push } = {} } = props;

  const [collapsed, setCollapsed] = useState(false);

  const toggleLeftNav = useCallback(() => {
    setCollapsed(prevState => {
      setCollapsed(!prevState);
    });
  }, []);

  const navigate = useCallback(
    event => {
      const url = event.target.attributes.getNamedItem("data-key").value;
      push(url);
    },
    [push]
  );

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth < 850) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    window.addEventListener("resize", onResize);
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
        </ul>
      </div>
      <div id="left-nav-button-bar">
        <span onClick={toggleLeftNav}>{collapsed ? ">" : "<"}</span>
      </div>
    </>
  );
}
