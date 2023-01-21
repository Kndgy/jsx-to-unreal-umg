import React from "react";
var index = 0;

interface bodyJSX {
  parent: string,
  children: []
}

export function Extract(el:any){
  index++;

function extractChildrenPropsAndClassName(obj: any, nodes: any[] = []): string[] {
  if (Array.isArray(obj)) {
      obj.forEach(item => extractChildrenPropsAndClassName(item, nodes))
  } else {
      if (obj.hasOwnProperty("props")) {
          if (obj.props.hasOwnProperty("className")) {
              nodes.push(obj.props.className);
          }
          if (obj.props.hasOwnProperty("children")) {
              if (Array.isArray(obj.props.children)) {
                  obj.props.children.forEach((child: any) => {
                      if (typeof child === 'string') {
                          nodes.push(child);
                      } else {
                          extractChildrenPropsAndClassName(child, nodes);
                      }
                  });
              } else if (typeof obj.props.children === 'string') {
                  nodes.push(obj.props.children);
              } else {
                  extractChildrenPropsAndClassName(obj.props.children, nodes);
              }
          }
      }
  }
  return nodes;
}


console.log(el)
console.log(extractChildrenPropsAndClassName(el))
}
