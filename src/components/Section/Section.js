import React, { useCallback, useEffect, useState } from "react";
import { FORM_FIELD_CLASSNAME } from "../../constants";
import "./Section.css";

const EXPAND_GLYPH = "˃";
const COLLAPSE_GLYPH = "˅";

export default function Section(props) {
  const { caption, children, defaultCollapsed } = props;

  const [collapsed, setCollapsed] = useState(defaultCollapsed || false);
  const [captionGlyph, setCaptionGlyph] = useState(getGlyph(collapsed));

  useEffect(() => {
    setCaptionGlyph(getGlyph(collapsed));
  }, [collapsed]);

  const handleClick = useCallback(() => {
    setCollapsed(prevState => !prevState);
  }, []);

  return (
    <>
      <div
        className={`${FORM_FIELD_CLASSNAME} section-header`}
        onClick={handleClick}
      >
        <span className="glyph">{`${captionGlyph} `}</span>
        {caption}
      </div>
      <div className={`section-content ${collapsed ? "hidden" : ""}`}>
        {children}
      </div>
    </>
  );
}

function getGlyph(collapsed) {
  return collapsed ? EXPAND_GLYPH : COLLAPSE_GLYPH;
}
