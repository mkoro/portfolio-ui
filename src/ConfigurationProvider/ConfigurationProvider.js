import React, { useEffect, useState } from "react";
import PageBuilder from "../PageBuilder/PageBuilder";
import parseXmlConfig from "./parseXmlConfig";

export default function ConfigurationProvider(props) {
  const { location: { pathname } = {} } = props;

  const [configuration, setConfiguration] = useState(null);

  useEffect(() => {
    getConfigFromServer(pathname).then(setConfiguration);
  }, [pathname]);

  return configuration ? (
    <PageBuilder configuration={configuration} />
  ) : (
    <div id="page-builder">Loading...</div>
  );
}

async function getConfigFromServer(pathname) {
  const filename = pathname[0] === "/" ? pathname.substr(1) : pathname;
  const response = await fetch(`/configs/${filename}.xml`);
  const xml = await response.text();

  return parseXmlConfig(xml);
}
