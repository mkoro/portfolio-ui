import React, { useCallback, useEffect, useState } from "react";
import { SlideDown } from "react-slidedown";
import { FORM_FIELD_CLASSNAME } from "../../constants";
import "react-slidedown/lib/slidedown.css";
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
      <SlideDown>
        {!collapsed && <div className="section-content">{children}</div>}
      </SlideDown>
    </>
  );
}

function getGlyph(collapsed) {
  return collapsed ? EXPAND_GLYPH : COLLAPSE_GLYPH;
}
