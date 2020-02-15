import React, { useEffect, useState } from "react";
import { RENDERED_NODE_SYMBOL } from "../constants";
import traverseAndRenderTree, { resetKey } from "./traverseAndRenderTree";
import "./PageBuilder.css";

export default function PageBuilder(props) {
  const { configuration } = props;

  const [children, setChildren] = useState(null);

  useEffect(() => {
    const childrenFromConfig = configuration?.[0]?.children;
    if (!childrenFromConfig) {
      setChildren(null);
      return;
    }

    resetKey();
    traverseAndRenderTree(configuration[0]);

    setChildren(configuration[0][RENDERED_NODE_SYMBOL]);
  }, [configuration]);

  return <div className="page-builder">{children}</div>;
}
