import React, { useEffect, useState } from "react";
import { FORM_FIELD_CLASSNAME } from "../../constants";
import "./ButtonRow.css";

export default function Button(props) {
  const { children } = props;

  const [leftChildren, setLeftChildren] = useState([]);
  const [rightChildren, setRightChildren] = useState([]);

  useEffect(() => {
    const _leftChildren = [];
    const _rightChildren = [];

    children.forEach(child => {
      child.props.rightAligned === "true"
        ? _rightChildren.push(child)
        : _leftChildren.push(child);
    });

    setLeftChildren(_leftChildren);
    setRightChildren(_rightChildren);
  }, [children]);

  return (
    <div className={`${FORM_FIELD_CLASSNAME} button-row`}>
      <div className="button-row">{leftChildren}</div>
      <div className="button-row right">{rightChildren}</div>
    </div>
  );
}
