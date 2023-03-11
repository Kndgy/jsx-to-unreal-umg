import React from "react";

export function ParseStringtoNode(str: string): React.ReactNode[] {
    const container = document.createElement("div");
    container.innerHTML = str;
    const childNodes = Array.from(container.childNodes);
    
    let keyIndex = 0;
  
    const parseNode = (node: Node): React.ReactNode => {
      if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent;
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as Element;
        const tagName = element.nodeName.toLowerCase();
        const className = element.hasAttribute("className") ? element.getAttribute("className") : undefined;
        const style = element.hasAttribute("style") ? parseStyleString(element.getAttribute("style")) : undefined;
        const childNodes = Array.from(element.childNodes);
        const children = childNodes.map((childNode) => parseNode(childNode)).filter((child) => child !== null);
        return React.createElement(tagName, { 
          key: `${keyIndex++}`,
          className: className,
          style: style
        }, children);
      } else {
        return null;
      }
    };
    
    const parseStyleString = (styleStr: string | null | undefined) => {
      if (!styleStr) return undefined;
    
      const styles = styleStr.split(';');
      const styleObj: { [key: string]: string } = {};
      for (let style of styles) {
        const [key, value] = style.split(':');
        if (key && value) {
          styleObj[key.trim()] = value.trim();
        }
      }
      return styleObj;
    }
     
    return childNodes.map((childNode) => parseNode(childNode)).filter((child) => child !== null);
  }