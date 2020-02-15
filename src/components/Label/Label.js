import React from "react";

export default function Label(props) {
  const { caption } = props;
  return <div className="label">{caption}</div>;
}
