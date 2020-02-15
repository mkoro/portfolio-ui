import React from "react";
import { FORM_FIELD_CLASSNAME } from "../../constants";

export default function TextArea(props) {
  const { width = 50, height = 10 } = props;
  return (
    <textarea className={FORM_FIELD_CLASSNAME} cols={width} rows={height} />
  );
}
