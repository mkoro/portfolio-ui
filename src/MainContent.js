import React, { useEffect, useState } from "react";
import ConfigurationProvider from "./ConfigurationProvider/ConfigurationProvider";
import LeftNav from "./LeftNav/LeftNav";

export default function MainContent(props) {
  const { location, history } = props;
  const [links, setLinks] = useState([]);

  useEffect(() => {
    fetch("/configs/manifest.json")
      .then(response => response.json())
      .then(json => setLinks(json));
  }, []);

  return (
    <>
      <LeftNav links={links} location={location} history={history} />
      <ConfigurationProvider location={location} />
    </>
  );
}
