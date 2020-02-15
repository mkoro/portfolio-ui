import React from "react";
import ReactMarkdown from "react-markdown";
import { FORM_FIELD_CLASSNAME } from "../../constants";
import "./Markdown.css";

export default function TextArea(props) {
  const { source } = props;

  const parsedSource = source.replace(/\\n/g, "\n\n");

  return (
    <div className={`${FORM_FIELD_CLASSNAME} markdown`}>
      <ReactMarkdown source={parsedSource} />
    </div>
  );
}
