import React from "react";

interface NodeJson {
  props: {
    className: string;
    children: Array<NodeJson | string>;
  }
}

export function restructureJSON(obj: NodeJson | Array<NodeJson>): NodeJson {
  let newNode: NodeJson = {
    props: {
      className: '',
      children: []
    }
  }
  function recurse(obj: NodeJson | Array<NodeJson>, newNode: NodeJson) {
    if (Array.isArray(obj)) {
      obj.forEach(item => recurse(item, newNode))
    } else {
      if (obj.hasOwnProperty("props")) {
        if (obj.props.hasOwnProperty("className")) {
          newNode.props.className = obj.props.className;
        }
        if (obj.props.hasOwnProperty("children")) {
          if (Array.isArray(obj.props.children)) {
            obj.props.children.forEach((child: NodeJson | string) => {
              if (typeof child === 'string') {
                newNode.props.children.push(child);
              } else {
                let newChild = {
                  props: {
                    className: '',
                    children: []
                  }
                }
                recurse(child, newChild);
                newNode.props.children.push(newChild);
              }
            });
          } else if (typeof obj.props.children === 'string') {
            newNode.props.children.push(obj.props.children);
          } else {
            let newChild = {
              props: {
                className: '',
                children: []
              }
            }
            recurse(obj.props.children, newChild);
            newNode.props.children.push(newChild);
          }
        }
      }
    }
  }
  recurse(obj, newNode);
  return newNode;
}
