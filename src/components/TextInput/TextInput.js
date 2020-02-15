import React from "react";
import { FORM_FIELD_CLASSNAME } from "../../constants";
import "./TextInput.css";

export default function TextArea(props) {
  return <input className={`${FORM_FIELD_CLASSNAME} text-input`} />;
}
