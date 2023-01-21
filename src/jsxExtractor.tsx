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

// console.log("direct : ", el)
console.log("direct : ",extractChildrenPropsAndClassName(el))

/*
*/

//same as above function but wrap the children onto the classname as parents
function extractChildrenPropsAndClassNameWrapped(obj: any, nodes: any = {}) {
  if (Array.isArray(obj)) {
      obj.forEach(item => extractChildrenPropsAndClassNameWrapped(item, nodes))
  } else {
      if (obj.hasOwnProperty("props")) {
          if (obj.props.hasOwnProperty("className")) {
              if(!nodes.hasOwnProperty(obj.props.className)) {
                  nodes[obj.props.className] = []
              }
          }
          if (obj.props.hasOwnProperty("children")) {
              if (Array.isArray(obj.props.children)) {
                  obj.props.children.forEach((child: any) => {
                      if (typeof child === 'string') {
                          nodes[obj.props.className].push(child);
                      } else {
                        extractChildrenPropsAndClassNameWrapped(child, nodes);
                      }
                  });
              } else if (typeof obj.props.children === 'string') {
                  nodes[obj.props.className].push(obj.props.children);
              } else {
                extractChildrenPropsAndClassNameWrapped(obj.props.children, nodes);
              }
          }
      }
  }
  return nodes;
}

var result = extractChildrenPropsAndClassNameWrapped(el)
console.log("wrapped in classname : ", result)
console.log("keys from the object : ", Object.keys(result))
console.log("value from the object : ", Object.values(result))
}
