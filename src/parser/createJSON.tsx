import React, { ReactNode } from 'react';

interface NodeJson {
  type: string | Function;
  key?: string | number | null;
  ref?: any;
  props: {
    className: string;
    style?: any;
    children: Array<NodeJson | string>;
    name?: string
  };
}

export function convertNodeToJSON(node: NodeJson | ReactNode): NodeJson {
  let newNode: NodeJson = {
    type: '',
    props: {
      className: '',
      style: {},
      children: [],
      name: ''
    }
  }

  function recurse(obj: NodeJson | ReactNode, newNode: NodeJson) {
    if (Array.isArray(obj)) {
      obj.forEach(item => recurse(item, newNode))
    } else if (typeof obj === 'object' && obj !== null) {
      if (React.isValidElement(obj)) {
        const element = obj as React.ReactElement;
        newNode.type = element.type;
        newNode.key = element.key;
        newNode.props.className = element.props.className ?? '';
        newNode.props.style = element.props.style ?? {};
        newNode.props.name = element.props.name ?? ''
        if (typeof element.type === 'function') {
          newNode.type = element.type.name ?? ''
        }
        
        if (element.props.children) {
          React.Children.forEach(element.props.children, (child: NodeJson | ReactNode) => {
            if (typeof child === 'string') {
              newNode.props.children.push(child);
            } else {
              let newChild = {
                type: '',
                key: '',
                ref: null,
                props: {
                  className: '',
                  style: {},
                  children: [],
                  name: ''
                }
              }
              recurse(child, newChild);
              newNode.props.children.push(newChild);
            }
          });
        }
      } else {
        console.log(`Warning: Cannot convert unsupported type to JSON: ${obj}`);
      }
    } else if (typeof obj === 'string') {
      newNode.props.children.push(obj);
    } else {
      console.log(`Warning: Cannot convert unsupported type to JSON: ${obj}`);
    }
  }

  if(node == null) {
    console.log("is null");
  } else {
    recurse(node, newNode);
  }

  return newNode;
}
