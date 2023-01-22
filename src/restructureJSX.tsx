import React from "react";

interface Node {
  type?: string;
  className?: string;
  props?: {
      children?: Node | Node[];
  };
  children?: Node | Node[];
}

export function restructureJSON(obj: any) {
  let newJSON = {
      props: {
          className: '',
          children: []
      }
  };
  function recurse(obj: any, newJSON: any) {
      if (Array.isArray(obj)) {
          obj.forEach(item => recurse(item, newJSON))
      } else {
          if (obj.hasOwnProperty("props")) {
              if (obj.props.hasOwnProperty("className")) {
                  newJSON.props.className = obj.props.className;
              }
              if (obj.props.hasOwnProperty("children")) {
                  if (Array.isArray(obj.props.children)) {
                      obj.props.children.forEach((child: any) => {
                          if (typeof child === 'string') {
                              newJSON.props.children.push(child);
                          } else {
                              let newChild = {
                                  props: {
                                      className: '',
                                      children: []
                                  }
                              }
                              recurse(child, newChild);
                              newJSON.props.children.push(newChild);
                          }
                      });
                  } else if (typeof obj.props.children === 'string') {
                      newJSON.props.children.push(obj.props.children);
                  } else {
                      let newChild = {
                          props: {
                              className: '',
                              children: []
                          }
                      }
                      recurse(obj.props.children, newChild);
                      newJSON.props.children.push(newChild);
                  }
              }
          }
      }
  }
  recurse(obj, newJSON);
  return newJSON;
}
