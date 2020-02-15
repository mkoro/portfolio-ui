import React from "react";
import components from "../components";
import { ELEMENT_NAME_SYMBOL, RENDERED_NODE_SYMBOL } from "../constants";

let keyForComponents = 0;

export default function traverseAndRenderTree(node) {
  const childNodes = node.children || [];

  // Depth-first traversal: ensure every child node is rendered before we proceed to render the
  // current one.
  childNodes.forEach(childNode => traverseAndRenderTree(childNode));

  // Prepare the props that we will use when rendering the current node
  const propsForNode = { ...node };
  propsForNode.children = [];

  // We can iterate through the direct children of the current node and access their rendered
  // instances in confidence, since they all have been rendered at this point due to our depth-first
  // traversal.
  childNodes.forEach(childNode => {
    propsForNode.children.push(childNode[RENDERED_NODE_SYMBOL]);
  });

  // Get component constructor from components library
  const componentName = node[ELEMENT_NAME_SYMBOL];
  const Component = components[componentName];

  // Render current node
  node[RENDERED_NODE_SYMBOL] = (
    <Component {...propsForNode} key={keyForComponents++} />
  );
}

export const resetKey = () => {
  keyForComponents = 0;
};
