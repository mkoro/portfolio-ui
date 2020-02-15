import { ELEMENT_NAME_SYMBOL } from "../constants";

export default function parseXmlConfig(xml) {
  const parser = new DOMParser();
  const dom = parser.parseFromString(xml, "application/xml");
  const parsed = [];
  recursiveTraverser(parsed, dom.firstElementChild);
  return parsed;
}

function recursiveTraverser(acc, currentElement) {
  const elementName = currentElement.tagName;
  const attributes = Array.from(currentElement.attributes);
  const children = Array.from(currentElement.children);

  const parsedElement = { [ELEMENT_NAME_SYMBOL]: elementName };
  parsedElement.children = [];

  attributes.forEach(attr => (parsedElement[attr.nodeName] = attr.value));

  acc.push(parsedElement);

  if (!children.length) return;

  children.forEach(child => {
    recursiveTraverser(parsedElement.children, child);
  });
}
