import React, { useCallback } from "react";
import "./LeftNav.css";

export default function LeftNav(props) {
  const { links, location: { pathname } = {}, history: { push } = {} } = props;

  const navigate = useCallback(
    event => {
      const url = event.target.attributes.getNamedItem("data-key").value;
      push(url);
    },
    [push]
  );

  return (
    <div id="left-nav">
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
  );
}
